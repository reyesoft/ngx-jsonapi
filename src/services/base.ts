import {
    ISchema,
    ICollection,
    IParamsCollection,
    IParamsResource,
} from '../interfaces';
import { Page } from './page';
import { Resource } from '../resource';

export class Base {
    public static Params: /* IParamsCollection | */ IParamsResource = {
        id: '',
        include: []
    };

    public static Schema: ISchema = {
        attributes: {},
        relationships: {},
        ttl: 0
    };

    public static newCollection<R extends Resource = Resource>(): ICollection<R> {
        return Object.defineProperties(
            {},
            {
                $length: {
                    get: function() {
                        return Object.keys(this).length * 1;
                    },
                    enumerable: false,
                },
                $toArray: {
                    get: function() {
                        return Object.keys(this).map(key => {
                            return this[key];
                        });
                    },
                    enumerable: false,
                },
                $is_loading: {
                    value: false,
                    enumerable: false,
                    writable: true,
                },
                $source: { value: '', enumerable: false, writable: true },
                $cache_last_update: {
                    value: 0,
                    enumerable: false,
                    writable: true
                },
                page: { value: new Page(), enumerable: false, writable: true }
            }
        );
    }

    public static isObjectLive(ttl: number, last_update: number) {
        return (ttl >= 0 && Date.now() <= (last_update + ttl * 1000));
    }

    public static forEach<T extends { [keyx: string ]: any } >(
        collection: T,
        fc: (object: any, key?: string | number) => void
    ): void {
        Object.keys(collection).forEach(key => {
            fc(collection[key], key);
        });
    }
}
