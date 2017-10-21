import { ICollection } from '../interfaces';
import { ICache } from '../interfaces/cache';
import { Resource } from '../';

export interface ICacheStore extends ICache {
    getResource(resource: Resource): Promise<object>;
    getCollectionFromStorePromise(url: string, includes: Array<string>, collection: ICollection): Promise<ICollection>;
    setCollection(url: string, collection: ICollection, include: Array<string>): void;
}
