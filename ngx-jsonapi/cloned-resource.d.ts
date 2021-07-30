import { Resource } from './resource';
import { IParamsResource } from './interfaces';
import { IDocumentResource } from './interfaces/data-object';
import { IClonedResource } from './interfaces/cloned-resource';
export declare class ClonedResource<T extends Resource> extends Resource implements IClonedResource {
    private parent;
    attributes: T['attributes'];
    relationships: T['relationships'];
    constructor(resource: T);
    toObject(params?: IParamsResource): IDocumentResource;
    superToObject(params?: IParamsResource): IDocumentResource;
    private copySourceFromParent;
}
