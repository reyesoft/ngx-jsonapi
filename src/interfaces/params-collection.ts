import { IParams } from './params';
import { IPage } from './page';

export interface IParamsCollection extends IParams {
    localfilter?: object;
    remotefilter?: object;
    smartfilter?: object;
    sort?: string[];
    page?: IPage;
    storage_ttl?: number;
    cachehash?: string; // solution for when we have different resources with a same id
}
