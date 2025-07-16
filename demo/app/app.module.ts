import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgxJsonapiModule, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from 'ngx-jsonapi';

import { AppComponent } from './app.component';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { PhotosService } from './photos/photos.service';
import { SharedModule } from './shared/shared.module';
import { JsonRipper, StoreService } from '../../projects/ngx-jsonapi-lib/src/lib/store';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        loadChildren: () => import('./authors/authors.module').then((m) => m.AuthorsModule)
    },
    {
        path: 'systems',
        loadChildren: () => import('./systems/systems.module').then((m) => m.SystemsModule)
    },
    {
        path: 'books',
        loadChildren: () => import('./books/books.module').then((m) => m.BooksModule)
    }
];

@NgModule({
    providers: [
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
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        NgxJsonapiModule.forRoot({
            url: environment.api_saldo
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
