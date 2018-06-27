import { TestBed, getTestBed } from '@angular/core/testing';
import { Http } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoDuplicatedHttpCallsService } from '../services/noduplicatedhttpcalls.service';
import { JsonapiConfig } from '../jsonapi-config';
import { Core } from '../core';

// TODO: completar después de COL-1448 => fix ciercular dependencies
jest.mock('../core');

describe('http service test', () => {
    let injector: TestBed;
    let httpMock: HttpTestingController;
    let http: Http;

    beforeEach(() => {
        // Core.mockClear();
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ Http, JsonapiConfig, NoDuplicatedHttpCallsService, Core ]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        http = injector.get(Http);
    });
    // afterEach(() => {
    //     httpMock.verify();
    // });
    it('delete method should call exec method with the passed sting (path) and "DELETE" as arguments', () => {
        let exec_spy = spyOn(http, 'exec');
        http.delete('something_to_delete');
        expect(exec_spy).toHaveBeenCalledWith('something_to_delete', 'DELETE');
    });
    it('delete method should return a promise', () => {
        expect(http.delete('something_to_delete').then(() => { return true; })).toBeTruthy();
    });
    it('delete method should return an Promise<IDataObject>', () => {
        // can't test due to circular dependencies
    });
    it('get method should call exec method with the passed sting (path) and "get" as arguments', () => {
        let exec_spy = spyOn(http, 'exec');
        http.get('something_to_get');
        expect(exec_spy).toHaveBeenCalledWith('something_to_get', 'get');
    });
    it('get method should return a promise', () => {
        expect(http.get('something_to_get').then(() => { return true; })).toBeTruthy();
    });
    it('get method should return an Promise<IDataObject>', () => {
        // can't test due to circular dependencies
    });
    it('exec method should return a promise', () => {
        expect(http.exec('something_to_get', 'get').then(() => { return true; })).toBeTruthy();
    });
    it('exec method should return an Promise<IDataObject>', () => {
        // can't test due to circular dependencies
    });
});
