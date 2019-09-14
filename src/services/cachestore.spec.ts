import { CacheStore } from './cachestore';
import { Core } from '../core';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonapiConfig } from '../jsonapi-config';
import { Http as JsonapiHttpImported } from '../sources/http.service';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

export class StoreService {
    public constructor() {
        /**/
    }
    public getDataResources(something) {
        return;
    }

    public removeObjectsWithKey(some_key) {
        return;
    }

    public deprecateObjectsWithKey(some_key) {
        return;
    }
}

describe('Cachestore test', () => {
    let cachestore: CacheStore;
    beforeEach(() => {
        (Core.injectedServices as any) = {
            JsonapiStoreService: new StoreService(),
            JsonapiHttp: new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
            rsJsonapiConfig: new JsonapiConfig()
        };

        cachestore = new CacheStore();
    });
    it('removeResource should call cache store removeObjectsWithKey method with the correct formatted string', async () => {
        let removeObjectsWithKey_spy = spyOn(Core.injectedServices.JsonapiStoreService, 'removeObjectsWithKey');

        cachestore.removeResource('1', 'resources');

        expect(removeObjectsWithKey_spy).toHaveBeenCalledWith('jsonapi.resources.1');
    });

    /*
    it('deprecateCollections should call JsonapiStoreService deprecateObjectsWithKey with the corresponding string', () => {
        let deprecateObjectsWithKey_spy = spyOn(Core.injectedServices.JsonapiStoreService, 'deprecateCollections');
        cachestore.deprecateCollections('some_string');
        expect(deprecateObjectsWithKey_spy).toHaveBeenCalledWith('some_string');
    });
    */
});
