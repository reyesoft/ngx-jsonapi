import { DocumentResource } from 'ngx-jsonapi';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'demo-resource-info',
    standalone: true,
    imports: [],
    templateUrl: './resource-info.component.html'
})
export class ResourceInfoComponent {
    @Input({ required: true }) public resource!: DocumentResource;
}
