import { Injectable } from '@angular/core';
import { Service, ISchema, Resource, ICollection } from 'ngx-jsonapi';
import { Book } from '../books/books.service';

@Injectable()
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

export class Author extends Resource {
    public attributes = {
        name: 'default name',
        date_of_birth: '',
        date_of_death: '',
        created_at: '',
        updated_at: ''
    };

    public getName() {
        return this.attributes.name;
    }

    public books(): ICollection<Book> {
        return <ICollection<Book>>this.relationships.books.data;
    }

    public photos()/*: ICollection<Photo>*/ {
        return <ICollection>this.relationships.photos.data;
    }
}
