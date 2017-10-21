import { Injectable } from '@angular/core';
import { Service, ISchema } from 'ngx-jsonapi';

@Injectable()
export class AuthorsService extends Service {
    public type = 'authors';
    public schema: ISchema = {
        attributes: {
            name: { },
            date_of_birth: { default: '1993-12-10'},
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
        },
        ttl: 10
    };
}
