import { AuthorsService } from './tests/factories/authors.service';
import { PhotosService } from './tests/factories/photos.service';
import { ClonedResource } from './cloned-resource';
import { BooksService } from './tests/factories/books.service';
import axios from 'axios';
import { JsonapiBootstrap } from './bootstraps/jsonapi-bootstrap';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ClonedResource save', () => {
    let authors_service: AuthorsService;
    let photos_service: PhotosService;
    let books_service: BooksService;

    beforeAll(async () => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'some-url/' } });
        authors_service = new AuthorsService();
        authors_service.register();

        photos_service = new PhotosService();
        photos_service.register();

        books_service = new BooksService();
        books_service.register();
    });

    it('should save only dirty attributes', done => {
        let author = authors_service.new();
        author.id = '123456';
        author.attributes.created_at = new Date();
        author.attributes.name = 'Juan';
        let author_clone = new ClonedResource(author);
        author_clone.attributes.name = 'Luis';
        mockedAxios.request.mockResolvedValue({ data: author_clone.toObject() });
        author_clone.save().subscribe(author_data => {
            expect(author_data).toEqual({
                data: {
                    attributes: { name: 'Luis' },
                    id: '123456',
                    relationships: {},
                    type: 'authors'
                }
            });
            done();
        });
    });

    it('should save only dirty HAS ONE relationships', done => {
        mockedAxios.request.mockRestore();
        let book = books_service.new();
        book.id = '123456';
        book.attributes.created_at = new Date();
        book.attributes.title = 'Así habló Zaratustra';
        let author = authors_service.new();
        author.id = '1';
        author.attributes.name = 'José';
        book.addRelationship(author, 'author');

        let book_clone = new ClonedResource(book);
        mockedAxios.request.mockResolvedValue({ data: book_clone.toObject() });
        let requestOne = {
            data: {
                data: {
                    attributes: {},
                    id: '123456',
                    relationships: {},
                    type: 'books'
                }
            },
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            method: 'PATCH',
            url: 'some-url/books/123456'
        };
        book_clone.save().subscribe(author_data => {
            expect(mockedAxios.request).toHaveBeenCalledWith(requestOne);
            let new_author = authors_service.new();
            new_author.id = '2';
            new_author.attributes.name = 'Luis';
            book_clone.addRelationship(new_author, 'author');

            let requestTwo = {
                data: {
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
                },
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
                method: 'PATCH',
                url: 'some-url/books/123456?include=author'
            };
            book_clone.save({ include: ['author'] }).subscribe(() => {
                expect(mockedAxios.request).toHaveBeenCalledWith(requestTwo);
                done();
            });
        });
    });

    it('should save only dirty HAS MANY relationships', done => {
        mockedAxios.request.mockRestore();
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
        author_clone.attributes.name = 'Luis';
        mockedAxios.request.mockResolvedValue({ data: author_clone.toObject() });

        let requestOne = {
            data: {
                data: {
                    attributes: { name: 'Luis' },
                    id: '123456',
                    relationships: {},
                    type: 'authors'
                }
            },
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            method: 'PATCH',
            url: 'some-url/authors/123456'
        };
        author_clone.save().subscribe(author_data => {
            expect(mockedAxios.request).toHaveBeenCalledWith(requestOne);
            let new_book = books_service.new();
            new_book.id = '2';
            new_book.attributes.title = 'new book';
            author_clone.addRelationships([new_book], 'books');

            let requestTwo = {
                data: {
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
                },
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
                method: 'PATCH',
                url: 'some-url/authors/123456?include=books'
            };
            author_clone.save({ include: ['books'] }).subscribe(() => {
                expect(mockedAxios.request).toHaveBeenCalledWith(requestTwo);
                done();
            });
        });
    });
});

describe('CloneResource properties changes', () => {
    let authors_service: AuthorsService;
    let photos_service: PhotosService;
    let books_service: BooksService;

    beforeAll(async () => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'some-url/' } });
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
