var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { CacheMemory } from './services/cachememory';
import { serviceIsRegistered } from './common';
import { PathBuilder } from './services/path-builder';
import { Resource } from './resource';
import { throwError, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
/** @type {?} */
export const JSONAPI_RIPPER_SERVICE = 'jsonapi_ripper_service';
/** @type {?} */
export const JSONAPI_STORE_SERVICE = 'jsonapi_store_service';
export class Core {
    constructor() {
        this.loadingsCounter = 0;
        this.loadingsStart = noop;
        this.loadingsDone = noop;
        this.loadingsError = noop;
        this.loadingsOffline = noop;
        this.isDevMode = () => false;
        this.resourceServices = {};
    }
    /**
     * @return {?}
     */
    static getInstance() {
        if (!Core.me) {
            Core.me = new Core();
        }
        return Core.me;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    static delete(path) {
        return Core.exec(path, 'DELETE');
    }
    /**
     * @param {?} path
     * @return {?}
     */
    static get(path) {
        return Core.exec(path, 'get');
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @param {?=} call_loadings_error
     * @return {?}
     */
    static exec(path, method, data, call_loadings_error = true) {
        Core.me.refreshLoadings(1);
        return Core.getInstance().injectedServices.JsonapiHttp.exec(path, method, data).pipe(
        // map(data => { return data.body }),
        tap(() => Core.me.refreshLoadings(-1)), catchError(error => {
            error = error.error || error;
            Core.me.refreshLoadings(-1);
            if (error.status <= 0) {
                // offline?
                if (!Core.me.loadingsOffline(error) && Core.me.isDevMode()) {
                    console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                }
            }
            else if (call_loadings_error && !Core.me.loadingsError(error) && Core.me.isDevMode()) {
                console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
            }
            return throwError(error);
        }));
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
     * @param {?} type
     * @return {?}
     */
    getResourceServiceOrFail(type) {
        /** @type {?} */
        let service = this.resourceServices[type];
        if (!service) {
            throw new Error(`The requested service with type ${type} has not been registered, please use register() method or @Autoregister() decorator`);
        }
        return service;
    }
    /**
     * @param {?} resource_type
     * @param {?} resource_id
     * @return {?}
     */
    static removeCachedResource(resource_type, resource_id) {
        CacheMemory.getInstance().removeResource(resource_type, resource_id);
        // TODO: FE-85 ---> add method on JsonRipper, if store is enabled
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    static setCachedResource(resource) {
        CacheMemory.getInstance().setResource(resource, true);
        // TODO: FE-85 ---> add method on JsonRipper, if store is enabled
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static deprecateCachedCollections(type) {
        /** @type {?} */
        let service = Core.me.getResourceServiceOrFail(type);
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(service);
        CacheMemory.getInstance().deprecateCollections(path.getForCache());
        // TODO: FE-85 ---> add method on JsonRipper, if store is enabled
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
        return __awaiter(this, void 0, void 0, function* () {
            Core.getInstance().injectedServices.JsonapiStoreService.clearCache();
            CacheMemory.getInstance().clearCache();
            return Core.getInstance().injectedServices.json_ripper.deprecateCollection('').then(() => true);
        });
    }
    /**
     * @template R
     * @param {?} resource
     * @param {...?} relations_alias_to_duplicate_too
     * @return {?}
     */
    duplicateResource(resource, ...relations_alias_to_duplicate_too) {
        /** @type {?} */
        let newresource = /** @type {?} */ (this.getResourceServiceOrFail(resource.type).new());
        newresource.id = 'new_' + Math.floor(Math.random() * 10000).toString();
        newresource.attributes = Object.assign({}, newresource.attributes, resource.attributes);
        for (const alias in resource.relationships) {
            /** @type {?} */
            let relationship = resource.relationships[alias];
            if (!relationship.data) {
                newresource.relationships[alias] = resource.relationships[alias];
                continue;
            }
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
                    relationship.data.forEach(relationresource => {
                        newresource.addRelationship(this.duplicateResource(/** @type {?} */ (relationresource)), alias);
                    });
                }
                else {
                    newresource.addRelationships(/** @type {?} */ (relationship.data), alias);
                }
            }
        }
        return newresource;
    }
}
__decorate([
    serviceIsRegistered,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], Core, "removeCachedResource", null);
__decorate([
    serviceIsRegistered,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Resource]),
    __metadata("design:returntype", void 0)
], Core, "setCachedResource", null);
__decorate([
    serviceIsRegistered,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Core, "deprecateCachedCollections", null);
if (false) {
    /** @type {?} */
    Core.me;
    /** @type {?} */
    Core.prototype.injectedServices;
    /** @type {?} */
    Core.prototype.loadingsCounter;
    /** @type {?} */
    Core.prototype.loadingsStart;
    /** @type {?} */
    Core.prototype.loadingsDone;
    /** @type {?} */
    Core.prototype.loadingsError;
    /** @type {?} */
    Core.prototype.loadingsOffline;
    /** @type {?} */
    Core.prototype.config;
    /** @type {?} */
    Core.prototype.isDevMode;
    /** @type {?} */
    Core.prototype.resourceServices;
}
//# sourceMappingURL=core.js.map