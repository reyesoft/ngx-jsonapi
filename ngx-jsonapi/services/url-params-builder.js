/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Base } from './base';
export class UrlParamsBuilder {
    /**
     * @param {?} params
     * @return {?}
     */
    toparams(params) {
        /** @type {?} */
        let ret = '';
        Base.forEach(params, (value, key) => {
            ret += this.toparamsarray(value, '&' + key);
        });
        return ret.slice(1);
    }
    /**
     * @param {?} params
     * @param {?} add
     * @return {?}
     */
    toparamsarray(params, add) {
        /** @type {?} */
        let ret = '';
        if (Array.isArray(params) || params instanceof Object) {
            Base.forEach(params, (value, key) => {
                ret += this.toparamsarray(encodeURIComponent(value), add + '[' + key + ']');
            });
        }
        else {
            ret += add + '=' + params;
        }
        return ret;
    }
}
//# sourceMappingURL=url-params-builder.js.map