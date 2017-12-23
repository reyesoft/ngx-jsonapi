import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, ICollection } from 'ngx-jsonapi';

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
        this.authors = authorsService.all(
            // { include: ['books', 'photos'] },
            success => {
                console.log('success authors controll', this.authors);
            },
            error => {
                console.log('error authors controll', error);
            }
        );
    }
}
