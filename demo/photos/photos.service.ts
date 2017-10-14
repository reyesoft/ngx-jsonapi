import { Injectable } from '@angular/core';
import { Service } from '@ngx-jsonapi/service';
import * as Jsonapi from '@ngx-jsonapi';

@Injectable()
export class PhotosService extends Service {
    public type = 'photos';
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
