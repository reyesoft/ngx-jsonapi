// import 'localforage-getitems';
import Dexie from 'dexie';
import { Base } from '../services/base';
import { noop, Subject, Observable } from 'rxjs';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { IObjectsById } from '../interfaces';

interface IStoreElement {
    time: number;
}

interface IDataResourceStorage extends IDataResource {
    _lastupdate_time: number;
}

interface IDataCollectionStorage extends IDataCollection {
    _lastupdate_time: number;
}

export class StoreService /* implements IStoreService */ {
    private db: Dexie;

    public constructor() {
        this.db = new Dexie('jsonapi_db');
        this.db.version(1).stores({
            collections: '&key,data',
            elements: '&key,data'
            /*
            collections: '[type+id],data',
            elements: '[type+id],data'
            */
        });
        this.checkIfIsTimeToClean();
    }

    /**
     * Maybe is not required. Disabled for now.
     */
    /*
    private async getOpenedDb(): Dexie.Promise<Dexie> {
        if (this.db.isOpen()) {
            // return a fake promise, then we dont do a new db.open()
            return new Promise<Dexie>((resolve): void => {
                resolve(this.db);
            });
        } else {
            return this.db.open();
        }
    }
    */

    public getDataObject(type: 'collection', url: string): Observable<IDataCollection>;
    public getDataObject(type: string, id: string): Observable<IDataResource>;
    public getDataObject(type: 'collection' | string, id_or_url: string): Observable<IDataCollection | IDataResource> {
        let subject = new Subject<IDataResource | IDataCollection>();
        // we use different tables for resources and collections
        const table_name = type === 'collection' ? 'collections' : 'elements';

        this.db
            .open()
            .then(async () => {
                return this.db
                    .table(table_name)
                    .where({ key: type + '.' + id_or_url })
                    .first();
            })
            .then(element => {
                if (element === undefined) {
                    subject.error(null);
                } else {
                    subject.next(element.data);
                }
                subject.complete();
            });

        return subject.asObservable();
    }

    public async getDataResources(keys: Array<string>): Promise<IObjectsById<IDataResourceStorage>> {
        return this.db
            .open()
            .then(async () => {
                return this.db
                    .table('elements')
                    .where('key')
                    .anyOf(keys)
                    .toArray();
            })
            .then(elements => {
                return Object.assign({}, ...elements.map(item => ({ [item.data.id]: item.data })));
            });
    }

    public saveResource(type: string, url_or_id: string, value: IDataResource): void {
        let data_resource_storage: IDataResourceStorage = { ...{ _lastupdate_time: Date.now() }, ...value };
        this.db.open().then(async () => {
            return this.db.table('elements').put({ key: type + '.' + url_or_id, data: data_resource_storage });
        });
    }

    public saveCollection(url_or_id: string, value: IDataCollection): void {
        let data_collection_storage: IDataCollectionStorage = { ...{ _lastupdate_time: Date.now() }, ...value };
        this.db.open().then(async () => {
            return this.db.table('collections').put({ key: 'collection.' + url_or_id, data: data_collection_storage });
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
                .where('key')
                .startsWith(type + '.' + id)
                .modify({ _lastupdate_time: 0 });
        });
    }

    public deprecateCollection(key_start_with: string) {
        this.db.open().then(async () => {
            return this.db
                .table('collections')
                .where('key')
                .startsWith(key_start_with)
                .modify({ _lastupdate_time: 0 });
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
                        .then((success2: IDataCollectionStorage | IDataResourceStorage) => {
                            if (Date.now() >= success2._lastupdate_time + 24 * 3600 * 1000) {
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
