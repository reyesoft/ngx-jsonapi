import { ICollection } from '../interfaces';
import { Resource } from '../resource';
import { ICache } from '../interfaces/cache';

export interface ICacheMemory extends ICache {
    resources: { [id: string]: Resource };

    getOrCreateCollection(url: string): ICollection;
    isCollectionExist(url: string): boolean;
    isCollectionLive(url: string, ttl: number): boolean;

    isResourceLive(id: string, ttl: number): boolean;
    getOrCreateResource(type: string, id: string): Resource;
    setCollection(url: string, collection: ICollection): void;

    removeResource(id: string): void;
}
