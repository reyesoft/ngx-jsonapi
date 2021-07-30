import { IDataResource } from '../interfaces/data-resource';
import { ILinks } from '../interfaces/links';
import { Resource } from '../resource';
import { IPage } from './page';
export interface IDocument<R extends Resource = Resource> {
    data?: R | Array<R> | Array<IDataResource> | IDataResource;
    errors?: any;
    meta?: {
        [key: string]: any;
    };
    jsonapi?: string;
    links?: ILinks;
    builded?: boolean;
    content?: 'ids' | 'collection' | 'id' | 'resource' | 'error' | '';
}
export interface IDocumentData<R extends Resource = Resource> extends IDocument {
    data: R | Array<R> | IDataResource | Array<IDataResource>;
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
    meta: {
        [key: string]: any;
    };
    content: '';
}
