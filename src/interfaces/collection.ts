import { Resource } from '../resource';
import { IPage } from './page';
import { IDataResource } from './data-resource';
import { IDocumentData } from './document';

export interface ICollection<R extends Resource = Resource> extends IDocumentData {
    $length: number;
    $toArray: R[];
    $is_loading: boolean;
    $source: 'new' | 'memory' | 'store' | 'server';
    $cache_last_update: number;
    page: IPage;
    data: R[];
    trackBy: Function;
}
