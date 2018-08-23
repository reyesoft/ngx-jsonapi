import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { IDataResource } from './interfaces/data-resource';

export class DocumentResource<R extends Resource = Resource> extends Document {
    public data: R = <R>new Resource(); // @todo?
    public builded = false;
    public content: 'id' | 'resource' = 'id';

    public page = new Page();
}
