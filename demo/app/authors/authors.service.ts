import { Injectable } from '@angular/core';
import { Service, ISchema, Resource } from 'ngx-jsonapi';

@Injectable()
export class AuthorsService extends Service<Author> {
    public resource = Author;
    public type = 'authors';
    public schema: ISchema = {
        attributes: {
            name: { },
            date_of_birth: { default: '1993-12-10' },
            date_of_death: {},
            created_at: {},
            updated_at: {}
        },
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
    public attributes: {
        name: string,
        date_of_birth: string,
        date_of_death: string,
        created_at: string,
        updated_at: string
    };

    public getName() {
        return this.attributes.name;
    }
}
