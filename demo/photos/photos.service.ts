import { Injectable } from '@angular/core';
import { Service } from '../../src/service';
import * as Jsonapi from '../../src';

@Injectable()
export class PhotosService extends Service {
    type = 'photos';
    public schema: Jsonapi.ISchema = {
        attributes: {
            title: {},
            uri: {},
            imageable_id: {},
            created_at: {},
            updated_at: {}
        }
    };
}
