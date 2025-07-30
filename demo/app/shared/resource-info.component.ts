import { DocumentResource } from './../../../src/document-resource';
import { Component, Input } from '@angular/core';
@Component({
    selector: 'demo-resource-info',
    templateUrl: './resource-info.component.html'
})
export class ResourceInfoComponent {
    @Input() public resource: DocumentResource;
}
