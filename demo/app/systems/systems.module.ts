import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemsComponent } from './systems.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SystemsService } from './systems.service';

export const routes: Routes = [
    {
        path: '',
        component: SystemsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemsRoutingModule { }


@NgModule({
    declarations: [
        SystemsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SystemsRoutingModule
    ],
    providers: [SystemsService]
})
export class SystemsModule { }
