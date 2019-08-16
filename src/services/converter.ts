// import * as angular from 'angular';
import { Core } from '../core';
import { Resource } from '../resource';
import { Service } from '../service';
import { IObjectsById, IResourcesByType } from '../interfaces';
import { IDataObject } from '../interfaces/data-object';
import { IDataCollection } from '../interfaces/data-collection';
import { IDataResource } from '../interfaces/data-resource';
import { isDevMode } from '@angular/core';
import { DocumentResource } from '../document-resource';
import { DocumentCollection } from '../document-collection';

export class Converter<R extends Resource> {
    /*
    Convert json arrays (like included) to an indexed Resources array by [type][id]
    */
    public static json_array2resources_array_by_type(json_array: Array<IDataResource>): IResourcesByType {
        const all_resources = Converter.json_array2resources_array(json_array, true);

        return Converter.resources_by_type(Object.values(all_resources));
    }

    protected static resources_by_type(resources: Array<Resource>): IResourcesByType {
        let resources_by_type: IResourcesByType = {};
        for (const key in resources) {
            let resource = resources[key];

            if (!(resource.type in resources_by_type)) {
                resources_by_type[resource.type] = {};
            }
            resources_by_type[resource.type][resource.id] = resource;
        }

        return resources_by_type;
    }

    public static json2resource(json_resource: IDataResource, instance_relationships: boolean): Resource {
        let resource_service = Converter.getService(json_resource.type);
        if (resource_service) {
            const resource = Converter.procreate(json_resource);
            if (instance_relationships) {
                for (const relationshipName in resource.relationships) {
                    if (Array.isArray(resource.relationships[relationshipName].data)) {
                        const resourceData = (resource.relationships[relationshipName].data as Array<Resource>)
                            .map(singleResourceData => Converter.procreate(singleResourceData));
                        const documentCollection = new DocumentCollection();
                        documentCollection.fill({data: resourceData});
                        resource.relationships[relationshipName] = documentCollection;
                    } else {
                        const resourceData = resource.relationships[relationshipName].data as IDataResource;
                        if (!resourceData || !resourceData.id || !resourceData.type) {
                            continue;
                        }

                        const relationshipResource = Converter.procreate(resourceData);
                        const documentResource = new DocumentResource();
                        documentResource.fill({data: relationshipResource});
                        resource.relationships[relationshipName] = documentResource;
                    }
                }
            }

            return resource;
        } else {
            if (isDevMode()) {
                console.warn(
                    '`' + json_resource.type + '`',
                    'service not found on json2resource().',
                    'Use @Autoregister() on service and inject it on component.'
                );
            }
            let temp = new Resource();
            temp.id = json_resource.id;
            temp.type = json_resource.type;

            return temp;
        }
    }

    public static getService(type: string): Service {
        let resource_service = Core.me.getResourceService(type);

        return resource_service;
    }

    public static buildIncluded(document_from: IDataCollection | IDataObject): IResourcesByType {
        if ('included' in document_from) {
            return Converter.json_array2resources_array_by_type(document_from.included);
        }

        return {};
    }

    /* return a resource type(resoruce_service) with data(data) */
    private static procreate(data: IDataResource): Resource {
        if (!('type' in data && 'id' in data)) {
            console.error('Jsonapi Resource is not correct', data);
        }

        let resource: Resource;
        if (data.id in Converter.getService(data.type).cachememory.resources) {
            resource = Converter.getService(data.type).cachememory.resources[data.id];
        } else {
            resource = Converter.getService(data.type).getOrCreateResource(data.id);
        }

        resource.attributes = { ...(resource.attributes || {}), ...data.attributes };
        resource.relationships = ({ ...(resource.relationships || {}), ...data.relationships });
        resource.is_new = false;

        return resource;
    }

    /*
    Convert json arrays (like included) to an Resources arrays without [keys]
    */
    private static json_array2resources_array(
        json_array: Array<IDataResource>,
        instance_relationships: boolean = false
    ): IObjectsById<Resource> {
        let destination_array: IObjectsById<Resource> = {};

        for (let data of json_array) {
            let resource = Converter.json2resource(data, instance_relationships);
            destination_array[resource.type + '_' + resource.id] = resource;
        }

        return destination_array;
    }
}
