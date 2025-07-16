import { Injectable } from '@angular/core';
import { Service, Resource, Autoregister } from 'ngx-jsonapi';

@Injectable()
export class PhotosService extends Service {
    // public resource = Photo;
    public type: string = 'photos';
}

export class Photo extends Resource {
    public attributes: {
        title: string;
        uri: string;
        imageable_id: string;
        created_at: string;
        updated_at: string;
    } = {
        title: '',
        uri: '',
        imageable_id: '',
        created_at: '',
        updated_at: ''
    };
}
