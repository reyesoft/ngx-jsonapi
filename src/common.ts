import { ICacheable } from './interfaces/cacheable';
import { Core } from './core';
import { DocumentResource } from './document-resource';
import { DocumentCollection } from './document-collection';
import { Resource } from './resource';

export function isLive(cacheable: ICacheable, ttl?: number): boolean {
    let ttl_in_seconds = ttl && typeof ttl === 'number' ? ttl : cacheable.ttl || 0;

    return Date.now() < cacheable.cache_last_update + ttl_in_seconds * 1000;
}

// @todo test required for hasMany and hasOne
export function relationshipsAreBuilded(resource: Resource, includes: Array<string>): boolean {
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
 */
export function isCollection(document: DocumentResource | DocumentCollection): document is DocumentCollection {
    if (!document.data) {
        return false;
    }

    return !('id' in document.data);
}

/**
 * @deprecated since 2.2.0
 */
export function isResource(document: DocumentResource | DocumentCollection): document is DocumentResource {
    if (!document.data) {
        return false;
    }

    return 'id' in document.data;
}

// NOTE: Checks that the service passed to the method is registered (method needs to have service's type or a resource as first arg)
// changes "PropertyDescriptor | null" type for "any" to avoid typescript error in decorators property decorators
// (see https://stackoverflow.com/questions/37694322/typescript-ts1241-unable-to-resolve-signature-of-method-decorator-when-called-a)
export function serviceIsRegistered(target: Object, key: string | symbol, descriptor: PropertyDescriptor): any {
    const original = descriptor.value;

    descriptor.value = function() {
        let args = Array.prototype.slice.call(arguments);
        let type: string;
        try {
            if (typeof args[0] === 'string') {
                type = args[0];
            } else {
                type = args[0].type;
            }
        } catch (err) {
            console.warn(`ERROR: First argument of methods decorated with serviceIsRegistered has to be string or Resource.`);

            return null;
        }

        const service_is_registered = Core.me.getResourceService(type);
        if (!service_is_registered) {
            console.warn(`ERROR: ${type} service has not been registered.`);

            return null;
        }

        const result = original.apply(this, args);

        return result;
    };

    return descriptor;
}
