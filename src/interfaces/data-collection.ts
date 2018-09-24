import { IDataResource } from './data-resource';
import { IDocument, IDocumentData } from '../interfaces/document';
import { IPage } from './page';

export interface IDataCollection extends IDocumentData {
    data: Array<IDataResource>;
    page?: IPage;
    _lastupdate_time?: number; // used when come from Store
}
