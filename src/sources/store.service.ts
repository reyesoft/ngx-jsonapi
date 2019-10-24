import { ICacheableDataCollection } from './../interfaces/data-collection';
import { ICacheableDataResource } from './../interfaces/data-resource';
import Dexie from 'dexie';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { IObjectsById } from '../interfaces';

interface IStoreElement {
    time: number;
}

export class StoreService /* implements IStoreService */ {
    private db: Dexie;

    public constructor() {
        this.db = new Dexie('jsonapi_db');
        this.db.version(1).stores({
            collections: '',
            elements: ''
        });
        this.checkIfIsTimeToClean();
    }

    public async getDataObject(type: 'collection', url: string): Promise<ICacheableDataCollection>;
    public async getDataObject(type: string, id: string): Promise<ICacheableDataResource>;
    public async getDataObject(type: 'collection' | string, id_or_url: string): Promise<ICacheableDataCollection | ICacheableDataResource> {
        // we use different tables for resources and collections
        const table_name = type === 'collection' ? 'collections' : 'elements';

        await this.db.open();
        let item = await this.db.table(table_name).get(type + '.' + id_or_url);
        if (item === undefined) {
            throw new Error();
        }

        return item;
    }

    public async getDataResources(keys: Array<string>): Promise<IObjectsById<ICacheableDataResource>> {
        const collection = this.db
            .table('elements')
            .where(':id')
            .anyOf(keys);

        let resources_by_id = {};
        await collection.each(item => {
            resources_by_id[item.id] = item;
        });

        return resources_by_id;
    }

    public saveResource(type: string, url_or_id: string, value: IDataResource): void {
        let data_resource_storage: ICacheableDataResource = { ...{ cache_last_update: Date.now() }, ...value };
        this.db.open().then(async () => {
            return this.db.table('elements').put(data_resource_storage, type + '.' + url_or_id);
        });
    }

    public saveCollection(url_or_id: string, value: ICacheableDataCollection): void {
        let data_collection_storage: ICacheableDataCollection = { ...{ cache_last_update: Date.now() }, ...value };
        this.db.open().then(async () => {
            return this.db.table('collections').put(data_collection_storage, 'collection.' + url_or_id);
        });
    }

    public clearCache() {
        this.db.open().then(async () => {
            return this.db
                .table('elements')
                .toCollection()
                .delete();
        });
        this.db.open().then(async () => {
            return this.db
                .table('collections')
                .toCollection()
                .delete();
        });
    }

    public deprecateResource(type: string, id: string) {
        this.db.open().then(async () => {
            return this.db
                .table('elements')
                .where(':id')
                .startsWith(type + '.' + id)
                .modify({ cache_last_update: 0 });
        });
    }

    public deprecateCollection(key_start_with: string) {
        this.db.open().then(async () => {
            return this.db
                .table('collections')
                .where(':id')
                .startsWith(key_start_with)
                .modify({ cache_last_update: 0 });
        });
    }

    public async removeObjectsWithKey(key: string) {
        /*
        this.allstore.removeItem(key);
        await this.allstore.getItems().then(async result => {
            for (let saved_resource_key in result) {
                let resource_id_split = key.split('.');
                let resource_id = resource_id_split[resource_id_split.length - 1];
                if (
                    Array.isArray(result[saved_resource_key].data) &&
                    result[saved_resource_key].data.find(resource => resource.id === resource_id)
                ) {
                    result[saved_resource_key].data.splice(
                        result[saved_resource_key].data.findIndex(resource => resource.id === resource_id),
                        1
                    );
                    await this.allstore.setItem(saved_resource_key, result[saved_resource_key]);
                }
            }
        });
        */
    }

    private checkIfIsTimeToClean() {
        // check if is time to check cachestore
        /*
        this.globalstore
            .getItem('_lastclean_time')
            .then((success: IStoreElement) => {
                if (Date.now() >= success.time + 12 * 3600 * 1000) {
                    // is time to check cachestore!
                    this.globalstore.setItem('_lastclean_time', {
                        time: Date.now()
                    });
                    this.checkAndDeleteOldElements();
                }
            })
            .catch(() => {
                this.globalstore.setItem('_lastclean_time', {
                    time: Date.now()
                });
            });
        */
    }

    private checkAndDeleteOldElements() {
        /*
        this.allstore
            .keys()
            .then(success => {
                Base.forEach(success, key => {
                    // recorremos cada item y vemos si es tiempo de removerlo
                    this.allstore
                        .getItem(key)
                        .then((success2: ICacheableDataCollection | ICacheableDataResource) => {
                            if (Date.now() >= success2.cache_last_update + 24 * 3600 * 1000) {
                                this.allstore.removeItem(key);
                            }
                        })
                        .catch(noop);
                });
            })
            .catch(noop);
        */
    }
}
