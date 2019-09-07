import { IAttributes } from '../interfaces';
import { ILinks } from '../interfaces/links';

export interface IDataResource {
    type: string;
    id: string;
    attributes?: IAttributes;
    relationships?: object;
    links?: ILinks;
    meta?: object;
    _lastupdate_time?: number; // used when come from Store
}
