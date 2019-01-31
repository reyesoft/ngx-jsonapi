import { DocumentCollection } from './document-collection';
import { Resource } from './resource';
import { IDataCollection } from './interfaces/data-collection';
import { Converter } from './services/converter';

describe('document-collection', () => {
    let collection = new DocumentCollection();

    it('should be can created', () => {
        expect(collection.builded).toBe(false);
    });

    it('should be work with trackBy', () => {
        let resource = new Resource();
        resource.id = '5';
        expect(collection.trackBy(resource)).toBe('5');
    });

    it('should be find resources with find() method', () => {
        let resource1 = new Resource();
        resource1.id = '1';
        let resource2 = new Resource();
        resource2.id = '2';
        collection.data.push(resource1);
        collection.data.push(resource2);
        expect(collection.find('2').id).toBe('2');
    });

    it('fill method should set collection s builded attribute to true if data_collection.data argument is en empty list', () => {
        let data_collection = { data: [] };
        let new_collection = new DocumentCollection();
        new_collection.fill(data_collection);
        expect(new_collection.builded).toBeTruthy();
    });

    //// @todo
    // it('should be fill collections with json', () => {
    //     let json: IDataCollection = {
    //         data: [{
    //             id: '55',
    //             type: 'sometype'
    //         }]
    //     }
    //     collection.fill(json);
    //     expect(collection.data[0].id).toBe('55');
    //     expect(collection.data[0].type).toBe('sometype');
    // });
});
