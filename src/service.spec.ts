import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestFactory } from './tests/factories/test-factory';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { delay, map, toArray, tap } from 'rxjs/operators';

// #### marbles dont work with promises, issue opened on marbles, becouse work with a fake timing frames

// #### EXTENDING EXPECT FOR EXPECTED SUBSCRIPTION DATA EMITS
// #### dont work because is not possible return same error with toMatchObject, issue opened on jest
// declare global {
//     namespace jest {
//         // tslint:disable-next-line:interface-name
//         interface Matchers<R> {
//             toMatchEmit(validator: any): R;
//         }
//     }
// }
// expect.extend({
//     toMatchEmit(received: Object, validator) {
//         if (validator === undefined) {
//             return {
//                 message: (): string => `We receive an extra emmit: ${received.toString() }`,
//                 pass: false
//             };
//         }
//         expect(received).toMatchObject(validator);
//         return {
//             message: (): string => `WTF :/`,
//             pass: true
//         };
//     }
// });

// @todo disable PhotoService

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

describe('service.all()', () => {
    let core: Core;
    let authorsService: AuthorsService;
    beforeEach(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new DynamicHttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.register();
        await authorsService.clearCacheMemory();
    });

    it(`without cached collection emits source ^new-server|`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        let expected = [
            // expected emits
            { builded: false, loaded: false, source: 'new' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let emmits = await authorsService
            .all()
            .pipe(
                tap(emmit => {
                    if (emmit.data.length > 0) {
                        expect(emmit.data[0].relationships).toHaveProperty('photos');
                        expect(emmit.data[0].relationships).toHaveProperty('books');
                    }
                }),
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`with cached on memory (live) collection emits source ^memory|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));
        authorsService.collections_ttl = 5; // live
        await authorsService.all().toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: true, source: 'memory' }
        ];

        let emmits = await authorsService
            .all()
            .pipe(
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on memory (dead) collection emits source ^memory-server|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));
        authorsService.collections_ttl = 0; // dead
        await authorsService.all().toPromise();

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: false, source: 'memory' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let emmits = await authorsService
            .all()
            .pipe(
                tap(emmit => {
                    if (emmit.data.length > 0) {
                        expect(emmit.data[0].relationships).toHaveProperty('photos');
                        expect(emmit.data[0].relationships).toHaveProperty('books');
                    }
                }),
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });

    it(`with cached on store (live) collection emits source ^new-store|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));
        authorsService.collections_ttl = 5; // live
        await authorsService.all().toPromise();
        authorsService.cachememory.deprecateCollections(''); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: false, source: 'new' },
            { builded: true, loaded: true, source: 'store' }
        ];

        let emmits = await authorsService
            .all()
            .pipe(
                tap(emmit => {
                    if (emmit.data.length > 0) {
                        expect(emmit.data[0].relationships).toHaveProperty('photos');
                        expect(emmit.data[0].relationships).toHaveProperty('books');
                    }
                }),
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(0);
    });

    it(`with cached on store (dead) collection emits source ^store-server|`, async () => {
        // caching collection
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));
        authorsService.collections_ttl = 0; // dead
        await authorsService.all().toPromise();
        authorsService.clearCacheMemory(); // kill only memory cache

        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        let expected = [
            // expected emits
            { builded: true, loaded: false, source: 'new' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let emmits = await authorsService
            .all()
            .pipe(
                map(emmit => {
                    return { builded: emmit.builded, loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject(expected);
        expect(http_request_spy).toHaveBeenCalledTimes(1);
    });
});
describe('service.all() and next service.get()', () => {
    let core: Core;
    let authorsService: AuthorsService;
    beforeEach(async () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new DynamicHttpHandlerMock()), new JsonapiConfig())
        );
        authorsService = new AuthorsService();
        authorsService.register();
        await authorsService.clearCacheMemory();
    });

    it(`without cached collection and next request get() with include`, async () => {
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: TestFactory.getCollectionDocumentData(Author) }));

        let expected = [
            // expected emits
            { builded: false, loaded: false, source: 'new' },
            { builded: true, loaded: true, source: 'server' }
        ];

        let authors = await authorsService.all({ include: ['photos', 'books'] }).toPromise();

        // authorsService.get(authors.data[0].id);

        // @todo
    });
});
