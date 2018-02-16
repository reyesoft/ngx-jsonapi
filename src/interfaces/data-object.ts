import { IDocument } from './document';
import { IDataResource } from './data-resource';

export interface IDataObject extends IDocument {
    data: IDataResource;
}
