import { IDataProvider, IObject, IElement } from './data-provider';
import { Dexie } from 'dexie';
import { Subject, Observable } from 'rxjs';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { IObjectsById } from '../interfaces';

export class DexieDataProvider implements IDataProvider {
    private db: Dexie;

    public constructor() {
        this.db = new Dexie('dexie_data_provider');
        this.db.version(1).stores({
            collections: '',
            elements: ''
        });
    }

    public async getElement(key: string): Promise<IObject | Array<IObject>> {
        // @todo improve this on future, we need to know type from JsonRipper
        // const table_name = key.match(/[a-z]+\.[a-zA-Z]+/) ? 'elements' : 'collections';
        const table_name = 'elements';

        await this.db.open();
        const data = await this.db.table(table_name).get(key);
        if (data === undefined) {
            throw new Error(key + ' not found.');
        }

        return data;
    }

    public getElements(keys: Array<string>): Promise<Array<IObject>> {
        return this.db
            .table('elements')
            .where(':id')
            .anyOf(keys)
            .toArray()
            .then(data => data.map(element => element.data));
    }

    public saveElement(key: string, data: any): void {
        return;
    }

    public saveElements(elements: Array<IElement>): void {
        let keys: Array<string> = [];
        let items = elements.map(element => {
            keys.push(element.key);

            return element.data;
        });

        this.db.open().then(() => {
            this.db.table('elements').bulkPut(items, keys);
        });
    }

    private getDataObject(type: 'collection' | string, id_or_url: string): Observable<IDataCollection | IDataResource> {
        let subject = new Subject<IDataResource | IDataCollection>();
        // we use different tables for resources and collections
        const table_name = type === 'collection' ? 'collections' : 'elements';

        this.db.open().then(async () => {
            let item = await this.db.table(table_name).get(type + '.' + id_or_url);
            if (item === undefined) {
                subject.error(null);
            } else {
                subject.next(item);
            }

            subject.complete();
        });

        return subject.asObservable();
    }

    // private async getDataResources(keys: Array<string>): Promise<IObjectsById<IDataResourceStorage>> {
    //     const collection = this.db
    //         .table('elements')
    //         .where(':id')
    //         .anyOf(keys);

    //     let resources_by_id = {};
    //     await collection.each(item => {
    //         resources_by_id[item.id] = item;
    //     });

    //     return resources_by_id;
    // }

    // private saveResource(type: string, url_or_id: string, value: IDataResource): void {
    //     let data_resource_storage: IDataResourceStorage = { ...{ _lastupdate_time: Date.now() }, ...value };
    //     this.db.open().then(async () => {
    //         return this.db.table('elements').put(data_resource_storage, type + '.' + url_or_id);
    //     });
    // }

    // private saveCollection(url_or_id: string, value: IDataCollection): void {
    //     let data_collection_storage: IDataCollectionStorage = { ...{ _lastupdate_time: Date.now() }, ...value };
    //     this.db.open().then(async () => {
    //         return this.db.table('collections').put(data_collection_storage, 'collection.' + url_or_id);
    //     });
    // }
}
