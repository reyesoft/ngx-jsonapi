import { noop } from 'rxjs/util/noop';

import { IRelationships, ISchema, IResourcesByType } from '../interfaces';
import { IDataCollection } from '../interfaces/data-collection';
import { IDataObject } from '../interfaces/data-object';
import { IDataResource } from '../interfaces/data-resource';
import { Base } from '../services/base';
import { Resource } from '../resource';

export class ResourceRelationshipsConverter {
    private getService: Function;
    private relationships_from: object;
    private relationships_dest: IRelationships;
    private included_resources: IResourcesByType;
    private schema: ISchema;

    public constructor(
        getService: Function,
        relationships_from: object,
        relationships_dest: IRelationships,
        included_resources: IResourcesByType,
        schema: ISchema
    ) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
        this.schema = schema;
    }

    public buildRelationships(): void {
        // recorro los relationships levanto el service correspondiente
        Base.forEach(this.relationships_from,
            (
                relation_from_value: IDataCollection & IDataObject,
                relation_key
            ) => {
                // relation is in schema? have data or just links?
                if (
                    !(relation_key in this.relationships_dest) &&
                    'data' in relation_from_value
                ) {
                    this.relationships_dest[relation_key] = {
                        data: Base.newCollection(),
                        content: 'collection',
                    };
                }

                // sometime data=null or simple { }
                if (!relation_from_value.data) {
                    return;
                }

                if (
                    this.schema.relationships[relation_key] &&
                    this.schema.relationships[relation_key].hasMany
                ) {
                    // hasMany
                    this.__buildRelationshipHasMany(
                        relation_from_value,
                        relation_key
                    );
                } else {
                    // hasOne
                    this.__buildRelationshipHasOne(
                        relation_from_value,
                        relation_key
                    );
                }
            }
        );
    }

    private __buildRelationshipHasMany(
        relation_from_value: IDataCollection,
        relation_key: any // number to string?
    ) {
        let relation_type = (relation_from_value.data[0] ? relation_from_value.data[0].type : '');
        // @todo: we need check schema. maybe relationship it's empty
        relation_type = relation_type || relation_key /* || schema.relationship.type */;

        if (this.getService(relation_type)) {
            this.__buildRelationshipCollection(relation_from_value, relation_key);
        } else {
            this.__buildRelationshipDataCollection(relation_from_value, relation_key);
        }
    }

    private __buildRelationshipDataCollection(
        relation_from_value: IDataCollection,
        relation_key: any // number to string?
    ) {
        // @todo: usar collection on data?
        this.relationships_dest[relation_key] = {
            data: relation_from_value.data,
            content: 'ids'
        };
    }

    private __buildRelationshipCollection(
        relation_from_value: IDataCollection,
        relation_key: any // number to string?
    ) {
        if (relation_from_value.data.length === 0) {
            // from data is an empty array, remove all data on relationship
            this.relationships_dest[relation_key] = {
                data: Base.newCollection(),
                content: 'collection'
            };

            return;
        }

        let tmp_relationship_data = Base.newCollection();
        this.relationships_dest[relation_key].content = 'collection';
        Base.forEach(
            relation_from_value.data,
            (relation_value: IDataResource) => {
                let tmp = this.__buildRelationship(
                    relation_value,
                    this.included_resources
                );

                // sometimes we have a cache like a services
                if (
                    !('attributes' in tmp) &&
                    tmp.id in this.relationships_dest[relation_key].data &&
                    'attributes' in
                        this.relationships_dest[relation_key].data[tmp.id]
                ) {
                    tmp_relationship_data[tmp.id] = this.relationships_dest[
                        relation_key
                    ].data[tmp.id];
                } else {
                    tmp_relationship_data[tmp.id] = tmp;
                }

                // some resources are not a Resource object
                if (!('attributes' in tmp)) {
                    this.relationships_dest[relation_key].content = 'ids';
                }
            }
        );

        // REMOVE resources from cached collection
        // build an array with the news ids
        let new_ids = {};
        Base.forEach(
            relation_from_value.data,
            (data_resource: IDataResource) => {
                new_ids[data_resource.id] = true;
            }
        );
        // check if new ids are on destination. If not, delete resource
        Base.forEach(
            this.relationships_dest[relation_key].data,
            (relation_dest_value: IDataResource) => {
                if (!(relation_dest_value.id in new_ids)) {
                    delete this.relationships_dest[relation_dest_value.id];
                }
            }
        );

        this.relationships_dest[relation_key].data = tmp_relationship_data;
    }

    private __buildRelationshipHasOne(
        relation_data_from: IDataObject,
        relation_data_key: any // number to string?
    ): void {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_data_key].data = {};

            return;
        }

        if (
            this.relationships_dest[relation_data_key].data == null ||
            relation_data_from.data.id !==
                (<Resource>this.relationships_dest[relation_data_key].data).id
        ) {
            this.relationships_dest[relation_data_key].data = {};
        }

        // trae datos o cambió resource? actualizamos!
        if (
            // 'attributes' in relation_data_from.data ||  // ???
            !(<Resource>this.relationships_dest[relation_data_key].data)
                .attributes || // we have only a  dataresource
            (<Resource>this.relationships_dest[relation_data_key].data).id !==
                relation_data_from.data.id
        ) {
            let resource_data = this.__buildRelationship(
                relation_data_from.data,
                this.included_resources
            );
            this.relationships_dest[relation_data_key].data = resource_data;
        }
    }

    private __buildRelationship(
        resource_data_from: IDataResource,
        included_array: IResourcesByType
    ): Resource | IDataResource {
        if (
            resource_data_from.type in included_array &&
            resource_data_from.id in included_array[resource_data_from.type]
        ) {
            // it's in included
            return included_array[resource_data_from.type][
                resource_data_from.id
            ];
        } else {
            // OPTIONAL: return cached Resource
            let service = this.getService(resource_data_from.type);
            if (
                service &&
                resource_data_from.id in service.cachememory.resources
            ) {
                return service.cachememory.resources[resource_data_from.id];
            } else {
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
