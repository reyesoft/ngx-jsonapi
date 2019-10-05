import { TestFactory } from './tests/factories/test-factory';
import { DocumentCollection } from './document-collection';
import { IDocumentResource } from './interfaces/data-object';
import { IParamsResource } from './interfaces/params-resource';
import { DocumentResource } from './document-resource';
import { Core } from './core';
import { PathBuilder } from './services/path-builder';
import { Resource } from './resource';
import { of } from 'rxjs';

describe('resource', () => {
    // it('should be reset()', () => {
    //     resource.id = 'some-id';
    //     expect(resource.id).toBe('some-id');
    //     resource.reset();
    //     expect(resource.id).toBe('');
    // });

    it('hasManyRelated()', () => {
        // @todo relation alias is not present
        // @todo relation alias is present, but data is an empty array
        // @todo relation alias is present, but data is not present
    });

    it('hasOneRelated()', () => {
        // @todo relation alias is not present
        // @todo relation alias is present, but data is a null
        // @todo relation alias is present, but data is undefined
    });

    it('should save the resource without relationships that dont refer to a resource or mean to remove the relationship', async () => {
        let resource = new Resource();
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
        resource.loaded = true;
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
            }
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
            }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'PATCH', second_expected_resource_in_save, true);
    });

    it('toObject method should parse the resouce in a new IDocumentResource', () => {
        let mocked_service_data: { [key: string]: any } = { parseToServer: false };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = { main_attribute: '123456789' };
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = { first: '1' };
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationship'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource.data.id).toBe('1');
        expect(to_object_resource.data.type).toBe('main');
        expect(to_object_resource.data.attributes.main_attribute).toBe('123456789');
        expect((to_object_resource.data.relationships as any).resource_relationship.data.id).toBe('123');
        expect((to_object_resource.data.relationships as any).resource_relationship.data.type).toBe('resource_relationship');
        expect(to_object_resource.included[0].id).toBe('123');
        expect(to_object_resource.included[0].type).toBe('resource_relationship');
        expect(to_object_resource.included[0].attributes.first).toBe('1');
    });
});

describe('resource.toObject() method', () => {
    it('(toObject) If the service has a parseToServer method, ir should be applied in toObject method', () => {
        let mocked_service_data = {
            parseToServer: (attr: { [key: string]: any }): { [key: string]: any } => {
                attr.main_attribute = parseInt(attr.main_attribute, 10);

                return attr;
            }
        };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = { main_attribute: '123456789' };
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = { first: '1' };
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
        let mocked_service_data: { [key: string]: any } = { parseToServer: false };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = { main_attribute: '123456789' };
        (new_resource.relationships as any) = {
            resource_relationship: {}
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = { first: '1' };
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationship'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(console_warn_spy).toHaveBeenCalled();
    });

    it('(toObject) If a relationship is not in the include param, it should not be included in the resulting include field', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let console_warn_spy = spyOn(console, 'warn');
        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = { main_attribute: '123456789' };
        new_resource.relationships = {
            resource_relationship: new DocumentResource()
        };
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = { first: '1' };
        new_resource.addRelationship(resource_relationship);
        let params: IParamsResource = {
            beforepath: '',
            include: [],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(to_object_resource.included).toBeFalsy();
    });

    it('(toObject) hasMany empty and untouched relationship should be removed from the resulting relationships', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let book = TestFactory.getBook('5');

        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationships'],
            ttl: 0
        };
        let book_object = book.toObject(params);
        expect(book_object.data.relationships.photos).toBeUndefined();
        expect(book_object.included).toBeFalsy();
    });

    it('(toObject) hasMany empty and builded relationship should be return a emtpy relationship', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let book = TestFactory.getBook('1');
        book.addRelationship(TestFactory.getPhoto('5'), 'photos');
        expect(book.toObject().data.relationships.photos.data[0].id).toBe('5');

        book.removeRelationship('photos', '5');
        expect(book.relationships.photos.builded).toBe(true);
        expect(book.relationships.photos.content).toBe('collection');
        expect(book.toObject().data.relationships.photos.data).toEqual([]);
    });

    it('(toObject) hasMany whith only ids and builded relationship should be return a relationship with ids', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let book = TestFactory.getBook('1');
        book.relationships.photos.fill({ data: [{ id: '4', type: 'photos' }] });
        expect(book.relationships.photos.builded).toBe(false);
        expect(book.relationships.photos.content).toBe('ids');
        expect(book.toObject().data.relationships.photos.data.length).toBe(1);
        expect(book.toObject().data.relationships.photos.data[0]).toMatchObject({ id: '4', type: 'photos' });
    });

    it('(toObject) hasMany relationships that are OK should be included in  the resulting relationships', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let new_resource: Resource = new Resource();
        new_resource.type = 'main';
        new_resource.id = '1';
        new_resource.attributes = { main_attribute: '123456789' };
        new_resource.relationships = {
            resource_relationships: new DocumentCollection()
        };
        let resource_relationships: DocumentCollection = new DocumentCollection();
        let resource_relationship: Resource = new Resource();
        resource_relationship.type = 'resource_relationship';
        resource_relationship.id = '123';
        resource_relationship.attributes = { first: '1' };
        resource_relationships.data.push(resource_relationship);
        new_resource.relationships.resource_relationships = resource_relationships;
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationships'],
            ttl: 0
            // id: '',
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect((to_object_resource.data.relationships as any).resource_relationships.data[0].id).toBe('123');

        expect(to_object_resource.included[0].id).toBe('123');
    });

    it('(toObject) hasOne empty data and untouched relationship should be removed from the resulting relationships', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let book = TestFactory.getBook('5');
        let book_object = book.toObject();
        expect(book_object.data.relationships.author).toBeUndefined();
        expect(book_object.included).toBeFalsy();
    });

    it('(toObject) hasOne data null relationship should be return a data nulled relationship', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let book = TestFactory.getBook('5');
        book.addRelationship(TestFactory.getAuthor('1'), 'author');
        expect(book.toObject().data.relationships.author.data.id).toBe('1');
        book.removeRelationship('author', '1');
        expect(book.relationships.author.data).toBeNull();
        let book_object = book.toObject();
        expect(book_object.data.relationships.author.data).toBeNull();
        expect(book_object.included).toBeFalsy();
    });

    it('(toObject) hasOne data filled relationship should be return a simple object relationship', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let book = TestFactory.getBook('5');
        book.addRelationship(TestFactory.getAuthor('1'), 'author');
        let book_object = book.toObject();
        expect(book_object.data.relationships.author.data.id).toBe('1');
        expect(book_object.included).toBeFalsy();
    });
});

describe('resource.save() method', () => {
    it('if set, te save method should send the "meta" property when saving a resource', async () => {
        let resource = new Resource();
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
        resource.loaded = true;
        resource.source = 'store';
        resource.cache_last_update = 0;
        resource.relationships = {};
        resource.meta = { some_data: 'some_data' };
        let response = Object.create(resource);
        let exec_spy = spyOn(Core, 'exec').and.returnValue(of({ data: response }));
        await resource.save();
        let expected_resource_in_save = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {},
                meta: { some_data: 'some_data' }
            }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'PATCH', expected_resource_in_save, true);
    });

    it('top level meta object should be included in the request if available', async () => {
        let resource = new Resource();
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
        resource.loaded = true;
        resource.source = 'store';
        resource.cache_last_update = 0;
        resource.relationships = {};
        let response = Object.create(resource);
        let exec_spy = spyOn(Core, 'exec').and.returnValue(of({ data: response }));
        await resource.save({ meta: { restore: true } });
        let expected_resource_in_save = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {}
            },
            meta: { restore: true }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'PATCH', expected_resource_in_save, true);
    });

    it('restore method should set top level meta to restore the resource (according to Reyesoft specification extension)', async () => {
        let resource = new Resource();
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
        resource.loaded = true;
        resource.source = 'store';
        resource.cache_last_update = 0;
        resource.relationships = {};
        let response = Object.create(resource);
        let exec_spy = spyOn(Core, 'exec').and.returnValue(of({ data: response }));
        await resource.restore();
        let expected_resource_in_save = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {}
            },
            meta: { restore: true }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'PATCH', expected_resource_in_save, true);
    });

    // @todo fill from store to more new version of resource
    // for example store has more lationships, but we are filling a resource created from server.
    // is possible this scenario?
});
