import { Component, Input } from '@angular/core';
import { DocumentResource } from 'ngx-jsonapi';
@Component({
    selector: 'demo-resource-info',
    templateUrl: './resource-info.component.html'
})
export class ResourceInfoComponent {
    @Input() public resource: DocumentResource;
}
