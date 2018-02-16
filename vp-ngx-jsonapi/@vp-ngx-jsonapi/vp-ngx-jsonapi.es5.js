var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var Page = (function () {
    function Page() {
        this.number = 0;
        this.total_resources = 0;
        this.resources_per_page = 0;
    }
    return Page;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Base = (function () {
    function Base() {
    }
    /**
     * @template R
     * @return {?}
     */
    Base.newCollection = function () {
        return Object.defineProperties({}, {
            $length: {
                get: function () {
                    return Object.keys(this).length * 1;
                },
                enumerable: false,
            },
            $toArray: {
                get: function () {
                    var _this = this;
                    return Object.keys(this).map(function (key) {
                        return _this[key];
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
    };
    /**
     * @param {?} ttl
     * @param {?} last_update
     * @return {?}
     */
    Base.isObjectLive = function (ttl, last_update) {
        return (ttl >= 0 && Date.now() <= (last_update + ttl * 1000));
    };
    /**
     * @template T
     * @param {?} collection
     * @param {?} fc
     * @return {?}
     */
    Base.forEach = function (collection, fc) {
        Object.keys(collection).forEach(function (key) {
            fc(collection[key], key);
        });
    };
    return Base;
}());
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
var JsonapiConfig = (function () {
    function JsonapiConfig() {
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
    return JsonapiConfig;
}());
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
var Deferred = (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NoDuplicatedHttpCallsService = (function () {
    function NoDuplicatedHttpCallsService() {
        this.calls = {};
    }
    /**
     * @param {?} path
     * @return {?}
     */
    NoDuplicatedHttpCallsService.prototype.hasPromises = function (path) {
        return path in this.calls;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    NoDuplicatedHttpCallsService.prototype.getAPromise = function (path) {
        return __awaiter$1(this, void 0, void 0, function () {
            var deferred;
            return __generator(this, function (_a) {
                if (!(path in this.calls)) {
                    this.calls[path] = [];
                }
                deferred = new Deferred();
                // let deferred = this.$q.defer();
                this.calls[path].push(deferred);
                return [2 /*return*/, deferred.promise];
            });
        });
    };
    /**
     * @param {?} path
     * @param {?} promise
     * @return {?}
     */
    NoDuplicatedHttpCallsService.prototype.setPromiseRequest = function (path, promise) {
        return __awaiter$1(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                promise
                    .then(function (success) {
                    if (path in _this.calls) {
                        for (var _i = 0, _a = _this.calls[path]; _i < _a.length; _i++) {
                            var promise2 = _a[_i];
                            promise2.resolve(success);
                        }
                        delete _this.calls[path];
                    }
                })
                    .catch(function (error) {
                    if (path in _this.calls) {
                        for (var _i = 0, _a = _this.calls[path]; _i < _a.length; _i++) {
                            var promise2 = _a[_i];
                            promise2.reject(error);
                        }
                        delete _this.calls[path];
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return NoDuplicatedHttpCallsService;
}());
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Http = (function () {
    /**
     * @param {?} http
     * @param {?} rsJsonapiConfig
     * @param {?} noDuplicatedHttpCallsService
     */
    function Http(http$$1, rsJsonapiConfig, noDuplicatedHttpCallsService // private $q
    ) {
        this.http = http$$1;
        this.rsJsonapiConfig = rsJsonapiConfig;
        this.noDuplicatedHttpCallsService = noDuplicatedHttpCallsService;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    Http.prototype.delete = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exec(path, 'DELETE')];
            });
        });
    };
    /**
     * @param {?} path
     * @return {?}
     */
    Http.prototype.get = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exec(path, 'get')];
            });
        });
    };
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @param {?=} call_loadings_error
     * @return {?}
     */
    Http.prototype.exec = function (path, method, data, call_loadings_error) {
        if (call_loadings_error === void 0) { call_loadings_error = true; }
        return __awaiter(this, void 0, void 0, function () {
            var fakeHttpPromise, req, http_observable, deferred;
            return __generator(this, function (_a) {
                fakeHttpPromise = null;
                // http request (if we don't have any GET request yet)
                if (method !== 'get' ||
                    !this.noDuplicatedHttpCallsService.hasPromises(path)) {
                    req = new HttpRequest(method, this.rsJsonapiConfig.url + path, data || null, {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/vnd.api+json',
                            'Accept': 'application/vnd.api+json'
                        })
                    });
                    http_observable = this.http.request(req);
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
                deferred = new Deferred();
                Core.me.refreshLoadings(1);
                fakeHttpPromise
                    .then(function (success) {
                    success = success.body || success;
                    Core.me.refreshLoadings(-1);
                    deferred.resolve(success);
                })
                    .catch(function (error) {
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
                return [2 /*return*/, deferred.promise];
            });
        });
    };
    return Http;
}());
Http.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Http.ctorParameters = function () { return [
    { type: HttpClient, },
    { type: JsonapiConfig, },
    { type: NoDuplicatedHttpCallsService, },
]; };
var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StoreService = (function () {
    function StoreService() {
        this.globalstore = createInstance({
            name: 'jsonapiglobal',
        });
        this.allstore = createInstance({ name: 'allstore' });
        this.checkIfIsTimeToClean();
    }
    /**
     * @return {?}
     */
    StoreService.prototype.checkIfIsTimeToClean = function () {
        var _this = this;
        // check if is time to check cachestore
        this.globalstore
            .getItem('_lastclean_time')
            .then(function (success) {
            if (Date.now() >= success.time + 12 * 3600 * 1000) {
                // is time to check cachestore!
                _this.globalstore.setItem('_lastclean_time', {
                    time: Date.now(),
                });
                _this.checkAndDeleteOldElements();
            }
        })
            .catch(function () {
            _this.globalstore.setItem('_lastclean_time', {
                time: Date.now(),
            });
        });
    };
    /**
     * @return {?}
     */
    StoreService.prototype.checkAndDeleteOldElements = function () {
        var _this = this;
        this.allstore
            .keys()
            .then(function (success) {
            Base.forEach(success, function (key) {
                // recorremos cada item y vemos si es tiempo de removerlo
                _this.allstore
                    .getItem(key)
                    .then(function (success2) {
                    // es tiempo de removerlo?
                    if (Date.now() >=
                        success2._lastupdate_time + 24 * 3600 * 1000) {
                        // removemos!!
                        _this.allstore.removeItem(key);
                    }
                })
                    .catch(noop$1);
            });
        })
            .catch(noop$1);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    StoreService.prototype.getObjet = function (key) {
        return __awaiter$2(this, void 0, void 0, function () {
            var deferred;
            return __generator(this, function (_a) {
                deferred = new Deferred();
                this.allstore
                    .getItem('jsonapi.' + key)
                    .then(function (success) {
                    deferred.resolve(success);
                })
                    .catch(function (error) {
                    deferred.reject(error);
                });
                return [2 /*return*/, deferred.promise];
            });
        });
    };
    /**
     * @param {?} keys
     * @return {?}
     */
    StoreService.prototype.getObjets = function (keys) {
        return __awaiter$2(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.allstore.getItem('jsonapi.' + keys[0])];
            });
        });
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    StoreService.prototype.saveObject = function (key, value) {
        value._lastupdate_time = Date.now();
        this.allstore.setItem('jsonapi.' + key, value);
    };
    /**
     * @return {?}
     */
    StoreService.prototype.clearCache = function () {
        this.allstore.clear();
        this.globalstore.clear();
    };
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    StoreService.prototype.deprecateObjectsWithKey = function (key_start_with) {
        var _this = this;
        this.allstore
            .keys()
            .then(function (success) {
            Base.forEach(success, function (key) {
                if (key.startsWith(key_start_with)) {
                    // key of stored object starts with key_start_with
                    _this.allstore
                        .getItem(key)
                        .then(function (success2) {
                        success2._lastupdate_time = 0;
                        _this.allstore.setItem(key, success2);
                    })
                        .catch(noop$1);
                }
            });
        })
            .catch(noop$1);
    };
    return StoreService;
}());
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
    Object.keys(collection).forEach(function (key) {
        fc(key, collection[key]);
    });
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Core = (function () {
    /**
     * @param {?} user_config
     * @param {?} jsonapiStoreService
     * @param {?} jsonapiHttp
     */
    function Core(user_config, jsonapiStoreService, jsonapiHttp) {
        this.resourceServices = {};
        this.loadingsCounter = 0;
        this.loadingsStart = noop$1;
        this.loadingsDone = noop$1;
        this.loadingsError = noop$1;
        this.loadingsOffline = noop$1;
        this.config = new JsonapiConfig();
        for (var /** @type {?} */ k in this.config)
            ((this.config))[k] = (((this.config))[k] !== undefined ? ((this.config))[k] : ((this.config))[k]);
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
    Core.prototype.registerService = function (clase) {
        if (clase.type in this.resourceServices) {
            return false;
        }
        this.resourceServices[clase.type] = clase;
        return (clase);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Core.prototype.getResourceService = function (type) {
        return this.resourceServices[type];
    };
    /**
     * @param {?} factor
     * @return {?}
     */
    Core.prototype.refreshLoadings = function (factor) {
        this.loadingsCounter += factor;
        if (this.loadingsCounter === 0) {
            this.loadingsDone();
        }
        else if (this.loadingsCounter === 1) {
            this.loadingsStart();
        }
    };
    /**
     * @return {?}
     */
    Core.prototype.clearCache = function () {
        Core.injectedServices.JsonapiStoreService.clearCache();
        return true;
    };
    /**
     * @param {?} resource
     * @param {...?} relations_alias_to_duplicate_too
     * @return {?}
     */
    Core.prototype.duplicateResource = function (resource) {
        var _this = this;
        var relations_alias_to_duplicate_too = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            relations_alias_to_duplicate_too[_i - 1] = arguments[_i];
        }
        var /** @type {?} */ newresource = (this.getResourceService(resource.type).new());
        newresource.attributes = Object.assign({}, newresource.attributes, resource.attributes);
        newresource.attributes["name"] = newresource.attributes["name"] + ' xXx';
        forEach(resource.relationships, function (relationship, alias) {
            if ('id' in relationship.data) {
                // relation hasOne
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    newresource.addRelationship(_this.duplicateResource(/** @type {?} */ (relationship.data)), alias);
                }
                else {
                    newresource.addRelationship(/** @type {?} */ (relationship.data), alias);
                }
            }
            else {
                // relation hasMany
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    Base.forEach(relationship.data, function (relationresource) {
                        newresource.addRelationship(_this.duplicateResource(relationresource), alias);
                    });
                }
                else {
                    newresource.addRelationships(/** @type {?} */ (relationship.data), alias);
                }
            }
        });
        return newresource;
    };
    return Core;
}());
Core.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Core.ctorParameters = function () { return [
    { type: JsonapiConfig, decorators: [{ type: Optional },] },
    { type: StoreService, },
    { type: Http, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VpNgxJsonapiModule = (function () {
    /**
     * @param {?} parentModule
     * @param {?} jsonapiCore
     */
    function VpNgxJsonapiModule(parentModule, jsonapiCore) {
        if (parentModule) {
            throw new Error('VpNgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    VpNgxJsonapiModule.forRoot = function (config) {
        return {
            ngModule: VpNgxJsonapiModule,
            providers: [
                { provide: JsonapiConfig, useValue: config }
            ]
        };
    };
    return VpNgxJsonapiModule;
}());
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
VpNgxJsonapiModule.ctorParameters = function () { return [
    { type: VpNgxJsonapiModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: Core, },
]; };
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
        var /** @type {?} */ f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var /** @type {?} */ instance = original.apply(this, args);
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
var ParentResourceService = (function () {
    function ParentResourceService() {
    }
    /**
     * @param {?} exec_params
     * @return {?}
     */
    ParentResourceService.prototype.proccess_exec_params = function (exec_params) {
        // makes `params` optional
        if (isFunction$1(exec_params.params)) {
            exec_params.fc_error = exec_params.fc_success;
            exec_params.fc_success = (exec_params.params);
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
        return (exec_params); // @todo
    };
    /**
     * @param {?} some_fc
     * @param {?} param
     * @return {?}
     */
    ParentResourceService.prototype.runFc = function (some_fc, param) {
        return isFunction$1(some_fc) ? some_fc(param) : noop$1();
    };
    return ParentResourceService;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PathBuilder = (function () {
    function PathBuilder() {
        this.paths = [];
        this.includes = [];
        this.get_params = [];
    }
    /**
     * @param {?} service
     * @param {?=} params
     * @return {?}
     */
    PathBuilder.prototype.applyParams = function (service, params) {
        if (params === void 0) { params = {}; }
        this.appendPath(service.getPrePath());
        if (params.beforepath) {
            this.appendPath(params.beforepath);
        }
        this.appendPath(service.getPath());
        if (params.include) {
            this.setInclude(params.include);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PathBuilder.prototype.appendPath = function (value) {
        if (value !== '') {
            this.paths.push(value);
        }
    };
    /**
     * @param {?} param
     * @return {?}
     */
    PathBuilder.prototype.addParam = function (param) {
        this.get_params.push(param);
    };
    /**
     * @param {?} strings_array
     * @return {?}
     */
    PathBuilder.prototype.setInclude = function (strings_array) {
        this.includes = strings_array;
    };
    /**
     * @return {?}
     */
    PathBuilder.prototype.getForCache = function () {
        return this.paths.join('/') + this.get_params.join('/');
    };
    /**
     * @return {?}
     */
    PathBuilder.prototype.get = function () {
        var /** @type {?} */ params = this.get_params.slice();
        if (this.includes.length > 0) {
            params.push('include=' + this.includes.join(','));
        }
        return (this.paths.join('/') +
            (params.length > 0
                ? Core.injectedServices.rsJsonapiConfig.params_separator +
                    params.join('&')
                : ''));
    };
    return PathBuilder;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResourceRelationshipsConverter = (function () {
    /**
     * @param {?} getService
     * @param {?} relationships_from
     * @param {?} relationships_dest
     * @param {?} included_resources
     * @param {?} schema
     */
    function ResourceRelationshipsConverter(getService, relationships_from, relationships_dest, included_resources, schema) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
        this.schema = schema;
    }
    /**
     * @return {?}
     */
    ResourceRelationshipsConverter.prototype.buildRelationships = function () {
        var _this = this;
        // recorro los relationships levanto el service correspondiente
        Base.forEach(this.relationships_from, function (relation_from_value, relation_key) {
            // relation is in schema? have data or just links?
            if (!(relation_key in _this.relationships_dest) &&
                'data' in relation_from_value) {
                _this.relationships_dest[relation_key] = {
                    data: Base.newCollection(),
                    content: 'collection',
                };
            }
            // sometime data=null or simple { }
            if (!relation_from_value.data) {
                return;
            }
            if (_this.schema.relationships[relation_key] &&
                _this.schema.relationships[relation_key].hasMany) {
                // hasMany
                _this.__buildRelationshipHasMany(relation_from_value, relation_key);
            }
            else {
                // hasOne
                _this.__buildRelationshipHasOne(relation_from_value, relation_key);
            }
        });
    };
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    ResourceRelationshipsConverter.prototype.__buildRelationshipHasMany = function (relation_from_value, relation_key // number to string?
    ) {
        var /** @type {?} */ relation_type = (relation_from_value.data[0] ? relation_from_value.data[0].type : '');
        // @todo: we need check schema. maybe relationship it's empty
        relation_type = relation_type || relation_key /* || schema.relationship.type */;
        if (this.getService(relation_type)) {
            this.__buildRelationshipCollection(relation_from_value, relation_key);
        }
        else {
            this.__buildRelationshipDataCollection(relation_from_value, relation_key);
        }
    };
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    ResourceRelationshipsConverter.prototype.__buildRelationshipDataCollection = function (relation_from_value, relation_key // number to string?
    ) {
        // @todo: usar collection on data?
        this.relationships_dest[relation_key] = {
            data: relation_from_value.data,
            content: 'ids'
        };
    };
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    ResourceRelationshipsConverter.prototype.__buildRelationshipCollection = function (relation_from_value, relation_key // number to string?
    ) {
        var _this = this;
        if (relation_from_value.data.length === 0) {
            // from data is an empty array, remove all data on relationship
            this.relationships_dest[relation_key] = {
                data: Base.newCollection(),
                content: 'collection'
            };
            return;
        }
        var /** @type {?} */ tmp_relationship_data = Base.newCollection();
        this.relationships_dest[relation_key].content = 'collection';
        Base.forEach(relation_from_value.data, function (relation_value) {
            var /** @type {?} */ tmp = _this.__buildRelationship(relation_value, _this.included_resources);
            // sometimes we have a cache like a services
            if (!('attributes' in tmp) &&
                tmp.id in _this.relationships_dest[relation_key].data &&
                'attributes' in
                    _this.relationships_dest[relation_key].data[tmp.id]) {
                tmp_relationship_data[tmp.id] = _this.relationships_dest[relation_key].data[tmp.id];
            }
            else {
                tmp_relationship_data[tmp.id] = tmp;
            }
            // some resources are not a Resource object
            if (!('attributes' in tmp)) {
                _this.relationships_dest[relation_key].content = 'ids';
            }
        });
        // REMOVE resources from cached collection
        // build an array with the news ids
        var /** @type {?} */ new_ids = {};
        Base.forEach(relation_from_value.data, function (data_resource) {
            new_ids[data_resource.id] = true;
        });
        // check if new ids are on destination. If not, delete resource
        Base.forEach(this.relationships_dest[relation_key].data, function (relation_dest_value) {
            if (!(relation_dest_value.id in new_ids)) {
                delete _this.relationships_dest[relation_dest_value.id];
            }
        });
        this.relationships_dest[relation_key].data = tmp_relationship_data;
    };
    /**
     * @param {?} relation_data_from
     * @param {?} relation_data_key
     * @return {?}
     */
    ResourceRelationshipsConverter.prototype.__buildRelationshipHasOne = function (relation_data_from, relation_data_key // number to string?
    ) {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_data_key].data = {};
            return;
        }
        if (this.relationships_dest[relation_data_key].data == null ||
            relation_data_from.data.id !==
                ((this.relationships_dest[relation_data_key].data)).id) {
            this.relationships_dest[relation_data_key].data = {};
        }
        // trae datos o cambió resource? actualizamos!
        if (
        // 'attributes' in relation_data_from.data ||  // ???
        !((this.relationships_dest[relation_data_key].data))
            .attributes ||
            // we have only a  dataresource
            ((this.relationships_dest[relation_data_key].data)).id !==
                relation_data_from.data.id) {
            var /** @type {?} */ resource_data = this.__buildRelationship(relation_data_from.data, this.included_resources);
            this.relationships_dest[relation_data_key].data = resource_data;
        }
    };
    /**
     * @param {?} resource_data_from
     * @param {?} included_array
     * @return {?}
     */
    ResourceRelationshipsConverter.prototype.__buildRelationship = function (resource_data_from, included_array) {
        if (resource_data_from.type in included_array &&
            resource_data_from.id in included_array[resource_data_from.type]) {
            // it's in included
            return included_array[resource_data_from.type][resource_data_from.id];
        }
        else {
            // OPTIONAL: return cached Resource
            var /** @type {?} */ service = this.getService(resource_data_from.type);
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
    };
    return ResourceRelationshipsConverter;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Converter = (function () {
    function Converter() {
    }
    /**
     * @param {?} json_array
     * @param {?=} destination_array
     * @return {?}
     */
    Converter.json_array2resources_array = function (json_array, destination_array) {
        if (destination_array === void 0) { destination_array = {}; }
        for (var _i = 0, json_array_1 = json_array; _i < json_array_1.length; _i++) {
            var data = json_array_1[_i];
            var /** @type {?} */ resource = Converter.json2resource(data, false);
            destination_array[resource.type + '_' + resource.id] = resource;
        }
    };
    /**
     * @param {?} json_array
     * @return {?}
     */
    Converter.json_array2resources_array_by_type = function (json_array) {
        var /** @type {?} */ all_resources = {};
        var /** @type {?} */ resources_by_type = {};
        Converter.json_array2resources_array(json_array, all_resources);
        Base.forEach(all_resources, function (resource) {
            if (!(resource.type in resources_by_type)) {
                resources_by_type[resource.type] = {};
            }
            resources_by_type[resource.type][resource.id] = resource;
        });
        return resources_by_type;
    };
    /**
     * @param {?} json_resource
     * @param {?} instance_relationships
     * @return {?}
     */
    Converter.json2resource = function (json_resource, instance_relationships) {
        var /** @type {?} */ resource_service = Converter.getService(json_resource.type);
        if (resource_service) {
            return Converter.procreate(json_resource);
        }
        else {
            // service not registered
            console.warn('`' + json_resource.type + '`', 'service not found on json2resource()');
            var /** @type {?} */ temp = new Resource();
            temp.id = json_resource.id;
            temp.type = json_resource.type;
            return temp;
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Converter.getService = function (type) {
        var /** @type {?} */ resource_service = Core.me.getResourceService(type);
        return resource_service;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Converter.procreate = function (data) {
        if (!('type' in data && 'id' in data)) {
            console.error('Jsonapi Resource is not correct', data);
        }
        var /** @type {?} */ resource;
        if (data.id in Converter.getService(data.type).cachememory.resources) {
            resource = Converter.getService(data.type).cachememory.resources[data.id];
        }
        else {
            resource = Converter.getService(data.type).cachememory.getOrCreateResource(data.type, data.id);
        }
        resource.attributes = data.attributes || {};
        resource.is_new = false;
        return resource;
    };
    /**
     * @param {?} document_from
     * @param {?} resource_dest
     * @return {?}
     */
    Converter.build = function (document_from, resource_dest) {
        // instancio los include y los guardo en included arrary
        var /** @type {?} */ included_resources = {};
        if ('included' in document_from) {
            included_resources = Converter.json_array2resources_array_by_type(document_from.included);
        }
        if (Array.isArray(document_from.data)) {
            Converter._buildCollection(/** @type {?} */ (document_from), /** @type {?} */ (resource_dest), included_resources);
        }
        else {
            Converter._buildResource(document_from.data, /** @type {?} */ (resource_dest), included_resources);
        }
    };
    /**
     * @param {?} collection_data_from
     * @param {?} collection_dest
     * @param {?} included_resources
     * @return {?}
     */
    Converter._buildCollection = function (collection_data_from, collection_dest, included_resources) {
        // sometime get Cannot set property 'number' of undefined (page)
        if (collection_dest.page && collection_data_from.meta) {
            collection_dest.page.number = collection_data_from.meta["page"] || 1;
            collection_dest.page.resources_per_page =
                collection_data_from.meta["resources_per_page"] || null;
            collection_dest.page.total_resources =
                collection_data_from.meta["total_resources"] || null;
        }
        // convert and add new dataresoures to final collection
        var /** @type {?} */ new_ids = {};
        for (var _i = 0, _a = collection_data_from.data; _i < _a.length; _i++) {
            var dataresource = _a[_i];
            if (!(dataresource.id in collection_dest)) {
                collection_dest[dataresource.id] = Converter.getService(dataresource.type).cachememory.getOrCreateResource(dataresource.type, dataresource.id);
            }
            Converter._buildResource(dataresource, collection_dest[dataresource.id], included_resources);
            new_ids[dataresource.id] = dataresource.id;
        }
        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        Base.forEach(collection_dest, function (resource) {
            if (!(resource.id in new_ids)) {
                delete collection_dest[resource.id];
            }
        });
    };
    /**
     * @param {?} resource_data_from
     * @param {?} resource_dest
     * @param {?} included_resources
     * @return {?}
     */
    Converter._buildResource = function (resource_data_from, resource_dest, included_resources) {
        resource_dest.id = resource_data_from.id || '';
        resource_dest.attributes = resource_data_from.attributes || {};
        resource_dest.is_new = false;
        var /** @type {?} */ service = Converter.getService(resource_data_from.type);
        // esto previene la creación indefinida de resources
        // el servicio debe estar sino no tenemos el schema
        if (!resource_dest.relationships || !service) {
            return;
        }
        Converter.getService(resource_data_from.type).parseFromServer(resource_dest.attributes);
        new ResourceRelationshipsConverter(Converter.getService, resource_data_from.relationships || {}, resource_dest.relationships, included_resources, service.schema).buildRelationships();
    };
    return Converter;
}());
var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        var _this = _super.apply(this, arguments) || this;
        _this.is_new = true;
        _this.is_loading = false;
        _this.is_saving = false;
        _this.id = '';
        _this.type = '';
        _this.attributes = {};
        _this.relationships = {};
        return _this;
    }
    /**
     * @return {?}
     */
    Resource.prototype.reset = function () {
        var _this = this;
        this.id = '';
        this.attributes = {};
        this.relationships = {};
        Base.forEach(this.getService().schema.relationships, function (value, key) {
            if (_this.getService().schema.relationships[key].hasMany) {
                var /** @type {?} */ relation = {
                    data: Base.newCollection(),
                    content: 'collection',
                };
                _this.relationships[key] = relation;
            }
            else {
                var /** @type {?} */ relation = { data: {}, content: 'none' };
                _this.relationships[key] = relation;
            }
        });
        this.is_new = true;
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    Resource.prototype.toObject = function (params) {
        var _this = this;
        params = Object.assign({}, Base.Params, params);
        var /** @type {?} */ relationships = {};
        var /** @type {?} */ included = [];
        var /** @type {?} */ included_ids = []; // just for control don't repeat any resource
        // REALTIONSHIPS
        Base.forEach(this.relationships, function (relationship, relation_alias) {
            if (_this.getService().schema.relationships[relation_alias] &&
                _this.getService().schema.relationships[relation_alias]
                    .hasMany) {
                // has many (hasMany:true)
                relationships[relation_alias] = { data: [] };
                Base.forEach(relationship.data, function (resource) {
                    var /** @type {?} */ reational_object = {
                        id: resource.id,
                        type: resource.type,
                    };
                    relationships[relation_alias].data.push(reational_object);
                    // no se agregó aún a included && se ha pedido incluir con el parms.include
                    var /** @type {?} */ temporal_id = resource.type + '_' + resource.id;
                    if (included_ids.indexOf(temporal_id) === -1 &&
                        params.include.indexOf(relation_alias) !== -1) {
                        included_ids.push(temporal_id);
                        included.push(resource.toObject({}).data);
                    }
                });
            }
            else {
                // has one (hasMany:false)
                var /** @type {?} */ relationship_data = (relationship.data);
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
                var /** @type {?} */ temporal_id = relationship_data.type + '_' + relationship_data.id;
                if (included_ids.indexOf(temporal_id) === -1 &&
                    params.include.indexOf(relationship_data.type) !== -1) {
                    included_ids.push(temporal_id);
                    included.push(relationship_data.toObject({}).data);
                }
            }
        });
        // just for performance dont copy if not necessary
        var /** @type {?} */ attributes;
        if (this.getService() && this.getService().parseToServer) {
            attributes = Object.assign({}, this.attributes);
            this.getService().parseToServer(attributes);
        }
        else {
            attributes = this.attributes;
        }
        var /** @type {?} */ ret = {
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
    };
    /**
     * @template T
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    Resource.prototype.save = function (params, fc_success, fc_error) {
        return __awaiter$3(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.__exec({
                        id: null,
                        params: params,
                        fc_success: fc_success,
                        fc_error: fc_error,
                        exec_type: 'save',
                    })];
            });
        });
    };
    /**
     * @template T
     * @param {?} exec_params
     * @return {?}
     */
    Resource.prototype.__exec = function (exec_params) {
        return __awaiter$3(this, void 0, void 0, function () {
            var exec_pp;
            return __generator(this, function (_a) {
                exec_pp = this.proccess_exec_params(exec_params);
                switch (exec_params.exec_type) {
                    case 'save':
                        return [2 /*return*/, this._save(exec_pp.params, exec_params.fc_success, exec_params.fc_error)];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @template T
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    Resource.prototype._save = function (params, fc_success, fc_error) {
        return __awaiter$3(this, void 0, void 0, function () {
            var _this = this;
            var promisesave;
            return __generator(this, function (_a) {
                promisesave = new Promise(function (resolve, reject) {
                    if (_this.is_saving || _this.is_loading) {
                        return;
                    }
                    _this.is_saving = true;
                    var /** @type {?} */ object = _this.toObject(params);
                    // http request
                    var /** @type {?} */ path = new PathBuilder();
                    path.applyParams(_this.getService(), params);
                    if (_this.id) {
                        path.appendPath(_this.id);
                    }
                    var /** @type {?} */ promise = Core.injectedServices.JsonapiHttp.exec(path.get(), _this.id ? 'PATCH' : 'POST', object, !isFunction$1(fc_error));
                    promise
                        .then(function (success) {
                        _this.is_saving = false;
                        // foce reload cache (for example, we add a new element)
                        if (!_this.id) {
                            _this.getService().cachememory.deprecateCollections(path.get());
                            _this.getService().cachestore.deprecateCollections(path.get());
                        }
                        // is a resource?
                        if ('id' in success.data) {
                            _this.id = success.data.id;
                            Converter.build(success, _this);
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
                            var /** @type {?} */ tempororay_collection = _this.getService().cachememory.getOrCreateCollection('justAnUpdate');
                            Converter.build(success, tempororay_collection);
                            Base.forEach(tempororay_collection, function (resource_value, key) {
                                var /** @type {?} */ res = Converter.getService(resource_value.type).cachememory.resources[resource_value.id];
                                Converter.getService(resource_value.type).cachememory.setResource(resource_value);
                                Converter.getService(resource_value.type).cachestore.setResource(resource_value);
                                res.id = res.id + 'x';
                            });
                            console.warn('Temporal collection for a resource_value update', tempororay_collection);
                        }
                        _this.runFc(fc_success, success);
                        resolve(success);
                    })
                        .catch(function (error) {
                        _this.is_saving = false;
                        _this.runFc(fc_error, 'data' in error ? error.data : error);
                        reject('data' in error ? error.data : error);
                    });
                });
                return [2 /*return*/, promisesave];
            });
        });
    };
    /**
     * @template T
     * @param {?} resource
     * @param {?=} type_alias
     * @return {?}
     */
    Resource.prototype.addRelationship = function (resource, type_alias) {
        var /** @type {?} */ object_key = resource.id;
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
    };
    /**
     * @param {?} resources
     * @param {?} type_alias
     * @return {?}
     */
    Resource.prototype.addRelationships = function (resources, type_alias) {
        var _this = this;
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, content: 'none' };
        }
        else {
            // we receive a new collection of this relationship. We need remove old (if don't exist on new collection)
            Base.forEach(this.relationships[type_alias].data, function (resource) {
                if (!(resource.id in resources)) {
                    delete _this.relationships[type_alias].data[resource.id];
                }
            });
        }
        Base.forEach(resources, function (resource) {
            _this.relationships[type_alias].data[resource.id] = resource;
        });
    };
    /**
     * @template T
     * @param {?} resources
     * @param {?=} type_alias
     * @return {?}
     */
    Resource.prototype.addRelationshipsArray = function (resources, type_alias) {
        var _this = this;
        resources.forEach(function (item) {
            _this.addRelationship(item, type_alias || item.type);
        });
    };
    /**
     * @param {?} type_alias
     * @param {?} id
     * @return {?}
     */
    Resource.prototype.removeRelationship = function (type_alias, id) {
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
    };
    /**
     * @return {?}
     */
    Resource.prototype.getService = function () {
        return Converter.getService(this.type);
    };
    return Resource;
}(ParentResourceService));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UrlParamsBuilder = (function () {
    function UrlParamsBuilder() {
    }
    /**
     * @param {?} params
     * @param {?=} add
     * @return {?}
     */
    UrlParamsBuilder.prototype.toparamsarray = function (params, add) {
        var _this = this;
        if (add === void 0) { add = ''; }
        var /** @type {?} */ ret = '';
        if (Array.isArray(params) || isObject$1(params)) {
            Base.forEach(params, function (value, key) {
                ret += _this.toparamsarray(value, add + '[' + key + ']');
            });
        }
        else {
            ret += add + '=' + params;
        }
        return ret;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    UrlParamsBuilder.prototype.toparams = function (params) {
        var _this = this;
        var /** @type {?} */ ret = '';
        Base.forEach(params, function (value, key) {
            ret += _this.toparamsarray(value, '&' + key);
        });
        return ret.slice(1);
    };
    return UrlParamsBuilder;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalFilter = (function () {
    /**
     * @param {?} localfilter
     */
    function LocalFilter(localfilter) {
        this.localfilterparams = localfilter || {};
    }
    /**
     * @param {?} resource
     * @param {?} localfilter
     * @return {?}
     */
    LocalFilter.prototype.passFilter = function (resource, localfilter) {
        for (var /** @type {?} */ attribute in localfilter) {
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
    };
    /**
     * @param {?} source_collection
     * @param {?} dest_collection
     * @return {?}
     */
    LocalFilter.prototype.filterCollection = function (source_collection, dest_collection) {
        var _this = this;
        if (Object.keys(this.localfilterparams).length) {
            Base.forEach(source_collection, function (resource, key) {
                if (_this.passFilter(resource, _this.localfilterparams)) {
                    dest_collection[key] = resource;
                }
            });
        }
    };
    return LocalFilter;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResourceFunctions = (function () {
    function ResourceFunctions() {
    }
    /**
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    ResourceFunctions.resourceToResource = function (source, destination) {
        destination.attributes = source.attributes;
        // remove relationships on destination resource
        for (var /** @type {?} */ type_alias in destination.relationships) {
            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            }
            else {
                // this resource is a collection?
                if (!('id' in destination.relationships[type_alias].data)) {
                    for (var /** @type {?} */ id in destination.relationships[type_alias].data) {
                        if (!(id in source.relationships[type_alias].data)) {
                            delete destination.relationships[type_alias];
                        }
                    }
                }
            }
        }
        // add source relationships to destination
        for (var /** @type {?} */ type_alias in source.relationships) {
            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(/** @type {?} */ (source.relationships[type_alias].data), type_alias);
            }
            else {
                destination.addRelationships(/** @type {?} */ (source.relationships[type_alias].data), type_alias);
            }
        }
    };
    return ResourceFunctions;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CacheMemory = (function () {
    function CacheMemory() {
        this.collections = {};
        this.collections_lastupdate = {};
        this.resources = {};
    }
    /**
     * @param {?} url
     * @return {?}
     */
    CacheMemory.prototype.isCollectionExist = function (url) {
        return url in this.collections &&
            this.collections[url].$source !== 'new'
            ? true
            : false;
    };
    /**
     * @param {?} url
     * @param {?} ttl
     * @return {?}
     */
    CacheMemory.prototype.isCollectionLive = function (url, ttl) {
        return Date.now() <= this.collections_lastupdate[url] + ttl * 1000;
    };
    /**
     * @param {?} id
     * @param {?} ttl
     * @return {?}
     */
    CacheMemory.prototype.isResourceLive = function (id, ttl) {
        return (this.resources[id] &&
            Date.now() <= this.resources[id].lastupdate + ttl * 1000);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    CacheMemory.prototype.getOrCreateCollection = function (url) {
        if (!(url in this.collections)) {
            this.collections[url] = Base.newCollection();
            this.collections[url].$source = 'new';
        }
        return this.collections[url];
    };
    /**
     * @param {?} url
     * @param {?} collection
     * @return {?}
     */
    CacheMemory.prototype.setCollection = function (url, collection) {
        var _this = this;
        // clone collection, because after maybe delete items for localfilter o pagination
        this.collections[url] = Base.newCollection();
        Object.keys(collection).forEach(function (resource_id) {
            var /** @type {?} */ resource = collection[resource_id];
            _this.collections[url][resource_id] = resource;
            _this.setResource(resource);
        });
        this.collections[url].page = collection.page;
        this.collections_lastupdate[url] = Date.now();
    };
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    CacheMemory.prototype.getOrCreateResource = function (type, id) {
        if (Converter.getService(type).cachememory &&
            id in Converter.getService(type).cachememory.resources) {
            return Converter.getService(type).cachememory.resources[id];
        }
        else {
            var /** @type {?} */ resource = Converter.getService(type).new();
            resource.id = id;
            // needed for a lot of request (all and get, tested on multinexo.com)
            this.setResource(resource, false);
            return resource;
        }
    };
    /**
     * @param {?} resource
     * @param {?=} update_lastupdate
     * @return {?}
     */
    CacheMemory.prototype.setResource = function (resource, update_lastupdate) {
        if (update_lastupdate === void 0) { update_lastupdate = false; }
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
    };
    /**
     * @param {?} path_start_with
     * @return {?}
     */
    CacheMemory.prototype.deprecateCollections = function (path_start_with) {
        var _this = this;
        Base.forEach(this.collections_lastupdate, function (lastupdate, key) {
            _this.collections_lastupdate[key] = 0;
        });
        return true;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    CacheMemory.prototype.removeResource = function (id) {
        Base.forEach(this.collections, function (value, url) {
            delete value[id];
        });
        this.resources[id].attributes = {}; // just for confirm deletion on view
        this.resources[id].relationships = {}; // just for confirm deletion on view
        delete this.resources[id];
    };
    return CacheMemory;
}());
var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CacheStore = (function () {
    function CacheStore() {
    }
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    CacheStore.prototype.getResource = function (resource /* | IDataResource*/, include) {
        if (include === void 0) { include = []; }
        return __awaiter$4(this, void 0, void 0, function () {
            var _this = this;
            var mypromise;
            return __generator(this, function (_a) {
                mypromise = new Promise(function (resolve, reject) {
                    Core.injectedServices.JsonapiStoreService.getObjet(resource.type + '.' + resource.id)
                        .then(function (success) {
                        Converter.build({ data: success }, resource);
                        var /** @type {?} */ promises = [];
                        // include some times is a collection :S
                        // for (let keys in include) {
                        Base.forEach(include, function (resource_type) {
                            //  && ('attributes' in resource.relationships[resource_type].data)
                            if (resource_type in resource.relationships) {
                                // hasOne
                                var /** @type {?} */ related_resource = (resource
                                    .relationships[resource_type].data);
                                if (!('attributes' in related_resource)) {
                                    // no está cargado aún
                                    var /** @type {?} */ builded_resource = _this.getResourceFromMemory(related_resource);
                                    if (builded_resource.is_new) {
                                        // no está en memoria, la pedimos a store
                                        promises.push(_this.getResource(builded_resource));
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
                                .then(function (success3) {
                                resolve(success3);
                            })
                                .catch(function (error3) {
                                reject(error3);
                            });
                        }
                    })
                        .catch(function () {
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
                return [2 /*return*/, mypromise];
            });
        });
    };
    /**
     * @param {?} resource
     * @return {?}
     */
    CacheStore.prototype.setResource = function (resource) {
        Core.injectedServices.JsonapiStoreService.saveObject(resource.type + '.' + resource.id, resource.toObject().data);
    };
    /**
     * @param {?} url
     * @param {?} include
     * @param {?} collection
     * @return {?}
     */
    CacheStore.prototype.getCollectionFromStorePromise = function (url, include, collection) {
        return __awaiter$4(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    _this.getCollectionFromStore(url, include, collection, resolve, reject);
                });
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * @param {?} url
     * @param {?} include
     * @param {?} collection
     * @param {?} resolve
     * @param {?} reject
     * @return {?}
     */
    CacheStore.prototype.getCollectionFromStore = function (url, include, collection, resolve, reject) {
        var _this = this;
        var /** @type {?} */ promise = Core.injectedServices.JsonapiStoreService.getObjet('collection.' + url);
        promise
            .then(function (success) {
            // build collection from store and resources from memory
            // @todo success.data is a collection, not an array
            if (_this.fillCollectionWithArrrayAndResourcesOnMemory(success.data, collection)) {
                collection.$source = 'store'; // collection from storeservice, resources from memory
                collection.$cache_last_update = success._lastupdate_time;
                resolve(collection);
                return;
            }
            var /** @type {?} */ promise2 = _this.fillCollectionWithArrrayAndResourcesOnStore(success, include, collection);
            promise2
                .then(function () {
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
                .catch(function () {
                reject();
            });
        })
            .catch(function () {
            reject();
        });
    };
    /**
     * @param {?} dataresources
     * @param {?} collection
     * @return {?}
     */
    CacheStore.prototype.fillCollectionWithArrrayAndResourcesOnMemory = function (dataresources, collection) {
        var /** @type {?} */ all_ok = true;
        for (var /** @type {?} */ key in dataresources) {
            var /** @type {?} */ dataresource = dataresources[key];
            var /** @type {?} */ resource = this.getResourceFromMemory(dataresource);
            if (resource.is_new) {
                all_ok = false;
                break;
            }
            collection[dataresource.id] = resource;
        }
        return all_ok;
    };
    /**
     * @param {?} dataresource
     * @return {?}
     */
    CacheStore.prototype.getResourceFromMemory = function (dataresource) {
        var /** @type {?} */ cachememory = Converter.getService(dataresource.type).cachememory;
        var /** @type {?} */ resource = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
        return resource;
    };
    /**
     * @param {?} datacollection
     * @param {?} include
     * @param {?} collection
     * @return {?}
     */
    CacheStore.prototype.fillCollectionWithArrrayAndResourcesOnStore = function (datacollection, include, collection) {
        return __awaiter$4(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    // request resources from store
                    var /** @type {?} */ temporalcollection = {};
                    var /** @type {?} */ promises = [];
                    for (var /** @type {?} */ key in datacollection.data) {
                        var /** @type {?} */ dataresource = datacollection.data[key];
                        var /** @type {?} */ cachememory = Converter.getService(dataresource.type)
                            .cachememory;
                        temporalcollection[dataresource.id] = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
                        promises.push(_this.getResource(temporalcollection[dataresource.id], include));
                    }
                    // build collection and resources from store
                    Promise.all(promises)
                        .then(function (success2) {
                        if (datacollection.page) {
                            collection.page = datacollection.page;
                        }
                        for (var /** @type {?} */ key in temporalcollection) {
                            var /** @type {?} */ resource = temporalcollection[key];
                            collection[resource.id] = resource; // collection from storeservice, resources from memory
                        }
                        resolve(collection);
                    })
                        .catch(function (error2) {
                        reject(error2);
                    });
                });
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * @param {?} url
     * @param {?} collection
     * @param {?} include
     * @return {?}
     */
    CacheStore.prototype.setCollection = function (url, collection, include) {
        var _this = this;
        var /** @type {?} */ tmp = { data: {}, page: {} };
        var /** @type {?} */ resources_for_save = {};
        Base.forEach(collection, function (resource) {
            _this.setResource(resource);
            tmp.data[resource.id] = { id: resource.id, type: resource.type };
            Base.forEach(include, function (resource_type_alias) {
                if ('id' in resource.relationships[resource_type_alias].data) {
                    // hasOne
                    var /** @type {?} */ ress = (resource.relationships[resource_type_alias].data);
                    resources_for_save[resource_type_alias + ress.id] = ress;
                }
                else {
                    // hasMany
                    var /** @type {?} */ collection2 = (resource.relationships[resource_type_alias].data);
                    Base.forEach(collection2, function (inc_resource) {
                        resources_for_save[resource_type_alias + inc_resource.id] = inc_resource;
                    });
                }
            });
        });
        tmp.page = collection.page;
        Core.injectedServices.JsonapiStoreService.saveObject('collection.' + url, tmp);
        Base.forEach(resources_for_save, function (resource_for_save) {
            if ('is_new' in resource_for_save) {
                _this.setResource(resource_for_save);
            }
            else {
                console.warn('No se pudo guardar en la cache el', resource_for_save.type, 'por no se ser Resource.', resource_for_save);
            }
        });
    };
    /**
     * @param {?} path_start_with
     * @return {?}
     */
    CacheStore.prototype.deprecateCollections = function (path_start_with) {
        Core.injectedServices.JsonapiStoreService.deprecateObjectsWithKey('collection.' + path_start_with);
        return true;
    };
    return CacheStore;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super.apply(this, arguments) || this;
        _this.resource = Resource;
        _this.smartfiltertype = 'undefined';
        return _this;
    }
    /**
     * @return {?}
     */
    Service.prototype.register = function () {
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
    };
    /**
     * @return {?}
     */
    Service.prototype.newResource = function () {
        var /** @type {?} */ resource = new this.resource();
        return (resource);
    };
    /**
     * @return {?}
     */
    Service.prototype.new = function () {
        var /** @type {?} */ resource = this.newResource();
        resource.type = this.type;
        // issue #36: just if service is not registered yet.
        this.getService();
        resource.reset();
        return resource;
    };
    /**
     * @return {?}
     */
    Service.prototype.getPrePath = function () {
        return '';
    };
    /**
     * @return {?}
     */
    Service.prototype.getPath = function () {
        return this.path ? this.path : this.type;
    };
    /**
     * @param {?} id
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    Service.prototype.get = function (id, params, fc_success, fc_error) {
        return (this.__exec({
            id: id,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'get',
        }));
    };
    /**
     * @param {?} id
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    Service.prototype.delete = function (id, params, fc_success, fc_error) {
        return (this.__exec({
            id: id,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'delete',
        }));
    };
    /**
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    Service.prototype.all = function (params, fc_success, fc_error) {
        return (this.__exec({
            id: null,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'all',
        }));
    };
    /**
     * @param {?} exec_params
     * @return {?}
     */
    Service.prototype.__exec = function (exec_params) {
        var /** @type {?} */ exec_pp = _super.prototype.proccess_exec_params.call(this, exec_params);
        switch (exec_pp.exec_type) {
            case 'get':
                return this._get(exec_pp.id, exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
            case 'delete':
                return this._delete(exec_pp.id, exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
            case 'all':
                return this._all(exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
        }
    };
    /**
     * @param {?} id
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    Service.prototype._get = function (id, params, fc_success, fc_error) {
        var _this = this;
        // http request
        var /** @type {?} */ path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        // CACHEMEMORY
        var /** @type {?} */ resource = (this.getService().cachememory.getOrCreateResource(this.type, id));
        resource.is_loading = true;
        var /** @type {?} */ subject = new BehaviorSubject$1(resource);
        // exit if ttl is not expired
        var /** @type {?} */ temporal_ttl = params.ttl || 0; // this.schema.ttl
        if (this.getService().cachememory.isResourceLive(id, temporal_ttl)) {
            // we create a promise because we need return collection before
            // run success client function
            var /** @type {?} */ promise_1 = new Promise(function (resolve, reject) {
                resolve(fc_success);
                promise_1
                    .then(function (fc_success2) {
                    console.warn('vp-ngx-jsonapi: THIS CODE NEVER RUN, RIGHT? :/ Please check.');
                    subject.next(resource);
                    _this.runFc(fc_success2, 'cachememory');
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
                .then(function (success) {
                if (Base.isObjectLive(temporal_ttl, resource.lastupdate)) {
                    subject.next(resource);
                    _this.runFc(fc_success, { data: success });
                }
                else {
                    _this.getGetFromServer(path, fc_success, fc_error, resource, subject);
                }
            })
                .catch(function (error) {
                _this.getGetFromServer(path, fc_success, fc_error, resource, subject);
            });
        }
        else {
            this.getGetFromServer(path, fc_success, fc_error, resource, subject);
        }
        subject.next(resource);
        return subject.asObservable();
    };
    /**
     * @param {?} path
     * @param {?} fc_success
     * @param {?} fc_error
     * @param {?} resource
     * @param {?} subject
     * @return {?}
     */
    Service.prototype.getGetFromServer = function (path, fc_success, fc_error, resource, subject) {
        var _this = this;
        Core.injectedServices.JsonapiHttp.get(path.get())
            .then(function (success) {
            Converter.build(success, resource);
            resource.is_loading = false;
            _this.getService().cachememory.setResource(resource);
            if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                _this.getService().cachestore.setResource(resource);
            }
            subject.next(resource);
            subject.complete();
            _this.runFc(fc_success, success);
        })
            .catch(function (error) {
            subject.error(error);
            _this.runFc(fc_error, error);
        });
    };
    /**
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    Service.prototype._all = function (params, fc_success, fc_error) {
        var _this = this;
        // check smartfiltertype, and set on remotefilter
        if (params.smartfilter && this.smartfiltertype !== 'localfilter') {
            Object.assign(params.remotefilter, params.smartfilter);
        }
        params.cachehash = params.cachehash || '';
        // http request
        var /** @type {?} */ path = new PathBuilder();
        var /** @type {?} */ paramsurl = new UrlParamsBuilder();
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
        var /** @type {?} */ tempororay_collection = this.getService().cachememory.getOrCreateCollection(path.getForCache());
        // creamos otra colleción si luego será filtrada
        var /** @type {?} */ localfilter = new LocalFilter(params.localfilter);
        var /** @type {?} */ cached_collection;
        if (params.localfilter && Object.keys(params.localfilter).length > 0) {
            cached_collection = Base.newCollection();
        }
        else {
            cached_collection = tempororay_collection;
        }
        var /** @type {?} */ subject = new BehaviorSubject$1(cached_collection);
        // MEMORY_CACHE
        var /** @type {?} */ temporal_ttl = params.ttl || this.schema.ttl;
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
                var /** @type {?} */ promise_2 = new Promise(function (resolve, reject) {
                    resolve(fc_success);
                    promise_2
                        .then(function (fc_success2) {
                        subject.next(tempororay_collection);
                        _this.runFc(fc_success2, 'cachememory');
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
                .then(function (success) {
                tempororay_collection.$source = 'store';
                tempororay_collection.$is_loading = false;
                // when load collection from store, we save collection on memory
                _this.getService().cachememory.setCollection(path.getForCache(), tempororay_collection);
                // localfilter getted data
                localfilter.filterCollection(tempororay_collection, cached_collection);
                if (Base.isObjectLive(temporal_ttl, tempororay_collection.$cache_last_update)) {
                    subject.next(tempororay_collection);
                    _this.runFc(fc_success, { data: success });
                }
                else {
                    _this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
                }
            })
                .catch(function (error) {
                _this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
            });
        }
        else {
            // STORE
            tempororay_collection.$is_loading = true;
            this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject);
        }
        subject.next(/** @type {?} */ (cached_collection));
        return subject.asObservable();
    };
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
    Service.prototype.getAllFromServer = function (path, params, fc_success, fc_error, tempororay_collection, cached_collection, subject) {
        var _this = this;
        // SERVER REQUEST
        tempororay_collection.$is_loading = true;
        Core.injectedServices.JsonapiHttp.get(path.get())
            .then(function (success) {
            tempororay_collection.$source = 'server';
            tempororay_collection.$is_loading = false;
            // this create a new ID for every resource (for caching proposes)
            // for example, two URL return same objects but with different attributes
            if (params.cachehash) {
                Base.forEach(success.data, function (resource) {
                    resource.id = resource.id + params.cachehash;
                });
            }
            Converter.build(success, tempororay_collection);
            _this.getService().cachememory.setCollection(path.getForCache(), tempororay_collection);
            if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                _this.getService().cachestore.setCollection(path.getForCache(), tempororay_collection, params.include);
            }
            // localfilter getted data
            var /** @type {?} */ localfilter = new LocalFilter(params.localfilter);
            localfilter.filterCollection(tempororay_collection, cached_collection);
            // trying to define smartfiltertype
            if (_this.smartfiltertype === 'undefined') {
                var /** @type {?} */ page = tempororay_collection.page;
                if (page.number === 1 &&
                    page.total_resources <= page.resources_per_page) {
                    _this.smartfiltertype = 'localfilter';
                }
                else if (page.number === 1 &&
                    page.total_resources > page.resources_per_page) {
                    _this.smartfiltertype = 'remotefilter';
                }
            }
            subject.next(tempororay_collection);
            subject.complete();
            _this.runFc(fc_success, success);
        })
            .catch(function (error) {
            // do not replace $source, because localstorage don't write if = server
            // tempororay_collection.$source = 'server';
            tempororay_collection.$is_loading = false;
            subject.next(tempororay_collection);
            subject.error(error);
            _this.runFc(fc_error, error);
        });
    };
    /**
     * @param {?} id
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    Service.prototype._delete = function (id, params, fc_success, fc_error) {
        var _this = this;
        // http request
        var /** @type {?} */ path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        var /** @type {?} */ subject = new Subject$1();
        Core.injectedServices.JsonapiHttp.delete(path.get())
            .then(function (success) {
            _this.getService().cachememory.removeResource(id);
            subject.next();
            subject.complete();
            _this.runFc(fc_success, success);
        })
            .catch(function (error) {
            subject.error(error);
            _this.runFc(fc_error, error);
        });
        return subject.asObservable();
    };
    /**
     * @template T
     * @return {?}
     */
    Service.prototype.getService = function () {
        return ((Converter.getService(this.type) || this.register()));
        // let serv = Converter.getService(this.type);
        // if (serv) {
        //     return serv;
        // } else {
        //     return this.register();
        // }
    };
    /**
     * @return {?}
     */
    Service.prototype.clearCacheMemory = function () {
        var /** @type {?} */ path = new PathBuilder();
        path.applyParams(this);
        return (this.getService().cachememory.deprecateCollections(path.getForCache()) &&
            this.getService().cachestore.deprecateCollections(path.getForCache()));
    };
    /**
     * @param {?} attributes
     * @return {?}
     */
    Service.prototype.parseToServer = function (attributes) {
        /* */
    };
    /**
     * @param {?} attributes
     * @return {?}
     */
    Service.prototype.parseFromServer = function (attributes) {
        /* */
    };
    return Service;
}(ParentResourceService));
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
//# sourceMappingURL=vp-ngx-jsonapi.es5.js.map
