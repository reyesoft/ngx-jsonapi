import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentCollection } from 'ngx-jsonapi';
import { System, SystemsService } from './systems.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'bc-systems',
    templateUrl: './systems.component.html',
    standalone: false,
    styles: []
})
export class SystemsComponent {
    public systems: DocumentCollection<System>;

    public constructor(
        private route: ActivatedRoute,
        private authorsService: SystemsService
    ) {
        route.queryParams.subscribe(({ page }) => {
            authorsService.all().subscribe(
                (systems) => {
                    this.systems = systems;
                },
                (error) => console.error('Could not load authors :(', error)
            );
        });
    }
}
