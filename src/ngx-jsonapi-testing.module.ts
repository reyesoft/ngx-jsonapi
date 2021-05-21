import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Core as JsonapiCore } from './core';
import { Http as JsonapiHttp } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';

// testing
import { JsonapiConfig } from './jsonapi-config';

@NgModule({
    exports: [
        HttpClientTestingModule
    ],
    providers: [
        JsonapiCore,
        JsonapiStore,
        JsonapiConfig, // Need this here for testing
        JsonapiHttp
    ]
})
export class NgxJsonapiTestingModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: NgxJsonapiTestingModule    ) {
        if (parentModule) {
            throw new Error('NgxJsonapiTestingModule is already loaded. Import it in the AppModule only');
        }
    }

    public static forRoot(config: JsonapiConfig): ModuleWithProviders {
        return {
            ngModule: NgxJsonapiTestingModule,
            providers: [{ provide: JsonapiConfig, useValue: config }]
        };
    }
}
