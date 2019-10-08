import { Resource } from '../../resource';
import { DocumentCollection } from '../../document-collection';
import { Service } from '../../service';
import { Book } from './books.service';
import { Photo } from './photos.service';

export class Author extends Resource {
    public attributes = {
        name: '',
        date_of_birth: new Date(),
        date_of_death: new Date(),
        created_at: new Date(),
        updated_at: new Date()
    };
    public relationships: {
        books: DocumentCollection<Book>;
        photos: DocumentCollection<Photo>;
    } = {
        books: new DocumentCollection<Book>(),
        photos: new DocumentCollection<Photo>()
    };
    public type = 'authors';
    public ttl = 0;
    public static test_ttl;

    public constructor() {
        super();

        if (Author.test_ttl || Author.test_ttl === 0) {
            this.ttl = Author.test_ttl;
        }
    }
}

export class AuthorsService extends Service<Author> {
    public constructor() {
        super();
        this.register();
    }
    public resource = Author;
    public type = 'authors';
    public collections_ttl = 0;
}
