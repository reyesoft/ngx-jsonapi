import { Core } from './core';
import { Service } from './service';
import { Base } from './services/base';
import { ParentResourceService } from './parent-resource-service';
import { PathBuilder } from './services/path-builder';
// import { UrlParamsBuilder } from './services/url-params-builder';
import { Converter } from './services/converter';
import { IDataObject } from './interfaces/data-object';

import { isFunction } from 'rxjs/util/isFunction';
import { isArray } from 'rxjs/util/isArray';

import {
    IAttributes,
    ICollection,
    IExecParams,
    IParamsResource,
    IRelationships,
    IRelationshipCollection,
    IRelationshipNone,
    IRelationshipResource
} from './interfaces';

export class Resource extends ParentResourceService {
    public is_new = true;
    public is_loading = false;
    public is_saving = false;
    public id: string = '';
    public type: string = '';
    public attributes: IAttributes = {};
    public relationships: IRelationships = {};
    public lastupdate: number;

    public reset(): void {
        this.id = '';
        this.attributes = {};
        this.relationships = {};
        Base.forEach(this.getService().schema.relationships, (value, key) => {
            if (this.getService().schema.relationships[key].hasMany) {
                let relation: IRelationshipCollection = {
                    data: Base.newCollection(),
                    hasid: false,
                    content: 'collection'
                };
                this.relationships[key] = relation;
            } else {
                let relation: IRelationshipNone = { data: {}, hasid: false, content: 'none' };
                this.relationships[key] = relation;
            }
        });
        this.is_new = true;
    }

    public toObject(params?: IParamsResource): IDataObject {
        params = { ...{}, ...Base.Params, ...params };

        let relationships = {};
        let included = [];
        let included_ids = []; // just for control don't repeat any resource

        // REALTIONSHIPS
        Base.forEach(this.relationships, (relationship: IRelationshipResource | IRelationshipCollection, relation_alias: string) => {
            if (this.getService().schema.relationships[relation_alias] && this.getService().schema.relationships[relation_alias].hasMany) {
                // has many (hasMany:true)
                relationships[relation_alias] = { data: [] };

                Base.forEach(relationship.data, (resource: Resource) => {
                    let reational_object = {
                        id: resource.id,
                        type: resource.type
                    };
                    relationships[relation_alias].data.push(reational_object);

                    // no se agregó aún a included && se ha pedido incluir con el parms.include
                    let temporal_id = resource.type + '_' + resource.id;
                    if (included_ids.indexOf(temporal_id) === -1 && params.include.indexOf(relation_alias) !== -1) {
                        included_ids.push(temporal_id);
                        included.push(resource.toObject({}).data);
                    }
                });
            } else {
                // has one (hasMany:false)

                let relationship_data = <Resource>relationship.data;
                if (!('id' in relationship.data) && Object.keys(relationship.data).length > 0) {
                    console.warn(relation_alias + ' defined with hasMany:false, but I have a collection');
                }

                if (relationship_data.id && relationship_data.type) {
                    relationships[relation_alias] = {
                        data: {
                            id: relationship_data.id,
                            type: relationship_data.type
                        }
                    };
                } else {
                    relationships[relation_alias] = { data: {} };
                }

                // no se agregó aún a included && se ha pedido incluir con el parms.include
                let temporal_id = relationship_data.type + '_' + relationship_data.id;
                if (included_ids.indexOf(temporal_id) === -1 && params.include.indexOf(relationship_data.type) !== -1) {
                    included_ids.push(temporal_id);
                    included.push(relationship_data.toObject({}).data);
                }
            }
        });

        // just for performance dont copy if not necessary
        let attributes;
        if (this.getService() && this.getService().parseToServer) {
            attributes = { ...{}, ...this.attributes };
            this.getService().parseToServer(attributes);
        } else {
            attributes = this.attributes;
        }

        let ret: IDataObject = {
            data: {
                type: this.type,
                id: this.id,
                attributes: attributes,
                relationships: relationships
            }
        };

        if (included.length > 0) {
            ret.included = included;
        }

        return ret;
    }

    public async save<T extends Resource>(params?: Object | Function, fc_success?: Function, fc_error?: Function): Promise<object> {
        return this.__exec({
            id: null,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'save'
        });
    }

    public addRelationship<T extends Resource>(resource: T, type_alias?: string) {
        let object_key = resource.id;
        if (!object_key) {
            object_key = 'new_' + Math.floor(Math.random() * 100000);
        }

        type_alias = type_alias ? type_alias : resource.type;
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, hasid: false, content: 'none' };
        }

        if (type_alias in this.getService().schema.relationships && this.getService().schema.relationships[type_alias].hasMany) {
            this.relationships[type_alias].data[object_key] = resource;
        } else {
            this.relationships[type_alias].data = resource;
        }
    }

    public addRelationships(resources: ICollection, type_alias: string) {
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {}, hasid: false, content: 'none' };
        } else {
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

    public addRelationshipsArray<T extends Resource>(resources: Array<T>, type_alias?: string): void {
        resources.forEach((item: Resource) => {
            this.addRelationship(item, type_alias || item.type);
        });
    }

    public removeRelationship(type_alias: string, id: string): boolean {
        if (!(type_alias in this.relationships)) {
            return false;
        }
        if (!('data' in this.relationships[type_alias])) {
            return false;
        }

        if (type_alias in this.getService().schema.relationships && this.getService().schema.relationships[type_alias].hasMany) {
            if (!(id in this.relationships[type_alias].data)) {
                return false;
            }
            delete this.relationships[type_alias].data[id];
        } else {
            this.relationships[type_alias].data = {};
        }

        return true;
    }

    /*
    @return This resource like a service
    */
    public getService(): Service {
        return Converter.getService(this.type);
    }

    protected async __exec<T extends Resource>(exec_params: IExecParams): Promise<object> {
        let exec_pp = this.proccess_exec_params(exec_params);

        switch (exec_params.exec_type) {
            case 'save':
            return this._save(exec_pp.params, exec_params.fc_success, exec_params.fc_error);
        }
    }

    private async _save<T extends Resource>(params: IParamsResource, fc_success: Function, fc_error: Function): Promise<object> {
        let promisesave: Promise<object> = new Promise(
            (resolve, reject): void => {
                if (this.is_saving || this.is_loading) {
                    return;
                }
                this.is_saving = true;

                let object = this.toObject(params);

                // http request
                let path = new PathBuilder();
                path.applyParams(this.getService(), params);
                if (this.id) {
                    path.appendPath(this.id);
                }

                let promise = Core.injectedServices.JsonapiHttp.exec(path.get(), this.id ? 'PATCH' : 'POST', object, !isFunction(fc_error));

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
                    } else if (isArray(success.data)) {
                        console.warn('Server return a collection when we save()', success.data);

                        /*
                        we request the service again, because server maybe are giving
                        us another type of resource (getService(resource.type))
                        */
                        let tempororay_collection = this.getService().cachememory.getOrCreateCollection('justAnUpdate');
                        Converter.build(success, tempororay_collection);
                        Base.forEach(tempororay_collection, (resource_value: Resource, key: string) => {
                            let res = Converter.getService(resource_value.type).cachememory.resources[resource_value.id];
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
            }
        );

        return promisesave;
    }
}
