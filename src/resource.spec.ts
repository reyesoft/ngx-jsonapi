import { DocumentCollection } from './document-collection';
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

    it ('should save the resource without relationships that dont refer to a resource or mean to remove the relationship', async () => {
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
        let exec_spy = spyOn(Core, 'exec').and.returnValue(of({data: response}));
        await resource.save();
        resource.relationships = {};
        let expected_resource_in_save = {
            data: {
                type: 'tests',
                id: '1234',
                attributes: { name: 'test_name' },
                relationships: {}},
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
});
