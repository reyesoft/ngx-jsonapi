/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} collection
 * @param {?} fc
 * @return {?}
 */
export function forEach(collection, fc) {
    Object.keys(collection).forEach(key => {
        fc(key, collection[key]);
    });
}
//# sourceMappingURL=foreach.js.map