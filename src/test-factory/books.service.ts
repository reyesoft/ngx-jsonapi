import { Resource } from '../resource';
import { DocumentCollection } from 'src/document-collection';
import { DocumentResource } from '../document-resource';
import { Service } from '../service';
import { Author } from './authors.service';

export class Book extends Resource {
    public type = 'books';
    public id = '';
    public attributes = { title: '' };
    public relationships = {
        author: new DocumentResource<Author>()
    };
    public ttl = 0;
}

export class BooksService extends Service<Book> {
    public constructor() {
        super();
        this.register();
    }
    public type = 'books';
    public resource = Book;
    public ttl = 0;
}
