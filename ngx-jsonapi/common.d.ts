import { ICacheable } from './interfaces/cacheable';
import { DocumentResource } from './document-resource';
import { DocumentCollection } from './document-collection';
import { Resource } from './resource';
export declare function isLive(cacheable: ICacheable, ttl?: number): boolean;
export declare function relationshipsAreBuilded(resource: Resource, includes: Array<string>): boolean;
/**
 * @deprecated since 2.2.0
 */
export declare function isCollection(document: DocumentResource | DocumentCollection): document is DocumentCollection;
/**
 * @deprecated since 2.2.0
 */
export declare function isResource(document: DocumentResource | DocumentCollection): document is DocumentResource;
export declare function serviceIsRegistered(target: Object, key: string | symbol, descriptor: PropertyDescriptor): any;
