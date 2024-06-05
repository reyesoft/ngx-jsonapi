import { IBuildedParamsCollection, IParamsCollection, IParamsResource } from '../interfaces';
import { Page } from './page';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';

export class Base {
    public static ParamsResource: IParamsResource = {
        beforepath: '',
        ttl: undefined,
        include: [],
        fields: {},
        id: ''
    };

    public static ParamsCollection: IBuildedParamsCollection = {
        beforepath: '',
        ttl: undefined,
        include: [],
        remotefilter: {},
        fields: {},
        smartfilter: {},
        sort: [],
        page: new Page(),
        store_cache_method: 'individual',
        storage_ttl: 0,
        cachehash: ''
    };

    public static newCollection<R extends Resource = Resource>(): DocumentCollection<R> {
        return new DocumentCollection();
    }

    public static isObjectLive(ttl: number, last_update: number): boolean {
        return ttl >= 0 && Date.now() <= last_update + ttl * 1000;
    }

    public static forEach<T extends { [keyx: string]: any }>(collection: T, fc: (object: any, key?: string | number) => void): void {
        Object.keys(collection).forEach(key => {
            fc(collection[key], key);
        });
    }
}
