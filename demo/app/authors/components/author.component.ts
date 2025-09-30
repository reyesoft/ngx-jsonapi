import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
import { CollectionInfoComponent } from '../../shared/collection-info.component';
import { ResourceInfoComponent } from '../../shared/resource-info.component';
import { PhotosService } from '../../photos/photos.service';
import { AuthorsService, Author } from '../authors.service';
import { BooksService } from '../../books/books.service';

@Component({
    selector: 'demo-author',
    standalone: true,
    imports: [CommonModule, RouterModule, ResourceInfoComponent, CollectionInfoComponent],
    templateUrl: './author.component.html'
})
export class AuthorComponent {
    public author: Author | null = null;
    public relatedbooks: Array<Resource> | null = null;

    public constructor(
        protected authorsService: AuthorsService,
        protected photosService: PhotosService,
        _booksService: BooksService,
        private route: ActivatedRoute
    ) {
        route.params.subscribe(({ id }) => {
            authorsService.get(id, { include: ['books', 'photos'], ttl: 100 }).subscribe(
                (author) => {
                    this.author = author;
                },
                (error) => console.error('Could not load author.', error)
            );
        });
    }

    /*n
    Add a new author
    */
    public newAuthor(): void {
        const author: Author = this.authorsService.new();
        const name: string | null = prompt('New author name:', 'John Doe');
        author.attributes.name = name || '';
        if (!author.attributes.name) {
            return;
        }
        author.attributes.date_of_birth = '2030-12-10';
        console.log('author data for save', author.toObject());
        author
            .save
            /* { include: ['book'] } */
            ()
            .subscribe((_success) => {
                console.log('author saved', author.toObject());
            });
    }

    /*
    Update name for actual author
    */
    public updateAuthor(): void {
        const currentAuthor: Author | null = this.author;
        if (!currentAuthor) return;

        const newName: string | null = prompt('Author name:', currentAuthor.attributes.name);
        currentAuthor.attributes.name = newName || currentAuthor.attributes.name;
        console.log('author data for save with book include', currentAuthor.toObject({ include: ['books'] }));
        console.log('author data for save without any include', currentAuthor.toObject());
        currentAuthor.save(/* { include: ['book'] } */).subscribe((_success) => {
            console.log('author saved', currentAuthor.toObject());
        });
    }

    public removeRelationship(): void {
        const currentAuthor: Author | null = this.author;
        if (!currentAuthor) return;

        currentAuthor.removeRelationship('photos', '1');
        currentAuthor.save();
        console.log('removeRelationship save with photos include', currentAuthor.toObject());
    }
}
