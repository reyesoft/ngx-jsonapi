import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, ICollection } from 'ngx-jsonapi';

import { forEach } from '@demo/foreach';
import { AuthorsService } from './authors.service';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: ICollection;

    public constructor(
        private authorsService: AuthorsService
    ) {
        // JsonapiCore.loadingsStart = (): void => {
        //     this.loading = 'LOADING...';
        // };
        // JsonapiCore.loadingsDone = (): void => {
        //     this.$scope.loading = '';
        // };
        // JsonapiCore.loadingsOffline = (error): void => {
        //     this.$scope.loading = 'No connection!!!';
        // };
        // JsonapiCore.loadingsError = (error): void => {
        //     this.$scope.loading = 'No connection 2!!!';
        // };

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
