import { Injectable } from '@angular/core';
import { Autoregister, Service, ISchema, Resource, ICollection, IRelationship, IRelationshipCollection } from 'ngx-jsonapi';
import { Book } from '../books/books.service';
import { Photo } from '../photos/photos.service';

export class Author extends Resource {
    public attributes = {
        name: 'default name',
        date_of_birth: '',
        date_of_death: '',
        created_at: '',
        updated_at: ''
    };

    public relationships: {
        books: IRelationshipCollection<Book>;
        photos: IRelationshipCollection<Photo>;
    };
}

@Injectable()
@Autoregister()
export class AuthorsService extends Service<Author> {
    public resource = Author;
    public type = 'authors';
    public schema: ISchema = {
        relationships: {
            books: {
                hasMany: true
            },
            photos: {
                hasMany: true
            }
        }
    };
}
