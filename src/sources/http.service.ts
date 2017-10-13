import { Deferred } from '../shared/deferred';
import { Injectable } from '@angular/core';
import { IDataObject } from '../interfaces/data-object';
import '../services/noduplicatedhttpcalls.service';
import { Core } from '../core';
import { Base } from '../services/base';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JsonapiConfig } from '../jsonapi-config';
import { NoDuplicatedHttpCallsService } from '../services/noduplicatedhttpcalls.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class Http {

    /** @ngInject */
    public constructor(
        private http: HttpClient,
        private rsJsonapiConfig: JsonapiConfig,
        // private $timeout,
        // private rsJsonapiConfig,
        private noDuplicatedHttpCallsService: NoDuplicatedHttpCallsService,
        // private $q
    ) {

    }

    public delete(path: string): Promise<IDataObject> {
        return this.exec(path, 'DELETE');
    }

    public get(path: string): Promise<IDataObject> {
        return this.exec(path, 'get');
    }

    protected exec(path: string, method: string, data?: IDataObject, call_loadings_error: boolean = true): Promise<IDataObject> {
        let fakeHttpPromise = null;

        // http request (if we don't have any GET request yet)
        if (method !== 'get' || !this.noDuplicatedHttpCallsService.hasPromises(path)) {

            let headers =new HttpHeaders({'Content-Type': 'application/vnd.api+json'});
            const req = new HttpRequest(
                method,
                this.rsJsonapiConfig.url + path,
                {
                    headers: headers,
                    body: data || null
                }
            );

            let http_observable = this.http.request(
                method,
                this.rsJsonapiConfig.url + path,
                req
            );

            if (method === 'get') {
                this.noDuplicatedHttpCallsService.setPromiseRequest(path, http_observable.toPromise());
            } else {
                fakeHttpPromise = http_observable;
            }
        }
        if (method === 'get') {
            fakeHttpPromise = this.noDuplicatedHttpCallsService.getAPromise(path);
        }

        let deferred: Deferred<IDataObject> = new Deferred();
        Core.me.refreshLoadings(1);
        fakeHttpPromise.then(
            success => {
                // timeout just for develop environment
                setTimeout(() => {
                    Core.me.refreshLoadings(-1);
                    deferred.resolve(success);
                }, this.rsJsonapiConfig.delay);
            }
        ).catch(
            error => {
                Core.me.refreshLoadings(-1);
                if (error.status <= 0) {
                    // offline?
                    if (!Core.me.loadingsOffline(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                    }
                } else {
                    if (call_loadings_error && !Core.me.loadingsError(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
                    }
                }
                deferred.reject(error);
            }
        );

        return deferred.promise;
    }
}

// migrationProblem
// angular.module('Jsonapi.services').service('JsonapiHttp', Http);
