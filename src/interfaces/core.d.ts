import { IService, IResource } from './index';

export interface ICore {
    // jsonapiServices: Object;

    loadingsCounter: number;
    loadingsStart: Function;
    loadingsDone: Function;
    loadingsError: Function;
    loadingsOffline: Function;

    _register(clase: IService): boolean;
    getResourceService(type: string): IService;
    refreshLoadings(factor: number): void;
    clearCache(): void;
    duplicateResource(resource: IResource, ...relations_types: Array<string>): IResource;

    // static
    me?: IService;

    // defined on core code too
    injectedServices?: {
        // $q: ng.IQService,
        JsonapiStoreService: any,
        JsonapiHttp: any,
        rsJsonapiConfig: any
    };
}
