import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
import { AuthorsService } from '../../authors/authors.service';
import { BooksService, Book } from './../books.service';
import { PhotosService } from '../../photos/photos.service';
import { ResourceInfoComponent } from '../../shared/resource-info.component';

@Component({
    selector: 'demo-book',
    imports: [CommonModule, ResourceInfoComponent],
    standalone: true,
    templateUrl: './book.component.html'
})
export class BookComponent {
    public book: Book;

    public constructor(
        protected authorsService: AuthorsService,
        protected booksService: BooksService,
        protected photosService: PhotosService,
        private route: ActivatedRoute
    ) {
        route.params.subscribe(({ id }) => {
            booksService.get(id, { include: ['author', 'photos'] }).subscribe(
                book => {
                    this.book = book;
                    console.log('success book', this.book);
                },
                error => console.log('error books controll', error)
            );
        });
    }

    public getAuthorName(book: Resource): string {
        let data: Resource = <Resource>book.relationships.author.data;

        return data.attributes ? data.attributes.name : '';
    }
}
