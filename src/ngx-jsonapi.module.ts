import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { Core as JsonapiCore } from './core';
import { Http as JsonapiHttp } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
import { NoDuplicatedHttpCallsService } from './services/noduplicatedhttpcalls.service';
import { JsonapiConfig } from './jsonapi-config';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        // BrowserModule,  // needed by HttpClientModule?
        HttpClientModule
    ],
    providers: [
        JsonapiCore,
        NoDuplicatedHttpCallsService,
        JsonapiStore,
        JsonapiConfig, // Need this here for testing
        JsonapiHttp
    ]
})
export class NgxJsonapiModule {
    public static forRoot(config: JsonapiConfig): ModuleWithProviders {
        return {
            ngModule: NgxJsonapiModule,
            providers: [
                { provide: JsonapiConfig, useValue: config }
            ]
        };
    }

    public constructor(@Optional() @SkipSelf() parentModule: NgxJsonapiModule, jsonapiCore: JsonapiCore) {
        if (parentModule) {
            throw new Error('NgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
    }
}
