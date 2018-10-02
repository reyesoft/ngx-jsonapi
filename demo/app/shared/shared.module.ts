import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionInfoComponent } from './collection-info.component';
import { CollectionPaginatorComponent } from './collection-paginator.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [CollectionInfoComponent, CollectionPaginatorComponent],
    declarations: [CollectionInfoComponent, CollectionPaginatorComponent]
})
export class SharedModule {}
