import { ResourceRelationshipsConverter } from './resource-relationships-converter';
import { DocumentCollection } from '../document-collection';
import { CacheMemory } from '../services/cachememory';
import { Converter } from './converter';
import { Service } from '../service';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { IResourcesByType } from '../interfaces';
import { IRelationships } from '../interfaces/relationship';

function clone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    let copy = new obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }

    return copy;
}

export class MockResource extends Resource {
    public attributes = {
        name: '',
        description: ''
    };
    public type = 'resource';

    public relationships: IRelationships = {
        resource: new DocumentResource<MockResource>(),
        collection: new DocumentCollection<MockResource>()
    };
}

class MockResourcesService extends Service<MockResource> {
    public type = 'resource';
    public resource = MockResource;
}

const test_services = {
    resource: new MockResourcesService()
};

function getService(type: string) {
    let service = test_services[type];

    return service;
}

describe('ResourceRelationshipsConverter', () => {
    let mock_relationship = new DocumentResource<MockResource>();
    mock_relationship.data.type = 'resource';
    mock_relationship.data.id = '1';

    let mock_resource = new MockResource();
    mock_resource.relationships.resource = mock_relationship;

    let resource_relationships_converter = new ResourceRelationshipsConverter(
        getService,
        mock_resource.relationships,
        new MockResource().relationships,
        { resource: { '1': new MockResource() } }
    );

    it('should be created', () => {
        expect(resource_relationships_converter).toBeTruthy();
    });

    it('should set builded to true when a hasOne relationsihp is builded', () => {
        resource_relationships_converter.buildRelationships();
        expect((resource_relationships_converter as any).relationships_dest.resource.builded).toBeTruthy();
    });

    it(`buildRelationships method should add hasMany and hasOne relationships to relationships_dest as appropiapte
        using relationships_from data`, () => {
        // set up spy
        spyOn(Converter, 'getService').and.callFake(getService);

        // set up fake dest_resource (rememeber that ids must match with relationships_from resources)
        let mock_resource_with_relationships = new MockResource();
        mock_resource_with_relationships.relationships.collection = new DocumentCollection<MockResource>();

        // create a fake has_one relationship
        let mock_resource_from = new DocumentResource<MockResource>();
        mock_resource_from.data.type = 'resource';
        mock_resource_from.data.id = '123';

        // create a fake has_many relationship
        let mock_collection_from = new DocumentCollection<MockResource>();
        let mock_resource_1 = new MockResource();
        mock_resource_1.id = '1';
        let mock_resource_2 = new MockResource();
        mock_resource_2.id = '2';
        mock_collection_from.data = [mock_resource_1, mock_resource_2];

        // add fake included resources
        let mock_included_resource_has_one = clone(mock_resource_from);
        let mock_included_resource_1 = clone(mock_resource_1);
        let mock_included_resource_2 = clone(mock_resource_2);
        mock_included_resource_has_one.data.attributes = {
            name: 'has_one relationship name',
            description: 'has_one relationship description'
        };
        mock_included_resource_1.attributes = { name: 'first', description: 'first in collection' };
        mock_included_resource_2.attributes = { name: 'second', description: 'second in collection' };
        let included_resources = {
            resource: {
                '123': mock_included_resource_has_one.data,
                '1': mock_included_resource_1,
                '2': mock_included_resource_2
            }
        };

        resource_relationships_converter = new ResourceRelationshipsConverter(
            getService,
            {
                resource: mock_resource_from,
                collection: mock_collection_from
            },
            mock_resource_with_relationships.relationships,
            included_resources
        );

        resource_relationships_converter.buildRelationships();

        // test has_one relationship
        expect((resource_relationships_converter as any).relationships_dest.resource.data instanceof Resource).toBeTruthy();
        expect((resource_relationships_converter as any).relationships_dest.resource.data.id).toBe('123');
        expect((resource_relationships_converter as any).relationships_dest.resource.data.attributes.name).toBe(
            'has_one relationship name'
        );
        expect((resource_relationships_converter as any).relationships_dest.resource.data.attributes.description).toBe(
            'has_one relationship description'
        );

        // test has_many relationship
        let related_collection_first_resource = (resource_relationships_converter as any).relationships_dest.collection.data.find(
            resource => resource.id === '1'
        );
        let related_collection_second_resource = (resource_relationships_converter as any).relationships_dest.collection.data.find(
            resource => resource.id === '2'
        );
        expect((resource_relationships_converter as any).relationships_dest.collection instanceof DocumentCollection).toBeTruthy();
        expect(related_collection_first_resource.id).toBeTruthy();
        expect(related_collection_second_resource).toBeTruthy();

        // commented until TODO is resolved (search this) ====> // @todo check with included resources?
        // expect(related_collection_first_resource.attributes.name).toBe('first');
        // expect(related_collection_first_resource.attributes.description).toBe('first in collection');
        // expect(related_collection_second_resource.attributes.name).toBe('second');
        // expect(related_collection_second_resource.attributes.description).toBe('second in collection');
    });
});
