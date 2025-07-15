import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentCollection } from 'ngx-jsonapi';
@Component({
    selector: 'demo-collection-paginator',
    templateUrl: './collection-paginator.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class CollectionPaginatorComponent {
    @Input() public collection: DocumentCollection;
}
