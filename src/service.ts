import { noop } from 'rxjs/util/noop';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { of } from 'rxjs/observable/of';

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
import {
    ISchema,
    ICollection,
    IExecParams,
    ICacheMemory,
    IParamsCollection,
    IParamsResource,
    IAttributes,
} from './interfaces';

export class Service<R extends Resource = Resource> extends ParentResourceService {
    public schema: ISchema;
    public cachememory: ICacheMemory<R>;
    public cachestore: CacheStore;
    public type: string;
    public resource = Resource;

    private path: string; // without slashes
    private smartfiltertype = 'undefined';

    /*
    Register schema on Core
    @return true if the resource don't exist and registered ok
    */
    public register(): Service<R> | false {
        if (Core.me === null) {
            throw new Error(
                'Error: you are trying register `' +
                    this.type +
                    '` before inject JsonapiCore somewhere, almost one time.'
            );
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

    public get(
        id: string,
        params?: IParamsResource | Function,
        fc_success?: Function,
        fc_error?: Function
    ): Observable<R> {
        return <Observable<R>>this.__exec({
            id: id,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'get',
        });
    }

    public delete(
        id: string,
        params?: Object | Function,
        fc_success?: Function,
        fc_error?: Function
    ): Observable<void> {
        return <Observable<void>>this.__exec({
            id: id,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'delete',
        });
    }

    public all(
        params?: IParamsCollection | Function,
        fc_success?: Function,
        fc_error?: Function
    ): Observable<ICollection<R>> {
        return <Observable<ICollection<R>>>this.__exec({
            id: null,
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'all',
        });
    }

    protected __exec(exec_params: IExecParams): Observable<R | ICollection<R> | void> {
        let exec_pp = super.proccess_exec_params(exec_params);

        switch (exec_pp.exec_type) {
            case 'get':
                return this._get(
                    exec_pp.id,
                    exec_pp.params,
                    exec_pp.fc_success,
                    exec_pp.fc_error
                );
            case 'delete':
                return this._delete(
                    exec_pp.id,
                    exec_pp.params,
                    exec_pp.fc_success,
                    exec_pp.fc_error
                );
            case 'all':
                return this._all(
                    exec_pp.params,
                    exec_pp.fc_success,
                    exec_pp.fc_error
                );
        }
    }

    public _get(
        id: string,
        params: IParamsResource,
        fc_success,
        fc_error
    ): Observable<R> {
        // http request
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);

        // CACHEMEMORY
        let resource = <R>this.getService().cachememory.getOrCreateResource(
            this.type,
            id
        );
        resource.is_loading = true;

        let subject = new BehaviorSubject<R>(resource);

        // exit if ttl is not expired
        let temporal_ttl = params.ttl || 0; // this.schema.ttl
        if (this.getService().cachememory.isResourceLive(id, temporal_ttl)) {
            // we create a promise because we need return collection before
            // run success client function
            let promise: Promise<void> = new Promise(
                (resolve, reject): void => {
                    resolve(fc_success);
                    promise
                        .then(fc_success2 => {
                            console.warn('ngx-jsonapi: THIS CODE NEVER RUN, RIGHT? :/ Please check.');
                            subject.next(resource);
                            this.runFc(fc_success2, 'cachememory');
                        })
                        .catch(noop);
                    resource.is_loading = false;
                }
            );
            subject.next(resource);
            subject.complete();

            return subject.asObservable();
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // CACHESTORE
            this.getService()
                .cachestore.getResource(resource)
                .then(success => {
                    if (Base.isObjectLive(temporal_ttl, resource.lastupdate)) {
                        subject.next(resource);
                        this.runFc(fc_success, { data: success });
                    } else {
                        this.getGetFromServer(
                            path,
                            fc_success,
                            fc_error,
                            resource,
                            subject
                        );
                    }
                })
                .catch(error => {
                    this.getGetFromServer(path, fc_success, fc_error, resource, subject);
                });
        } else {
            this.getGetFromServer(path, fc_success, fc_error, resource, subject);
        }
        subject.next(resource);

        return subject.asObservable();
    }

    private getGetFromServer(path, fc_success, fc_error, resource: R, subject: Subject<R>) {
        Core.injectedServices.JsonapiHttp.get(path.get())
            .then(success => {
                Converter.build(success /*.data*/, resource);
                resource.is_loading = false;
                this.getService().cachememory.setResource(resource);
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    this.getService().cachestore.setResource(resource);
                }
                subject.next(resource);
                subject.complete();
                this.runFc(fc_success, success);
            })
            .catch(error => {
                subject.error(error);
                this.runFc(fc_error, error);
            });
    }

    private _all(params: IParamsCollection, fc_success, fc_error): Observable<ICollection<R>> {
        // check smartfiltertype, and set on remotefilter
        if (params.smartfilter && this.smartfiltertype !== 'localfilter') {
            Object.assign(params.remotefilter, params.smartfilter);
        }

        params.cachehash = params.cachehash || '';

        // http request
        let path = new PathBuilder();
        let paramsurl = new UrlParamsBuilder();
        path.applyParams(this, params);
        if (
            params.remotefilter &&
            Object.keys(params.remotefilter).length > 0
        ) {
            if (this.getService().parseToServer) {
                this.getService().parseToServer(params.remotefilter);
            }
            path.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }
        if (params.page) {
            if (params.page.number > 1) {
                path.addParam(
                    Core.injectedServices.rsJsonapiConfig.parameters.page.number +
                        '=' + params.page.number
                );
            }
            if (params.page.size) {
                path.addParam(
                    Core.injectedServices.rsJsonapiConfig.parameters.page.size +
                        '=' + params.page.size
                );
            }
        }

        // make request
        // if we remove this, dont work the same .all on same time (ej: <component /><component /><component />)
        let tempororay_collection = this.getService().cachememory.getOrCreateCollection(
            path.getForCache()
        );

        // creamos otra colleción si luego será filtrada
        let localfilter = new LocalFilter(params.localfilter);
        let cached_collection: ICollection<R>;
        if (params.localfilter && Object.keys(params.localfilter).length > 0) {
            cached_collection = Base.newCollection();
        } else {
            cached_collection = tempororay_collection;
        }

        let subject = new BehaviorSubject<ICollection<R>>(cached_collection);

        // MEMORY_CACHE
        let temporal_ttl = params.ttl || this.schema.ttl;
        if (
            temporal_ttl >= 0 &&
            this.getService().cachememory.isCollectionExist(path.getForCache())
        ) {
            // get cached data and merge with temporal collection
            tempororay_collection.$source = 'memory';

            // check smartfiltertype, and set on localfilter
            if (params.smartfilter && this.smartfiltertype === 'localfilter') {
                Object.assign(params.localfilter, params.smartfilter);
            }

            // fill collection and localfilter
            localfilter.filterCollection(
                tempororay_collection,
                cached_collection
            );

            // exit if ttl is not expired
            if (
                this.getService().cachememory.isCollectionLive(
                    path.getForCache(),
                    temporal_ttl
                )
            ) {
                // we create a promise because we need return collection before
                // run success client function
                let promise: Promise<void> = new Promise(
                    (resolve, reject): void => {
                        resolve(fc_success);
                        promise
                            .then(fc_success2 => {
                                subject.next(tempororay_collection);
                                this.runFc(fc_success2, 'cachememory');
                            })
                            .catch(noop);
                    }
                );
            } else {
                this.getAllFromServer(
                    path,
                    params,
                    fc_success,
                    fc_error,
                    tempororay_collection,
                    cached_collection,
                    subject
                );
            }
        } else if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // STORE
            tempororay_collection.$is_loading = true;

            this.getService()
                .cachestore.getCollectionFromStorePromise(
                    path.getForCache(),
                    path.includes,
                    tempororay_collection
                )
                .then(success => {
                    tempororay_collection.$source = 'store';
                    tempororay_collection.$is_loading = false;

                    // when load collection from store, we save collection on memory
                    this.getService().cachememory.setCollection(
                        path.getForCache(),
                        tempororay_collection
                    );

                    // localfilter getted data
                    localfilter.filterCollection(
                        tempororay_collection,
                        cached_collection
                    );

                    if (
                        Base.isObjectLive(
                            temporal_ttl,
                            tempororay_collection.$cache_last_update
                        )
                    ) {
                        subject.next(tempororay_collection);
                        this.runFc(fc_success, { data: success });
                    } else {
                        this.getAllFromServer(
                            path,
                            params,
                            fc_success,
                            fc_error,
                            tempororay_collection,
                            cached_collection,
                            subject
                        );
                    }
                })
                .catch(error => {
                    this.getAllFromServer(
                        path,
                        params,
                        fc_success,
                        fc_error,
                        tempororay_collection,
                        cached_collection,
                        subject
                    );
                });
        } else {
            // STORE
            tempororay_collection.$is_loading = true;
            this.getAllFromServer(
                path,
                params,
                fc_success,
                fc_error,
                tempororay_collection,
                cached_collection,
                subject
            );
        }

        subject.next(<ICollection<R>>cached_collection);

        return subject.asObservable();
    }

    private getAllFromServer(
        path,
        params,
        fc_success,
        fc_error,
        tempororay_collection: ICollection<R>,
        cached_collection: ICollection,
        subject: BehaviorSubject<ICollection<R>>
    ) {
        // SERVER REQUEST
        tempororay_collection.$is_loading = true;
        Core.injectedServices.JsonapiHttp.get(path.get())
            .then(success => {
                tempororay_collection.$source = 'server';
                tempororay_collection.$is_loading = false;

                // this create a new ID for every resource (for caching proposes)
                // for example, two URL return same objects but with different attributes
                if (params.cachehash) {
                    Base.forEach(success.data, resource => {
                        resource.id = resource.id + params.cachehash;
                    });
                }

                Converter.build(success /*.data*/, tempororay_collection);

                this.getService().cachememory.setCollection(
                    path.getForCache(),
                    tempororay_collection
                );
                if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
                    this.getService().cachestore.setCollection(
                        path.getForCache(),
                        tempororay_collection,
                        params.include
                    );
                }

                // localfilter getted data
                let localfilter = new LocalFilter(params.localfilter);
                localfilter.filterCollection(
                    tempororay_collection,
                    cached_collection
                );

                // trying to define smartfiltertype
                if (this.smartfiltertype === 'undefined') {
                    let page = tempororay_collection.page;
                    if (
                        page.number === 1 &&
                        page.total_resources <= page.resources_per_page
                    ) {
                        this.smartfiltertype = 'localfilter';
                    } else if (
                        page.number === 1 &&
                        page.total_resources > page.resources_per_page
                    ) {
                        this.smartfiltertype = 'remotefilter';
                    }
                }

                subject.next(tempororay_collection);
                subject.complete();
                this.runFc(fc_success, success);
            })
            .catch(error => {
                // do not replace $source, because localstorage don't write if = server
                // tempororay_collection.$source = 'server';
                tempororay_collection.$is_loading = false;
                subject.next(tempororay_collection);
                subject.error(error);
                this.runFc(fc_error, error);
            });
    }

    private _delete(id: string, params, fc_success, fc_error): Observable<void> {
        // http request
        let path = new PathBuilder();
        path.applyParams(this, params);
        path.appendPath(id);

        let subject = new Subject<void>();

        Core.injectedServices.JsonapiHttp.delete(path.get())
            .then(success => {
                this.getService().cachememory.removeResource(id);
                subject.next();
                subject.complete();
                this.runFc(fc_success, success);
            })
            .catch(error => {
                subject.error(error);
                this.runFc(fc_error, error);
            });


        return subject.asObservable();
    }

    /*
    @return This resource like a service
    */
    public getService<T extends Service<R>>(): T {
        return <T>(Converter.getService(this.type) || this.register());
        // let serv = Converter.getService(this.type);
        // if (serv) {
        //     return serv;
        // } else {
        //     return this.register();
        // }
    }

    public clearCacheMemory(): boolean {
        let path = new PathBuilder();
        path.applyParams(this);

        return (
            this.getService().cachememory.deprecateCollections(
                path.getForCache()
            ) &&
            this.getService().cachestore.deprecateCollections(
                path.getForCache()
            )
        );
    }

    public parseToServer(attributes: IAttributes): void {
        /* */
    }

    public parseFromServer(attributes: IAttributes): void {
        /* */
    }
}
