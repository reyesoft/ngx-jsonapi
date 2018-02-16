/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
function PathBuilder_tsickle_Closure_declarations() {
    /** @type {?} */
    PathBuilder.prototype.paths;
    /** @type {?} */
    PathBuilder.prototype.includes;
    /** @type {?} */
    PathBuilder.prototype.get_params;
}
//# sourceMappingURL=path-builder.js.map