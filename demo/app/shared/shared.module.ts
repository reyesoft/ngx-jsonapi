import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionInfoComponent } from './collection-info.component';

@NgModule({
    imports: [CommonModule],
    exports: [CollectionInfoComponent],
    declarations: [CollectionInfoComponent]
})
export class SharedModule {}
