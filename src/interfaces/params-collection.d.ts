import { IParams } from './params.d';
import { IPage } from './page.d';

interface IParamsCollection extends IParams {
    localfilter?: object;
    remotefilter?: object;
    smartfilter?: object;
    page?: IPage;
    storage_ttl?: number;
    cachehash?: string;  // solution for when we have different resources with a same id
}
