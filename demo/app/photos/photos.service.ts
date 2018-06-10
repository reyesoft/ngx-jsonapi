import { Injectable } from '@angular/core';
import { Service, ISchema, Resource } from 'ngx-jsonapi';

@Injectable()
export class PhotosService extends Service {
    // public resource = Photo;
    public type = 'photos';
}

export class Photo extends Resource {
    public attributes: {
        title: string;
        uri: string;
        imageable_id: string;
        created_at: string;
        updated_at: string;
    };
}
