/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Resource } from './resource';
import { isClonedResource } from './interfaces/cloned-resource';
import { isEqual } from 'lodash-es';
export class ClonedDocumentResource {
    /**
     * @param {?} cloned_resource
     * @param {?} parent_resource
     * @param {?=} params
     */
    constructor(cloned_resource, parent_resource, params) {
        // calling toObject two times because we need different objects
        if (parent_resource instanceof Resource) {
            this.parent_resource_object = parent_resource.toObject(params);
        }
        else {
            this.parent_resource_object = { data: parent_resource };
        }
        if (isClonedResource(cloned_resource)) {
            this.resource_object = cloned_resource.superToObject(params);
        }
        else {
            this.resource_object = { data: cloned_resource };
        }
        this.removeDuplicatedAttributes();
        this.removeDuplicatedRelationships();
        this.removeDuplicatedIncludes();
    }
    /**
     * @return {?}
     */
    getResourceObject() {
        return this.resource_object;
    }
    /**
     * @return {?}
     */
    removeDuplicatedIncludes() {
        if (!this.resource_object.included || !this.parent_resource_object.included) {
            return this;
        }
        /** @type {?} */
        let parent_included = this.parent_resource_object.included;
        this.resource_object.included = this.resource_object.included.filter(included_resource => {
            return !isEqual(included_resource, parent_included.find(include => include.id === included_resource.id));
        });
        this.resource_object.included = this.resource_object.included.map(included => {
            if (!parent_included.find(include => include.id === included.id)) {
                return included;
            }
            return new ClonedDocumentResource(included, parent_included.find(include => include.id === included.id)).getResourceObject()
                .data;
        });
        return this;
    }
    /**
     * @return {?}
     */
    removeDuplicatedRelationships() {
        if (!this.resource_object.data.relationships || !this.parent_resource_object.data.relationships) {
            return this;
        }
        for (let relationship in this.resource_object.data.relationships) {
            if (isEqual(this.resource_object.data.relationships[relationship], this.parent_resource_object.data.relationships[relationship])) {
                delete this.resource_object.data.relationships[relationship];
            }
        }
        return this;
    }
    /**
     * @return {?}
     */
    removeDuplicatedAttributes() {
        if (!this.resource_object.data.attributes || !this.parent_resource_object.data.attributes) {
            return this;
        }
        for (let attribute in this.resource_object.data.attributes) {
            if (this.resource_object.data.attributes[attribute] === this.parent_resource_object.data.attributes[attribute]) {
                delete this.resource_object.data.attributes[attribute];
            }
        }
        return this;
    }
}
if (false) {
    /** @type {?} */
    ClonedDocumentResource.prototype.resource_object;
    /** @type {?} */
    ClonedDocumentResource.prototype.parent_resource_object;
}
//# sourceMappingURL=cloned-document-resource.js.map