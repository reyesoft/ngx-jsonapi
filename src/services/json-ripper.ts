import { IDataObject } from './../interfaces/data-object';
import { ICacheableResource } from './../interfaces/cacheable-document';
import { Resource } from './../resource';
import { DocumentResource } from './../document-resource';
import { DexieDataProvider } from '../data-providers/dexie-data-provider';
import { IDataProvider, IElement } from './../data-providers/data-provider';
import { DocumentCollection } from '../document-collection';
import { ICacheableCollection } from '../interfaces/cacheable-document';

interface IStoredCollection {
    updated_at: number;
    keys: Array<string>;
}
interface IStoredResource extends IDataObject {
    updated_at: number;
}
export class JsonRipper {
    private dataProvider: IDataProvider;

    public constructor() {
        this.dataProvider = new DexieDataProvider();
    }

    public async getResource(key: string, include: Array<string> = []): Promise<ICacheableResource> {
        let stored_resource = (await this.getDataResources([key])).shift();

        if (include.length === 0) {
            return {
                data: stored_resource.data,
                meta: { _cache_updated_at: stored_resource.updated_at }
            };
        }

        let included_keys = [];
        include.forEach(relationship_alias => {
            if (!stored_resource.data.relationships[relationship_alias]) {
                return;
            }

            const relationship = stored_resource.data.relationships[relationship_alias].data;
            if (relationship instanceof Array) {
                relationship.forEach(related_resource => {
                    included_keys.push(JsonRipper.getResourceKey(related_resource));
                });
            } else if ('id' in relationship) {
                included_keys.push(JsonRipper.getResourceKey(relationship));
            }
        });

        let included_resources = await this.getDataResources(included_keys);

        return {
            data: stored_resource.data,
            included: included_resources.map(document_resource => document_resource.data),
            meta: { _cache_updated_at: stored_resource.updated_at }
        };
    }

    public async getCollection(url: string, include: Array<string> = []): Promise<ICacheableCollection> {
        let stored_collection = await this.getDataCollection(url);
        let data_resources = await this.getDataResources(stored_collection.keys);

        if (include.length === 0) {
            return {
                data: data_resources.map(data_resource => data_resource.data),
                meta: { _cache_updated_at: stored_collection.updated_at }
            };
        }

        let included_keys = [];
        include.forEach(relationship_alias => {
            data_resources.forEach(resource => {
                if (!resource.data.relationships[relationship_alias]) {
                    return;
                }

                const relationship = resource.data.relationships[relationship_alias].data;
                if (relationship instanceof Array) {
                    relationship.forEach(related_resource => {
                        included_keys.push(JsonRipper.getResourceKey(related_resource));
                    });
                } else if ('id' in relationship) {
                    included_keys.push(JsonRipper.getResourceKey(relationship));
                }
            });
        });

        let included_resources = await this.getDataResources(included_keys);

        return {
            data: data_resources.map(data_resource => data_resource.data),
            included: included_resources.map(document_resource => document_resource.data),
            meta: { _cache_updated_at: stored_collection.updated_at }
        };
    }

    private async getDataCollection(url: string): Promise<IStoredCollection> {
        return <Promise<IStoredCollection>>this.dataProvider.getElement(url);
    }

    private async getDataResources(keys: Array<string>): Promise<Array<IStoredResource>> {
        return <Promise<Array<IStoredResource>>>this.dataProvider.getElements(keys);
    }

    public saveCollection(url: string, collection: DocumentCollection, include = []): void {
        this.dataProvider.saveElements(JsonRipper.toElements(url, collection, include));
    }

    public async saveResource(resource: Resource, include = []): Promise<void> {
        return this.dataProvider.saveElements(JsonRipper.toResourceElements(JsonRipper.getResourceKey(resource), resource, include));
    }

    public static toElements(url: string, collection: DocumentCollection, include = []): Array<IElement> {
        let elements: Array<IElement> = [];
        let collection_element = {
            key: url,
            content: { updated_at: Date.now(), keys: [] }
        };
        collection.data.forEach(resource => {
            let key = JsonRipper.getResourceKey(resource);
            collection_element.content.keys.push(key);
            elements.push(...JsonRipper.toResourceElements(key, resource, include));
        });
        elements.unshift(collection_element);

        return elements;
    }

    public static toResourceElements(key: string, resource: Resource, include = []): Array<IElement> {
        let elements: Array<IElement> = [
            {
                key: key,
                content: { ...resource.toObject(), updated_at: Date.now() }
            }
        ];

        include.forEach(relationship_alias => {
            const relationship = resource.relationships[relationship_alias];
            if (relationship instanceof DocumentCollection) {
                relationship.data.forEach(related_resource => {
                    elements.push(JsonRipper.getElement(related_resource));
                });
            } else if (relationship instanceof DocumentResource) {
                elements.push(JsonRipper.getElement(relationship.data));
            }
        });

        return elements;
    }

    public static getResourceKey(resource: Resource): string {
        return resource.type + '.' + resource.id;
    }

    private static getElement(resource: Resource): IElement {
        return {
            key: JsonRipper.getResourceKey(resource),
            content: resource.toObject()
        };
    }
}
