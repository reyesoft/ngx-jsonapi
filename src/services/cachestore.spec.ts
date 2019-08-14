import { CacheStore } from './cachestore';
import { Core } from '../core';
import { Converter } from '../services/converter';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';
import { IDataCollection } from '../interfaces/data-collection';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonapiConfig } from '../jsonapi-config';
import { Http as JsonapiHttpImported } from '../sources/http.service';
// import { StoreService } from '../sources/store.service';

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
}

describe('Cachestore test', () => {
    it('removeResource should call cache store removeObjectsWithKey method with the correct formatted string', async () => {
        (Core.injectedServices as any) = {
            JsonapiStoreService: new StoreService(),
            JsonapiHttp: new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
            rsJsonapiConfig: new JsonapiConfig()
        };

        let cachestore = new CacheStore();
        let removeObjectsWithKey_spy = spyOn(Core.injectedServices.JsonapiStoreService, 'removeObjectsWithKey');

        cachestore.removeResource('1', 'resources');

        expect(removeObjectsWithKey_spy).toHaveBeenCalledWith('jsonapi.resources.1');
    });
});
