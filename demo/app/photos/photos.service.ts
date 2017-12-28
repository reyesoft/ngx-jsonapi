import { Injectable } from '@angular/core';
import { Service, ISchema, Resource } from 'ngx-jsonapi';

@Injectable()
export class PhotosService extends Service {
    public type = 'photos';
}

export class Photo extends Resource {
    public attributes: {
        title: {},
        uri: {},
        imageable_id: {},
        created_at: {},
        updated_at: {}
    };
}
