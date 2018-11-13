import { IObjectsById } from '../interfaces';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { Core } from '../core';
import { Base } from './base';
import { Resource } from '../resource';
import { Converter } from './converter';
import { DocumentCollection } from '../document-collection';
import { Observable, Subject } from 'rxjs';
import { Page } from './page';
import { DocumentResource } from '../document-resource';
import { isDevMode } from '@angular/core';

export class CacheStore {
    public async getResource(resource: Resource, include: Array<string> = []): Promise<object> {
        let mypromise: Promise<object> = new Promise(
            (resolve, reject): void => {
                Core.injectedServices.JsonapiStoreService.getDataObject(resource.type, resource.id).subscribe(
                    success => {
                        resource.fill({ data: success });

                        // include some times is a collection :S
                        let include_promises: Array<Promise<object>> = [];
                        for (let resource_alias of include) {
                            this.fillRelationshipFromStore(resource, resource_alias, include_promises);
                        }

                        // resource.lastupdate = success._lastupdate_time;

                        // no debo esperar a que se resuelvan los include
                        if (include_promises.length === 0) {
                            resolve(success);
                        } else {
                            // esperamos las promesas de los include antes de dar el resolve
                            Promise.all(include_promises)
                                .then(success3 => {
                                    resolve(success3);
                                })
                                .catch(error3 => {
                                    reject(error3);
                                });
                        }
                    },
                    () => {
                        reject();
                    }
                );
            }
        );

        return mypromise;
    }

    public setResource(resource: Resource) {
        Core.injectedServices.JsonapiStoreService.saveResource(resource.type, resource.id, resource.toObject().data);
    }

    public setCollection(url: string, collection: DocumentCollection, include: Array<string>): void {
        let tmp: IDataCollection = { data: [], page: new Page() };
        let resources_for_save: IObjectsById<Resource> = {};
        for (let resource of collection.data) {
            this.setResource(resource);
            tmp.data.push({ id: resource.id, type: resource.type });
            for (let resource_type_alias of include) {
                resources_for_save = this.buildCollectionToSave(resource, resource_type_alias, resources_for_save);
            }
        }

        tmp.page = collection.page;
        Core.injectedServices.JsonapiStoreService.saveCollection(url, <IDataCollection>tmp);

        Base.forEach(resources_for_save, resource_for_save => {
            if (!('is_new' in resource_for_save)) {
                // console.warn('No se pudo guardar en la cache', resource_for_save.type, 'por no se ser Resource.', resource_for_save);

                return;
            }

            if (Object.keys(resource_for_save.attributes).length === 0) {
                console.warn('No se pudo guardar en la cache', resource_for_save.type, 'por no tener attributes.', resource_for_save);

                return;
            }

            this.setResource(resource_for_save);
        });
    }

    private buildCollectionToSave(resource: Resource, resource_type_alias: string, resources_for_save: IObjectsById<Resource>) {
        let resource_type_alias_info = resource_type_alias.split('.');
        let sub_includes = resource_type_alias.replace(resource_type_alias_info[0], '').replace(/./i, "")

        if ('id' in resource.relationships[resource_type_alias_info[0]].data) {
            // hasOne
            let ress = <Resource>resource.relationships[resource_type_alias_info[0]].data;
            resources_for_save[resource_type_alias_info[0] + ress.id] = ress;
            if(resource_type_alias_info.length > 1){
                resources_for_save = this.buildCollectionToSave(ress, sub_includes, resources_for_save);
            }
        } else {
            // hasMany
            let collection2 = <Array<Resource>>resource.relationships[resource_type_alias_info[0]].data;
            for (let inc_resource of collection2) {
                resources_for_save[resource_type_alias_info[0] + inc_resource.id] = inc_resource;
                if(resource_type_alias_info.length > 1){
                    resources_for_save = this.buildCollectionToSave(inc_resource, sub_includes, resources_for_save);
                }
            }
        }
        return resources_for_save;
    }

    public deprecateCollections(path_start_with: string): boolean {
        Core.injectedServices.JsonapiStoreService.deprecateObjectsWithKey('collection.' + path_start_with);

        return true;
    }

    public fillCollectionFromStore(url: string, include: Array<string>, collection: DocumentCollection): Observable<DocumentCollection> {
        let subject = new Subject<DocumentCollection>();

        Core.injectedServices.JsonapiStoreService.getDataObject('collection', url).subscribe(
            data_collection => {
                // build collection from store and resources from memory
                if (this.fillCollectionWithArrrayAndResourcesOnMemory(data_collection.data, collection)) {
                    collection.source = 'store'; // collection from storeservice, resources from memory
                    collection.cache_last_update = data_collection._lastupdate_time;
                    subject.next(collection);
                    subject.complete();

                    return;
                }

                let promise2 = this.fillCollectionWithArrrayAndResourcesOnStore(data_collection, include, collection);
                promise2
                    .then(() => {
                        // just for precaution, we not rewrite server data
                        if (collection.source !== 'new') {
                            console.warn('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#', collection);
                            throw new Error('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                        }
                        collection.source = 'store'; // collection and resources from storeservice
                        collection.cache_last_update = data_collection._lastupdate_time;
                        subject.next(collection);
                        setTimeout(() => subject.complete());
                    })
                    .catch(err => subject.error(err));
            },
            err => subject.error(err)
        );

        return subject;
    }

    private fillCollectionWithArrrayAndResourcesOnMemory(dataresources: Array<IDataResource>, collection: DocumentCollection): boolean {
        let all_ok = true;
        for (let dataresource of dataresources) {
            let resource = this.getResourceFromMemory(dataresource);
            if (resource.is_new) {
                all_ok = false;
                break;
            }
            collection.replaceOrAdd(resource);
        }

        return all_ok;
    }

    private getResourceFromMemory(dataresource: IDataResource): Resource {
        let cachememory = Converter.getService(dataresource.type).cachememory;
        let resource = cachememory.getOrCreateResource(dataresource.type, dataresource.id);

        return resource;
    }

    private async fillCollectionWithArrrayAndResourcesOnStore(
        datacollection: IDataCollection,
        include: Array<string>,
        collection: DocumentCollection
    ): Promise<void> {
        let promise = new Promise(
            (resolve: (value: void) => void, reject: (value: any) => void): void => {
                let resources_by_id: IObjectsById<Resource> = {};

                // get collection from store
                let required_store_keys: Array<string> = datacollection.data.map(dataresource => {
                    let cachememory = Converter.getService(dataresource.type).cachememory;
                    resources_by_id[dataresource.id] = cachememory.getOrCreateResource(dataresource.type, dataresource.id);

                    return resources_by_id[dataresource.id].type + '.' + dataresource.id;
                });

                // get resources for collection fill
                Core.injectedServices.JsonapiStoreService.getDataResources(required_store_keys)
                    .then(store_data_resources => {
                        let include_promises: Array<Promise<object>> = [];
                        for (let key in store_data_resources) {
                            let data_resource = store_data_resources[key];
                            resources_by_id[data_resource.id].fill({ data: data_resource });

                            // include some times is a collection :S
                            Base.forEach(include, resource_alias => {
                                this.fillRelationshipFromStore(resources_by_id[data_resource.id], resource_alias, include_promises);
                            });

                            resources_by_id[data_resource.id].lastupdate = data_resource._lastupdate_time;
                        }

                        // no debo esperar a que se resuelvan los include
                        if (include_promises.length === 0) {
                            if (datacollection.page) {
                                collection.page.number = datacollection.page.number;
                            }

                            for (let dataresource of datacollection.data) {
                                let resource: Resource = resources_by_id[dataresource.id];
                                collection.data.push(resource);
                            }

                            resolve(null);
                        } else {
                            // esperamos las promesas de los include antes de dar el resolve
                            Promise.all(include_promises)
                                .then(success3 => {
                                    if (datacollection.page) {
                                        collection.page.number = datacollection.page.number;
                                    }

                                    for (let dataresource of datacollection.data) {
                                        let resource: Resource = resources_by_id[dataresource.id];
                                        collection.data.push(resource);
                                    }

                                    resolve(null);
                                })
                                .catch(error3 => {
                                    reject(error3);
                                });
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            }
        );

        return promise;
    }

    private fillRelationshipFromStore(resource: Resource, resource_alias: string, include_promises: Array<any>) {
        if (resource.relationships[resource_alias].data instanceof DocumentResource) {
            // hasOne
            let related_resource = <IDataResource>resource.relationships[resource_alias].data;
            if (!('attributes' in related_resource)) {
                // no está cargado aún
                let builded_resource = this.getResourceFromMemory(related_resource);
                if (builded_resource.is_new) {
                    // no está en memoria, la pedimos a store
                    include_promises.push(this.getResource(builded_resource));
                } else if (isDevMode()) {
                    console.warn('ts-angular-json: esto no debería pasar #isdjf2l1a');
                }
                resource.addRelationship(builded_resource, resource_alias);
            }
        }
        // else hasMany??
    }
}
