import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from "./environments/environment";
import { NgxJsonapiModule } from 'ngx-jsonapi';

import { AppComponent } from './app.component';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { PhotosService } from './photos/photos.service';
import { PhotosComponent } from './photos/photos.component';

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
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            { useHash: true }
        ),
        NgxJsonapiModule.forRoot({
            url: environment.jsonapi_url
        })
    ],
    declarations: [
        AppComponent,
        PhotosComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
