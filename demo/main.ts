import './polyfills';

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment';
import { NgxJsonapiModule, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from 'ngx-jsonapi';
import { AppComponent } from './app/app.component';
import { AuthorsService } from './app/authors/authors.service';
import { BooksService } from './app/books/books.service';
import { PhotosService } from './app/photos/photos.service';
import { SharedModule } from './app/shared/shared.module';
import { JsonRipper, StoreService } from '../projects/ngx-jsonapi-lib/src/lib/store';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        loadChildren: () => import('./app/authors/authors.module').then((m) => m.AuthorsModule)
    },
    {
        path: 'systems',
        loadChildren: () => import('./app/systems/systems.module').then((m) => m.SystemsModule)
    },
    {
        path: 'books',
        loadChildren: () => import('./app/books/books.module').then((m) => m.BooksModule)
    }
];

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            HttpClientModule,
            SharedModule,
            RouterModule.forRoot(appRoutes, { useHash: true }),
            NgxJsonapiModule.forRoot({
                url: environment.api_saldo,
            })
        ),
        { provide: JSONAPI_RIPPER_SERVICE, useClass: JsonRipper },
        { provide: JSONAPI_STORE_SERVICE, useClass: StoreService },
        AuthorsService,
        BooksService,
        PhotosService
    ]
});
