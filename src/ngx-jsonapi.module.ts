import { StoreFakeService } from './sources/store-fake.service';
import { JsonRipperFake } from './services/json-ripper-fake';
import { NgModule, ModuleWithProviders, Optional, SkipSelf, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { Http as JsonapiHttp } from './sources/http.service';

// testing
import { JsonapiConfig } from './jsonapi-config';

// DO NOT REMOVE THIS. With this, typescript create interfaces and source code on build.
// If its removed, it's impossible to use local store.
import { AngularBootstrap } from './bootstraps/angular-bootstrap';

@NgModule({
    imports: [CommonModule],
    exports: [
        // BrowserModule,  // needed by HttpClientModule?
        HttpClientModule
    ],
    providers: [
        {
            provide: JSONAPI_RIPPER_SERVICE,
            useClass: JsonRipperFake
        },
        {
            provide: JSONAPI_STORE_SERVICE,
            useClass: StoreFakeService
        },
        JsonapiConfig, // Need this here for testing
        JsonapiHttp,
    ]
})
export class NgxJsonapiModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: NgxJsonapiModule,
        @Optional() user_config: JsonapiConfig, jsonapiHttp: JsonapiHttp, injector: Injector,
    ) {
        if (parentModule) {
            throw new Error('NgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
        AngularBootstrap.bootstrap(user_config, jsonapiHttp, injector);
    }

    public static forRoot(config: JsonapiConfig): ModuleWithProviders<NgxJsonapiModule> {
        return {
            ngModule: NgxJsonapiModule,
            providers: [{ provide: JsonapiConfig, useValue: config }]
        };
    }
}
