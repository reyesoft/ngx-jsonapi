import { IHasCacheData } from './has-cache-data';
import { IObject } from './../data-providers/data-provider';
import { IAttributes } from '../interfaces';
import { ILinks } from '../interfaces/links';

export interface IDataResource {
    type: string;
    id: string;
    attributes?: IAttributes;
    relationships?: IObject;
    links?: ILinks;
    meta?: IObject;
}

export interface ICacheableDataResource extends IDataResource, IHasCacheData {}
