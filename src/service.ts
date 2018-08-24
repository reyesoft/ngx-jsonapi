import { Core } from './core';
import { Base } from './services/base';
import { Resource } from './resource';
import { ParentResourceService } from './parent-resource-service';
import { PathBuilder } from './services/path-builder';
import { UrlParamsBuilder } from './services/url-params-builder';
import { Converter } from './services/converter';
import { LocalFilter } from './services/localfilter';
import { CacheMemory } from './services/cachememory';
import { CacheStore } from './services/cachestore';
import { ISchema, IExecParams, ICacheMemory, IParamsCollection, IParamsResource, IAttributes } from './interfaces';
import { DocumentCollection } from './document-collection';
import { isLive } from './common';
import { timeout } from 'q';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { IDataResource } from './interfaces/data-resource';
import { IDataObject } from './interfaces/data-object';

export class Service<R extends Resource = Resource> extends ParentResourceService {
    public schema: ISchema;
    public cachememory: ICacheMemory;
    public cachestore: CacheStore;
    public type: string;
    public resource = Resource;

    protected path: string; // without slashes

    private smartfiltertype = 'undefined';

    /*
    Register schema on Core
    @return true if the resource don't exist and registered ok
    */
    public register(): Service<R> | false {
        if (Core.me === null) {
            throw new Error('Error: you are trying register `' + this.type + '` before inject JsonapiCore somewhere, almost one time.');
        }
        // only when service is registered, not cloned object
        this.cachememory = new CacheMemory();
        this.cachestore = new CacheStore();
        this.schema = { ...{}, ...Base.Schema, ...this.schema };

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
        return this.path ? this.path : this.type;
    }

    public delete(id: string, params?: Object): Observable<void> {
        return <Observable<void>>this.__exec({
            id: id,
            params: params,
            exec_type: 'delete'
        });
    }

    public get(id: string, params: IParamsResource = {}): Observable<R> {
        params = { ...Base.Params, ...params };

        // http request
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);

        // CACHEMEMORY
        let resource = this.getOrCreateResource(id);
        resource.is_loading = true;

        let subject = new BehaviorSubject<R>(resource);

        if (isLive(resource, params.ttl)) {
            // we create a promise because we need return collection before
            setTimeout(() => {
                subject.complete();
            }, 0);
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

    public getService<T extends Service<R>>(): T {
        return <T>(Converter.getService(this.type) || this.register());
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

    protected __exec(exec_params: IExecParams): Observable<R | DocumentCollection<R> | void> {
        let exec_pp = super.proccess_exec_params(exec_params);

        switch (exec_pp.exec_type) {
            case 'delete':
                return this._delete(exec_pp.id, exec_pp.params);
        }
    }

    protected getAllFromServer(
        path,
        params,
        temporary_collection: DocumentCollection<R>,
        cached_collection: DocumentCollection<R>,
        subject: BehaviorSubject<DocumentCollection<R>>
    ) {
        Core.get(path.get()).subscribe(
            success => {
                temporary_collection.$source = 'server';
                temporary_collection.$is_loading = false;

                // this create a new ID for every resource (for caching proposes)
                // for example, two URL return same objects but with different attributes
                if (params.cachehash) {
                    for (const key in success.data) {
                        let resource = success.data[key];
                        resource.id = resource.id + params.cachehash;
                    }
                }

                temporary_collection.fill(<IDataObject>success);

                this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    this.getService().cachestore.setCollection(path.getForCache(), temporary_collection, params.include);
                }

                // localfilter getted data
                let localfilter = new LocalFilter(params.localfilter);
                localfilter.filterCollection(temporary_collection, cached_collection);

                // trying to define smartfiltertype
                if (this.smartfiltertype === 'undefined') {
                    let page = temporary_collection.page;
                    if (page.number === 1 && page.total_resources <= page.resources_per_page) {
                        this.smartfiltertype = 'localfilter';
                    } else if (page.number === 1 && page.total_resources > page.resources_per_page) {
                        this.smartfiltertype = 'remotefilter';
                    }
                }

                subject.next(cached_collection);
                subject.complete();
            },
            error => {
                // do not replace $source, because localstorage don't write if = server
                // temporary_collection.$source = 'server';
                temporary_collection.$is_loading = false;
                subject.next(temporary_collection);
                subject.error(error);
            }
        );
    }

    private _delete(id: string, params): Observable<void> {
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
        params = { ...{ remotefilter: {}, cachehash: '', include: [] }, ...params };

        // check smartfiltertype, and set on remotefilter
        if (params.smartfilter && this.smartfiltertype !== 'localfilter') {
            Object.assign(params.remotefilter, params.smartfilter);
        }

        // http request
        let path = new PathBuilder();
        let paramsurl = new UrlParamsBuilder();
        path.applyParams(this, params);
        if (Object.keys(params.remotefilter).length > 0) {
            if (this.getService().parseToServer) {
                this.getService().parseToServer(params.remotefilter);
            }
            path.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }
        if (params.page) {
            if (params.page.number > 1) {
                path.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.number + '=' + params.page.number);
            }
            if (params.page.size) {
                path.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.size + '=' + params.page.size);
            }
        }
        if (params.sort) {
            path.addParam('sort=' + params.sort.join(','));
        }

        // make request
        // if we remove this, dont work the same .all on same time (ej: <component /><component /><component />)
        let temporary_collection = <DocumentCollection<R>>this.getService().cachememory.getOrCreateCollection(path.getForCache());

        // creamos otra colleción si luego será filtrada
        let localfilter = new LocalFilter(params.localfilter);
        let cached_collection: DocumentCollection<R>;
        if (params.localfilter && Object.keys(params.localfilter).length > 0) {
            cached_collection = new DocumentCollection();
        } else {
            cached_collection = temporary_collection;
        }

        let subject = new BehaviorSubject<DocumentCollection<R>>(cached_collection);

        // MEMORY_CACHE
        let temporal_ttl = params.ttl || this.schema.ttl;
        if (temporal_ttl >= 0 && this.getService().cachememory.isCollectionExist(path.getForCache())) {
            // get cached data and merge with temporal collection
            temporary_collection.$source = 'memory';

            // check smartfiltertype, and set on localfilter
            if (params.smartfilter && this.smartfiltertype === 'localfilter') {
                Object.assign(params.localfilter, params.smartfilter);
            }

            // fill collection and localfilter
            localfilter.filterCollection(temporary_collection, cached_collection);

            // exit if ttl is not expired
            if (this.getService().cachememory.isCollectionLive(path.getForCache(), temporal_ttl)) {
                // we create a promise because we need return collection before
                // run success client function
                setTimeout(() => {
                    subject.next(temporary_collection);
                }, 0);
            } else {
                this.getAllFromServer(path, params, temporary_collection, cached_collection, subject);
            }
            // } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            //     // STORE
            //     temporary_collection.$is_loading = true;

            //     this.getService()
            //         .cachestore.getCollectionFromStorePromise(path.getForCache(), path.includes, temporary_collection)
            //         .then(() => {
            //             temporary_collection.$source = 'store';
            //             temporary_collection.$is_loading = false;

            //             // when load collection from store, we save collection on memory
            //             this.getService().cachememory.setCollection(path.getForCache(), temporary_collection);

            //             // localfilter getted data
            //             localfilter.filterCollection(temporary_collection, cached_collection);

            //             if (Base.isObjectLive(temporal_ttl, temporary_collection.$cache_last_update)) {
            //                 subject.next(temporary_collection);
            //             } else {
            //                 this.getAllFromServer(path, params, temporary_collection, cached_collection, subject);
            //             }
            //         })
            //         .catch(() => {
            //             this.getAllFromServer(path, params, temporary_collection, cached_collection, subject);
            //         });
        } else {
            // STORE
            temporary_collection.$is_loading = true;
            this.getAllFromServer(path, params, temporary_collection, cached_collection, subject);
        }

        subject.next(cached_collection);

        return subject.asObservable();
    }
}
