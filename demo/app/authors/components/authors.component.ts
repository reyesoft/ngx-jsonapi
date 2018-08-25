import { Component } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './../authors.service';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: DocumentCollection<Author>;

    public constructor(private authorsService: AuthorsService) {
        authorsService
            .all({
                // include: ['books', 'photos'],
                sort: ['name'],
                ttl: 3600
            })
            .subscribe(
                authors => {
                    this.authors = authors;
                    console.info('success authors controller', authors);
                },
                error => console.error('Could not load authors :(', error)
            );
    }
}
