import { mapTo } from 'rxjs/operators';
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

        this.checkIfIsTimeToClean();

        this.db.version(1).stores({
            collections: '&key,data',
            elements: '&key,data'
            /*
            collections: '[type+id],data',
            elements: '[type+id],data'
            */
        });
    }

    public getDataObject(type: 'collection', url: string): Observable<IDataCollection>;
    public getDataObject(type: string, id: string): Observable<IDataResource>;
    public getDataObject(type: 'collection' | string, id_or_url: string): Observable<IDataCollection | IDataResource> {
        let subject = new Subject<IDataResource | IDataCollection>();

        this.db
            .open()
            .then(async () => {
                return this.db
                    .table('elements')
                    .where({ key: type + '.' + id_or_url })
                    .first();
            })
            .then(element => {
                console.log('then', type + '.' + id_or_url, element);
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
            return this.db.table('elements').put({ key: 'collection.' + url_or_id, data: data_collection_storage });
        });
    }

    public clearCache() {
        this.db.delete();
    }

    public deprecateObjectsWithKey(key_start_with: string) {
        /*
        this.allstore
            .keys()
            .then(success => {
                Base.forEach(success, (key: string) => {
                    if (key.startsWith(key_start_with)) {
                        // key of stored object starts with key_start_with
                        this.allstore
                            .getItem(key)
                            .then((success2: IStoreElement2) => {
                                success2._lastupdate_time = 0;
                                this.allstore.setItem(key, success2);
                            })
                            .catch(noop);
                    }
                });
            })
            .catch(noop);
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
                        .then((success2: IStoreElement2) => {
                            // es tiempo de removerlo?
                            if (Date.now() >= success2._lastupdate_time + 24 * 3600 * 1000) {
                                // removemos!!
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
