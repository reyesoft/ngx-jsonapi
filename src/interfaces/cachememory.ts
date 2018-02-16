import { ICollection } from '../interfaces';
import { Resource } from '../resource';
import { ICache } from '../interfaces/cache';

export interface ICacheMemory<R extends Resource = Resource> extends ICache {
    resources: { [id: string]: Resource };

    getOrCreateCollection(url: string): ICollection<R>;
    isCollectionExist(url: string): boolean;
    isCollectionLive(url: string, ttl: number): boolean;

    isResourceLive(id: string, ttl: number): boolean;
    getOrCreateResource(type: string, id: string): Resource;
    setCollection(url: string, collection: ICollection<R>): void;

    removeResource(id: string): void;
}
