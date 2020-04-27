// WARNING: this test is not isolated

import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { DocumentCollection } from '../document-collection';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { JsonapiConfig } from '../jsonapi-config';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Core } from '../core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Service } from '../service';
import { map, toArray, tap } from 'rxjs/operators';

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
    public relationships = {
        test_resource: new DocumentResource<TestResource>(),
        test_resources: new DocumentCollection<TestResource>()
    };
    public ttl = 0;
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
    beforeEach(() => {
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        expect(core).toBeTruthy();
    });
    it('registered services should be stored in resourceServices object with their type as key', () => {
        let test_service = new TestService();
        expect(test_service).toBeDefined();
        expect((core as any).resourceServices.test_resources).toBeTruthy();
    });
    it('getResourceService should return the instantiated service from resourceServices related to the type passed as arument', async () => {
        let test_service = new TestService();
        let test_service_instance = core.getResourceServiceOrFail('test_resources');
        expect(test_service_instance).toBeTruthy();
        expect(test_service_instance.type).toBe('test_resources');
        expect(test_service_instance).toEqual(test_service);
    });
    it(`service's get method should get the requested resource from the back end if it's not cached or the TTL has ended`, async () => {
        let test_resource = new TestResource();
        test_resource.type = 'test_resources';
        test_resource.id = '1';
        test_resource.attributes = { name: 'test_name' };
        let test_service = new TestService();
        let http_request_spy = spyOn(HttpClient.prototype, 'request').and.callThrough();
        test_response_subject.next(new HttpResponse({ body: test_resource.toObject() }));

        let resource: Resource;
        let emmits = await test_service
            .get('1')
            .pipe(
                tap(emmit => {
                    resource = emmit;
                }),
                map(emmit => {
                    return { loaded: emmit.loaded, source: emmit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emmits).toMatchObject([
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: true, source: 'server' }
        ]);
        expect(resource.type).toBe('test_resources');
        expect(resource.id).toBe('1');
        expect(resource.attributes.name).toBe('test_name');
        expect(http_request_spy).toHaveBeenCalledTimes(1);
        expect(http_request_spy).toHaveBeenCalledWith('get', 'http://yourdomain/api/v1/test_resources/1', {
            body: null,
            headers: expect.any(Object)
        });
    });

    it(`resource should have the correct hasOne and hasMany relationships corresponding to the back end response's included resources,
        including nested relationships`, async () => {
        let test_resource = new TestResource();
        test_resource.type = 'test_resources';
        test_resource.id = '1';
        test_resource.attributes = { name: 'test_name' };
        test_resource.relationships.test_resource.data = { id: '2', type: 'test_resources' };
        test_resource.relationships.test_resources.data = [
            { id: '3', type: 'test_resources' },
            { id: '4', type: 'test_resources' }
        ];

        // nested relationship
        let test_resource_nested_relationship = new TestResource();
        test_resource_nested_relationship.type = 'test_resources';
        test_resource_nested_relationship.id = '4';
        test_resource_nested_relationship.attributes = { name: 'test_name_4' };

        // format has_one relationship to include
        let test_resource_has_one_relationship = new TestResource();
        test_resource_has_one_relationship.type = 'test_resources';
        test_resource_has_one_relationship.id = '2';
        test_resource_has_one_relationship.attributes = { name: 'test_name_2' };
        test_resource_has_one_relationship.relationships.test_resource.data = { id: '4', type: 'test_resources' };

        // format has_many relationship to include
        let test_resource_has_many_relationship_1 = new TestResource();
        test_resource_has_many_relationship_1.type = 'test_resources';
        test_resource_has_many_relationship_1.id = '3';
        test_resource_has_many_relationship_1.attributes = { name: 'test_name_3' };
        test_resource_has_many_relationship_1.relationships.test_resources.data.push({ id: '4', type: 'test_resources' });

        let included = [test_resource_has_one_relationship, test_resource_has_many_relationship_1, test_resource_nested_relationship];

        let test_service = new TestService();
        await test_service.clearCache();
        Core.injectedServices.JsonapiStoreService.clearCache();
        test_response_subject.next(new HttpResponse({ body: { data: test_resource, included: included } }));

        await test_service
            .get('1', { include: ['test_resource.test_resource'] })
            .toPromise()
            .then(resource => {
                expect(test_resource.type).toBe('test_resources');
                expect(test_resource.id).toBe('1');
                expect(resource.attributes.name).toBe('test_name');
                expect(resource.relationships.test_resource instanceof DocumentResource).toBeTruthy();
                expect(resource.relationships.test_resources instanceof DocumentCollection).toBeTruthy();
                expect((<DocumentResource>resource.relationships.test_resource).data.id).toBe('2');
                expect((<DocumentResource>resource.relationships.test_resource).data.attributes.name).toBe('test_name_2');
                expect(
                    (<DocumentCollection>resource.relationships.test_resources).data.find(related_resource => related_resource.id === '3')
                ).toBeTruthy();
                expect(
                    (<DocumentCollection>resource.relationships.test_resources).data.find(related_resource => related_resource.id === '3')
                        .attributes.name
                ).toBe('test_name_3');
                let has_one_relationship = (<DocumentResource>resource.relationships.test_resource).data;
                let has_many_relationship = (<DocumentCollection>resource.relationships.test_resources).data;
                expect((<TestResource>has_one_relationship.relationships.test_resource.data).id).toBe('4');
                expect((<TestResource>has_many_relationship[0].relationships.test_resources.data[0]).id).toBe('4');
            });
    });

    it(`resource should have the correct hasOne and hasMany relationships corresponding to the back end response's included resources`, async () => {
        let test_resource = new TestResource();
        test_resource.type = 'test_resources';
        test_resource.id = '1';
        test_resource.attributes = { name: 'test_name' };
        test_resource.relationships.test_resource.data = { id: '2', type: 'test_resources' };
        test_resource.relationships.test_resources.data = [
            { id: '3', type: 'test_resources' },
            { id: '4', type: 'test_resources' }
        ];

        // format has_one relationship to include
        let test_resource_has_one_relationship = new TestResource();
        test_resource_has_one_relationship.type = 'test_resources';
        test_resource_has_one_relationship.id = '2';
        test_resource_has_one_relationship.attributes = { name: 'test_name_2' };

        // format has_many relationship to include
        let test_resource_has_many_relationship_1 = new TestResource();
        test_resource_has_many_relationship_1.type = 'test_resources';
        test_resource_has_many_relationship_1.id = '3';
        test_resource_has_many_relationship_1.attributes = { name: 'test_name_3' };

        let test_resource_has_many_relationship_2 = new TestResource();
        test_resource_has_many_relationship_2.type = 'test_resources';
        test_resource_has_many_relationship_2.id = '4';
        test_resource_has_many_relationship_2.attributes = { name: 'test_name_4' };

        let included = [test_resource_has_one_relationship, test_resource_has_many_relationship_1, test_resource_has_many_relationship_2];

        let test_service = new TestService();
        test_response_subject.next(new HttpResponse({ body: { data: test_resource, included: included } }));

        await test_service
            .get('1', { include: ['test_resource', 'test_resources'] })
            .toPromise()
            .then(resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.name).toBe('test_name');
                expect(resource.relationships.test_resource instanceof DocumentResource).toBeTruthy();
                expect(resource.relationships.test_resources instanceof DocumentCollection).toBeTruthy();
                expect((<DocumentResource>resource.relationships.test_resource).data.id).toBe('2');
                expect((<DocumentResource>resource.relationships.test_resource).data.attributes.name).toBe('test_name_2');
                expect(
                    (<DocumentCollection>resource.relationships.test_resources).data.find(related_resource => related_resource.id === '3')
                ).toBeTruthy();
                expect(
                    (<DocumentCollection>resource.relationships.test_resources).data.find(related_resource => related_resource.id === '3')
                        .attributes.name
                ).toBe('test_name_3');
                expect(
                    (<DocumentCollection>resource.relationships.test_resources).data.find(related_resource => related_resource.id === '4')
                ).toBeTruthy();
                expect(
                    (<DocumentCollection>resource.relationships.test_resources).data.find(related_resource => related_resource.id === '4')
                        .attributes.name
                ).toBe('test_name_4');
            });
    });

    it(`if the back end sends a hasOne relationship with a null data property, it should be set as null in the resulting resource`, async () => {
        let test_resource = new TestResource();
        test_resource.type = 'test_resources';
        test_resource.id = '1';
        test_resource.attributes = { name: 'test_name' };
        test_resource.relationships.test_resource.data = null;

        let test_service = new TestService();
        test_response_subject.next(new HttpResponse({ body: { data: test_resource } }));

        await test_service
            .get('1')
            .toPromise()
            .then(resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.name).toBe('test_name');
                expect(resource.relationships.test_resource.data).toEqual(null);
            });
    });
});
