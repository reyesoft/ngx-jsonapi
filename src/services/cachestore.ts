import { ICollection, ICache } from '../interfaces';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { Core } from '../core';
import { Base } from './base';
import { IObject } from '../interfaces/object';
import { Resource } from '../resource';
import { Converter } from './converter';

export class CacheStore implements ICache {
    public async getResource(resource: Resource, include: Array<string> = []): Promise<object> {
        let mypromise: Promise<object> = new Promise(
            (resolve, reject): void => {
                Core.injectedServices.JsonapiStoreService.getObjet(resource.type + '.' + resource.id)
                    .then(success => {
                        Converter.build({ data: success }, resource);

                        // include some times is a collection :S
                        let include_promises: Array<Promise<object>> = [];
                        Base.forEach(include, resource_alias => {
                            this.fillRelationshipFromStore(resource, resource_alias, include_promises);
                        });

                        resource.lastupdate = success._lastupdate_time;

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
                    })
                    .catch(() => {
                        reject();
                    });
            }
        );

        return mypromise;
    }

    public setResource(resource: Resource) {
        Core.injectedServices.JsonapiStoreService.saveObject(resource.type + '.' + resource.id, resource.toObject().data);
    }

    public async getCollectionFromStorePromise(url: string, include: Array<string>, collection: ICollection): Promise<ICollection> {
        let promise = new Promise(
            (resolve: (value: ICollection) => void, reject: () => void): void => {
                this.getCollectionFromStore(url, include, collection, resolve, reject);
            }
        );

        return promise;
    }

    public setCollection(url: string, collection: ICollection, include: Array<string>) {
        let tmp = { data: {}, page: {} };
        let resources_for_save: { [uniqkey: string]: Resource } = {};
        Base.forEach(collection, (resource: Resource) => {
            this.setResource(resource);
            tmp.data[resource.id] = { id: resource.id, type: resource.type };

            Base.forEach(include, resource_type_alias => {
                if ('id' in resource.relationships[resource_type_alias].data) {
                    // hasOne
                    let ress = <Resource>resource.relationships[resource_type_alias].data;
                    resources_for_save[resource_type_alias + ress.id] = ress;
                } else {
                    // hasMany
                    let collection2 = <ICollection>resource.relationships[resource_type_alias].data;
                    Base.forEach(collection2, (inc_resource: Resource) => {
                        resources_for_save[resource_type_alias + inc_resource.id] = inc_resource;
                    });
                }
            });
        });
        tmp.page = collection.page;
        Core.injectedServices.JsonapiStoreService.saveObject('collection.' + url, tmp);

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

    public deprecateCollections(path_start_with: string) {
        Core.injectedServices.JsonapiStoreService.deprecateObjectsWithKey('collection.' + path_start_with);

        return true;
    }

    private getCollectionFromStore(
        url: string,
        include: Array<string>,
        collection: ICollection,
        resolve: (value: ICollection) => void,
        reject: () => void
    ) {
        let promise = Core.injectedServices.JsonapiStoreService.getObjet('collection.' + url);
        promise
            .then((data_collection: IDataCollection) => {
                // build collection from store and resources from memory
                // @todo success.data is a collection, not an array
                if (this.fillCollectionWithArrrayAndResourcesOnMemory(data_collection.data, collection)) {
                    collection.$source = 'store'; // collection from storeservice, resources from memory
                    collection.$cache_last_update = data_collection._lastupdate_time;
                    resolve(collection);

                    return;
                }

                let promise2 = this.fillCollectionWithArrrayAndResourcesOnStore(data_collection, include, collection);
                promise2
                    .then(() => {
                        // just for precaution, we not rewrite server data
                        if (collection.$source !== 'new') {
                            console.warn('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#', collection.$source);
                            throw new Error('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                        }
                        collection.$source = 'store'; // collection and resources from storeservice
                        collection.$cache_last_update = data_collection._lastupdate_time;
                        resolve(collection);
                    })
                    .catch(() => {
                        reject();
                    });
            })
            .catch(() => {
                reject();
            });
    }

    private fillCollectionWithArrrayAndResourcesOnMemory(dataresources: Array<IDataResource>, collection: ICollection): boolean {
        let all_ok = true;
        for (let key in dataresources) {
            let dataresource = dataresources[key];

            let resource = this.getResourceFromMemory(dataresource);
            if (resource.is_new) {
                all_ok = false;
                break;
            }
            collection[dataresource.id] = resource;
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
        collection: ICollection
    ): Promise<object> {
        let promise = new Promise(
            (resolve: (value: object) => void, reject: (value: any) => void): void => {
                // request resources from store
                let temporalcollection = {};
                let requested_ids = [];
                for (let key in datacollection.data) {
                    let dataresource: IDataResource = datacollection.data[key];
                    let cachememory = Converter.getService(dataresource.type).cachememory;
                    temporalcollection[dataresource.id] = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
                    requested_ids.push(temporalcollection[dataresource.id].type + '.' + dataresource.id);
                }

                // new method
                Core.injectedServices.JsonapiStoreService.getObjets(requested_ids)
                    .then(store_data_resources => {
                        Base.forEach(store_data_resources, data_resource => {
                            Converter.build({ data: data_resource }, temporalcollection[data_resource.id]);

                            // include some times is a collection :S
                            let include_promises: Array<Promise<object>> = [];
                            Base.forEach(include, resource_alias => {
                                this.fillRelationshipFromStore(temporalcollection[data_resource.id], resource_alias, include_promises);
                            });

                            temporalcollection[data_resource.id].lastupdate = data_resource._lastupdate_time;

                            // no debo esperar a que se resuelvan los include
                            if (include_promises.length === 0) {
                                if (datacollection.page) {
                                    collection.page = datacollection.page;
                                }

                                for (let key in temporalcollection) {
                                    let resource: Resource = temporalcollection[key];
                                    collection[resource.id] = resource; // collection from storeservice, resources from memory
                                }

                                resolve(temporalcollection);
                            } else {
                                // esperamos las promesas de los include antes de dar el resolve
                                Promise.all(include_promises)
                                    .then(success3 => {
                                        if (datacollection.page) {
                                            collection.page = datacollection.page;
                                        }

                                        for (let key in temporalcollection) {
                                            let resource: Resource = temporalcollection[key];
                                            collection[resource.id] = resource; // collection from storeservice, resources from memory
                                        }

                                        resolve(temporalcollection);
                                    })
                                    .catch(error3 => {
                                        reject(error3);
                                    });
                            }
                        });
                    })
                    .catch(err => {
                        reject([]);
                    });
            }
        );

        return promise;
    }

    private fillRelationshipFromStore(resource: Resource, resource_alias: string, include_promises: Array<any>) {
        let resource_type = Converter.getService(resource.type).schema.relationships[resource_alias].type || resource_alias;

        if (resource_alias in resource.relationships && 'type' in resource.relationships[resource_type].data) {
            // hasOne
            let related_resource = <IDataResource>resource.relationships[resource_type].data;
            if (!('attributes' in related_resource)) {
                // no está cargado aún
                let builded_resource = this.getResourceFromMemory(related_resource);
                if (builded_resource.is_new) {
                    // no está en memoria, la pedimos a store
                    include_promises.push(this.getResource(builded_resource));
                } else {
                    console.warn('ts-angular-json: esto no debería pasar #isdjf2l1a');
                }
                resource.addRelationship(builded_resource, resource_alias);
            }
        }
        // else hasMany??
    }
}
