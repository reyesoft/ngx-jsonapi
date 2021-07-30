/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Core } from './core';
/**
 * @param {?} cacheable
 * @param {?=} ttl
 * @return {?}
 */
export function isLive(cacheable, ttl) {
    /** @type {?} */
    let ttl_in_seconds = typeof ttl === 'number' ? ttl : cacheable.ttl || 0;
    return Date.now() < cacheable.cache_last_update + ttl_in_seconds * 1000;
}
/**
 * @param {?} resource
 * @param {?} includes
 * @return {?}
 */
export function relationshipsAreBuilded(resource, includes) {
    if (includes.length === 0) {
        return true;
    }
    for (let relationship_alias in resource.relationships) {
        if (includes.includes(relationship_alias) && !resource.relationships[relationship_alias].builded) {
            return false;
        }
    }
    return true;
}
/**
 * @deprecated since 2.2.0
 * @param {?} document
 * @return {?}
 */
export function isCollection(document) {
    if (!document.data) {
        return false;
    }
    return !('id' in document.data);
}
/**
 * @deprecated since 2.2.0
 * @param {?} document
 * @return {?}
 */
export function isResource(document) {
    if (!document.data) {
        return false;
    }
    return 'id' in document.data;
}
/**
 * @param {?} target
 * @param {?} key
 * @param {?} descriptor
 * @return {?}
 */
export function serviceIsRegistered(target, key, descriptor) {
    /** @type {?} */
    const original = descriptor.value;
    descriptor.value = function () {
        /** @type {?} */
        let args = Array.prototype.slice.call(arguments);
        /** @type {?} */
        let type;
        try {
            if (typeof args[0] === 'string') {
                type = args[0];
            }
            else {
                type = args[0].type;
            }
        }
        catch (err) {
            console.warn(`ERROR: First argument of methods decorated with serviceIsRegistered has to be string or Resource.`);
            return null;
        }
        /** @type {?} */
        const service_is_registered = Core.me.getResourceService(type);
        if (!service_is_registered) {
            console.warn(`ERROR: ${type} service has not been registered.`);
            return null;
        }
        /** @type {?} */
        const result = original.apply(this, args);
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=common.js.map