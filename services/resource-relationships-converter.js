/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { noop } from 'rxjs/util/noop';
import { Base } from '../services/base';
export class ResourceRelationshipsConverter {
    /**
     * @param {?} getService
     * @param {?} relationships_from
     * @param {?} relationships_dest
     * @param {?} included_resources
     * @param {?} schema
     */
    constructor(getService, relationships_from, relationships_dest, included_resources, schema) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
        this.schema = schema;
    }
    /**
     * @return {?}
     */
    buildRelationships() {
        // recorro los relationships levanto el service correspondiente
        Base.forEach(this.relationships_from, (relation_from_value, relation_key) => {
            // relation is in schema? have data or just links?
            if (!(relation_key in this.relationships_dest) &&
                'data' in relation_from_value) {
                this.relationships_dest[relation_key] = {
                    data: Base.newCollection(),
                    content: 'collection',
                };
            }
            // sometime data=null or simple { }
            if (!relation_from_value.data) {
                return;
            }
            if (this.schema.relationships[relation_key] &&
                this.schema.relationships[relation_key].hasMany) {
                // hasMany
                this.__buildRelationshipHasMany(relation_from_value, relation_key);
            }
            else {
                // hasOne
                this.__buildRelationshipHasOne(relation_from_value, relation_key);
            }
        });
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    __buildRelationshipHasMany(relation_from_value, relation_key // number to string?
    ) {
        let /** @type {?} */ relation_type = (relation_from_value.data[0] ? relation_from_value.data[0].type : '');
        // @todo: we need check schema. maybe relationship it's empty
        relation_type = relation_type || relation_key /* || schema.relationship.type */;
        if (this.getService(relation_type)) {
            this.__buildRelationshipCollection(relation_from_value, relation_key);
        }
        else {
            this.__buildRelationshipDataCollection(relation_from_value, relation_key);
        }
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    __buildRelationshipDataCollection(relation_from_value, relation_key // number to string?
    ) {
        // @todo: usar collection on data?
        this.relationships_dest[relation_key] = {
            data: relation_from_value.data,
            content: 'ids'
        };
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_key
     * @return {?}
     */
    __buildRelationshipCollection(relation_from_value, relation_key // number to string?
    ) {
        if (relation_from_value.data.length === 0) {
            // from data is an empty array, remove all data on relationship
            this.relationships_dest[relation_key] = {
                data: Base.newCollection(),
                content: 'collection'
            };
            return;
        }
        let /** @type {?} */ tmp_relationship_data = Base.newCollection();
        this.relationships_dest[relation_key].content = 'collection';
        Base.forEach(relation_from_value.data, (relation_value) => {
            let /** @type {?} */ tmp = this.__buildRelationship(relation_value, this.included_resources);
            // sometimes we have a cache like a services
            if (!('attributes' in tmp) &&
                tmp.id in this.relationships_dest[relation_key].data &&
                'attributes' in
                    this.relationships_dest[relation_key].data[tmp.id]) {
                tmp_relationship_data[tmp.id] = this.relationships_dest[relation_key].data[tmp.id];
            }
            else {
                tmp_relationship_data[tmp.id] = tmp;
            }
            // some resources are not a Resource object
            if (!('attributes' in tmp)) {
                this.relationships_dest[relation_key].content = 'ids';
            }
        });
        // REMOVE resources from cached collection
        // build an array with the news ids
        let /** @type {?} */ new_ids = {};
        Base.forEach(relation_from_value.data, (data_resource) => {
            new_ids[data_resource.id] = true;
        });
        // check if new ids are on destination. If not, delete resource
        Base.forEach(this.relationships_dest[relation_key].data, (relation_dest_value) => {
            if (!(relation_dest_value.id in new_ids)) {
                delete this.relationships_dest[relation_dest_value.id];
            }
        });
        this.relationships_dest[relation_key].data = tmp_relationship_data;
    }
    /**
     * @param {?} relation_data_from
     * @param {?} relation_data_key
     * @return {?}
     */
    __buildRelationshipHasOne(relation_data_from, relation_data_key // number to string?
    ) {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_data_key].data = {};
            return;
        }
        if (this.relationships_dest[relation_data_key].data == null ||
            relation_data_from.data.id !==
                (/** @type {?} */ (this.relationships_dest[relation_data_key].data)).id) {
            this.relationships_dest[relation_data_key].data = {};
        }
        // trae datos o cambió resource? actualizamos!
        if (
        // 'attributes' in relation_data_from.data ||  // ???
        !(/** @type {?} */ (this.relationships_dest[relation_data_key].data))
            .attributes ||
            // we have only a  dataresource
            (/** @type {?} */ (this.relationships_dest[relation_data_key].data)).id !==
                relation_data_from.data.id) {
            let /** @type {?} */ resource_data = this.__buildRelationship(relation_data_from.data, this.included_resources);
            this.relationships_dest[relation_data_key].data = resource_data;
        }
    }
    /**
     * @param {?} resource_data_from
     * @param {?} included_array
     * @return {?}
     */
    __buildRelationship(resource_data_from, included_array) {
        if (resource_data_from.type in included_array &&
            resource_data_from.id in included_array[resource_data_from.type]) {
            // it's in included
            return included_array[resource_data_from.type][resource_data_from.id];
        }
        else {
            // OPTIONAL: return cached Resource
            let /** @type {?} */ service = this.getService(resource_data_from.type);
            if (service &&
                resource_data_from.id in service.cachememory.resources) {
                return service.cachememory.resources[resource_data_from.id];
            }
            else {
                // we dont have information on included or memory. try pass to store
                if (service) {
                    service.cachestore
                        .getResource(resource_data_from)
                        .catch(noop);
                }
                return resource_data_from;
            }
        }
    }
}
function ResourceRelationshipsConverter_tsickle_Closure_declarations() {
    /** @type {?} */
    ResourceRelationshipsConverter.prototype.getService;
    /** @type {?} */
    ResourceRelationshipsConverter.prototype.relationships_from;
    /** @type {?} */
    ResourceRelationshipsConverter.prototype.relationships_dest;
    /** @type {?} */
    ResourceRelationshipsConverter.prototype.included_resources;
    /** @type {?} */
    ResourceRelationshipsConverter.prototype.schema;
}
//# sourceMappingURL=resource-relationships-converter.js.map