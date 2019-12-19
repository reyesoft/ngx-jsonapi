import { BehaviorSubject, Observable, of } from 'rxjs';
import { BooksService } from './tests/factories/books.service';
import { AuthorsService } from './tests/factories/authors.service';
import { PhotosService } from './tests/factories/photos.service';
import { JsonapiConfig } from './jsonapi-config';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Core } from './core';
import { TestFactory } from './tests/factories/test-factory';

// @todo: create HttpHandlerMock class file and import it in tests to avoid duplication
class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
let test_response_subject = new BehaviorSubject(new HttpResponse());

// @todo: find a way to reuse this test initialization... it's duplicated in other tests
describe('Resource full path', () => {
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
    });

    it('delete method', async () => {
        let httpClientDeleteSpy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: { data: null } }));
        let book = TestFactory.getBook('1');
        await book
            .delete()
            .toPromise()
            .then(data => {
                console.log('data ...', data);
                expect(httpClientDeleteSpy.calls.mostRecent().args[0]).toBe('DELETE');
            });
    });
});
