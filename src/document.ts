import { IDocumentData } from './interfaces/document';
import { Resource } from './resource';

export class Document implements IDocumentData {
    public data: Array<Resource> | Resource;
    public builded = false;
    public content: 'ids' | 'collection' | 'id' | 'resource';

    public is_loading = true;
    public source: 'new' | 'memory' | 'store' | 'server' = 'new';
    public cache_last_update = 0;
    public meta: {
        [key: string]: any;
    } = {};
}
