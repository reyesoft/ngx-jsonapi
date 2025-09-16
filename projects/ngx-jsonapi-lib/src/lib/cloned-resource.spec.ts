import { ClassProvider, Injector } from '@angular/core';
import { StoreService } from './sources/store.service';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { JsonRipper } from './services/json-ripper';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { PhotosService } from './tests/factories/photos.service';
import { ClonedResource } from './cloned-resource';
import { waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { Book, BooksService } from './tests/factories/books.service';
import { JsonapiConfig } from './jsonapi-config';
import { DocumentResource } from './document-resource';
import { DocumentCollection } from './document-collection';

class HttpHandlerMock implements HttpHandler {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
let test_response_subject: BehaviorSubject<HttpResponse<unknown>> = new BehaviorSubject(new HttpResponse());
let injector: Injector = Injector.create([
    {
        provide: JSONAPI_RIPPER_SERVICE,
        useClass: JsonRipper
    } as ClassProvider,
    {
        provide: JSONAPI_STORE_SERVICE,
        useClass: StoreService
    } as ClassProvider
]);

describe('ClonedResource save', () => {
    let core: Core;
    let authors_service: AuthorsService;
    let photos_service: PhotosService;
    let books_service: BooksService;

    let http_client_spy: jest.SpyInstance;

    beforeAll(() => {
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
        authors_service = new AuthorsService();
        authors_service.register();

        photos_service = new PhotosService();
        photos_service.register();

        books_service = new BooksService();
        books_service.register();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();

        if (test_response_subject && !test_response_subject.closed) {
            test_response_subject.complete();
        }
        test_response_subject = new BehaviorSubject(new HttpResponse());

        http_client_spy = jest.spyOn(HttpClient.prototype, 'request');
        http_client_spy.mockClear();

        if (core) {
            core['me'] = {};
        }

        authors_service.register();
        photos_service.register();
        books_service.register();
    });

    it('should save only dirty attributes', fakeAsync(() => {
        let author: Author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let author_clone: ClonedResource<Author> = new ClonedResource(author);
        test_response_subject.next(new HttpResponse({ body: author_clone.toObject() }));
        author_clone.attributes.name = 'Luis';

        let lastCall: any;
        author_clone.save().subscribe((author_data) => {
            lastCall = http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body;
        });

        tick(100);

        expect(lastCall).toMatchObject({
            data: {
                attributes: { name: 'Luis' },
                id: '123456',
                relationships: {},
                type: 'authors'
            }
        });
    }));

    it('should save only dirty HAS ONE relationships', fakeAsync(() => {
        let book: Book = books_service.new();
        book.id = '123456';
        book.attributes.created_at = new Date();
        book.attributes.title = 'Así habló Zaratustra';
        let author: Author = authors_service.new();
        author.id = '1';
        author.attributes.name = 'José';
        book.addRelationship(author, 'author');

        let book_clone: ClonedResource<Book> = new ClonedResource(book);
        // Inicializar relación si no existe en el clon
        if (!book_clone.relationships.author) {
            const rel = new DocumentResource<Author>();
            rel.data = book.relationships.author.data;
            book_clone.relationships.author = rel;
        }
        test_response_subject.next(new HttpResponse({ body: book_clone.toObject() }));

        let lastCall1: any;
        book_clone.save().subscribe((author_data) => {
            lastCall1 = http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body;
        });

        tick(100);

        expect(lastCall1).toMatchObject({
            data: {
                attributes: {},
                id: '123456',
                relationships: {},
                type: 'books'
            }
        });

        let new_author: Author = authors_service.new();
        new_author.id = '2';
        new_author.attributes.name = 'Luis';

        if (!book_clone.relationships['author']) {
            book_clone.relationships['author'] = new DocumentResource<Author>();
            book_clone.relationships['author'].data = null;
        }
        book_clone.addRelationship(new_author, 'author');

        let lastCall2: any;
        book_clone.save({ include: ['author'] }).subscribe(() => {
            lastCall2 = http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body;
        });

        tick(100);

        expect(lastCall2).toMatchObject({
            data: {
                attributes: {},
                id: '123456',
                relationships: {
                    author: {
                        data: {
                            id: '2',
                            type: 'authors'
                        }
                    }
                },
                type: 'books'
            },
            included: [
                {
                    id: '2',
                    attributes: { name: 'Luis' },
                    type: 'authors',
                    relationships: {}
                }
            ]
        });
    }));
    it('should save only dirty HAS MANY relationships', fakeAsync(() => {
        let author: Author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let book: Book = books_service.new();
        book.id = '1';
        book.attributes.title = 'some book';
        author.addRelationships([book], 'books');

        let author_clone: ClonedResource<Author> = new ClonedResource(author);
        // Inicializar relación si no existe en el clon
        if (!author_clone.relationships.books) {
            const rel = new DocumentCollection<Book>();
            rel.data = [...author.relationships.books.data];
            author_clone.relationships.books = rel;
        }
        test_response_subject.next(new HttpResponse({ body: author_clone.toObject() }));
        author_clone.attributes.name = 'Luis';

        let lastCall: any;
        author_clone.save().subscribe((author_data) => {
            lastCall = http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body;
        });

        tick(100);

        expect(lastCall).toMatchObject({
            data: {
                attributes: { name: 'Luis' },
                id: '123456',
                relationships: {},
                type: 'authors'
            }
        });

        let new_book: Book = books_service.new();
        new_book.id = '2';
        new_book.attributes.title = 'new book';

        if (!author_clone.relationships['books']) {
            author_clone.relationships['books'] = new DocumentCollection<Book>();
            author_clone.relationships['books'].data = [];
        }
        author_clone.addRelationships([new_book], 'books');

        let lastCallMany: any;
        author_clone.save({ include: ['books'] }).subscribe(() => {
            lastCallMany = http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body;
        });

        tick(100);

        expect(lastCallMany).toMatchObject({
            data: {
                attributes: { name: 'Luis' },
                id: '123456',
                relationships: {
                    books: {
                        data: [
                            { id: '1', type: 'books' },
                            { id: '2', type: 'books' }
                        ]
                    }
                },
                type: 'authors'
            },
            included: [
                {
                    id: '2',
                    attributes: { title: 'new book' },
                    type: 'books',
                    relationships: {}
                }
            ]
        });
    }));
});

describe('CloneResource properties changes', () => {
    let core: Core;
    let authors_service: AuthorsService;
    let photos_service: PhotosService;
    let books_service: BooksService;

    beforeAll(() => {
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
        authors_service = new AuthorsService();
        authors_service.register();

        photos_service = new PhotosService();
        photos_service.register();

        books_service = new BooksService();
        books_service.register();
    });

    it('Changing clone attributes', () => {
        let author: Author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';

        let author_clone: ClonedResource<Author> = new ClonedResource(author);
        author_clone.attributes.name = 'Luis';

        expect(author.attributes.name).toBe('Juan');
        expect(author.attributes.name).not.toBe(author_clone.attributes.name);
    });

    it('Changing clone HAS ONE relationships', () => {
        let book: Book = books_service.new();
        book.id = '123456';
        book.attributes.created_at = new Date();
        book.attributes.title = 'Así habló Zaratustra';
        let author: Author = authors_service.new();
        author.id = '1';
        author.attributes.name = 'José';
        book.addRelationship(author, 'author');

        let book_clone: ClonedResource<Book> = new ClonedResource(book);
        // Inicializar relación si no existe en el clon
        if (!book_clone.relationships.author) {
            const rel = new DocumentResource<Author>();
            rel.data = book.relationships.author.data;
            book_clone.relationships.author = rel;
        }
        let new_author: Author = authors_service.new();
        new_author.id = '2';
        new_author.attributes.name = 'Luis';
        book_clone.addRelationship(new_author, 'author');

        expect(book.relationships.author.data?.attributes.name).toBe('José');
        expect(book.relationships.author.data?.attributes.name).not.toBe(book_clone.relationships.author.data?.attributes.name);
    });

    it('Changing clone HAS MANY relationships', () => {
        let author: Author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let book: Book = books_service.new();
        book.id = '1';
        book.attributes.title = 'some book';
        author.addRelationships([book], 'books');

        let author_clone: ClonedResource<Author> = new ClonedResource(author);
        // Inicializar relación si no existe en el clon
        if (!author_clone.relationships.books) {
            const rel = new DocumentCollection<Book>();
            rel.data = [...author.relationships.books.data];
            author_clone.relationships.books = rel;
        }
        let new_book: Book = books_service.new();
        new_book.id = '2';
        new_book.attributes.title = 'new book';
        author_clone.addRelationships([new_book], 'books');

        expect(author.relationships.books.data.length).toBe(1);
        expect(author.relationships.books.data.length).not.toBe(author_clone.relationships.books.data.length);
    });
});
