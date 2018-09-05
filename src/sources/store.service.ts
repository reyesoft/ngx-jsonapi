import * as localForage from 'localforage';
import 'localforage-getitems';
import { Base } from '../services/base';
import { noop, Subject, Observable } from 'rxjs';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { IObjectsById } from '../interfaces';
import { Resource } from '../resource';

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
    private globalstore: LocalForage;
    private allstore: LocalForage;

    public constructor() {
        this.globalstore = localForage.createInstance({
            name: 'jsonapiglobal'
        });
        this.allstore = localForage.createInstance({ name: 'allstore' });
        localForage.getItems([]);
        this.checkIfIsTimeToClean();
    }

    public getDataObject(type: 'collection', url: string): Observable<IDataCollection>;
    public getDataObject(type: string, id: string): Observable<IDataResource>;
    public getDataObject(type: 'collection' | string, id_or_url: string): Observable<IDataCollection | IDataResource> {
        let subject = new Subject<IDataResource | IDataCollection>();

        this.allstore
            .getItem<IDataResource | IDataCollection>('jsonapi.' + type + '.' + id_or_url)
            .then(success => {
                if (success === null) {
                    subject.error(null);
                } else {
                    subject.next(success);
                }
                subject.complete();
            })
            .catch(error => subject.next(error));

        return subject.asObservable();
    }

    public async getDataResources(keys: Array<string>): Promise<IObjectsById<IDataResourceStorage>> {
        return this.allstore.getItems(keys.map(key => 'jsonapi.' + key));
    }

    public saveResource(type: string, url_or_id: string, value: IDataResource): void {
        let data_resource_storage: IDataResourceStorage = { ...{ _lastupdate_time: Date.now() }, ...value };
        this.allstore.setItem('jsonapi.' + type + '.' + url_or_id, data_resource_storage);
    }

    public saveCollection(url_or_id: string, value: IDataCollection): void {
        let data_collection_storage: IDataCollectionStorage = { ...{ _lastupdate_time: Date.now() }, ...value };
        this.allstore.setItem('jsonapi.collection.' + url_or_id, data_collection_storage);
    }

    public clearCache() {
        this.allstore.clear();
        this.globalstore.clear();
    }

    public deprecateObjectsWithKey(key_start_with: string) {
        this.allstore
            .keys()
            .then(success => {
                Base.forEach(success, (key: string) => {
                    if (key.startsWith(key_start_with)) {
                        // key of stored object starts with key_start_with
                        this.allstore
                            .getItem(key)
                            .then((success2: IDataCollectionStorage | IDataResourceStorage) => {
                                success2._lastupdate_time = 0;
                                this.allstore.setItem(key, success2);
                            })
                            .catch(noop);
                    }
                });
            })
            .catch(noop);
    }

    private checkIfIsTimeToClean() {
        // check if is time to check cachestore
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
    }

    private checkAndDeleteOldElements() {
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
    }
}
