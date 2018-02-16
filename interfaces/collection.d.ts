import { Resource } from '../resource';
import { IPage } from './page';
import { IDataResource } from './data-resource';
export interface ICollection<R extends Resource = Resource> extends Array<Resource> {
    $length: number;
    $toArray: Array<R>;
    $is_loading: boolean;
    $source: 'new' | 'memory' | 'store' | 'server';
    $cache_last_update: number;
    data: Array<IDataResource>;
    page: IPage;
}
