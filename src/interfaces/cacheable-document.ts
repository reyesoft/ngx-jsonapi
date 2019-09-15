import { IDataResource } from './data-resource';
import { IDataCollection } from './data-collection';

export interface ICacheableDocument {
    meta: {
        _cache_updated_at: number;
    };
}

export interface ICacheableCollection extends IDataCollection, ICacheableDocument {
    meta: {
        _cache_updated_at: number;
        // [key: string]: any;
    };
}

export interface ICacheableResource extends IDataResource, ICacheableDocument {
    meta: {
        _cache_updated_at: number;
        // [key: string]: any;
    };
}
