import { IRipper } from './json-ripper.interface';
import { ICacheableDataCollection } from '../interfaces/data-collection';
import { ICacheableDocumentResource } from '../interfaces/data-object';
import { Resource } from '../resource';
import { IElement } from '../data-providers/data-provider';
import { DocumentCollection } from '../document-collection';
export declare class JsonRipperFake implements IRipper {
    readonly enabled: boolean;
    getResource(key: string, include?: Array<string>): Promise<ICacheableDocumentResource>;
    getResourceByResource(resource: Resource, include?: Array<string>): Promise<ICacheableDocumentResource>;
    getCollection(url: string, include?: Array<string>): Promise<ICacheableDataCollection>;
    saveCollection(url: string, collection: DocumentCollection, include?: Array<string>): void;
    saveResource(resource: Resource, include?: never[]): Promise<void>;
    static toResourceElements(key: string, resource: Resource, include?: Array<string>): Array<IElement>;
    deprecateCollection(key_start_with: string): Promise<void>;
}
