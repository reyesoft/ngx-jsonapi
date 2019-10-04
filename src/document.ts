import { IBasicDataResource } from './interfaces/data-resource';
import { IDocumentData } from './interfaces/document';
import { Resource } from './resource';

export type SourceType = 'new' | 'memory' | 'store' | 'server';

interface IDocumentHasIds {
    data: Array<IBasicDataResource>;
    content: 'ids';
}
interface IDocumentHasResources {
    data: Array<Resource>;
    content: 'collection';
}
interface IDocumentHasId {
    data: IBasicDataResource;
    content: 'id';
}
interface IDocumentHasResource {
    data: Resource;
    content: 'resource';
}
export abstract class Document implements IDocumentData, IDocumentHasResources, IDocumentHasIds, IDocumentHasId, IDocumentHasResource {
    public data: any;
    public builded = false;
    public content: any;

    // deprecated since 2.2.0. Use loaded.
    public is_loading = true;
    public loaded = false;
    public source: SourceType = 'new';
    public cache_last_update = 0;
    public meta: {
        [key: string]: any;
    } = {};
}
