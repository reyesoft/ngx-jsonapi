import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, ICollection } from 'vp-ngx-jsonapi';

import { forEach } from '../../../foreach';
import { AuthorsService } from './../authors.service';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: ICollection;

    public constructor(
        private authorsService: AuthorsService
    ) {
        authorsService.all(
            // { include: ['books', 'photos'] }
        )
        .subscribe(
            authors => {
                this.authors = authors;
                console.info('success authors controller', authors);
            },
            error => console.error('Could not load authors.')
        );
    }
}
