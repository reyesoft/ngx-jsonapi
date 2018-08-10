import { ICollection, ICache } from '../interfaces';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { Core } from '../core';
import { Base } from './base';
import { IObject } from '../interfaces/object';
import { Resource } from '../resource';
import { Converter } from './converter';

export class CacheStore implements ICache {
    public async getResource(resource: Resource /* | IDataResource*/, include: Array<string> = []): Promise<object> {
        let mypromise: Promise<object> = new Promise(
            (resolve, reject): void => {
                Core.injectedServices.JsonapiStoreService.getObjet(resource.type + '.' + resource.id)
                    .then(success => {
                        Converter.build({ data: success }, resource);

                        let promises: Array<Promise<object>> = [];

                        // include some times is a collection :S
                        // for (let keys in include) {
                        for (const key in include) {
                            let resource_type = include[key];
                            //  && ('attributes' in resource.relationships[resource_type].data)
                            if (resource_type in resource.relationships) {
                                // hasOne
                                let related_resource = <IDataResource>resource.relationships[resource_type].data;
                                if (!('attributes' in related_resource)) {
                                    // no está cargado aún
                                    let builded_resource = this.getResourceFromMemory(related_resource);
                                    if (builded_resource.is_new) {
                                        // no está en memoria, la pedimos a store
                                        promises.push(this.getResource(builded_resource));
                                    } else {
                                        console.warn('ts-angular-json: esto no debería pasar #isdjf2l1a');
                                    }
                                    resource.relationships[resource_type].data = builded_resource;
                                }
                            }
                        }

                        resource.lastupdate = success._lastupdate_time;

                        // no debo esperar a que se resuelvan los include
                        if (promises.length === 0) {
                            resolve(success);
                        } else {
                            // esperamos las promesas de los include antes de dar el resolve
                            Promise.all(promises)
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

                // build collection and resources from store
                // Core.injectedServices.$q.all(promises)
                // .then(success2 => {
                //     deferred.resolve(success2);
                // })
                // .catch(() => {
                //     deferred.reject();
                // });
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

            for (const resource_type_alias in include) {
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
            }
        });
        tmp.page = collection.page;
        Core.injectedServices.JsonapiStoreService.saveObject('collection.' + url, tmp);

        for (const key in resources_for_save) {
            let resource_for_save: Resource = resources_for_save[key];
            if ('is_new' in resource_for_save) {
                this.setResource(resource_for_save);
            } else {
                console.warn('No se pudo guardar en la cache el', resource_for_save.type, 'por no se ser Resource.', resource_for_save);
            }
        }
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
            .then((success: IDataCollection) => {
                // build collection from store and resources from memory
                // @todo success.data is a collection, not an array
                if (this.fillCollectionWithArrrayAndResourcesOnMemory(success.data, collection)) {
                    collection.$source = 'store'; // collection from storeservice, resources from memory
                    collection.$cache_last_update = success._lastupdate_time;
                    resolve(collection);

                    return;
                }

                let promise2 = this.fillCollectionWithArrrayAndResourcesOnStore(success, include, collection);
                promise2
                    .then(() => {
                        // just for precaution, we not rewrite server data
                        if (collection.$source !== 'new') {
                            console.warn('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#', collection.$source);
                            throw new Error('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                        }
                        collection.$source = 'store'; // collection and resources from storeservice
                        collection.$cache_last_update = success._lastupdate_time;
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
                let promises = [];
                for (let key in datacollection.data) {
                    let dataresource: IDataResource = datacollection.data[key];
                    let cachememory = Converter.getService(dataresource.type).cachememory;
                    temporalcollection[dataresource.id] = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
                    promises.push(this.getResource(temporalcollection[dataresource.id], include));
                }

                // build collection and resources from store
                Promise.all(promises)
                    .then(success2 => {
                        if (datacollection.page) {
                            collection.page = datacollection.page;
                        }
                        for (let key in temporalcollection) {
                            let resource: Resource = temporalcollection[key];
                            collection[resource.id] = resource; // collection from storeservice, resources from memory
                        }
                        resolve(collection);
                    })
                    .catch(error2 => {
                        reject(error2);
                    });
            }
        );

        return promise;
    }
}
