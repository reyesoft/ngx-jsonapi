import { Injectable } from '@angular/core';
import { Service } from '@ngx-jsonapi/service';
import * as Jsonapi from '@ngx-jsonapi';

@Injectable()
export class BooksService extends Service {
    public type = 'books';
    public schema: Jsonapi.ISchema = {
        attributes: {
            date_published: { },
            title: { presence: true, length: { maximum: 96 } },
            created_at: { },
            updated_at: { }
        },
        relationships: {
            author: {
                hasMany: false
            },
            photos: {
                hasMany: true
            }
        },
        ttl: 10
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
