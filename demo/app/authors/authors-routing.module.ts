import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './components/authors.component';
import { AuthorComponent } from './components/author.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthorsComponent
    },
    {
        path: ':id',
        component: AuthorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorsRoutingModule {}
