/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class JsonapiConfig {
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
function JsonapiConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    JsonapiConfig.prototype.url;
    /** @type {?} */
    JsonapiConfig.prototype.params_separator;
    /** @type {?} */
    JsonapiConfig.prototype.unify_concurrency;
    /** @type {?} */
    JsonapiConfig.prototype.cache_prerequests;
    /** @type {?} */
    JsonapiConfig.prototype.cachestore_support;
    /** @type {?} */
    JsonapiConfig.prototype.parameters;
}
//# sourceMappingURL=jsonapi-config.js.map