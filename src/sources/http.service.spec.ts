import { async, TestBed } from '@angular/core/testing';
import { JsonapiConfig } from '../jsonapi-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { tap, mapTo, share } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';

import { Http } from './http.service';

class JsonapiConfigMock {
    public url: string = 'some-url';
}

describe('Http service', () => {
    let service: Http;
    let data_object = {
        data: {
            type: 'data',
            id: 'id'
        },
        meta: { meta: 'meta' }
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Http, { provide: JsonapiConfig, useValue: JsonapiConfigMock }]
        }).compileComponents();
    }));
    it('should create Http service', () => {
        service = TestBed.get(Http);
        expect(service).toBeTruthy();
    });
    it('exec should return an observable with the http request', async () => {
        let response = of(data_object);
        spyOn((service as any).http, 'request').and.returnValue(response);
        let exec_observable = service.exec('/test', 'patch', data_object);
        await exec_observable.subscribe(data => expect(data).toEqual(data_object));
    });
    // it('if exec is called with "get" method as argument, the returned observable should be shared', async () => {
    //     let response = 0;
    //     let request_observable = of(response).pipe(tap(() => response++));
    //     let http_request_spy = spyOn((service as any).http, 'request').and.returnValue(request_observable);
    //     let get_observable = service.exec('/test', 'get', data_object);
    //     await get_observable.subscribe(data => expect(data).toBe(0));
    //     await get_observable.subscribe(data => expect(data).toBe(0));
    //     await get_observable.subscribe(data => expect(data).toBe(0));
    //     expect(response).toBe(1);
    // });
    // it('test shared observables example', async () => {
    //     let source = timer(0);
    //     // log side effect, emit result
    //     let example = source.pipe(
    //         tap(() => console.log('-----tap-----')),
    //         mapTo('-----response-----')
    //     );
    //
    //     function testObservable(share_obs = false) {
    //         // putting the code inside the method makes a new observable every time, so share() fails
    //         // let source = timer(0);
    //         // // log side effect, emit result
    //         // let example = source.pipe(
    //         //     tap(() => { console.log('-----tap-----'); observableCallTester(); }),
    //         //     mapTo('-----response-----')
    //         // );
    //
    //         if (share_obs) example = example.pipe(share());
    //
    //         return example;
    //     }
    //
    //     await testObservable(false).subscribe(val => console.log(val));
    //     await testObservable(false).subscribe(val => console.log(val));
    //
    //     await testObservable(true).subscribe(val => console.log(val));
    //     await testObservable(true).subscribe(val => console.log(val));
    // });
});
