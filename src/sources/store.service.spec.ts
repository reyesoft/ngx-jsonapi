// import 'localforage-getitems';
import { async, TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
// import * as localForage from 'localforage';
// import { extendPrototype as extendGetitems } from 'localforage-getitems';
import { Base } from '../services/base';
import { noop, Subject, Observable } from 'rxjs';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';
import { IObjectsById } from '../interfaces';

describe('Store service', () => {
    let store_service: StoreService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [StoreService]
        }).compileComponents();
        store_service = TestBed.get(StoreService);
    }));

    it('should create Store service', () => {
        expect(store_service).toBeTruthy();
    });

    /*
    it('deprecateObjectsWithKey should set saved resources lastupdate time to 0', async () => {
        await (store_service as any).allstore.setItem('0', { _lastupdate_time: 123456 }).then(item => {
            expect(item._lastupdate_time).toBe(123456);
        });
        await store_service.deprecateObjectsWithKey('0');
        await (store_service as any).allstore.getItems('0').then(item => {
            expect(item._lastupdate_time).toBeFalsy();
        });
    });
    */

    /*
    it('removeObjectsWithKey should remove resources with the passed id from indexeddb', async () => {
        await (store_service as any).allstore.setItem('0', { _lastupdate_time: 123456 }).then(item => {
            expect(item).toBeTruthy();
        });
        await store_service.removeObjectsWithKey('0');
        await (store_service as any).allstore.getItems('0').then(item => {
            expect(item[0]).toBeFalsy();
        });
    });

    it('removeObjectsWithKey should remove elements from collections', async () => {
        await (store_service as any).allstore.setItem('1', { data: [{ id: '0', _lastupdate_time: 123456 }] }).then(item => {
            expect(item).toBeTruthy();
        });
        await store_service.removeObjectsWithKey('0');
        await (store_service as any).allstore.getItems('1').then(item => {
            expect(item['1'].data).toEqual([]);
        });
    });
    */
});
