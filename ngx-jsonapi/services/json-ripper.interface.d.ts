import { ICacheableDataCollection } from '../interfaces/data-collection';
import { ICacheableDocumentResource } from '../interfaces/data-object';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';
export interface IRipper {
    enabled: boolean;
    getResource(key: string, include: Array<string>): Promise<ICacheableDocumentResource>;
    getResourceByResource(resource: Resource, include: Array<string>): Promise<ICacheableDocumentResource>;
    getCollection(url: string, include: Array<string>): Promise<ICacheableDataCollection>;
    saveCollection(url: string, collection: DocumentCollection, include: Array<string>): void;
    saveResource(resource: Resource, include: any): Promise<void>;
    deprecateCollection(key_start_with: string): Promise<void>;
}
