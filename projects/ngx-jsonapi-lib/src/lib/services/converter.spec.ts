import { StoreService } from '../sources/store.service';
import { JsonRipper } from '../services/json-ripper';
import { ClassProvider, Injector } from '@angular/core';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from '../core';
import { Converter } from './converter';
import { JsonapiConfig } from '../jsonapi-config';
import { Http as JsonapiHttpImported } from '../sources/http.service';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResourcesByType } from '../interfaces/resources-by-type';
import { Service } from '../service';
import { Resource } from '../resource';

class HttpHandlerMock implements HttpHandler {
    private subject: BehaviorSubject<HttpResponse<any>>;
    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        this.subject = new BehaviorSubject(new HttpResponse());
        return this.subject.asObservable();
    }
    public complete() {
        if (this.subject) {
            this.subject.complete();
        }
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

class SomeTypeResource extends Resource {
    public type = 'sometype';
    public id = '';
    public attributes: any = {};
    public relationships: any = {};
    public links: any = {};
    public meta: any = {};
}
class SomeTypeService extends Service<SomeTypeResource> {
    public type = 'sometype';
    public resource = SomeTypeResource;
    public constructor() {
        super();
        this.register();
    }
}
const someTypeService = new SomeTypeService();
someTypeService.register();

describe('Converter', () => {
    it('json_array2resources_array_by_type(array) should be converted to IResourcesByType', () => {
        let converted: IResourcesByType = Converter.json_array2resources_array_by_type([
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
