import { Component, Input } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';

@Component({
    selector: 'demo-collection-paginator',
    standalone: false,
    templateUrl: './collection-paginator.component.html'
})
export class CollectionPaginatorComponent {
    @Input() public collection: DocumentCollection;
}
