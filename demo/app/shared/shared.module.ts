import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionInfoComponent } from './collection-info.component';
import { ResourceInfoComponent } from './resource-info.component';
import { CollectionPaginatorComponent } from './collection-paginator.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [CollectionInfoComponent, ResourceInfoComponent, CollectionPaginatorComponent],
    declarations: [CollectionInfoComponent, ResourceInfoComponent, CollectionPaginatorComponent]
})
export class SharedModule {}
