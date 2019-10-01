import { Author } from './../tests/factories/authors.service';
import { CacheMemory } from './cachememory';
import { TestFactory } from '../tests/factories/test-factory';

describe('Cache Memory deprecation and live conditions', () => {
    it('collections cache_last_update', async () => {
        let cachememory = CacheMemory.getInstance();
        let collection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection.cache_last_update).toBeGreaterThan(0);
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);
    });

    it('deprecateCollections(``) deprecate all', async () => {
        let cachememory = CacheMemory.getInstance();
        let collection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);
        expect(collection_on_memory.cache_last_update).toBeGreaterThan(0);

        cachememory.deprecateCollections('extrange_type');
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);

        cachememory.deprecateCollections('');
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(0);
    });

    it('deprecateCollections(`some_type`) deprecate only some_type collections', async () => {
        let cachememory = CacheMemory.getInstance();
        let collection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);
        expect(collection_on_memory.cache_last_update).toBeGreaterThan(0);

        cachememory.deprecateCollections('extrange_type');
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);

        cachememory.deprecateCollections('auth');
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(0);
    });

    it('resource cache_last_update', async () => {
        // @todo like previous it
    });

    it('removeResource()', async () => {
        // @todo like previous it
    });
});
