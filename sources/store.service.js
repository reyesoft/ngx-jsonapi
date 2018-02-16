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
import * as localForage from 'localforage';
import { Base } from '../services/base';
import { noop } from 'rxjs/util/noop';
import { Deferred } from '../shared/deferred';
/**
 * @record
 */
function IStoreElement() { }
function IStoreElement_tsickle_Closure_declarations() {
    /** @type {?} */
    IStoreElement.prototype.time;
}
/**
 * @record
 */
function IStoreElement2() { }
function IStoreElement2_tsickle_Closure_declarations() {
    /** @type {?} */
    IStoreElement2.prototype._lastupdate_time;
}
export class StoreService {
    constructor() {
        this.globalstore = localForage.createInstance({
            name: 'jsonapiglobal',
        });
        this.allstore = localForage.createInstance({ name: 'allstore' });
        this.checkIfIsTimeToClean();
    }
    /**
     * @return {?}
     */
    checkIfIsTimeToClean() {
        // check if is time to check cachestore
        this.globalstore
            .getItem('_lastclean_time')
            .then((success) => {
            if (Date.now() >= success.time + 12 * 3600 * 1000) {
                // is time to check cachestore!
                this.globalstore.setItem('_lastclean_time', {
                    time: Date.now(),
                });
                this.checkAndDeleteOldElements();
            }
        })
            .catch(() => {
            this.globalstore.setItem('_lastclean_time', {
                time: Date.now(),
            });
        });
    }
    /**
     * @return {?}
     */
    checkAndDeleteOldElements() {
        this.allstore
            .keys()
            .then(success => {
            Base.forEach(success, key => {
                // recorremos cada item y vemos si es tiempo de removerlo
                this.allstore
                    .getItem(key)
                    .then((success2) => {
                    // es tiempo de removerlo?
                    if (Date.now() >=
                        success2._lastupdate_time + 24 * 3600 * 1000) {
                        // removemos!!
                        this.allstore.removeItem(key);
                    }
                })
                    .catch(noop);
            });
        })
            .catch(noop);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getObjet(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ deferred = new Deferred();
            this.allstore
                .getItem('jsonapi.' + key)
                .then(success => {
                deferred.resolve(success);
            })
                .catch(error => {
                deferred.reject(error);
            });
            return deferred.promise;
        });
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    getObjets(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.allstore.getItem('jsonapi.' + keys[0]);
        });
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    saveObject(key, value) {
        value._lastupdate_time = Date.now();
        this.allstore.setItem('jsonapi.' + key, value);
    }
    /**
     * @return {?}
     */
    clearCache() {
        this.allstore.clear();
        this.globalstore.clear();
    }
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    deprecateObjectsWithKey(key_start_with) {
        this.allstore
            .keys()
            .then(success => {
            Base.forEach(success, (key) => {
                if (key.startsWith(key_start_with)) {
                    // key of stored object starts with key_start_with
                    this.allstore
                        .getItem(key)
                        .then((success2) => {
                        success2._lastupdate_time = 0;
                        this.allstore.setItem(key, success2);
                    })
                        .catch(noop);
                }
            });
        })
            .catch(noop);
    }
}
function StoreService_tsickle_Closure_declarations() {
    /** @type {?} */
    StoreService.prototype.globalstore;
    /** @type {?} */
    StoreService.prototype.allstore;
}
//# sourceMappingURL=store.service.js.map