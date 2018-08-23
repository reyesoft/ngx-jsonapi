import * as localForage from 'localforage';
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
    private globalstore: LocalForage;
    private allstore: LocalForage;

    public constructor() {
        this.globalstore = localForage.createInstance({
            name: 'jsonapiglobal'
        });
        this.allstore = localForage.createInstance({ name: 'allstore' });
        this.checkIfIsTimeToClean();
    }

    public async getObjet(key: string): Promise<object> {
        let deferred: Deferred<object> = new Deferred();

        this.allstore
            .getItem('jsonapi.' + key)
            .then(success => {
                deferred.resolve(success);
            })
            .catch(error => {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    public async getObjets(keys: Array<string>): Promise<object> {
        return this.allstore.getItem('jsonapi.' + keys[0]);
    }

    public saveObject(key: string, value: IStoreObject): void {
        value._lastupdate_time = Date.now();
        this.allstore.setItem('jsonapi.' + key, value);
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
                            .then((success2: IStoreElement2) => {
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
    }
}
