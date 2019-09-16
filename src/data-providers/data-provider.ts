export interface IObject {
    [key: string]: any;
}

export interface IElement {
    key: string;
    content: IObject;
}

export interface IDataProvider {
    getElement(key: string): Promise<IObject | Array<IObject>>;
    getElements(keys: Array<string>): Promise<Array<IObject>>;

    saveElement(key: string, data: IObject): Promise<void>;
    saveElements(elements: Array<IElement>): Promise<void>;

    updateElements(key_start_with: string, new_data: IObject): Promise<void>;
}
