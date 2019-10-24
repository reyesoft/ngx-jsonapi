import { DocumentResource } from './document-resource';
import { Resource } from './resource';
import { Page } from './services/page';
import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { Book, BooksService } from './tests/factories/books.service';
import { delay, map, toArray, tap } from 'rxjs/operators';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

describe('service basic methods', () => {
    let core = new Core(
        new JsonapiConfig(),
        new JsonapiStore(),
        new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
    );
    let service = new AuthorsService();
    service.register();

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
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
describe('document resource general', () => {
    let document_resource = new DocumentResource();
    it('should be created', () => {
        expect(document_resource.builded).toBe(false);
        expect(document_resource.content).toBe('id');
    });
    it('data property should have a new resource instance', () => {
        let resource = new Resource();
        expect(document_resource.data).toEqual(resource);
    });
});

describe('document resource fill() method', async () => {
    let document_resource = new DocumentResource<Book>();
    let booksService = new BooksService();
    beforeEach(async () => {
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCache();
    });

    it('fill() with only ids generate content=id and empty relationships', () => {
        document_resource.fill({
            data: {
                type: 'data',
                id: 'id'
            },
            meta: { meta: 'meta' }
        });
        expect((<Resource>document_resource.data).relationships).toMatchObject({});
        expect(document_resource.builded).toBeFalsy();
        expect(document_resource.content).toBe('id');
        expect(document_resource.meta).toEqual({ meta: 'meta' });
    });

    it('fill() with only ids generate content=id and empty relationships, and we call fill() again with complete data', () => {
        document_resource = new DocumentResource<Book>();
        document_resource.unsetData();

        // fill with more data
        document_resource.fill({
            data: {
                type: 'books',
                id: '4',
                attributes: {
                    name: 'Ray'
                },
                relationships: {
                    author: {
                        data: null
                    },
                    books: {
                        data: []
                    }
                }
            }
        });
        // expect(document_resource.builded).toBeTruthy();
        // expect(document_resource.content).toBe('resource');
        // expect('xxxxxx').toBe('uuuuuuuuuuuuuuuuuuuuuuuuuu');
    });

    it('if passed IDocumentResource has no meta property, fill mehotd should should assign an empty Object', () => {
        delete document_resource.meta;
        let Resource_fill_spy = spyOn(<Resource>document_resource.data, 'fill');
        document_resource.fill({
            data: {
                type: 'data',
                id: 'id'
            }
        });
        expect(Resource_fill_spy).toHaveBeenCalled();
        expect(document_resource.meta).toEqual({});
    });
});
