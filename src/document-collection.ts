import { IParamsCollection } from './interfaces/params-collection';
import { Resource } from './resource';
import { Page } from './services/page';
import { Document } from './document';
import { ICacheable } from './interfaces/cacheable';
import { Converter } from './services/converter';
import { IDataCollection, ICacheableDataCollection } from './interfaces/data-collection';
import { IDataResource } from './interfaces/data-resource';
import { isDevMode } from '@angular/core';

export class DocumentCollection<R extends Resource = Resource> extends Document implements ICacheable {
    public data: Array<R> = [];
    public page = new Page();
    public ttl = 0;

    public trackBy(iterated_resource: Resource): string {
        return iterated_resource.id;
    }

    public find(id: string): R | null {
        // this is the best way: https://jsperf.com/fast-array-foreach
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return this.data[i];
            }
        }

        return null;
    }

    public fill(data_collection: IDataCollection | ICacheableDataCollection): void {
        Converter.buildIncluded(data_collection);

        // sometimes get Cannot set property 'number' of undefined (page)
        if (this.page && data_collection.meta) {
            this.page.number = data_collection.meta.page || 1;
            this.page.resources_per_page = data_collection.meta.resources_per_page || null; // @deprecated (v2.0.2)
            this.page.size = data_collection.meta.resources_per_page || null;
            this.page.total_resources = data_collection.meta.total_resources || null;
        }

        // convert and add new dataresoures to final collection
        let new_ids = {};
        this.data = [];
        this.builded = data_collection.data && data_collection.data.length === 0;
        for (let dataresource of data_collection.data) {
            try {
                let res = this.getResourceOrFail(dataresource);
                res.fill({ data: dataresource } /* , included_resources */); // @todo check with included resources?
                new_ids[dataresource.id] = dataresource.id;
                this.data.push(<R>res);
                if (Object.keys(res.attributes).length > 0) {
                    this.builded = true;
                }
            } catch (error) {
                // collection with only ids?
                // we lost this data for save on future, for example required by JsonRipper
                // this.content = 'ids';
                // this.data.push({ id: 1, type: 'sadf' });
            }
        }

        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        // @todo test with relation.data.filter(resource =>  resource.id != id );
        for (let i; i < this.data.length; i++) {
            if (!(this.data[i].id in new_ids)) {
                delete this.data[i];
            }
        }

        this.meta = data_collection.meta || {};

        if ('cache_last_update' in data_collection) {
            this.cache_last_update = data_collection.cache_last_update;
        }
    }

    private getResourceOrFail(dataresource: IDataResource): Resource {
        let res = this.find(dataresource.id);

        if (res !== null) {
            return res;
        }

        let service = Converter.getService(dataresource.type);

        // remove when getService return null or catch errors
        // this prvent a fill on undefinied service :/
        if (!service) {
            if (isDevMode()) {
                console.warn(
                    'The relationship ' + 'relation_alias?' + ' (type',
                    dataresource.type,
                    ') cant be generated because service for this type has not been injected.'
                );
            }

            throw new Error('Cant create service for ' + dataresource.type);
        }
        // END remove when getService return null or catch errors

        return service.getOrCreateResource(dataresource.id);
    }

    public replaceOrAdd(resource: R): void {
        let res = this.find(resource.id);
        if (res === null) {
            this.data.push(resource);
        } else {
            res = resource;
        }
    }

    public hasMorePages(): boolean | null {
        if (this.page.size < 1) {
            return null;
        }

        let total_resources = this.page.size * (this.page.number - 1) + this.data.length;

        return total_resources < this.page.total_resources;
    }

    public setLoaded(value: boolean): void {
        // tslint:disable-next-line:deprecation
        this.is_loading = !value;
        this.loaded = value;
    }

    public setLoadedAndPropagate(value: boolean): void {
        this.setLoaded(value);
        this.data.forEach(resource => {
            for (let relationship_alias in resource.relationships) {
                let relationship = resource.relationships[relationship_alias];
                if (relationship instanceof DocumentCollection) {
                    relationship.setLoaded(value);
                }
            }
        });
    }

    public setBuilded(value: boolean): void {
        this.builded = value;
    }

    public setBuildedAndPropagate(value: boolean): void {
        this.setBuilded(value);
        this.data.forEach(resource => {
            resource.setLoaded(value);
        });
    }

    /** @todo generate interface */
    public setSource(value: 'new' | 'memory' | 'store' | 'server'): void {
        this.source = value;
    }

    public toObject(params?: IParamsCollection): IDataCollection {
        let data = this.data.map(resource => {
            return resource.toObject(params).data;
        });

        return {
            data: data
        };
    }
}
