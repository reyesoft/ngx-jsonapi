// WARNING: this test is not correctly isolated

import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { JsonapiConfig } from './jsonapi-config';
import { StoreService as JsonapiStore } from './sources/store.service';
import { Core } from './core';
import { Observable, BehaviorSubject } from 'rxjs';

class HttpHandlerMock implements HttpHandler {
  public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      let subject = new BehaviorSubject(new HttpResponse());

      return subject.asObservable();
  }
}

describe('core methods', () => {
    let core: Core;
    it('should crete core service instance', () => {
        spyOn(JsonapiStore.prototype, 'constructor');
        core = new Core(
            new JsonapiConfig(),
            new JsonapiStore(),
            new JsonapiHttpImported(new HttpClient(new HttpHandlerMock()), new JsonapiConfig())
        );
        expect(core).toBeTruthy();
    });
    it('when exec method s response is an error, it should return a correctly formatted jsonapi error', () => {
        let data_resource = {
            type: 'data',
            id: '1'
        };
        // spyOn(Core.injectedServices.JsonapiHttp, 'exec').and.returnValue(new BehaviorSubject({error: 'error!'}));
        // spyOn(Core.injectedServices.JsonapiHttp, 'exec').and.returnValue({ hola: 'hola' });
        spyOn(Core.injectedServices.JsonapiHttp, 'exec').and.returnValue(Observable.create((observer) => {
            console.log('in mocked exec');
            observer.next('data1');
            observer.next(observer.error('error'));
        }));
        Core.exec('path', 'method', { data: data_resource }).subscribe(
            (data) => console.log('recieved data', data),
            err => console.log(err)
        );
    });
});
