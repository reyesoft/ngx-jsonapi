/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { implementsIParamsResource } from '../interfaces/type-checks';
import { Core } from '../core';
export class PathBuilder {
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
        if (implementsIParamsResource(params) && params.include_get) {
            this.setInclude([...this.includes, ...params.include_get]);
        }
        if (params.fields && Object.keys(params.fields).length > 0) {
            for (let resource_type in params.fields) {
                /** @type {?} */
                let fields_param = `fields[${resource_type}]=${params.fields[resource_type].join(',')}`;
                this.get_params.push(fields_param);
            }
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
     * @return {?}
     */
    getForCache() {
        return this.paths.join('/') + this.get_params.join('/');
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        let params = [...this.get_params];
        if (this.includes.length > 0) {
            params.push('include=' + this.includes.join(','));
        }
        return this.paths.join('/') + (params.length > 0 ? Core.getInstance().injectedServices.rsJsonapiConfig.params_separator + params.join('&') : '');
    }
    /**
     * @param {?} strings_array
     * @return {?}
     */
    setInclude(strings_array) {
        this.includes = strings_array;
    }
}
if (false) {
    /** @type {?} */
    PathBuilder.prototype.paths;
    /** @type {?} */
    PathBuilder.prototype.includes;
    /** @type {?} */
    PathBuilder.prototype.get_params;
}
//# sourceMappingURL=path-builder.js.map