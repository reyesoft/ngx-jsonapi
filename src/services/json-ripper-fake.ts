import { ICacheableDataResource } from './../interfaces/data-resource';
import { IRipper } from './json-ripper.interface';
import { ICacheableDataCollection } from '../interfaces/data-collection';
import { ICacheableDocumentResource } from '../interfaces/data-object';
import { Resource } from '../resource';
import { DocumentResource } from '../document-resource';
import { IDataProvider, IElement } from '../data-providers/data-provider';
import { DocumentCollection } from '../document-collection';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonRipperFake implements IRipper {
    public readonly enabled: boolean = false;

    public async getResource(key: string, include: Array<string> = []): Promise<ICacheableDocumentResource> {
        return await { data: { id: '', type: '', cache_last_update: 0 } };
    }

    public async getResourceByResource(resource: Resource, include: Array<string> = []): Promise<ICacheableDocumentResource> {
        return this.getResource(resource.type, include);
    }

    public async getCollection(url: string, include: Array<string> = []): Promise<ICacheableDataCollection> {
        return await { data: <Array<ICacheableDataResource>>[], cache_last_update: 0 };
    }

    public saveCollection(url: string, collection: DocumentCollection, include: Array<string> = []): void {
        /*  */
    }

    public async saveResource(resource: Resource, include: Array<any> = []): Promise<void> {
        /*  */
    }

    public static toResourceElements(key: string, resource: Resource, include: Array<string> = []): Array<IElement> {
        return [];
    }

    public async deprecateCollection(key_start_with: string): Promise<void> {
        /*  */
    }
}
