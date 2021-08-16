import { Book, BooksService } from './tests/factories/books.service';
import { AuthorsService } from './tests/factories/authors.service';
import { PhotosService } from './tests/factories/photos.service';
import { TestFactory } from './tests/factories/test-factory';
import axios from 'axios';
import { JsonapiBootstrap } from './bootstraps/jsonapi-bootstrap';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// @todo: find a way to reuse this test initialization... it's duplicated in other tests
describe('Resource delete', () => {
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;

    beforeEach(async () => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'http://yourdomain/api/v1/' } });
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCache();
        authorsService = new AuthorsService();
        authorsService.register();
        photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
    });

    it('should send a DELETE request', async () => {
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: { data: null } });
        let book = TestFactory.getBook('1');

        let request = {
            data: null,
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            method: 'DELETE',
            url: 'http://yourdomain/api/v1/books/1'
        };
        await book
            .delete()
            .toPromise()
            .then(data => {
                expect(mockedAxios.request).toHaveBeenCalledWith(request);
            });
    });
});

// @todo: find a way to reuse this test initialization... it's duplicated in other tests
describe('Resource save', () => {
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;

    beforeEach(async () => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'http://yourdomain/api/v1/' } });
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCache();
        authorsService = new AuthorsService();
        authorsService.register();
        photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
    });

    it('include_get should be included in the URL, but not in the request data', async () => {
        let resource = TestFactory.getBook('book_1', ['author']);
        let request = spyOn(axios, 'request').and.callThrough();
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });

        await resource.save({ include_get: ['author'] });
        expect(request.calls.mostRecent().args[0].url).toBe('http://yourdomain/api/v1/books/book_1?include=author');
    });

    it('include_get should be included in the request data, but not in the URL', async () => {
        let resource = TestFactory.getBook('book_1', ['author']);
        resource.relationships.author.data.id = 'author_1';
        let request = spyOn(axios, 'request').and.callThrough();
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });

        await resource.save({ include_save: ['author'] });
        expect(request.calls.mostRecent().args[0].url).toBe('http://yourdomain/api/v1/books/book_1');
        expect(request.calls.mostRecent().args[0].data.included).toBeTruthy();
        expect(request.calls.mostRecent().args[0].data.included.length).toBe(1);
        expect(request.calls.mostRecent().args[0].data.included[0].id).toBe('author_1');
    });
    it('should use POST if is_new is truthy', async () => {
        let resource = TestFactory.getBook('book_1');
        resource.is_new = true;
        let request = spyOn(axios, 'request').and.callThrough();
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });

        await resource.save();
        expect(request.calls.mostRecent().args[0].method).toBe('POST');
    });

    it('should use PATCH if is_new is falsy', async () => {
        let resource = TestFactory.getBook('book_1');
        resource.is_new = false;
        let request = spyOn(axios, 'request').and.callThrough();
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });

        await resource.save();
        expect(request.calls.mostRecent().args[0].method).toBe('PATCH');
    });
});
