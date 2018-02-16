import { Service } from './service';
import { Resource } from './resource';
import { JsonapiConfig } from './jsonapi-config';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
export declare class Core {
    static me: Core;
    static injectedServices: {
        JsonapiStoreService: any;
        JsonapiHttp: JsonapiHttpImported;
        rsJsonapiConfig: JsonapiConfig;
    };
    private resourceServices;
    loadingsCounter: number;
    loadingsStart: Function;
    loadingsDone: Function;
    loadingsError: Function;
    loadingsOffline: Function;
    config: JsonapiConfig;
    constructor(user_config: JsonapiConfig, jsonapiStoreService: JsonapiStore, jsonapiHttp: JsonapiHttpImported);
    registerService<R extends Resource>(clase: Service): Service<R> | false;
    getResourceService(type: string): Service;
    refreshLoadings(factor: number): void;
    clearCache(): boolean;
    duplicateResource(resource: Resource, ...relations_alias_to_duplicate_too: Array<string>): Resource;
}
