import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCollection } from 'ngx-jsonapi';

@Component({
    selector: 'demo-collection-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './collection-info.component.html'
})
export class CollectionInfoComponent {
    @Input({ required: true }) public collection!: DocumentCollection;
}
