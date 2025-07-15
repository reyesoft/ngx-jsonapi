import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentCollection } from 'ngx-jsonapi';
@Component({
    selector: 'demo-collection-paginator',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './collection-paginator.component.html'
})
export class CollectionPaginatorComponent {
    @Input() public collection: DocumentCollection;
}
