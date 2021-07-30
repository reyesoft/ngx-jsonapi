import { IDocumentResource } from './data-object';
import { Resource } from '../resource';
import { IParamsResource } from './params-resource';
export interface IClonedResource extends Resource {
    toObject(params?: IParamsResource): IDocumentResource;
    superToObject(params?: IParamsResource): IDocumentResource;
}
export declare function isClonedResource(arg: any): arg is IClonedResource;
