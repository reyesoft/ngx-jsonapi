import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthorComponent } from './components/author.component';
import { AuthorsComponent } from './components/authors.component';

@NgModule({
    imports: [CommonModule, SharedModule, AuthorsRoutingModule, AuthorComponent, AuthorsComponent]
})
export class AuthorsModule {}
