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
export class JsonRipperFake {
    constructor() {
        this.enabled = false;
    }
    /**
     * @param {?} key
     * @param {?=} include
     * @return {?}
     */
    getResource(key, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return { data: { id: '', type: '', cache_last_update: 0 } };
        });
    }
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    getResourceByResource(resource, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getResource(resource.type, include);
        });
    }
    /**
     * @param {?} url
     * @param {?=} include
     * @return {?}
     */
    getCollection(url, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return { data: /** @type {?} */ ([]), cache_last_update: 0 };
        });
    }
    /**
     * @param {?} url
     * @param {?} collection
     * @param {?=} include
     * @return {?}
     */
    saveCollection(url, collection, include = []) { }
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    saveResource(resource, include = []) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * @param {?} key
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    static toResourceElements(key, resource, include = []) {
        return [];
    }
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    deprecateCollection(key_start_with) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
if (false) {
    /** @type {?} */
    JsonRipperFake.prototype.enabled;
}
//# sourceMappingURL=json-ripper-fake.js.map