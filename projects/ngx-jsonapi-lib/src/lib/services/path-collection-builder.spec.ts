import { StoreService } from '../sources/store.service';
import { JsonRipper } from '../services/json-ripper';
import { ClassProvider, Injector } from '@angular/core';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from '../core';
import { Service } from '../service';
import { PathBuilder } from './path-builder';
import { PathCollectionBuilder } from './path-collection-builder';
import { UrlParamsBuilder } from './url-params-builder';
import { JsonapiConfig } from '../jsonapi-config';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let subject: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse());

        return subject.asObservable();
    }
}

let injector: Injector = Injector.create([
    {
        provide: JSONAPI_RIPPER_SERVICE,
        useClass: JsonRipper
    } as ClassProvider,
    {
        provide: JSONAPI_STORE_SERVICE,
        useClass: StoreService
    } as ClassProvider
]);

let core: Core = new Core(
    new JsonapiConfig(),
    new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig()),
    injector
);

const testService: any = new Service();
testService.getPrePath = (): string => {
    return 'test/pre-path';
};
testService.getPath = (): string => {
    return 'test/path';
};

describe('Path Builder', () => {
    let path_collection_builder: PathCollectionBuilder = new PathCollectionBuilder();
    it('should create', () => {
        expect(path_collection_builder).toBeTruthy();
    });
    it('applyParams method should call parent applyParams method with the provided parameters', () => {
        const applyParams_parent_spy = jest.spyOn(PathBuilder.prototype, 'applyParams');
        path_collection_builder.applyParams(testService);
        expect(applyParams_parent_spy).toHaveBeenCalledWith(testService, {});
    });
    it('if remotefilters are provided and service has parseToServer method,\
     applyParams should call service s parseToServer method with them as parameter', () => {
        const parseToServer_spy = jest.spyOn(testService, 'parseToServer');
        path_collection_builder.applyParams(testService, {
            remotefilter: { status: 'test_status' }
        });
        expect(parseToServer_spy).toHaveBeenCalledWith({
            status: 'test_status'
        });
    });
    it('if filter with operator (ne) they should be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, {
            remotefilter: { status: { ne: 'archived' } }
        });
        expect(path_collection_builder.get().includes('filter[status][ne]=archived')).toBeTruthy();
    });
    it('if service does not have parseToServer method, applyParams should not try to call this method', () => {
        let parseToServer_spy = jest.spyOn(testService, 'parseToServer');
        path_collection_builder.applyParams(testService, {
            remotefilter: { status: 'test_status' }
        });
        parseToServer_spy.mockClear(); // Limpiar conteo antes de cambiar el método
        testService.parseToServer = null;
        path_collection_builder.applyParams(testService, {
            remotefilter: { status: { ne: 'archived' } }
        });
        expect(parseToServer_spy).not.toHaveBeenCalled();
    });
    it('if remotefilters are provided, applyParams should call addParam with paramsurl.toparams result as parameter', () => {
        const addParam_parent_spy = jest.spyOn(path_collection_builder as any, 'addParam');
        addParam_parent_spy.mockClear(); // Limpiar conteo
        const toparams_parent_spy = jest.spyOn(UrlParamsBuilder.prototype, 'toparams');
        path_collection_builder.applyParams(testService, {
            remotefilter: { status: 'test_status' }
        });
        const test_params: string = 'filter[status]=test_status'; // Ajustar valor esperado
        expect(toparams_parent_spy).toHaveBeenCalledWith({
            filter: { status: 'test_status' }
        });
        expect(addParam_parent_spy).toHaveBeenCalledWith(test_params);
    });

    it('if fields are provided, they should be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, {
            fields: { authors: ['name', 'address'], books: ['title'] }
        });
        expect(path_collection_builder.get().includes('fields[authors]=name,address&fields[books]=title')).toBeTruthy();
    });

    it('if filter with characters such as "&" are provided, they must be formatted and included in get_params', () => {
        path_collection_builder.applyParams(testService, {
            remotefilter: { field: 'foo&bar' }
        });
        expect(path_collection_builder.get().includes('filter[field]=foo%26bar')).toBeTruthy();
    });

    it('if page params are provided, applyParams should call addParam one or two times with the page number and size', () => {
        Core.injectedServices.rsJsonapiConfig.parameters = { page: { number: '', size: '' } };
        Core.injectedServices.rsJsonapiConfig.parameters.page.number = 'page_index';
        Core.injectedServices.rsJsonapiConfig.parameters.page.size = 'page_size';
        const addParam_parent_spy = jest.spyOn(path_collection_builder as any, 'addParam');
        addParam_parent_spy.mockClear(); // Limpiar conteo
        path_collection_builder.applyParams(testService, {
            page: { number: 2 }
        });
        expect(addParam_parent_spy).toHaveBeenCalledTimes(1);
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_index=2');
        addParam_parent_spy.mockClear(); // Limpiar conteo antes del siguiente bloque
        path_collection_builder.applyParams(testService, {
            page: { number: 2, size: 10 }
        });
        expect(addParam_parent_spy).toHaveBeenCalledTimes(2);
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_index=2');
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_size=10');
    });
    it('if page number param is 1, applyParams should not call addParam with page number', () => {
        Core.injectedServices.rsJsonapiConfig.parameters = { page: { number: '', size: '' } };
        Core.injectedServices.rsJsonapiConfig.parameters.page.number = 'page_index';
        Core.injectedServices.rsJsonapiConfig.parameters.page.size = 'page_size';
        const addParam_parent_spy = jest.spyOn(path_collection_builder as any, 'addParam');
        addParam_parent_spy.mockClear(); // Limpiar conteo
        path_collection_builder.applyParams(testService, {
            page: { number: 1 }
        });
        expect(addParam_parent_spy).not.toHaveBeenCalledWith('page_index=1');
        addParam_parent_spy.mockClear(); // Limpiar conteo antes del siguiente bloque
        path_collection_builder.applyParams(testService, {
            page: { number: 1, size: 10 }
        });
        expect(addParam_parent_spy).toHaveBeenCalledTimes(1);
        expect(addParam_parent_spy).toHaveBeenCalledWith('page_size=10');
    });
    it('applyParams method should add the provided params to get_params array', () => {
        Core.injectedServices.rsJsonapiConfig.parameters = { page: { number: '', size: '' } };
        Core.injectedServices.rsJsonapiConfig.parameters.page.number = 'page_index';
        Core.injectedServices.rsJsonapiConfig.parameters.page.size = 'page_size';
        (path_collection_builder as any).get_params = [];
        path_collection_builder.applyParams(testService, {
            remotefilter: { status: 'test_status' },
            page: { number: 2, size: 10 }
        });
        expect((path_collection_builder as any).get_params.length).toBe(3);
        expect((path_collection_builder as any).get_params).toEqual(['filter[status]=test_status', 'page_index=2', 'page_size=10']);
    });
});
