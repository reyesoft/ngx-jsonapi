import { Photo } from './../../../../src/tests/factories/photos.service';
import { BooksService } from './../../books/books.service';
import { Component } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './../authors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: DocumentCollection<Author>;

    public constructor(private route: ActivatedRoute, private authorsService: AuthorsService, booksService: BooksService) {
        route.queryParams.subscribe(({ page }) => {
            authorsService
                .all({
                    include: ['books'],
                    sort: ['name'],
                    page: { number: page || 1 },
                    ttl: 3600
                })
                .subscribe(
                    authors => {
                        this.authors = authors;
                        this.authors.data.forEach(recurso => {
                            console.info('success', recurso);
                            console.info('books', recurso.relationships.books);
                            console.info('photos', recurso.relationships.photos);
                            console.info('<<<<<<<<<<<<<<<<<<<<<');
                        });
                    },
                    error => console.error('Could not load authors :(', error)
                );
        });
    }
}
