import { IBuildedParamsCollection, IParamsResource } from '../interfaces';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';
export declare class Base {
    static ParamsResource: IParamsResource;
    static ParamsCollection: IBuildedParamsCollection;
    static newCollection<R extends Resource = Resource>(): DocumentCollection<R>;
    static isObjectLive(ttl: number, last_update: number): boolean;
    static forEach<T extends {
        [keyx: string]: any;
    }>(collection: T, fc: (object: any, key?: string | number) => void): void;
}
