import { IDocumentResource } from './interfaces/data-object';
import { Resource } from './resource';
import { IClonedResource } from './interfaces/cloned-resource';
import { IParamsResource } from './interfaces';
import { IDataResource } from './interfaces/data-resource';
export declare class ClonedDocumentResource {
    private resource_object;
    private parent_resource_object;
    constructor(cloned_resource: IClonedResource | IDataResource, parent_resource: Resource | IDataResource, params?: IParamsResource);
    getResourceObject(): IDocumentResource;
    private removeDuplicatedIncludes;
    private removeDuplicatedRelationships;
    private removeDuplicatedAttributes;
}
