import { Resource } from './../resource';
import { DocumentResource } from './../document-resource';
import { IDataResource } from './../interfaces/data-resource';
import { DexieDataProvider } from '../data-providers/dexie-data-provider';
import { IDataProvider, IElement } from './../data-providers/data-provider';
import { DocumentCollection } from '../document-collection';
import { ICacheableCollection } from '../interfaces/cacheable-document';

interface IStoredCollection {
    updated_at: number;
    keys: Array<string>;
}
export class JsonRipper {
    private dataProvider: IDataProvider;

    public constructor() {
        this.dataProvider = new DexieDataProvider();
    }

    private async getDataCollection(url: string): Promise<IStoredCollection> {
        return <Promise<IStoredCollection>>this.dataProvider.getElement(url);
    }

    private async getDataResources(keys: Array<string>): Promise<Array<IDataResource>> {
        return <Promise<Array<IDataResource>>>this.dataProvider.getElements(keys);
    }

    public async getCollection(url: string, include: Array<string> = []): Promise<ICacheableCollection> {
        let stored_collection = await this.getDataCollection(url);
        let data_resources = await this.getDataResources(stored_collection.keys);

        if (include.length === 0) {
            return { data: data_resources, meta: { _cache_updated_at: stored_collection.updated_at } };
        }

        let included_keys = [];
        include.forEach(relationship_alias => {
            data_resources.forEach(resource => {
                if (!resource.relationships[relationship_alias]) {
                    return;
                }

                const relationship = resource.relationships[relationship_alias].data;
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

        return { data: data_resources, meta: { _cache_updated_at: stored_collection.updated_at }, included: included_resources };
    }

    public saveCollection(url: string, collection: DocumentCollection, include = []): void {
        this.dataProvider.saveElements(JsonRipper.toElements(url, collection, include));
    }

    public static toElements(url: string, collection: DocumentCollection, include = []): Array<IElement> {
        let elements: Array<IElement> = [];
        let collection_element = {
            key: url,
            data: { updated_at: Date.now(), keys: [] }
        };
        collection.data.forEach(resource => {
            let key = JsonRipper.getResourceKey(resource);
            collection_element.data.keys.push(key);
            elements.push({
                key: key,
                data: resource.toObject()
            });

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
        });
        elements.unshift(collection_element);

        return elements;
    }

    private static getResourceKey(resource: Resource): string {
        return resource.type + '.' + resource.id;
    }

    private static getElement(resource: Resource): IElement {
        return {
            key: JsonRipper.getResourceKey(resource),
            data: resource.toObject()
        };
    }
}
