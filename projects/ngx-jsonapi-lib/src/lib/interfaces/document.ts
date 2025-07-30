import { IDataResource } from '../interfaces/data-resource';
import { ILinks } from '../interfaces/links';
import { Resource } from '../resource';
import { IPage } from './page';

// http://org/format/#document-top-level
export interface IDocument<R extends Resource = Resource> {
    // A document MUST contain at least one of the following top-level members:
    data?: R | Array<R> | Array<IDataResource> | IDataResource; // @todo remover IDataResource[]
    errors?: any;
    meta?: { [key: string]: any };

    // A document MAY contain any of these top-level members:
    jsonapi?: string;
    links?: ILinks;

    // No Json Api specification attributes
    builded?: boolean;
    content?: 'ids' | 'collection' | 'id' | 'resource' | 'error' | '';
}

export interface IDocumentData<R extends Resource = Resource> extends IDocument {
    data: R | Array<R> | IDataResource | Array<IDataResource>; // @todo remover IDataResource[]    included?: any;
    content?: 'collection' | 'resource' | 'id' | 'ids' | '';
    included?: Array<any>;

    page?: IPage;
    trackBy?(r: Resource): string;
}

export interface IDocumentErrors extends IDocument {
    errors: any;
    content: 'error';
}

export interface IDocumentMeta extends IDocument {
    meta: { [key: string]: any };
    content: '';
}
