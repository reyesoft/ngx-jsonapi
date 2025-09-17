import { DocumentResource } from 'ngx-jsonapi';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'demo-resource-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './resource-info.component.html'
})
export class ResourceInfoComponent {
    @Input({ required: true }) public resource!: DocumentResource;
}
