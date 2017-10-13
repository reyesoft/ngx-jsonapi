import { ISchema, IResource, ICollection, ICacheMemory, IAttributes, ICacheStore, IParamsCollection, IParamsResource } from './index';

export interface IService {
    type: string;
    schema: ISchema;
    getPrePath(): string;
    getPath(): string;
    register(): boolean;
    get<T extends IResource>(id: string | number, params?: IParamsResource | Function, fc_success?: Function, fc_error?: Function): T;
    all(params?: IParamsCollection | Function, success?: Function, error?: Function): ICollection;
    delete (id: String, params?: IParamsResource | Function, success?: Function, error?: Function): void;
    getService<T extends IService> ():T;
    clearCacheMemory? (): boolean;
    new?<T extends IResource>(): T;
    cachememory: ICacheMemory;
    cachestore: ICacheStore;
    parseFromServer(attributes: IAttributes): void;
    parseToServer?(attributes: IAttributes): void;
}
