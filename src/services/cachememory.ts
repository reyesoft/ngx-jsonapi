import { Base } from './base';
import { Resource } from '../resource';
import { Converter } from './converter';
import { DocumentCollection } from '../document-collection';
import { IObjectsById } from '../interfaces';

export class CacheMemory<R extends Resource = Resource> {
    public resources: IObjectsById<Resource> = {};
    private collections: { [url: string]: DocumentCollection<R> } = {};
    private collections_lastupdate: { [url: string]: number } = {};

    public isCollectionExist(url: string): boolean {
        return url in this.collections && this.collections[url].source !== 'new' ? true : false;
    }

    public isCollectionLive(url: string, ttl: number): boolean {
        return Date.now() <= this.collections_lastupdate[url] + ttl * 1000;
    }

    public isResourceLive(id: string, ttl: number): boolean {
        return this.resources[id] && Date.now() <= this.resources[id].lastupdate + ttl * 1000;
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
        for (let i = 0; i < collection.data.length; i++) {
            let resource = collection.data[i];
            // this.collections[url].data.push(resource);
            this.setResource(resource, true);
        }
        this.collections[url].data = collection.data;
        this.collections[url].page = collection.page;
        // this.collections_lastupdate[url] = Date.now();
        this.collections_lastupdate[url] = collection.cache_last_update;
    }

    public getOrCreateResource(type: string, id: string): Resource {
        if (Converter.getService(type).cachememory && id in Converter.getService(type).cachememory.resources) {
            return Converter.getService(type).cachememory.resources[id];
        } else {
            let resource = Converter.getService(type).new();
            resource.id = id;
            // needed for a lot of request (all and get, tested on multinexo.com)
            this.setResource(resource, false);

            return resource;
        }
    }

    public setResource(resource: Resource, update_lastupdate = false): void {
        if (resource.id in this.resources) {
            this.addResourceOrFill(resource);
        } else {
            this.resources[resource.id] = resource;
        }
        this.resources[resource.id].lastupdate = update_lastupdate ? Date.now() : 0;
    }

    public deprecateCollections(path_includes: string = ''): boolean {
        for (let collection_key in this.collections_lastupdate) {
            if (collection_key.includes(path_includes)) {
                this.collections_lastupdate[collection_key] = 0;
            }
        }

        return true;
    }

    public removeResource(id: string): void {
        Base.forEach(this.collections, (value, url) => {
            value.data.splice(value.data.findIndex(resource => resource.id === id), 1);
        });
        this.resources[id].attributes = {}; // just for confirm deletion on view
        // this.resources[id].relationships = {}; // just for confirm deletion on view
        for (let relationship in this.resources[id].relationships) {
            if (this.resources[id].relationships[relationship].data.constructor === Array) {
                this.resources[id].relationships[relationship].data = []; // just in case that there is a for loop using it
            } else if (this.resources[id].relationships[relationship].data.constructor === Object) {
                delete this.resources[id].relationships[relationship].data;
            }
        }
        delete this.resources[id];
    }

    private addResourceOrFill(source: Resource): void {
        let destination = this.resources[source.id];

        destination.attributes = source.attributes;

        destination.relationships = destination.relationships || source.relationships;

        // remove relationships on destination resource
        for (let type_alias in destination.relationships) {
            // problem with no declared services
            if (destination.relationships[type_alias].data === undefined) {
                continue;
            }

            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            } else {
                // relation is a collection
                let collection = <DocumentCollection>destination.relationships[type_alias];
                // TODO: talkto Pablo, this could be and Object... (following IF statement added by Maxi)
                if (!Array.isArray(collection.data)) {
                    continue;
                }
                for (let resource of collection.data) {
                    if (collection.find(resource.id) === null) {
                        delete destination.relationships[type_alias];
                    }
                }
            }
        }

        // add source relationships to destination
        for (let type_alias in source.relationships) {
            // problem with no declared services
            if (source.relationships[type_alias].data === undefined) {
                continue;
            }

            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(<Resource>source.relationships[type_alias].data, type_alias);
            } else {
                destination.addRelationships(<Array<Resource>>source.relationships[type_alias].data, type_alias);
            }
        }
    }
}
