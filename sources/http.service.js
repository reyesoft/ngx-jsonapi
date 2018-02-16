var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Deferred } from '../shared/deferred';
import { Injectable } from '@angular/core';
import { NoDuplicatedHttpCallsService } from '../services/noduplicatedhttpcalls.service';
import { Core } from '../core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
export class Http {
    /**
     * @param {?} http
     * @param {?} rsJsonapiConfig
     * @param {?} noDuplicatedHttpCallsService
     */
    constructor(http, rsJsonapiConfig, noDuplicatedHttpCallsService // private $q
    ) {
        this.http = http;
        this.rsJsonapiConfig = rsJsonapiConfig;
        this.noDuplicatedHttpCallsService = noDuplicatedHttpCallsService;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exec(path, 'DELETE');
        });
    }
    /**
     * @param {?} path
     * @return {?}
     */
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exec(path, 'get');
        });
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @param {?=} call_loadings_error
     * @return {?}
     */
    exec(path, method, data, call_loadings_error = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ fakeHttpPromise = null;
            // http request (if we don't have any GET request yet)
            if (method !== 'get' ||
                !this.noDuplicatedHttpCallsService.hasPromises(path)) {
                let /** @type {?} */ req = new HttpRequest(method, this.rsJsonapiConfig.url + path, data || null, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/vnd.api+json',
                        'Accept': 'application/vnd.api+json'
                    })
                });
                let /** @type {?} */ http_observable = this.http.request(req);
                if (method === 'get') {
                    this.noDuplicatedHttpCallsService.setPromiseRequest(path, http_observable.toPromise());
                }
                else {
                    fakeHttpPromise = http_observable.toPromise();
                }
            }
            if (fakeHttpPromise === null) {
                // method === 'get'
                fakeHttpPromise = this.noDuplicatedHttpCallsService.getAPromise(path);
            }
            let /** @type {?} */ deferred = new Deferred();
            Core.me.refreshLoadings(1);
            fakeHttpPromise
                .then(success => {
                success = success.body || success;
                Core.me.refreshLoadings(-1);
                deferred.resolve(success);
            })
                .catch(error => {
                error = error.error || error;
                Core.me.refreshLoadings(-1);
                if (error.status <= 0) {
                    // offline?
                    if (!Core.me.loadingsOffline(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                    }
                }
                else {
                    if (call_loadings_error && !Core.me.loadingsError(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
                    }
                }
                deferred.reject(error);
            });
            return deferred.promise;
        });
    }
}
Http.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Http.ctorParameters = () => [
    { type: HttpClient, },
    { type: JsonapiConfig, },
    { type: NoDuplicatedHttpCallsService, },
];
function Http_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Http.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Http.ctorParameters;
    /** @type {?} */
    Http.prototype.http;
    /** @type {?} */
    Http.prototype.rsJsonapiConfig;
    /** @type {?} */
    Http.prototype.noDuplicatedHttpCallsService;
}
//# sourceMappingURL=http.service.js.map