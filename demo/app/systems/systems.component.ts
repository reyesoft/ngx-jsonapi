import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DocumentCollection } from 'ngx-jsonapi';
import { System, SystemsService } from './systems.service';
import { CollectionInfoComponent } from '../shared/collection-info.component';
import { CollectionPaginatorComponent } from '../shared/collection-paginator.component';

@Component({
    selector: 'bc-systems',
    templateUrl: './systems.component.html',
    standalone: true,
    imports: [CommonModule, CollectionInfoComponent, CollectionPaginatorComponent]
})
export class SystemsComponent {
    public systems: DocumentCollection<System>;

    public constructor(private route: ActivatedRoute, private authorsService: SystemsService) {
        route.queryParams.subscribe(({ page }) => {
            authorsService
                .all()
                .subscribe(
                    systems => {
                        this.systems = systems;
                    },
                    error => console.error('Could not load authors :(', error)
                );
        });
    }
}
