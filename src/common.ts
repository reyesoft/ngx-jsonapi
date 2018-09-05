import { ICacheable } from './interfaces/cacheable';
import { DocumentResource } from './document-resource';
import { DocumentCollection } from './document-collection';

export function isLive(cacheable: ICacheable, ttl: number = null): boolean {
    return Date.now() <= cacheable.cache_last_update + (ttl || cacheable.ttl || 0) * 1000;
}

export function isCollection(document: DocumentResource | DocumentCollection): document is DocumentCollection {
    return !('id' in document.data);
}

export function isResource(document: DocumentResource | DocumentCollection): document is DocumentResource {
    return 'id' in document.data;
}
