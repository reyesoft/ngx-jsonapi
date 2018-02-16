/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Base } from '../services/base';
export class LocalFilter {
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
function LocalFilter_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalFilter.prototype.localfilterparams;
}
//# sourceMappingURL=localfilter.js.map