import { IDocumentData } from './interfaces/document';
import { Resource } from './resource';

export type ContentTypes = 'new' | 'memory' | 'store' | 'server';

export interface IBasicResource {
    id: string;
    type: string;
}
interface IDocumentHasIds {
    data: Array<IBasicResource>;
    content: 'ids';
}
interface IDocumentHasResources {
    data: Array<Resource>;
    content: 'collection';
}
interface IDocumentHasId {
    data: IBasicResource;
    content: 'id';
}
interface IDocumentHasResource {
    data: Resource;
    content: 'resource';
}
export class Document implements IDocumentData, IDocumentHasResources, IDocumentHasIds, IDocumentHasId, IDocumentHasResource {
    public data;
    public builded = false;
    public content;

    // deprecated since 2.2.0. Use loaded.
    public is_loading = true;
    public loaded = false;
    public source: ContentTypes = 'new';
    public cache_last_update = 0;
    public meta: {
        [key: string]: any;
    } = {};
}
