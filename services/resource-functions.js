/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class ResourceFunctions {
    /**
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    static resourceToResource(source, destination) {
        destination.attributes = source.attributes;
        // remove relationships on destination resource
        for (let /** @type {?} */ type_alias in destination.relationships) {
            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            }
            else {
                // this resource is a collection?
                if (!('id' in destination.relationships[type_alias].data)) {
                    for (let /** @type {?} */ id in destination.relationships[type_alias].data) {
                        if (!(id in source.relationships[type_alias].data)) {
                            delete destination.relationships[type_alias];
                        }
                    }
                }
            }
        }
        // add source relationships to destination
        for (let /** @type {?} */ type_alias in source.relationships) {
            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(/** @type {?} */ (source.relationships[type_alias].data), type_alias);
            }
            else {
                destination.addRelationships(/** @type {?} */ (source.relationships[type_alias].data), type_alias);
            }
        }
    }
}
//# sourceMappingURL=resource-functions.js.map