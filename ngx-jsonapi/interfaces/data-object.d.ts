import { IDocumentData } from './document';
import { IDataResource, ICacheableDataResource } from './data-resource';
export interface IDocumentResource extends IDocumentData {
    data: IDataResource;
}
export interface ICacheableDocumentResource extends IDocumentResource {
    data: ICacheableDataResource;
}
