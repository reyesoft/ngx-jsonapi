import { Injectable } from '@angular/core';
import { Autoregister, Service, ISchema, Resource, IRelationshipResource, IRelationshipCollection } from 'ngx-jsonapi';
import { Author } from '../authors/authors.service';
import { Photo } from '../photos/photos.service';

@Injectable()
@Autoregister()
export class BooksService extends Service<Book> {
    public type = 'books';
    public schema: ISchema = {
        relationships: {
            author: {
                hasMany: false
            },
            photos: {
                hasMany: true
            }
        }
    };

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

export class Book extends Resource {
    public attributes = {
        date_published: '',
        title: '',
        created_at: '',
        updated_at: ''
    };

    public relationships: {
        author: IRelationshipResource<Author>;
        photos: IRelationshipCollection<Photo>;
    };
}
