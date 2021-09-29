import { IStoreService } from './store-service.interface';
import { ICacheableDataCollection } from '../interfaces/data-collection';
import { ICacheableDataResource, IDataResource } from '../interfaces/data-resource';
import { IObjectsById } from '../interfaces';
import { Injectable } from '@angular/core';

/* tslint:disable:no-empty */
@Injectable()
export class StoreFakeService implements IStoreService {
    public async getDataObject(type: 'collection' | string, id_or_url: string): Promise<any> {
        if (type === 'collection') {
            return <any>{ data: [], cache_last_update: 0 };
        }

        return Promise.resolve(<any>{ cache_last_update: Date.now(), id: '', type: '' });
    }

    public async getDataResources(keys: Array<string>): Promise<IObjectsById<ICacheableDataResource>> {
        return Promise.resolve({});
    }

    public saveResource(type: string, url_or_id: string, value: IDataResource): void {
        /**/
    }

    public saveCollection(url_or_id: string, value: ICacheableDataCollection): void {
        /**/
    }

    public clearCache(): void {
        /**/
    }

    public deprecateResource(type: string, id: string): void {
        /**/
    }

    public deprecateCollection(key_start_with: string): void {
        /**/
    }

    public async removeObjectsWithKey(key: string): Promise<void> {
        /**/
    }
}
