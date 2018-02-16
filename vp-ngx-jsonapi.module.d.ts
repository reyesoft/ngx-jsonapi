import { ModuleWithProviders } from '@angular/core';
import { Core as JsonapiCore } from './core';
import { JsonapiConfig } from './jsonapi-config';
export declare class VpNgxJsonapiModule {
    static forRoot(config: JsonapiConfig): ModuleWithProviders;
    constructor(parentModule: VpNgxJsonapiModule, jsonapiCore: JsonapiCore);
}
