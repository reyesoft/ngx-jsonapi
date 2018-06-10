import { Converter } from './converter';
import { IDataResource } from 'dist/interfaces/data-resource';
import { IResourcesByType } from 'ngx-jsonapi';

describe('Converter', () => {
    it('json_array2resources_array_by_type(array) should be converted to IResourcesByType', () => {
        let converted = Converter.json_array2resources_array_by_type([
            {
                id: 'AR',
                type: 'sometype'
            }
        ]);

        expect(converted.sometype.AR.id).toBe('AR');
        expect(converted.sometype.AR.type).toBe('sometype');
    });
});
