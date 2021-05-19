import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgxJsonapiModule } from 'ngx-jsonapi';

import { AppComponent } from './app.component';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { PhotosService } from './photos/photos.service';
import { SharedModule } from './shared/shared.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        loadChildren: (): Promise<AuthorsModule> => import('./authors/authors.module').then((m): AuthorsModule => m.AuthorsModule)
    },
    {
        path: 'books',
        loadChildren: (): Promise<BooksModule> => import('./books/books.module').then((m): BooksModule => m.BooksModule)
    }
];

@NgModule({
    providers: [AuthorsService, BooksService, PhotosService],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        NgxJsonapiModule.forRoot({
            url: environment.jsonapi_url
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
