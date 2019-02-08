import { Converter } from './converter';
import { Core } from '../core';
import { IDataResource } from '../interfaces/data-resource';
import { IResourcesByType } from 'ngx-jsonapi';

import { JsonapiConfig } from 'src/jsonapi-config';
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

let core = new Core(
    new JsonapiConfig(),
    new JsonapiStore(),
    new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
);

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
});
