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

// @deprecated ?
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

describe('Cachestore filler', () => {
    it('fillCollectionWithArrrayAndResourcesOnStore should fill resources data on collection', async () => {
        // spyOn(StoreService.prototype, 'constructor');
        (Core.injectedServices as any) = {
            JsonapiStoreService: new StoreService(),
            JsonapiHttp: new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
            rsJsonapiConfig: new JsonapiConfig()
        };

        let data_collection: IDataCollection = {
            data: [
                {
                    id: '1',
                    type: 'authors',
                    attributes: {
                        name: 'Ugly name'
                    },
                    relationships: {}
                }
            ]
        };
        let resource = new Resource();
        resource.id = '1';
        resource.type = 'authors';
        resource.attributes = {
            name: 'Cool name'
        };

        let collection = new DocumentCollection();
        collection.data = [resource];

        spyOn(Converter, 'getService').and.returnValue({
            cachememory: {
                getOrCreateResource: (some_string, some_id): Resource => {
                    return resource;
                }
            }
        });
        spyOn(StoreService.prototype, 'getDataResources').and.returnValue(
            Promise.resolve({
                '1': { id: '1', type: 'authors' }
            })
        );

        // await (cachestore as any).fillCollectionWithArrrayAndResourcesOnStore(data_collection, [], collection);

        expect(collection.data.length).toBe(1);
        expect(collection.data[0].attributes.name).toBe('Cool name');
    });
});
