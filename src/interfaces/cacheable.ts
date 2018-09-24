export interface ICacheable {
    is_loading: boolean;
    source: 'new' | 'memory' | 'store' | 'server';
    cache_last_update: number;
    ttl?: number;
}
