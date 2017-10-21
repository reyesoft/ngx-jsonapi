import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResource } from 'ngx-jsonapi';

import { forEach } from '@demo/foreach';
import { AuthorsService } from '@demo/authors/authors.service';
import { BooksService } from './books.service';
import { PhotosService } from '@demo/photos/photos.service';

@Component({
    selector: 'demo-book',
    templateUrl: './book.component.html'
})
export class BookComponent {
    public book: IResource;

    public constructor(
        protected authorsService: AuthorsService,
        protected booksService: BooksService,
        protected photosService: PhotosService,
        private route: ActivatedRoute
    ) {
        authorsService.register();
        booksService.register();
        photosService.register();

        this.book = booksService.get(
            this.route.snapshot.paramMap.get('id'),
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
    }
}
