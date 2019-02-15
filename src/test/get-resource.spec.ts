// WARNING: this test is not correctly isolated

import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { JsonapiConfig } from '../jsonapi-config';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Core } from '../core';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, skipWhile } from 'rxjs/operators';
import { Service } from '../service';

let test_response_subject = new BehaviorSubject(new HttpResponse());

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return test_response_subject.asObservable();
    }
}

class TestResource extends Resource {
    public type = 'test_resources';
    public id = '';
    public attributes = { name: '' };
    public relationships = { test_resources: new DocumentResource<TestResource>() };
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
    it('registered services should be stored in resourceServices object with their type as key', () => {
        let test_service = new TestService();
        expect((core as any).resourceServices.test_resources).toBeTruthy();
    });
    it('getResourceService should be return the instantiated service from resourceServices related to the type passed as arument', async () => {
        let test_service = new TestService();
        let test_service_instance = core.getResourceService('test_resources');
        expect(test_service_instance).toBeTruthy();
        expect(test_service_instance.type).toBe('test_resources');
        expect(test_service_instance).toEqual(test_service);
    });
    it('should create core service instance', () => {
        let test_resource = new TestResource();
        test_resource.type = 'test_resources';
        test_resource.id = '1';
        test_resource.attributes = { name: 'test_name' };
        let test_service = new TestService();

        console.log(test_resource);
        spyOn(HttpClient.prototype, 'get').and.returnValue(test_resource);
        test_response_subject.next(new HttpResponse({ body: test_resource }));
        test_response_subject.complete();
        test_service.get('1')
            // .toPromise()
            // .then(
            //     (success) => { console.log(success); }
            .pipe(
                skipWhile(resource => resource.attributes.name === undefined)
            )
            .subscribe(
                resource => {
                    console.log('resource --->', resource);
                    test_response_subject.complete();
                    // expect(resource.type).toBe('test_resources');
                    // expect(resource.id).toBe('1');
                },
                error => {
                    console.log('ERROR!');
                },
                () => {
                    console.log('observable is complete', this);
                }
            );
    });
});
