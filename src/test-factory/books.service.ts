import { Resource } from '../resource';
import { DocumentCollection } from 'src/document-collection';
import { DocumentResource } from '../document-resource';
import { Service } from '../service';
import { Author } from './authors.service';
import { Photo } from './photos.service';

export class Book extends Resource {
    public attributes = {
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
    public type = 'books';
    public ttl = 0;
}

export class BooksService extends Service<Book> {
    public constructor() {
        super();
        this.register();
    }
    public type = 'books';
    public resource = Book;
    public collections_ttl = 0;
}
