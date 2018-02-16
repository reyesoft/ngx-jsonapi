/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { noop } from 'rxjs/util/noop';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Core } from './core';
import { Base } from './services/base';
import { Resource } from './resource';
import { ParentResourceService } from './parent-resource-service';
import { PathBuilder } from './services/path-builder';
import { UrlParamsBuilder } from './services/url-params-builder';
import { Converter } from './services/converter';
import { LocalFilter } from './services/localfilter';
import { CacheMemory } from './services/cachememory';
import { CacheStore } from './services/cachestore';
export class Service extends ParentResourceService {
    constructor() {
        super(...arguments);
        this.resource = Resource;
        this.smartfiltertype = 'undefined';
    }
    /**
     * @return {?}
     */
    register() {
        if (Core.me === null) {
            throw new Error('Error: you are trying register `' +
                this.type +
                '` before inject JsonapiCore somewhere, almost one time.');
        }
        // only when service is registered, not cloned object
        this.cachememory = new CacheMemory();
        this.cachestore = new CacheStore();
        this.schema = Object.assign({}, Base.Schema, this.schema);
        return Core.me.registerService(this);
    }
    /**
     * @return {?}
     */
    newResource() {
        let /** @type {?} */ resource = new this.resource();
        return /** @type {?} */ (resource);
    }
    /**
     * @return {?}
     */
    new() {
        let /** @type {?} */ resource = this.newResource();
        resource.type = this.type;
        // issue #36: just if service is not registered yet.
        this.getService();
        resource.reset();
        return resource;
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
        return this.path ? this.path : this.type;
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    get(id, params, fc_success, fc_error) {
        return /** @type {?} */ (this.__exec({
            id: id,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'get',
        }));
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    delete(id, params, fc_success, fc_error) {
        return /** @type {?} */ (this.__exec({
            id: id,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'delete',
        }));
    }
    /**
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    all(params, fc_success, fc_error) {
        return /** @type {?} */ (this.__exec({
            id: null,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'all',
        }));
    }
    /**
     * @param {?} exec_params
     * @return {?}
     */
    __exec(exec_params) {
        let /** @type {?} */ exec_pp = super.proccess_exec_params(exec_params);
        switch (exec_pp.exec_type) {
            case 'get':
                return this._get(exec_pp.id, exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
            case 'delete':
                return this._delete(exec_pp.id, exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
            case 'all':
                return this._all(exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
        }
    }
    /**
     * @param {?} id
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    _get(id, params, fc_success, fc_error) {
        // http request
        let /** @type {?} */ path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        // CACHEMEMORY
        let /** @type {?} */ resource = /** @type {?} */ (this.getService().cachememory.getOrCreateResource(this.type, id));
        resource.is_loading = true;
        let /** @type {?} */ subject = new BehaviorSubject(resource);
        // exit if ttl is not expired
        let /** @type {?} */ temporal_ttl = params.ttl || 0; // this.schema.ttl
        if (this.getService().cachememory.isResourceLive(id, temporal_ttl)) {
            // we create a promise because we need return collection before
            // run success client function
            let /** @type {?} */ promise = new Promise((resolve, reject) => {
                resolve(fc_success);
                promise
                    .then(fc_success2 => {
                    console.warn('vp-ngx-jsonapi: THIS CODE NEVER RUN, RIGHT? :/ Please check.');
                    subject.next(resource);
                    this.runFc(fc_success2, 'cachememory');
                })
                    .catch(noop);
                resource.is_loading = false;
            });
            subject.next(resource);
            subject.complete();
            return subject.asObservable();
        }
        else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // CACHESTORE
            this.getService()
                .cachestore.getResource(resource)
                .then(success => {
                if (Base.isObjectLive(temporal_ttl, resource.lastupdate)) {
                    subject.next(resource);
                    this.runFc(fc_success, { data: success });
                }
                else {
                    this.getGetFromServer(path, fc_success, fc_error, resource, subject);
                }
            })
                .catch(error => {
                this.getGetFromServer(path, fc_success, fc_error, resource, subject);
            });
        }
        else {
            this.getGetFromServer(path, fc_success, fc_error, resource, subject);
        }
        subject.next(resource);
        return subject.asObservable();
    }
    /**
     * @param {?} path
     * @param {?} fc_success
     * @param {?} fc_error
     * @param {?} resource
     * @param {?} subject
     * @return {?}
     */
    getGetFromServer(path, fc_success, fc_error, resource, subject) {
        Core.injectedServices.JsonapiHttp.get(path.get())
            .then(success => {
            Converter.build(success, resource);
            resource.is_loading = false;
            this.getService().cachememory.setResource(resource);
            if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                this.getService().cachestore.setResource(resource);
            }
            subject.next(resource);
            subject.complete();
            this.runFc(fc_success, success);
        })
            .catch(error => {
            subject.error(error);
            this.runFc(fc_error, error);
        });
    }
    /**
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    _all(params, fc_success, fc_error) {
        // check smartfiltertype, and set on remotefilter
        if (params.smartfilter && this.smartfiltertype !== 'localfilter') {
            Object.assign(params.remotefilter, params.smartfilter);
        }
        params.cachehash = params.cachehash || '';
        // http request
        let /** @type {?} */ path = new PathBuilder();
        let /** @type {?} */ paramsurl = new UrlParamsBuilder();
        path.applyParams(this, params);
        if (params.remotefilter &&
            Object.keys(params.remotefilter).length > 0) {
            if (this.getService().parseToServer) {
                this.getService().parseToServer(params.remotefilter);
            }
            path.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }
        if (params.page) {
            if (params.page.number > 1) {
                path.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.number +
                    '=' + params.page.number);
            }
            if (params.page.size) {
                path.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.size +
                    '=' + params.page.size);
            }
        }
        // make request
        // if we remove this, dont work the same .all on same time (ej: <component /><component /><component />)
        let /** @type {?} */ tempororay_collection = this.getService().cachememory.getOrCreateCollection(path.getForCache());
        // creamos otra colleción si luego será filtrada
        let /** @type {?} */ localfilter = new LocalFilter(params.localfilter);
        let /** @type {?} */ cached_collection;
        if (params.localfilter && Object.keys(params.localfilter).length > 0) {
            cached_collection = Base.newCollection();
        }
        else {
            cached_collection = tempororay_collection;
        }
        let /** @type {?} */ subject = new BehaviorSubject(cached_collection);
        // MEMORY_CACHE
        let /** @type {?} */ temporal_ttl = params.ttl || this.schema.ttl;
        if (temporal_ttl >= 0 &&
            this.getService().cachememory.isCollectionExist(path.getForCache())) {
            // get cached data and merge with temporal collection
            tempororay_collection.$source = 'memory';
            // check smartfiltertype, and set on localfilter
            if (params.smartfilter && this.smartfiltertype === 'localfilter') {
                Object.assign(params.localfilter, params.smartfilter);
            }
            // fill collection and localfilter
            localfilter.filterCollection(tempororay_collection, cached_collection);
            // exit if ttl is not expired
            if (this.getService().cachememory.isCollectionLive(path.getForCache(), temporal_ttl)) {
                // we create a promise because we need return collection before
                // run success client function
                let /** @type {?} */ promise = new Promise((resolve, reject) => {
                    resolve(fc_success);
                    promise
                        .then(fc_success2 => {
                        subject.next(tempororay_collection);
                        this.runFc(fc_success2, 'cachememory');
                    })
                        .catch(noop);
                });
            }
            else {
                this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
            }
        }
        else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // STORE
            tempororay_collection.$is_loading = true;
            this.getService()
                .cachestore.getCollectionFromStorePromise(path.getForCache(), path.includes, tempororay_collection)
                .then(success => {
                tempororay_collection.$source = 'store';
                tempororay_collection.$is_loading = false;
                // when load collection from store, we save collection on memory
                this.getService().cachememory.setCollection(path.getForCache(), tempororay_collection);
                // localfilter getted data
                localfilter.filterCollection(tempororay_collection, cached_collection);
                if (Base.isObjectLive(temporal_ttl, tempororay_collection.$cache_last_update)) {
                    subject.next(tempororay_collection);
                    this.runFc(fc_success, { data: success });
                }
                else {
                    this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
                }
            })
                .catch(error => {
                this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
            });
        }
        else {
            // STORE
            tempororay_collection.$is_loading = true;
            this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
        }
        subject.next(/** @type {?} */ (cached_collection));
        return subject.asObservable();
    }
    /**
     * @param {?} path
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @param {?} tempororay_collection
     * @param {?} cached_collection
     * @param {?} subject
     * @return {?}
     */
    getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject) {
        // SERVER REQUEST
        tempororay_collection.$is_loading = true;
        Core.injectedServices.JsonapiHttp.get(path.get())
            .then(success => {
            tempororay_collection.$source = 'server';
            tempororay_collection.$is_loading = false;
            // this create a new ID for every resource (for caching proposes)
            // for example, two URL return same objects but with different attributes
            if (params.cachehash) {
                Base.forEach(success.data, resource => {
                    resource.id = resource.id + params.cachehash;
                });
            }
            Converter.build(success, tempororay_collection);
            this.getService().cachememory.setCollection(path.getForCache(), tempororay_collection);
            if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                this.getService().cachestore.setCollection(path.getForCache(), tempororay_collection, params.include);
            }
            // localfilter getted data
            let /** @type {?} */ localfilter = new LocalFilter(params.localfilter);
            localfilter.filterCollection(tempororay_collection, cached_collection);
            // trying to define smartfiltertype
            if (this.smartfiltertype === 'undefined') {
                let /** @type {?} */ page = tempororay_collection.page;
                if (page.number === 1 &&
                    page.total_resources <= page.resources_per_page) {
                    this.smartfiltertype = 'localfilter';
                }
                else if (page.number === 1 &&
                    page.total_resources > page.resources_per_page) {
                    this.smartfiltertype = 'remotefilter';
                }
            }
            subject.next(tempororay_collection);
            subject.complete();
            this.runFc(fc_success, success);
        })
            .catch(error => {
            // do not replace $source, because localstorage don't write if = server
            // tempororay_collection.$source = 'server';
            tempororay_collection.$is_loading = false;
            subject.next(tempororay_collection);
            subject.error(error);
            this.runFc(fc_error, error);
        });
    }
    /**
     * @param {?} id
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    _delete(id, params, fc_success, fc_error) {
        // http request
        let /** @type {?} */ path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        let /** @type {?} */ subject = new Subject();
        Core.injectedServices.JsonapiHttp.delete(path.get())
            .then(success => {
            this.getService().cachememory.removeResource(id);
            subject.next();
            subject.complete();
            this.runFc(fc_success, success);
        })
            .catch(error => {
            subject.error(error);
            this.runFc(fc_error, error);
        });
        return subject.asObservable();
    }
    /**
     * @template T
     * @return {?}
     */
    getService() {
        return /** @type {?} */ ((Converter.getService(this.type) || this.register()));
        // let serv = Converter.getService(this.type);
        // if (serv) {
        //     return serv;
        // } else {
        //     return this.register();
        // }
    }
    /**
     * @return {?}
     */
    clearCacheMemory() {
        let /** @type {?} */ path = new PathBuilder();
        path.applyParams(this);
        return (this.getService().cachememory.deprecateCollections(path.getForCache()) &&
            this.getService().cachestore.deprecateCollections(path.getForCache()));
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
}
function Service_tsickle_Closure_declarations() {
    /** @type {?} */
    Service.prototype.schema;
    /** @type {?} */
    Service.prototype.cachememory;
    /** @type {?} */
    Service.prototype.cachestore;
    /** @type {?} */
    Service.prototype.type;
    /** @type {?} */
    Service.prototype.resource;
    /** @type {?} */
    Service.prototype.path;
    /** @type {?} */
    Service.prototype.smartfiltertype;
}
//# sourceMappingURL=service.js.map