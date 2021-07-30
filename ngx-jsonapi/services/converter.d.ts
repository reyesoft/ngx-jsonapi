import { Resource } from '../resource';
import { Service } from '../service';
import { IResourcesByType } from '../interfaces';
import { IDocumentResource } from '../interfaces/data-object';
import { IDataCollection } from '../interfaces/data-collection';
import { IDataResource } from '../interfaces/data-resource';
export declare class Converter<R extends Resource> {
    static json_array2resources_array_by_type(json_array: Array<IDataResource>): IResourcesByType;
    static json2resource(json_resource: IDataResource, instance_relationships: any): Resource;
    static getService(type: string): Service | undefined;
    static getServiceOrFail(type: string): Service;
    static buildIncluded(document_from: IDataCollection | IDocumentResource): IResourcesByType;
    private static procreate;
    private static json_array2resources_array;
}
