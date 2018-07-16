import { Injectable, Optional, Inject } from '@angular/core';
import { noop } from 'rxjs/util/noop';

import { ICollection, IRelationshipResource, IRelationshipCollection } from './interfaces';
import { Service } from './service';
import { Resource } from './resource';
import { Base } from './services/base';
import { JsonapiConfig } from './jsonapi-config';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
import { IRelationshipNone } from './interfaces/';
import { forEach } from './foreach';

import { IDataObject } from './interfaces/data-object';
import { Deferred } from './shared/deferred';

@Injectable()
export class Core {
    public static me: Core;
    public static injectedServices: {
        JsonapiStoreService: any;
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

    public static async delete(path: string): Promise<IDataObject> {
        return Core.exec(path, 'DELETE');
    }

    public static async get(path: string): Promise<IDataObject> {
        return Core.exec(path, 'get');
    }

    public static async exec(path: string, method: string, data?: IDataObject, call_loadings_error: boolean = true) {
        // let fakeHttpPromise = Core.injectedServices.JsonapiHttp.exec(path, method, data);
        let fakeHttpPromise = Core.injectedServices.JsonapiHttp.exec(path, method);
        let deferred: Deferred<IDataObject> = new Deferred();
        Core.me.refreshLoadings(1);
        fakeHttpPromise
            .then(success => {
                success = success.body || success;
                Core.me.refreshLoadings(-1);
                deferred.resolve(success);
            })
            .catch(error => {
                error = error.error || error;
                Core.me.refreshLoadings(-1);
                if (error.status <= 0) {
                    // offline?
                    if (!Core.me.loadingsOffline(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                    }
                } else {
                    if (call_loadings_error && !Core.me.loadingsError(error)) {
                        console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
                    }
                }
                deferred.reject(error);
            });

        return deferred.promise;
    }

    public registerService<R extends Resource>(clase: Service): Service<R> | false {
        if (clase.type in this.resourceServices) {
            return false;
        }
        this.resourceServices[clase.type] = clase;

        return <Service<R>>clase;
    }

    public getResourceService(type: string): Service {
        return this.resourceServices[type];
    }

    public refreshLoadings(factor: number): void {
        this.loadingsCounter += factor;
        if (this.loadingsCounter === 0) {
            this.loadingsDone();
        } else if (this.loadingsCounter === 1) {
            this.loadingsStart();
        }
    }

    public clearCache(): boolean {
        Core.injectedServices.JsonapiStoreService.clearCache();

        return true;
    }

    // just an helper
    public duplicateResource<R extends Resource>(resource: R, ...relations_alias_to_duplicate_too: Array<string>): R {
        let newresource = <R>this.getResourceService(resource.type).new();
        newresource.attributes = { ...newresource.attributes, ...resource.attributes };

        forEach(resource.relationships, (alias: string, relationship: IRelationshipResource | IRelationshipCollection) => {
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
                    Base.forEach(relationship.data, relationresource => {
                        newresource.addRelationship(this.duplicateResource(relationresource), alias);
                    });
                } else {
                    newresource.addRelationships(<ICollection>relationship.data, alias);
                }
            }
        });

        return newresource;
    }
}
