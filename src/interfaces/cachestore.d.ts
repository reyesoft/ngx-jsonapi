import { ICollection, IResource } from '../interfaces';
import { ICache } from '../interfaces/cache.d';

export interface ICacheStore extends ICache {
    getResource(resource: IResource): Promise<object>;
    getCollectionFromStorePromise(url:string, includes: Array<string>, collection: ICollection): Promise<ICollection>;
    setCollection(url: string, collection: ICollection, include: Array<string>): void;
}
