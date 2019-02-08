import { ResourceRelationshipsConverter } from './resource-relationships-converter';
import { CacheStore } from '../services/cachestore';
import { CacheMemory } from '../services/cachememory';
import { Converter } from './converter';
import { Service } from '../service';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { IResourcesByType } from '../interfaces';
import { IRelationships } from '../interfaces/relationship';

export class MockResource extends Resource {
    public attributes = {
        name: '',
        description: ''
    };
    public type = 'resource';

    public relationships = {
        resource: new DocumentResource<Resource>()
    };
}

function getService(type: string) {
    let new_service = new Service();
    new_service.type = type;
    new_service.cachememory = new CacheMemory();
    new_service.cachememory.resources = {};
    new_service.cachestore = new CacheStore();

    return new_service;
}

describe('ResourceRelationshipsConverter', () => {

    let mock_relationship = new DocumentResource<Resource>();
    mock_relationship.data.type = 'resource';
    mock_relationship.data.id = '1';

    let mock_resource = new MockResource();
    mock_resource.relationships.resource = mock_relationship;

    let resource_relationships_converter = new ResourceRelationshipsConverter(
        getService,
        mock_resource.relationships,
        new MockResource().relationships,
        { resource: { '1': new Resource() }}
    );

    it('should be created', () => {
        expect(resource_relationships_converter).toBeTruthy();
    });

    it('should set builded to true when a hasOne relationsihp is builded', () => {
        spyOn(CacheStore.prototype, 'setResource');
        resource_relationships_converter.buildRelationships();
        expect((resource_relationships_converter as any).relationships_dest.resource.builded).toBeTruthy();
    });

});
