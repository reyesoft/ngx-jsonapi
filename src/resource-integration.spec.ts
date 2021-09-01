import { StoreService } from './sources/store.service';
import { JsonRipper } from './services/json-ripper';
import { ReflectiveInjector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book, BooksService } from './tests/factories/books.service';
import { AuthorsService } from './tests/factories/authors.service';
import { PhotosService } from './tests/factories/photos.service';
import { JsonapiConfig } from './jsonapi-config';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { TestFactory } from './tests/factories/test-factory';

// @todo: create HttpHandlerMock class file and import it in tests to avoid duplication
class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
let test_response_subject: BehaviorSubject<HttpResponse<unknown>> = new BehaviorSubject(new HttpResponse());
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

// @todo: find a way to reuse this test initialization... it's duplicated in other tests
describe('Resource delete', () => {
    let core: Core;
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;

    beforeEach(async () => {
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
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
    });

    it('should send a DELETE request', async () => {
        let httpClientDeleteSpy: jasmine.Spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: { data: null } }));
        let book: Book = TestFactory.getBook('1');
        await book
            .delete()
            .toPromise()
            .then(data => {
                expect(httpClientDeleteSpy.calls.mostRecent().args[0]).toBe('DELETE');
            });
    });
});

// @todo: find a way to reuse this test initialization... it's duplicated in other tests
describe('Resource save', () => {
    let core: Core;
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;

    beforeEach(async () => {
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
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
    });

    it('include_get should be included in the URL, but not in the request data', async () => {
        let resource: Book = TestFactory.getBook('book_1', ['author']);
        let http_request_spy: jasmine.Spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));

        await resource.save({ include_get: ['author'] });
        expect(http_request_spy.calls.mostRecent().args[1]).toBe('http://yourdomain/api/v1/books/book_1?include=author');
        expect(http_request_spy.calls.mostRecent().args[2].body.include).toBeFalsy();
    });

    it('include_get should be included in the request data, but not in the URL', async () => {
        let resource: Book = TestFactory.getBook('book_1', ['author']);
        resource.relationships.author.data.id = 'author_1';
        let http_request_spy: jasmine.Spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));

        await resource.save({ include_save: ['author'] });
        expect(http_request_spy.calls.mostRecent().args[1]).toBe('http://yourdomain/api/v1/books/book_1');
        expect(http_request_spy.calls.mostRecent().args[2].body.included).toBeTruthy();
        expect(http_request_spy.calls.mostRecent().args[2].body.included.length).toBe(1);
        expect(http_request_spy.calls.mostRecent().args[2].body.included[0].id).toBe('author_1');
    });
    it('should use POST if is_new is truthy', async () => {
        let resource: Book = TestFactory.getBook('book_1');
        resource.is_new = true;
        let http_request_spy: jasmine.Spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));

        await resource.save();
        expect(http_request_spy.calls.mostRecent().args[0]).toBe('POST');
    });

    it('should use PATCH if is_new is falsy', async () => {
        let resource: Book = TestFactory.getBook('book_1');
        resource.is_new = false;
        let http_request_spy: jasmine.Spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getResourceDocumentData(Book) }));

        await resource.save();
        expect(http_request_spy.calls.mostRecent().args[0]).toBe('PATCH');
    });
});
