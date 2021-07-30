export interface IObject {
    [key: string]: any;
}
export interface IElement {
    key: string;
    content: IObject;
}
export declare type TableNameType = 'collections' | 'elements';
export interface IDataProvider {
    getElement(key: string, table_name: TableNameType): Promise<IObject | Array<IObject>>;
    getElements(keys: Array<string>, table_name: TableNameType): Promise<Array<IObject>>;
    saveElements(elements: Array<IElement>, table_name: TableNameType): Promise<void>;
    updateElements(key_start_with: string, new_data: IObject, table_name: TableNameType): Promise<void>;
}
