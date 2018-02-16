import { ISchema, ICollection, IParamsResource } from '../interfaces';
import { Resource } from '../resource';
export declare class Base {
    static Params: IParamsResource;
    static Schema: ISchema;
    static newCollection<R extends Resource = Resource>(): ICollection<R>;
    static isObjectLive(ttl: number, last_update: number): boolean;
    static forEach<T extends {
        [keyx: string]: any;
    }>(collection: T, fc: (object: any, key?: string | number) => void): void;
}
