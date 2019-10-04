import { IDocumentResource } from './interfaces/data-object';
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

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
let test_response_subject = new BehaviorSubject(new HttpResponse());

describe('service basic methods', () => {
    let core = new Core(
        new JsonapiConfig(),
        new JsonapiStore(),
        new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
    );
    let service = new AuthorsService();
    service.register();

    it('a new resource has a type', () => {
        const resource = service.new();
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.type).toEqual('authors');
    });

    it('a new resource with id has a type', () => {
        const resource = service.createResource('31');
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.id).toEqual('31');
        expect(resource.type).toEqual('authors');
    });

    it('getOrCreateResource()', () => {
        // @todo
    });
});

describe('service.all()', () => {
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
        await booksService.clearCacheMemory();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
    });

    it(`without cached collection emits source ^new-server|`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Book) }));

        let expected = [
            // expected emits
            { builded: false, loaded: false, source: 'new' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let emmits = await booksService
            .all()
            .pipe(
                tap(emmit => {
                    if (emmit.data.length > 0) {
                        expect(emmit.data[0].relationships).toHaveProperty('photos');
                        expect(emmit.data[0].relationships).toHaveProperty('author');
                    }
                }),
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`with cached on memory (live) collection emits source ^memory|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Book) }));
        booksService.collections_ttl = 5; // live
        await booksService.all().toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: true, source: 'memory' }
        ];

        let emmits = await booksService
            .all()
            .pipe(
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on memory (dead) collection emits source ^memory-server|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Book) }));
        booksService.collections_ttl = 0; // dead
        await booksService.all().toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: false, source: 'memory' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let emmits = await booksService
            .all()
            .pipe(
                tap(emmit => {
                    if (emmit.data.length > 0) {
                        expect(emmit.data[0].relationships).toHaveProperty('photos');
                        expect(emmit.data[0].relationships).toHaveProperty('author');
                    }
                }),
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`with cached on store (live) collection emits source ^new-store|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Book) }));
        booksService.collections_ttl = 5; // live
        await booksService.all().toPromise();
        CacheMemory.getInstance().deprecateCollections(''); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            // source_resource: 'server' because we dont touch child elements
            { builded: true, loaded: false, source: 'new', source_resource: 'server' },
            { builded: true, loaded: true, source: 'store', source_resource: 'store' }
        ];

        let emmits = await booksService
            .all()
            .pipe(
                tap(emmit => {
                    if (emmit.data.length > 0) {
                        expect(emmit.data[0].relationships).toHaveProperty('photos');
                        expect(emmit.data[0].relationships).toHaveProperty('author');
                    }
                }),
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source, source_resource: emmit.data[0].source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on store (dead) collection emits source ^new-store-server|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Book) }));
        booksService.collections_ttl = 0; // dead
        await booksService.all().toPromise();
        booksService.clearCacheMemory(); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: false, source: 'new' },
            // { builded: true, loaded: false, source: 'store' }, // @todo
            { builded: true, loaded: true, source: 'server' }
        ];

        let emmits = await booksService
            .all()
            .pipe(
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });
});

describe('service.all() and next service.get()', () => {
    let core: Core;
    let authorsService: AuthorsService;
    beforeEach(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.register();
        await authorsService.clearCacheMemory();
    });

    it(`with cached collection on memory and next request get() with new include`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        let expected = [
            // expected emits
            { builded: false, loaded: false, source: 'new' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        let author = await authorsService.get(authors.data[0].id, { include: ['photos', 'books'] }).toPromise();

        // @todo
    });

    it(`with cached collection on store and next request get() with new include`, async () => {
        //
    });

    it(`with cached collection on memory and next request get() without include`, async () => {
        //
    });

    it(`with cached collection on store and next request get() without include`, async () => {
        //
    });
});

describe('service.get()', () => {
    let core: Core;
    let booksService: BooksService;
    let authorsService: AuthorsService;
    beforeEach(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCacheMemory();
        authorsService = new AuthorsService();
        authorsService.register();
        await authorsService.clearCacheMemory();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
    });

    it(`no cached resource emits source ^new-server|`, async () => {
        // @todo
    });

    it(`memory cached (live) resource emits source ^memory|`, async () => {
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));
        // caching resource
        await booksService.get('1').toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emmits = await booksService
            .get('1', { ttl: 1000 })
            .pipe(
                map(emmit => {
                    return { loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`on memory (live) resource + include existent has-one-relationship emits source ^memory-server|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book);
        body_resource.data.relationships = { author: { data: { id: '1', type: 'authors' } } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emmits = await booksService
            .get('1', { ttl: 1000, include: ['author'] })
            .pipe(
                map(emmit => {
                    return { loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`on memory (live) resource + include existent has-many-relationship emits source ^memory-server|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Author);
        body_resource.data.id = '555';
        body_resource.data.relationships = { books: { data: [{ id: '555', type: 'books' }] } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await authorsService.get('555').toPromise();

        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emmits = await authorsService
            .get('555', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emmit => {
                    return { loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
    });

    it(`with cached on memory (live) resource + include empty has-one-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book);
        body_resource.data.relationships = { photos: { data: [] } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await booksService.get('1').toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emmits = await booksService
            .get('1', { ttl: 1000, include: ['photos'] })
            .pipe(
                tap(emmit => {
                    // expect(emmit.data[0].relationships).toHaveProperty('author');
                }),
                map(emmit => {
                    return { loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on memory (live) resource + include empty has-many-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Author);
        body_resource.data.id = '556';
        body_resource.data.relationships = { books: { data: [] } };
        test_response_subject.next(new HttpResponse({ body: body_resource }));
        // caching resource
        await authorsService.get('556').toPromise();

        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emmits = await authorsService
            .get('556', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emmit => {
                    return { loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
    });

    it(`with cached on memory (dead) resource emits source ^memory-server|`, async () => {
        // @todo
    });

    it(`with cached on store (live) resource emits source ^new-store|`, async () => {
        // @todo
    });

    it(`with cached on store (live) resource but with new include emits source ^store-server|`, async () => {
        // @todo
    });

    it(`with cached on store (dead) resource emits source ^new-store-server|`, async () => {
        // @todo
    });
});
