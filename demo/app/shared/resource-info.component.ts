import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentResource } from 'ngx-jsonapi';
@Component({
    selector: 'demo-resource-info',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './resource-info.component.html'
})
export class ResourceInfoComponent {
    @Input() public resource: DocumentResource;
}
