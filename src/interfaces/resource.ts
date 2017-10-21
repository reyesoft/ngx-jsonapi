import { IRelationships, ICollection, IAttributes, IParamsResource, IService } from './index';
import { IDataObject } from './data-object';

export interface IResource {
    type: string;
    id: string;
    attributes?: IAttributes;
    relationships: IRelationships;    // redefined from IDataResource

    is_new: boolean;
    is_loading: boolean;
    is_saving: boolean;
    lastupdate?: number;

    reset?(): void;
    addRelationship?(resource: IResource, type_alias?: string): void;
    addRelationships?(resources: ICollection, type_alias: string): void;
    removeRelationship?(type_alias: string, id: string): boolean;
    addRelationshipsArray <T extends IResource>(resources: Array<T>, type_alias?: string): void;
    save<T extends IResource>(params?: IParamsResource, fc_success?: Function, fc_error?: Function): Promise<object>;
    toObject?(params?: IParamsResource): IDataObject;
    getService(): IService;
}
