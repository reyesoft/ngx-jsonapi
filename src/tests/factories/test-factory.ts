import { Resource } from '../../resource';
import { IDocumentData } from '../../interfaces/document';
import { IDataResource } from '../../interfaces/data-resource';
import { DocumentCollection } from '../../document-collection';
import { DocumentResource } from '../../document-resource';
import { Service } from '../../service';
import { Author, AuthorsService } from './authors.service';
import { Book, BooksService } from './books.service';
import { Photo, PhotosService } from './photos.service';
import * as faker from 'faker';

export class TestFactory {
    // NOTE: this is going to be used to merge getAuthor, getBook and getPhoto in 1 method
    private static resource_classes_by_type = {
        photos: Photo,
        books: Book,
        authors: Author
    };

    public static getResourceDocumentData(document_class: typeof Resource, include: Array<string> = []): IDocumentData {
        let main_resource: Resource = this[`get${document_class.name}`]();

        let document_data: IDocumentData = {
            data: main_resource
        };

        this.fillDocumentDataIncludedRelatioships(document_data, include);

        return document_data;
    }

    public static getCollectionDocumentData(document_class: typeof Resource, size = 2, include: Array<string> = []): IDocumentData {
        let main_collection: DocumentCollection = this.getCollection(document_class, size, include);

        let document_data: IDocumentData = {
            data: main_collection.data
        };
        this.fillDocumentDataIncludedRelatioships(document_data, include);

        return document_data;
    }

    public static getBookDocumentData() {
        /**/
    }

    public static getPhotoDocumentData() {
        /**/
    }

    // TODO: uncomment and complete when thinking a way to find a resource relationship's class
    // public static getResource(resource_class: typeof Resource, id?: string, include: Array<string> = [], ttl = 0): Resource {
    //     // NOTE: create book
    //     let resource: Resource = new resource_class();
    //     resource.id = this.getId(id);
    //     resource.attributes.title = faker.name.title();
    //
    //     // NOTE: add author
    //     (<IDataResource>resource.relationships.author.data) = this.getDataResourceWithType('authors');
    //     if (include.includes('author')) {
    //         this.includeHasOneFromService(resource, 'author', Photo);
    //     }
    //
    //     // NOTE: add photos
    //     (resource.relationships.photos.data as Array<IDataResource>).concat(this.getDataResourcesWithType('photos', 2));
    //     if (include.includes('photos')) {
    //         this.includeHasManyFromService(resource, 'photos', Photo);
    //     }
    //
    //     return resource;
    // }

    public static getBook(id?: string, include: Array<string> = [], ttl = 0): Book {
        // NOTE: create book
        let book: Book = new Book();
        book.id = this.getId(id);
        book.ttl = ttl;
        this.fillBookAttributes(book);

        // NOTE: add author
        if (include.includes('author')) {
            (<IDataResource>book.relationships.author.data) = this.getDataResourceWithType('authors');
            this.includeFromService(book, 'author', Photo);
        }

        // NOTE: add photos
        if (include.includes('photos')) {
            (book.relationships.photos.data as Array<IDataResource>).concat(this.getDataResourcesWithType('photos', 2));
            this.includeFromService(book, 'photos', Photo);
        }

        return book;
    }

    public static getAuthor(id?: string, include: Array<string> = [], ttl = 0): Author {
        // NOTE: create author
        let author: Author = new Author();
        author.id = this.getId(id);
        author.ttl = ttl;
        this.fillAuthorAttirbutes(author);

        // NOTE: add books
        (author.relationships.photos.data as Array<IDataResource>).concat(this.getDataResourcesWithType('books', 2));
        if (include.includes('books')) {
            this.includeFromService(author, 'books', Book);
        }
        // NOTE: add photos
        (author.relationships.photos.data as Array<IDataResource>).concat(this.getDataResourcesWithType('photos', 2));
        if (include.includes('photos')) {
            this.includeFromService(author, 'photos', Photo);
        }

        return author;
    }

    public static getPhoto(id?: string, include: Array<string> = [], ttl = 0): Photo {
        let photo: Photo = new Photo();
        photo.id = this.getId(id);
        photo.ttl = ttl;
        this.fillPhotoAttirbutes(photo);

        return photo;
    }

    public static getCollection(resources_class: typeof Resource, size: number = 2, include: Array<string> = []): DocumentCollection {
        let collection: DocumentCollection<Resource> = new DocumentCollection();
        for (let index = 0; index < size; index++) {
            let factory_name = `get${resources_class.name}`;
            let author = this[factory_name](undefined, include);
            collection.data.push(author);
        }
        collection.setBuilded(true);
        collection.setLoaded(true);

        return collection;
    }

    // TODO: create a dynamic attribute filler by data type and merge 3 methods in 1
    private static fillAuthorAttirbutes(author: Author): Author {
        author.attributes.name = faker.name.firstName();
        author.attributes.date_of_birth = faker.date.past();
        author.attributes.date_of_death = faker.date.past();
        author.attributes.created_at = faker.date.past();
        author.attributes.updated_at = faker.date.past();

        return author;
    }

    // TODO: create a dynamic attribute filler by data type and merge 3 methods in 1
    private static fillBookAttributes(book: Book): Book {
        book.attributes.title = faker.name.title();
        book.attributes.date_published = faker.date.past();
        book.attributes.created_at = faker.date.past();
        book.attributes.updated_at = faker.date.past();

        return book;
    }

    // TODO: create a dynamic attribute filler by data type and merge 3 methods in 1
    private static fillPhotoAttirbutes(book: Photo): Photo {
        book.attributes.title = faker.name.title();
        book.attributes.uri = faker.internet.url();
        book.attributes.imageable_id = faker.random.uuid();
        book.attributes.created_at = faker.date.past();
        book.attributes.updated_at = faker.date.past();

        return book;
    }

    private static getId(id?: string) {
        return id || 'new_' + Math.floor(Math.random() * 10000).toString();
    }

    private static includeFromService(resource: Resource, relationship_alias: string, class_to_add: typeof Resource) {
        if (resource.relationships[relationship_alias] instanceof DocumentResource) {
            this.includeHasOneFromService(resource, relationship_alias, class_to_add);
        } else if (resource.relationships[relationship_alias] instanceof DocumentCollection) {
            this.includeHasManyFromService(resource, relationship_alias, class_to_add);
        } else {
            console.error(
                `includeFromService cannot include relatioship ${relationship_alias} in resource ${resource.type} because it doesn't exist`
            );
        }
    }

    private static includeHasOneFromService(resource: Resource, relationship_alias: string, class_to_add: typeof Resource) {
        let resource_to_add: Resource = new class_to_add();
        resource_to_add.id = (<DocumentResource>resource.relationships[relationship_alias]).data.id;
        let fill_method = `fill${class_to_add.name}Attributes`;
        this[fill_method](resource_to_add);
        resource.addRelationship(resource_to_add, relationship_alias);
    }

    private static includeHasManyFromService(resource: Resource, relationship_alias: string, class_to_add: typeof Resource) {
        let resources_to_add: Array<Resource> = [];
        for (let resource_relatioship of (<DocumentCollection>resource.relationships[relationship_alias]).data) {
            let resource_to_add: Resource = new class_to_add();
            resource_to_add.id = resource_relatioship.id;
            let fill_method = `fill${class_to_add.name}Attributes`;
            this[fill_method](resource_to_add);
            resources_to_add.push(resource_to_add);
        }
        resource.addRelationships(resources_to_add, relationship_alias);
    }

    private static getDataResourceWithType(type: string, id?: string): IDataResource {
        return {
            id: this.getId(id),
            type: type
        };
    }

    private static getDataResourcesWithType(type: string, qty: number): Array<IDataResource> {
        let data_resources: Array<IDataResource> = [];
        for (let index = 0; index < qty; index++) {
            data_resources.push(this.getDataResourceWithType(type));
        }

        return data_resources;
    }

    private static fillResourceRelationshipsInDocumentData(document_data: IDocumentData, resource: Resource, included_alias: string) {
        if (!document_data.included) {
            document_data.included = [];
        }

        let relatioship_content = resource.relationships[included_alias];

        if (relatioship_content instanceof DocumentResource) {
            if (!relatioship_content.data) {
                return;
            }
            document_data.included.push(
                this[`get${this.resource_classes_by_type[relatioship_content.data.type]}`](relatioship_content.data.id)
            );
        } else if (relatioship_content instanceof DocumentCollection) {
            for (let has_many_relationship of (<DocumentCollection>resource.relationships[included_alias]).data) {
                document_data.included.push(
                    this[`get${this.resource_classes_by_type[has_many_relationship.type]}`](has_many_relationship.id)
                );
            }
        }
    }

    private static fillDocumentDataIncludedRelatioships(document_data: IDocumentData, include: Array<string>) {
        for (let included_alias of include) {
            if (!document_data.included) {
                document_data.included = [];
            }
            if (document_data.data instanceof Resource) {
                if (!document_data.data.relationships[included_alias].data) {
                    continue;
                }
                this.fillResourceRelationshipsInDocumentData(document_data, document_data.data, included_alias);
            }
            for (let resource of <Array<Resource>>document_data.data) {
                this.fillResourceRelationshipsInDocumentData(document_data, resource, included_alias);
            }
        }
    }
}
