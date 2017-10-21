import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResource } from 'ngx-jsonapi';

import { forEach } from '@demo/foreach';
import { PhotosService } from '@demo/photos/photos.service';
import { AuthorsService } from './authors.service';

@Component({
    selector: 'demo-author',
    templateUrl: './author.component.html'
})
export class AuthorComponent {
    public author: IResource;
    public relatedbooks: Array<IResource>;

    public constructor(
        protected authorsService: AuthorsService,
        protected photosService: PhotosService,
        private route: ActivatedRoute
    ) {
        authorsService.register();
        photosService.register();

        this.author = authorsService.get(
            this.route.snapshot.paramMap.get('id'),
            { include: ['books', 'photos'] },
            success => {
                // this.author.attributes.name = this.author.attributes.name + 'x';
                // this.author.save();
                console.info('success authors controller', success);
            },
            error => {
                console.info('error authors controller', error);
            }
        );
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
    public new() {
        let author = this.authorsService.new();
        author.attributes.name = 'Pablo Reyes';
        author.attributes.date_of_birth = '2030-12-10';
        // angular.forEach(this.relatedbooks, (book: Jsonapi.IResource) => {
        //     author.addRelationship(book /* , 'handbook' */);
        // });
        console.log('new save', author.toObject());
        // author.save( /* { include: ['book'] } */ );
    }

    /*
    Update name for actual author
    */
    public update() {
        this.author.attributes.name += 'o';
        this.author.save(
            // { include: ['books'] }
        );
        console.log('update save with book include', this.author.toObject({ include: ['books'] }));
        console.log('update save without any include', this.author.toObject());
    }

    public removeRelationship() {
        this.author.removeRelationship('photos', '1');
        this.author.save();
        console.log('removeRelationship save with photos include', this.author.toObject());
    }
}
