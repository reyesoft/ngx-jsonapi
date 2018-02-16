var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Core } from '../core';
import { Base } from './base';
import { Converter } from './converter';
export class CacheStore {
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    getResource(resource /* | IDataResource*/, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ mypromise = new Promise((resolve, reject) => {
                Core.injectedServices.JsonapiStoreService.getObjet(resource.type + '.' + resource.id)
                    .then(success => {
                    Converter.build({ data: success }, resource);
                    let /** @type {?} */ promises = [];
                    // include some times is a collection :S
                    // for (let keys in include) {
                    Base.forEach(include, resource_type => {
                        //  && ('attributes' in resource.relationships[resource_type].data)
                        if (resource_type in resource.relationships) {
                            // hasOne
                            let /** @type {?} */ related_resource = /** @type {?} */ (resource
                                .relationships[resource_type].data);
                            if (!('attributes' in related_resource)) {
                                // no está cargado aún
                                let /** @type {?} */ builded_resource = this.getResourceFromMemory(related_resource);
                                if (builded_resource.is_new) {
                                    // no está en memoria, la pedimos a store
                                    promises.push(this.getResource(builded_resource));
                                }
                                else {
                                    console.warn('ts-angular-json: esto no debería pasar #isdjf2l1a');
                                }
                                resource.relationships[resource_type].data = builded_resource;
                            }
                        }
                    });
                    resource.lastupdate = success._lastupdate_time;
                    // no debo esperar a que se resuelvan los include
                    if (promises.length === 0) {
                        resolve(success);
                    }
                    else {
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
            });
            return mypromise;
        });
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    setResource(resource) {
        Core.injectedServices.JsonapiStoreService.saveObject(resource.type + '.' + resource.id, resource.toObject().data);
    }
    /**
     * @param {?} url
     * @param {?} include
     * @param {?} collection
     * @return {?}
     */
    getCollectionFromStorePromise(url, include, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ promise = new Promise((resolve, reject) => {
                this.getCollectionFromStore(url, include, collection, resolve, reject);
            });
            return promise;
        });
    }
    /**
     * @param {?} url
     * @param {?} include
     * @param {?} collection
     * @param {?} resolve
     * @param {?} reject
     * @return {?}
     */
    getCollectionFromStore(url, include, collection, resolve, reject) {
        let /** @type {?} */ promise = Core.injectedServices.JsonapiStoreService.getObjet('collection.' + url);
        promise
            .then((success) => {
            // build collection from store and resources from memory
            // @todo success.data is a collection, not an array
            if (this.fillCollectionWithArrrayAndResourcesOnMemory(success.data, collection)) {
                collection.$source = 'store'; // collection from storeservice, resources from memory
                collection.$cache_last_update = success._lastupdate_time;
                resolve(collection);
                return;
            }
            let /** @type {?} */ promise2 = this.fillCollectionWithArrrayAndResourcesOnStore(success, include, collection);
            promise2
                .then(() => {
                // just for precaution, we not rewrite server data
                if (collection.$source !== 'new') {
                    console.warn('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                    throw new Error('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                }
                collection.$source = 'store'; // collection and resources from storeservice
                collection.$cache_last_update =
                    success._lastupdate_time;
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
    /**
     * @param {?} dataresources
     * @param {?} collection
     * @return {?}
     */
    fillCollectionWithArrrayAndResourcesOnMemory(dataresources, collection) {
        let /** @type {?} */ all_ok = true;
        for (let /** @type {?} */ key in dataresources) {
            let /** @type {?} */ dataresource = dataresources[key];
            let /** @type {?} */ resource = this.getResourceFromMemory(dataresource);
            if (resource.is_new) {
                all_ok = false;
                break;
            }
            collection[dataresource.id] = resource;
        }
        return all_ok;
    }
    /**
     * @param {?} dataresource
     * @return {?}
     */
    getResourceFromMemory(dataresource) {
        let /** @type {?} */ cachememory = Converter.getService(dataresource.type).cachememory;
        let /** @type {?} */ resource = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
        return resource;
    }
    /**
     * @param {?} datacollection
     * @param {?} include
     * @param {?} collection
     * @return {?}
     */
    fillCollectionWithArrrayAndResourcesOnStore(datacollection, include, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ promise = new Promise((resolve, reject) => {
                // request resources from store
                let /** @type {?} */ temporalcollection = {};
                let /** @type {?} */ promises = [];
                for (let /** @type {?} */ key in datacollection.data) {
                    let /** @type {?} */ dataresource = datacollection.data[key];
                    let /** @type {?} */ cachememory = Converter.getService(dataresource.type)
                        .cachememory;
                    temporalcollection[dataresource.id] = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
                    promises.push(this.getResource(temporalcollection[dataresource.id], include));
                }
                // build collection and resources from store
                Promise.all(promises)
                    .then(success2 => {
                    if (datacollection.page) {
                        collection.page = datacollection.page;
                    }
                    for (let /** @type {?} */ key in temporalcollection) {
                        let /** @type {?} */ resource = temporalcollection[key];
                        collection[resource.id] = resource; // collection from storeservice, resources from memory
                    }
                    resolve(collection);
                })
                    .catch(error2 => {
                    reject(error2);
                });
            });
            return promise;
        });
    }
    /**
     * @param {?} url
     * @param {?} collection
     * @param {?} include
     * @return {?}
     */
    setCollection(url, collection, include) {
        let /** @type {?} */ tmp = { data: {}, page: {} };
        let /** @type {?} */ resources_for_save = {};
        Base.forEach(collection, (resource) => {
            this.setResource(resource);
            tmp.data[resource.id] = { id: resource.id, type: resource.type };
            Base.forEach(include, resource_type_alias => {
                if ('id' in resource.relationships[resource_type_alias].data) {
                    // hasOne
                    let /** @type {?} */ ress = /** @type {?} */ (resource.relationships[resource_type_alias].data);
                    resources_for_save[resource_type_alias + ress.id] = ress;
                }
                else {
                    // hasMany
                    let /** @type {?} */ collection2 = /** @type {?} */ (resource.relationships[resource_type_alias].data);
                    Base.forEach(collection2, (inc_resource) => {
                        resources_for_save[resource_type_alias + inc_resource.id] = inc_resource;
                    });
                }
            });
        });
        tmp.page = collection.page;
        Core.injectedServices.JsonapiStoreService.saveObject('collection.' + url, tmp);
        Base.forEach(resources_for_save, resource_for_save => {
            if ('is_new' in resource_for_save) {
                this.setResource(resource_for_save);
            }
            else {
                console.warn('No se pudo guardar en la cache el', resource_for_save.type, 'por no se ser Resource.', resource_for_save);
            }
        });
    }
    /**
     * @param {?} path_start_with
     * @return {?}
     */
    deprecateCollections(path_start_with) {
        Core.injectedServices.JsonapiStoreService.deprecateObjectsWithKey('collection.' + path_start_with);
        return true;
    }
}
//# sourceMappingURL=cachestore.js.map