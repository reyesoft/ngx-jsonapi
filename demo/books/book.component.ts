import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthorsService } from '@demo/authors/authors.service';
import { BooksService } from './books.service';
import { PhotosService } from '@demo/photos/photos.service';
import { forEach } from '@demo/foreach';
import * as Jsonapi from '@ngx-jsonapi';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'demo-book',
    // providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    // encapsulation: ViewEncapsulation.None,
    // styleUrls: ['./app.component.scss'],
    templateUrl: './book.component.html'
})
export class BookComponent {
    public book: Jsonapi.IResource;

    /** @ngInject */
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
