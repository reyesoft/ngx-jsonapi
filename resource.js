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
 * @suppress {checkTypes} checked by tsc
 */
import { Core } from './core';
import { Base } from './services/base';
import { ParentResourceService } from './parent-resource-service';
import { PathBuilder } from './services/path-builder';
import { Converter } from './services/converter';
import { isFunction } from 'rxjs/util/isFunction';
import { isArray } from 'rxjs/util/isArray';
export class Resource extends ParentResourceService {
    constructor() {
        super(...arguments);
        this.is_new = true;
        this.is_loading = false;
        this.is_saving = false;
        this.id = '';
        this.type = '';
        this.attributes = {};
        this.relationships = {};
    }
    /**
     * @return {?}
     */
    reset() {
        this.id = '';
        this.attributes = {};
        this.relationships = {};
        Base.forEach(this.getService().schema.relationships, (value, key) => {
            if (this.getService().schema.relationships[key].hasMany) {
                let /** @type {?} */ relation = {
                    data: Base.newCollection(),
                    content: 'collection',
                };
                this.relationships[key] = relation;
            }
            else {
                let /** @type {?} */ relation = { data: {}, content: 'none' };
                this.relationships[key] = relation;
            }
        });
        this.is_new = true;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    toObject(params) {
        params = Object.assign({}, Base.Params, params);
        let /** @type {?} */ relationships = {};
        let /** @type {?} */ included = [];
        let /** @type {?} */ included_ids = []; // just for control don't repeat any resource
        // REALTIONSHIPS
        Base.forEach(this.relationships, (relationship, relation_alias) => {
            if (this.getService().schema.relationships[relation_alias] &&
                this.getService().schema.relationships[relation_alias]
                    .hasMany) {
                // has many (hasMany:true)
                relationships[relation_alias] = { data: [] };
                Base.forEach(relationship.data, (resource) => {
                    let /** @type {?} */ reational_object = {
                        id: resource.id,
                        type: resource.type,
                    };
                    relationships[relation_alias].data.push(reational_object);
                    // no se agregó aún a included && se ha pedido incluir con el parms.include
                    let /** @type {?} */ temporal_id = resource.type + '_' + resource.id;
                    if (included_ids.indexOf(temporal_id) === -1 &&
                        params.include.indexOf(relation_alias) !== -1) {
                        included_ids.push(temporal_id);
                        included.push(resource.toObject({}).data);
                    }
                });
            }
            else {
                // has one (hasMany:false)
                let /** @type {?} */ relationship_data = /** @type {?} */ (relationship.data);
                if (!('id' in relationship.data) &&
                    Object.keys(relationship.data).length > 0) {
                    console.warn(relation_alias +
                        ' defined with hasMany:false, but I have a collection');
                }
                if (relationship_data.id && relationship_data.type) {
                    relationships[relation_alias] = {
                        data: {
                            id: relationship_data.id,
                            type: relationship_data.type,
                        },
                    };
                }
                else {
                    relationships[relation_alias] = { data: {} };
                }
                // no se agregó aún a included && se ha pedido incluir con el parms.include
                let /** @type {?} */ temporal_id = relationship_data.type + '_' + relationship_data.id;
                if (included_ids.indexOf(temporal_id) === -1 &&
                    params.include.indexOf(relationship_data.type) !== -1) {
                    included_ids.push(temporal_id);
                    included.push(relationship_data.toObject({}).data);
                }
            }
        });
        // just for performance dont copy if not necessary
        let /** @type {?} */ attributes;
        if (this.getService() && this.getService().parseToServer) {
            attributes = Object.assign({}, this.attributes);
            this.getService().parseToServer(attributes);
        }
        else {
            attributes = this.attributes;
        }
        let /** @type {?} */ ret = {
            data: {
                type: this.type,
                id: this.id,
                attributes: attributes,
                relationships: relationships,
            },
        };
        if (included.length > 0) {
            ret.included = included;
        }
        return ret;
    }
    /**
     * @template T
     * @param {?=} params
     * @param {?=} fc_success
     * @param {?=} fc_error
     * @return {?}
     */
    save(params, fc_success, fc_error) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.__exec({
                id: null,
                params: params,
                fc_success: fc_success,
                fc_error: fc_error,
                exec_type: 'save',
            });
        });
    }
    /**
     * @template T
     * @param {?} exec_params
     * @return {?}
     */
    __exec(exec_params) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ exec_pp = this.proccess_exec_params(exec_params);
            switch (exec_params.exec_type) {
                case 'save':
                    return this._save(exec_pp.params, exec_params.fc_success, exec_params.fc_error);
            }
        });
    }
    /**
     * @template T
     * @param {?} params
     * @param {?} fc_success
     * @param {?} fc_error
     * @return {?}
     */
    _save(params, fc_success, fc_error) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ promisesave = new Promise((resolve, reject) => {
                if (this.is_saving || this.is_loading) {
                    return;
                }
                this.is_saving = true;
                let /** @type {?} */ object = this.toObject(params);
                // http request
                let /** @type {?} */ path = new PathBuilder();
                path.applyParams(this.getService(), params);
                if (this.id) {
                    path.appendPath(this.id);
                }
                let /** @type {?} */ promise = Core.injectedServices.JsonapiHttp.exec(path.get(), this.id ? 'PATCH' : 'POST', object, !isFunction(fc_error));
                promise
                    .then(success => {
                    this.is_saving = false;
                    // foce reload cache (for example, we add a new element)
                    if (!this.id) {
                        this.getService().cachememory.deprecateCollections(path.get());
                        this.getService().cachestore.deprecateCollections(path.get());
                    }
                    // is a resource?
                    if ('id' in success.data) {
                        this.id = success.data.id;
                        Converter.build(success, this);
                        /*
                                                    Si lo guardo en la caché, luego no queda bindeado con la vista
                                                    Usar {{ $ctrl.service.getCachedResources() | json }}, agregar uno nuevo, editar
                                                    */
                        // this.getService().cachememory.setResource(this);
                    }
                    else if (isArray(success.data)) {
                        console.warn('Server return a collection when we save()', success.data);
                        /*
                                                we request the service again, because server maybe are giving
                                                us another type of resource (getService(resource.type))
                                                */
                        let /** @type {?} */ tempororay_collection = this.getService().cachememory.getOrCreateCollection('justAnUpdate');
                        Converter.build(success, tempororay_collection);
                        Base.forEach(tempororay_collection, (resource_value, key) => {
                            let /** @type {?} */ res = Converter.getService(resource_value.type).cachememory.resources[resource_value.id];
                            Converter.getService(resource_value.type).cachememory.setResource(resource_value);
                            Converter.getService(resource_value.type).cachestore.setResource(resource_value);
                            res.id = res.id + 'x';
                        });
                        console.warn('Temporal collection for a resource_value update', tempororay_collection);
                    }
                    this.runFc(fc_success, success);
                    resolve(success);
                })
                    .catch(error => {
                    this.is_saving = false;
                    this.runFc(fc_error, 'data' in error ? error.data : error);
                    reject('data' in error ? error.data : error);
                });
            });
            return promisesave;
        });
    }
    /**
     * @template T
     * @param {?} resource
     * @param {?=} type_alias
     * @return {?}
     */
    addRelationship(resource, type_alias) {
        let /** @type {?} */ object_key = resource.id;
        if (!object_key) {
            object_key = 'new_' + Math.floor(Math.random() * 100000);
        }
        type_alias = type_alias ? type_alias : resource.type;
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, content: 'none' };
        }
        if (type_alias in this.getService().schema.relationships &&
            this.getService().schema.relationships[type_alias].hasMany) {
            this.relationships[type_alias].data[object_key] = resource;
        }
        else {
            this.relationships[type_alias].data = resource;
        }
    }
    /**
     * @param {?} resources
     * @param {?} type_alias
     * @return {?}
     */
    addRelationships(resources, type_alias) {
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, content: 'none' };
        }
        else {
            // we receive a new collection of this relationship. We need remove old (if don't exist on new collection)
            Base.forEach(this.relationships[type_alias].data, resource => {
                if (!(resource.id in resources)) {
                    delete this.relationships[type_alias].data[resource.id];
                }
            });
        }
        Base.forEach(resources, resource => {
            this.relationships[type_alias].data[resource.id] = resource;
        });
    }
    /**
     * @template T
     * @param {?} resources
     * @param {?=} type_alias
     * @return {?}
     */
    addRelationshipsArray(resources, type_alias) {
        resources.forEach((item) => {
            this.addRelationship(item, type_alias || item.type);
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
        if (type_alias in this.getService().schema.relationships &&
            this.getService().schema.relationships[type_alias].hasMany) {
            if (!(id in this.relationships[type_alias].data)) {
                return false;
            }
            delete this.relationships[type_alias].data[id];
        }
        else {
            this.relationships[type_alias].data = {};
        }
        return true;
    }
    /**
     * @return {?}
     */
    getService() {
        return Converter.getService(this.type);
    }
}
function Resource_tsickle_Closure_declarations() {
    /** @type {?} */
    Resource.prototype.is_new;
    /** @type {?} */
    Resource.prototype.is_loading;
    /** @type {?} */
    Resource.prototype.is_saving;
    /** @type {?} */
    Resource.prototype.id;
    /** @type {?} */
    Resource.prototype.type;
    /** @type {?} */
    Resource.prototype.attributes;
    /** @type {?} */
    Resource.prototype.relationships;
    /** @type {?} */
    Resource.prototype.lastupdate;
}
//# sourceMappingURL=resource.js.map