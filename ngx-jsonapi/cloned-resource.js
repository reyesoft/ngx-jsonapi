/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Resource } from './resource';
import { ClonedDocumentResource } from './cloned-document-resource';
import { cloneDeep } from 'lodash-es';
// unsupported: template constraints.
/**
 * @template T
 */
export class ClonedResource extends Resource {
    /**
     * @param {?} resource
     */
    constructor(resource) {
        super();
        // @note using cloneDeep because the parent may have changed since clone (example: data received from socket while editing clone)
        this.parent = cloneDeep(resource);
        this.type = this.parent.type; // this line should go to fill method?
        delete this.relationships;
        /** @type {?} */
        let include = Object.keys(this.parent.relationships);
        this.fill(this.parent.toObject({ include: include }));
        this.copySourceFromParent();
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    toObject(params) {
        return new ClonedDocumentResource(this, this.parent, params).getResourceObject();
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    superToObject(params) {
        return super.toObject(params);
    }
    /**
     * @return {?}
     */
    copySourceFromParent() {
        this.source = this.parent.source;
        for (let relationship in this.relationships) {
            this.relationships[relationship].source = this.parent.relationships[relationship].source;
        }
    }
}
if (false) {
    /** @type {?} */
    ClonedResource.prototype.parent;
    /** @type {?} */
    ClonedResource.prototype.attributes;
    /** @type {?} */
    ClonedResource.prototype.relationships;
}
//# sourceMappingURL=cloned-resource.js.map