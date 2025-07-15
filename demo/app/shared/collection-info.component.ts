import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCollection } from 'ngx-jsonapi';
@Component({
    selector: 'demo-collection-info',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './collection-info.component.html'
})
export class CollectionInfoComponent {
    @Input() public collection: DocumentCollection;
}
