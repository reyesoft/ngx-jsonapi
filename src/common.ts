import { ICacheable } from './interfaces/cacheable';

export function isLive(cacheable: ICacheable, ttl: number = null): boolean {
    return Date.now() <= cacheable.$cache_last_update + (ttl || cacheable.schema.ttl || 0) * 1000;
}
