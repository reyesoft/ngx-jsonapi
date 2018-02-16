import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './components/book.component';
import { BooksComponent } from './components/books.component';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
    imports: [
        CommonModule,
        BooksRoutingModule
    ],
    declarations: [
        BookComponent,
        BooksComponent
    ]
})
export class BooksModule { }
