import { ContentTypes } from './../document';
import { IHasCacheData } from './has-cache-data';

// deprecated since 2.2.0. Use loaded.
export interface ICacheable extends IHasCacheData {
    // deprecated since 2.2.0. Use loaded.
    is_loading: boolean;
    loaded: boolean;
    source: ContentTypes;
    ttl?: number;
}
