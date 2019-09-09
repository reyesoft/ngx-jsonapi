import { Resource } from './resource';
import { Service } from './service';
import { Converter } from './services/converter';
import { Core } from './core';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { JsonapiConfig } from './jsonapi-config';
import { BehaviorSubject, Observable } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

class MockResource extends Resource {
    public attributes = {
        name: '',
        description: ''
    };
    public type = 'resource';
}

class MockResourcesService extends Service<MockResource> {
    public type = 'resource';
    public resource = MockResource;
}

describe('service methods', () => {
    let core;
    let service;

    beforeEach(() => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        service = new MockResourcesService();
        service.register();
    });

    it('a new resource has a type', () => {
        spyOn(Converter, 'getService').and.returnValue(service);

        const resource = service.new();
        expect(resource instanceof MockResource).toBeTruthy();
        expect(resource.type).toEqual('resource');
    });

    it('a new resource with id has a type', () => {
        spyOn(Converter, 'getService').and.returnValue(service);

        const resource = service.createResource('31');
        expect(resource instanceof MockResource).toBeTruthy();
        expect(resource.id).toEqual('31');
        expect(resource.type).toEqual('resource');
    });
});
