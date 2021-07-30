import { SourceType } from './../document';
import { IHasCacheData } from './has-cache-data';
export interface ICacheable extends IHasCacheData {
    is_loading: boolean;
    loaded: boolean;
    source: SourceType;
    ttl?: number;
}
