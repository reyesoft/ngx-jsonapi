import { Injectable } from '@angular/core';
import { Service, ISchema } from 'ngx-jsonapi';

@Injectable()
export class PhotosService extends Service {
    public type = 'photos';
    public schema: ISchema = {
        attributes: {
            title: {},
            uri: {},
            imageable_id: {},
            created_at: {},
            updated_at: {},
        },
    };
}
