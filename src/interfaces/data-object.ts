import { IDocument, IDocumentData } from './document';
import { IDataResource } from './data-resource';

export interface IDataObject extends IDocumentData {
    data: IDataResource;
}
