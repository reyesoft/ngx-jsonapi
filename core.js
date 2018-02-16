/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { noop } from 'rxjs/util/noop';
import { Base } from './services/base';
import { JsonapiConfig } from './jsonapi-config';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
import { forEach } from './foreach';
export class Core {
    /**
     * @param {?} user_config
     * @param {?} jsonapiStoreService
     * @param {?} jsonapiHttp
     */
    constructor(user_config, jsonapiStoreService, jsonapiHttp) {
        this.resourceServices = {};
        this.loadingsCounter = 0;
        this.loadingsStart = noop;
        this.loadingsDone = noop;
        this.loadingsError = noop;
        this.loadingsOffline = noop;
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
    { type: JsonapiStore, },
    { type: JsonapiHttpImported, },
];
function Core_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Core.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Core.ctorParameters;
    /** @type {?} */
    Core.me;
    /** @type {?} */
    Core.injectedServices;
    /** @type {?} */
    Core.prototype.resourceServices;
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
}
//# sourceMappingURL=core.js.map