import { StoreService } from '../sources/store.service';
import { JsonRipper } from '../services/json-ripper';
import { ReflectiveInjector } from '@angular/core';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from '../core';
import { Converter } from './converter';
import { JsonapiConfig } from '../jsonapi-config';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

let injector = ReflectiveInjector.resolveAndCreate([
    {
        provide: JSONAPI_RIPPER_SERVICE,
        useClass: JsonRipper
    },
    {
        provide: JSONAPI_STORE_SERVICE,
        useClass: StoreService
    }
]);

let core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);

describe('Converter', () => {
    it('json_array2resources_array_by_type(array) should be converted to IResourcesByType', () => {
        let converted = Converter.json_array2resources_array_by_type([
            {
                id: 'AR',
                type: 'sometype'
            }
        ]);

        expect(converted.sometype.AR.id).toBe('AR');
        expect(converted.sometype.AR.type).toBe('sometype');
    });

    it('procreate() dont remove relationship properties when is not present or empty on data', () => {
        // @todo
    });
});
