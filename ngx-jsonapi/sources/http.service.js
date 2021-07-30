/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Core } from '../core';
import axios from 'axios';
export class Http {
    constructor() {
        this.get_requests = {};
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @return {?}
     */
    exec(path, method, data) {
        /** @type {?} */
        let config = {
            url: Core.me.injectedServices.rsJsonapiConfig.url + path,
            method: method,
            data: data || null,
            headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            }
        };
        if (method === 'get') {
            if (!this.get_requests[path]) {
                /** @type {?} */
                let obs = new Observable((observer) => {
                    axios.request(config)
                        .then((response) => {
                        observer.next(/** @type {?} */ (response.data));
                        observer.complete();
                    })
                        .catch((error) => {
                        observer.error(error);
                    });
                }).pipe(tap(() => {
                    delete this.get_requests[path];
                }), share());
                this.get_requests[path] = obs;
                return obs;
            }
            return this.get_requests[path];
        }
        return new Observable((observer) => {
            axios.request(config)
                .then((response) => {
                observer.next(/** @type {?} */ (response.data));
                observer.complete();
            })
                .catch((error) => {
                observer.error(error);
            });
        }).pipe(tap(() => {
            delete this.get_requests[path];
        }), share());
    }
}
if (false) {
    /** @type {?} */
    Http.prototype.get_requests;
}
//# sourceMappingURL=http.service.js.map