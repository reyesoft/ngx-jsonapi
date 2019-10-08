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
        await authorsService.clearCacheMemory();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
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

        // let authors = await authorsService.all({ include: ['books'] }).toPromise();
        let authors = await authorsService.all({ include: ['books'] })
            .pipe(tap(authors1 => { console.log(authors1.data[0]); }))
            .toPromise();
        test_response_subject.complete();
        test_response_subject = new BehaviorSubject(new HttpResponse());
        expect(authors.data[0].relationships.books.data[0].attributes).toBeTruthy();
        console.log('some author ttl --->', authors.data[0].ttl);

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

        // @TODO: fix this error!!!
        expect(author_emits).toMatchObject(expected); // ERROR!!! [{ loaded: false, source: 'memory' }, { loaded: false, source: 'store' }]
        // expect(received_author.relationships.books.data[0].attributes).toBeFalsy(); // ERROR!!!
        expect(http_request_spy).toHaveBeenCalledTimes(1); // on all() request
        Author.test_ttl = undefined;
    });
});
