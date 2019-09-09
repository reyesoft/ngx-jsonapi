import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { IDataObject } from './interfaces/data-object';
import { defineDirective } from '@angular/core/src/render3';

export class DocumentResource<R extends Resource = Resource> extends Document {
    // @todo #209
    // <R>new Resource(); cannot be a Resource or null, for example a book without an author (books.relationships.authors.data), or data missing
    // public data: R | null | undefined;

    public data: R = <R>new Resource();

    public builded = false;
    public content: 'id' | 'resource' = 'id';

    public page = new Page();

    public fill(data_resource: IDataObject): void {
        this.data.fill(data_resource);
        this.meta = data_resource.meta || {};
    }
}
