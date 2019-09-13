import { Resource } from '../resource';
import { DocumentCollection } from 'src/document-collection';
import { DocumentResource } from '../document-resource';
import { Service } from '../service';
import { Author, AuthorsService } from './authors.service';
import { Book, BooksService } from './books.service';
import * as faker from 'faker';

export class TestFactory {
    public static getBook(id?: string, include: Array<string> = [], ttl = 0) {
        // NOTE: create book
        let book: Book = new Book();
        book.id = id ? id : 'new_' + Math.floor(Math.random() * 10000).toString();
        book.attributes.title = faker.name.title();

        // NOTE: create author
        let author: Author = new Author();
        author.id = 'new_' + Math.floor(Math.random() * 10000).toString();
        author.attributes.name = faker.name.firstName();

        // NOTE: add author relationships
        author.addRelationship(book, 'favourite_book');
        author.addRelationships([book], 'books');

        // NOTE: add book relationships
        book.addRelationship(author, 'author');

        // NOTE: set is_loading, loaded and builded on both resources
        book.setLoaded(true);
        book.relationships.author.setBuilded(true);
        book.relationships.author.setLoaded(true);
        author.setLoaded(true);
        author.relationships.books.setBuilded(true);
        author.relationships.books.setLoaded(true);
        author.relationships.faourite_book.setBuilded(true);
        author.relationships.faourite_book.setLoaded(true);

        return book;
    }

    public static getAuthor(id?: string, include: Array<string> = [], ttl = 0) {
        // NOTE: create author
        let author: Author = new Author();
        author.id = id ? id : 'new_' + Math.floor(Math.random() * 10000).toString();
        author.attributes.name = faker.name.firstName();

        // NOTE: create book
        let book: Book = new Book();
        book.id = 'new_' + Math.floor(Math.random() * 10000).toString();
        book.attributes.title = faker.name.title();
        let second_book = new Book();
        second_book.id = 'new_' + Math.floor(Math.random() * 10000).toString();
        second_book.attributes.title = faker.name.title();

        // NOTE: add book relationships
        book.addRelationship(author, 'author');
        second_book.addRelationship(author, 'author');

        // NOTE: add author relationships
        author.addRelationship(book, 'favourite_book');
        author.addRelationships([book, second_book], 'books');

        // NOTE: set is_loading, loaded and builded on both resources
        author.setLoaded(true);
        author.relationships.books.setBuilded(true);
        author.relationships.books.setLoaded(true);
        author.relationships.faourite_book.setBuilded(true);
        author.relationships.faourite_book.setLoaded(true);
        book.setLoaded(true);
        book.relationships.author.setBuilded(true);
        book.relationships.author.setLoaded(true);

        return author;
    }

    public static getBooksCollection(size: number = 2) {
        let collection: DocumentCollection<Book> = new DocumentCollection();
        for (let index; index <= size; index++) {
            let book = this.getBook();
            collection.data.push(book);
        }
        collection.setBuilded(true);
        collection.setLoaded(true);
    }

    public static getAuthorsCollection(size: number = 2) {
        let collection: DocumentCollection<Author> = new DocumentCollection();
        for (let index; index <= size; index++) {
            let author = this.getAuthor();
            collection.data.push(author);
        }
        collection.setBuilded(true);
        collection.setLoaded(true);
    }
}
