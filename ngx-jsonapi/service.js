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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { map } from 'rxjs/operators';
import { Core } from './core';
import { Base } from './services/base';
import { Resource } from './resource';
import { PathBuilder } from './services/path-builder';
import { Converter } from './services/converter';
import { CacheMemory } from './services/cachememory';
import { DocumentCollection } from './document-collection';
import { isLive, relationshipsAreBuilded } from './common';
import { BehaviorSubject, Subject } from 'rxjs';
import { PathCollectionBuilder } from './services/path-collection-builder';
import { ClonedResource } from './cloned-resource';
// unsupported: template constraints.
/**
 * @template R
 */
export class Service {
    constructor() {
        this.resource = Resource;
        setTimeout(() => this.register());
    }
    /**
     * @return {?}
     */
    register() {
        if (Core.me === null) {
            throw new Error('Error: you are trying register `' + this.type + '` before inject JsonapiCore somewhere, almost one time.');
        }
        return Core.me.registerService(this);
    }
    /**
     * @deprecated since 2.2.0. Use new() method.
     * @return {?}
     */
    newResource() {
        return this.new();
    }
    /**
     * @return {?}
     */
    newCollection() {
        return new DocumentCollection();
    }
    /**
     * @return {?}
     */
    new() {
        /** @type {?} */
        let resource = new this.resource();
        resource.type = this.type;
        // issue #36: just if service is not registered yet.
        this.getService();
        resource.reset();
        return /** @type {?} */ (resource);
    }
    /**
     * @return {?}
     */
    getPrePath() {
        return '';
    }
    /**
     * @return {?}
     */
    getPath() {
        return this.path || this.type;
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @return {?}
     */
    getClone(id, params = {}) {
        return this.get(id, params).pipe(map((resource) => {
            // return resource.clone();
            return new ClonedResource(resource);
        }));
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @return {?}
     */
    get(id, params = {}) {
        params = Object.assign({}, Base.ParamsResource, params);
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        /** @type {?} */
        let resource = this.getOrCreateResource(id);
        resource.setLoaded(false);
        /** @type {?} */
        let subject = new BehaviorSubject(resource);
        if (Object.keys(params.fields || []).length > 0) {
            // memory/store cache doesnt support fields
            this.getGetFromServer(path, resource, subject);
        }
        else if (isLive(resource, params.ttl) && relationshipsAreBuilded(resource, params.include || [])) {
            // data on memory and its live
            resource.setLoaded(true);
            setTimeout(() => subject.complete(), 0);
        }
        else if (resource.cache_last_update === 0) {
            // we dont have any data on memory
            this.getGetFromLocal(params, path, resource)
                .then(() => {
                subject.next(resource);
                setTimeout(() => subject.complete(), 0);
            })
                .catch(() => {
                resource.setLoaded(false);
                this.getGetFromServer(path, resource, subject);
            });
        }
        else {
            this.getGetFromServer(path, resource, subject);
        }
        return subject.asObservable();
    }
    /**
     * @param {?=} params
     * @param {?=} path
     * @param {?=} resource
     * @return {?}
     */
    getGetFromLocal(params = {}, path, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            // STORE
            if (!Core.getInstance().injectedServices.json_ripper.enabled) {
                throw new Error('We cant handle this request');
            }
            resource.setLoaded(false);
            /** @type {?} */
            let success = yield Core.getInstance().injectedServices.json_ripper.getResourceByResource(resource, path.includes);
            resource.fill(success);
            resource.setSource('store');
            // when fields is set, get resource form server
            if (isLive(resource, params.ttl)) {
                resource.setLoadedAndPropagate(true);
                // resource.setBuildedAndPropagate(true);
                return;
            }
            throw new Error('Resource is dead!');
        });
    }
    /**
     * @param {?} path
     * @param {?} resource
     * @param {?} subject
     * @return {?}
     */
    getGetFromServer(path, resource, subject) {
        Core.get(path.get()).subscribe(success => {
            resource.fill(/** @type {?} */ (success));
            resource.cache_last_update = Date.now();
            resource.setLoadedAndPropagate(true);
            resource.setSourceAndPropagate('server');
            // this.getService().cachememory.setResource(resource, true);
            Core.getInstance().injectedServices.json_ripper.saveResource(resource, path.includes);
            subject.next(resource);
            setTimeout(() => subject.complete(), 0);
        }, error => {
            resource.setLoadedAndPropagate(true);
            subject.next(resource);
            subject.error(error);
        });
    }
    /**
     * @template T
     * @return {?}
     */
    getService() {
        return /** @type {?} */ ((Converter.getService(this.type) || this.register()));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getOrCreateCollection(path) {
        /** @type {?} */
        const service = this.getService();
        /** @type {?} */
        const collection = /** @type {?} */ (CacheMemory.getInstance().getOrCreateCollection(path.getForCache()));
        collection.ttl = service.collections_ttl;
        if (collection.source !== 'new') {
            collection.source = 'memory';
        }
        return collection;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getOrCreateResource(id) {
        /** @type {?} */
        let service = Converter.getServiceOrFail(this.type);
        /** @type {?} */
        let resource;
        resource = /** @type {?} */ (CacheMemory.getInstance().getResource(this.type, id));
        if (resource === null) {
            resource = /** @type {?} */ (service.new());
            resource.id = id;
            CacheMemory.getInstance().setResource(resource, false);
        }
        if (resource.source !== 'new') {
            resource.source = 'memory';
        }
        return resource;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    createResource(id) {
        /** @type {?} */
        let service = Converter.getServiceOrFail(this.type);
        /** @type {?} */
        let resource = service.new();
        resource.id = id;
        CacheMemory.getInstance().setResource(resource, false);
        return /** @type {?} */ (resource);
    }
    /**
     * deprecated since 2.2
     * @return {?}
     */
    clearCacheMemory() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clearCache();
        });
    }
    /**
     * @return {?}
     */
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let path = new PathBuilder();
            path.applyParams(this);
            // @todo this code is repeated on core.clearCache()
            CacheMemory.getInstance().deprecateCollections(path.getForCache());
            return Core.getInstance().injectedServices.json_ripper.deprecateCollection(path.getForCache()).then(() => true);
        });
    }
    /**
     * @param {?} attributes
     * @return {?}
     */
    parseToServer(attributes) {
        /* */
    }
    /**
     * @param {?} attributes
     * @return {?}
     */
    parseFromServer(attributes) {
        /* */
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @return {?}
     */
    delete(id, params) {
        params = Object.assign({}, Base.ParamsResource, params);
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        /** @type {?} */
        let subject = new Subject();
        Core.delete(path.get()).subscribe(success => {
            CacheMemory.getInstance().removeResource(this.type, id);
            subject.next();
            subject.complete();
        }, error => {
            subject.error(error);
        });
        return subject.asObservable();
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    all(params = {}) {
        /** @type {?} */
        let builded_params = Object.assign({}, Base.ParamsCollection, params);
        if (!builded_params.ttl && builded_params.ttl !== 0) {
            builded_params.ttl = this.collections_ttl;
        }
        /** @type {?} */
        let path = new PathCollectionBuilder();
        path.applyParams(this, builded_params);
        /** @type {?} */
        let temporary_collection = this.getOrCreateCollection(path);
        temporary_collection.page.number = builded_params.page.number * 1;
        /** @type {?} */
        let subject = new BehaviorSubject(temporary_collection);
        if (Object.keys(builded_params.fields).length > 0) {
            // memory/store cache dont suppont fields
            this.getAllFromServer(path, builded_params, temporary_collection, subject);
        }
        else if (isLive(temporary_collection, builded_params.ttl)) {
            // data on memory and its live
            setTimeout(() => subject.complete(), 0);
        }
        else if (temporary_collection.cache_last_update === 0) {
            // we dont have any data on memory
            temporary_collection.source = 'new';
            this.getAllFromLocal(builded_params, path, temporary_collection)
                .then(() => {
                subject.next(temporary_collection);
                setTimeout(() => {
                    subject.complete();
                }, 0);
            })
                .catch(() => {
                temporary_collection.setLoaded(false);
                this.getAllFromServer(path, builded_params, temporary_collection, subject);
            });
        }
        else {
            this.getAllFromServer(path, builded_params, temporary_collection, subject);
        }
        return subject.asObservable();
    }
    /**
     * @param {?=} params
     * @param {?=} path
     * @param {?=} temporary_collection
     * @return {?}
     */
    getAllFromLocal(params = {}, path, temporary_collection) {
        return __awaiter(this, void 0, void 0, function* () {
            // STORE
            if (!Core.getInstance().injectedServices.json_ripper.enabled) {
                throw new Error('We cant handle this request');
            }
            temporary_collection.setLoaded(false);
            /** @type {?} */
            let success;
            if (params.store_cache_method === 'compact') {
                // STORE (compact)
                success = yield Core.getInstance().injectedServices.JsonapiStoreService.getDataObject('collection', path.getForCache() + '.compact');
            }
            else {
                // STORE (individual)
                success = yield Core.getInstance().injectedServices.json_ripper.getCollection(path.getForCache(), path.includes);
            }
            temporary_collection.fill(success);
            temporary_collection.setSourceAndPropagate('store');
            // when fields is set, get resource form server
            if (isLive(temporary_collection, params.ttl)) {
                temporary_collection.setLoadedAndPropagate(true);
                temporary_collection.setBuildedAndPropagate(true);
                return;
            }
            throw new Error('Collection is dead!');
        });
    }
    /**
     * @param {?} path
     * @param {?} params
     * @param {?} temporary_collection
     * @param {?} subject
     * @return {?}
     */
    getAllFromServer(path, params, temporary_collection, subject) {
        temporary_collection.setLoaded(false);
        Core.get(path.get()).subscribe(success => {
            // this create a new ID for every resource (for caching proposes)
            // for example, two URL return same objects but with different attributes
            // tslint:disable-next-line:deprecation
            if (params.cachehash) {
                for (const key in success.data) {
                    /** @type {?} */
                    let resource = success.data[key];
                    // tslint:disable-next-line:deprecation
                    resource.id = resource.id + params.cachehash;
                }
            }
            temporary_collection.fill(/** @type {?} */ (success));
            temporary_collection.cache_last_update = Date.now();
            temporary_collection.setCacheLastUpdateAndPropagate();
            temporary_collection.setSourceAndPropagate('server');
            temporary_collection.setLoadedAndPropagate(true);
            // this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);
            if (Core.getInstance().injectedServices.json_ripper.enabled) {
                Core.getInstance().injectedServices.json_ripper.saveCollection(path.getForCache(), temporary_collection, path.includes);
                if (params.store_cache_method === 'compact') {
                    // @todo migrate to dexie
                    Core.getInstance().injectedServices.JsonapiStoreService.saveCollection(path.getForCache() + '.compact', /** @type {?} */ (success));
                }
            }
            subject.next(temporary_collection);
            setTimeout(() => subject.complete(), 0);
        }, error => {
            temporary_collection.setLoadedAndPropagate(true);
            subject.next(temporary_collection);
            subject.error(error);
        });
    }
}
if (false) {
    /** @type {?} */
    Service.prototype.type;
    /** @type {?} */
    Service.prototype.resource;
    /** @type {?} */
    Service.prototype.collections_ttl;
    /** @type {?} */
    Service.prototype.path;
}
//# sourceMappingURL=service.js.map