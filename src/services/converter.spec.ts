import { JsonapiBootstrap } from '../bootstraps/jsonapi-bootstrap';
import { Converter } from './converter';

describe('Converter', () => {
    beforeEach(async () => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'http://yourdomain/api/v1/' } });
    });

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

    it('procreate() dont remove relationship properties when is not present or empty on data', () => {
        // @todo
    });
});
