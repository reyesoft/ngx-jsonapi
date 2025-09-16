import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { NgxJsonapiModule, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE, StoreService, JsonRipper } from 'ngx-jsonapi';
import { AuthorsService } from './app/authors/authors.service';
import { BooksService } from './app/books/books.service';
import { PhotosService } from './app/photos/photos.service';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(),
        importProvidersFrom(
            NgxJsonapiModule.forRoot({
                url: 'http://jsonapiplayground.reyesoft.com/v2/',
                cache_prerequests: true
            })
        ),
        {
            provide: JSONAPI_RIPPER_SERVICE,
            useClass: JsonRipper
        },
        {
            provide: JSONAPI_STORE_SERVICE,
            useClass: StoreService
        },
        AuthorsService,
        BooksService,
        PhotosService
    ]
});
