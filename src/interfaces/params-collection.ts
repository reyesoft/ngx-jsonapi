import { IParams } from './params';
import { IPage } from './page';

export interface IParamsCollection extends IParams {
    remotefilter?: object;
    fields?: object;
    smartfilter?: object;
    sort?: Array<string>;
    page?: IPage;
    storage_ttl?: number;
    cachehash?: string; // solution for when we have different resources with a same id
}
