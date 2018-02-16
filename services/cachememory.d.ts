import { ICollection } from '../interfaces';
import { ICacheMemory } from '../interfaces/cachememory';
import { Resource } from '../resource';
export declare class CacheMemory<R extends Resource = Resource> implements ICacheMemory {
    private collections;
    private collections_lastupdate;
    resources: {
        [id: string]: Resource;
    };
    isCollectionExist(url: string): boolean;
    isCollectionLive(url: string, ttl: number): boolean;
    isResourceLive(id: string, ttl: number): boolean;
    getOrCreateCollection(url: string): ICollection<R>;
    setCollection(url: string, collection: ICollection): void;
    getOrCreateResource(type: string, id: string): Resource;
    setResource(resource: Resource, update_lastupdate?: boolean): void;
    deprecateCollections(path_start_with: string): boolean;
    removeResource(id: string): void;
}
