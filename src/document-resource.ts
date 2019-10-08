import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { IDataObject } from './interfaces/data-object';
import { Converter } from './services/converter';

export class DocumentResource<R extends Resource = Resource> extends Document {
    public data: R = <R>new Resource(); // @todo?
    public builded = false;
    public content: 'id' | 'resource' = 'id';

    public page = new Page();

    public fill(data_resource: IDataObject): void {
        if ((!this.data.type && !this.data.id) && (data_resource.data.type && data_resource.data.id)) {
            this.data = <R>Converter.getService(data_resource.data.type).getOrCreateResource(data_resource.data.id);
        }

        this.data.fill(data_resource);
        this.meta = data_resource.meta || {};
    }
}
