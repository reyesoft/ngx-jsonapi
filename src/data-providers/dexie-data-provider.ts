import { IDataProvider, IObject, IElement } from './data-provider';
import Dexie from 'dexie';
import { Subject, Observable } from 'rxjs';
import { IDataResource } from '../interfaces/data-resource';
import { IDataCollection } from '../interfaces/data-collection';

export class DexieDataProvider implements IDataProvider {
    private static db: Dexie;

    public constructor() {
        if (DexieDataProvider.db) {
            return;
        }
        DexieDataProvider.db = new Dexie('dexie_data_provider');
        DexieDataProvider.db.version(1).stores({
            collections: '',
            elements: ''
        });
    }

    public async getElement(key: string): Promise<IObject | Array<IObject>> {
        // @todo improve this on future, we need to know type from JsonRipper
        // const table_name = key.match(/[a-zA-Z0-9][a-zA-Z0-9_\-]*\.[a-zA-Z0-9][a-zA-Z0-9_\-]*/) ? 'elements' : 'collections';
        const table_name = 'elements';

        await DexieDataProvider.db.open();
        const data = await DexieDataProvider.db.table(table_name).get(key);
        if (data === undefined) {
            throw new Error(key + ' not found.');
        }

        return data;
    }

    public async getElements(keys: Array<string>): Promise<Array<IObject>> {
        let data = {};
        await DexieDataProvider.db
            .table('elements')
            .where(':id')
            .anyOf(keys)
            .each(element => {
                data[element.data.type + '.' + element.data.id] = element;
            });

        // we need to maintain same order, database return ordered by key
        return keys.map(key => {
            return data[key];
        });
    }

    public async saveElement(key: string, item: any): Promise<void> {
        return DexieDataProvider.db.open().then(() => {
            DexieDataProvider.db.table('elements').put(item, key);
        });
    }

    // @todo implement dexie.modify(changes)
    // @todo test
    public async updateElements(key_start_with: string, changes: IObject): Promise<void> {
        return DexieDataProvider.db.open().then(async () => {
            if (key_start_with === '') {
                return DexieDataProvider.db.table('elements').clear();
            } else {
                return DexieDataProvider.db
                    .table('elements')
                    .where(':id')
                    .startsWith(key_start_with)
                    .delete()
                    .then(() => null);
            }
        });
    }

    public async saveElements(elements: Array<IElement>): Promise<void> {
        let keys: Array<string> = [];
        let items = elements.map(element => {
            keys.push(element.key);

            return element.content;
        });

        return DexieDataProvider.db.open().then(() => {
            DexieDataProvider.db.table('elements').bulkPut(items, keys);
        });
    }
}
