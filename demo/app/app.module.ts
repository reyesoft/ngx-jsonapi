import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { PhotosService } from './photos/photos.service';
import { SharedModule } from './shared/shared.module';

import { JsonapiBootstrap } from 'ngx-jsonapi';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        loadChildren: './authors/authors.module#AuthorsModule'
    },
    {
        path: 'books',
        loadChildren: './books/books.module#BooksModule'
    }
];

@NgModule({
    providers: [
        AuthorsService,
        BooksService,
        PhotosService
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    public constructor() {
        JsonapiBootstrap.bootstrap({ user_config: { url: environment.jsonapi_url } });
    }
}
