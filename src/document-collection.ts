import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { ICacheable } from './interfaces/cacheable';
import { Converter } from './services/converter';
import { IDataObject } from './interfaces/data-object';

export class DocumentCollection<R extends Resource = Resource> extends Document implements ICacheable {
    public data: Array<R> = [];
    public page = new Page();

    public trackBy(iterated_resource: Resource): string {
        return iterated_resource.id;
    }

    public find(id: string): R {
        // this is the best way: https://jsperf.com/fast-array-foreach
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return this.data[i];
            }
        }

        return null;
    }

    public fill(data_collection: IDataObject): void {
        Converter.build(data_collection, this);
    }
}
