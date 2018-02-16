/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
export function Autoregister() {
    return function (target) {
        // save a reference to the original constructor
        var /** @type {?} */ original = target;
        // the new constructor behaviour
        var /** @type {?} */ f = function (...args) {
            let /** @type {?} */ instance = original.apply(this, args);
            instance.register();
            return instance;
        };
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    };
}
//# sourceMappingURL=autoregister.js.map