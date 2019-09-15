export interface IObject {
    [key: string]: any;
}

export interface IElement {
    key: string;
    data: IObject;
}

export interface IDataProvider {
    getElement(key: string): Promise<IObject | Array<IObject>>;
    getElements(keys: Array<string>): Promise<Array<IObject>>;

    saveElement(key: string, data: IObject): void;
    saveElements(elements: Array<IElement>): void;
}
