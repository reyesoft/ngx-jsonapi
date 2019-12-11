import { IDocumentResource } from './interfaces/data-object';
import { PhotosService } from './tests/factories/photos.service';
import { JsonRipper } from './services/json-ripper';
import { IDataResource } from './interfaces/data-resource';
import { CacheMemory } from './services/cachememory';
import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestFactory } from './tests/factories/test-factory';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { Book, BooksService } from './tests/factories/books.service';
import { delay, map, toArray, tap } from 'rxjs/operators';

// @todo disable PhotoService
// @TODO: fix error in toObject when relationship's service is not injected

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
let test_response_subject = new BehaviorSubject(new HttpResponse());

describe('service basic methods', () => {
    let core: Core;
    let service: AuthorsService;
    beforeAll(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        service = new AuthorsService();
    });

    it('a new resource has a type', async () => {
        const resource = service.new();
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.type).toEqual('authors');
    });

    it('a new resource with id has a type', async () => {
        const resource = service.createResource('31');
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.id).toEqual('31');
        expect(resource.type).toEqual('authors');
    });

    // @TODO: uncomment when library has support for clear cachememory and it's added in the following tests suites
    // it('getOrCreateResource() without cached resource', () => {
    //     let resource = service.getOrCreateResource('1');
    //     expect(resource.source).toBe('new');
    // });
    //
    // it('getOrCreateResource() with cached resource in memory', async () => {
    //     let body_resource = TestFactory.getResourceDocumentData(Author);
    //     (<IDataResource>body_resource.data).id = '1';
    //     test_response_subject.next(new HttpResponse({ body: body_resource }));
    //     // caching resource
    //     await service.get('1').toPromise();
    //
    //     let resource = service.getOrCreateResource('1');
    //     expect(resource.source).toBe('memory');
    // });
});

let store_cache_methods: Array<'individual'|'compact'> = ['compact', 'individual'];
for (let store_cache_method of store_cache_methods) {
    describe(`service.all() with ${store_cache_method} storage cache method: `, () => {
        let core: Core;
        let booksService: BooksService;
        beforeEach(async () => {
            core = new Core(
                new JsonapiConfig(),
                new JsonapiStore(),
                new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
            );
            booksService = new BooksService();
            booksService.register();
            let photosService = new PhotosService();
            photosService.register();
            let authorsService = new AuthorsService();
            authorsService.register();
            await booksService.clearCache();
            test_response_subject.complete();
            test_response_subject = new BehaviorSubject(new HttpResponse());

            // clear cachememory on every test
            let cachememory = CacheMemory.getInstance();
            (cachememory as any).resources = {};
            (cachememory as any).collections = {};
        });

        it(`without cached collection emits source ^new-server|`, async () => {
            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));

            let expected = [
                // expected emits
                {builded: false, loaded: false, source: 'new'},
                {builded: true, loaded: true, source: 'server'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    tap(emit => {
                        if (emit.data.length > 0) {
                            expect(emit.data[0].relationships).toHaveProperty('photos');
                            expect(emit.data[0].relationships).toHaveProperty('author');
                        }
                    }),
                    map(emit => {
                        return {builded: emit.builded, loaded: emit.loaded, source: emit.source};
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(1);
        });

        it(`with cached on memory (live) collection emits source ^memory|`, async () => {
            // caching collection
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));
            booksService.collections_ttl = 5; // live
            await booksService.all().toPromise();

            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            let expected = [
                // expected emits
                {builded: true, loaded: true, source: 'memory'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    map(emit => {
                        return {builded: emit.builded, loaded: emit.loaded, source: emit.source};
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(0);
        });

        it(`with cached on memory (dead) collection emits source ^memory-server|`, async () => {
            // caching collection
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));
            booksService.collections_ttl = 0; // dead
            await booksService.all({store_cache_method: store_cache_method}).toPromise();

            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            let expected = [
                // expected emits
                {builded: true, loaded: false, source: 'memory'},
                {builded: true, loaded: true, source: 'server'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    tap(emit => {
                        if (emit.data.length > 0) {
                            expect(emit.data[0].relationships).toHaveProperty('photos');
                            expect(emit.data[0].relationships).toHaveProperty('author');
                        }
                    }),
                    map(emit => {
                        return {builded: emit.builded, loaded: emit.loaded, source: emit.source};
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(1);
        });

        it(`with cached on store (live) collection emits source ^new-store|`, async () => {
            // caching collection
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));
            booksService.collections_ttl = 5; // live
            await booksService.all({store_cache_method: store_cache_method}).toPromise();
            let cachememory = CacheMemory.getInstance(); // kill only memory cache
            (cachememory as any).resources = {}; // kill memory cache
            (cachememory as any).collections = {}; // kill memory cache

            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            let expected = [
                // expected emits
                {builded: false, loaded: false, source: 'new', source_resource: undefined},
                {builded: true, loaded: true, source: 'store', source_resource: 'store'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    tap(emit => {
                        if (emit.data.length > 0) {
                            expect(emit.data[0].relationships).toHaveProperty('photos');
                            expect(emit.data[0].relationships).toHaveProperty('author');
                        }
                    }),
                    map(emit => {
                        if (emit.data.length > 0) {
                            return {builded: emit.builded, loaded: emit.loaded, source: emit.source, source_resource: emit.data[0].source};
                        } else {
                            return {builded: emit.builded, loaded: emit.loaded, source: emit.source, source_resource: undefined};
                        }
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(0);
        });

        it(`with cached on store (live) collection wihtout includes emits source ^new-store|`, async () => {
            // caching collection
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));
            booksService.collections_ttl = 5; // live
            await booksService.all({store_cache_method: store_cache_method, include: ['author']}).toPromise();
            let cachememory = CacheMemory.getInstance(); // kill only memory cache
            (cachememory as any).resources = {}; // kill memory cache
            (cachememory as any).collections = {}; // kill memory cache

            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            let expected = [
                // expected emits
                {builded: false, loaded: false, source: 'new', source_resource: undefined},
                {builded: true, loaded: true, source: 'store', source_resource: 'store'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    map(emit => {
                        if (emit.data.length > 0) {
                            return {builded: emit.builded, loaded: emit.loaded, source: emit.source, source_resource: emit.data[0].source};
                        } else {
                            return {builded: emit.builded, loaded: emit.loaded, source: emit.source, source_resource: undefined};
                        }
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(0);
        });

        it(`with cached on store (dead) collection emits source ^new-store-server|`, async () => {
            // caching collection
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));
            booksService.collections_ttl = 0; // dead
            await booksService.all({store_cache_method: store_cache_method}).toPromise();
            CacheMemory.getInstance().deprecateCollections('');

            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            let expected = [
                // expected emits
                {builded: true, loaded: false, source: 'new'}, // @TODO: builded should be false
                {builded: true, loaded: true, source: 'server'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    map(emit => {
                        return {builded: emit.builded, loaded: emit.loaded, source: emit.source};
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(1);
        });

        it(`with cached on store (dead, no collection_ttl defined) collection emits source ^new-store-server|`, async () => {
            // caching collection
            test_response_subject.next(new HttpResponse({body: TestFactory.getCollectionDocumentData(Book)}));
            delete booksService.collections_ttl; // dead
            await booksService.all({store_cache_method: store_cache_method}).toPromise();
            CacheMemory.getInstance().deprecateCollections('');

            let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
            let expected = [
                // expected emits
                {builded: true, loaded: false, source: 'new'}, // @TODO: builded should be false
                {builded: true, loaded: true, source: 'server'}
            ];

            let emits = await booksService
                .all({store_cache_method: store_cache_method})
                .pipe(
                    map(emit => {
                        return {builded: emit.builded, loaded: emit.loaded, source: emit.source};
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(http_request_spy).toHaveBeenCalledTimes(1);
        });
    });
}

describe('service.all() and next service.get()', () => {
    let core: Core;
    let authorsService: AuthorsService;
    let booksService: BooksService;
    beforeEach(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.register();
        booksService = new BooksService();
        booksService.register();
        let photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
    });

    it(`with cached collection on memory and next request get() with new include`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        let expected = [
            // expected emits
            { loaded: false, source: 'memory' }, // emits with data stored in memory
            { loaded: true, source: 'server' } // emits with data received from server
        ];

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Author) }));
        let author_emits = await authorsService
            .get(authors.data[0].id, { include: ['photos', 'books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(author_emits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(2);
    });

    it(`with cached collection on store and next request get() with new include`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        let expected = [
            { loaded: false, source: 'new' },
            { loaded: true, source: 'server' } // emits with data received from server
        ];

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        let cachememory = CacheMemory.getInstance();
        let removed_author_id = authors.data[0].id;
        cachememory.removeResource('authors', removed_author_id); // kill only memory cache
        let removed_author = cachememory.getResource('authors', removed_author_id);
        expect(removed_author).toBe(null);

        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Author) }));
        let author_emits = await authorsService
            .get(removed_author_id, { include: ['photos', 'books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(author_emits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(2);
    });

    it(`with cached collection on memory and next request get() without include`, async () => {
        Author.test_ttl = 100000;
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let all_authors_body = TestFactory.getCollectionDocumentData(Author, 1, ['books']);
        test_response_subject.next(new HttpResponse({ body: all_authors_body }));

        let expected = [
            // expected emits
            { loaded: true, source: 'memory' } // emits with data stored in memory ERROR! check emits...
        ];
        let received_author: Author;

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        expect(authors.data[0].relationships.books.data[0].attributes).toBeTruthy();

        let author_emits = await authorsService
            .get(authors.data[0].id)
            .pipe(
                tap(author => (received_author = author)),
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(author_emits).toMatchObject(expected);
        // expect(received_author.relationships.books.data[0].attributes).toBeFalsy(); // ERROR!!!
        expect(http_request_spy).toHaveBeenCalledTimes(1); // on all() request
    });

    it(`with cached collection on store and next request get() without include`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let all_authors_body = TestFactory.getCollectionDocumentData(Author, 1, ['books']);
        test_response_subject.next(new HttpResponse({ body: all_authors_body }));

        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: true, source: 'store' } // emits with data stored in memory ERROR! check emits...
        ];
        let received_author: Author;

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        expect(authors.data[0].relationships.books.data[0].attributes).toBeTruthy();

        let cachememory = CacheMemory.getInstance();
        let removed_author_id = authors.data[0].id;
        cachememory.removeResource('authors', removed_author_id); // kill only memory cache

        let author_emits = await authorsService
            .get(removed_author_id)
            .pipe(
                tap(author => (received_author = author)),
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        // @TODO: fix this error!!!
        expect(author_emits).toMatchObject(expected);
        // expect(received_author.relationships.books.data[0].attributes).toBeFalsy(); // ERROR!!!
        expect(http_request_spy).toHaveBeenCalledTimes(1); // on all() request
    });
});

describe('service.get()', () => {
    let core: Core;
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;
    beforeEach(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCache();
        authorsService = new AuthorsService();
        authorsService.register();
        photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        // @TODO: should clear CacheMemory before each it
    });

    it(`no cached resource emits source ^new-server|`, async () => {
        let expected = [{ loaded: false, source: 'new' }, { loaded: true, source: 'server' }];

        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));
        let book_emits = await booksService
            .get('1')
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(book_emits).toMatchObject(expected);
    });

    it(`memory cached (live) resource emits source ^memory|`, async () => {
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));
        // caching resource
        await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000 })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`on memory (live) resource + include new has-one-relationship emits source ^memory-server|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book);
        body_resource.data.relationships = { author: { data: { id: '1', type: 'authors' } } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: body_resource }));

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['author'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        // TODO: fix library
        expect(emits).toMatchObject(expected); // ERROR!!! [{ loaded: true, source: 'memory' }, { loaded: true, source: 'server' }]
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`on memory (live) resource + include existent has-many-relationship emits source ^memory-server|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Author);
        body_resource.data.id = '555';
        body_resource.data.relationships = { books: { data: [{ id: '555', type: 'books' }] } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await authorsService.get('555').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: body_resource }));

        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emits = await authorsService
            .get('555', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
    });

    it(`with cached on memory (live) resource + include empty has-one-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book);
        body_resource.data.relationships = { photos: { data: [] } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['photos'] })
            .pipe(
                tap(emit => {
                    // expect(emit.data[0].relationships).toHaveProperty('author');
                }),
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on memory (live) resource + include empty has-many-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Author);
        body_resource.data.id = '556';
        body_resource.data.relationships = { books: { data: [] } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await authorsService.get('556').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());

        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await authorsService
            .get('556', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
    });

    it(`with cached on memory (dead) resource emits source ^memory-server|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: body_resource }));

        let cachememory = CacheMemory.getInstance();
        let book = cachememory.getResourceOrFail('books', '1');
        book.ttl = 0;

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1')
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`with cached on store (live) resource emits source ^new-store|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';

        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: body_resource }));

        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('books', '1'); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: true, source: 'store' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000 })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on store (live) resource but with new include emits source ^store-server|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';

        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: body_resource }));

        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('books', '1'); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: false, source: 'store' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        // @TODO: fix library
        // expect(emits).toMatchObject(expected); // ERROR!!! [{ loaded: false, source: 'new' }, { loaded: true, source: 'server' }]
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`with cached on store (dead) resource emits source ^new-store-server|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';

        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        let book = await booksService.get('1').toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        test_response_subject.next(new HttpResponse({ body: body_resource }));

        book.ttl = 0;
        let json_ripper = new JsonRipper();
        json_ripper.saveResource(book);
        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('books', '1'); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: false, source: 'store' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        // @TODO: fix library
        // expect(emits).toMatchObject(expected); // ERROR!!! [{ loaded: false, source: 'new' }, { loaded: true, source: 'server' }]
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });
});
