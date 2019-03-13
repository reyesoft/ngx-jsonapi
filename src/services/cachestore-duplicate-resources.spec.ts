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
}

describe('Cachestore non-duplicate-resources test', () => {
    it('fillCollectionWithArrrayAndResourcesOnStore method should not duplicate resources in the requested collection', async () => {
        // spyOn(StoreService.prototype, 'constructor');
        (Core.injectedServices as any) = {
            JsonapiStoreService: new StoreService(),
            JsonapiHttp: new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
            rsJsonapiConfig: new JsonapiConfig()
        };

        let cachestore = new CacheStore();

        let data_collection: IDataCollection = {
            data: [
                {
                    type: 'type',
                    id: 'id',
                    attributes: {
                        status: true,
                        value: true
                    },
                    relationships: {}
                }
            ]
        };

        let resource = new Resource();
        resource.id = 'id';
        resource.type = 'type';
        resource.attributes = {
            status: true,
            value: true
        };
        resource.relationships = {};

        let collection: DocumentCollection = new DocumentCollection();
        collection.data = [resource];

        spyOn(Converter, 'getService').and.returnValue({
            cachememory: {
                getOrCreateResource: (some_string, some_id): Resource => {
                    return resource;
                }
            }
        });
        spyOn(StoreService.prototype, 'getDataResources').and.returnValue(Promise.resolve([]));

        await (cachestore as any).fillCollectionWithArrrayAndResourcesOnStore(data_collection, [], collection);

        expect(collection.data.length).toBe(1);
    });
});
