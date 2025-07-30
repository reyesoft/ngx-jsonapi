import { Resource } from '../../resource';
import { DocumentCollection } from '../../document-collection';
import { DocumentResource } from '../../document-resource';
import { Service } from '../../service';
import { Author } from './authors.service';
import { Photo } from './photos.service';

export class Book extends Resource {
    public attributes: any = {
        date_published: new Date(),
        title: '',
        created_at: new Date(),
        updated_at: new Date()
    };
    public relationships: {
        author: DocumentResource<Author>;
        photos: DocumentCollection<Photo>;
    } = {
        author: new DocumentResource<Author>(),
        photos: new DocumentCollection<Photo>()
    };
    public type: string = 'books';
    public ttl: number = 0;
    public static test_ttl: any;

    public constructor() {
        super();

        if (Book.test_ttl || Book.test_ttl === 0) {
            this.ttl = Book.test_ttl;
        }
    }
}

export class BooksService extends Service<Book> {
    public constructor() {
        super();
        this.register();
    }
    public type: string = 'books';
    public resource: typeof Book = Book;
    public collections_ttl: number = 0;
}
