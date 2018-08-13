import { Component } from '@angular/core';
import { ICollection } from 'ngx-jsonapi';
import 'rxjs/add/operator/finally';
import { AuthorsService } from './../authors.service';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: ICollection;

    public constructor(private authorsService: AuthorsService) {
        authorsService
            .all({
                // include: ['books', 'photos'],
                // localfilter: {
                //     name: 'y',                  // authors with a `y` character on name
                //     date_of_birth: /^2016\-.*/  // we can use regular expresions too :)
                // },
                sort: ['name'],
                ttl: 3600
            })
            .subscribe(
                authors => {
                    this.authors = authors;
                    console.info('success authors controller', authors);
                },
                error => console.error('Could not load authors.')
            );
    }
}
