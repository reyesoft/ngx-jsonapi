/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Page } from './page';
export class Base {
    /**
     * @template R
     * @return {?}
     */
    static newCollection() {
        return Object.defineProperties({}, {
            $length: {
                get: function () {
                    return Object.keys(this).length * 1;
                },
                enumerable: false,
            },
            $toArray: {
                get: function () {
                    return Object.keys(this).map(key => {
                        return this[key];
                    });
                },
                enumerable: false,
            },
            $is_loading: {
                value: false,
                enumerable: false,
                writable: true,
            },
            $source: { value: '', enumerable: false, writable: true },
            $cache_last_update: {
                value: 0,
                enumerable: false,
                writable: true
            },
            page: { value: new Page(), enumerable: false, writable: true }
        });
    }
    /**
     * @param {?} ttl
     * @param {?} last_update
     * @return {?}
     */
    static isObjectLive(ttl, last_update) {
        return (ttl >= 0 && Date.now() <= (last_update + ttl * 1000));
    }
    /**
     * @template T
     * @param {?} collection
     * @param {?} fc
     * @return {?}
     */
    static forEach(collection, fc) {
        Object.keys(collection).forEach(key => {
            fc(collection[key], key);
        });
    }
}
Base.Params = {
    id: '',
    include: []
};
Base.Schema = {
    relationships: {},
    ttl: 0
};
function Base_tsickle_Closure_declarations() {
    /** @type {?} */
    Base.Params;
    /** @type {?} */
    Base.Schema;
}
//# sourceMappingURL=base.js.map