/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Base } from './base';
import { Converter } from './converter';
import { ResourceFunctions } from './resource-functions';
export class CacheMemory {
    constructor() {
        this.collections = {};
        this.collections_lastupdate = {};
        this.resources = {};
    }
    /**
     * @param {?} url
     * @return {?}
     */
    isCollectionExist(url) {
        return url in this.collections &&
            this.collections[url].$source !== 'new'
            ? true
            : false;
    }
    /**
     * @param {?} url
     * @param {?} ttl
     * @return {?}
     */
    isCollectionLive(url, ttl) {
        return Date.now() <= this.collections_lastupdate[url] + ttl * 1000;
    }
    /**
     * @param {?} id
     * @param {?} ttl
     * @return {?}
     */
    isResourceLive(id, ttl) {
        return (this.resources[id] &&
            Date.now() <= this.resources[id].lastupdate + ttl * 1000);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getOrCreateCollection(url) {
        if (!(url in this.collections)) {
            this.collections[url] = Base.newCollection();
            this.collections[url].$source = 'new';
        }
        return this.collections[url];
    }
    /**
     * @param {?} url
     * @param {?} collection
     * @return {?}
     */
    setCollection(url, collection) {
        // clone collection, because after maybe delete items for localfilter o pagination
        this.collections[url] = Base.newCollection();
        Object.keys(collection).forEach(resource_id => {
            let /** @type {?} */ resource = collection[resource_id];
            this.collections[url][resource_id] = resource;
            this.setResource(resource);
        });
        this.collections[url].page = collection.page;
        this.collections_lastupdate[url] = Date.now();
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    getOrCreateResource(type, id) {
        if (Converter.getService(type).cachememory &&
            id in Converter.getService(type).cachememory.resources) {
            return Converter.getService(type).cachememory.resources[id];
        }
        else {
            let /** @type {?} */ resource = Converter.getService(type).new();
            resource.id = id;
            // needed for a lot of request (all and get, tested on multinexo.com)
            this.setResource(resource, false);
            return resource;
        }
    }
    /**
     * @param {?} resource
     * @param {?=} update_lastupdate
     * @return {?}
     */
    setResource(resource, update_lastupdate = false) {
        // we cannot redefine object, because view don't update.
        if (resource.id in this.resources) {
            ResourceFunctions.resourceToResource(resource, this.resources[resource.id]);
        }
        else {
            this.resources[resource.id] = resource;
        }
        this.resources[resource.id].lastupdate = update_lastupdate
            ? Date.now()
            : 0;
    }
    /**
     * @param {?} path_start_with
     * @return {?}
     */
    deprecateCollections(path_start_with) {
        Base.forEach(this.collections_lastupdate, (lastupdate, key) => {
            this.collections_lastupdate[key] = 0;
        });
        return true;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeResource(id) {
        Base.forEach(this.collections, (value, url) => {
            delete value[id];
        });
        this.resources[id].attributes = {}; // just for confirm deletion on view
        this.resources[id].relationships = {}; // just for confirm deletion on view
        delete this.resources[id];
    }
}
function CacheMemory_tsickle_Closure_declarations() {
    /** @type {?} */
    CacheMemory.prototype.collections;
    /** @type {?} */
    CacheMemory.prototype.collections_lastupdate;
    /** @type {?} */
    CacheMemory.prototype.resources;
}
//# sourceMappingURL=cachememory.js.map