import { Resource } from '../resource';
import { ICache } from '../interfaces/cache';
import { DocumentResource } from '../document-resource';
import { DocumentCollection } from '../document-collection';

export interface ICacheMemory<R extends Resource = Resource> extends ICache {
    resources: { [id: string]: Resource };

    getOrCreateCollection(url: string): DocumentCollection<R>;
    isCollectionExist(url: string): boolean;
    isCollectionLive(url: string, ttl: number): boolean;

    isResourceLive(id: string, ttl: number): boolean;
    setCollection(url: string, collection: DocumentCollection<R>): void;

    removeResource(id: string): void;
}
