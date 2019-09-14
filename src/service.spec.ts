import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestFactory } from './test-factory/test-factory';
import { Author, AuthorsService } from './test-factory/authors.service';
import { delay, filter } from 'rxjs/operators';

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

describe('not cached collections', () => {
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
    });

    it(`all() should request the collection to the server and emit before it's loaded or builded`, () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService.all().subscribe(authors => {
            // expect(http_request_spy).toHaveBeenCalled(); @todo maxi, no longer required?
            expect(authors.is_loading).toBe(true);
            expect(authors.loaded).toBe(false);
            expect(authors.builded).toBe(false);
            expect(authors.source).toBe('new');
        });
    });

    // NOTE: observable has 200 ms to emit the full collection (fake http delays 100 ms)
    it(`when resources are loaded and builded, all() should emit the resource as loaded and builded from server`, done => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        authorsService
            .all()
            .pipe(
                filter(authors => {
                    return authors.builded && authors.loaded && !authors.is_loading;
                })
            )
            .subscribe(authors => {
                // expect(http_request_spy).toHaveBeenCalled(); @todo maxi, no longer required?
                expect(authors.source).toBe('server');
                expect(authors.data.length).toBeGreaterThan(0);
                done();
            });
    }, 500);
});
