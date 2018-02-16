import { Resource } from '../resource';
import { Service } from '../service';
import { ICollection, IResourcesByType } from '../interfaces';
import { IDataObject } from '../interfaces/data-object';
import { IDataCollection } from '../interfaces/data-collection';
import { IDataResource } from '../interfaces/data-resource';
export declare class Converter {
    private static json_array2resources_array(json_array, destination_array?);
    static json_array2resources_array_by_type(json_array: Array<IDataResource>): IResourcesByType;
    static json2resource(json_resource: IDataResource, instance_relationships: any): Resource;
    static getService(type: string): Service;
    private static procreate(data);
    static build(document_from: IDataCollection | IDataObject, resource_dest: Resource | ICollection): void;
    private static _buildCollection(collection_data_from, collection_dest, included_resources);
    private static _buildResource(resource_data_from, resource_dest, included_resources);
}
