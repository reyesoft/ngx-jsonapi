import { Component } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { BooksService, Book } from './../books.service';
import { AuthorsService } from './../../authors/authors.service';
import { PhotosService } from '../../photos/photos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'demo-books',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    public books: DocumentCollection<Book>;

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
                    books => {
                        this.books = books;
                        // console.info('success books controll', this.books);
                        books.data.forEach(element => {
                            console.log('element', books.builded, element.relationships.author.data);
                            console.log('element', books.builded, element.relationships.author.data.relationships);
                        });
                    },
                    (error): void => console.info('error books controll', error)
                );
        });
    }

    public getAll(remotefilter) {
        // we add some remote filter
        remotefilter.date_published = {
            since: '1983-01-01',
            until: '2010-01-01'
        };

        let books$ = this.booksService.all({
            remotefilter: remotefilter,
            page: { number: 1 },
            include: ['author', 'photos']
        });
        books$.subscribe(
            books => {
                this.books = books;

                console.log('success books controller', this.books);
            },
            error => console.info('error books controller', error)
        );
        books$.toPromise().then(success => console.log('books loaded PROMISE'));
    }

    public delete(book: Resource) {
        this.booksService.delete(book.id);
    }
}
