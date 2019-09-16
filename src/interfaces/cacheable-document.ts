import { IDataObject } from './data-object';
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

export interface ICacheableResource extends IDataObject, ICacheableDocument {
    meta: {
        _cache_updated_at: number;
        // [key: string]: any;
    };
}
