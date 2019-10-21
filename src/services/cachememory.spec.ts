import { Author, AuthorsService } from './../tests/factories/authors.service';
import { CacheMemory } from './cachememory';
import { TestFactory } from '../tests/factories/test-factory';

import { Core } from '../core';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';

import { BehaviorSubject, Observable } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

describe('Cache Memory deprecation and live conditions', () => {
    it('clearCache', () => {
        let cachememory = CacheMemory.getInstance();
        let collection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);
        expect(collection_on_memory.cache_last_update).toBeGreaterThan(0);

        cachememory.clearCache();

        // test that the previous instance has been cleared
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(0);
        expect(collection_on_memory.source).toBe('new');

        // test that new instances are clear
        cachememory = CacheMemory.getInstance();
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(0);
        expect(collection_on_memory.source).toBe('new');
    });

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

    it('getResource() should return the stored resource', () => {
        let cachememory = CacheMemory.getInstance();
        let author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory = <Author>cachememory.getResource('authors', author.id);
        expect(author_on_memory).toBeTruthy();
    });

    it('getResource() should return null when the requested resource does not exist', () => {
        let cachememory = CacheMemory.getInstance();
        let author_on_memory = cachememory.getResource('authors', 'some non stored author');
        expect(author_on_memory).toBe(null);
    });

    it('getResourceOrFail() should return the stored resource if exists', () => {
        let cachememory = CacheMemory.getInstance();
        let author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory = <Author>cachememory.getResourceOrFail('authors', author.id);
        expect(author_on_memory).toBeTruthy();
    });

    it('getResourceOrFail() should throw an error if the requested resource does not exist', () => {
        let cachememory = CacheMemory.getInstance();
        expect(() => {
            cachememory.getResourceOrFail('authors', 'new_' + Math.floor(Math.random() * 6));
        }).toThrow(new Error('The requested resource does not exist in cache memory'));
    });

    it('getOrCreateResource() should return the requested resource', () => {
        let cachememory = CacheMemory.getInstance();
        let author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory = cachememory.getOrCreateResource('authors', author.id);
        expect(author_on_memory).toEqual(author);
    });

    it('getOrCreateResource() should throw an error if the requested service does not exist', () => {
        let core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        // let service = new AuthorsService();

        let cachememory = CacheMemory.getInstance();
        expect(() => {
            cachememory.getOrCreateResource('authors', 'new_' + Math.floor(Math.random() * 6));
        }).toThrow(
            new Error(
                'The requested service with type authors has not been registered, please use register() method or @Autoregister() decorator'
            )
        );
    });

    it('getOrCreateResource() should return a new resource when the requested resource does not exist', () => {
        let core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        let service = new AuthorsService();

        let cachememory = CacheMemory.getInstance();
        let author_on_memory = cachememory.getOrCreateResource('authors', 'new_' + Math.floor(Math.random() * 6));
        expect(author_on_memory.is_new).toBeTruthy();
    });

    it('resource cache_last_update with update_lastupdate', async () => {
        let cachememory = CacheMemory.getInstance();
        let author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory = cachememory.getOrCreateResource('authors', author.id);
        expect(author.cache_last_update).toBeGreaterThan(0);
        expect(author_on_memory.cache_last_update).toBe(author.cache_last_update);
    });

    it('resource cache_last_update without update_lastupdate', async () => {
        let cachememory = CacheMemory.getInstance();
        let author = TestFactory.getAuthor();
        cachememory.setResource(author);

        let author_on_memory = cachememory.getOrCreateResource('authors', author.id);
        expect(author.cache_last_update).toBe(0);
        expect(author_on_memory.cache_last_update).toBe(author.cache_last_update);
    });

    it('removeResource()', async () => {
        let cachememory = CacheMemory.getInstance();
        let author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory = cachememory.getOrCreateResource('authors', author.id);
        expect(author.cache_last_update).toBeGreaterThan(0);
        expect(author_on_memory.cache_last_update).toBe(author.cache_last_update);

        cachememory.removeResource('authors', author.id);
        let removed_author = cachememory.getResource('authors', author.id);
        expect(removed_author).toBe(null);
    });

    it('removeResource() with fake id should not fail', async () => {
        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('authors', 'some fake id');
        expect(true).toBeTruthy();
    });
});
