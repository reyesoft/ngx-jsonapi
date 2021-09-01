import { JsonRipper } from './services/json-ripper';
import { ReflectiveInjector } from '@angular/core';
import { StoreService } from './sources/store.service';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { DocumentResource } from './document-resource';
import { Resource } from './resource';
import { Page } from './services/page';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { Book, BooksService } from './tests/factories/books.service';
import { delay, map, toArray, tap } from 'rxjs/operators';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

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

describe('resource basic methods', () => {
    let core: Core;
    let service: AuthorsService;
    beforeAll(() => {
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
        service = new AuthorsService();
    });

    it('a new resource has a type', () => {
        const resource: Author = service.new();
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.type).toEqual('authors');
    });

    it('a new resource with id has a type', () => {
        const resource: Author = service.createResource('31');
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.id).toEqual('31');
        expect(resource.type).toEqual('authors');
    });
});

let test_response_subject: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse());
class DynamicHttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable().pipe(delay(0));
    }
}
describe('document resource general', () => {
    let document_resource: DocumentResource = new DocumentResource();
    it('should be created', () => {
        expect(document_resource.builded).toBe(false);
        expect(document_resource.content).toBe('id');
    });
    it('data property should have a new resource instance', () => {
        let resource: Resource = new Resource();
        expect(document_resource.data).toEqual(resource);
    });
});

describe('document resource fill() method', () => {
    let document_resource: DocumentResource = new DocumentResource<Book>();
    let booksService: BooksService;
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
        let Resource_fill_spy: jasmine.Spy = spyOn(<Resource>document_resource.data, 'fill');
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
