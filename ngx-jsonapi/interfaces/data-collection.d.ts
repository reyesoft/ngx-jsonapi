import { IHasCacheData } from './has-cache-data';
import { IDataResource, ICacheableDataResource } from './data-resource';
import { IDocumentData } from '../interfaces/document';
import { IPage } from './page';
export interface IDataCollection extends IDocumentData {
    data: Array<IDataResource>;
    page?: IPage;
}
export interface ICacheableDataCollection extends IDataCollection, IHasCacheData {
    data: Array<ICacheableDataResource>;
}
