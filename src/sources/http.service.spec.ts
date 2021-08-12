import { async } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Http } from './http.service';
import axios, { AxiosRequestConfig } from 'axios';
import { AngularBootstrap } from '../bootstraps/angular-bootstrap';

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Http service', () => {
    let service: Http = new Http();
    let data_object = {
        data: {
            type: 'data',
            id: 'id'
        }
    };
    beforeEach(async(() => {
        AngularBootstrap.bootstrap({ url: 'some-url' });
    }));
    it('should create Http service', () => {
        expect(service).toBeTruthy();
    });
    it('exec should return an observable with the http request', (done) => {
        let request = mockedAxios.request.mockResolvedValue(data_object);
        let exec_observable = service.exec('/test', 'patch', data_object);
        exec_observable.subscribe(data => {
            expect(request).toHaveBeenCalledTimes(1)
            expect(data).toEqual(data_object.data);
            done();
        });
    });
    it(`when two requests to the same URL, and the second is made before the first has finished,
        exec should return the same observable with the http request without duplicating`, (done) => {
        mockedAxios.request.mockResolvedValue(data_object);
        let exec_observable = service.exec('/test', 'patch', data_object);
        let second_exec_observable = service.exec('/test', 'patch', data_object);
        second_exec_observable.subscribe(data => {
            expect(data).toEqual(data_object.data);
            done();
        });
        exec_observable.subscribe(data => {
            expect(data).toEqual(data_object.data);
            done();
        });
    });
});
