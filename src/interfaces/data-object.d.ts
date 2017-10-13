import { IDocument } from './document';
import { IDataResource } from './data-resource';

interface IDataObject extends IDocument {
    data: IDataResource;
}
