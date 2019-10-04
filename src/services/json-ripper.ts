import { ICacheableDataCollection } from './../interfaces/data-collection';
import { ICacheableDocumentResource } from './../interfaces/data-object';
import { Resource } from './../resource';
import { DocumentResource } from './../document-resource';
import { DexieDataProvider } from '../data-providers/dexie-data-provider';
import { IDataProvider, IElement } from './../data-providers/data-provider';
import { DocumentCollection } from '../document-collection';

interface IStoredCollection {
    updated_at: number;
    keys: Array<string>;
}
export class JsonRipper {
    private dataProvider: IDataProvider;

    public constructor() {
        this.dataProvider = new DexieDataProvider();
    }

    public async getResource(key: string, include: Array<string> = []): Promise<ICacheableDocumentResource> {
        let stored_resource = (await this.getDataResources([key])).shift();

        if (stored_resource === undefined) {
            throw new Error(`Resource ${key} don't found.`);
        }

        if (include.length === 0) {
            return stored_resource;
        }

        let included_keys: Array<string> = [];
        include.forEach(relationship_alias => {
            // @NOTE: typescript doesn't detect throwError added a few lines above when stored_resource === undefnied
            if (!stored_resource || !stored_resource.data.relationships || !stored_resource.data.relationships[relationship_alias]) {
                // this is a classic problem when relationship property is missing on included resources
                throw new Error('We dont have relation_alias on stored data resource');
            }

            const relationship = stored_resource.data.relationships[relationship_alias].data;
            if (relationship instanceof Array) {
                relationship.forEach(related_resource => {
                    included_keys.push(JsonRipper.getResourceKey(related_resource));
                });
            } else if (relationship && 'id' in relationship) {
                included_keys.push(JsonRipper.getResourceKey(relationship));
            }
        });

        let included_resources = await this.getDataResources(included_keys);

        return {
            ...stored_resource,
            included: included_resources.map(document_resource => document_resource.data)
        };
    }

    public async getCollection(url: string, include: Array<string> = []): Promise<ICacheableDataCollection> {
        let stored_collection = await this.getDataCollection(url);
        let data_resources = await this.getDataResources(stored_collection.keys);

        let ret = {
            data: data_resources.map(data_resource => data_resource.data),
            cache_last_update: stored_collection.updated_at
        };

        if (include.length === 0) {
            return ret;
        }

        let included_keys: Array<string> = [];
        include.forEach(relationship_alias => {
            data_resources.forEach(resource => {
                if (!resource.data.relationships || !resource.data.relationships[relationship_alias]) {
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
            ...ret,
            included: included_resources.map(document_resource => document_resource.data)
        };
    }

    private async getDataCollection(url: string): Promise<IStoredCollection> {
        return <Promise<IStoredCollection>>this.dataProvider.getElement(url, 'collections');
    }

    private async getDataResources(keys: Array<string>): Promise<Array<ICacheableDocumentResource>> {
        return <Promise<Array<ICacheableDocumentResource>>>this.dataProvider.getElements(keys, 'elements');
    }

    public saveCollection(url: string, collection: DocumentCollection, include: Array<string> = []): void {
        this.dataProvider.saveElements(JsonRipper.collectionToElement(url, collection), 'collections');
        this.dataProvider.saveElements(JsonRipper.collectionResourcesToElements(collection, include), 'elements');
    }

    public async saveResource(resource: Resource, include = []): Promise<void> {
        return this.dataProvider.saveElements(
            JsonRipper.toResourceElements(JsonRipper.getResourceKey(resource), resource, include),
            'elements'
        );
    }

    private static collectionToElement(url: string, collection: DocumentCollection): Array<IElement> {
        let collection_element = {
            key: url,
            content: { updated_at: Date.now(), keys: <Array<string>>[] }
        };
        collection.data.forEach(resource => {
            let key = JsonRipper.getResourceKey(resource);
            collection_element.content.keys.push(key);
        });

        return [collection_element];
    }

    private static collectionResourcesToElements(collection: DocumentCollection, include: Array<string> = []): Array<IElement> {
        let elements: Array<IElement> = [];
        collection.data.forEach(resource => {
            let key = JsonRipper.getResourceKey(resource);
            elements.push(...JsonRipper.toResourceElements(key, resource, include));
        });

        return elements;
    }

    public static toResourceElements(key: string, resource: Resource, include: Array<string> = []): Array<IElement> {
        let elements: Array<IElement> = [
            {
                key: key,
                content: resource.toObject()
            }
        ];
        elements[0].content.data.cache_last_update = Date.now();

        include.forEach(relationship_alias => {
            const relationship = resource.relationships[relationship_alias];
            if (relationship instanceof DocumentCollection) {
                relationship.data.forEach(related_resource => {
                    elements.push(JsonRipper.getElement(related_resource));
                });
            } else if (relationship instanceof DocumentResource) {
                if (relationship.data === null || relationship.data === undefined) {
                    return;
                }
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

    public async deprecateCollection(key_start_with: string): Promise<void> {
        return this.dataProvider.updateElements(key_start_with, {}, 'collections');
    }
}
