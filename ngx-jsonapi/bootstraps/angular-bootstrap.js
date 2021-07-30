/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Core } from '../core';
import { JsonapiConfig } from '../jsonapi-config';
import { Http } from '../sources/http.service';
import { StoreFakeService } from '../sources/store-fake.service';
import { JsonRipperFake } from '../services/json-ripper-fake';
export class AngularBootstrap {
    /**
     * @param {?} user_config
     * @param {?=} jsonapiStore
     * @param {?=} jsonRipper
     * @return {?}
     */
    static bootstrap(user_config, jsonapiStore, jsonRipper) {
        /** @type {?} */
        let config = new JsonapiConfig();
        for (let k in config) {
            (/** @type {?} */ (config))[k] = user_config[k] !== undefined ? user_config[k] : (/** @type {?} */ (config))[k];
        }
        Core.getInstance().injectedServices = {
            JsonapiStoreService: jsonapiStore ? jsonapiStore : new StoreFakeService(),
            JsonapiHttp: new Http(),
            json_ripper: jsonRipper ? jsonRipper : new JsonRipperFake(),
            rsJsonapiConfig: config
        };
    }
}
//# sourceMappingURL=angular-bootstrap.js.map