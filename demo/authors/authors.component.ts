import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthorsService } from './authors.service';
import { forEach } from '../foreach';
import * as Jsonapi from '@ngx-jsonapi';

@Component({
    selector: 'authors',
    // providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    // encapsulation: ViewEncapsulation.None,
    // styleUrls: ['./app.component.scss'],
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: Jsonapi.ICollection;

    public constructor(
        private authorsService: AuthorsService
    ) {
        // bootstrap all services
        authorsService.register();
        // BooksService.register();
        // PhotosService.register();

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
