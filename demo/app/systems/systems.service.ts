import { Injectable } from '@angular/core';
import { Service, Resource, DocumentCollection } from 'ngx-jsonapi';
import { Book } from '../books/books.service';
import { Photo } from '../photos/photos.service';

export interface SystemAttributes {
    name?: string;
    description?: string;
}

export class System extends Resource {
    public attributes: SystemAttributes;

    public relationships: {
        books: DocumentCollection<Book>;
        photos: DocumentCollection<Photo>;
    } = {
        books: new DocumentCollection<Book>(),
        photos: new DocumentCollection<Photo>()
    };
}

@Injectable()
export class SystemsService extends Service<System> {
    public resource: typeof System = System;
    public type: string = 'systems';
}
