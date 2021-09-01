import { Injectable } from '@angular/core';
import { Service, Resource, DocumentCollection } from 'ngx-jsonapi';
import { Book } from '../books/books.service';
import { Photo } from '../photos/photos.service';

export class Author extends Resource {
    public attributes: {
        name: string;
        date_of_birth: string;
        date_of_death: string;
        created_at: string;
        updated_at: string;
    } = {
        name: 'default name',
        date_of_birth: '',
        date_of_death: '',
        created_at: '',
        updated_at: ''
    };

    public relationships: {
        books: DocumentCollection<Book>;
        photos: DocumentCollection<Photo>
    } = {
        books: new DocumentCollection<Book>(),
        photos: new DocumentCollection<Photo>()
    };
}

@Injectable()
export class AuthorsService extends Service<Author> {
    public resource: typeof Author = Author;
    public type: string = 'authors';
}
