import { BooksService } from './../../books/books.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DocumentCollection, Photo } from 'ngx-jsonapi';
import { AuthorsService, Author } from './../authors.service';
import { CollectionInfoComponent } from '../../shared/collection-info.component';
import { ResourceInfoComponent } from '../../shared/resource-info.component';
import { CollectionPaginatorComponent } from '../../shared/collection-paginator.component';

@Component({
    selector: 'demo-authors',
    standalone: true,
    imports: [CommonModule, RouterModule, CollectionInfoComponent, ResourceInfoComponent, CollectionPaginatorComponent],
    templateUrl: './authors.component.html',
    providers: [AuthorsService, BooksService]
})
export class AuthorsComponent {
    public authors: DocumentCollection<Author> | null = null;

    public constructor(
        private route: ActivatedRoute,
        private authorsService: AuthorsService,
        booksService: BooksService
    ) {
        route.queryParams.subscribe(({ page }) => {
            authorsService
                .all({
                    include: ['books'],
                    sort: ['name'],
                    // eslint-disable-next-line id-blacklist
                    page: { number: page || 1 },
                    ttl: 3600
                })
                .subscribe(
                    (authors) => {
                        this.authors = authors;
                    },
                    (error) => console.error('Could not load authors :(', error)
                );
        });
    }
}
