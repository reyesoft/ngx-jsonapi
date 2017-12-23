import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './components/author.component';
import { AuthorsComponent } from './components/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthorsRoutingModule
    ],
    declarations: [
        AuthorComponent,
        AuthorsComponent
    ]
})
export class AuthorsModule { }
