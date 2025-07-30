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
export class Document implements IDocumentData, IDocumentHasResources, IDocumentHasIds, IDocumentHasId, IDocumentHasResource {
    public data: any;
    public builded: boolean = false;
    public content: any;

    // deprecated since 2.2.0. Use loaded.
    public is_loading: boolean = true;
    public loaded: boolean = false;
    public source: SourceType = 'new';
    public cache_last_update: number = 0;
    public meta: {
        [key: string]: any;
    } = {};
}
