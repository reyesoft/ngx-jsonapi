import { Injectable, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { noop as noop$1 } from 'rxjs/util/noop';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { createInstance } from 'localforage';
import { isFunction as isFunction$1 } from 'rxjs/util/isFunction';
import { isArray as isArray$1 } from 'rxjs/util/isArray';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import { isObject as isObject$1 } from 'rxjs/util/isObject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Page {
    constructor() {
        this.number = 0;
        this.total_resources = 0;
        this.resources_per_page = 0;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Base {
    /**
     * @template R
     * @return {?}
     */
    static newCollection() {
        return Object.defineProperties({}, {
            $length: {
                get: function () {
                    return Object.keys(this).length * 1;
                },
                enumerable: false,
            },
            $toArray: {
                get: function () {
                    return Object.keys(this).map(key => {
                        return this[key];
                    });
                },
                enumerable: false,
            },
            $is_loading: {
                value: false,
                enumerable: false,
                writable: true,
            },
            $source: { value: '', enumerable: false, writable: true },
            $cache_last_update: {
                value: 0,
                enumerable: false,
                writable: true
            },
            page: { value: new Page(), enumerable: false, writable: true }
        });
    }
    /**
     * @param {?} ttl
     * @param {?} last_update
     * @return {?}
     */
    static isObjectLive(ttl, last_update) {
        return (ttl >= 0 && Date.now() <= (last_update + ttl * 1000));
    }
    /**
     * @template T
     * @param {?} collection
     * @param {?} fc
     * @return {?}
     */
    static forEach(collection, fc) {
        Object.keys(collection).forEach(key => {
            fc(collection[key], key);
        });
    }
}
Base.Params = {
    id: '',
    include: []
};
Base.Schema = {
    relationships: {},
    ttl: 0
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class JsonapiConfig {
    constructor() {
        this.url = 'http://yourdomain/api/v1/';
        this.params_separator = '?';
        this.unify_concurrency = true;
        this.cache_prerequests = true;
        this.cachestore_support = true;
        this.parameters = {
            page: {
                number: 'page[number]',
                size: 'page[size]'
            }
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// export class Deferred {
//     public promise: Promise<any>;
//     public reject: Function;
//     public resolve: Function;
//
//     constructor() {
//         this.promise = new Promise((resolve, reject)=> {
//             this.reject = reject
//             this.resolve = resolve
//         })
//     }
// }
class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class NoDuplicatedHttpCallsService {
    constructor() {
        this.calls = {};
    }
    /**
     * @param {?} path
     * @return {?}
     */
    hasPromises(path) {
        return path in this.calls;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getAPromise(path) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!(path in this.calls)) {
                this.calls[path] = [];
            }
            let /** @type {?} */ deferred = new Deferred();
            // let deferred = this.$q.defer();
            this.calls[path].push(deferred);
            return deferred.promise;
        });
    }
    /**
     * @param {?} path
     * @param {?} promise
     * @return {?}
     */
    setPromiseRequest(path, promise) {
        return __awaiter$1(this, void 0, void 0, function* () {
            promise
                .then(success => {
                if (path in this.calls) {
                    for (let /** @type {?} */ promise2 of this.calls[path]) {
                        promise2.resolve(success);
                    }
                    delete this.calls[path];
                }
            })
                .catch(error => {
                if (path in this.calls) {
                    for (let /** @type {?} */ promise2 of this.calls[path]) {
                        promise2.reject(error);
                    }
                    delete this.calls[path];
                }
            });
        });
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class Http {
    /**
     * @param {?} http
     * @param {?} rsJsonapiConfig
     * @param {?} noDuplicatedHttpCallsService
     */
    constructor(http$$1, rsJsonapiConfig, noDuplicatedHttpCallsService // private $q
    ) {
        this.http = http$$1;
        this.rsJsonapiConfig = rsJsonapiConfig;
        this.noDuplicatedHttpCallsService = noDuplicatedHttpCallsService;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exec(path, 'DELETE');
        });
    }
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exec(path, 'get');
        });
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @param {?=} call_loadings_error
     * @return {?}
     */
    exec(path, method, data, call_loadings_error = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ fakeHttpPromise = null;
            // http request (if we don't have any GET request yet)
            if (method !== 'get' ||
                !this.noDuplicatedHttpCallsService.hasPromises(path)) {
                let /** @type {?} */ req = new HttpRequest(method, this.rsJsonapiConfig.url + path, data || null, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/vnd.api+json',
                        'Accept': 'application/vnd.api+json'
                    })
                });
                let /** @type {?} */ http_observable = this.http.request(req);
                if (method === 'get') {
                    this.noDuplicatedHttpCallsService.setPromiseRequest(path, http_observable.toPromise());
                }
                else {
                    fakeHttpPromise = http_observable.toPromise();
                }
            }
            if (fakeHttpPromise === null) {
                // method === 'get'
                fakeHttpPromise = this.noDuplicatedHttpCallsService.getAPromise(path);
            }
            let /** @type {?} */ deferred = new Deferred();
            Core.me.refreshLoadings(1);
            fakeHttpPromise
                .then(success => {
                success = success.body || success;
                Core.me.refreshLoadings(-1);
                deferred.resolve(success);
            })
                .catch(error => {
                error = error.error || error;
                Core.me.refreshLoadings(-1);
                if (error.status <= 0) {
                    // offline?
                    if (!Core.me.loadingsOffline(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                    }
                }
                else {
                    if (call_loadings_error && !Core.me.loadingsError(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
                    }
                }
                deferred.reject(error);
            });
            return deferred.promise;
        });
    }
}
Http.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Http.ctorParameters = () => [
    { type: HttpClient, },
    { type: JsonapiConfig, },
    { type: NoDuplicatedHttpCallsService, },
];

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class StoreService {
    constructor() {
        this.globalstore = createInstance({
            name: 'jsonapiglobal',
        });
        this.allstore = createInstance({ name: 'allstore' });
        this.checkIfIsTimeToClean();
    }
    /**
     * @return {?}
     */
    checkIfIsTimeToClean() {
        // check if is time to check cachestore
        this.globalstore
            .getItem('_lastclean_time')
            .then((success) => {
            if (Date.now() >= success.time + 12 * 3600 * 1000) {
                // is time to check cachestore!
                this.globalstore.setItem('_lastclean_time', {
                    time: Date.now(),
                });
                this.checkAndDeleteOldElements();
            }
        })
            .catch(() => {
            this.globalstore.setItem('_lastclean_time', {
                time: Date.now(),
            });
        });
    }
    /**
     * @return {?}
     */
    checkAndDeleteOldElements() {
        this.allstore
            .keys()
            .then(success => {
            Base.forEach(success, key => {
                // recorremos cada item y vemos si es tiempo de removerlo
                this.allstore
                    .getItem(key)
                    .then((success2) => {
                    // es tiempo de removerlo?
                    if (Date.now() >=
                        success2._lastupdate_time + 24 * 3600 * 1000) {
                        // removemos!!
                        this.allstore.removeItem(key);
                    }
                })
                    .catch(noop$1);
            });
        })
            .catch(noop$1);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getObjet(key) {
        return __awaiter$2(this, void 0, void 0, function* () {
            let /** @type {?} */ deferred = new Deferred();
            this.allstore
                .getItem('jsonapi.' + key)
                .then(success => {
                deferred.resolve(success);
            })
                .catch(error => {
                deferred.reject(error);
            });
            return deferred.promise;
        });
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    getObjets(keys) {
        return __awaiter$2(this, void 0, void 0, function* () {
            return this.allstore.getItem('jsonapi.' + keys[0]);
        });
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    saveObject(key, value) {
        value._lastupdate_time = Date.now();
        this.allstore.setItem('jsonapi.' + key, value);
    }
    /**
     * @return {?}
     */
    clearCache() {
        this.allstore.clear();
        this.globalstore.clear();
    }
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    deprecateObjectsWithKey(key_start_with) {
        this.allstore
            .keys()
            .then(success => {
            Base.forEach(success, (key) => {
                if (key.startsWith(key_start_with)) {
                    // key of stored object starts with key_start_with
                    this.allstore
                        .getItem(key)
                        .then((success2) => {
                        success2._lastupdate_time = 0;
                        this.allstore.setItem(key, success2);
                    })
                        .catch(noop$1);
                }
            });
        })
            .catch(noop$1);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} collection
 * @param {?} fc
 * @return {?}
 */
function forEach(collection, fc) {
    Object.keys(collection).forEach(key => {
        fc(key, collection[key]);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Core {
    /**
     * @param {?} user_config
     * @param {?} jsonapiStoreService
     * @param {?} jsonapiHttp
     */
    constructor(user_config, jsonapiStoreService, jsonapiHttp) {
        this.resourceServices = {};
        this.loadingsCounter = 0;
        this.loadingsStart = noop$1;
        this.loadingsDone = noop$1;
        this.loadingsError = noop$1;
        this.loadingsOffline = noop$1;
        this.config = new JsonapiConfig();
        for (let /** @type {?} */ k in this.config)
            (/** @type {?} */ (this.config))[k] = ((/** @type {?} */ (this.config))[k] !== undefined ? (/** @type {?} */ (this.config))[k] : (/** @type {?} */ (this.config))[k]);
        Core.me = this;
        Core.injectedServices = {
            JsonapiStoreService: jsonapiStoreService,
            JsonapiHttp: jsonapiHttp,
            rsJsonapiConfig: this.config
        };
    }
    /**
     * @template R
     * @param {?} clase
     * @return {?}
     */
    registerService(clase) {
        if (clase.type in this.resourceServices) {
            return false;
        }
        this.resourceServices[clase.type] = clase;
        return /** @type {?} */ (clase);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getResourceService(type) {
        return this.resourceServices[type];
    }
    /**
     * @param {?} factor
     * @return {?}
     */
    refreshLoadings(factor) {
        this.loadingsCounter += factor;
        if (this.loadingsCounter === 0) {
            this.loadingsDone();
        }
        else if (this.loadingsCounter === 1) {
            this.loadingsStart();
        }
    }
    /**
     * @return {?}
     */
    clearCache() {
        Core.injectedServices.JsonapiStoreService.clearCache();
        return true;
    }
    /**
     * @param {?} resource
     * @param {...?} relations_alias_to_duplicate_too
     * @return {?}
     */
    duplicateResource(resource, ...relations_alias_to_duplicate_too) {
        let /** @type {?} */ newresource = /** @type {?} */ (this.getResourceService(resource.type).new());
        newresource.attributes = Object.assign({}, newresource.attributes, resource.attributes);
        newresource.attributes["name"] = newresource.attributes["name"] + ' xXx';
        forEach(resource.relationships, (relationship, alias) => {
            if ('id' in relationship.data) {
                // relation hasOne
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    newresource.addRelationship(this.duplicateResource(/** @type {?} */ (relationship.data)), alias);
                }
                else {
                    newresource.addRelationship(/** @type {?} */ (relationship.data), alias);
                }
            }
            else {
                // relation hasMany
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    Base.forEach(relationship.data, relationresource => {
                        newresource.addRelationship(this.duplicateResource(relationresource), alias);
                    });
                }
                else {
                    newresource.addRelationships(/** @type {?} */ (relationship.data), alias);
                }
            }
        });
        return newresource;
    }
}
Core.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Core.ctorParameters = () => [
    { type: JsonapiConfig, decorators: [{ type: Optional },] },
    { type: StoreService, },
    { type: Http, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VpNgxJsonapiModule {
    /**
     * @param {?} parentModule
     * @param {?} jsonapiCore
     */
    constructor(parentModule, jsonapiCore) {
        if (parentModule) {
            throw new Error('VpNgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: VpNgxJsonapiModule,
            providers: [
                { provide: JsonapiConfig, useValue: config }
            ]
        };
    }
}
VpNgxJsonapiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    HttpClientModule
                ],
                providers: [
                    Core,
                    NoDuplicatedHttpCallsService,
                    StoreService,
                    Http
                ]
            },] },
];
/** @nocollapse */
VpNgxJsonapiModule.ctorParameters = () => [
    { type: VpNgxJsonapiModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: Core, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
function Autoregister() {
    return function (target) {
        // save a reference to the original constructor
        var /** @type {?} */ original = target;
        // the new constructor behaviour
        var /** @type {?} */ f = function (...args) {
            let /** @type {?} */ instance = original.apply(this, args);
            instance.register();
            return instance;
        };
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ParentResourceService {
    /**
     * @param {?} exec_params
     * @return {?}
     */
    proccess_exec_params(exec_params) {
        // makes `params` optional
        if (isFunction$1(exec_params.params)) {
            exec_params.fc_error = exec_params.fc_success;
            exec_params.fc_success = /** @type {?} */ (exec_params.params);
            exec_params.params = Object.assign({}, Base.Params);
        }
        else {
            if (typeof exec_params.params === 'undefined') {
                exec_params.params = Object.assign({}, Base.Params);
            }
            else {
                exec_params.params = Object.assign({}, Base.Params, exec_params.params);
            }
        }
        exec_params.fc_success = isFunction$1(exec_params.fc_success) ? exec_params.fc_success : noop$1;
        exec_params.fc_error = isFunction$1(exec_params.fc_error) ? exec_params.fc_error : undefined;
        return /** @type {?} */ (exec_params); // @todo
    }
    /**
     * @param {?} some_fc
     * @param {?} param
     * @return {?}
     */
    runFc(some_fc, param) {
        return isFunction$1(some_fc) ? some_fc(param) : noop$1();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PathBuilder {
    constructor() {
        this.paths = [];
        this.includes = [];
        this.get_params = [];
    }
    /**
     * @param {?} service
     * @param {?=} params
     * @return {?}
     */
    applyParams(service, params = {}) {
        this.appendPath(service.getPrePath());
        if (params.beforepath) {
            this.appendPath(params.beforepath);
        }
        this.appendPath(service.getPath());
        if (params.include) {
            this.setInclude(params.include);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    appendPath(value) {
        if (value !== '') {
            this.paths.push(value);
        }
    }
    /**
     * @param {?} param
     * @return {?}
     */
    addParam(param) {
        this.get_params.push(param);
    }
    /**
     * @param {?} strings_array
     * @return {?}
     */
    setInclude(strings_array) {
        this.includes = strings_array;
    }
    /**
     * @return {?}
     */
    getForCache() {
        return this.paths.join('/') + this.get_params.join('/');
    }
    /**
     * @return {?}
     */
    get() {
        let /** @type {?} */ params = [...this.get_params];
        if (this.includes.length > 0) {
            params.push('include=' + this.includes.join(','));
        }
        return (this.paths.join('/') +
            (params.length > 0
                ? Core.injectedServices.rsJsonapiConfig.params_separator +
                    params.join('&')
                : ''));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResourceRelationshipsConverter {
    /**
     * @param {?} getService
     * @param {?} relationships_from
     * @param {?} relationships_dest
     * @param {?} included_resources
     * @param {?} schema
     */
    constructor(getService, relationships_from, relationships_dest, included_resources, schema) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
        this.schema = schema;
    }
    /**
     * @return {?}
     */
    buildRelationships() {
        // recorro los relationships levanto el service correspondiente
        Base.forEach(this.relationships_from, (relation_from_value, relation_key) => {
            // relation is in schema? have data or just links?
            if (!(relation_key in this.relationships_dest) &&
                'data' in relation_from_value) {
                this.relationships_dest[relation_key] = {
                    data: Base.newCollection(),
                    content: 'collection',
                };
            }
            // sometime data=null or simple { }
            if (!relation_from_value.data) {
                return;
            }
            if (this.schema.relationships[relation_key] &&
                this.schema.relationships[relation_key].hasMany) {
                // hasMany
                this.__buildRelationshipHasMany(relation_from_value, relation_key);
            }
            else {
                // hasOne
                this.__buildRelationshipHasOne(relation_from_value, relation_key);
            }
        });
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    __buildRelationshipHasMany(relation_from_value, relation_key // number to string?
    ) {
        let /** @type {?} */ relation_type = (relation_from_value.data[0] ? relation_from_value.data[0].type : '');
        // @todo: we need check schema. maybe relationship it's empty
        relation_type = relation_type || relation_key /* || schema.relationship.type */;
        if (this.getService(relation_type)) {
            this.__buildRelationshipCollection(relation_from_value, relation_key);
        }
        else {
            this.__buildRelationshipDataCollection(relation_from_value, relation_key);
        }
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    __buildRelationshipDataCollection(relation_from_value, relation_key // number to string?
    ) {
        // @todo: usar collection on data?
        this.relationships_dest[relation_key] = {
            data: relation_from_value.data,
            content: 'ids'
        };
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    __buildRelationshipCollection(relation_from_value, relation_key // number to string?
    ) {
        if (relation_from_value.data.length === 0) {
            // from data is an empty array, remove all data on relationship
            this.relationships_dest[relation_key] = {
                data: Base.newCollection(),
                content: 'collection'
            };
            return;
        }
        let /** @type {?} */ tmp_relationship_data = Base.newCollection();
        this.relationships_dest[relation_key].content = 'collection';
        Base.forEach(relation_from_value.data, (relation_value) => {
            let /** @type {?} */ tmp = this.__buildRelationship(relation_value, this.included_resources);
            // sometimes we have a cache like a services
            if (!('attributes' in tmp) &&
                tmp.id in this.relationships_dest[relation_key].data &&
                'attributes' in
                    this.relationships_dest[relation_key].data[tmp.id]) {
                tmp_relationship_data[tmp.id] = this.relationships_dest[relation_key].data[tmp.id];
            }
            else {
                tmp_relationship_data[tmp.id] = tmp;
            }
            // some resources are not a Resource object
            if (!('attributes' in tmp)) {
                this.relationships_dest[relation_key].content = 'ids';
            }
        });
        // REMOVE resources from cached collection
        // build an array with the news ids
        let /** @type {?} */ new_ids = {};
        Base.forEach(relation_from_value.data, (data_resource) => {
            new_ids[data_resource.id] = true;
        });
        // check if new ids are on destination. If not, delete resource
        Base.forEach(this.relationships_dest[relation_key].data, (relation_dest_value) => {
            if (!(relation_dest_value.id in new_ids)) {
                delete this.relationships_dest[relation_dest_value.id];
            }
        });
        this.relationships_dest[relation_key].data = tmp_relationship_data;
    }
    /**
     * @param {?} relation_data_from
     * @param {?} relation_data_key
     * @return {?}
     */
    __buildRelationshipHasOne(relation_data_from, relation_data_key // number to string?
    ) {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_data_key].data = {};
            return;
        }
        if (this.relationships_dest[relation_data_key].data == null ||
            relation_data_from.data.id !==
                (/** @type {?} */ (this.relationships_dest[relation_data_key].data)).id) {
            this.relationships_dest[relation_data_key].data = {};
        }
        // trae datos o cambió resource? actualizamos!
        if (
        // 'attributes' in relation_data_from.data ||  // ???
        !(/** @type {?} */ (this.relationships_dest[relation_data_key].data))
            .attributes ||
            // we have only a  dataresource
            (/** @type {?} */ (this.relationships_dest[relation_data_key].data)).id !==
                relation_data_from.data.id) {
            let /** @type {?} */ resource_data = this.__buildRelationship(relation_data_from.data, this.included_resources);
            this.relationships_dest[relation_data_key].data = resource_data;
        }
    }
    /**
     * @param {?} resource_data_from
     * @param {?} included_array
     * @return {?}
     */
    __buildRelationship(resource_data_from, included_array) {
        if (resource_data_from.type in included_array &&
            resource_data_from.id in included_array[resource_data_from.type]) {
            // it's in included
            return included_array[resource_data_from.type][resource_data_from.id];
        }
        else {
            // OPTIONAL: return cached Resource
            let /** @type {?} */ service = this.getService(resource_data_from.type);
            if (service &&
                resource_data_from.id in service.cachememory.resources) {
                return service.cachememory.resources[resource_data_from.id];
            }
            else {
                // we dont have information on included or memory. try pass to store
                if (service) {
                    service.cachestore
                        .getResource(resource_data_from)
                        .catch(noop$1);
                }
                return resource_data_from;
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Converter {
    /**
     * @param {?} json_array
     * @param {?=} destination_array
     * @return {?}
     */
    static json_array2resources_array(json_array, destination_array = {}) {
        for (let /** @type {?} */ data of json_array) {
            let /** @type {?} */ resource = Converter.json2resource(data, false);
            destination_array[resource.type + '_' + resource.id] = resource;
        }
    }
    /**
     * @param {?} json_array
     * @return {?}
     */
    static json_array2resources_array_by_type(json_array) {
        let /** @type {?} */ all_resources = {};
        let /** @type {?} */ resources_by_type = {};
        Converter.json_array2resources_array(json_array, all_resources);
        Base.forEach(all_resources, (resource) => {
            if (!(resource.type in resources_by_type)) {
                resources_by_type[resource.type] = {};
            }
            resources_by_type[resource.type][resource.id] = resource;
        });
        return resources_by_type;
    }
    /**
     * @param {?} json_resource
     * @param {?} instance_relationships
     * @return {?}
     */
    static json2resource(json_resource, instance_relationships) {
        let /** @type {?} */ resource_service = Converter.getService(json_resource.type);
        if (resource_service) {
            return Converter.procreate(json_resource);
        }
        else {
            // service not registered
            console.warn('`' + json_resource.type + '`', 'service not found on json2resource()');
            let /** @type {?} */ temp = new Resource();
            temp.id = json_resource.id;
            temp.type = json_resource.type;
            return temp;
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static getService(type) {
        let /** @type {?} */ resource_service = Core.me.getResourceService(type);
        return resource_service;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static procreate(data) {
        if (!('type' in data && 'id' in data)) {
            console.error('Jsonapi Resource is not correct', data);
        }
        let /** @type {?} */ resource;
        if (data.id in Converter.getService(data.type).cachememory.resources) {
            resource = Converter.getService(data.type).cachememory.resources[data.id];
        }
        else {
            resource = Converter.getService(data.type).cachememory.getOrCreateResource(data.type, data.id);
        }
        resource.attributes = data.attributes || {};
        resource.is_new = false;
        return resource;
    }
    /**
     * @param {?} document_from
     * @param {?} resource_dest
     * @return {?}
     */
    static build(document_from, resource_dest) {
        // instancio los include y los guardo en included arrary
        let /** @type {?} */ included_resources = {};
        if ('included' in document_from) {
            included_resources = Converter.json_array2resources_array_by_type(document_from.included);
        }
        if (Array.isArray(document_from.data)) {
            Converter._buildCollection(/** @type {?} */ (document_from), /** @type {?} */ (resource_dest), included_resources);
        }
        else {
            Converter._buildResource(document_from.data, /** @type {?} */ (resource_dest), included_resources);
        }
    }
    /**
     * @param {?} collection_data_from
     * @param {?} collection_dest
     * @param {?} included_resources
     * @return {?}
     */
    static _buildCollection(collection_data_from, collection_dest, included_resources) {
        // sometime get Cannot set property 'number' of undefined (page)
        if (collection_dest.page && collection_data_from.meta) {
            collection_dest.page.number = collection_data_from.meta["page"] || 1;
            collection_dest.page.resources_per_page =
                collection_data_from.meta["resources_per_page"] || null;
            collection_dest.page.total_resources =
                collection_data_from.meta["total_resources"] || null;
        }
        // convert and add new dataresoures to final collection
        let /** @type {?} */ new_ids = {};
        for (let /** @type {?} */ dataresource of collection_data_from.data) {
            if (!(dataresource.id in collection_dest)) {
                collection_dest[dataresource.id] = Converter.getService(dataresource.type).cachememory.getOrCreateResource(dataresource.type, dataresource.id);
            }
            Converter._buildResource(dataresource, collection_dest[dataresource.id], included_resources);
            new_ids[dataresource.id] = dataresource.id;
        }
        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        Base.forEach(collection_dest, resource => {
            if (!(resource.id in new_ids)) {
                delete collection_dest[resource.id];
            }
        });
    }
    /**
     * @param {?} resource_data_from
     * @param {?} resource_dest
     * @param {?} included_resources
     * @return {?}
     */
    static _buildResource(resource_data_from, resource_dest, included_resources) {
        resource_dest.id = resource_data_from.id || '';
        resource_dest.attributes = resource_data_from.attributes || {};
        resource_dest.is_new = false;
        let /** @type {?} */ service = Converter.getService(resource_data_from.type);
        // esto previene la creación indefinida de resources
        // el servicio debe estar sino no tenemos el schema
        if (!resource_dest.relationships || !service) {
            return;
        }
        Converter.getService(resource_data_from.type).parseFromServer(resource_dest.attributes);
        new ResourceRelationshipsConverter(Converter.getService, resource_data_from.relationships || {}, resource_dest.relationships, included_resources, service.schema).buildRelationships();
    }
}

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class Resource extends ParentResourceService {
    constructor() {
        super(...arguments);
        this.is_new = true;
        this.is_loading = false;
        this.is_saving = false;
        this.id = '';
        this.type = '';
        this.attributes = {};
        this.relationships = {};
    }
    /**
     * @return {?}
     */
    reset() {
        this.id = '';
        this.attributes = {};
        this.relationships = {};
        Base.forEach(this.getService().schema.relationships, (value, key) => {
            if (this.getService().schema.relationships[key].hasMany) {
                let /** @type {?} */ relation = {
                    data: Base.newCollection(),
                    content: 'collection',
                };
                this.relationships[key] = relation;
            }
            else {
                let /** @type {?} */ relation = { data: {}, content: 'none' };
                this.relationships[key] = relation;
            }
        });
        this.is_new = true;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    toObject(params) {
        params = Object.assign({}, Base.Params, params);
        let /** @type {?} */ relationships = {};
        let /** @type {?} */ included = [];
        let /** @type {?} */ included_ids = []; // just for control don't repeat any resource
        // REALTIONSHIPS
        Base.forEach(this.relationships, (relationship, relation_alias) => {
            if (this.getService().schema.relationships[relation_alias] &&
                this.getService().schema.relationships[relation_alias]
                    .hasMany) {
                // has many (hasMany:true)
                relationships[relation_alias] = { data: [] };
                Base.forEach(relationship.data, (resource) => {
                    let /** @type {?} */ reational_object = {
                        id: resource.id,
                        type: resource.type,
                    };
                    relationships[relation_alias].data.push(reational_object);
                    // no se agregó aún a included && se ha pedido incluir con el parms.include
                    let /** @type {?} */ temporal_id = resource.type + '_' + resource.id;
                    if (included_ids.indexOf(temporal_id) === -1 &&
                        params.include.indexOf(relation_alias) !== -1) {
                        included_ids.push(temporal_id);
                        included.push(resource.toObject({}).data);
                    }
                });
            }
            else {
                // has one (hasMany:false)
                let /** @type {?} */ relationship_data = /** @type {?} */ (relationship.data);
                if (!('id' in relationship.data) &&
                    Object.keys(relationship.data).length > 0) {
                    console.warn(relation_alias +
                        ' defined with hasMany:false, but I have a collection');
                }
                if (relationship_data.id && relationship_data.type) {
                    relationships[relation_alias] = {
                        data: {
                            id: relationship_data.id,
                            type: relationship_data.type,
                        },
                    };
                }
                else {
                    relationships[relation_alias] = { data: {} };
                }
                // no se agregó aún a included && se ha pedido incluir con el parms.include
                let /** @type {?} */ temporal_id = relationship_data.type + '_' + relationship_data.id;
                if (included_ids.indexOf(temporal_id) === -1 &&
                    params.include.indexOf(relationship_data.type) !== -1) {
                    included_ids.push(temporal_id);
                    included.push(relationship_data.toObject({}).data);
                }
            }
        });
        // just for performance dont copy if not necessary
        let /** @type {?} */ attributes;
        if (this.getService() && this.getService().parseToServer) {
            attributes = Object.assign({}, this.attributes);
            this.getService().parseToServer(attributes);
        }
        else {
            attributes = this.attributes;
        }
        let /** @type {?} */ ret = {
            data: {
                type: this.type,
                id: this.id,
                attributes: attributes,
                relationships: relationships,
            },
        };
        if (included.length > 0) {
            ret.included = included;
        }
        return ret;
    }
    /**
     * @template T
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    save(params, fc_success, fc_error) {
        return __awaiter$3(this, void 0, void 0, function* () {
            return this.__exec({
                id: null,
                params: params,
                fc_success: fc_success,
                fc_error: fc_error,
                exec_type: 'save',
            });
        });
    }
    /**
     * @template T
     * @param {?} exec_params
     * @return {?}
     */
    __exec(exec_params) {
        return __awaiter$3(this, void 0, void 0, function* () {
            let /** @type {?} */ exec_pp = this.proccess_exec_params(exec_params);
            switch (exec_params.exec_type) {
                case 'save':
                    return this._save(exec_pp.params, exec_params.fc_success, exec_params.fc_error);
            }
        });
    }
    /**
     * @template T
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    _save(params, fc_success, fc_error) {
        return __awaiter$3(this, void 0, void 0, function* () {
            let /** @type {?} */ promisesave = new Promise((resolve, reject) => {
                if (this.is_saving || this.is_loading) {
                    return;
                }
                this.is_saving = true;
                let /** @type {?} */ object = this.toObject(params);
                // http request
                let /** @type {?} */ path = new PathBuilder();
                path.applyParams(this.getService(), params);
                if (this.id) {
                    path.appendPath(this.id);
                }
                let /** @type {?} */ promise = Core.injectedServices.JsonapiHttp.exec(path.get(), this.id ? 'PATCH' : 'POST', object, !isFunction$1(fc_error));
                promise
                    .then(success => {
                    this.is_saving = false;
                    // foce reload cache (for example, we add a new element)
                    if (!this.id) {
                        this.getService().cachememory.deprecateCollections(path.get());
                        this.getService().cachestore.deprecateCollections(path.get());
                    }
                    // is a resource?
                    if ('id' in success.data) {
                        this.id = success.data.id;
                        Converter.build(success, this);
                        /*
                                                    Si lo guardo en la caché, luego no queda bindeado con la vista
                                                    Usar {{ $ctrl.service.getCachedResources() | json }}, agregar uno nuevo, editar
                                                    */
                        // this.getService().cachememory.setResource(this);
                    }
                    else if (isArray$1(success.data)) {
                        console.warn('Server return a collection when we save()', success.data);
                        /*
                                                we request the service again, because server maybe are giving
                                                us another type of resource (getService(resource.type))
                                                */
                        let /** @type {?} */ tempororay_collection = this.getService().cachememory.getOrCreateCollection('justAnUpdate');
                        Converter.build(success, tempororay_collection);
                        Base.forEach(tempororay_collection, (resource_value, key) => {
                            let /** @type {?} */ res = Converter.getService(resource_value.type).cachememory.resources[resource_value.id];
                            Converter.getService(resource_value.type).cachememory.setResource(resource_value);
                            Converter.getService(resource_value.type).cachestore.setResource(resource_value);
                            res.id = res.id + 'x';
                        });
                        console.warn('Temporal collection for a resource_value update', tempororay_collection);
                    }
                    this.runFc(fc_success, success);
                    resolve(success);
                })
                    .catch(error => {
                    this.is_saving = false;
                    this.runFc(fc_error, 'data' in error ? error.data : error);
                    reject('data' in error ? error.data : error);
                });
            });
            return promisesave;
        });
    }
    /**
     * @template T
     * @param {?} resource
     * @param {?=} type_alias
     * @return {?}
     */
    addRelationship(resource, type_alias) {
        let /** @type {?} */ object_key = resource.id;
        if (!object_key) {
            object_key = 'new_' + Math.floor(Math.random() * 100000);
        }
        type_alias = type_alias ? type_alias : resource.type;
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, content: 'none' };
        }
        if (type_alias in this.getService().schema.relationships &&
            this.getService().schema.relationships[type_alias].hasMany) {
            this.relationships[type_alias].data[object_key] = resource;
        }
        else {
            this.relationships[type_alias].data = resource;
        }
    }
    /**
     * @param {?} resources
     * @param {?} type_alias
     * @return {?}
     */
    addRelationships(resources, type_alias) {
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, content: 'none' };
        }
        else {
            // we receive a new collection of this relationship. We need remove old (if don't exist on new collection)
            Base.forEach(this.relationships[type_alias].data, resource => {
                if (!(resource.id in resources)) {
                    delete this.relationships[type_alias].data[resource.id];
                }
            });
        }
        Base.forEach(resources, resource => {
            this.relationships[type_alias].data[resource.id] = resource;
        });
    }
    /**
     * @template T
     * @param {?} resources
     * @param {?=} type_alias
     * @return {?}
     */
    addRelationshipsArray(resources, type_alias) {
        resources.forEach((item) => {
            this.addRelationship(item, type_alias || item.type);
        });
    }
    /**
     * @param {?} type_alias
     * @param {?} id
     * @return {?}
     */
    removeRelationship(type_alias, id) {
        if (!(type_alias in this.relationships)) {
            return false;
        }
        if (!('data' in this.relationships[type_alias])) {
            return false;
        }
        if (type_alias in this.getService().schema.relationships &&
            this.getService().schema.relationships[type_alias].hasMany) {
            if (!(id in this.relationships[type_alias].data)) {
                return false;
            }
            delete this.relationships[type_alias].data[id];
        }
        else {
            this.relationships[type_alias].data = {};
        }
        return true;
    }
    /**
     * @return {?}
     */
    getService() {
        return Converter.getService(this.type);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UrlParamsBuilder {
    /**
     * @param {?} params
     * @param {?=} add
     * @return {?}
     */
    toparamsarray(params, add = '') {
        let /** @type {?} */ ret = '';
        if (Array.isArray(params) || isObject$1(params)) {
            Base.forEach(params, (value, key) => {
                ret += this.toparamsarray(value, add + '[' + key + ']');
            });
        }
        else {
            ret += add + '=' + params;
        }
        return ret;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    toparams(params) {
        let /** @type {?} */ ret = '';
        Base.forEach(params, (value, key) => {
            ret += this.toparamsarray(value, '&' + key);
        });
        return ret.slice(1);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LocalFilter {
    /**
     * @param {?} localfilter
     */
    constructor(localfilter) {
        this.localfilterparams = localfilter || {};
    }
    /**
     * @param {?} resource
     * @param {?} localfilter
     * @return {?}
     */
    passFilter(resource, localfilter) {
        for (let /** @type {?} */ attribute in localfilter) {
            if (typeof resource !== 'object' || !('attributes' in resource)) {
                // is not a resource. Is an internal property, for example $source
                return true;
            }
            else if (typeof localfilter[attribute] === 'object') {
                // its a regular expression
                return localfilter[attribute].test(resource.attributes[attribute]);
            }
            else if (typeof resource.attributes[attribute] === 'string') {
                // just a string
                return (resource.attributes[attribute] === localfilter[attribute]);
            }
        }
        return false;
    }
    /**
     * @param {?} source_collection
     * @param {?} dest_collection
     * @return {?}
     */
    filterCollection(source_collection, dest_collection) {
        if (Object.keys(this.localfilterparams).length) {
            Base.forEach(source_collection, (resource, key) => {
                if (this.passFilter(resource, this.localfilterparams)) {
                    dest_collection[key] = resource;
                }
            });
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResourceFunctions {
    /**
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    static resourceToResource(source, destination) {
        destination.attributes = source.attributes;
        // remove relationships on destination resource
        for (let /** @type {?} */ type_alias in destination.relationships) {
            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            }
            else {
                // this resource is a collection?
                if (!('id' in destination.relationships[type_alias].data)) {
                    for (let /** @type {?} */ id in destination.relationships[type_alias].data) {
                        if (!(id in source.relationships[type_alias].data)) {
                            delete destination.relationships[type_alias];
                        }
                    }
                }
            }
        }
        // add source relationships to destination
        for (let /** @type {?} */ type_alias in source.relationships) {
            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(/** @type {?} */ (source.relationships[type_alias].data), type_alias);
            }
            else {
                destination.addRelationships(/** @type {?} */ (source.relationships[type_alias].data), type_alias);
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CacheMemory {
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

var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class CacheStore {
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    getResource(resource /* | IDataResource*/, include = []) {
        return __awaiter$4(this, void 0, void 0, function* () {
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
        return __awaiter$4(this, void 0, void 0, function* () {
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
        return __awaiter$4(this, void 0, void 0, function* () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Service extends ParentResourceService {
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
        let /** @type {?} */ subject = new BehaviorSubject$1(resource);
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
                    .catch(noop$1);
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
        let /** @type {?} */ subject = new BehaviorSubject$1(cached_collection);
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
                        .catch(noop$1);
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
        let /** @type {?} */ subject = new Subject$1();
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { Autoregister, Core as JsonapiCore, Resource, Service, VpNgxJsonapiModule, JsonapiConfig as ɵa, ParentResourceService as ɵe, NoDuplicatedHttpCallsService as ɵd, Http as ɵc, StoreService as ɵb };
//# sourceMappingURL=vp-ngx-jsonapi.js.map
