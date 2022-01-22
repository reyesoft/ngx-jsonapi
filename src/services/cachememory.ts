import { Base } from './base';
import { Resource } from '../resource';
import { Converter } from './converter';
import { DocumentCollection } from '../document-collection';
import { IObjectsById } from '../interfaces';

export class CacheMemory<R extends Resource = Resource> {
    private resources: IObjectsById<Resource> = {};
    private collections: { [url: string]: DocumentCollection<R> } = {};
    private static instance: CacheMemory | null;

    private constructor() {
        /*  */
    }

    public static getInstance(): CacheMemory {
        if (!CacheMemory.instance) {
            CacheMemory.instance = new CacheMemory();
        }

        return CacheMemory.instance;
    }

    public clearCache(): void {
        this.resources = {};
        this.collections = {};
        CacheMemory.instance = null;
    }

    public getResource(type: string, id: string): Resource | null {
        if (this.getKey(type, id) in this.resources) {
            return this.resources[this.getKey(type, id)];
        }

        return null;
    }

    public getResourceOrFail(type: string, id: string): Resource {
        if (this.getKey(type, id) in this.resources) {
            return this.resources[this.getKey(type, id)];
        }

        throw new Error('The requested resource does not exist in cache memory');
    }

    private getKey(type: string, id: string): string {
        return type + '.' + id;
    }

    public getOrCreateCollection(url: string): DocumentCollection<R> {
        if (!(url in this.collections)) {
            this.collections[url] = new DocumentCollection();
            this.collections[url].source = 'new';
        }

        return this.collections[url];
    }

    public setCollection(url: string, collection: DocumentCollection<R>): void {
        // v1: clone collection, because after maybe delete items for localfilter o pagination
        if (!(url in this.collections)) {
            this.collections[url] = new DocumentCollection();
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i: number = 0; i < collection.data.length; i++) {
            let resource: any = collection.data[i];
            // this.collections[url].data.push(resource);
            this.setResource(resource, true);
        }
        this.collections[url].data = collection.data;
        this.collections[url].page = collection.page;
        this.collections[url].cache_last_update = collection.cache_last_update;
    }

    public getOrCreateResource(type: string, id: string): Resource {
        let resource: Resource | null = this.getResource(type, id);
        if (resource !== null) {
            return resource;
        }

        resource = Converter.getServiceOrFail(type).new();
        resource.id = id;
        // needed for a lot of request (all and get, tested on multinexo.com)
        this.setResource(resource, false);

        return resource;
    }

    public setResource(resource: Resource, update_lastupdate: boolean = false): void {
        if (this.getKey(resource.type, resource.id) in this.resources) {
            this.fillExistentResource(resource);
        } else {
            this.resources[this.getKey(resource.type, resource.id)] = resource;
        }
        this.resources[this.getKey(resource.type, resource.id)].cache_last_update = update_lastupdate ? Date.now() : 0;
    }

    public deprecateCollections(path_includes: string = ''): boolean {
        Object.keys(this.collections).forEach((collection_key): void => {
            if (collection_key.includes(path_includes)) {
                this.collections[collection_key].cache_last_update = 0;
            }
        });

        return true;
    }

    public removeResource(type: string, id: string): void {
        let resource: Resource | null = this.getResource(type, id);
        if (!resource) {
            return;
        }
        Base.forEach(this.collections, (value, url) => {
            const idx = value.data.findIndex(
                (resource_on_collection: Resource) => resource_on_collection.type === type && resource_on_collection.id === id
            );

            if (idx !== -1) {
                value.data.splice(idx, 1);
            }
        });
        resource.attributes = {}; // just for confirm deletion on view

        // this.resources[id].relationships = {}; // just for confirm deletion on view
        // eslint-disable-next-line no-restricted-syntax
        for (let relationship in resource.relationships) {
            if (resource.relationships[relationship].data === null || resource.relationships[relationship].data === undefined) {
                continue;
            }
            if (resource.relationships[relationship].data instanceof Array) {
                resource.relationships[relationship].data = []; // just in case that there is a for loop using it
            } else if (resource.relationships[relationship].data instanceof Object) {
                delete resource.relationships[relationship].data;
            }
        }
        delete this.resources[this.getKey(type, id)];
    }

    private fillExistentResource(source: Resource): void {
        let destination: Resource = this.getResourceOrFail(source.type, source.id);

        destination.attributes = { ...destination.attributes, ...source.attributes };

        destination.relationships = destination.relationships || source.relationships;

        // remove relationships on destination resource
        // for (let type_alias in destination.relationships) {
        //     // problem with no declared services
        //     if (destination.relationships[type_alias].data === undefined) {
        //         continue;
        //     }

        //     if (!(type_alias in source.relationships)) {
        //         delete destination.relationships[type_alias];
        //     } else {
        //         // relation is a collection
        //         let collection = <DocumentCollection>destination.relationships[type_alias];
        //         // TODO: talkto Pablo, this could be and Object... (following IF statement added by Maxi)
        //         if (!Array.isArray(collection.data)) {
        //             continue;
        //         }
        //         for (let resource of collection.data) {
        //             if (collection.find(resource.id) === null) {
        //                 delete destination.relationships[type_alias];
        //             }
        //         }
        //     }
        // }

        // // add source relationships to destination
        // for (let type_alias in source.relationships) {
        //     // problem with no declared services
        //     if (source.relationships[type_alias].data === undefined) {
        //         continue;
        //     }

        //     if (source.relationships[type_alias].data === null) {
        //         // TODO: FE-92 --- check and improve conditions when building has-one relationships
        //         destination.relationships[type_alias].data = null;
        //         continue;
        //     }

        //     if ('id' in source.relationships[type_alias].data) {
        //         destination.addRelationship(<Resource>source.relationships[type_alias].data, type_alias);
        //     } else {
        //         destination.addRelationships(<Array<Resource>>source.relationships[type_alias].data, type_alias);
        //     }
        // }
    }
}
