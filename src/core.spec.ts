// WARNING: this test is not correctly isolated

import { JsonRipper } from './services/json-ripper';
import { ReflectiveInjector } from '@angular/core';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { DocumentCollection } from './document-collection';
import { DocumentResource } from './document-resource';
import { Resource } from './resource';
import { Service } from './service';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { JsonapiConfig } from './jsonapi-config';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Observable, BehaviorSubject } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

class CustomResource extends Resource {
    public type: string = 'original_resource';

    public attributes: { data: string } = { data: 'this is a resource' };

    public relationships: {
        has_one: DocumentResource;
        has_many: DocumentCollection;
    } = {
        has_one: new DocumentResource(),
        has_many: new DocumentCollection()
    };
}

class CustomResourceService extends Service<CustomResource> {
    public type: string = 'original_resource';
    public resource: typeof CustomResource = CustomResource;
    public constructor() {
        super();
        this.register();
    }
}

let injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate([
    {
        provide: JSONAPI_RIPPER_SERVICE,
        useClass: JsonRipper
    },
    {
        provide: JSONAPI_STORE_SERVICE,
        useClass: JsonapiStore
    }
]);

describe('core methods', () => {
    let core: Core;
    it('should crete core service instance', () => {
        spyOn<any>(JsonapiStore.prototype, 'constructor');
        core = new Core(new JsonapiConfig(), new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()), injector);
        expect(core).toBeTruthy();
    });
    it('when exec method s response is an error, it should return a correctly formatted jsonapi error', () => {
        let data_resource: {
            type: string;
            id: string;
        } = {
            type: 'data',
            id: '1'
        };
        spyOn(Core.injectedServices.JsonapiHttp, 'exec').and.returnValue(
            new Observable(observer => {
                observer.next('data1');
                observer.next(observer.error({ errors: ['error'] }));
            })
        );
        Core.exec('path', 'method', { data: data_resource }).subscribe(
            data => {
                expect(data).toBe('data1');
            },
            error => {
                expect(error.errors).toEqual(['error']);
            }
        );
    });

    it('duplicateResource method should duplicate a resource and add the requested relationships (if present in the original reource)', () => {
        let original_resource_service: CustomResourceService = new CustomResourceService();
        let original_resource: CustomResource = new CustomResource();
        original_resource.id = '1';
        original_resource.attributes.data = 'this is a resource';
        let has_one_relationship_resource: CustomResource = new CustomResource();
        has_one_relationship_resource.id = '2';
        has_one_relationship_resource.attributes.data = 'this is a has ONE relationship';
        let has_many_relationship_resource: CustomResource = new CustomResource();
        has_many_relationship_resource.id = '3';
        has_many_relationship_resource.attributes.data = 'this is a has MANY relationship';
        let has_many_relationship_resource_2: CustomResource = new CustomResource();
        has_many_relationship_resource_2.id = '4';
        has_many_relationship_resource_2.attributes.data = 'this is a has MANY relationship';

        original_resource.addRelationship(has_one_relationship_resource, 'has_one');
        original_resource.addRelationships([has_many_relationship_resource, has_many_relationship_resource_2], 'has_many');

        let resource_copy: CustomResource = core.duplicateResource(original_resource);
        expect(resource_copy.id.includes('new_')).toBeTruthy();
        expect(resource_copy.attributes.data).toBe('this is a resource');
        expect((<DocumentResource>resource_copy.relationships.has_one).data.id).toBe('2');
        expect((<DocumentResource>resource_copy.relationships.has_one).data.attributes.data).toBe('this is a has ONE relationship');
        expect(resource_copy.relationships.has_many.data[0].id).toBe('3');
        expect(resource_copy.relationships.has_many.data[0].attributes.data).toBe('this is a has MANY relationship');
        expect(resource_copy.relationships.has_many.data[1].id).toBe('4');
        expect(resource_copy.relationships.has_many.data[1].attributes.data).toBe('this is a has MANY relationship');

        let resource_copy_with_duplicated_relationships: CustomResource = core.duplicateResource(original_resource, 'has_one', 'has_many');
        expect(resource_copy_with_duplicated_relationships.id.includes('new_')).toBeTruthy();
        expect(resource_copy_with_duplicated_relationships.attributes.data).toBe('this is a resource');
        expect((<DocumentResource>resource_copy_with_duplicated_relationships.relationships.has_one).data.id.includes('new_')).toBeTruthy();
        expect((<DocumentResource>resource_copy_with_duplicated_relationships.relationships.has_one).data.attributes.data).toBe(
            'this is a has ONE relationship'
        );
        expect(resource_copy_with_duplicated_relationships.relationships.has_many.data[0].id.includes('new_')).toBeTruthy();
        expect(resource_copy_with_duplicated_relationships.relationships.has_many.data[0].attributes.data).toBe(
            'this is a has MANY relationship'
        );
        expect(resource_copy_with_duplicated_relationships.relationships.has_many.data[1].id.includes('new_')).toBeTruthy();
        expect(resource_copy_with_duplicated_relationships.relationships.has_many.data[1].attributes.data).toBe(
            'this is a has MANY relationship'
        );
    });
});
