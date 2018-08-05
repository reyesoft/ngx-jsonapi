import { Component, Input } from '@angular/core';
import { ICollection } from 'ngx-jsonapi';

@Component({
    selector: 'demo-collection-info',
    templateUrl: './collection-info.component.html'
})
export class CollectionInfoComponent {
    @Input() public collection: ICollection;
}
