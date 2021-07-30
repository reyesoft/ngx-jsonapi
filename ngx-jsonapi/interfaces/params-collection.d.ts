import { IParams } from './params';
import { IPage } from './page';
export interface IParamsCollection extends IParams {
    remotefilter?: object;
    /** @deprecated since 2.2, we have rxjs pipes */
    smartfilter?: object;
    sort?: Array<string>;
    page?: IPage;
    fields?: object;
    store_cache_method?: 'individual' | 'compact';
    /** @deprecated since 2.2 */
    storage_ttl?: number;
    /** @deprecated since 2.2 */
    cachehash?: string;
}
export interface IBuildedParamsCollection extends IParams {
    remotefilter: object;
    /** @deprecated since 2.2, we have rxjs pipes */
    smartfilter: object;
    sort: Array<string>;
    page: IPage;
    fields: object;
    store_cache_method: 'individual' | 'compact';
    /** @deprecated since 2.2 */
    storage_ttl: number;
    /** @deprecated since 2.2 */
    cachehash: string;
}
