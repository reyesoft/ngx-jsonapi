import { CacheMemory } from './services/cachememory';
import { Converter } from './services/converter';
import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { IDocumentResource } from './interfaces/data-object';

export class DocumentResource<R extends Resource = Resource> extends Document {
    public data: R | null | undefined = <R>new Resource();
    public builded = false;
    public content: 'id' | 'resource' = 'id';

    public fill(data_resource: IDocumentResource | null): void {
        this.builded = false;
        this.content = 'id';

        if (data_resource === null) {
            this.data = null;

            return;
        }

        if (!this.data) {
            this.data = <R>CacheMemory.getInstance().getOrCreateResource(data_resource.data.type, data_resource.data.id);
        }

        if (this.data.fill(data_resource)) {
            this.builded = true;
            this.content = 'resource';
        }

        this.meta = data_resource.meta || {};
    }

    public unsetData(): void {
        this.data = undefined;
        this.builded = false;
    }
}
