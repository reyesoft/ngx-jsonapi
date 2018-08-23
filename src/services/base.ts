import { ISchema, IParamsCollection, IParamsResource } from '../interfaces';
import { Page } from './page';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';

export class Base {
    public static Params: IParamsResource = {
        id: '',
        include: []
    };

    public static Schema: ISchema = {
        relationships: {},
        ttl: 0
    };

    public static newCollection<R extends Resource = Resource>(): DocumentCollection<R> {
        return new DocumentCollection();
    }

    public static isObjectLive(ttl: number, last_update: number) {
        return ttl >= 0 && Date.now() <= last_update + ttl * 1000;
    }

    public static forEach<T extends { [keyx: string]: any }>(collection: T, fc: (object: any, key?: string | number) => void): void {
        Object.keys(collection).forEach(key => {
            fc(collection[key], key);
        });
    }
}
