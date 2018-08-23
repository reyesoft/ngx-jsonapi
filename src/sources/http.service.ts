import { Deferred } from '../shared/deferred';
import { Injectable } from '@angular/core';
import { IDataObject } from '../interfaces/data-object';
import { NoDuplicatedHttpCallsService } from '../services/noduplicatedhttpcalls.service';
import { Base } from '../services/base';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JsonapiConfig } from '../jsonapi-config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Http {
    public constructor(
        private http: HttpClient,
        private rsJsonapiConfig: JsonapiConfig,
        private noDuplicatedHttpCallsService: NoDuplicatedHttpCallsService // private $q
    ) {}

    public async exec(path: string, method: string, data?: IDataObject): Promise<any> {
        // http request (if we don't have any GET request yet)
        let req = new HttpRequest(method, this.rsJsonapiConfig.url + path, data || null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            })
        });

        // share method !== 'get'

        return this.http
            .request(req)
            .pipe
            // publishRep
            ();
    }
}
