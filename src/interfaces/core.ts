import { IService, IResource } from './index';

export interface ICore {
    // jsonapiServices: Object;

    // defined on core code too
    injectedServices?: {
        // $q: ng.IQService,
        JsonapiStoreService: any;
        JsonapiHttp: any;
        rsJsonapiConfig: any;
    };
    // static
    me?: IService;

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

}
