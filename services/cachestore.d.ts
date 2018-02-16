import { ICollection, ICache } from '../interfaces';
import { Resource } from '../resource';
export declare class CacheStore implements ICache {
    getResource(resource: Resource, include?: Array<string>): Promise<object>;
    setResource(resource: Resource): void;
    getCollectionFromStorePromise(url: string, include: Array<string>, collection: ICollection): Promise<ICollection>;
    private getCollectionFromStore(url, include, collection, resolve, reject);
    private fillCollectionWithArrrayAndResourcesOnMemory(dataresources, collection);
    private getResourceFromMemory(dataresource);
    private fillCollectionWithArrrayAndResourcesOnStore(datacollection, include, collection);
    setCollection(url: string, collection: ICollection, include: Array<string>): void;
    deprecateCollections(path_start_with: string): boolean;
}
