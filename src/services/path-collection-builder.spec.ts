import { Core } from '../core';
import { Service } from '../service';
import { PathBuilder } from './path-builder';
import { PathCollectionBuilder } from './path-collection-builder';
import { UrlParamsBuilder } from './url-params-builder';
import { JsonapiBootstrap } from '../bootstraps/jsonapi-bootstrap';

const testService = new Service();
testService.getPrePath = (): string => {
    return 'test/pre-path';
};
testService.getPath = (): string => {
    return 'test/path';
};
testService.getUrl = (): string => {
    console.log("inside getUrl", Core.me.injectedServices.rsJsonapiConfig.url);
    return Core.me.injectedServices.rsJsonapiConfig.url;
};

describe('Path Builder', () => {
    let path_collection_builder = new PathCollectionBuilder();

    beforeAll(() => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'http://yourdomain/api/v1/' } });
    });
    it('should create', () => {
        expect(path_collection_builder).toBeTruthy();
    });
    it('applyParams method should call parent applyParams method with the provided parameters', () => {
        let applyParams_parent_spy = spyOn(PathBuilder.prototype, 'applyParams');
        path_collection_builder.applyParams(testService);
        expect(applyParams_parent_spy).toHaveBeenCalledWith(testService, {});
    });

    it('if remotefilters are provided and service has parseToServer method, applyParams should call service\'s parseToServer method with them as parameter', () => {
        let parseToServer_spy = spyOn(testService, 'parseToServer');
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'status', value: 'test_status' } });
        expect(parseToServer_spy).toHaveBeenCalledWith({ operator: '=', field: 'status', value: 'test_status' });
    });

    it('if service does not have parseToServer method, applyParams should not try to call this method', () => {
        let parseToServer_null_spy = spyOn(testService, 'parseToServer');
        testService.parseToServer = null;
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'status', value: 'test_status' } });
        expect(parseToServer_null_spy).not.toHaveBeenCalled();
    });

    it('if remotefilters are provided, applyParams should call addParam with paramsurl.toparams result as parameter', () => {
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        let toparams_parent_spy = spyOn(UrlParamsBuilder.prototype, 'toparams');
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'status', value: 'test_status' } });
        let filterParsed = "equals(status,'test_status')";
        let test_params = new UrlParamsBuilder().toparams({ filter: filterParsed });
        expect(toparams_parent_spy).toHaveBeenCalledWith({ filter: filterParsed });
        expect(addParam_parent_spy).toHaveBeenCalledWith(test_params);
    });

    it('if fields are provided, they should be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, { fields: { authors: ['name', 'address'], books: ['title'] } });
        expect(path_collection_builder.get().includes('fields[authors]=name,address&fields[books]=title')).toBeTruthy();
    });

    it('if filter with characters such as "&" are provided, they must be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'status', value: 'foo&bar' } });
        expect(path_collection_builder.get().includes("filter=equals(status,'foo%26bar')")).toBeTruthy();
    });

    it('if filter with special characters like "=" and "?" are provided, they must be encoded and included in get_params', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'status', value: 'foo=bar?' } });
        expect(path_collection_builder.get().includes("filter=equals(status,'foo%3Dbar%3F')")).toBeTruthy();
    });

    it('if filter with null value is provided, it should be included as null', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'status', value: null } });
        expect(path_collection_builder.get().includes("filter=equals(status,null)")).toBeTruthy();
    });

    it('if filter with boolean value is provided, it should be included as true/false', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '=', field: 'active', value: true } });
        expect(path_collection_builder.get().includes("filter=equals(active,'true')")).toBeTruthy();
    });

    it('if filter with array value for "any" operator is provided, it should be formatted and included', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { operator: 'any', field: 'status', value: ['foo', 'bar'] } });
        expect(path_collection_builder.get().includes("filter=any(status,'foo','bar')")).toBeTruthy();
    });

    it('if logical "and" filter is provided, it should be formatted and included', () => {
        path_collection_builder.applyParams(testService, {
            remotefilter: {
                and: [
                    { operator: '=', field: 'status', value: 'active' },
                    { operator: '=', field: 'type', value: 'guest' }
                ]
            }
        });
        expect(path_collection_builder.get().includes("filter=and(equals(status,'active'),equals(type,'guest'))")).toBeTruthy();
    });

    it('if logical "or" filter is provided, it should be formatted and included', () => {
        path_collection_builder.applyParams(testService, {
            remotefilter: {
                or: [
                    { operator: '=', field: 'status', value: 'active' },
                    { operator: '=', field: 'status', value: 'pending' }
                ]
            }
        });
        expect(path_collection_builder.get().includes("filter=or(equals(status,'active'),equals(status,'pending'))")).toBeTruthy();
    });

    it('if "not" filter is provided, it should be formatted and included', () => {
        path_collection_builder.applyParams(testService, {
            remotefilter: {
                not: { operator: '=', field: 'status', value: 'archived' }
            }
        });
        expect(path_collection_builder.get().includes("filter=not(equals(status,'archived'))")).toBeTruthy();
    });

    it('if filter with numeric value is provided, it should be included as number', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { operator: '>', field: 'age', value: 18 } });
        expect(path_collection_builder.get().includes("filter=greaterThan(age,'18')") || path_collection_builder.get().includes("filter=age>18")).toBeTruthy();
    });

    it('if filter with multiple fields and operators is provided, it should be formatted and included', () => {
        path_collection_builder.applyParams(testService, {
            remotefilter: {
                and: [
                    { operator: 'contains', field: 'name', value: 'John' },
                    { operator: '>=', field: 'score', value: 50 }
                ]
            }
        });
        expect(path_collection_builder.get().includes("filter=and(contains(name,'John'),greaterOrEqual(score,'50'))") || path_collection_builder.get().includes("filter=and(contains(name,'John'),score>=50)")).toBeTruthy();
    });

    it('should not add filter param if remotefilter is not provided', () => {
        path_collection_builder.applyParams(testService, {});
        expect(path_collection_builder.get().includes('filter=')).toBeTruthy();
    });

    it('should handle empty sort array gracefully', () => {
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        path_collection_builder.applyParams(testService, { sort: [] });
        expect(addParam_parent_spy).not.toHaveBeenCalledWith('sort=');
    });

    it('should handle empty custom_http_params array gracefully', () => {
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        path_collection_builder.applyParams(testService, { custom_http_params: [] });
        expect(addParam_parent_spy).not.toHaveBeenCalled();
    });

    it('should add page number and size if provided', () => {
        path_collection_builder.applyParams(testService, { page: { number: 2, size: 10 } });
        const params = path_collection_builder.get();
        expect(params.includes('page[number]=2')).toBeTruthy();
        expect(params.includes('page[size]=10')).toBeTruthy();
    });

    it('should add only page size if page number is not greater than 1', () => {
        path_collection_builder.applyParams(testService, { page: { number: 1, size: 20 } });
        const params = path_collection_builder.get();
        expect(params.includes('page[number]=1')).toBeFalsy();
        expect(params.includes('page[size]=20')).toBeTruthy();
    });

    it('should add sort param if sort array is provided', () => {
        path_collection_builder.applyParams(testService, { sort: ['name', '-date'] });
        expect(path_collection_builder.get().includes('sort=name,-date')).toBeTruthy();
    });

    it('should add custom_http_params if provided', () => {
        path_collection_builder.applyParams(testService, { custom_http_params: ['foo=bar', 'baz=qux'] });
        expect(path_collection_builder.get().includes('foo=bar&baz=qux')).toBeTruthy();
    });
});