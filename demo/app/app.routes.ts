import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        children: [
            { path: '', loadComponent: () => import('./authors/components/authors.component').then((c) => c.AuthorsComponent) },
            { path: ':id', loadComponent: () => import('./authors/components/author.component').then((c) => c.AuthorComponent) }
        ]
    },
    {
        path: 'systems',
        children: [{ path: '', loadComponent: () => import('./systems/systems.component').then((c) => c.SystemsComponent) }]
    },
    {
        path: 'books',
        children: [
            { path: '', loadComponent: () => import('./books/components/books.component').then((c) => c.BooksComponent) },
            { path: ':id', loadComponent: () => import('./books/components/book.component').then((c) => c.BookComponent) }
        ]
    }
];
