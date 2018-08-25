import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { ICacheable } from './interfaces/cacheable';
import { Converter } from './services/converter';
import { IDataObject } from './interfaces/data-object';
import { IDataCollection } from './interfaces/data-collection';
import { Base } from './services/base';
import { IResourcesByType } from './interfaces';

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

    public fill(data_collection: IDataCollection): void {
        let included_resources = Converter.buildIncluded(data_collection);

        // sometimes get Cannot set property 'number' of undefined (page)
        if (this.page && data_collection.meta) {
            this.page.number = data_collection.meta.page || 1;
            this.page.resources_per_page = data_collection.meta.resources_per_page || null;
            this.page.total_resources = data_collection.meta.total_resources || null;
        }

        // convert and add new dataresoures to final collection
        let new_ids = {};
        this.data = [];
        this.builded = false;
        for (let dataresource of data_collection.data) {
            let res = this.find(dataresource.id) || Converter.getService(dataresource.type).getOrCreateResource(dataresource.id);
            res.fill({ data: dataresource } /* , included_resources */); // @todo check with included resources?
            new_ids[dataresource.id] = dataresource.id;
            this.data.push(<R>res);
            if (Object.keys(res.attributes).length > 0) {
                this.builded = true;
            }
        }

        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        Base.forEach(this, resource => {
            if (!(resource.id in new_ids)) {
                delete this[resource.id];
            }
        });
    }
}
