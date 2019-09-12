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

export class CacheStore {
    public async getResource(resource: Resource, include: Array<string> = []): Promise<object> {
        let mypromise: Promise<object> = new Promise((resolve, reject): void => {
            Core.injectedServices.JsonapiStoreService.getDataObject(resource.type, resource.id).subscribe(
                success => {
                    try {
                        resource.fill({ data: success });

                        // include some times is a collection :S
                        let include_promises: Array<Promise<object>> = [];

                        // NOTE: fix to resources stored without relationships
                        if (include.length > 0 && !resource.relationships) {
                            resource.relationships = new (resource.getService()).resource().relationships;
                        }

                        for (let resource_alias of include) {
                            this.fillRelationshipFromStore(resource, resource_alias, include_promises);
                        }

                        resource.cache_last_update = success._lastupdate_time;

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
                    } catch (e) {
                        reject();
                    }
                },
                () => {
                    reject();
                }
            );
        });

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
                // TODO: FE-92 ---> improve null has-one relatioships checks
                if (resource.relationships[resource_type_alias].data === null) {
                    continue;
                }
                if ('id' in resource.relationships[resource_type_alias].data) {
                    // hasOne
                    let ress = <Resource>resource.relationships[resource_type_alias].data;
                    resources_for_save[resource_type_alias + ress.id] = ress;
                } else {
                    // hasMany
                    let collection2 = <Array<Resource>>resource.relationships[resource_type_alias].data;
                    for (let inc_resource of collection2) {
                        resources_for_save[resource_type_alias + inc_resource.id] = inc_resource;
                    }
                }
            }
        }

        tmp.page = collection.page;
        Core.injectedServices.JsonapiStoreService.saveCollection(url, <IDataCollection>tmp);

        // TODO: WORKING new collections don't have cache last update, so it's set here
        collection.cache_last_update = collection.cache_last_update || Date.now();

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

    public removeResource(id: string, type: string): void {
        console.warn('removeResource with ToDo!');
        Core.injectedServices.JsonapiStoreService.removeObjectsWithKey(`jsonapi.${type}.${id}`);
    }

    public deprecateCollections(path_start_with: string): boolean {
        Core.injectedServices.JsonapiStoreService.deprecateCollection(path_start_with);

        return true;
    }

    public fillCollectionFromStore(url: string, include: Array<string>, collection: DocumentCollection): Observable<DocumentCollection> {
        let subject = new Subject<DocumentCollection>();

        Core.injectedServices.JsonapiStoreService.getDataObject('collection', url).subscribe(
            (data_collection: IDataCollection) => {
                // build collection from store and resources from memory
                if (this.fillCollectionWithArrrayAndResourcesOnMemory(data_collection.data, collection)) {
                    collection.source = 'store'; // collection from storeservice, resources from memory
                    collection.builded = true;
                    collection.setLoaded(true);
                    collection.cache_last_update = data_collection._lastupdate_time;
                    subject.next(collection);
                    setTimeout(() => subject.complete());

                    return;
                }

                this.fillCollectionWithArrrayAndResourcesOnStore(data_collection, include, collection)
                    .then(() => {
                        // just for precaution, we not rewrite server data
                        if (collection.source !== 'new') {
                            console.warn('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#', collection);
                            throw new Error('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                        }
                        collection.source = 'store'; // collection and resources from storeservice
                        collection.cache_last_update = data_collection._lastupdate_time;
                        collection.builded = true;
                        collection.setLoaded(true);
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

    private getStoreKeysFromDataCollection(datacollection: IDataCollection): Array<string> {
        return datacollection.data.map(dataresource => {
            return dataresource.type + '.' + dataresource.id;
        });
    }

    /*
    private async getDataResourcesFromDataCollection(datacollection: IDataCollection): Promise<IObjectsById<IDataResourcesSto>> {
        return Core.injectedServices.JsonapiStoreService.getDataResources(
            this.getStoreKeysFromDataCollection(datacollection)
        );
    }
    */

    private async fillCollectionWithArrrayAndResourcesOnStore(
        datacollection: IDataCollection,
        include: Array<string>,
        collection: DocumentCollection
    ): Promise<void> {
        let promise = new Promise((resolve: (value: void) => void, reject: (value: any) => void): void => {
            let resources_by_id: IObjectsById<Resource> = {};
            let store_keys = this.getStoreKeysFromDataCollection(datacollection);

            // get resources for collection fill
            Core.injectedServices.JsonapiStoreService.getDataResources(store_keys)
                .then(store_data_resources => {
                    let include_promises: Array<Promise<object>> = [];
                    let included_related_keys: Array<string> = [];

                    for (let key in store_data_resources) {
                        let data_resource = store_data_resources[key];

                        resources_by_id[data_resource.id] = this.getResourceFromMemory(data_resource);
                        resources_by_id[data_resource.id].fill({ data: data_resource });

                        // collect related store_keys
                        Base.forEach(include, resource_alias => {
                            let relationship = resources_by_id[data_resource.id].relationships[resource_alias];
                            if (relationship instanceof DocumentResource) {
                                included_related_keys.push(relationship.data.type + '.' + relationship.data.id);
                            } else if (relationship instanceof DocumentCollection) {
                                included_related_keys.push(...this.getStoreKeysFromDataCollection(relationship));
                            }
                        });

                        // include some times is a collection :S
                        /*
                            Base.forEach(include, resource_alias => {
                                this.fillRelationshipFromStore(resources_by_id[data_resource.id], resource_alias, include_promises);
                            });
                            */
                    }

                    // no debo esperar a que se resuelvan los include
                    if (include_promises.length === 0 && included_related_keys.length === 0) {
                        if (datacollection.page) {
                            collection.page.number = datacollection.page.number;
                        }

                        for (let dataresource of datacollection.data) {
                            let resource: Resource = resources_by_id[dataresource.id];
                            if (collection.data.indexOf(resource) !== -1) {
                                continue;
                            }
                            collection.data.push(resource);
                        }

                        resolve(null);
                    } else {
                        // request from store all related resources requested on include
                        let related_promises = [];
                        Core.injectedServices.JsonapiStoreService.getDataResources(included_related_keys)
                            .then(store_include_data_resources => {
                                // move data to memory
                                for (let key in store_include_data_resources) {
                                    let data_resource = store_include_data_resources[key];

                                    let resource = this.getResourceFromMemory(data_resource);
                                    resource.fill({ data: data_resource });
                                }
                                // all related included resources are on cacheMemory
                                for (let key in resources_by_id) {
                                    let resource = resources_by_id[key];

                                    Base.forEach(include, resource_alias => {
                                        this.fillRelationshipFromStore(resource, resource_alias, related_promises);
                                    });
                                }
                            })
                            .then(async () => {
                                // we wait to resolution of eath included type
                                return Promise.all(related_promises);
                            })
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
        });

        return promise;
    }

    private fillRelationshipFromStore(resource: Resource, resource_alias: string, include_promises: Array<any>) {
        if (resource_alias.includes('.')) {
            let included_resource_alias_parts = resource_alias.split('.');
            let datadocument = resource.relationships[included_resource_alias_parts[0]].data;
            if (datadocument instanceof DocumentResource) {
                return this.fillRelationshipFromStore(datadocument.data, included_resource_alias_parts[1], include_promises);
            } else if (datadocument instanceof DocumentCollection) {
                for (let related_resource of datadocument.data) {
                    this.fillRelationshipFromStore(related_resource, included_resource_alias_parts[1], include_promises);
                }

                return;
            }
        }

        // TODO: FE-92 ---> improve null has-one relatioships checks
        if (!resource.relationships[resource_alias] || resource.relationships[resource_alias].data === null) {
            return;
        }

        let relationship = resource.relationships[resource_alias];

        if (relationship instanceof DocumentResource) {
            // hasOne
            let related_resource = relationship.data;

            // @todo related with #209
            // this fix problem with a relationships without child or without data (books.author)
            if (related_resource.type !== '') {
                resource.addRelationship(this.getResourceAndPushPromise(include_promises, related_resource), resource_alias);
            }

            /*
            // code by maxi
            if (
                !('attributes' in related_resource) ||
                (Object.keys(related_resource.attributes).length === 0 && related_resource.attributes.constructor === Object)
            ) {
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
            */
        } else if (relationship instanceof DocumentCollection) {
            // hayMany
            /*
            // code by maxi
            let builded_resources: Array<Resource> = [];
            for (let related_resource of (<DocumentCollection>resource.relationships[resource_alias]).data) {
                await this.getResource(related_resource).then(builded_resource => builded_resources.push(<Resource>builded_resource));
            }
            resource.addRelationships(builded_resources, resource_alias);
            */

            relationship.data.forEach(data_resource => {
                if (Object.keys(data_resource.attributes).length === 0) {
                    // @todo problem when you get /#/authors/22
                    throw new Error('Resource is required by include, but I dont have info of this resource. Store broken?');
                }

                this.getResourceFromMemory(data_resource);
            });

            // ToDo we have same before
            // let resources_by_id: IObjectsById<Resource> = {};
            // let required_store_keys: Array<string> = (<DocumentCollection>resource.relationships[resource_alias]).data.map(dataresource => {
            //     resources_by_id[dataresource.id] = this.getResourceFromMemory(dataresource);

            //     return dataresource.type + '.' + dataresource.id;
            // });

            /*
            if ((<DocumentCollection>resource.relationships[resource_alias]).data.length > 0) {
                console.log(resource_alias, required_store_keys);
                debugger;
            }
            */

            // fill directly from store
            /*
            include_promises.push(this.fillCollectionWithArrrayAndResourcesOnStore(
                relationship,
                [],
                relationship
            ));
            */
            // END fill directly from store

            // if (related_collection.data.length > 0) {
            //     resource.addRelationship(this.getResourceAndPushPromise(include_promises, related_collection.data[1]), resource_alias);
            // }

            /*
            related_collection.data.forEach(related_resource => {
                resource.addRelationship(this.getResourceAndPushPromise(include_promises, related_resource), resource_alias);
            });
            */
        } else {
            console.warn('Related resource cant be processed.');
            throw new Error('Related resource cant be processed.');
        }
    }

    private getResourceAndPushPromise(include_promises: Array<any>, related_resource: IDataResource): Resource {
        let builded_resource = this.getResourceFromMemory(related_resource);
        include_promises.push(this.getResource(builded_resource));

        return builded_resource;
    }
}
