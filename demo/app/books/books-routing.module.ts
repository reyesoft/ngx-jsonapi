import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books.component';
import { BookComponent } from './components/book.component';

export const routes: Routes = [
    {
        path: '',
        component: BooksComponent
    },
    {
        path: ':id',
        component: BookComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule {}
