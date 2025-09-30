import { Injectable } from '@angular/core';
import { Service, Resource, DocumentCollection, DocumentResource } from 'ngx-jsonapi';
import { Author } from '../authors/authors.service';
import { Photo } from '../photos/photos.service';

export class Book extends Resource {
    public attributes: {
        date_published: string;
        title: string;
        created_at: string;
        updated_at: string;
    } = {
        date_published: '',
        title: '',
        created_at: '',
        updated_at: ''
    };

    public relationships: {
        author: DocumentResource<Author>;
        photos: DocumentCollection<Photo>;
    } = {
        author: new DocumentResource<Author>(),
        photos: new DocumentCollection<Photo>()
    };
}

@Injectable()
export class BooksService extends Service<Book> {
    public resource: typeof Book = Book;
    public type: string = 'books';
    public ttl: number = 1;

    // executed before get data from server
    public parseFromServer(attributes: { title: string; [key: string]: unknown }): void {
        attributes.title = '📖 ' + attributes.title;
    }

    // executed before send to server
    public parseToServer(attributes: { title?: string; [key: string]: unknown }): void {
        if ('title' in attributes && typeof attributes.title === 'string') {
            attributes.title = attributes.title.replace('📖 ', '');
        }
    }
}
