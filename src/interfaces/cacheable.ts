export interface ICacheable {
    // deprecated since 2.2.0. Use loaded.
    is_loading: boolean;
    loaded: boolean;
    source: 'new' | 'memory' | 'store' | 'server';
    cache_last_update: number;
    ttl?: number;
}
