import { IResource } from './index';
import { Service } from '../';

export interface ICore {
    // defined on core code too
    injectedServices?: {
        // $q: ng.IQService,
        JsonapiStoreService: any;
        JsonapiHttp: any;
        rsJsonapiConfig: any;
    };
    // static
    me?: Service;

    loadingsCounter: number;
    loadingsStart: Function;
    loadingsDone: Function;
    loadingsError: Function;
    loadingsOffline: Function;

    _register(clase: Service): boolean;
    getResourceService(type: string): Service;
    refreshLoadings(factor: number): void;
    clearCache(): void;
    duplicateResource(resource: IResource, ...relations_types: Array<string>): IResource;

}
