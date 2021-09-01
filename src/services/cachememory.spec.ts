import { StoreService } from '../sources/store.service';
import { JsonRipper } from '../services/json-ripper';
import { ReflectiveInjector } from '@angular/core';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from '../core';
import { Author, AuthorsService } from './../tests/factories/authors.service';
import { CacheMemory } from './cachememory';
import { TestFactory } from '../tests/factories/test-factory';

import { Http as JsonapiHttpImported } from '../sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';

import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentCollection } from '../document-collection';
import { Resource } from '../resource';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate([
    {
        provide: JSONAPI_RIPPER_SERVICE,
        useClass: JsonRipper
    },
    {
        provide: JSONAPI_STORE_SERVICE,
        useClass: StoreService
    }
]);

describe('Cache Memory deprecation and live conditions', () => {
    it('clearCache', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let collection: DocumentCollection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory: DocumentCollection = cachememory.getOrCreateCollection('authors');
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

    it('collections cache_last_update', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let collection: DocumentCollection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory: DocumentCollection = cachememory.getOrCreateCollection('authors');
        expect(collection.cache_last_update).toBeGreaterThan(0);
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);
    });

    it('deprecateCollections(``) deprecate all', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let collection: DocumentCollection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory: DocumentCollection = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);
        expect(collection_on_memory.cache_last_update).toBeGreaterThan(0);

        cachememory.deprecateCollections('extrange_type');
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(collection.cache_last_update);

        cachememory.deprecateCollections('');
        collection_on_memory = cachememory.getOrCreateCollection('authors');
        expect(collection_on_memory.cache_last_update).toBe(0);
    });

    it('deprecateCollections(`some_type`) deprecate only some_type collections', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let collection: DocumentCollection = TestFactory.getCollection(Author);
        cachememory.setCollection('authors', collection);

        let collection_on_memory: DocumentCollection = cachememory.getOrCreateCollection('authors');
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
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author: Author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory: Author = <Author>cachememory.getResource('authors', author.id);
        expect(author_on_memory).toBeTruthy();
    });

    it('getResource() should return null when the requested resource does not exist', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author_on_memory: Resource | null = cachememory.getResource('authors', 'some non stored author');
        expect(author_on_memory).toBe(null);
    });

    it('getResourceOrFail() should return the stored resource if exists', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author: Author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory: Author = <Author>cachememory.getResourceOrFail('authors', author.id);
        expect(author_on_memory).toBeTruthy();
    });

    it('getResourceOrFail() should throw an error if the requested resource does not exist', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        expect(() => {
            cachememory.getResourceOrFail('authors', 'new_' + Math.floor(Math.random() * 6));
        }).toThrow(new Error('The requested resource does not exist in cache memory'));
    });

    it('getOrCreateResource() should return the requested resource', () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author: Author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory: Resource = cachememory.getOrCreateResource('authors', author.id);
        expect(author_on_memory).toEqual(author);
    });

    it('getOrCreateResource() should throw an error if the requested service does not exist', () => {
        let core: Core = new Core(
            new JsonapiConfig(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
            injector
        );
        // let service = new AuthorsService();

        let cachememory: CacheMemory = CacheMemory.getInstance();
        expect(() => {
            cachememory.getOrCreateResource('authors', 'new_' + Math.floor(Math.random() * 6));
        }).toThrow(
            new Error(
                'The requested service with type authors has not been registered, please use register() method or @Autoregister() decorator'
            )
        );
    });

    it('getOrCreateResource() should return a new resource when the requested resource does not exist', () => {
        let core: Core = new Core(
            new JsonapiConfig(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
            injector
        );
        let service: AuthorsService = new AuthorsService();

        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author_on_memory: Resource = cachememory.getOrCreateResource('authors', 'new_' + Math.floor(Math.random() * 6));
        expect(author_on_memory.is_new).toBeTruthy();
    });

    it('resource cache_last_update with update_lastupdate', async () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author: Author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory: Resource = cachememory.getOrCreateResource('authors', author.id);
        expect(author.cache_last_update).toBeGreaterThan(0);
        expect(author_on_memory.cache_last_update).toBe(author.cache_last_update);
    });

    it('resource cache_last_update without update_lastupdate', async () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author: Author = TestFactory.getAuthor();
        cachememory.setResource(author);

        let author_on_memory: Resource = cachememory.getOrCreateResource('authors', author.id);
        expect(author.cache_last_update).toBe(0);
        expect(author_on_memory.cache_last_update).toBe(author.cache_last_update);
    });

    it('removeResource()', async () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        let author: Author = TestFactory.getAuthor();
        cachememory.setResource(author, true);

        let author_on_memory: Resource = cachememory.getOrCreateResource('authors', author.id);
        expect(author.cache_last_update).toBeGreaterThan(0);
        expect(author_on_memory.cache_last_update).toBe(author.cache_last_update);

        cachememory.removeResource('authors', author.id);
        let removed_author: Resource | null = cachememory.getResource('authors', author.id);
        expect(removed_author).toBe(null);
    });

    it('removeResource() with fake id should not fail', async () => {
        let cachememory: CacheMemory = CacheMemory.getInstance();
        cachememory.removeResource('authors', 'some fake id');
        expect(true).toBeTruthy();
    });
});
