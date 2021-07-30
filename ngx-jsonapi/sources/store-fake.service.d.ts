import { IStoreService } from './store-service.interface';
import { ICacheableDataCollection } from '../interfaces/data-collection';
import { ICacheableDataResource, IDataResource } from '../interfaces/data-resource';
import { IObjectsById } from '../interfaces';
export declare class StoreFakeService implements IStoreService {
    getDataObject(type: 'collection' | string, id_or_url: string): Promise<any>;
    getDataResources(keys: Array<string>): Promise<IObjectsById<ICacheableDataResource>>;
    saveResource(type: string, url_or_id: string, value: IDataResource): void;
    saveCollection(url_or_id: string, value: ICacheableDataCollection): void;
    clearCache(): void;
    deprecateResource(type: string, id: string): void;
    deprecateCollection(key_start_with: string): void;
    removeObjectsWithKey(key: string): Promise<void>;
}
