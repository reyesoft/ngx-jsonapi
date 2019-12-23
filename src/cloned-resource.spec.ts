import { JsonRipper } from './services/json-ripper';
import { IDataResource } from './interfaces/data-resource';
import { CacheMemory } from './services/cachememory';
import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthorsService } from './tests/factories/authors.service';
import { PhotosService } from './tests/factories/photos.service';
import { ClonedResource } from './cloned-resource';
import { async } from '@angular/core/testing';
import { BooksService } from './tests/factories/books.service';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
let test_response_subject = new BehaviorSubject(new HttpResponse());

describe('ClonedResource save', () => {
    let core: Core;
    let authors_service: AuthorsService;
    let photos_service: PhotosService;
    let books_service: BooksService;

    beforeAll(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        authors_service = new AuthorsService();
        authors_service.register();

        photos_service = new PhotosService();
        photos_service.register();

        books_service = new BooksService();
        books_service.register();
    });

    it('should save only dirty attributes', async(() => {
        let http_client_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let author_clone = new ClonedResource(author);
        test_response_subject.next(new HttpResponse({ body: author_clone.toObject() }));
        author_clone.attributes.name = 'Luis';
        author_clone.save().subscribe(author_data => {
            expect(http_client_spy.calls.mostRecent().args[2].body).toMatchObject({
                data: {
                    attributes: { name: 'Luis' },
                    id: '123456',
                    relationships: {},
                    type: 'authors'
                }
            });
        });
    }));

    it('should save only dirty HAS ONE relationships', async(() => {
        let http_client_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let book = books_service.new();
        book.id = '123456';
        book.attributes.created_at = new Date();
        book.attributes.title = 'Así habló Zaratustra';
        let author = authors_service.new();
        author.id = '1';
        author.attributes.name = 'José';
        book.addRelationship(author, 'author');

        let book_clone = new ClonedResource(book);
        test_response_subject.next(new HttpResponse({ body: book_clone.toObject() }));
        book_clone.save().subscribe(author_data => {
            expect(http_client_spy.calls.mostRecent().args[2].body).toMatchObject({
                data: {
                    attributes: {},
                    id: '123456',
                    relationships: {},
                    type: 'books'
                }
            });
            let new_author = authors_service.new();
            new_author.id = '2';
            new_author.attributes.name = 'Luis';
            book_clone.addRelationship(new_author, 'author');
            book_clone.save({ include: ['author'] }).subscribe(() => {
                expect(http_client_spy.calls.mostRecent().args[2].body).toMatchObject({
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

    it('should save only dirty HAS MANY relationships', async(() => {
        let http_client_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let book = books_service.new();
        book.id = '1';
        book.attributes.title = 'some book';
        author.addRelationships([book], 'books');

        let author_clone = new ClonedResource(author);
        // console.log(author_clone.relationships);
        test_response_subject.next(new HttpResponse({ body: author_clone.toObject() }));
        author_clone.attributes.name = 'Luis';
        author_clone.save().subscribe(author_data => {
            expect(http_client_spy.calls.mostRecent().args[2].body).toMatchObject({
                data: {
                    attributes: { name: 'Luis' },
                    id: '123456',
                    relationships: {},
                    type: 'authors'
                }
            });

            let new_book = books_service.new();
            new_book.id = '2';
            new_book.attributes.title = 'new book';
            author_clone.addRelationships([new_book], 'books');
            author_clone.save({ include: ['books'] }).subscribe(() => {
                expect(http_client_spy.calls.mostRecent().args[2].body).toMatchObject({
                    data: {
                        attributes: { name: 'Luis' },
                        id: '123456',
                        relationships: {
                            books: {
                                data: [{ id: '1', type: 'books' }, { id: '2', type: 'books' }]
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

    beforeAll(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        authors_service = new AuthorsService();
        authors_service.register();

        photos_service = new PhotosService();
        photos_service.register();

        books_service = new BooksService();
        books_service.register();
    });

    it('Changing clone attributes', () => {
        let author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';

        let author_clone = new ClonedResource(author);
        author_clone.attributes.name = 'Luis';

        expect(author.attributes.name).toBe('Juan');
        expect(author.attributes.name).not.toBe(author_clone.attributes.name);
    });

    it('Changing clone HAS ONE relationships', () => {
        let book = books_service.new();
        book.id = '123456';
        book.attributes.created_at = new Date();
        book.attributes.title = 'Así habló Zaratustra';
        let author = authors_service.new();
        author.id = '1';
        author.attributes.name = 'José';
        book.addRelationship(author, 'author');

        let book_clone = new ClonedResource(book);
        let new_author = authors_service.new();
        new_author.id = '2';
        new_author.attributes.name = 'Luis';
        book_clone.addRelationship(new_author, 'author');

        expect(book.relationships.author.data.attributes.name).toBe('José');
        expect(book.relationships.author.data.attributes.name).not.toBe(book_clone.relationships.author.data.attributes.name);
    });

    it('Changing clone HAS MANY relationships', () => {
        let author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let book = books_service.new();
        book.id = '1';
        book.attributes.title = 'some book';
        author.addRelationships([book], 'books');

        let author_clone = new ClonedResource(author);
        let new_book = books_service.new();
        new_book.id = '2';
        new_book.attributes.title = 'new book';
        author_clone.addRelationships([new_book], 'books');

        expect(author.relationships.books.data.length).toBe(1);
        expect(author.relationships.books.data.length).not.toBe(author_clone.relationships.books.data.length);
    });
});
