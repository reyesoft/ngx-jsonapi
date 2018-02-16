import { IDataResource } from '../interfaces/data-resource';
import { ILinks } from '../interfaces/links';
export interface IDocument {
    jsonapi?: string;
    links?: ILinks;
    included?: Array<IDataResource>;
    meta?: {
        [key: string]: any;
    };
}
