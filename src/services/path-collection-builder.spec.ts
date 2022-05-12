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
    it('if remotefilters are provided and service has parseToServer method,\
     applyParams should call service s parseToServer method with them as parameter', () => {
        let parseToServer_spy = spyOn(testService, 'parseToServer');
        path_collection_builder.applyParams(testService, { remotefilter: { status: 'test_status' } });
        expect(parseToServer_spy).toHaveBeenCalledWith({ status: 'test_status' });
    });
    it('if service does not have parseToServer method, applyParams should not try to call this method', () => {
        let parseToServer_null_spy = spyOn(testService, 'parseToServer');
        testService.parseToServer = null;
        path_collection_builder.applyParams(testService, { remotefilter: { status: 'test_status' } });
        expect(parseToServer_null_spy).not.toHaveBeenCalled();
    });
    it('if remotefilters are provided, applyParams should call addParam with paramsurl.toparams result as parameter', () => {
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        let toparams_parent_spy = spyOn(UrlParamsBuilder.prototype, 'toparams');
        path_collection_builder.applyParams(testService, { remotefilter: { status: 'test_status' } });
        let test_params = new UrlParamsBuilder().toparams({ status: 'test_status' });
        expect(toparams_parent_spy).toHaveBeenCalledWith({ status: 'test_status' });
        expect(addParam_parent_spy).toHaveBeenCalledWith(test_params);
    });

    it('if fields are provided, they should be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, { fields: { authors: ['name', 'address'], books: ['title'] } });
        expect(path_collection_builder.get().includes('fields[authors]=name,address&fields[books]=title')).toBeTruthy();
    });

    it('if filter with characters such as "&" are provided, they must be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, { remotefilter: { field: 'foo&bar' } });
        expect(path_collection_builder.get().includes('filter[field]=foo%26bar')).toBeTruthy();
    });

    it('if page params are provided, applyParams should call addParam one or two times with the page number and size', () => {
        Core.me.injectedServices.rsJsonapiConfig.parameters.page.number = 'page_index';
        Core.me.injectedServices.rsJsonapiConfig.parameters.page.size = 'page_size';
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        path_collection_builder.applyParams(testService, { page: { number: 2 } });
        expect(addParam_parent_spy).toHaveBeenCalledTimes(1);
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_index=2');
        path_collection_builder.applyParams(testService, { page: { number: 2, size: 10 } });
        expect(addParam_parent_spy).toHaveBeenCalledTimes(3);
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_index=2');
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_size=10');
    });
    it('if page number param is 1, applyParams should not call addParam with page number', () => {
        Core.me.injectedServices.rsJsonapiConfig.parameters.page.number = 'page_index';
        Core.me.injectedServices.rsJsonapiConfig.parameters.page.size = 'page_size';
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        path_collection_builder.applyParams(testService, { page: { number: 1 } });
        expect(addParam_parent_spy).not.toHaveBeenCalled();
        path_collection_builder.applyParams(testService, { page: { number: 1, size: 10 } });
        expect(addParam_parent_spy).toHaveBeenCalledTimes(1);
        expect(addParam_parent_spy).not.toHaveBeenCalledWith('page_number=1');
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_size=10');
    });
    it('if sort params are provided, applyParams method should join the array with "," and call addParam with the resulting string', () => {
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        path_collection_builder.applyParams(testService, { sort: ['test', 'sort'] });
        expect(addParam_parent_spy).toHaveBeenCalledWith('sort=test,sort');
    });
    it('addParams method should push the provided string to the get_params array', () => {
        (path_collection_builder as any).get_params = [];
        (path_collection_builder as any).addParam('test_string');
        expect((path_collection_builder as any).get_params.length).toBe(1);
        expect((path_collection_builder as any).get_params).toEqual(['test_string']);
    });
    it('applyParams method should add the provided params to get_params array', () => {
        Core.me.injectedServices.rsJsonapiConfig.parameters.page.number = 'page_index';
        Core.me.injectedServices.rsJsonapiConfig.parameters.page.size = 'page_size';
        (path_collection_builder as any).get_params = [];
        path_collection_builder.applyParams(testService, { remotefilter: { status: 'test_status' }, page: { number: 2, size: 10 } });
        expect((path_collection_builder as any).get_params.length).toBe(3);
        expect((path_collection_builder as any).get_params).toEqual(['filter[status]=test_status', 'page_index=2', 'page_size=10']);
    });
    it('if custom_http_params params are provided, applyParams method should join the array with "&" and call addParam with the resulting string', () => {
        let addParam_parent_spy = spyOn<any>(path_collection_builder, 'addParam');
        path_collection_builder.applyParams(testService, { custom_http_params: ['param1', 'param2'] });
        expect(addParam_parent_spy).toHaveBeenCalledWith('param1&param2');
    });
});
