/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @typedef {?} */
var SourceType;
export { SourceType };
/**
 * @record
 */
function IDocumentHasIds() { }
/** @type {?} */
IDocumentHasIds.prototype.data;
/** @type {?} */
IDocumentHasIds.prototype.content;
/**
 * @record
 */
function IDocumentHasResources() { }
/** @type {?} */
IDocumentHasResources.prototype.data;
/** @type {?} */
IDocumentHasResources.prototype.content;
/**
 * @record
 */
function IDocumentHasId() { }
/** @type {?} */
IDocumentHasId.prototype.data;
/** @type {?} */
IDocumentHasId.prototype.content;
/**
 * @record
 */
function IDocumentHasResource() { }
/** @type {?} */
IDocumentHasResource.prototype.data;
/** @type {?} */
IDocumentHasResource.prototype.content;
export /* abstract */ class Document {
    constructor() {
        this.builded = false;
        this.is_loading = true;
        this.loaded = false;
        this.source = 'new';
        this.cache_last_update = 0;
        this.meta = {};
    }
}
if (false) {
    /** @type {?} */
    Document.prototype.data;
    /** @type {?} */
    Document.prototype.builded;
    /** @type {?} */
    Document.prototype.content;
    /** @type {?} */
    Document.prototype.is_loading;
    /** @type {?} */
    Document.prototype.loaded;
    /** @type {?} */
    Document.prototype.source;
    /** @type {?} */
    Document.prototype.cache_last_update;
    /** @type {?} */
    Document.prototype.meta;
}
//# sourceMappingURL=document.js.map