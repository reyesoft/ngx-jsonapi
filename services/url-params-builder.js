/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Base } from './base';
import { isObject } from 'rxjs/util/isObject';
export class UrlParamsBuilder {
    /**
     * @param {?} params
     * @param {?=} add
     * @return {?}
     */
    toparamsarray(params, add = '') {
        let /** @type {?} */ ret = '';
        if (Array.isArray(params) || isObject(params)) {
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
//# sourceMappingURL=url-params-builder.js.map