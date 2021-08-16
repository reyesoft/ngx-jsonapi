// WARNING: this test is not isolated

import { Core } from '../core';
import { DocumentCollection } from '../document-collection';
import { DocumentResource } from '../document-resource';
import { Resource } from '../resource';
import { Service } from '../service';
import axios from 'axios';
import { filter } from 'rxjs/operators';
import { JsonapiBootstrap } from '../bootstraps/jsonapi-bootstrap';

class TestResource extends Resource {
    public type = 'test_resources';
    public id = '';
    public attributes: { name?: string; optional?: string } = { name: '', optional: '' };
    public relationships = {
        test_resource: new DocumentResource<TestResource>(),
        test_resources: new DocumentCollection<TestResource>()
    };
}

class HttpHandlerMock {
    public handle(url: string): any {
        let splitted_request_url = url.split('?');
        let splitted_params: Array<string> = [];
        if (splitted_request_url.length > 1) {
            let params = splitted_request_url[1];
            splitted_params = params.split('&');
        }

        if (splitted_params.indexOf('fields[test_resources]=optional') > -1) {
            let optional_attributes_only_resource: any = {};
            optional_attributes_only_resource.id = '1';
            optional_attributes_only_resource.attributes = { optional: 'optional attribute value' };

            return optional_attributes_only_resource;
        } else {
            let test_resource: any = {};
            test_resource.type = 'test_resources';
            test_resource.id = '1';
            test_resource.attributes = { name: 'test_name' };

            return test_resource;
        }
    }
}

let axiosResponseFactory = response => {
    return {
        data: {
            data: response
        }
    };
};

class TestService extends Service {
    public constructor() {
        super();
        this.register();
    }
    public type = 'test_resources';
    public resource = TestResource;
    public ttl = 10000;
}

jest.mock('axios');

describe('core methods', () => {
    beforeAll(() => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'http://yourdomain/api/v1/' } });
    });
    it(`service's get method should return a stream with the requested resource including the requested attributes (fields)`, done => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        let test_service = new TestService();
        let response = axiosResponseFactory(
            new HttpHandlerMock().handle('http://yourdomain/api/v1/test_resources/1?fields[test_resources]=optional')
        );
        mockedAxios.request.mockResolvedValue(response);

        test_service
            .get('1', { fields: { test_resources: ['optional'] }, ttl: 0 })
            .pipe(filter(resource => resource.source === 'server'))
            .subscribe(resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.optional).toBe('optional attribute value');
                expect(resource.attributes.name).toBeFalsy();

                let request = {
                    data: null,
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    },
                    method: 'get',
                    url: 'http://yourdomain/api/v1/test_resources/1?fields[test_resources]=optional'
                };
                expect(mockedAxios.request).toHaveBeenCalledWith(request);

                done();
            });
    });

    it(`when requesting a resource with optional attributes, the incoming attributes should be merged with cached ones`, async () => {
        // TODO: fix library error: clearCache and clearCacheMemory are not droping localForage allstore instance correctly while testing

        Core.getInstance().injectedServices.JsonapiStoreService.clearCache();
        let test_service = new TestService();
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        let response = axiosResponseFactory(new HttpHandlerMock().handle(''));
        mockedAxios.request.mockResolvedValue(response);

        await test_service
            .get('1')
            .toPromise()
            .then(async resource => {
                expect(resource.type).toBe('test_resources');
                expect(resource.id).toBe('1');
                expect(resource.attributes.name).toBe('test_name');
                // @todo why? memory will not remove attributes if are not sent by server
                // for example two different requests with different list of fields (one request remove attributes of the another resource)
                // expect(resource.attributes.optional).toBeFalsy();

                let requestOne = {
                    data: null,
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    },
                    method: 'get',
                    url: 'http://yourdomain/api/v1/test_resources/1'
                };
                expect(mockedAxios.request).toHaveBeenCalledWith(requestOne);

                await test_service
                    .get('1', { fields: { test_resources: ['optional'] } })
                    .toPromise()
                    .then(resource_with_optional_attribute => {
                        expect(resource_with_optional_attribute.type).toBe('test_resources');
                        expect(resource_with_optional_attribute.id).toBe('1');
                        expect(resource_with_optional_attribute.attributes.name).toBe('test_name');
                        expect(resource_with_optional_attribute.attributes.optional).toBe('optional attribute value');
                        requestOne.url = 'http://yourdomain/api/v1/test_resources/1?fields[test_resources]=optional';
                        expect(mockedAxios.request).toHaveBeenCalledWith(requestOne);
                    });
            });
    });
});
