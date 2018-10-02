import { Injectable } from '@angular/core';
import { Autoregister, Service, Resource, DocumentCollection, DocumentResource } from 'ngx-jsonapi';
import { Author } from '../authors/authors.service';
import { Photo } from '../photos/photos.service';

export class Book extends Resource {
    public attributes = {
        date_published: '',
        title: '',
        created_at: '',
        updated_at: ''
    };

    public relationships = {
        author: new DocumentResource<Author>(),
        photos: new DocumentCollection<Photo>()
    };
}

@Injectable()
@Autoregister()
export class BooksService extends Service<Book> {
    public resource = Book;
    public type = 'books';
    public ttl = 1;

    // executed before get data from server
    public parseFromServer(attributes): void {
        attributes.title = '📖 ' + attributes.title;
    }

    // executed before send to server
    public parseToServer(attributes): void {
        if ('title' in attributes) {
            attributes.title = attributes.title.replace('📖 ', '');
        }
    }
}
