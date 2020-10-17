import { StoreFakeService } from './sources/store-fake.service';
import { JsonRipperFake } from './services/json-ripper-fake';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { Core as JsonapiCore, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { Http as JsonapiHttp } from './sources/http.service';

// testing
import { JsonapiConfig } from './jsonapi-config';

// DO NOT REMOVE THIS. With this, typescript create interfaces and source code on build.
// If its removed, it's impossible to use local store.
import { JsonRipper } from './services/json-ripper';
import { StoreService } from './sources/store.service';

@NgModule({
    imports: [CommonModule],
    exports: [
        // BrowserModule,  // needed by HttpClientModule?
        HttpClientModule
    ],
    providers: [
        JsonapiCore,
        {
            provide: JSONAPI_RIPPER_SERVICE,
            useClass: JsonRipperFake
        },
        {
            provide: JSONAPI_STORE_SERVICE,
            useClass: StoreFakeService
        },
        JsonapiConfig, // Need this here for testing
        JsonapiHttp
    ]
})
export class NgxJsonapiModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: NgxJsonapiModule,
        jsonapiCore: JsonapiCore
    ) {
        if (parentModule) {
            throw new Error('NgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
    }

    public static forRoot(config: JsonapiConfig): ModuleWithProviders<NgxJsonapiModule> {
        return {
            ngModule: NgxJsonapiModule,
            providers: [{ provide: JsonapiConfig, useValue: config }]
        };
    }
}
