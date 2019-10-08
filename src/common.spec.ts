import { isLive, isCollection, isResource } from './common';
import { ICacheable } from './interfaces/cacheable';
import { DocumentCollection } from './document-collection';
import { DocumentResource } from './document-resource';

describe('common funcions', () => {
    it('should be isLive return a correct boolean value', () => {
        let cacheable: ICacheable = {
            is_loading: false,
            source: 'server',
            cache_last_update: Date.now() - 1000 * 1000
        };

        expect(isLive(cacheable, 100)).toBe(false);
        expect(isLive(cacheable, 10000)).toBe(true);
    });

    let resource = new DocumentResource();
    let collection = new DocumentCollection();
    it('should be detect DocumentResource with isResource()', () => {
        expect(isResource(resource)).toBe(true);
        expect(isResource(collection)).toBe(false);
    });
    it('should be detect DocumentCollection with isCollection()', () => {
        expect(isCollection(collection)).toBe(true);
        expect(isCollection(resource)).toBe(false);
    });
});
