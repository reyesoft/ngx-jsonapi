import { IDataProvider, IObject, IElement } from './data-provider';
import Dexie from 'dexie';

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

    public async getElement(key: string, table_name = 'elements'): Promise<IObject | Array<IObject>> {
        await DexieDataProvider.db.open();
        const data = await DexieDataProvider.db.table(table_name).get(key);
        if (data === undefined) {
            throw new Error(key + ' not found.');
        }

        return data;
    }

    public async getElements(keys: Array<string>, table_name = 'elements'): Promise<Array<IObject>> {
        let data = {};
        await DexieDataProvider.db
            .table(table_name)
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

    // @todo implement dexie.modify(changes)
    // @todo test
    public async updateElements(key_start_with: string, changes: IObject, table_name = 'elements'): Promise<void> {
        return DexieDataProvider.db.open().then(async () => {
            if (key_start_with === '') {
                return DexieDataProvider.db.table(table_name).clear();
            } else {
                return DexieDataProvider.db
                    .table(table_name)
                    .where(':id')
                    .startsWith(key_start_with)
                    .delete()
                    .then(() => undefined);
            }
        });
    }

    public async saveElements(elements: Array<IElement>, table_name = 'elements'): Promise<void> {
        let keys: Array<string> = [];
        let items = elements.map(element => {
            keys.push(element.key);

            return element.content;
        });

        return DexieDataProvider.db.open().then(() => {
            DexieDataProvider.db.table(table_name).bulkPut(items, keys);
        });
    }
}
