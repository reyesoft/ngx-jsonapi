import { IResourcesByType } from '../interfaces';
import { IDataCollection } from '../interfaces/data-collection';
import { IDataObject } from '../interfaces/data-object';
import { IDataResource } from '../interfaces/data-resource';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';
import { IRelationships } from '../interfaces/relationship';
import { DocumentResource } from '../document-resource';
import { isDevMode } from '@angular/core';

export class ResourceRelationshipsConverter {
    private getService: Function;
    private relationships_from: object;
    private relationships_dest: IRelationships;
    private included_resources: IResourcesByType;

    public constructor(
        getService: Function,
        relationships_from: object,
        relationships_dest: IRelationships,
        included_resources: IResourcesByType
    ) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
    }

    public buildRelationships(): void {
        // recorro los relationships levanto el service correspondiente
        for (const relation_alias in this.relationships_from) {
            let relation_from_value: IDataCollection & IDataObject = this.relationships_from[relation_alias];

            if (!relation_from_value.data) {
                continue;
            }

            if (this.relationships_dest[relation_alias] instanceof DocumentCollection) {
                this.__buildRelationshipHasMany(relation_from_value, relation_alias);
            } else if (this.relationships_dest[relation_alias] instanceof DocumentResource) {
                this.__buildRelationshipHasOne(relation_from_value, relation_alias);
            } else {
                // console.warn('Relation', relation_alias, 'dont exists');
            }
        }
    }

    private __buildRelationshipHasMany(relation_from_value: IDataCollection, relation_alias: string) {
        let relation_type = relation_from_value.data[0] ? relation_from_value.data[0].type : '';
        if (relation_type === '') {
            return;
        }

        relation_alias = relation_alias || relation_type;
        if (!this.getService(relation_type)) {
            if (isDevMode()) {
                console.warn(
                    'The relationship ' + relation_alias + ' (type',
                    relation_type,
                    ') cant be generated because service for this type has not been injected.'
                );
            }

            return;
        }

        if (relation_from_value.data.length === 0) {
            this.relationships_dest[relation_alias] = new DocumentCollection();

            return;
        }

        (<DocumentCollection>this.relationships_dest[relation_alias]).fill(relation_from_value);
    }

    private __buildRelationshipHasOne(relation_data_from: IDataObject, relation_alias: string): void {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_alias].data = [];

            return;
        }

        if (relation_data_from.data.id !== (<Resource>this.relationships_dest[relation_alias].data).id) {
            this.relationships_dest[relation_alias].data = new Resource();
        }

        if ((<Resource>this.relationships_dest[relation_alias].data).id !== relation_data_from.data.id) {
            let resource_data = this.__buildRelationship(relation_data_from.data, this.included_resources);
            if (resource_data) {
                this.relationships_dest[relation_alias].data = resource_data;
            }
        }
    }

    private __buildRelationship(resource_data_from: IDataResource, included_array: IResourcesByType): Resource {
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
            }
        }
    }
}
