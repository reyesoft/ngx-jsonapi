import { DocumentResource } from './document-resource';
import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { IDataObject } from './interfaces/data-object';

describe('document resource', () => {
    let document_resource = new DocumentResource();
    it('should be created', () => {
        expect(document_resource.builded).toBe(false);
        expect(document_resource.content).toBe('id');
    });
    it('data property should have a new resource instance', () => {
        let Resource_spy = spyOn(Resource, 'constructor');
        let resource = new Resource();
        expect(document_resource.data).toEqual(resource);
    });
    it('page property should have a new page instance', () => {
        let page = new Page();
        expect(document_resource.page).toEqual(page);
    });
    it('fill mehotd should call Reource class fill mehtod with the passed IDataObject parameter and fill meta property', () => {
        let Resource_fill_spy = spyOn(document_resource.data, 'fill');
        document_resource.fill({
            data: {
                type: 'data',
                id: 'id'
            },
            meta: {meta: 'meta'}
        });
        expect(Resource_fill_spy).toHaveBeenCalled();
        expect(document_resource.meta).toEqual({meta: 'meta'});
    });
    it('if passed IDataObject has no meta property, fill mehotd should should assign an empty Object', () => {
        document_resource.meta = null;
        let Resource_fill_spy = spyOn(document_resource.data, 'fill');
        document_resource.fill({
            data: {
                type: 'data',
                id: 'id'
            }
        });
        expect(Resource_fill_spy).toHaveBeenCalled();
        expect(document_resource.meta).toEqual({});
    });
});
