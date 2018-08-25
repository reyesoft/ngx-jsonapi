import { Base } from './base';
import { Resource } from '../resource';
import { Converter } from './converter';
import { ResourceFunctions } from './resource-functions';
import { DocumentCollection } from '../document-collection';

export class CacheMemory<R extends Resource = Resource> {
    public resources: { [id: string]: Resource } = {};
    private collections: { [url: string]: DocumentCollection<R> } = {};
    private collections_lastupdate: { [url: string]: number } = {};

    public isCollectionExist(url: string): boolean {
        return url in this.collections && this.collections[url].$source !== 'new' ? true : false;
    }

    public isCollectionLive(url: string, ttl: number): boolean {
        return Date.now() <= this.collections_lastupdate[url] + ttl * 1000;
    }

    public isResourceLive(id: string, ttl: number): boolean {
        return this.resources[id] && Date.now() <= this.resources[id].$lastupdate + ttl * 1000;
    }

    public getOrCreateCollection(url: string): DocumentCollection<R> {
        if (!(url in this.collections)) {
            this.collections[url] = new DocumentCollection();
            this.collections[url].$source = 'new';
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
            this.setResource(resource);
        }
        this.collections[url].data = collection.data;
        this.collections[url].page = collection.page;
        this.collections_lastupdate[url] = Date.now();
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
            ResourceFunctions.resourceToResource(resource, this.resources[resource.id]);
        } else {
            this.resources[resource.id] = resource;
        }
        this.resources[resource.id].$lastupdate = update_lastupdate ? Date.now() : 0;
    }

    public deprecateCollections(path_start_with: string): boolean {
        Base.forEach(this.collections_lastupdate, (lastupdate: number, key: string) => {
            this.collections_lastupdate[key] = 0;
        });

        return true;
    }

    public removeResource(id: string): void {
        Base.forEach(this.collections, (value, url) => {
            delete value[id];
        });
        this.resources[id].attributes = {}; // just for confirm deletion on view
        this.resources[id].relationships = {}; // just for confirm deletion on view
        delete this.resources[id];
    }
}
