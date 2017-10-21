import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './authors/authors.component';
import { AuthorComponent } from './authors/author.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book.component';

import { NgxJsonapiModule } from 'ngx-jsonapi';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { PhotosService } from './photos/photos.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    { path: 'authors', component: AuthorsComponent },
    { path: 'authors/:id', component: AuthorComponent },
    { path: 'books', component: BooksComponent },
    { path: 'books/:id', component: BookComponent }
    // { path: '**', redirectTo: '/authors', pathMatch: 'full' }
];

@NgModule({
    providers: [
        AuthorsService,
        BooksService,
        PhotosService
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            appRoutes,
            { useHash: true }
        ),
        NgxJsonapiModule.forRoot({
            url: 'http://jsonapiplayground.reyesoft.com/v2/'
        })
    ],
    declarations: [
        AppComponent,
        AuthorsComponent,
        AuthorComponent,
        BooksComponent,
        BookComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
