import { IDocumentResource } from './data-object';
import { Resource } from '../resource';
import { IParamsResource } from './params-resource';

export interface IClonedResource extends Resource {
    toObject(params?: IParamsResource): IDocumentResource;
    superToObject(params?: IParamsResource): IDocumentResource;
}

export function isClonedResource(arg: any): arg is IClonedResource {
    return arg && arg.toObject && typeof arg.toObject === 'function' && arg.superToObject && typeof arg.superToObject === 'function';
}
