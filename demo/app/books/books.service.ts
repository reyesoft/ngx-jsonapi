import { Injectable } from '@angular/core';
import { Service, ISchema, Resource, ICollection } from 'ngx-jsonapi';
import { Author } from '../authors/authors.service';
import { Photo } from '../photos/photos.service';

@Injectable()
export class BooksService extends Service<Book> {
    public type = 'books';
    public schema: ISchema = {
        relationships: {
            author: {
                hasMany: false
            },
            photos: {
                hasMany: true
            },
            stores: {
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

    public author(): Author {
        return <Author>this.relationships.authors.data;
    }

    public photos(): ICollection<Photo> {
        return <ICollection<Photo>>this.relationships.photos.data;
    }
}
