import { IParams } from './params';
import { IPage } from './page';
export interface IParamsCollection extends IParams {
    localfilter?: object;
    remotefilter?: object;
    smartfilter?: object;
    page?: IPage;
    storage_ttl?: number;
    cachehash?: string;
}
