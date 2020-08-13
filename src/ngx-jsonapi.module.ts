import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { Core as JsonapiCore } from './core';
import { Http as JsonapiHttp } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';

// testing
import { JsonapiConfig } from './jsonapi-config';

@NgModule({
    imports: [CommonModule],
    exports: [
        // BrowserModule,  // needed by HttpClientModule?
        HttpClientModule
    ],
    providers: [
        JsonapiCore,
        JsonapiStore,
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
