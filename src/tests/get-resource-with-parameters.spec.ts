// WARNING: this test is not isolated

import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { DocumentCollection } from '../document-collection';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { JsonapiConfig } from '../jsonapi-config';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Core } from '../core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { Service } from '../service';

class TestResource extends Resource {
    public type = 'test_resources';
    public id = '';
    public attributes: { name?: string; optional?: string } = { name: '' };
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
    public ttl = 10000;
}

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let splitted_request_url = req.urlWithParams.split('?');
        let splitted_params: Array<string> = [];
        if (splitted_request_url.length > 1) {
            let params = splitted_request_url[1];
            splitted_params = params.split('&');
        }

        if (splitted_params.indexOf('fields[test_resources]=optional') > -1) {
            let test_response_subject = new BehaviorSubject(new HttpResponse());
            let optional_attributes_only_resource = new TestResource();
            optional_attributes_only_resource.id = '1';
            optional_attributes_only_resource.attributes = { optional: 'optional attribute value' };
            test_response_subject.next(new HttpResponse({ body: { data: optional_attributes_only_resource } }));

            return test_response_subject.asObservable();
        } else {
            let test_response_subject = new BehaviorSubject(new HttpResponse());
            let test_resource = new TestResource();
            test_resource.type = 'test_resources';
            test_resource.id = '1';
            test_resource.attributes = { name: 'test_name' };
            test_response_subject.next(new HttpResponse({ body: { data: test_resource } }));

            return test_response_subject.asObservable();
        }
    }
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
    it(`service's get method should return a stream with the requested resource including the requested attributes (fields)`, async () => {
        let test_service = new TestService();
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();

        await test_service
            .get('1', { fields: { test_resources: ['optional'] } })
            .toPromise()
            .then(resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.name).toBeFalsy();
                expect(resource.attributes.optional).toBe('optional attribute value');

                let request = {
                    body: null,
                    headers: expect.any(Object)
                };
                expect(http_request_spy).toHaveBeenCalledWith(
                    'get',
                    'http://yourdomain/api/v1/test_resources/1?fields[test_resources]=optional',
                    request
                );
            });
    });

    it(`when requesting a resource with optional attributes, the incoming attributes should be merged with cached ones`, async () => {
        // TODO: fix library error: clearCache and clearCacheMemory are not droping localForage allstore instance correctly while testing
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        Core.injectedServices.JsonapiStoreService.clearCache();
        let test_service = new TestService();
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();

        await test_service
            .get('1')
            .toPromise()
            .then(async resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.name).toBe('test_name');
                // @todo why? memory will not remove attributes if are not sent by server
                // for example two different requests with different list of fields (one request remove attributes of the another resource)
                // expect(resource.attributes.optional).toBeFalsy();

                let request = {
                    body: null,
                    headers: expect.any(Object)
                };
                expect(http_request_spy).toHaveBeenCalledWith('get', 'http://yourdomain/api/v1/test_resources/1', request);
                await test_service
                    .get('1', { fields: { test_resources: ['optional'] } })
                    .toPromise()
                    .then(resource_with_optional_attribute => {
                        expect(resource_with_optional_attribute.type).toBe('test_resources');
                        expect(resource_with_optional_attribute.id).toBe('1');
                        expect(resource_with_optional_attribute.attributes.name).toBe('test_name');
                        expect(resource_with_optional_attribute.attributes.optional).toBe('optional attribute value');

                        expect(http_request_spy).toHaveBeenCalledWith(
                            'get',
                            'http://yourdomain/api/v1/test_resources/1?fields[test_resources]=optional',
                            request
                        );
                    });
            });
    });
});
