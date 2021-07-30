/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CacheMemory } from './services/cachememory';
import { CacheableHelper } from './services/cacheable-helper.';
import { Core } from './core';
import { Base } from './services/base';
import { PathBuilder } from './services/path-builder';
import { Converter } from './services/converter';
import { DocumentCollection } from './document-collection';
import { DocumentResource } from './document-resource';
import { Subject, of } from 'rxjs';
import { ResourceRelationshipsConverter } from './services/resource-relationships-converter';
export class Resource {
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
if (false) {
    /** @type {?} */
    Resource.prototype.id;
    /** @type {?} */
    Resource.prototype.type;
    /** @type {?} */
    Resource.prototype.attributes;
    /** @type {?} */
    Resource.prototype.relationships;
    /** @type {?} */
    Resource.prototype.links;
    /** @type {?} */
    Resource.prototype.meta;
    /** @type {?} */
    Resource.prototype.is_new;
    /** @type {?} */
    Resource.prototype.is_saving;
    /** @type {?} */
    Resource.prototype.is_loading;
    /** @type {?} */
    Resource.prototype.loaded;
    /** @type {?} */
    Resource.prototype.source;
    /** @type {?} */
    Resource.prototype.cache_last_update;
    /** @type {?} */
    Resource.prototype.ttl;
}
//# sourceMappingURL=resource.js.map