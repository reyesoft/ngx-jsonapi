import { IDataResource } from './data-resource';
import { IDocument } from '../interfaces/document';
import { IPage } from './page';

interface IDataCollection extends IDocument {
    data: Array<IDataResource>;
    page?: IPage;
    _lastupdate_time?: number;   // used when come from Store
}
