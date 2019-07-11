import { DocumentCollection } from './document-collection';
import { IDataObject } from 'src/interfaces/data-object';
import { Base } from 'src/services/base';
import { IParamsResource } from 'src/interfaces/params-resource';
import { DocumentResource } from './document-resource';
import { Core } from './core';
import { PathBuilder } from './services/path-builder';
import { Resource } from './resource';
import { IDataCollection } from './interfaces/data-collection';
import { of } from 'rxjs';

describe('resource', () => {
    let resource = new Resource();

    // it('should be reset()', () => {
    //     resource.id = 'some-id';
    //     expect(resource.id).toBe('some-id');
    //     resource.reset();
    //     expect(resource.id).toBe('');
    // });

    it('should save the resource without relationships that dont refer to a resource or mean to remove the relationship', async () => {
        spyOn(resource, 'getService').and.returnValue(false);
        spyOn(PathBuilder.prototype, 'applyParams');
        resource.id = '1234';
        resource.type = 'tests';
        resource.attributes = { name: 'test_name' };
        resource.relationships = {
            has_one_relationship: new DocumentResource(),
            has_many_relationship: new DocumentCollection()
        };
        resource.links = {};
        resource.is_new = true;
        resource.is_saving = false;
        resource.is_loading = false;
        resource.source = 'store';
        resource.cache_last_update = 0;
        let response = Object.create(resource);
        let exec_spy = spyOn(Core, 'exec').and.returnValue(of({ data: response }));
        await resource.save();
        resource.relationships = {};
        let expected_resource_in_save = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {}
            },
            builded: false,
            content: 'resource'
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'PATCH', expected_resource_in_save, true);
        resource.relationships.has_many_relationship = new DocumentCollection();
        resource.relationships.has_many_relationship.builded = true;
        resource.relationships.has_one_relationship = <any>{ data: null };
        await resource.save();
        let second_expected_resource_in_save = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {
                    has_many_relationship: { data: [] },
                    has_one_relationship: { data: null }
                }
            },
            builded: false,
            content: 'resource'
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'PATCH', second_expected_resource_in_save, true);
    });

    it('toObject method should parse the resouce in a new IDataObject', () => {
        let mocked_service_data: {[key: string]: any} = {parseToServer: false};
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = {first: '1'};
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationship'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDataObject = new_resource.toObject(params);
        expect(to_object_resource.builded).toBeFalsy();
        expect(to_object_resource.content).toBe('resource');
        expect(to_object_resource.data.id).toBe('1');
        expect(to_object_resource.data.type).toBe('main');
        expect(to_object_resource.data.attributes.main_attribute).toBe('123456789');
        expect((to_object_resource.data.relationships as any).resource_relationship.data.id).toBe('123');
        expect((to_object_resource.data.relationships as any).resource_relationship.data.type).toBe('resource_relationship');
        expect(to_object_resource.included[0].id).toBe('123');
        expect(to_object_resource.included[0].type).toBe('resource_relationship');
        expect(to_object_resource.included[0].attributes.first).toBe('1');
    });
    it('(toObject) If the service has a parseToServer method, ir should be applied in toObject method', () => {
        let mocked_service_data = {
            parseToServer: (attr: {[key: string]: any}): {[key: string]: any} => {
                attr.main_attribute = parseInt(attr.main_attribute, 10);

                return attr;
            }
        };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = {first: '1'};
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationship'],
            ttl: 0
            // id: '',
        };
        let to_object_resource = new_resource.toObject(params);
        expect(to_object_resource.data.attributes.main_attribute).toBe(123456789);
    });
    it('(toObject) If a relationship is not a document resource or document collection instance, a warn should be reaised', () => {
        let console_warn_spy = spyOn(console, 'warn');
        let mocked_service_data: {[key: string]: any} = {parseToServer: false};
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        (new_resource.relationships as any) = {
            resource_relationship: {}
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = {first: '1'};
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationship'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDataObject = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(console_warn_spy).toHaveBeenCalled();
    });
    it('(toObject) If a relationship is not in the include param, it should not be included in the resulting include field', () => {
        let console_warn_spy = spyOn(console, 'warn');
        let mocked_service_data: {[key: string]: any} = {parseToServer: false};
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = {first: '1'};
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: [],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDataObject = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(to_object_resource.included).toBeFalsy();
    });
    it('(toObject) If a relationship is empty, it should not be included in the resulting resource realtionships', () => {
        let console_warn_spy = spyOn(console, 'warn');
        let mocked_service_data: {[key: string]: any} = {parseToServer: false};
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let params: IParamsResource = {
            beforepath: '',
            include: [],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDataObject = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(to_object_resource.data.relationships).toEqual({});
    });

    it('(toObject) If a hasMany relationship is empty, it should be removed from the resulting relationships', () => {
        let mocked_service_data: {[key: string]: any} = {parseToServer: false};
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        new_resource.relationships = {
            resource_relationships: new DocumentCollection()
        };
        let resource_relationships: DocumentCollection = new DocumentCollection();
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationships'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDataObject = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(to_object_resource.data.relationships).toEqual({});
        expect(to_object_resource.included).toBeFalsy();
    });

    it('(toObject) hasMany relationships that are OK should be included in  the resulting relationships', () => {
        let mocked_service_data: {[key: string]: any} = {parseToServer: false};
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = {main_attribute: '123456789'};
        new_resource.relationships = {
            resource_relationships: new DocumentCollection()
        };
        let resource_relationships: DocumentCollection = new DocumentCollection();
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = {first: '1'};
        resource_relationships.data.push(resource_relationship);
        new_resource.relationships.resource_relationships = resource_relationships;
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationships'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDataObject = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect((to_object_resource.data.relationships as any).resource_relationships.data[0].id).toBe('123');
        expect(to_object_resource.included[0].id).toBe('123');
    });
});
