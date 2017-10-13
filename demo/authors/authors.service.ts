import { Injectable } from '@angular/core';
import { Service } from '../../src/service';
import * as Jsonapi from '../../src';

@Injectable()
export class AuthorsService extends Service {
    type = 'authors';
    public schema: Jsonapi.ISchema = {
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
