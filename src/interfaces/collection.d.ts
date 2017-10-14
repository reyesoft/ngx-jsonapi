import { IResource } from './resource';
import { IPage } from './page';
import { IDataResource } from './data-resource';

export interface ICollection extends Array<IResource> {
    $length: number;
    $toArray: Array<IResource>;
    $is_loading: boolean;
    $source: 'new' | 'memory' | 'store' | 'server';
    $cache_last_update: number;
    data: Array<IDataResource>; // this need disapear is for datacollection
    page: IPage;
}
