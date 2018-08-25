import { IRelationships, ISchema, IResourcesByType } from '../interfaces';
import { IDataCollection } from '../interfaces/data-collection';
import { IDataObject } from '../interfaces/data-object';
import { IDataResource } from '../interfaces/data-resource';
import { Base } from '../services/base';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';
import { noop } from 'rxjs';

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
        for (const relation_key in this.relationships_from) {
            let relation_from_value: IDataCollection & IDataObject = this.relationships_from[relation_key];

            // relation is in schema? have data or just links?
            if (!(relation_key in this.relationships_dest) && 'data' in relation_from_value) {
                this.relationships_dest[relation_key] = new DocumentCollection();
                // {
                //     data: Base.newCollection(),
                //     builded: true,
                //     content: 'collection'
                // };
            }

            // sometime data=null or simple { }
            if (!relation_from_value.data) {
                continue;
            }

            if (this.schema.relationships[relation_key] && this.schema.relationships[relation_key].hasMany) {
                // hasMany
                this.__buildRelationshipHasMany(relation_from_value, relation_key);
            } else {
                // hasOne
                this.__buildRelationshipHasOne(relation_from_value, relation_key);
            }
        }
    }

    private __buildRelationshipHasMany(relation_from_value: IDataCollection, relation_alias: string) {
        let relation_type = relation_from_value.data[0] ? relation_from_value.data[0].type : '';
        relation_alias = relation_alias || relation_type;

        if (this.getService(relation_type)) {
            this.__buildRelationshipCollection(relation_from_value, relation_alias);
        } else {
            this.__buildRelationshipDataCollection(relation_from_value, relation_alias);
        }
    }

    private __buildRelationshipDataCollection(relation_from_value: IDataCollection, relation_alias: string) {
        let relation_collection = Base.newCollection();
        relation_from_value.data.forEach(resource_data => {
            relation_collection[resource_data.id] = resource_data;
        });

        this.relationships_dest[relation_alias] = new DocumentCollection();
    }

    private __buildRelationshipCollection(relation_from_value: IDataCollection, relation_key: string) {
        if (relation_from_value.data.length === 0) {
            this.relationships_dest[relation_key] = new DocumentCollection();

            return;
        }

        (<DocumentCollection>this.relationships_dest[relation_key]).fill(relation_from_value);
    }

    private __buildRelationshipHasOne(
        relation_data_from: IDataObject,
        relation_data_key: any // number to string?
    ): void {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_data_key].data = [];

            return;
        }

        if (
            this.relationships_dest[relation_data_key].data == null ||
            relation_data_from.data.id !== (<Resource>this.relationships_dest[relation_data_key].data).id
        ) {
            this.relationships_dest[relation_data_key].data = [];
        }

        // trae datos o cambió resource? actualizamos!
        if (
            // 'attributes' in relation_data_from.data ||  // ???
            !(<Resource>this.relationships_dest[relation_data_key].data).attributes || // we have only a  dataresource
            (<Resource>this.relationships_dest[relation_data_key].data).id !== relation_data_from.data.id
        ) {
            let resource_data = this.__buildRelationship(relation_data_from.data, this.included_resources);
            this.relationships_dest[relation_data_key].data = resource_data;
        }
    }

    private __buildRelationship(resource_data_from: IDataResource, included_array: IResourcesByType): Resource | IDataResource {
        if (resource_data_from.type in included_array && resource_data_from.id in included_array[resource_data_from.type]) {
            // it's in included
            let data = included_array[resource_data_from.type][resource_data_from.id];

            // Store the include in cache
            this.getService(resource_data_from.type).cachestore.setResource(data);

            return data;
        } else {
            // OPTIONAL: return cached Resource
            let service = this.getService(resource_data_from.type);
            if (service && resource_data_from.id in service.cachememory.resources) {
                return service.cachememory.resources[resource_data_from.id];
            } else {
                // we dont have information on included or memory. try pass to store
                if (service) {
                    service.cachestore.getResource(resource_data_from).catch(noop);
                }

                return resource_data_from;
            }
        }
    }
}
