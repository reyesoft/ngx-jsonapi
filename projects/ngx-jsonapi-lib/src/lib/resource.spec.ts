import { TestFactory } from './tests/factories/test-factory';
import { DocumentCollection } from './document-collection';
import { IDocumentResource } from './interfaces/data-object';
import { IParamsResource } from './interfaces/params-resource';
import { DocumentResource } from './document-resource';
import { Core } from './core';
import { PathBuilder } from './services/path-builder';
import { Resource } from './resource';
import { of } from 'rxjs';
import { Book } from './tests/factories/books.service';
import { Service } from './service';

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
        let resource: Resource = new Resource();
        jest.spyOn(resource, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        jest.spyOn(PathBuilder.prototype, 'applyParams');
        resource.id = '1234';
        resource.type = 'tests';
        resource.attributes = { name: 'test_name' };
        resource.relationships = {
            has_one_relationship: new DocumentResource(),
            has_many_relationship: new DocumentCollection()
        };
        resource.links = {};
        resource.is_new = false;
        resource.is_saving = false;
        resource.is_loading = false;
        resource.loaded = true;
        resource.source = 'store';
        resource.cache_last_update = 0;
        let response: any = Object.create(resource);
        let exec_spy = jest.spyOn(Core, 'exec').mockReturnValue(of({ data: response }));
        await resource.save();
        resource.relationships = {};
        let expected_resource_in_save: any = {
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
        resource.relationships.has_one_relationship = { data: null } as any;
        await resource.save();
        let second_expected_resource_in_save: any = {
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
        // Elimino la clase MockService y uso un objeto plano como mock
        const mocked_service_data = { getPrePath: () => '', getPath: () => '' } as Service<Resource>;
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(mocked_service_data);
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
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource.data.id).toBe('1');
        expect(to_object_resource.data.type).toBe('main');
        expect(to_object_resource.data.attributes && to_object_resource.data.attributes.main_attribute).toBe('123456789');
        const relationships: any = to_object_resource.data.relationships;
        expect(
            relationships &&
                relationships.resource_relationship &&
                relationships.resource_relationship.data &&
                relationships.resource_relationship.data.id
        ).toBe('123');
        expect(
            relationships &&
                relationships.resource_relationship &&
                relationships.resource_relationship.data &&
                relationships.resource_relationship.data.type
        ).toBe('resource_relationship');
        const included = to_object_resource.included;
        expect(included && included[0] && included[0].id).toBe('123');
        expect(included && included[0] && included[0].type).toBe('resource_relationship');
        expect(included && included[0] && included[0].attributes && included[0].attributes.first).toBe('1');
    });
});

describe('resource.toObject() method', () => {
    it('(toObject) If the service has a parseToServer method, ir should be applied in toObject method', () => {
        let mocked_service_data: Partial<Service<Resource>> = {
            parseToServer: (attr: { [key: string]: any }): { [key: string]: any } => {
                attr.main_attribute = parseInt(attr.main_attribute, 10);
                return attr;
            }
        };
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(mocked_service_data as Service<Resource>);
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
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        const attributes = to_object_resource.data.attributes;
        expect(attributes && attributes.main_attribute).toBe(123456789);
    });

    it('(toObject) If a relationship is not a document resource or document collection instance, a warn should be reaised', () => {
        const console_warn_spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        let mocked_service_data: Partial<Service<Resource>> = {
            parseToServer: (attr: any) => attr
        };
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(mocked_service_data as Service<Resource>);
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
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        expect(console_warn_spy).toHaveBeenCalled();
    });

    it('(toObject) If a relationship is not in the include param, it should not be included in the resulting include field', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
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
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        expect(to_object_resource).toBeTruthy();
        const included = to_object_resource.included;
        expect(!included || !included.length).toBe(true);
    });

    it('(toObject) hasMany empty and untouched relationship should be removed from the resulting relationships', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        let book: Book = TestFactory.getBook('5');
        book.relationships.photos.data = [];
        let params: IParamsResource = {
            beforepath: '',
            include: ['resource_relationships'],
            ttl: 0
        };
        let book_object: IDocumentResource = book.toObject(params);
        const relationships = book_object.data.relationships;
        expect(relationships && relationships.photos).toBeUndefined();
        const included = book_object.included;
        expect(!included || !included.length).toBe(true);
    });

    it('(toObject) hasMany empty and builded relationship should return an emtpy relationship', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        let book: Book = TestFactory.getBook('1');
        book.relationships.photos.data = [];
        book.addRelationship(TestFactory.getPhoto('5'), 'photos');
        expect(book.toObject()?.data?.relationships?.photos?.data?.[0]?.id).toBe('5');
        book.removeRelationship('photos', '5');
        expect(book.relationships.photos.builded).toBe(true);
        expect(book.relationships.photos.content).toBe('collection');
        let bookObjectAfterRemove = book.toObject();
        const relationshipsAfterRemove = bookObjectAfterRemove.data.relationships;
        const photosAfterRemove = relationshipsAfterRemove && relationshipsAfterRemove.photos;
        const photosDataAfterRemove = photosAfterRemove && photosAfterRemove.data;
        expect(photosDataAfterRemove).toEqual([]);
    });

    it('(toObject) hasMany whith only ids and builded relationship should be return a relationship with ids', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        let book: Book = TestFactory.getBook('1');
        book.relationships.photos.fill({ data: [{ id: '4', type: 'photos' }] });
        expect(book.relationships.photos.builded).toBe(false);
        expect(book.relationships.photos.content).toBe('ids');
        let bookObjectIds = book.toObject();
        const relationshipsIds = bookObjectIds.data.relationships;
        const photosIds = relationshipsIds && relationshipsIds.photos;
        const photosDataIds = photosIds && photosIds.data;
        expect(photosDataIds && photosDataIds.length).toBe(1);
        expect(photosDataIds && photosDataIds[0]).toEqual({
            id: '4',
            type: 'photos'
        });
    });

    it('(toObject) hasMany relationships that are OK should be included in  the resulting relationships', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
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
        };
        let to_object_resource: IDocumentResource = new_resource.toObject(params);
        const relationships = to_object_resource.data.relationships;
        expect(
            relationships &&
                relationships.resource_relationships &&
                relationships.resource_relationships.data &&
                relationships.resource_relationships.data[0] &&
                relationships.resource_relationships.data[0].id
        ).toBe('123');
        const included = to_object_resource.included;
        expect(included && included[0] && included[0].id).toBe('123');
    });

    it('(toObject) hasOne empty data and untouched relationship should be removed from the resulting relationships', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        let book: Book = TestFactory.getBook('5');
        book.relationships.author.data = undefined;
        let book_object: IDocumentResource = book.toObject();
        const included = book_object.included;
        expect(!included || !included.length).toBe(true);
    });

    it('(toObject) hasOne data null relationship should be return a data nulled relationship', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        let book: Book = TestFactory.getBook('5');
        book.addRelationship(TestFactory.getAuthor('1'), 'author');
        let bookObject = book.toObject();
        const relationships = bookObject.data.relationships;
        const author = relationships && relationships.author;
        const authorData = author && author.data;
        expect(authorData && authorData.id).toBe('1');
        book.removeRelationship('author', '1');
        expect(book.relationships.author.data).toBeNull();
        let book_object = book.toObject();
        const relationshipsAfter = book_object.data.relationships;
        const authorAfter = relationshipsAfter && relationshipsAfter.author;
        const authorDataAfter = authorAfter && authorAfter.data;
        expect(authorDataAfter).toBeNull();
        const included = book_object.included;
        expect(!included || !included.length).toBe(true);
    });

    it('(toObject) hasOne data filled relationship should be return a simple object relationship', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue({ getPrePath: () => '', getPath: () => '' } as Service<Resource>);
        let book: Book = TestFactory.getBook('5');
        book.addRelationship(TestFactory.getAuthor('1'), 'author');
        let bookObject = book.toObject();
        const relationships = bookObject.data.relationships;
        const author = relationships && relationships.author;
        const authorData = author && author.data;
        expect(authorData && authorData.id).toBe('1');
        const included = bookObject.included;
        expect(!included || !included.length).toBe(true);
    });
});

describe('resource.save() method', () => {
    it('if set, te save method should send the "meta" property when saving a resource', async () => {
        let resource: Resource = new Resource();
        const serviceMock: Partial<Service<Resource>> = {
            getPrePath: () => '',
            getPath: () => '',
            parseToServer: (attr: any) => attr
        };
        jest.spyOn(resource, 'getService').mockReturnValue(serviceMock as Service<Resource>);
        jest.spyOn(PathBuilder.prototype, 'applyParams');
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
        let response: any = Object.create(resource);
        let exec_spy = jest.spyOn(Core, 'exec').mockReturnValue(of({ data: response }));
        await resource.save();
        let expected_resource_in_save: any = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {},
                meta: { some_data: 'some_data' }
            }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'POST', expected_resource_in_save, true);
    });

    it('top level meta object should be included in the request if available', async () => {
        let resource: Resource = new Resource();
        const serviceMock: Partial<Service<Resource>> = {
            getPrePath: () => '',
            getPath: () => '',
            parseToServer: (attr: any) => attr
        };
        jest.spyOn(resource, 'getService').mockReturnValue(serviceMock as Service<Resource>);
        jest.spyOn(PathBuilder.prototype, 'applyParams');
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
        let response: any = Object.create(resource);
        let exec_spy = jest.spyOn(Core, 'exec').mockReturnValue(of({ data: response }));
        await resource.save({ meta: { restore: true } });
        let expected_resource_in_save: any = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {}
            },
            meta: { restore: true }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'POST', expected_resource_in_save, true);
    });

    it('restore method should set top level meta to restore the resource (according to Reyesoft specification extension)', async () => {
        let resource: Resource = new Resource();
        const serviceMock: Partial<Service<Resource>> = {
            getPrePath: () => '',
            getPath: () => '',
            parseToServer: (attr: any) => attr
        };
        jest.spyOn(resource, 'getService').mockReturnValue(serviceMock as Service<Resource>);
        jest.spyOn(PathBuilder.prototype, 'applyParams');
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
        let response: any = Object.create(resource);
        let exec_spy = jest.spyOn(Core, 'exec').mockReturnValue(of({ data: response }));
        await resource.restore();
        let expected_resource_in_save: any = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {}
            },
            meta: { restore: true }
        };
        expect(exec_spy).toHaveBeenCalledWith('1234', 'POST', expected_resource_in_save, true);
    });

    // @todo fill from store to more new version of resource
    // for example store has more lationships, but we are filling a resource created from server.
    // is possible this scenario?
});
