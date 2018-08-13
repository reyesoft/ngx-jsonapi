import { IDataResource } from '../interfaces/data-resource';
import { ILinks } from '../interfaces/links';
import { Resource } from '../resource';
import { ICollection } from './collection';

// http://org/format/#document-top-level
export interface IDocument<R extends Resource = Resource> {
    // A document MUST contain at least one of the following top-level members:
    data?: R | R[] | IDataResource[] | IDataResource | ICollection<R>; // @todo remover IDataResource[]
    errors?: any;
    meta?: { [key: string]: any };

    // A document MAY contain any of these top-level members:
    jsonapi?: string;
    links?: ILinks;
}

export interface IDocumentData<R extends Resource = Resource> extends IDocument {
    data: R | R[] | IDataResource | IDataResource[] | ICollection<R>; // @todo remover IDataResource[]
    included?: any;
}

export interface IDocumentErrors extends IDocument {
    errors: any;
}

export interface IDocumentMeta extends IDocument {
    meta: { [key: string]: any };
}
