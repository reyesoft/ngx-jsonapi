import { Core } from './core';
import { Base } from './services/base';
import { Resource } from './resource';
import { PathBuilder } from './services/path-builder';
import { Converter } from './services/converter';
import { CacheMemory } from './services/cachememory';
import { CacheStore } from './services/cachestore';
import { IParamsCollection, IParamsResource, IAttributes } from './interfaces';
import { DocumentCollection } from './document-collection';
import { isLive } from './common';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { IDataObject } from './interfaces/data-object';
import { PathCollectionBuilder } from './services/path-collection-builder';
import { IDataCollection } from './interfaces/data-collection';

export class Service<R extends Resource = Resource> {
    public cachememory: CacheMemory;
    public cachestore: CacheStore;
    public type: string;
    public resource = Resource;
    protected path: string; // without slashes

    /*
    Register service on Core
    @return true if the resource don't exist and registered ok
    */
    public register(): Service<R> | false {
        if (Core.me === null) {
            throw new Error('Error: you are trying register `' + this.type + '` before inject JsonapiCore somewhere, almost one time.');
        }
        // only when service is registered, not cloned object
        this.cachememory = new CacheMemory();
        this.cachestore = new CacheStore();

        return Core.me.registerService<R>(this);
    }

    public newResource(): R {
        let resource = new this.resource();

        return <R>resource;
    }

    public newCollection(): DocumentCollection<R> {
        return new DocumentCollection();
    }

    public new(): R {
        let resource = this.newResource();
        resource.type = this.type;
        // issue #36: just if service is not registered yet.
        this.getService();
        resource.reset();

        return resource;
    }

    public getPrePath(): string {
        return '';
    }

    public getPath(): string {
        return this.path || this.type;
    }

    public get(id: string, params: IParamsResource = {}): Observable<R> {
        params = { ...Base.ParamsResource, ...params };

        // http request
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);

        // CACHEMEMORY
        let resource = this.getOrCreateResource(id);
        resource.is_loading = true;

        let subject = new BehaviorSubject<R>(resource);

        if (isLive(resource, params.ttl)) {
            subject.complete();
            resource.is_loading = false;
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // CACHESTORE
            this.getService()
                .cachestore.getResource(resource, params.include)
                .then(() => {
                    if (!isLive(resource, params.ttl)) {
                        subject.next(resource);
                        throw new Error('No está viva la caché de localstorage');
                    }
                    resource.is_loading = false;
                    subject.next(resource);
                    subject.complete();
                })
                .catch(() => {
                    this.getGetFromServer(path, resource, subject);
                });
        } else {
            this.getGetFromServer(path, resource, subject);
        }
        subject.next(resource);

        return subject.asObservable();
    }

    protected getGetFromServer(path, resource: R, subject: Subject<R>): void {
        Core.get(path.get()).subscribe(
            success => {
                resource.fill(<IDataObject>success);
                resource.is_loading = false;
                this.getService().cachememory.setResource(resource);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    this.getService().cachestore.setResource(resource);
                }
                subject.next(resource);
                subject.complete();
            },
            error => {
                subject.error(error);
            }
        );
    }

    public getService<T extends Service<R>>(): T {
        return <T>(Converter.getService(this.type) || this.register());
    }

    public getOrCreateCollection(path: PathCollectionBuilder): DocumentCollection<R> {
        let collection = <DocumentCollection<R>>this.getService().cachememory.getOrCreateCollection(path.getForCache());

        return collection;
    }

    public getOrCreateResource(id: string): R {
        let service = Converter.getService(this.type);
        if (service.cachememory && id in service.cachememory.resources) {
            return <R>service.cachememory.resources[id];
        } else {
            let resource = service.new();
            resource.id = id;
            service.cachememory.setResource(resource, false);

            return <R>resource;
        }
    }

    public clearCacheMemory(): boolean {
        let path = new PathBuilder();
        path.applyParams(this);

        return (
            this.getService().cachememory.deprecateCollections(path.getForCache()) &&
            this.getService().cachestore.deprecateCollections(path.getForCache())
        );
    }

    public parseToServer(attributes: IAttributes): void {
        /* */
    }

    public parseFromServer(attributes: IAttributes): void {
        /* */
    }

    public delete(id: string, params?: Object): Observable<void> {
        params = { ...{}, ...Base.ParamsResource, params };

        // http request
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);

        let subject = new Subject<void>();

        Core.delete(path.get()).subscribe(
            success => {
                this.getService().cachememory.removeResource(id);
                subject.next();
                subject.complete();
            },
            error => {
                subject.error(error);
            }
        );

        return subject.asObservable();
    }

    public all(params: IParamsCollection = {}): Observable<DocumentCollection<R>> {
        params = { ...Base.ParamsCollection, ...params };

        let path = new PathCollectionBuilder();
        path.applyParams(this, params);

        // make request
        let temporary_collection = this.getOrCreateCollection(path);

        let subject = new BehaviorSubject<DocumentCollection<R>>(temporary_collection);

        if (isLive(temporary_collection, params.ttl)) {
            temporary_collection.source = 'memory';
            subject.next(temporary_collection);
            setTimeout(() => subject.complete(), 0);
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // STORE
            temporary_collection.is_loading = true;

            this.getService()
                .cachestore.fillCollectionFromStore(path.getForCache(), path.includes, temporary_collection)
                .subscribe(
                    () => {
                        temporary_collection.source = 'store';

                        // when load collection from store, we save collection on memory
                        this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);

                        if (isLive(temporary_collection, params.ttl)) {
                            temporary_collection.is_loading = false;
                            subject.next(temporary_collection);
                            subject.complete();
                        } else {
                            this.getAllFromServer(path, params, temporary_collection, subject);
                        }
                    },
                    err => {
                        this.getAllFromServer(path, params, temporary_collection, subject);
                    }
                );
        } else {
            this.getAllFromServer(path, params, temporary_collection, subject);
        }

        return subject.asObservable();
    }

    protected getAllFromServer(
        path: PathBuilder,
        params: IParamsCollection,
        temporary_collection: DocumentCollection<R>,
        subject: BehaviorSubject<DocumentCollection<R>>
    ) {
        temporary_collection.is_loading = true;
        subject.next(temporary_collection);
        Core.get(path.get()).subscribe(
            success => {
                temporary_collection.source = 'server';
                temporary_collection.is_loading = false;

                // this create a new ID for every resource (for caching proposes)
                // for example, two URL return same objects but with different attributes
                if (params.cachehash) {
                    for (const key in success.data) {
                        let resource = success.data[key];
                        resource.id = resource.id + params.cachehash;
                    }
                }
                temporary_collection.fill(<IDataCollection>success);
                temporary_collection.cache_last_update = Date.now();

                this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    this.getService().cachestore.setCollection(path.getForCache(), temporary_collection, params.include);
                }

                subject.next(temporary_collection);
                subject.complete();
            },
            error => {
                // do not replace source, because localstorage don't write if = server
                // temporary_collection.source = 'server';
                temporary_collection.is_loading = false;
                subject.next(temporary_collection);
                subject.error(error);
            }
        );
    }
}
