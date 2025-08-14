import { DocumentResource } from 'ngx-jsonapi';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'demo-resource-info',
    standalone: false,
    templateUrl: './resource-info.component.html'
})
export class ResourceInfoComponent {
    @Input() public resource: DocumentResource;
}
