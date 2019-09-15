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
import { JsonRipper } from './services/json-ripper';

export class Service<R extends Resource = Resource> {
    public cachememory: CacheMemory;
    public cachestore: CacheStore;
    public type: string;
    public resource = Resource;
    public collections_ttl: number;
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

    /**
     * @deprecated since 2.2.0. Use new() method.
     */
    public newResource(): R {
        return this.new();
    }

    public newCollection(): DocumentCollection<R> {
        return new DocumentCollection();
    }

    public new(): R {
        let resource = new this.resource();
        resource.type = this.type;
        // issue #36: just if service is not registered yet.
        this.getService();
        resource.reset();

        return <R>resource;
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
        let resource: R = this.getOrCreateResource(id);
        resource.is_loading = true;
        resource.loaded = false;

        let subject = new BehaviorSubject<R>(resource);

        // when fields is set, get resource form server
        if (isLive(resource, params.ttl) && Object.keys(params.fields).length === 0) {
            resource.setLoaded(true);
            resource.source = 'memory';
            setTimeout(() => {
                subject.complete();
            });
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // CACHESTORE
            this.getService()
                .cachestore.getResource(resource, params.include)
                .then(() => {
                    // when fields is set, get resource form server
                    if (!isLive(resource, params.ttl) || Object.keys(params.fields).length > 0) {
                        subject.next(resource);
                        throw new Error('No está viva la caché de IndexedDB');
                    }
                    resource.setLoadedAndPropagate(true);
                    resource.source = 'store';
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
                resource.setLoadedAndPropagate(true);
                resource.setSourceAndPropagate('server');
                this.getService().cachememory.setResource(resource, true);
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
        const service = this.getService();
        const collection = <DocumentCollection<R>>service.cachememory.getOrCreateCollection(path.getForCache());
        collection.ttl = service.collections_ttl;

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

    public createResource(id: string): R {
        let service = Converter.getService(this.type);
        let resource = service.new();
        resource.id = id;
        service.cachememory.setResource(resource, false);

        return <R>resource;
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
        params = { ...{}, ...Base.ParamsResource, ...params };

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
        temporary_collection.page.number = params.page.number * 1;

        let subject = new BehaviorSubject<DocumentCollection<R>>(temporary_collection);

        this.getAllFromLocal(params, path, temporary_collection)
            .then(() => {
                subject.next(temporary_collection);
                setTimeout(() => subject.complete(), 0);
            })
            .catch(() => {
                temporary_collection.setLoaded(false);
                subject.next(temporary_collection);
                this.getAllFromServer(path, params, temporary_collection, subject);
            });

        return subject.asObservable();
    }

    private async getAllFromLocal(
        params: IParamsCollection = {},
        path: PathCollectionBuilder,
        temporary_collection: DocumentCollection<R>
    ): Promise<void> {
        if (Object.keys(params.fields).length > 0) {
            // not supported yet
            throw new Error('All from local is not supported whith fields param.');
        }
        if (isLive(temporary_collection, params.ttl)) {
            // data on memory and its live
            temporary_collection.source = 'memory';

            return;
        } else if (temporary_collection.cache_last_update > 0) {
            // data on memory, but it isn't live
            throw new Error('Memory filled with local data, but is die.');
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support && params.store_cache_method === 'individual') {
            // STORE (individual)
            temporary_collection.setLoaded(false);

            let json_ripper = new JsonRipper();
            let success = await json_ripper.getCollection(path.getForCache(), path.includes);
            temporary_collection.source = 'store';
            temporary_collection.fill(success);
            temporary_collection.cache_last_update = success.meta._cache_updated_at;

            // when fields is set, get resource form server
            if (isLive(temporary_collection, params.ttl)) {
                temporary_collection.setLoadedAndPropagate(true);
                temporary_collection.setBuildedAndPropagate(true);

                return;
            }
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support && params.store_cache_method === 'compact') {
            // STORE (compact)
            temporary_collection.setLoaded(false);

            let success = await Core.injectedServices.JsonapiStoreService.getDataObject('collection', path.getForCache() + '.compact');
            temporary_collection.source = 'store';
            temporary_collection.fill(success);
            temporary_collection.cache_last_update = success._lastupdate_time;

            // when fields is set, get resource form server
            if (isLive(temporary_collection, params.ttl)) {
                temporary_collection.setLoadedAndPropagate(true);
                temporary_collection.setBuildedAndPropagate(true);

                return;
            }
        }

        throw new Error('We cant handle this request');
    }

    protected getAllFromServer(
        path: PathBuilder,
        params: IParamsCollection,
        temporary_collection: DocumentCollection<R>,
        subject: BehaviorSubject<DocumentCollection<R>>
    ) {
        Core.get(path.get()).subscribe(
            success => {
                // this create a new ID for every resource (for caching proposes)
                // for example, two URL return same objects but with different attributes
                // tslint:disable-next-line:deprecation
                if (params.cachehash) {
                    for (const key in success.data) {
                        let resource = success.data[key];
                        // tslint:disable-next-line:deprecation
                        resource.id = resource.id + params.cachehash;
                    }
                }
                temporary_collection.fill(<IDataCollection>success);
                temporary_collection.cache_last_update = Date.now();
                temporary_collection.source = 'server';
                temporary_collection.setLoadedAndPropagate(true);

                this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);
                let json_ripper = new JsonRipper();
                json_ripper.saveCollection(path.getForCache(), temporary_collection, path.includes);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    // setCollection takes 1 ms per item
                    this.getService().cachestore.setCollection(path.getForCache(), temporary_collection, params.include);
                    if (params.store_cache_method === 'compact') {
                        Core.injectedServices.JsonapiStoreService.saveCollection(path.getForCache() + '.compact', <IDataCollection>success);
                    }
                }

                subject.next(temporary_collection);
                subject.complete();
            },
            error => {
                temporary_collection.setLoadedAndPropagate(true);
                subject.next(temporary_collection);
                subject.error(error);
            }
        );
    }
}
