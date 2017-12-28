import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource, IRelationship, ICollection } from 'ngx-jsonapi';

import { forEach } from '../../../foreach';
import { PhotosService } from '../../photos/photos.service';
import { AuthorsService, Author } from '../authors.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'demo-author',
    templateUrl: './author.component.html'
})
export class AuthorComponent {
    public author: Author;
    public relatedbooks: Array<Resource>;

    public constructor(
        protected authorsService: AuthorsService,
        protected photosService: PhotosService,
        private route: ActivatedRoute
    ) {
        route.params.subscribe(({ id }) => {
            authorsService.get(
                id,
                { include: ['books', 'photos'] }
            )
            .subscribe(
                author => {
                    this.author = author;
                    console.info('success author controller', author);
                },
                error => console.error('Could not load author.'
            )
        );
    });
    //
    // this.relatedbooks = BooksService.all(
    //     { beforepath: 'authors/' + $stateParams.authorId },
    //     () => {
    //         console.info('Books from authors relationship', this.relatedbooks);
    //     }
    // );
}

/*
Add a new author
*/
public newAuthor() {
    let author = this.authorsService.new();
    author.attributes.name = prompt('New author name:', 'John Doe');
    if (!author.attributes.name) {
        return ;
    }
    author.attributes.date_of_birth = '2030-12-10';
    console.log('author data for save', author.toObject());
    author.save(
        /* { include: ['book'] } */
        success => {
            console.log('author saved', author.toObject());
        }
    );
}

/*
Update name for actual author
*/
public updateAuthor() {
    this.author.attributes.name = prompt('Author name:', this.author.attributes.name);
    console.log('author data for save with book include', this.author.toObject({ include: ['books'] }));
    console.log('author data for save without any include', this.author.toObject());
    this.author.save(
        /* { include: ['book'] } */
        success => {
            console.log('author saved', this.author.toObject());
        }
    );
}

public getPhotos(author: Resource): Array<Resource> {
    return (<ICollection>author.relationships.photos.data).$toArray;
}

public removeRelationship() {
    this.author.removeRelationship('photos', '1');
    this.author.save();
    console.log('removeRelationship save with photos include', this.author.toObject());
}
}
