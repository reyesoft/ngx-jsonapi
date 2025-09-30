import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CollectionInfoComponent } from '../../shared/collection-info.component';
import { CollectionPaginatorComponent } from '../../shared/collection-paginator.component';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { BooksService, Book } from './../books.service';
import { AuthorsService } from './../../authors/authors.service';
import { PhotosService } from '../../photos/photos.service';
// ActivatedRoute already imported above
import { Observable } from 'rxjs';

@Component({
    selector: 'demo-books',
    standalone: true,
    imports: [CommonModule, RouterModule, CollectionInfoComponent, CollectionPaginatorComponent],
    templateUrl: './books.component.html',
    providers: [BooksService, AuthorsService, PhotosService]
})
export class BooksComponent {
    public books: DocumentCollection<Book> | null = null;

    public constructor(
        private route: ActivatedRoute,
        protected authorsService: AuthorsService,
        protected booksService: BooksService,
        protected photosService: PhotosService
    ) {
        route.queryParams.subscribe(({ page }) => {
            booksService
                .all({
                    page: { number: page || 1 },
                    include: ['author', 'photos']
                })
                .subscribe(
                    (books) => {
                        this.books = books;
                        // console.info('success books controll', this.books);
                    },
                    (error): void => console.log('error books controll', error)
                );
        });
    }

    public getAll(remotefilter: Record<string, unknown>): void {
        // we add some remote filter
        remotefilter.date_published = {
            since: '1983-01-01',
            until: '2010-01-01'
        };

        const books$: Observable<DocumentCollection<Book>> = this.booksService.all({
            remotefilter: remotefilter,

            page: { number: 1 },
            include: ['author', 'photos']
        });
        books$.subscribe(
            (books) => {
                this.books = books;

                console.log('success books controller', this.books);
            },
            (error) => console.log('error books controller', error)
        );
        books$.toPromise().then((_success) => console.log('books loaded PROMISE'));
    }

    public delete(book: Resource): void {
        this.booksService.delete(book.id);
    }
}
