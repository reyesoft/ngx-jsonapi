import { JsonRipper } from './services/json-ripper';
import { CacheMemory } from './services/cachememory';
import { Injectable, Optional, isDevMode } from '@angular/core';
import { serviceIsRegistered } from './common';
import { PathBuilder } from './services/path-builder';
import { Service } from './service';
import { Resource } from './resource';
import { JsonapiConfig } from './jsonapi-config';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
import { IDocumentResource } from './interfaces/data-object';
import { noop } from 'rxjs/internal/util/noop';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IDocumentData } from './interfaces/document';

@Injectable()
export class Core {
    public static me: Core;
    public static injectedServices: {
        JsonapiStoreService: JsonapiStore;
        JsonapiHttp: JsonapiHttpImported;
        rsJsonapiConfig: JsonapiConfig;
    };
    public loadingsCounter: number = 0;
    public loadingsStart: Function = noop;
    public loadingsDone: Function = noop;
    public loadingsError: Function = noop;
    public loadingsOffline: Function = noop;
    public config: JsonapiConfig;

    private resourceServices: { [type: string]: Service } = {};

    public constructor(@Optional() user_config: JsonapiConfig, jsonapiStoreService: JsonapiStore, jsonapiHttp: JsonapiHttpImported) {
        this.config = new JsonapiConfig();
        for (let k in this.config) {
            (<any>this.config)[k] = user_config[k] !== undefined ? user_config[k] : (<any>this.config)[k];
        }

        Core.me = this;
        Core.injectedServices = {
            JsonapiStoreService: jsonapiStoreService,
            JsonapiHttp: jsonapiHttp,
            rsJsonapiConfig: this.config
        };
    }

    public static delete(path: string): Observable<IDocumentData> {
        return Core.exec(path, 'DELETE');
    }

    public static get(path: string): Observable<IDocumentData> {
        return Core.exec(path, 'get');
    }

    public static exec(
        path: string,
        method: string,
        data?: IDocumentResource,
        call_loadings_error: boolean = true
    ): Observable<IDocumentData> {
        Core.me.refreshLoadings(1);

        return Core.injectedServices.JsonapiHttp.exec(path, method, data).pipe(
            // map(data => { return data.body }),
            tap(() => Core.me.refreshLoadings(-1)),
            catchError(error => {
                error = error.error || error;
                Core.me.refreshLoadings(-1);

                if (error.status <= 0) {
                    // offline?
                    if (!Core.me.loadingsOffline(error) && isDevMode()) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                    }
                } else if (call_loadings_error && !Core.me.loadingsError(error) && isDevMode()) {
                    console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
                }

                return throwError(error);
            })
        );
    }

    public registerService<R extends Resource>(clase: Service): Service<R> | false {
        if (clase.type in this.resourceServices) {
            return false;
        }
        this.resourceServices[clase.type] = clase;

        return <Service<R>>clase;
    }

    // @todo this function could return an empty value, fix required
    public getResourceService(type: string): Service | undefined {
        return this.resourceServices[type];
    }

    public getResourceServiceOrFail(type: string): Service {
        let service = this.resourceServices[type];
        if (!service) {
            throw new Error(
                `The requested service with type ${type} has not been registered, please use register() method or @Autoregister() decorator`
            );
        }

        return service;
    }

    @serviceIsRegistered
    public static removeCachedResource(resource_type: string, resource_id: string): void {
        CacheMemory.getInstance().removeResource(resource_type, resource_id);
        if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // TODO: FE-85 ---> add method on JsonRipper
        }
    }

    @serviceIsRegistered
    public static setCachedResource(resource: Resource): void {
        CacheMemory.getInstance().setResource(resource, true);
        if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // TODO: FE-85 ---> add method on JsonRipper
        }
    }

    @serviceIsRegistered
    public static deprecateCachedCollections(type: string): void {
        let service = Core.me.getResourceServiceOrFail(type);
        let path = new PathBuilder();
        path.applyParams(service);
        CacheMemory.getInstance().deprecateCollections(path.getForCache());
        if (Core.injectedServices.rsJsonapiConfig.cachestore_support) {
            // TODO: FE-85 ---> add method on JsonRipper
        }
    }

    public refreshLoadings(factor: number): void {
        this.loadingsCounter += factor;
        if (this.loadingsCounter === 0) {
            this.loadingsDone();
        } else if (this.loadingsCounter === 1) {
            this.loadingsStart();
        }
    }

    public async clearCache(): Promise<boolean> {
        Core.injectedServices.JsonapiStoreService.clearCache();
        CacheMemory.getInstance().deprecateCollections('');
        let json_ripper = new JsonRipper();

        return json_ripper.deprecateCollection('').then(() => true);
    }

    // just an helper
    public duplicateResource<R extends Resource>(resource: R, ...relations_alias_to_duplicate_too: Array<string>): R {
        let newresource = <R>this.getResourceServiceOrFail(resource.type).new();
        newresource.id = 'new_' + Math.floor(Math.random() * 10000).toString();
        newresource.attributes = { ...newresource.attributes, ...resource.attributes };

        for (const alias in resource.relationships) {
            let relationship = resource.relationships[alias];

            if (!relationship.data) {
                newresource.relationships[alias] = resource.relationships[alias];
                continue;
            }

            if ('id' in relationship.data) {
                // relation hasOne
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    newresource.addRelationship(this.duplicateResource(<Resource>relationship.data), alias);
                } else {
                    newresource.addRelationship(<Resource>relationship.data, alias);
                }
            } else {
                // relation hasMany
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    relationship.data.forEach(relationresource => {
                        newresource.addRelationship(this.duplicateResource(<R>relationresource), alias);
                    });
                } else {
                    newresource.addRelationships(<Array<Resource>>relationship.data, alias);
                }
            }
        }

        return newresource;
    }
}
