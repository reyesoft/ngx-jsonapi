import { BehaviorSubject, Observable, Subject, noop, of, throwError } from 'rxjs';
import { catchError, map, share, tap } from 'rxjs/operators';
import axios from 'axios';
import { cloneDeep, isEqual } from 'lodash-es';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @deprecated since version 3.0.0
 * @return {?}
 */
function Autoregister() {
    return (target) => {
        /**/
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Page {
    constructor() {
        this.number = 1;
        this.total_resources = 0;
        this.size = 0;
        this.resources_per_page = 0;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CacheableHelper {
    /**
     * @param {?} relationships
     * @param {?} value
     * @return {?}
     */
    static propagateLoaded(relationships, value) {
        for (let relationship_alias in relationships) {
            /** @type {?} */
            let relationship = relationships[relationship_alias];
            if (relationship instanceof DocumentCollection) {
                // we need to add builded, becuase we dont save objects with content='ids'.
                // these relationships are broken (without any data on data)
                relationship.setLoaded(value && relationship.builded);
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} params
 * @return {?}
 */
function implementsIParamsResource(params) {
    return ((/** @type {?} */ (params)).id !== undefined ||
        (/** @type {?} */ (params)).include_get !== undefined ||
        (/** @type {?} */ (params)).include_save !== undefined);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PathBuilder {
    constructor() {
        this.paths = [];
        this.includes = [];
        this.get_params = [];
    }
    /**
     * @param {?} service
     * @param {?=} params
     * @return {?}
     */
    applyParams(service, params = {}) {
        this.appendPath(service.getPrePath());
        if (params.beforepath) {
            this.appendPath(params.beforepath);
        }
        this.appendPath(service.getPath());
        if (params.include) {
            this.setInclude(params.include);
        }
        if (implementsIParamsResource(params) && params.include_get) {
            this.setInclude([...this.includes, ...params.include_get]);
        }
        if (params.fields && Object.keys(params.fields).length > 0) {
            for (let resource_type in params.fields) {
                /** @type {?} */
                let fields_param = `fields[${resource_type}]=${params.fields[resource_type].join(',')}`;
                this.get_params.push(fields_param);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    appendPath(value) {
        if (value !== '') {
            this.paths.push(value);
        }
    }
    /**
     * @return {?}
     */
    getForCache() {
        return this.paths.join('/') + this.get_params.join('/');
    }
    /**
     * @return {?}
     */
    get() {
        /** @type {?} */
        let params = [...this.get_params];
        if (this.includes.length > 0) {
            params.push('include=' + this.includes.join(','));
        }
        return this.paths.join('/') + (params.length > 0 ? Core.getInstance().injectedServices.rsJsonapiConfig.params_separator + params.join('&') : '');
    }
    /**
     * @param {?} strings_array
     * @return {?}
     */
    setInclude(strings_array) {
        this.includes = strings_array;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template R
 */
class Converter {
    /**
     * @param {?} json_array
     * @return {?}
     */
    static json_array2resources_array_by_type(json_array) {
        /** @type {?} */
        let all_resources = {};
        /** @type {?} */
        let resources_by_type = {};
        Converter.json_array2resources_array(json_array, all_resources);
        for (const key in all_resources) {
            /** @type {?} */
            let resource = all_resources[key];
            if (!(resource.type in resources_by_type)) {
                resources_by_type[resource.type] = {};
            }
            resources_by_type[resource.type][resource.id] = resource;
        }
        return resources_by_type;
    }
    /**
     * @param {?} json_resource
     * @param {?} instance_relationships
     * @return {?}
     */
    static json2resource(json_resource, instance_relationships) {
        /** @type {?} */
        let resource_service = Converter.getService(json_resource.type);
        if (resource_service) {
            return Converter.procreate(json_resource);
        }
        else {
            if (Core.getInstance().isDevMode()) {
                console.warn('`' + json_resource.type + '`', 'service not found on json2resource().', 'Use @Autoregister() on service and inject it on component.');
            }
            /** @type {?} */
            let temp = new Resource();
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
        /** @type {?} */
        let resource_service = Core.me.getResourceService(type);
        return resource_service;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static getServiceOrFail(type) {
        /** @type {?} */
        let resource_service = Core.me.getResourceServiceOrFail(type);
        return resource_service;
    }
    /**
     * @param {?} document_from
     * @return {?}
     */
    static buildIncluded(document_from) {
        if ('included' in document_from && document_from.included) {
            return Converter.json_array2resources_array_by_type(document_from.included);
        }
        return {};
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static procreate(data) {
        if (!('type' in data && 'id' in data)) {
            console.error('Jsonapi Resource is not correct', data);
        }
        /** @type {?} */
        let resource = CacheMemory.getInstance().getOrCreateResource(data.type, data.id);
        resource.fill({ data: data });
        resource.is_new = false;
        return resource;
    }
    /**
     * @param {?} json_array
     * @param {?=} destination_array
     * @return {?}
     */
    static json_array2resources_array(json_array, destination_array = {}) {
        for (let data of json_array) {
            /** @type {?} */
            let resource = Converter.json2resource(data, false);
            destination_array[resource.type + '_' + resource.id] = resource;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @typedef {?} */
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
class Document {
    constructor() {
        this.builded = false;
        this.is_loading = true;
        this.loaded = false;
        this.source = 'new';
        this.cache_last_update = 0;
        this.meta = {};
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template R
 */
class DocumentResource extends Document {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ResourceRelationshipsConverter {
    /**
     * @param {?} getService
     * @param {?} relationships_from
     * @param {?} relationships_dest
     * @param {?} included_resources
     */
    constructor(getService, relationships_from, relationships_dest, included_resources) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
    }
    /**
     * @return {?}
     */
    buildRelationships() {
        // recorro los relationships levanto el service correspondiente
        for (const relation_alias in this.relationships_from) {
            /** @type {?} */
            let relation_from_value = this.relationships_from[relation_alias];
            if (this.relationships_dest[relation_alias] && relation_from_value.data === null) {
                // TODO: FE-92 --- check and improve conditions when building has-one relationships
                this.relationships_dest[relation_alias].data = null;
                this.relationships_dest[relation_alias].builded = true;
                // tslint:disable-next-line:deprecation
                this.relationships_dest[relation_alias].is_loading = false;
                this.relationships_dest[relation_alias].loaded = true;
            }
            if (!relation_from_value.data) {
                continue;
            }
            if (this.relationships_dest[relation_alias] instanceof DocumentCollection) {
                this.__buildRelationshipHasMany(relation_from_value, relation_alias);
            }
            else if (this.relationships_dest[relation_alias] instanceof DocumentResource) {
                this.__buildRelationshipHasOne(relation_from_value, relation_alias);
                // } else if (isDevMode()) {
                //    console.warn(`Relation ${relation_alias} received, but doesn't exist on schema.`);
            }
        }
    }
    /**
     * @param {?} relation_from_value
     * @param {?} relation_alias
     * @return {?}
     */
    __buildRelationshipHasMany(relation_from_value, relation_alias) {
        if (relation_from_value.data.length === 0) {
            this.relationships_dest[relation_alias] = new DocumentCollection();
            this.relationships_dest[relation_alias].builded = true;
            return;
        }
        (/** @type {?} */ (this.relationships_dest[relation_alias])).fill(relation_from_value);
    }
    /**
     * @param {?} relation_data_from
     * @param {?} relation_alias
     * @return {?}
     */
    __buildRelationshipHasOne(relation_data_from, relation_alias) {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_alias].data = [];
            return;
        }
        // TODO: FE-92 --- this.is a hotfix... check and improve conditions when building has-one relationships
        if (!this.relationships_dest[relation_alias].data) {
            this.relationships_dest[relation_alias].data = new Resource();
        }
        if (relation_data_from.data.id !== (/** @type {?} */ (this.relationships_dest[relation_alias].data)).id) {
            this.relationships_dest[relation_alias].data = new Resource();
            // with this, fromServer dont fill relationship
            // (<Resource>this.relationships_dest[relation_alias].data).id = relation_data_from.data.id;
            (/** @type {?} */ (this.relationships_dest[relation_alias].data)).type = relation_data_from.data.type;
        }
        if ((/** @type {?} */ (this.relationships_dest[relation_alias].data)).id !== relation_data_from.data.id ||
            !(/** @type {?} */ (this.relationships_dest[relation_alias].data)).attributes ||
            Object.keys((/** @type {?} */ (this.relationships_dest[relation_alias].data)).attributes).length === 0) {
            /** @type {?} */
            let resource_data = this.__buildRelationship(relation_data_from.data);
            if (resource_data) {
                this.relationships_dest[relation_alias].data = resource_data;
                this.relationships_dest[relation_alias].builded = true;
            }
            else {
                // NOTE: HOTFIX para cachestore, no es el lugar correcto pero no había otra forma... me parece que hay que refactorizar...
                (/** @type {?} */ (this.relationships_dest[relation_alias].data)).id = relation_data_from.data.id;
                (/** @type {?} */ (this.relationships_dest[relation_alias].data)).type = relation_data_from.data.type;
            }
        }
    }
    /**
     * @param {?} resource_data_from
     * @return {?}
     */
    __buildRelationship(resource_data_from) {
        if (resource_data_from.type in this.included_resources &&
            resource_data_from.id in this.included_resources[resource_data_from.type]) {
            /** @type {?} */
            let data = this.included_resources[resource_data_from.type][resource_data_from.id];
            // Store the include in cache
            CacheMemory.getInstance().setResource(data, true);
            // this.getService(resource_data_from.type).cachestore.setResource(data);
            return data;
        }
        else {
            /** @type {?} */
            let service = this.getService(resource_data_from.type);
            /** @type {?} */
            let resource = CacheMemory.getInstance().getResource(resource_data_from.type, resource_data_from.id);
            if (resource) {
                return resource;
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Resource {
    constructor() {
        this.id = '';
        this.type = '';
        this.attributes = {};
        this.relationships = {};
        this.links = {};
        this.is_new = true;
        this.is_saving = false;
        this.is_loading = false;
        this.loaded = true;
        this.source = 'new';
        this.cache_last_update = 0;
        this.ttl = 0;
    }
    /**
     * @return {?}
     */
    reset() {
        this.id = '';
        this.attributes = {};
        this.is_new = true;
        for (const key in this.relationships) {
            this.relationships[key] =
                this.relationships[key] instanceof DocumentCollection ? new DocumentCollection() : new DocumentResource();
        }
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    toObject(params) {
        params = Object.assign({}, Base.ParamsResource, params);
        /** @type {?} */
        let relationships = {};
        /** @type {?} */
        let included = [];
        /** @type {?} */
        let included_ids = [];
        /** @type {?} */
        let included_relationships = params.include || [];
        if (params.include_save) {
            included_relationships = included_relationships.concat(params.include_save);
        }
        // REALTIONSHIPS
        for (const relation_alias in this.relationships) {
            /** @type {?} */
            let relationship = this.relationships[relation_alias];
            if (relationship instanceof DocumentCollection) {
                // @TODO PABLO: definir cuál va a ser la propiedd indispensable para guardar la relación
                if (!relationship.builded && (!relationship.data || relationship.data.length === 0)) {
                    delete relationships[relation_alias];
                }
                else {
                    relationships[relation_alias] = { data: [] };
                }
                for (const resource of relationship.data) {
                    /** @type {?} */
                    let reational_object = {
                        id: resource.id,
                        type: resource.type
                    };
                    relationships[relation_alias].data.push(reational_object);
                    /** @type {?} */
                    let temporal_id = resource.type + '_' + resource.id;
                    if (included_ids.indexOf(temporal_id) === -1 &&
                        included_relationships &&
                        included_relationships.indexOf(relation_alias) !== -1) {
                        included_ids.push(temporal_id);
                        included.push(resource.toObject({}).data);
                    }
                }
            }
            else {
                // @TODO PABLO: agregué el check de null porque sino fallan las demás condiciones, además es para eliminar la relacxión del back
                if (relationship.data === null || relationship.data === undefined) {
                    relationships[relation_alias] = { data: relationship.data };
                    continue;
                }
                if (!(relationship instanceof DocumentResource)) {
                    console.warn(relationship, ' is not DocumentCollection or DocumentResource');
                }
                /** @type {?} */
                let relationship_data = /** @type {?} */ (relationship.data);
                if (relationship.data && !('id' in relationship.data) && Object.keys(relationship.data).length > 0) {
                    console.warn(relation_alias + ' defined with hasMany:false, but I have a collection');
                }
                if (relationship_data.id && relationship_data.type) {
                    relationships[relation_alias] = {
                        data: {
                            id: relationship_data.id,
                            type: relationship_data.type
                        }
                    };
                    // @TODO PABLO: definir cuál va a ser la propiedd indispensable para guardar la relación
                    // @WARNING: no borrar la verificación de que no sea null... sino no se van a poder borrar
                }
                else if (!relationship.builded && !relationship_data.id && !relationship_data.type) {
                    delete relationships[relation_alias];
                    continue;
                }
                /** @type {?} */
                let temporal_id = relationship_data.type + '_' + relationship_data.id;
                if (included_ids.indexOf(temporal_id) === -1 &&
                    included_relationships &&
                    included_relationships.indexOf(relation_alias) !== -1) {
                    included_ids.push(temporal_id);
                    included.push(relationship_data.toObject({}).data);
                }
            }
        }
        /** @type {?} */
        let attributes;
        if (this.getService() && this.getService().parseToServer) {
            attributes = Object.assign({}, this.attributes);
            this.getService().parseToServer(attributes);
        }
        else {
            attributes = this.attributes;
        }
        /** @type {?} */
        let ret = {
            data: {
                type: this.type,
                id: this.id,
                attributes: attributes,
                relationships: relationships
            }
        };
        // resource's meta
        if (this.meta) {
            ret.data.meta = this.meta;
        }
        // top level meta
        if (params.meta) {
            ret.meta = params.meta;
        }
        if (included.length > 0) {
            ret.included = included;
        }
        return ret;
    }
    /**
     * @param {?} data_object
     * @return {?}
     */
    fill(data_object) {
        this.id = data_object.data.id || '';
        // WARNING: leaving previous line for a tiem because this can produce undesired behavior
        // this.attributes = data_object.data.attributes || this.attributes;
        this.attributes = Object.assign({}, (this.attributes || {}), data_object.data.attributes);
        this.is_new = false;
        /** @type {?} */
        let service = Converter.getService(data_object.data.type);
        if (!this.relationships && service) {
            this.relationships = new service.resource().relationships;
        }
        // wee need a registered service
        if (!service) {
            return false;
        }
        // only ids?
        if (Object.keys(this.attributes).length) {
            /** @type {?} */
            let srvc = Converter.getService(this.type);
            if (srvc && 'parseFromServer' in srvc) {
                srvc.parseFromServer(this.attributes);
            }
        }
        if ('cache_last_update' in data_object.data) {
            this.cache_last_update = data_object.data.cache_last_update;
        }
        new ResourceRelationshipsConverter(Converter.getService, data_object.data.relationships || {}, this.relationships, Converter.buildIncluded(data_object)).buildRelationships();
        return true;
    }
    /**
     * @template T
     * @param {?} resource
     * @param {?=} type_alias
     * @return {?}
     */
    addRelationship(resource, type_alias) {
        /** @type {?} */
        let relation = this.relationships[type_alias || resource.type];
        if (relation instanceof DocumentCollection) {
            relation.replaceOrAdd(resource);
        }
        else {
            relation.data = resource;
        }
    }
    /**
     * @template R
     * @param {?} resources
     * @param {?} type_alias
     * @return {?}
     */
    addRelationships(resources, type_alias) {
        if (resources.length === 0) {
            return;
        }
        /** @type {?} */
        let relation = this.relationships[type_alias];
        if (!(relation instanceof DocumentCollection)) {
            throw new Error('addRelationships require a DocumentCollection (hasMany) relation.');
        }
        resources.forEach((resource) => {
            this.addRelationship(resource, type_alias);
        });
    }
    /**
     * @param {?} type_alias
     * @param {?} id
     * @return {?}
     */
    removeRelationship(type_alias, id) {
        if (!(type_alias in this.relationships)) {
            return false;
        }
        if (!('data' in this.relationships[type_alias])) {
            return false;
        }
        /** @type {?} */
        let relation = this.relationships[type_alias];
        if (relation instanceof DocumentCollection) {
            relation.data = relation.data.filter(resource => resource.id !== id);
            if (relation.data.length === 0) {
                // used by toObject() when hasMany is empty
                relation.builded = true;
            }
        }
        else {
            relation.data = null;
        }
        return true;
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    hasManyRelated(resource) {
        return this.relationships[resource] && (/** @type {?} */ (this.relationships[resource].data)).length > 0;
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    hasOneRelated(resource) {
        return Boolean(this.relationships[resource] &&
            (/** @type {?} */ (this.relationships[resource].data)).type &&
            (/** @type {?} */ (this.relationships[resource].data)).type !== '');
    }
    /**
     * @template T
     * @param {?=} params
     * @return {?}
     */
    restore(params = {}) {
        params.meta = Object.assign({}, params.meta, { restore: true });
        return this.save(params);
    }
    /**
     * @return {?}
     */
    getService() {
        return Converter.getServiceOrFail(this.type);
    }
    /**
     * @return {?}
     */
    delete() {
        return this.getService().delete(this.id);
    }
    /**
     * @template T
     * @param {?=} params
     * @return {?}
     */
    save(params) {
        params = Object.assign({}, Base.ParamsResource, params);
        if (this.is_saving || !this.loaded) {
            return of({});
        }
        this.is_saving = true;
        /** @type {?} */
        let subject = new Subject();
        /** @type {?} */
        let object = this.toObject(params);
        if (this.id === '') {
            delete object.data.id;
        }
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(this.getService(), params);
        if (this.id) {
            path.appendPath(this.id);
        }
        Core.exec(path.get(), this.is_new ? 'POST' : 'PATCH', object, true).subscribe(success => {
            this.is_saving = false;
            // force reload collections cache (example: we add a new element)
            if (!this.id) {
                CacheMemory.getInstance().deprecateCollections(path.get());
                Core.getInstance().injectedServices.json_ripper.deprecateCollection(path.get());
            }
            // is a resource?
            if ('id' in success.data) {
                this.id = success.data.id;
                this.fill(/** @type {?} */ (success));
            }
            else if (Array.isArray(success.data)) {
                console.warn('Server return a collection when we save()', success.data);
            }
            subject.next(success);
            subject.complete();
        }, error => {
            this.is_saving = false;
            subject.error('data' in error ? error.data : error);
        });
        return subject;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setLoaded(value) {
        // tslint:disable-next-line:deprecation
        this.is_loading = !value;
        this.loaded = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setLoadedAndPropagate(value) {
        this.setLoaded(value);
        CacheableHelper.propagateLoaded(this.relationships, value);
    }
    /**
     * \@todo generate interface
     * @param {?} value
     * @return {?}
     */
    setSource(value) {
        this.source = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSourceAndPropagate(value) {
        this.setSource(value);
        for (let relationship_alias in this.relationships) {
            /** @type {?} */
            let relationship = this.relationships[relationship_alias];
            if (relationship instanceof DocumentCollection) {
                relationship.setSource(value);
            }
        }
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    setCacheLastUpdate(value = Date.now()) {
        this.cache_last_update = value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template R
 */
class RelatedDocumentCollection extends Document {
    constructor() {
        super(...arguments);
        this.data = [];
        this.page = new Page();
        this.ttl = 0;
        this.content = 'ids';
    }
    /**
     * @param {?} index
     * @param {?} iterated_resource
     * @return {?}
     */
    trackBy(index, iterated_resource) {
        return iterated_resource.id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    find(id) {
        if (this.content === 'ids') {
            return null;
        }
        // this is the best way: https://jsperf.com/fast-array-foreach
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return /** @type {?} */ (this.data[i]);
            }
        }
        return null;
    }
    /**
     * @param {?} data_collection
     * @return {?}
     */
    fill(data_collection) {
        Converter.buildIncluded(data_collection);
        // sometimes get Cannot set property 'number' of undefined (page)
        if (this.page && data_collection.meta) {
            this.page.number = data_collection.meta["page"] || 1;
            this.page.resources_per_page = data_collection.meta["resources_per_page"] || null; // @deprecated (v2.0.2)
            this.page.size = data_collection.meta["resources_per_page"] || null;
            this.page.total_resources = data_collection.meta["total_resources"] || null;
        }
        /** @type {?} */
        let new_ids = {};
        this.data.length = 0;
        this.builded = data_collection.data && data_collection.data.length === 0;
        for (let dataresource of data_collection.data) {
            try {
                /** @type {?} */
                let res = this.getResourceOrFail(dataresource);
                res.fill({ data: dataresource });
                new_ids[dataresource.id] = dataresource.id;
                (/** @type {?} */ (this.data)).push(/** @type {?} */ (res));
                if (Object.keys(res.attributes).length > 0) {
                    this.builded = true;
                }
            }
            catch (error) {
                this.content = 'ids';
                this.builded = false;
                this.data.push({ id: dataresource.id, type: dataresource.type });
            }
        }
        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        // @todo test with relation.data.filter(resource =>  resource.id != id );
        for (let i; i < this.data.length; i++) {
            if (!(this.data[i].id in new_ids)) {
                delete this.data[i];
            }
        }
        this.meta = data_collection.meta || {};
        if ('cache_last_update' in data_collection) {
            this.cache_last_update = data_collection.cache_last_update;
        }
    }
    /**
     * @param {?} dataresource
     * @return {?}
     */
    getResourceOrFail(dataresource) {
        /** @type {?} */
        let res = this.find(dataresource.id);
        if (res !== null) {
            return res;
        }
        /** @type {?} */
        let service = Converter.getService(dataresource.type);
        // remove when getService return null or catch errors
        // this prvent a fill on undefinied service :/
        if (!service) {
            if (Core.getInstance().isDevMode()) {
                console.warn('The relationship ' +
                    'relation_alias?' +
                    ' (type ' +
                    dataresource.type +
                    ') cant be generated because service for this type has not been injected.');
            }
            throw new Error('Cant create service for ' + dataresource.type);
        }
        // END remove when getService return null or catch errors
        return service.getOrCreateResource(dataresource.id);
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    replaceOrAdd(resource) {
        /** @type {?} */
        let res = this.find(resource.id);
        if (res === null) {
            (/** @type {?} */ (this.data)).push(resource);
        }
        else {
            res = resource;
        }
    }
    /**
     * @return {?}
     */
    hasMorePages() {
        if (!this.page.size || this.page.size < 1) {
            return null;
        }
        /** @type {?} */
        let total_resources = this.page.size * (this.page.number - 1) + this.data.length;
        return total_resources < this.page.total_resources;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setLoaded(value) {
        // tslint:disable-next-line:deprecation
        this.is_loading = !value;
        this.loaded = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setLoadedAndPropagate(value) {
        this.setLoaded(value);
        if (this.content === 'ids') {
            return;
        }
        (/** @type {?} */ (this.data)).forEach(resource => {
            CacheableHelper.propagateLoaded(resource.relationships, value);
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setBuilded(value) {
        this.builded = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setBuildedAndPropagate(value) {
        this.setBuilded(value);
        if (this.content === 'ids') {
            return;
        }
        (/** @type {?} */ (this.data)).forEach(resource => {
            resource.setLoaded(value);
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSource(value) {
        this.source = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSourceAndPropagate(value) {
        this.setSource(value);
        this.data.forEach(resource => {
            if (resource instanceof Resource) {
                resource.setSource(value);
            }
        });
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    setCacheLastUpdate(value = Date.now()) {
        this.cache_last_update = value;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    setCacheLastUpdateAndPropagate(value = Date.now()) {
        this.setCacheLastUpdate(value);
        this.data.forEach(resource => {
            if (resource instanceof Resource) {
                resource.setCacheLastUpdate(value);
            }
        });
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    toObject(params) {
        if (!this.builded) {
            return { data: this.data };
        }
        /** @type {?} */
        let data = (/** @type {?} */ (this.data)).map(resource => {
            return resource.toObject(params).data;
        });
        return {
            data: data
        };
    }
}
// unsupported: template constraints.
/**
 * @template R
 */
class DocumentCollection extends RelatedDocumentCollection {
    constructor() {
        super(...arguments);
        this.data = [];
        this.content = 'collection';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Base {
    /**
     * @template R
     * @return {?}
     */
    static newCollection() {
        return new DocumentCollection();
    }
    /**
     * @param {?} ttl
     * @param {?} last_update
     * @return {?}
     */
    static isObjectLive(ttl, last_update) {
        return ttl >= 0 && Date.now() <= last_update + ttl * 1000;
    }
    /**
     * @template T
     * @param {?} collection
     * @param {?} fc
     * @return {?}
     */
    static forEach(collection, fc) {
        Object.keys(collection).forEach(key => {
            fc(collection[key], key);
        });
    }
}
Base.ParamsResource = {
    beforepath: '',
    ttl: undefined,
    include: [],
    fields: {},
    id: ''
};
Base.ParamsCollection = {
    beforepath: '',
    ttl: undefined,
    include: [],
    remotefilter: {},
    fields: {},
    smartfilter: {},
    sort: [],
    page: new Page(),
    store_cache_method: 'individual',
    storage_ttl: 0,
    cachehash: ''
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template R
 */
class CacheMemory {
    constructor() {
        this.resources = {};
        this.collections = {};
    }
    /**
     * @return {?}
     */
    static getInstance() {
        if (!CacheMemory.instance) {
            CacheMemory.instance = new CacheMemory();
        }
        return CacheMemory.instance;
    }
    /**
     * @return {?}
     */
    clearCache() {
        this.resources = {};
        this.collections = {};
        CacheMemory.instance = null;
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    getResource(type, id) {
        if (this.getKey(type, id) in this.resources) {
            return this.resources[this.getKey(type, id)];
        }
        return null;
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    getResourceOrFail(type, id) {
        if (this.getKey(type, id) in this.resources) {
            return this.resources[this.getKey(type, id)];
        }
        throw new Error('The requested resource does not exist in cache memory');
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    getKey(type, id) {
        return type + '.' + id;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getOrCreateCollection(url) {
        if (!(url in this.collections)) {
            this.collections[url] = new DocumentCollection();
            this.collections[url].source = 'new';
        }
        return this.collections[url];
    }
    /**
     * @param {?} url
     * @param {?} collection
     * @return {?}
     */
    setCollection(url, collection) {
        // v1: clone collection, because after maybe delete items for localfilter o pagination
        if (!(url in this.collections)) {
            this.collections[url] = new DocumentCollection();
        }
        for (let i = 0; i < collection.data.length; i++) {
            /** @type {?} */
            let resource = collection.data[i];
            // this.collections[url].data.push(resource);
            this.setResource(resource, true);
        }
        this.collections[url].data = collection.data;
        this.collections[url].page = collection.page;
        this.collections[url].cache_last_update = collection.cache_last_update;
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    getOrCreateResource(type, id) {
        /** @type {?} */
        let resource = this.getResource(type, id);
        if (resource !== null) {
            return resource;
        }
        resource = Converter.getServiceOrFail(type).new();
        resource.id = id;
        // needed for a lot of request (all and get, tested on multinexo.com)
        this.setResource(resource, false);
        return resource;
    }
    /**
     * @param {?} resource
     * @param {?=} update_lastupdate
     * @return {?}
     */
    setResource(resource, update_lastupdate = false) {
        if (this.getKey(resource.type, resource.id) in this.resources) {
            this.fillExistentResource(resource);
        }
        else {
            this.resources[this.getKey(resource.type, resource.id)] = resource;
        }
        this.resources[this.getKey(resource.type, resource.id)].cache_last_update = update_lastupdate ? Date.now() : 0;
    }
    /**
     * @param {?=} path_includes
     * @return {?}
     */
    deprecateCollections(path_includes = '') {
        for (let collection_key in this.collections) {
            if (collection_key.includes(path_includes)) {
                this.collections[collection_key].cache_last_update = 0;
            }
        }
        return true;
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    removeResource(type, id) {
        /** @type {?} */
        let resource = this.getResource(type, id);
        if (!resource) {
            return;
        }
        Base.forEach(this.collections, (value, url) => {
            value.data.splice(value.data.findIndex((resource_on_collection) => resource_on_collection.type === type && resource_on_collection.id === id), 1);
        });
        resource.attributes = {}; // just for confirm deletion on view
        // this.resources[id].relationships = {}; // just for confirm deletion on view
        for (let relationship in resource.relationships) {
            if (resource.relationships[relationship].data === null || resource.relationships[relationship].data === undefined) {
                continue;
            }
            if (resource.relationships[relationship].data instanceof Array) {
                resource.relationships[relationship].data = []; // just in case that there is a for loop using it
            }
            else if (resource.relationships[relationship].data instanceof Object) {
                delete resource.relationships[relationship].data;
            }
        }
        delete this.resources[this.getKey(type, id)];
    }
    /**
     * @param {?} source
     * @return {?}
     */
    fillExistentResource(source) {
        /** @type {?} */
        let destination = this.getResourceOrFail(source.type, source.id);
        destination.attributes = Object.assign({}, destination.attributes, source.attributes);
        destination.relationships = destination.relationships || source.relationships;
        // remove relationships on destination resource
        // for (let type_alias in destination.relationships) {
        //     // problem with no declared services
        //     if (destination.relationships[type_alias].data === undefined) {
        //         continue;
        //     }
        //     if (!(type_alias in source.relationships)) {
        //         delete destination.relationships[type_alias];
        //     } else {
        //         // relation is a collection
        //         let collection = <DocumentCollection>destination.relationships[type_alias];
        //         // TODO: talkto Pablo, this could be and Object... (following IF statement added by Maxi)
        //         if (!Array.isArray(collection.data)) {
        //             continue;
        //         }
        //         for (let resource of collection.data) {
        //             if (collection.find(resource.id) === null) {
        //                 delete destination.relationships[type_alias];
        //             }
        //         }
        //     }
        // }
        // // add source relationships to destination
        // for (let type_alias in source.relationships) {
        //     // problem with no declared services
        //     if (source.relationships[type_alias].data === undefined) {
        //         continue;
        //     }
        //     if (source.relationships[type_alias].data === null) {
        //         // TODO: FE-92 --- check and improve conditions when building has-one relationships
        //         destination.relationships[type_alias].data = null;
        //         continue;
        //     }
        //     if ('id' in source.relationships[type_alias].data) {
        //         destination.addRelationship(<Resource>source.relationships[type_alias].data, type_alias);
        //     } else {
        //         destination.addRelationships(<Array<Resource>>source.relationships[type_alias].data, type_alias);
        //     }
        // }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} cacheable
 * @param {?=} ttl
 * @return {?}
 */
function isLive(cacheable, ttl) {
    /** @type {?} */
    let ttl_in_seconds = typeof ttl === 'number' ? ttl : cacheable.ttl || 0;
    return Date.now() < cacheable.cache_last_update + ttl_in_seconds * 1000;
}
/**
 * @param {?} resource
 * @param {?} includes
 * @return {?}
 */
function relationshipsAreBuilded(resource, includes) {
    if (includes.length === 0) {
        return true;
    }
    for (let relationship_alias in resource.relationships) {
        if (includes.includes(relationship_alias) && !resource.relationships[relationship_alias].builded) {
            return false;
        }
    }
    return true;
}
/**
 * @deprecated since 2.2.0
 * @param {?} document
 * @return {?}
 */

/**
 * @deprecated since 2.2.0
 * @param {?} document
 * @return {?}
 */

/**
 * @param {?} target
 * @param {?} key
 * @param {?} descriptor
 * @return {?}
 */
function serviceIsRegistered(target, key, descriptor) {
    /** @type {?} */
    const original = descriptor.value;
    descriptor.value = function () {
        /** @type {?} */
        let args = Array.prototype.slice.call(arguments);
        /** @type {?} */
        let type;
        try {
            if (typeof args[0] === 'string') {
                type = args[0];
            }
            else {
                type = args[0].type;
            }
        }
        catch (err) {
            console.warn(`ERROR: First argument of methods decorated with serviceIsRegistered has to be string or Resource.`);
            return null;
        }
        /** @type {?} */
        const service_is_registered = Core.me.getResourceService(type);
        if (!service_is_registered) {
            console.warn(`ERROR: ${type} service has not been registered.`);
            return null;
        }
        /** @type {?} */
        const result = original.apply(this, args);
        return result;
    };
    return descriptor;
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
/** @type {?} */
const JSONAPI_RIPPER_SERVICE = 'jsonapi_ripper_service';
/** @type {?} */
const JSONAPI_STORE_SERVICE = 'jsonapi_store_service';
class Core {
    constructor() {
        this.loadingsCounter = 0;
        this.loadingsStart = noop;
        this.loadingsDone = noop;
        this.loadingsError = noop;
        this.loadingsOffline = noop;
        this.isDevMode = () => false;
        this.resourceServices = {};
    }
    /**
     * @return {?}
     */
    static getInstance() {
        if (!Core.me) {
            Core.me = new Core();
        }
        return Core.me;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    static delete(path) {
        return Core.exec(path, 'DELETE');
    }
    /**
     * @param {?} path
     * @return {?}
     */
    static get(path) {
        return Core.exec(path, 'get');
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @param {?=} call_loadings_error
     * @return {?}
     */
    static exec(path, method, data, call_loadings_error = true) {
        Core.me.refreshLoadings(1);
        return Core.getInstance().injectedServices.JsonapiHttp.exec(path, method, data).pipe(
        // map(data => { return data.body }),
        tap(() => Core.me.refreshLoadings(-1)), catchError(error => {
            error = error.error || error;
            Core.me.refreshLoadings(-1);
            if (error.status <= 0) {
                // offline?
                if (!Core.me.loadingsOffline(error) && Core.me.isDevMode()) {
                    console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                }
            }
            else if (call_loadings_error && !Core.me.loadingsError(error) && Core.me.isDevMode()) {
                console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
            }
            return throwError(error);
        }));
    }
    /**
     * @template R
     * @param {?} clase
     * @return {?}
     */
    registerService(clase) {
        if (clase.type in this.resourceServices) {
            return false;
        }
        this.resourceServices[clase.type] = clase;
        return /** @type {?} */ (clase);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getResourceService(type) {
        return this.resourceServices[type];
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getResourceServiceOrFail(type) {
        /** @type {?} */
        let service = this.resourceServices[type];
        if (!service) {
            throw new Error(`The requested service with type ${type} has not been registered, please use register() method or @Autoregister() decorator`);
        }
        return service;
    }
    /**
     * @param {?} resource_type
     * @param {?} resource_id
     * @return {?}
     */
    static removeCachedResource(resource_type, resource_id) {
        CacheMemory.getInstance().removeResource(resource_type, resource_id);
        // TODO: FE-85 ---> add method on JsonRipper, if store is enabled
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    static setCachedResource(resource) {
        CacheMemory.getInstance().setResource(resource, true);
        // TODO: FE-85 ---> add method on JsonRipper, if store is enabled
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static deprecateCachedCollections(type) {
        /** @type {?} */
        let service = Core.me.getResourceServiceOrFail(type);
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(service);
        CacheMemory.getInstance().deprecateCollections(path.getForCache());
        // TODO: FE-85 ---> add method on JsonRipper, if store is enabled
    }
    /**
     * @param {?} factor
     * @return {?}
     */
    refreshLoadings(factor) {
        this.loadingsCounter += factor;
        if (this.loadingsCounter === 0) {
            this.loadingsDone();
        }
        else if (this.loadingsCounter === 1) {
            this.loadingsStart();
        }
    }
    /**
     * @return {?}
     */
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            Core.getInstance().injectedServices.JsonapiStoreService.clearCache();
            CacheMemory.getInstance().clearCache();
            return Core.getInstance().injectedServices.json_ripper.deprecateCollection('').then(() => true);
        });
    }
    /**
     * @template R
     * @param {?} resource
     * @param {...?} relations_alias_to_duplicate_too
     * @return {?}
     */
    duplicateResource(resource, ...relations_alias_to_duplicate_too) {
        /** @type {?} */
        let newresource = /** @type {?} */ (this.getResourceServiceOrFail(resource.type).new());
        newresource.id = 'new_' + Math.floor(Math.random() * 10000).toString();
        newresource.attributes = Object.assign({}, newresource.attributes, resource.attributes);
        for (const alias in resource.relationships) {
            /** @type {?} */
            let relationship = resource.relationships[alias];
            if (!relationship.data) {
                newresource.relationships[alias] = resource.relationships[alias];
                continue;
            }
            if ('id' in relationship.data) {
                // relation hasOne
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    newresource.addRelationship(this.duplicateResource(/** @type {?} */ (relationship.data)), alias);
                }
                else {
                    newresource.addRelationship(/** @type {?} */ (relationship.data), alias);
                }
            }
            else {
                // relation hasMany
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    relationship.data.forEach(relationresource => {
                        newresource.addRelationship(this.duplicateResource(/** @type {?} */ (relationresource)), alias);
                    });
                }
                else {
                    newresource.addRelationships(/** @type {?} */ (relationship.data), alias);
                }
            }
        }
        return newresource;
    }
}
__decorate([
    serviceIsRegistered,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], Core, "removeCachedResource", null);
__decorate([
    serviceIsRegistered,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Resource]),
    __metadata("design:returntype", void 0)
], Core, "setCachedResource", null);
__decorate([
    serviceIsRegistered,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Core, "deprecateCachedCollections", null);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class JsonapiConfig {
    constructor() {
        this.url = 'http://yourdomain/api/v1/';
        this.params_separator = '?';
        this.unify_concurrency = true;
        this.cache_prerequests = true;
        this.parameters = {
            page: {
                number: 'page[number]',
                size: 'page[size]'
            }
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Http {
    constructor() {
        this.get_requests = {};
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @return {?}
     */
    exec(path, method, data) {
        /** @type {?} */
        let config = {
            url: Core.me.injectedServices.rsJsonapiConfig.url + path,
            method: method,
            data: data || null,
            headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            }
        };
        if (method === 'get') {
            if (!this.get_requests[path]) {
                /** @type {?} */
                let obs = new Observable((observer) => {
                    axios.request(config)
                        .then((response) => {
                        observer.next(/** @type {?} */ (response.data));
                        observer.complete();
                    })
                        .catch((error) => {
                        observer.error(error);
                    });
                }).pipe(tap(() => {
                    delete this.get_requests[path];
                }), share());
                this.get_requests[path] = obs;
                return obs;
            }
            return this.get_requests[path];
        }
        return new Observable((observer) => {
            axios.request(config)
                .then((response) => {
                observer.next(/** @type {?} */ (response.data));
                observer.complete();
            })
                .catch((error) => {
                observer.error(error);
            });
        }).pipe(tap(() => {
            delete this.get_requests[path];
        }), share());
    }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class StoreFakeService {
    /**
     * @param {?} type
     * @param {?} id_or_url
     * @return {?}
     */
    getDataObject(type, id_or_url) {
        return __awaiter$1(this, void 0, void 0, function* () {
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
        return __awaiter$1(this, void 0, void 0, function* () {
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
        return __awaiter$1(this, void 0, void 0, function* () { });
    }
}

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
class JsonRipperFake {
    constructor() {
        this.enabled = false;
    }
    /**
     * @param {?} key
     * @param {?=} include
     * @return {?}
     */
    getResource(key, include = []) {
        return __awaiter$2(this, void 0, void 0, function* () {
            return { data: { id: '', type: '', cache_last_update: 0 } };
        });
    }
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    getResourceByResource(resource, include = []) {
        return __awaiter$2(this, void 0, void 0, function* () {
            return this.getResource(resource.type, include);
        });
    }
    /**
     * @param {?} url
     * @param {?=} include
     * @return {?}
     */
    getCollection(url, include = []) {
        return __awaiter$2(this, void 0, void 0, function* () {
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
        return __awaiter$2(this, void 0, void 0, function* () { });
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
        return __awaiter$2(this, void 0, void 0, function* () { });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AngularBootstrap {
    /**
     * @param {?} user_config
     * @param {?=} jsonapiStore
     * @param {?=} jsonRipper
     * @return {?}
     */
    static bootstrap(user_config, jsonapiStore, jsonRipper) {
        /** @type {?} */
        let config = new JsonapiConfig();
        for (let k in config) {
            (/** @type {?} */ (config))[k] = user_config[k] !== undefined ? user_config[k] : (/** @type {?} */ (config))[k];
        }
        Core.getInstance().injectedServices = {
            JsonapiStoreService: jsonapiStore ? jsonapiStore : new StoreFakeService(),
            JsonapiHttp: new Http(),
            json_ripper: jsonRipper ? jsonRipper : new JsonRipperFake(),
            rsJsonapiConfig: config
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ReactBootstrap extends AngularBootstrap {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class UrlParamsBuilder {
    /**
     * @param {?} params
     * @return {?}
     */
    toparams(params) {
        /** @type {?} */
        let ret = '';
        Base.forEach(params, (value, key) => {
            ret += this.toparamsarray(value, '&' + key);
        });
        return ret.slice(1);
    }
    /**
     * @param {?} params
     * @param {?} add
     * @return {?}
     */
    toparamsarray(params, add) {
        /** @type {?} */
        let ret = '';
        if (Array.isArray(params) || params instanceof Object) {
            Base.forEach(params, (value, key) => {
                ret += this.toparamsarray(encodeURIComponent(value), add + '[' + key + ']');
            });
        }
        else {
            ret += add + '=' + params;
        }
        return ret;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PathCollectionBuilder extends PathBuilder {
    /**
     * @param {?} service
     * @param {?=} params
     * @return {?}
     */
    applyParams(service, params = {}) {
        super.applyParams(service, params);
        /** @type {?} */
        let paramsurl = new UrlParamsBuilder();
        if (params.remotefilter && Object.keys(params.remotefilter).length > 0) {
            if (service.parseToServer) {
                service.parseToServer(params.remotefilter);
            }
            this.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }
        if (params.page) {
            if (params.page.number > 1) {
                this.addParam(this.getPageConfig().number + '=' + params.page.number);
            }
            if (params.page.size) {
                this.addParam(this.getPageConfig().size + '=' + params.page.size);
            }
        }
        if (params.sort && params.sort.length) {
            this.addParam('sort=' + params.sort.join(','));
        }
    }
    /**
     * @return {?}
     */
    getPageConfig() {
        return ((Core.me.injectedServices.rsJsonapiConfig.parameters && Core.me.injectedServices.rsJsonapiConfig.parameters.page) || {
            number: 'number',
            size: 'size'
        });
    }
    /**
     * @param {?} param
     * @return {?}
     */
    addParam(param) {
        this.get_params.push(param);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IClonedResource() { }
/** @type {?} */
IClonedResource.prototype.toObject;
/** @type {?} */
IClonedResource.prototype.superToObject;
/**
 * @param {?} arg
 * @return {?}
 */
function isClonedResource(arg) {
    return arg && arg.toObject && typeof arg.toObject === 'function' && arg.superToObject && typeof arg.superToObject === 'function';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ClonedDocumentResource {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
class ClonedResource extends Resource {
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

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
// unsupported: template constraints.
/**
 * @template R
 */
class Service {
    constructor() {
        this.resource = Resource;
        setTimeout(() => this.register());
    }
    /**
     * @return {?}
     */
    register() {
        if (Core.me === null) {
            throw new Error('Error: you are trying register `' + this.type + '` before inject JsonapiCore somewhere, almost one time.');
        }
        return Core.me.registerService(this);
    }
    /**
     * @deprecated since 2.2.0. Use new() method.
     * @return {?}
     */
    newResource() {
        return this.new();
    }
    /**
     * @return {?}
     */
    newCollection() {
        return new DocumentCollection();
    }
    /**
     * @return {?}
     */
    new() {
        /** @type {?} */
        let resource = new this.resource();
        resource.type = this.type;
        // issue #36: just if service is not registered yet.
        this.getService();
        resource.reset();
        return /** @type {?} */ (resource);
    }
    /**
     * @return {?}
     */
    getPrePath() {
        return '';
    }
    /**
     * @return {?}
     */
    getPath() {
        return this.path || this.type;
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @return {?}
     */
    getClone(id, params = {}) {
        return this.get(id, params).pipe(map((resource) => {
            // return resource.clone();
            return new ClonedResource(resource);
        }));
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @return {?}
     */
    get(id, params = {}) {
        params = Object.assign({}, Base.ParamsResource, params);
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        /** @type {?} */
        let resource = this.getOrCreateResource(id);
        resource.setLoaded(false);
        /** @type {?} */
        let subject = new BehaviorSubject(resource);
        if (Object.keys(params.fields || []).length > 0) {
            // memory/store cache doesnt support fields
            this.getGetFromServer(path, resource, subject);
        }
        else if (isLive(resource, params.ttl) && relationshipsAreBuilded(resource, params.include || [])) {
            // data on memory and its live
            resource.setLoaded(true);
            setTimeout(() => subject.complete(), 0);
        }
        else if (resource.cache_last_update === 0) {
            // we dont have any data on memory
            this.getGetFromLocal(params, path, resource)
                .then(() => {
                subject.next(resource);
                setTimeout(() => subject.complete(), 0);
            })
                .catch(() => {
                resource.setLoaded(false);
                this.getGetFromServer(path, resource, subject);
            });
        }
        else {
            this.getGetFromServer(path, resource, subject);
        }
        return subject.asObservable();
    }
    /**
     * @param {?=} params
     * @param {?=} path
     * @param {?=} resource
     * @return {?}
     */
    getGetFromLocal(params = {}, path, resource) {
        return __awaiter$3(this, void 0, void 0, function* () {
            // STORE
            if (!Core.getInstance().injectedServices.json_ripper.enabled) {
                throw new Error('We cant handle this request');
            }
            resource.setLoaded(false);
            /** @type {?} */
            let success = yield Core.getInstance().injectedServices.json_ripper.getResourceByResource(resource, path.includes);
            resource.fill(success);
            resource.setSource('store');
            // when fields is set, get resource form server
            if (isLive(resource, params.ttl)) {
                resource.setLoadedAndPropagate(true);
                // resource.setBuildedAndPropagate(true);
                return;
            }
            throw new Error('Resource is dead!');
        });
    }
    /**
     * @param {?} path
     * @param {?} resource
     * @param {?} subject
     * @return {?}
     */
    getGetFromServer(path, resource, subject) {
        Core.get(path.get()).subscribe(success => {
            resource.fill(/** @type {?} */ (success));
            resource.cache_last_update = Date.now();
            resource.setLoadedAndPropagate(true);
            resource.setSourceAndPropagate('server');
            // this.getService().cachememory.setResource(resource, true);
            Core.getInstance().injectedServices.json_ripper.saveResource(resource, path.includes);
            subject.next(resource);
            setTimeout(() => subject.complete(), 0);
        }, error => {
            resource.setLoadedAndPropagate(true);
            subject.next(resource);
            subject.error(error);
        });
    }
    /**
     * @template T
     * @return {?}
     */
    getService() {
        return /** @type {?} */ ((Converter.getService(this.type) || this.register()));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getOrCreateCollection(path) {
        /** @type {?} */
        const service = this.getService();
        /** @type {?} */
        const collection = /** @type {?} */ (CacheMemory.getInstance().getOrCreateCollection(path.getForCache()));
        collection.ttl = service.collections_ttl;
        if (collection.source !== 'new') {
            collection.source = 'memory';
        }
        return collection;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getOrCreateResource(id) {
        /** @type {?} */
        let service = Converter.getServiceOrFail(this.type);
        /** @type {?} */
        let resource;
        resource = /** @type {?} */ (CacheMemory.getInstance().getResource(this.type, id));
        if (resource === null) {
            resource = /** @type {?} */ (service.new());
            resource.id = id;
            CacheMemory.getInstance().setResource(resource, false);
        }
        if (resource.source !== 'new') {
            resource.source = 'memory';
        }
        return resource;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    createResource(id) {
        /** @type {?} */
        let service = Converter.getServiceOrFail(this.type);
        /** @type {?} */
        let resource = service.new();
        resource.id = id;
        CacheMemory.getInstance().setResource(resource, false);
        return /** @type {?} */ (resource);
    }
    /**
     * deprecated since 2.2
     * @return {?}
     */
    clearCacheMemory() {
        return __awaiter$3(this, void 0, void 0, function* () {
            return this.clearCache();
        });
    }
    /**
     * @return {?}
     */
    clearCache() {
        return __awaiter$3(this, void 0, void 0, function* () {
            /** @type {?} */
            let path = new PathBuilder();
            path.applyParams(this);
            // @todo this code is repeated on core.clearCache()
            CacheMemory.getInstance().deprecateCollections(path.getForCache());
            return Core.getInstance().injectedServices.json_ripper.deprecateCollection(path.getForCache()).then(() => true);
        });
    }
    /**
     * @param {?} attributes
     * @return {?}
     */
    parseToServer(attributes) {
        /* */
    }
    /**
     * @param {?} attributes
     * @return {?}
     */
    parseFromServer(attributes) {
        /* */
    }
    /**
     * @param {?} id
     * @param {?=} params
     * @return {?}
     */
    delete(id, params) {
        params = Object.assign({}, Base.ParamsResource, params);
        /** @type {?} */
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);
        /** @type {?} */
        let subject = new Subject();
        Core.delete(path.get()).subscribe(success => {
            CacheMemory.getInstance().removeResource(this.type, id);
            subject.next();
            subject.complete();
        }, error => {
            subject.error(error);
        });
        return subject.asObservable();
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    all(params = {}) {
        /** @type {?} */
        let builded_params = Object.assign({}, Base.ParamsCollection, params);
        if (!builded_params.ttl && builded_params.ttl !== 0) {
            builded_params.ttl = this.collections_ttl;
        }
        /** @type {?} */
        let path = new PathCollectionBuilder();
        path.applyParams(this, builded_params);
        /** @type {?} */
        let temporary_collection = this.getOrCreateCollection(path);
        temporary_collection.page.number = builded_params.page.number * 1;
        /** @type {?} */
        let subject = new BehaviorSubject(temporary_collection);
        if (Object.keys(builded_params.fields).length > 0) {
            // memory/store cache dont suppont fields
            this.getAllFromServer(path, builded_params, temporary_collection, subject);
        }
        else if (isLive(temporary_collection, builded_params.ttl)) {
            // data on memory and its live
            setTimeout(() => subject.complete(), 0);
        }
        else if (temporary_collection.cache_last_update === 0) {
            // we dont have any data on memory
            temporary_collection.source = 'new';
            this.getAllFromLocal(builded_params, path, temporary_collection)
                .then(() => {
                subject.next(temporary_collection);
                setTimeout(() => {
                    subject.complete();
                }, 0);
            })
                .catch(() => {
                temporary_collection.setLoaded(false);
                this.getAllFromServer(path, builded_params, temporary_collection, subject);
            });
        }
        else {
            this.getAllFromServer(path, builded_params, temporary_collection, subject);
        }
        return subject.asObservable();
    }
    /**
     * @param {?=} params
     * @param {?=} path
     * @param {?=} temporary_collection
     * @return {?}
     */
    getAllFromLocal(params = {}, path, temporary_collection) {
        return __awaiter$3(this, void 0, void 0, function* () {
            // STORE
            if (!Core.getInstance().injectedServices.json_ripper.enabled) {
                throw new Error('We cant handle this request');
            }
            temporary_collection.setLoaded(false);
            /** @type {?} */
            let success;
            if (params.store_cache_method === 'compact') {
                // STORE (compact)
                success = yield Core.getInstance().injectedServices.JsonapiStoreService.getDataObject('collection', path.getForCache() + '.compact');
            }
            else {
                // STORE (individual)
                success = yield Core.getInstance().injectedServices.json_ripper.getCollection(path.getForCache(), path.includes);
            }
            temporary_collection.fill(success);
            temporary_collection.setSourceAndPropagate('store');
            // when fields is set, get resource form server
            if (isLive(temporary_collection, params.ttl)) {
                temporary_collection.setLoadedAndPropagate(true);
                temporary_collection.setBuildedAndPropagate(true);
                return;
            }
            throw new Error('Collection is dead!');
        });
    }
    /**
     * @param {?} path
     * @param {?} params
     * @param {?} temporary_collection
     * @param {?} subject
     * @return {?}
     */
    getAllFromServer(path, params, temporary_collection, subject) {
        temporary_collection.setLoaded(false);
        Core.get(path.get()).subscribe(success => {
            // this create a new ID for every resource (for caching proposes)
            // for example, two URL return same objects but with different attributes
            // tslint:disable-next-line:deprecation
            if (params.cachehash) {
                for (const key in success.data) {
                    /** @type {?} */
                    let resource = success.data[key];
                    // tslint:disable-next-line:deprecation
                    resource.id = resource.id + params.cachehash;
                }
            }
            temporary_collection.fill(/** @type {?} */ (success));
            temporary_collection.cache_last_update = Date.now();
            temporary_collection.setCacheLastUpdateAndPropagate();
            temporary_collection.setSourceAndPropagate('server');
            temporary_collection.setLoadedAndPropagate(true);
            // this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);
            if (Core.getInstance().injectedServices.json_ripper.enabled) {
                Core.getInstance().injectedServices.json_ripper.saveCollection(path.getForCache(), temporary_collection, path.includes);
                if (params.store_cache_method === 'compact') {
                    // @todo migrate to dexie
                    Core.getInstance().injectedServices.JsonapiStoreService.saveCollection(path.getForCache() + '.compact', /** @type {?} */ (success));
                }
            }
            subject.next(temporary_collection);
            setTimeout(() => subject.complete(), 0);
        }, error => {
            temporary_collection.setLoadedAndPropagate(true);
            subject.next(temporary_collection);
            subject.error(error);
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/* tslint:enable:file-name-casing */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { Autoregister, Core as JsonapiCore, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE, Resource, ReactBootstrap, AngularBootstrap, DocumentResource, DocumentCollection, Service, Document as ɵb, RelatedDocumentCollection as ɵa };
//# sourceMappingURL=ngx-jsonapi.js.map
