import { Deferred } from '../shared/deferred';
import { Injectable } from '@angular/core';
import { IDataObject } from '../interfaces/data-object';
import { NoDuplicatedHttpCallsService } from '../services/noduplicatedhttpcalls.service';
import { Base } from '../services/base';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JsonapiConfig } from '../jsonapi-config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class Http {
    public constructor(
        private http: HttpClient,
        private rsJsonapiConfig: JsonapiConfig,
        private noDuplicatedHttpCallsService: NoDuplicatedHttpCallsService // private $q
    ) {}

    public async exec(path: string, method: string, data?: IDataObject): Promise<any> {
        let fakeHttpPromise = null;

        // http request (if we don't have any GET request yet)
        if (method !== 'get' || !this.noDuplicatedHttpCallsService.hasPromises(path)) {
            let req = new HttpRequest(method, this.rsJsonapiConfig.url + path, data || null, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/vnd.api+json',
                    Accept: 'application/vnd.api+json'
                })
            });

            let http_observable = this.http.request(req);

            if (method === 'get') {
                this.noDuplicatedHttpCallsService.setPromiseRequest(path, http_observable.toPromise());
            } else {
                return (fakeHttpPromise = http_observable.toPromise());
            }
        }
        if (fakeHttpPromise === null) {
            // method === 'get'
            fakeHttpPromise = this.noDuplicatedHttpCallsService.getAPromise(path);
        }

        return fakeHttpPromise;
    }
}
