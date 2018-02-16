/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Core } from '../core';
import { Resource } from '../resource';
import { ResourceRelationshipsConverter } from './resource-relationships-converter';
import { Base } from '../services/base';
export class Converter {
    /**
     * @param {?} json_array
     * @param {?=} destination_array
     * @return {?}
     */
    static json_array2resources_array(json_array, destination_array = {}) {
        for (let /** @type {?} */ data of json_array) {
            let /** @type {?} */ resource = Converter.json2resource(data, false);
            destination_array[resource.type + '_' + resource.id] = resource;
        }
    }
    /**
     * @param {?} json_array
     * @return {?}
     */
    static json_array2resources_array_by_type(json_array) {
        let /** @type {?} */ all_resources = {};
        let /** @type {?} */ resources_by_type = {};
        Converter.json_array2resources_array(json_array, all_resources);
        Base.forEach(all_resources, (resource) => {
            if (!(resource.type in resources_by_type)) {
                resources_by_type[resource.type] = {};
            }
            resources_by_type[resource.type][resource.id] = resource;
        });
        return resources_by_type;
    }
    /**
     * @param {?} json_resource
     * @param {?} instance_relationships
     * @return {?}
     */
    static json2resource(json_resource, instance_relationships) {
        let /** @type {?} */ resource_service = Converter.getService(json_resource.type);
        if (resource_service) {
            return Converter.procreate(json_resource);
        }
        else {
            // service not registered
            console.warn('`' + json_resource.type + '`', 'service not found on json2resource()');
            let /** @type {?} */ temp = new Resource();
            temp.id = json_resource.id;
            temp.type = json_resource.type;
            return temp;
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static getService(type) {
        let /** @type {?} */ resource_service = Core.me.getResourceService(type);
        return resource_service;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static procreate(data) {
        if (!('type' in data && 'id' in data)) {
            console.error('Jsonapi Resource is not correct', data);
        }
        let /** @type {?} */ resource;
        if (data.id in Converter.getService(data.type).cachememory.resources) {
            resource = Converter.getService(data.type).cachememory.resources[data.id];
        }
        else {
            resource = Converter.getService(data.type).cachememory.getOrCreateResource(data.type, data.id);
        }
        resource.attributes = data.attributes || {};
        resource.is_new = false;
        return resource;
    }
    /**
     * @param {?} document_from
     * @param {?} resource_dest
     * @return {?}
     */
    static build(document_from, resource_dest) {
        // instancio los include y los guardo en included arrary
        let /** @type {?} */ included_resources = {};
        if ('included' in document_from) {
            included_resources = Converter.json_array2resources_array_by_type(document_from.included);
        }
        if (Array.isArray(document_from.data)) {
            Converter._buildCollection(/** @type {?} */ (document_from), /** @type {?} */ (resource_dest), included_resources);
        }
        else {
            Converter._buildResource(document_from.data, /** @type {?} */ (resource_dest), included_resources);
        }
    }
    /**
     * @param {?} collection_data_from
     * @param {?} collection_dest
     * @param {?} included_resources
     * @return {?}
     */
    static _buildCollection(collection_data_from, collection_dest, included_resources) {
        // sometime get Cannot set property 'number' of undefined (page)
        if (collection_dest.page && collection_data_from.meta) {
            collection_dest.page.number = collection_data_from.meta["page"] || 1;
            collection_dest.page.resources_per_page =
                collection_data_from.meta["resources_per_page"] || null;
            collection_dest.page.total_resources =
                collection_data_from.meta["total_resources"] || null;
        }
        // convert and add new dataresoures to final collection
        let /** @type {?} */ new_ids = {};
        for (let /** @type {?} */ dataresource of collection_data_from.data) {
            if (!(dataresource.id in collection_dest)) {
                collection_dest[dataresource.id] = Converter.getService(dataresource.type).cachememory.getOrCreateResource(dataresource.type, dataresource.id);
            }
            Converter._buildResource(dataresource, collection_dest[dataresource.id], included_resources);
            new_ids[dataresource.id] = dataresource.id;
        }
        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        Base.forEach(collection_dest, resource => {
            if (!(resource.id in new_ids)) {
                delete collection_dest[resource.id];
            }
        });
    }
    /**
     * @param {?} resource_data_from
     * @param {?} resource_dest
     * @param {?} included_resources
     * @return {?}
     */
    static _buildResource(resource_data_from, resource_dest, included_resources) {
        resource_dest.id = resource_data_from.id || '';
        resource_dest.attributes = resource_data_from.attributes || {};
        resource_dest.is_new = false;
        let /** @type {?} */ service = Converter.getService(resource_data_from.type);
        // esto previene la creación indefinida de resources
        // el servicio debe estar sino no tenemos el schema
        if (!resource_dest.relationships || !service) {
            return;
        }
        Converter.getService(resource_data_from.type).parseFromServer(resource_dest.attributes);
        new ResourceRelationshipsConverter(Converter.getService, resource_data_from.relationships || {}, resource_dest.relationships, included_resources, service.schema).buildRelationships();
    }
}
//# sourceMappingURL=converter.js.map