import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from 'ngx-jsonapi';

import { forEach } from '../../foreach';
import { AuthorsService } from '../../authors/authors.service';
import { BooksService } from './../books.service';
import { PhotosService } from '../../photos/photos.service';

@Component({
    selector: 'demo-book',
    templateUrl: './book.component.html'
})
export class BookComponent {
    public book: Resource;

    public constructor(
        protected authorsService: AuthorsService,
        protected booksService: BooksService,
        protected photosService: PhotosService,
        private route: ActivatedRoute
    ) {
        route.params.subscribe(({ id }) => {
            this.book = booksService.get(
                id,
                { include: ['author', 'photos'] },
                success => {
                    console.log('success book       ', this.book);
                    // console.log('success book object', this.book.toObject({ include: ['authors', 'photos'] }));
                    // console.log('success book relationships', this.book.toObject({ include: ['authors', 'photos'] }).data.relationships);
                    // console.log('success book included', this.book.toObject({ include: ['authors', 'photos'] }).included);
                },
                error => {
                    console.log('error books controll', error);
                }
            );
        });

    }

    public getAuthorName(book: Resource): string {
        let data = <Resource>book.relationships.author.data;
        return data.attributes ? data.attributes.name : '';
    }
}
