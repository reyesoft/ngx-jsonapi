import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestFactory } from './tests/factories/test-factory';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { delay, filter, first } from 'rxjs/operators';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

describe('service methods', () => {
    let core;
    let service;

    beforeEach(() => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        service = new AuthorsService();
        service.register();
    });

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
});

let test_response_subject = new BehaviorSubject(new HttpResponse());

class DynamicHttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(100));
    }
}

describe('Requesting not cached collections. All() method:', () => {
    let core: Core;
    let authorsService: AuthorsService;

    beforeEach(() => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new DynamicHttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.register();
        authorsService.clearCacheMemory();
    });

    it(`should emit before the collection is loaded or builded`, done => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService
            .all()
            .pipe(first())
            .subscribe(authors => {
                expect(authors.is_loading).toBe(true);
                expect(authors.loaded).toBe(false);
                expect(authors.builded).toBe(false);
                expect(authors.source).toBe('new');
                done();
            });
    });

    // NOTE: observable has 200 ms to emit the full collection (fake http delays 100 ms)
    it(`when resources are loaded and builded, should emit the resource as loaded and builded from server`, done => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService
            .all()
            .pipe(
                filter(authors => {
                    return authors.builded && authors.loaded && !authors.is_loading; // builded, loaded, is_loading checks
                })
            )
            .subscribe(authors => {
                expect(http_request_spy).toHaveBeenCalled();
                expect(authors.source).toBe('server');
                expect(authors.data.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe('Requesting cached collections from memory. All() method should:', () => {
    let core: Core;
    let authorsService: AuthorsService;

    beforeAll(done => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new DynamicHttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.collections_ttl = 60; // in seconds
        authorsService.register();
        authorsService.clearCacheMemory();
        authorsService.cachestore.deprecateCollections(''); // deprecate all collection cached from previous tests in cachestore

        // caching resources
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));
        authorsService
            .all()
            .pipe(
                filter(authors => {
                    return authors.builded && authors.loaded && !authors.is_loading; // builded, loaded, is_loading checks
                })
            )
            .subscribe(authors => {
                expect(authors.source).toBe('server');
                expect(authors.data.length).toBeGreaterThan(0);
                done();
            });
    });

    it(`return alive collections from memory...`, done => {
        expect(authorsService.collections_ttl).toBeGreaterThan(0); // to prevent from removeing or changing this value to 0
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService.all().subscribe(authors => {
            expect(http_request_spy).not.toHaveBeenCalled();
            expect(authors.source).toBe('memory');
            expect(authors.data.length).toBeGreaterThan(0);
            done();
        });
    });

    it(`return alive collections from memory (that were reviously saved in memory from store)...`, done => {
        // TODO: test should not know about cachememory methods or properties, but service.clearChacheMemory deprecates store too...
        // should we create clearCacheStore and sepatrate it from clearChacheMemory?
        (authorsService.cachememory as any).collections = {};

        expect(authorsService.collections_ttl).toBeGreaterThan(0); // to prevent from removeing or changing this value to 0
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService
            .all()
            .pipe(
                filter(authors => {
                    return authors.builded && authors.loaded && !authors.is_loading; // builded, loaded, is_loading checks
                })
            )
            .subscribe(authors => {
                expect(http_request_spy).not.toHaveBeenCalled();
                expect(authors.source).toBe('store');
                expect(authors.data.length).toBeGreaterThan(0);
                // done();
                authorsService
                    .all()
                    .pipe(
                        filter(memory_authors => {
                            // builded, loaded, is_loading checks
                            return memory_authors.builded && memory_authors.loaded && !memory_authors.is_loading;
                        })
                    )
                    .subscribe(memory_authors => {
                        expect(http_request_spy).not.toHaveBeenCalled();
                        expect(memory_authors.source).toBe('memory');
                        expect(memory_authors.data.length).toBeGreaterThan(0);
                        done();
                    });
            });
    });
});

describe('Requesting cached collections from store. All() method:', () => {
    let core: Core;
    let authorsService: AuthorsService;

    beforeAll(done => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new DynamicHttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.collections_ttl = 61; // in seconds
        authorsService.register();
        authorsService.clearCacheMemory();
        authorsService.cachestore.deprecateCollections(''); // deprecate all collection cached from previous tests in cachestore

        // caching resources
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));
        authorsService
            .all()
            .pipe(
                filter(authors => {
                    return authors.builded && authors.loaded && !authors.is_loading; // builded, loaded, is_loading checks
                })
            )
            .subscribe(authors => {
                expect(authors.source).toBe('server');
                expect(authors.data.length).toBeGreaterThan(0);
                done();
            });
    });

    beforeEach(() => {
        // TODO: test should not know about cachememory methods or properties, but service.clearChacheMemory deprecates store too...
        // should we create clearCacheStore and sepatrate it from clearChacheMemory?
        (authorsService.cachememory as any).collections = {};
    });

    it(`emit before it's loaded or builded`, done => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService
            .all()
            .pipe(first())
            .subscribe(authors => {
                expect(authors.is_loading).toBe(true);
                expect(authors.loaded).toBe(false);
                expect(authors.builded).toBe(false);
                expect(authors.source).toBe('new');
                done();
            });
    });

    it(`return alive collections from store...`, done => {
        expect(authorsService.collections_ttl).toBeGreaterThan(0); // to prevent from removeing or changing this value to 0
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService
            .all()
            .pipe(
                filter(authors => {
                    return authors.builded && authors.loaded && !authors.is_loading; // builded, loaded, is_loading checks
                })
            )
            .subscribe(authors => {
                expect(http_request_spy).not.toHaveBeenCalled();
                expect(authors.source).toBe('store');
                expect(authors.data.length).toBeGreaterThan(0);
                done();
            });
    });
});
