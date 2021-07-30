/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CacheableHelper } from './services/cacheable-helper.';
import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { Converter } from './services/converter';
import { Core } from './core';
// unsupported: template constraints.
/**
 * @template R
 */
export class RelatedDocumentCollection extends Document {
    constructor() {
        super(...arguments);
        this.data = [];
        this.page = new Page();
        this.ttl = 0;
        this.content = 'ids';
    }
    /**
     * @param {?} index
     * @param {?} iterated_resource
     * @return {?}
     */
    trackBy(index, iterated_resource) {
        return iterated_resource.id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    find(id) {
        if (this.content === 'ids') {
            return null;
        }
        // this is the best way: https://jsperf.com/fast-array-foreach
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return /** @type {?} */ (this.data[i]);
            }
        }
        return null;
    }
    /**
     * @param {?} data_collection
     * @return {?}
     */
    fill(data_collection) {
        Converter.buildIncluded(data_collection);
        // sometimes get Cannot set property 'number' of undefined (page)
        if (this.page && data_collection.meta) {
            this.page.number = data_collection.meta["page"] || 1;
            this.page.resources_per_page = data_collection.meta["resources_per_page"] || null; // @deprecated (v2.0.2)
            this.page.size = data_collection.meta["resources_per_page"] || null;
            this.page.total_resources = data_collection.meta["total_resources"] || null;
        }
        /** @type {?} */
        let new_ids = {};
        this.data.length = 0;
        this.builded = data_collection.data && data_collection.data.length === 0;
        for (let dataresource of data_collection.data) {
            try {
                /** @type {?} */
                let res = this.getResourceOrFail(dataresource);
                res.fill({ data: dataresource });
                new_ids[dataresource.id] = dataresource.id;
                (/** @type {?} */ (this.data)).push(/** @type {?} */ (res));
                if (Object.keys(res.attributes).length > 0) {
                    this.builded = true;
                }
            }
            catch (error) {
                this.content = 'ids';
                this.builded = false;
                this.data.push({ id: dataresource.id, type: dataresource.type });
            }
        }
        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        // @todo test with relation.data.filter(resource =>  resource.id != id );
        for (let i; i < this.data.length; i++) {
            if (!(this.data[i].id in new_ids)) {
                delete this.data[i];
            }
        }
        this.meta = data_collection.meta || {};
        if ('cache_last_update' in data_collection) {
            this.cache_last_update = data_collection.cache_last_update;
        }
    }
    /**
     * @param {?} dataresource
     * @return {?}
     */
    getResourceOrFail(dataresource) {
        /** @type {?} */
        let res = this.find(dataresource.id);
        if (res !== null) {
            return res;
        }
        /** @type {?} */
        let service = Converter.getService(dataresource.type);
        // remove when getService return null or catch errors
        // this prvent a fill on undefinied service :/
        if (!service) {
            if (Core.getInstance().isDevMode()) {
                console.warn('The relationship ' +
                    'relation_alias?' +
                    ' (type ' +
                    dataresource.type +
                    ') cant be generated because service for this type has not been injected.');
            }
            throw new Error('Cant create service for ' + dataresource.type);
        }
        // END remove when getService return null or catch errors
        return service.getOrCreateResource(dataresource.id);
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    replaceOrAdd(resource) {
        /** @type {?} */
        let res = this.find(resource.id);
        if (res === null) {
            (/** @type {?} */ (this.data)).push(resource);
        }
        else {
            res = resource;
        }
    }
    /**
     * @return {?}
     */
    hasMorePages() {
        if (!this.page.size || this.page.size < 1) {
            return null;
        }
        /** @type {?} */
        let total_resources = this.page.size * (this.page.number - 1) + this.data.length;
        return total_resources < this.page.total_resources;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setLoaded(value) {
        // tslint:disable-next-line:deprecation
        this.is_loading = !value;
        this.loaded = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setLoadedAndPropagate(value) {
        this.setLoaded(value);
        if (this.content === 'ids') {
            return;
        }
        (/** @type {?} */ (this.data)).forEach(resource => {
            CacheableHelper.propagateLoaded(resource.relationships, value);
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setBuilded(value) {
        this.builded = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setBuildedAndPropagate(value) {
        this.setBuilded(value);
        if (this.content === 'ids') {
            return;
        }
        (/** @type {?} */ (this.data)).forEach(resource => {
            resource.setLoaded(value);
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSource(value) {
        this.source = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSourceAndPropagate(value) {
        this.setSource(value);
        this.data.forEach(resource => {
            if (resource instanceof Resource) {
                resource.setSource(value);
            }
        });
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    setCacheLastUpdate(value = Date.now()) {
        this.cache_last_update = value;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    setCacheLastUpdateAndPropagate(value = Date.now()) {
        this.setCacheLastUpdate(value);
        this.data.forEach(resource => {
            if (resource instanceof Resource) {
                resource.setCacheLastUpdate(value);
            }
        });
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    toObject(params) {
        if (!this.builded) {
            return { data: this.data };
        }
        /** @type {?} */
        let data = (/** @type {?} */ (this.data)).map(resource => {
            return resource.toObject(params).data;
        });
        return {
            data: data
        };
    }
}
if (false) {
    /** @type {?} */
    RelatedDocumentCollection.prototype.data;
    /** @type {?} */
    RelatedDocumentCollection.prototype.page;
    /** @type {?} */
    RelatedDocumentCollection.prototype.ttl;
    /** @type {?} */
    RelatedDocumentCollection.prototype.content;
}
// unsupported: template constraints.
/**
 * @template R
 */
export class DocumentCollection extends RelatedDocumentCollection {
    constructor() {
        super(...arguments);
        this.data = [];
        this.content = 'collection';
    }
}
if (false) {
    /** @type {?} */
    DocumentCollection.prototype.data;
    /** @type {?} */
    DocumentCollection.prototype.content;
}
//# sourceMappingURL=document-collection.js.map