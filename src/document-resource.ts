import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { IDataObject } from './interfaces/data-object';

export class DocumentResource<R extends Resource = Resource> extends Document {
    public data: R = <R>new Resource(); // @todo?
    public builded = false;
    public content: 'id' | 'resource' = 'id';

    public page = new Page();

    public fill(data_resource: IDataObject): void {
        this.data.fill(data_resource);
        this.meta = data_resource.meta || {};
    }
}
