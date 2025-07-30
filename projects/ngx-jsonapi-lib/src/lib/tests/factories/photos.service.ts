import { Resource } from '../../resource';
import { Service } from '../../service';

export class Photo extends Resource {
    public attributes: any = {
        title: '',
        uri: '',
        imageable_id: '',
        created_at: new Date(),
        updated_at: new Date()
    };

    public type: string = 'photos';
    public ttl: number = 0;
    public static test_ttl: any;

    public constructor() {
        super();

        if (Photo.test_ttl || Photo.test_ttl === 0) {
            this.ttl = Photo.test_ttl;
        }
    }
}

export class PhotosService extends Service<Photo> {
    public constructor() {
        super();
        this.register();
    }
    public resource: typeof Photo = Photo;
    public type: string = 'photos';
}
