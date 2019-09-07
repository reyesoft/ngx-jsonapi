import Dexie from 'dexie'; // use example https://jsfiddle.net/pablorsk/vw2efgLc/1/
import { Base } from '../services/base';
import { IStoreObject } from '../interfaces';
import { noop } from 'rxjs/util/noop';
import { Deferred } from '../shared/deferred';

interface IStoreElement {
    time: number;
}

interface IStoreElement2 {
    _lastupdate_time: number;
}

export class StoreService {
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

    public async getObjet(key: string): Promise<object> {
        return this.db
            .open()
            .then(async () => {
                return this.db
                    .table('elements')
                    .where({ key: key })
                    .first();
            })
            .then(element => {
                return element.data;
            });
    }

    public saveObject(key: string, value: IStoreObject): void {
        value._lastupdate_time = Date.now();

        this.db.open().then(async () => {
            return this.db.table('elements').put({ key: key, data: value });
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
