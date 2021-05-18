import { first, map } from 'rxjs/operators';
import { Core } from './core';
import { IBuildedParamsCollection } from './interfaces/params-collection';
import { Base } from './services/base';
import { Resource } from './resource';
import { PathBuilder } from './services/path-builder';
import { Converter } from './services/converter';
import { CacheMemory } from './services/cachememory';
import { IParamsCollection, IParamsResource, IAttributes } from './interfaces';
import { DocumentCollection } from './document-collection';
import { isLive, relationshipsAreBuilded } from './common';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { IDocumentResource } from './interfaces/data-object';
import { PathCollectionBuilder } from './services/path-collection-builder';
import { IDataCollection, ICacheableDataCollection } from './interfaces/data-collection';
import { JsonRipper } from './services/json-ripper';
import { DexieDataProvider } from './data-providers/dexie-data-provider';
import { ClonedResource } from './cloned-resource';

export class Service<R extends Resource = Resource> {
    public type: string;
    public resource = Resource;
    public collections_ttl: number;
    protected path: string; // without slashes

    public constructor() {
        setTimeout(() => this.register());
    }

    /*
    Register service on Core
    @return true if the resource don't exist and registered ok
    */
    public register(): Service<R> | false {
        if (Core.me === null) {
            throw new Error('Error: you are trying register `' + this.type + '` before inject JsonapiCore somewhere, almost one time.');
        }

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

    public getClone(id: string, params: IParamsResource = {}): Observable<ClonedResource<R>> {
        return this.get(id, params).pipe(
            map((resource: Resource) => {
                // return resource.clone();
                return new ClonedResource(resource);
            })
        );
    }

    // if you change this logic, maybe you need to change all()
    public get(id: string, params: IParamsResource = {}): Observable<R> {
        params = { ...Base.ParamsResource, ...params };

        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);

        let resource: R = this.getOrCreateResource(id);
        resource.setLoaded(false);

        let subject = new BehaviorSubject<R>(resource);

        if (Object.keys(params.fields || []).length > 0) {
            // memory/store cache doesnt support fields
            this.getGetFromServer(path, resource, subject);
        } else if (isLive(resource, params.ttl) && relationshipsAreBuilded(resource, params.include || [])) {
            // data on memory and its live
            resource.setLoaded(true);
            setTimeout(() => subject.complete(), 0);
        } else if (resource.cache_last_update === 0) {
            // we dont have any data on memory
            this.getGetFromLocal(params, path, resource)
                .then(() => {
                    subject.next(resource);
                    setTimeout(() => subject.complete(), 0);
                })
                .catch(() => {
                    resource.setLoaded(false);
                    this.getGetFromServer(path, resource, subject);
                });
        } else {
            this.getGetFromServer(path, resource, subject);
        }

        return subject.asObservable();
    }

    // if you change this logic, maybe you need to change getAllFromLocal()
    private async getGetFromLocal(params: IParamsCollection = {}, path: PathBuilder, resource: R): Promise<void> {
        // STORE
        if (!Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            throw new Error('We cant handle this request');
        }

        resource.setLoaded(false);

        // STORE (individual)
        let json_ripper = new JsonRipper();
        let success = await json_ripper.getResource(JsonRipper.getResourceKey(resource), path.includes);

        resource.fill(success);
        resource.setSource('store');

        // when fields is set, get resource form server
        if (isLive(resource, params.ttl)) {
            resource.setLoadedAndPropagate(true);
            // resource.setBuildedAndPropagate(true);

            return;
        }

        throw new Error('Resource is dead!');
    }

    // if you change this logic, maybe you need to change getAllFromServer()
    protected getGetFromServer(path, resource: R, subject: Subject<R>): void {
        Core.get(path.get()).subscribe(
            success => {
                resource.fill(<IDocumentResource>success);
                resource.cache_last_update = Date.now();
                resource.setLoadedAndPropagate(true);
                resource.setSourceAndPropagate('server');

                // this.getService().cachememory.setResource(resource, true);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    let json_ripper = new JsonRipper();
                    json_ripper.saveResource(resource, path.includes);
                }
                subject.next(resource);
                setTimeout(() => subject.complete(), 0);
            },
            error => {
                resource.setLoadedAndPropagate(true);
                subject.next(resource);
                subject.error(error);
            }
        );
    }

    public getService<T extends Service<R>>(): T {
        return <T>(Converter.getService(this.type) || this.register());
    }

    public getOrCreateCollection(path: PathCollectionBuilder): DocumentCollection<R> {
        const service = this.getService();
        const collection = <DocumentCollection<R>>CacheMemory.getInstance().getOrCreateCollection(path.getForCache());
        collection.ttl = service.collections_ttl;
        if (collection.source !== 'new') {
            collection.source = 'memory';
        }

        return collection;
    }

    public getOrCreateResource(id: string): R {
        let service = Converter.getServiceOrFail(this.type);
        let resource: R;

        resource = <R>CacheMemory.getInstance().getResource(this.type, id);
        if (resource === null) {
            resource = <R>service.new();
            resource.id = id;
            CacheMemory.getInstance().setResource(resource, false);
        }

        if (resource.source !== 'new') {
            resource.source = 'memory';
        }

        return resource;
    }

    public createResource(id: string): R {
        let service = Converter.getServiceOrFail(this.type);
        let resource = service.new();
        resource.id = id;
        CacheMemory.getInstance().setResource(resource, false);

        return <R>resource;
    }

    /**
     * deprecated since 2.2
     */
    public async clearCacheMemory(): Promise<boolean> {
        return this.clearCache();
    }

    public async clearCache(): Promise<boolean> {
        let path = new PathBuilder();
        path.applyParams(this);

        // @todo this code is repeated on core.clearCache()
        CacheMemory.getInstance().deprecateCollections(path.getForCache());

        let json_ripper = new JsonRipper();

        return json_ripper.deprecateCollection(path.getForCache()).then(() => true);
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
                CacheMemory.getInstance().removeResource(this.type, id);
                subject.next();
                subject.complete();
            },
            error => {
                subject.error(error);
            }
        );

        return subject.asObservable();
    }

    // if you change this logic, maybe you need to change get()
    public all(params: IParamsCollection = {}): Observable<DocumentCollection<R>> {
        let builded_params: IBuildedParamsCollection = { ...Base.ParamsCollection, ...params };

        if (!builded_params.ttl && builded_params.ttl !== 0) {
            builded_params.ttl = this.collections_ttl;
        }

        let path = new PathCollectionBuilder();
        path.applyParams(this, builded_params);

        let temporary_collection = this.getOrCreateCollection(path);
        temporary_collection.page.number = builded_params.page.number * 1;

        let subject = new BehaviorSubject<DocumentCollection<R>>(temporary_collection);

        if (Object.keys(builded_params.fields).length > 0) {
            // memory/store cache dont suppont fields
            this.getAllFromServer(path, builded_params, temporary_collection, subject);
        } else if (isLive(temporary_collection, builded_params.ttl)) {
            // data on memory and its live
            setTimeout(() => subject.complete(), 0);
        } else if (temporary_collection.cache_last_update === 0) {
            // we dont have any data on memory
            temporary_collection.source = 'new';
            this.getAllFromLocal(builded_params, path, temporary_collection)
                .then(() => {
                    subject.next(temporary_collection);
                    setTimeout(() => {
                        subject.complete();
                    }, 0);
                })
                .catch(() => {
                    temporary_collection.setLoaded(false);
                    this.getAllFromServer(path, builded_params, temporary_collection, subject);
                });
        } else {
            this.getAllFromServer(path, builded_params, temporary_collection, subject);
        }

        return subject.asObservable();
    }

    // if you change this logic, maybe you need to change getGetFromLocal()
    private async getAllFromLocal(
        params: IParamsCollection = {},
        path: PathCollectionBuilder,
        temporary_collection: DocumentCollection<R>
    ): Promise<void> {
        // STORE
        if (!Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            throw new Error('We cant handle this request');
        }

        temporary_collection.setLoaded(false);

        let success: ICacheableDataCollection;
        if (params.store_cache_method === 'compact') {
            // STORE (compact)
            success = await Core.injectedServices.JsonapiStoreService.getDataObject('collection', path.getForCache() + '.compact');
        } else {
            // STORE (individual)
            let json_ripper = new JsonRipper();
            success = await json_ripper.getCollection(path.getForCache(), path.includes);
        }
        temporary_collection.fill(success);
        temporary_collection.setSourceAndPropagate('store');

        // when fields is set, get resource form server
        if (isLive(temporary_collection, params.ttl)) {
            temporary_collection.setLoadedAndPropagate(true);
            temporary_collection.setBuildedAndPropagate(true);

            return;
        }

        throw new Error('Collection is dead!');
    }

    // if you change this logic, maybe you need to change getGetFromServer()
    protected getAllFromServer(
        path: PathBuilder,
        params: IParamsCollection,
        temporary_collection: DocumentCollection<R>,
        subject: BehaviorSubject<DocumentCollection<R>>
    ) {
        temporary_collection.setLoaded(false);
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
                temporary_collection.setCacheLastUpdateAndPropagate();
                temporary_collection.setSourceAndPropagate('server');
                temporary_collection.setLoadedAndPropagate(true);

                // this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    let json_ripper = new JsonRipper();
                    json_ripper.saveCollection(path.getForCache(), temporary_collection, path.includes);
                    if (params.store_cache_method === 'compact') {
                        // @todo migrate to dexie
                        Core.injectedServices.JsonapiStoreService.saveCollection(path.getForCache() + '.compact', <
                            ICacheableDataCollection
                        >success);
                    }
                }
                subject.next(temporary_collection);
                setTimeout(() => subject.complete(), 0);
            },
            error => {
                temporary_collection.setLoadedAndPropagate(true);
                subject.next(temporary_collection);
                subject.error(error);
            }
        );
    }
}
