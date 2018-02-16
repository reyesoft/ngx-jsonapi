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
export class NoDuplicatedHttpCallsService {
    constructor() {
        this.calls = {};
    }
    /**
     * @param {?} path
     * @return {?}
     */
    hasPromises(path) {
        return path in this.calls;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getAPromise(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(path in this.calls)) {
                this.calls[path] = [];
            }
            let /** @type {?} */ deferred = new Deferred();
            // let deferred = this.$q.defer();
            this.calls[path].push(deferred);
            return deferred.promise;
        });
    }
    /**
     * @param {?} path
     * @param {?} promise
     * @return {?}
     */
    setPromiseRequest(path, promise) {
        return __awaiter(this, void 0, void 0, function* () {
            promise
                .then(success => {
                if (path in this.calls) {
                    for (let /** @type {?} */ promise2 of this.calls[path]) {
                        promise2.resolve(success);
                    }
                    delete this.calls[path];
                }
            })
                .catch(error => {
                if (path in this.calls) {
                    for (let /** @type {?} */ promise2 of this.calls[path]) {
                        promise2.reject(error);
                    }
                    delete this.calls[path];
                }
            });
        });
    }
}
function NoDuplicatedHttpCallsService_tsickle_Closure_declarations() {
    /** @type {?} */
    NoDuplicatedHttpCallsService.prototype.calls;
}
//# sourceMappingURL=noduplicatedhttpcalls.service.js.map