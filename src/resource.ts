import { Core } from './core';
import { Service } from './service';
import { Base } from './services/base';
import { PathBuilder } from './services/path-builder';
import { Converter } from './services/converter';
import { IDataObject } from './interfaces/data-object';
import { IAttributes, IParamsResource, ILinks } from './interfaces';
import { DocumentCollection } from './document-collection';
import { DocumentResource } from './document-resource';
import { ICacheable } from './interfaces/cacheable';
import { isArray } from 'util';
import { Observable, Subject, of } from 'rxjs';
import { ResourceRelationshipsConverter } from './services/resource-relationships-converter';
import { IRelationships } from './interfaces/relationship';

export class Resource implements ICacheable {
    public id: string = '';
    public type: string = '';
    public attributes: IAttributes = {};
    public relationships: IRelationships = {};
    public links: ILinks = {};

    public is_new = true;
    public is_saving = false;
    public is_loading = false;
    public source: 'new' | 'store' = 'new';
    public cache_last_update = 0;
    public lastupdate: number;

    public reset(): void {
        this.id = '';
        this.attributes = {};
        this.is_new = true;

        for (const key in this.relationships) {
            this.relationships[key] =
                this.relationships[key] instanceof DocumentCollection ? new DocumentCollection() : new DocumentResource();
        }
    }

    public toObject(params?: IParamsResource): IDataObject {
        params = { ...{}, ...Base.ParamsResource, ...params };

        let relationships = {};
        let included = [];
        let included_ids = []; // just for control don't repeat any resource

        // REALTIONSHIPS
        for (const relation_alias in this.relationships) {
            let relationship = this.relationships[relation_alias];

            if (relationship instanceof DocumentCollection) {
                relationships[relation_alias] = { data: [] };

                for (const resource of relationship.data) {
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
                }
            } else {
                if (!(relationship instanceof DocumentResource)) {
                    console.warn(relationship, ' is not DocumentCollection or DocumentResource');
                }

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
        }

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
            },
            builded: false,
            content: 'resource'
        };

        if (included.length > 0) {
            ret.included = included;
        }

        return ret;
    }

    public fill(data_object: IDataObject): void {
        let included_resources = Converter.buildIncluded(data_object);

        this.id = data_object.data.id || '';
        this.attributes = data_object.data.attributes || this.attributes;

        this.is_new = false;
        let service = Converter.getService(data_object.data.type);

        // wee need a registered service
        if (!service) {
            return;
        }

        // only ids?
        if (Object.keys(this.attributes).length) {
            Converter.getService(this.type).parseFromServer(this.attributes);
        }

        new ResourceRelationshipsConverter(
            Converter.getService,
            data_object.data.relationships || {},
            this.relationships,
            included_resources
        ).buildRelationships();
    }

    public addRelationship<T extends Resource>(resource: T, type_alias?: string) {
        let object_key = resource.id;
        if (!object_key) {
            object_key = 'new_' + Math.floor(Math.random() * 100000);
        }

        type_alias = type_alias ? type_alias : resource.type;
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = new DocumentResource(); // @todo DocumentCollection
        }

        let relation = this.relationships[type_alias];
        if (relation instanceof DocumentCollection) {
            relation.data.push(resource);
        } else {
            relation.data = resource;
        }
    }

    public addRelationships(resources: Array<Resource>, type_alias: string): void {
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = new DocumentCollection();
        }

        this.relationships[type_alias].data = resources;
    }

    public addRelationshipsArray<R extends Resource>(resources: Array<R>, type_alias?: string): void {
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

        let relation = this.relationships[type_alias];
        if (relation instanceof DocumentCollection) {
            for (let i = 0; i < relation.data.length; i++) {
                if (relation.data[i].id === id) {
                    delete relation.data[i];
                    break;
                }
            }
        } else {
            relation.data.reset();
        }

        return true;
    }

    /*
    @return This resource like a service
    */
    public getService(): Service {
        return Converter.getService(this.type);
    }

    public save<T extends Resource>(params?: IParamsResource): Observable<object> {
        params = { ...Base.ParamsResource, ...params };
        if (this.is_saving || this.is_loading) {
            return of({});
        }
        this.is_saving = true;

        let subject = new Subject<object>();
        let object = this.toObject(params);
        if (this.id === '') {
            delete object.data.id;
        }

        // http request
        let path = new PathBuilder();
        path.applyParams(this.getService(), params);
        if (this.id) {
            path.appendPath(this.id);
        }

        Core.exec(path.get(), this.id ? 'PATCH' : 'POST', object, true).subscribe(
            success => {
                this.is_saving = false;

                // foce reload cache (for example, we add a new element)
                if (!this.id) {
                    this.getService().cachememory.deprecateCollections(path.get());
                    this.getService().cachestore.deprecateCollections(path.get());
                }

                // is a resource?
                if ('id' in success.data) {
                    this.id = success.data.id;
                    this.fill(<IDataObject>success);
                } else if (isArray(success.data)) {
                    console.warn('Server return a collection when we save()', success.data);
                }

                subject.next(success);
                subject.complete();
            },
            error => {
                this.is_saving = false;
                subject.error('data' in error ? error.data : error);
            }
        );

        return subject;
    }
}
