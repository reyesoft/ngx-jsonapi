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
import { waitForAsync } from '@angular/core/testing';
import { Book, BooksService } from './tests/factories/books.service';
import { JsonapiConfig } from './jsonapi-config';
import { DocumentResource } from './document-resource';
import { DocumentCollection } from './document-collection';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
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

    beforeAll(() => {
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
        authors_service = new AuthorsService();
        authors_service.register();

        photos_service = new PhotosService();
        photos_service.register();

        books_service = new BooksService();
        books_service.register();
    });

    it('should save only dirty attributes', waitForAsync(() => {
        let http_client_spy: jest.SpyInstance = jest.spyOn(HttpClient.prototype, 'request');
        let author: Author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let author_clone: ClonedResource<Author> = new ClonedResource(author);
        test_response_subject.next(new HttpResponse({ body: author_clone.toObject() }));
        author_clone.attributes.name = 'Luis';
        author_clone.save().subscribe((author_data) => {
            (expect(http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body) as any).toMatchObject({
                data: {
                    attributes: { name: 'Luis' },
                    id: '123456',
                    relationships: {},
                    type: 'authors'
                }
            });
        });
    }));

    it('should save only dirty HAS ONE relationships', waitForAsync(() => {
        let http_client_spy: jest.SpyInstance = jest.spyOn(HttpClient.prototype, 'request');
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
        book_clone.save().subscribe((author_data) => {
            (expect(http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body) as any).toMatchObject({
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
            // Inicializar relación HAS ONE si no existe
            if (!book_clone.relationships['author']) {
                book_clone.relationships['author'] = new DocumentResource<Author>();
                book_clone.relationships['author'].data = null;
            }
            book_clone.addRelationship(new_author, 'author');
            book_clone.save({ include: ['author'] }).subscribe(() => {
                (expect(http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body) as any).toMatchObject({
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
            });
        });
    }));

    it('should save only dirty HAS MANY relationships', waitForAsync(() => {
        let http_client_spy: jest.SpyInstance = jest.spyOn(HttpClient.prototype, 'request');
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
        author_clone.save().subscribe((author_data) => {
            (expect(http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body) as any).toMatchObject({
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
            // Inicializar relación HAS MANY si no existe
            if (!author_clone.relationships['books']) {
                author_clone.relationships['books'] = new DocumentCollection<Book>();
                author_clone.relationships['books'].data = [];
            }
            author_clone.addRelationships([new_book], 'books');
            author_clone.save({ include: ['books'] }).subscribe(() => {
                (expect(http_client_spy.mock.calls[http_client_spy.mock.calls.length - 1][2].body) as any).toMatchObject({
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
            });
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
