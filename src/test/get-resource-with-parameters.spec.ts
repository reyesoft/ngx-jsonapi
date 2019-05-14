// WARNING: this test is not isolated

import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { DocumentCollection } from 'src/document-collection';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { JsonapiConfig } from '../jsonapi-config';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Core } from '../core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Service } from '../service';

let test_response_subject = new BehaviorSubject(new HttpResponse());

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        console.log('REQUEST --------------->', req);

        return test_response_subject.asObservable();
    }
}

class TestResource extends Resource {
    public type = 'test_resources';
    public id = '';
    public attributes = { name: '' };
    public relationships = {
        test_resource: new DocumentResource<TestResource>(),
        test_resources: new DocumentCollection<TestResource>()
    };
}

class TestService extends Service {
    public constructor() {
        super();
        this.register();
    }
    public type = 'test_resources';
    public resource = TestResource;
    public ttl = 0;
}

describe('core methods', () => {
    let core: Core;
    it('should create core service instance', () => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        expect(core).toBeTruthy();
    });
    // it('registered services should be stored in resourceServices object with their type as key', () => {
    //     let test_service = new TestService();
    //     expect(test_service).toBeDefined();
    //     expect((core as any).resourceServices.test_resources).toBeTruthy();
    // });
    // it('getResourceService should return the instantiated service from resourceServices related to the type passed as arument', async () => {
    //     let test_service = new TestService();
    //     let test_service_instance = core.getResourceService('test_resources');
    //     expect(test_service_instance).toBeTruthy();
    //     expect(test_service_instance.type).toBe('test_resources');
    //     expect(test_service_instance).toEqual(test_service);
    // });
    it(`service's get method should get the requested resource from the back end if it's not cached or the TTL has ended`, async () => {
        let test_resource = new TestResource();
        test_resource.type = 'test_resources';
        test_resource.id = '1';
        test_resource.attributes = { name: 'test_name' };
        let test_service = new TestService();
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: { data: test_resource } }));

        await test_service
            .get('1', { fields: { test_resources: ['optional'] }})
            .toPromise()
            .then(resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.name).toBe('test_name');

                let headers = new HttpHeaders({
                    'Content-Type': 'application/vnd.api+json',
                    Accept: 'application/vnd.api+json'
                });
                let request = {
                    body: null,
                    headers: expect.any(Object)
                };
                expect(http_request_spy).toHaveBeenCalledWith('get', 'http://yourdomain/api/v1/test_resources/1', request);
            });
    });
});
