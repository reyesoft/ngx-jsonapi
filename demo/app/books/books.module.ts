import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './components/book.component';
import { BooksComponent } from './components/books.component';

@NgModule({
    imports: [CommonModule, SharedModule, BooksRoutingModule, BookComponent, BooksComponent]
})
export class BooksModule {}
