import { Service } from './service';
import { ParentResourceService } from './parent-resource-service';
import { IDataObject } from './interfaces/data-object';
import { IAttributes, ICollection, IExecParams, IParamsResource, IRelationships } from './interfaces';
export declare class Resource extends ParentResourceService {
    is_new: boolean;
    is_loading: boolean;
    is_saving: boolean;
    id: string;
    type: string;
    attributes: IAttributes;
    relationships: IRelationships;
    lastupdate: number;
    reset(): void;
    toObject(params?: IParamsResource): IDataObject;
    save<T extends Resource>(params?: Object | Function, fc_success?: Function, fc_error?: Function): Promise<object>;
    protected __exec<T extends Resource>(exec_params: IExecParams): Promise<object>;
    private _save<T>(params, fc_success, fc_error);
    addRelationship<T extends Resource>(resource: T, type_alias?: string): void;
    addRelationships(resources: ICollection, type_alias: string): void;
    addRelationshipsArray<T extends Resource>(resources: Array<T>, type_alias?: string): void;
    removeRelationship(type_alias: string, id: string): boolean;
    getService(): Service;
}
