import { IStoreObject } from '../interfaces';
export declare class StoreService {
    private globalstore;
    private allstore;
    constructor();
    private checkIfIsTimeToClean();
    private checkAndDeleteOldElements();
    getObjet(key: string): Promise<object>;
    getObjets(keys: Array<string>): Promise<object>;
    saveObject(key: string, value: IStoreObject): void;
    clearCache(): void;
    deprecateObjectsWithKey(key_start_with: string): void;
}
