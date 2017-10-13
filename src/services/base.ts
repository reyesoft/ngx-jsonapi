import { ISchema, ICollection, IParamsCollection, IParamsResource } from '../interfaces';
import { Page } from './page';

export class Base {
    static Params: IParamsCollection | IParamsResource = {
        id: '',
        include: []
    };

    static Schema: ISchema = {
        attributes: {},
        relationships: {},
        ttl: 0
    };

    static newCollection(): ICollection {
        return Object.defineProperties({}, {
            $length: {
                get: function() {
                    return Object.keys(this).length * 1;
                },
                enumerable: false
            },
            $toArray: {
                get: function() {
                    return Object.keys(this).map((key) => {
                        return this[key];
                    });
                },
                enumerable: false
            },
            $is_loading: { value: false, enumerable: false, writable: true },
            $source: { value: '', enumerable: false, writable: true  },
            $cache_last_update: { value: 0, enumerable: false, writable: true  },
            page: { value: new Page(), enumerable: false, writable: true  }
        });
    }

    static isObjectLive(ttl: number, last_update: number) {
        return (ttl >= 0 && Date.now() <= (last_update + ttl * 1000));
    }

    static forEach<T extends object>(collection: T, fc: (object: any, key?: string|number) => void): void {
        Object.keys(collection).forEach((key) => {
            fc(collection[key], key);
        });
    }
}
