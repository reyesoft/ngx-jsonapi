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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class StoreFakeService {
    /**
     * @param {?} type
     * @param {?} id_or_url
     * @return {?}
     */
    getDataObject(type, id_or_url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === 'collection') {
                return /** @type {?} */ ({ data: [], cache_last_update: 0 });
            }
            return /** @type {?} */ ({ cache_last_update: Date.now(), id: '', type: '' });
        });
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    getDataResources(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    /**
     * @param {?} type
     * @param {?} url_or_id
     * @param {?} value
     * @return {?}
     */
    saveResource(type, url_or_id, value) { }
    /**
     * @param {?} url_or_id
     * @param {?} value
     * @return {?}
     */
    saveCollection(url_or_id, value) { }
    /**
     * @return {?}
     */
    clearCache() { }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    deprecateResource(type, id) { }
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    deprecateCollection(key_start_with) { }
    /**
     * @param {?} key
     * @return {?}
     */
    removeObjectsWithKey(key) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=store-fake.service.js.map