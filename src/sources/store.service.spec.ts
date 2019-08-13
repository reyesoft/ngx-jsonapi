// import 'localforage-getitems';
import { async, TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import * as localForage from 'localforage';
import { extendPrototype as extendGetitems } from 'localforage-getitems';
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
    }));
    it('should create Store service', () => {
        store_service = TestBed.get(StoreService);
        expect(store_service).toBeTruthy();
    });
    it('deprecateObjectsWithKey should set saved resources lastupdate time to 0', async () => {
        await (store_service as any).allstore.setItem('0', {_lastupdate_time: 123456}).then(
            item => {
                expect(item._lastupdate_time).toBe(123456);
            }
        );
        await store_service.deprecateObjectsWithKey('0');
        await (store_service as any).allstore.getItems('0').then(
            item => {
                expect(item._lastupdate_time).toBe(0);
            }
        );
    });

    it('removeObjectsWithKey should remove resources with the passed id from indexeddb', async () => {
        await (store_service as any).allstore.setItem('0', {_lastupdate_time: 123456}).then(
            item => {
                expect(item).toBeTruthy();
            }
        );
        await store_service.removeObjectsWithKey('0');
        await (store_service as any).allstore.getItems('0').then(
            item => {
                expect(item).toBeFalsy();
            }
        );
    });

    // it('exec should return an observable with the http request', async () => {
    //     let response = of(data_object);
    //     spyOn((service as any).http, 'request').and.returnValue(response);
    //     let exec_observable = service.exec('/test', 'patch', data_object);
    //     await exec_observable.subscribe(data => expect(data).toEqual(data_object));
    // });
});
