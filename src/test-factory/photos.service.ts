import { Service, Resource } from 'ngx-jsonapi';

export class Photo extends Resource {
    public attributes = {
        title: '',
        uri: '',
        imageable_id: '',
        created_at: new Date(),
        updated_at: new Date()
    };
}

export class PhotosService extends Service<Photo> {
    public constructor() {
        super();
        this.register();
    }
    public resource = Photo;
    public type = 'photos';
}
