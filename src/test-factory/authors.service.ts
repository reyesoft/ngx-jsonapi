import { Resource } from '../resource';
import { DocumentCollection } from 'src/document-collection';
import { DocumentResource } from '../document-resource';
import { Service } from '../service';
import { Book } from './books.service';

export class Author extends Resource {
    public type = 'authors';
    public id = '';
    public attributes = { name: '' };
    public relationships = {
        favourite_book: new DocumentResource<Book>(),
        books: new DocumentCollection<Book>()
    };
    public ttl = 0;
}

export class AuthorsService extends Service<Author> {
    public constructor() {
        super();
        this.register();
    }
    public type = 'authors';
    public resource = Author;
    public ttl = 0;
}
