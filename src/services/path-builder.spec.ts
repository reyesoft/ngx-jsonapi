import { Core } from '../core';
import { Service } from '../service';
import { PathBuilder } from './path-builder';
import { JsonapiConfig } from '../jsonapi-config';
import { StoreService as JsonapiStore } from '../sources/store.service';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

let core = new Core(
    new JsonapiConfig(),
    new JsonapiStore(),
    new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
);

const testService = new Service();
testService.getPrePath = (): string => {
    return 'test/pre-path';
};
testService.getPath = (): string => {
    return 'test/path';
};

describe('Path Builder', () => {
    let path_builder = new PathBuilder();
    it('should create', () => {
        expect(path_builder).toBeTruthy();
    });
    it('applyParams method should call appendPath two to four times: with service s pre-path, params.beforepath (if exists),\
     and service s path', () => {
        let appendPath_spy = spyOn(path_builder, 'appendPath');
        path_builder.applyParams(testService);
        expect(appendPath_spy).toHaveBeenCalledTimes(2);
        path_builder.applyParams(testService, { beforepath: 'pre/', include: ['include'] });
        expect(appendPath_spy).toHaveBeenCalledWith(testService.getPrePath());
        expect(appendPath_spy).toHaveBeenCalledWith('pre/');
        expect(appendPath_spy).toHaveBeenCalledWith(testService.getPath());
    });
    it('applyParams method should call setInclude with params.include (if exists) to assign them to the includes array', () => {
        let setInclude_spy = spyOn<any>(path_builder, 'setInclude');
        path_builder.applyParams(testService, { beforepath: 'pre/' });
        expect(setInclude_spy).not.toHaveBeenCalled();
        path_builder.applyParams(testService, { beforepath: 'pre/', include: ['include'] });
        expect(setInclude_spy).toHaveBeenCalledWith(['include']);
        expect(path_builder.includes).toEqual(['include']);
    });
    it('applyParams method should add fields to get_params if they are included in the request', () => {
        path_builder.applyParams(testService, { fields: { test: ['test_attribute'] } });
        expect((path_builder as any).get_params.indexOf('fields[test]=test_attribute')).toBeGreaterThan(-1);
    });
    it('appendPath method should add passed value to paths array (only if value is not an empty string)', () => {
        path_builder.paths = [];
        path_builder.appendPath('');
        expect(path_builder.paths.length).toBe(0);
        path_builder.appendPath('fake-path');
        expect(path_builder.paths.length).toBe(1);
        expect(path_builder.paths).toEqual(['fake-path']);
    });
    it('getForCache method should join paths array and get_params array and add them to return the resulting sting', () => {
        path_builder.paths = ['test', 'path'];
        (path_builder as any).get_params = ['and', 'test', 'params'];
        let path = path_builder.getForCache();
        // this creates test/pathand/tests/params instead of test/path/and/tests/params <= is this on purpose?
        expect(path).toBe(path_builder.paths.join('/') + (path_builder as any).get_params.join('/'));
    });
    it('if get_params length is 0, getForCache shouldn t add them to the resulting string', () => {
        path_builder.paths = ['test', 'path'];
        (path_builder as any).get_params = [];
        let path = path_builder.getForCache();
        expect(path).toBe(path_builder.paths.join('/'));
    });
    it('get method should join paths array and add params (joined and only if they exist) to return the resulting string', () => {
        path_builder.paths = ['test', 'path'];
        (path_builder as any).get_params = ['and', 'test', 'params'];
        path_builder.includes = [];
        Core.injectedServices.rsJsonapiConfig.params_separator = '?';
        let url_string = path_builder.get();
        expect(url_string).toBe('test/path?and&test&params');
    });
    it('if get_paramslength is 0, get method should not add the separator to the resulting string', () => {
        path_builder.paths = ['test', 'path'];
        (path_builder as any).get_params = [];
        path_builder.includes = [];
        Core.injectedServices.rsJsonapiConfig.params_separator = '?';
        let url_string = path_builder.get();
        expect(url_string).toBe('test/path');
    });
    it('get method should add include to the resulting string params (when needed)', () => {
        path_builder.paths = ['test', 'path'];
        (path_builder as any).get_params = ['and', 'test', 'params'];
        path_builder.includes = ['test', 'includes'];
        Core.injectedServices.rsJsonapiConfig.params_separator = '?';
        let url_string = path_builder.get();
        expect(url_string).toBe('test/path?and&test&params&include=test,includes');
    });
});
