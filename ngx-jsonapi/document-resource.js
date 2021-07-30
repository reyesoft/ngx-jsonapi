/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CacheMemory } from './services/cachememory';
import { Resource } from './resource';
import { Document } from './document';
// unsupported: template constraints.
/**
 * @template R
 */
export class DocumentResource extends Document {
    constructor() {
        super(...arguments);
        this.data = /** @type {?} */ (new Resource());
        this.builded = false;
        this.content = 'id';
    }
    /**
     * @param {?} data_resource
     * @return {?}
     */
    fill(data_resource) {
        this.builded = false;
        this.content = 'id';
        if (data_resource === null) {
            this.data = null;
            return;
        }
        if (!this.data) {
            this.data = /** @type {?} */ (CacheMemory.getInstance().getOrCreateResource(data_resource.data.type, data_resource.data.id));
        }
        if (this.data.fill(data_resource)) {
            this.builded = true;
            this.content = 'resource';
        }
        this.meta = data_resource.meta || {};
    }
    /**
     * @return {?}
     */
    unsetData() {
        this.data = undefined;
        this.builded = false;
    }
}
if (false) {
    /** @type {?} */
    DocumentResource.prototype.data;
    /** @type {?} */
    DocumentResource.prototype.builded;
    /** @type {?} */
    DocumentResource.prototype.content;
}
//# sourceMappingURL=document-resource.js.map