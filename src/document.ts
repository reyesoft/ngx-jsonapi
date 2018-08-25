import { ISchema } from './interfaces';
import { IDocumentData } from './interfaces/document';
import { Resource } from './resource';
import { Page } from './services/page';

export class Document implements IDocumentData {
    public data: Array<Resource> | Resource;
    public builded = false;
    public content: 'ids' | 'collection' | 'id' | 'resource';

    public is_loading = true;
    public source: 'new' | 'memory' | 'store' | 'server' = 'new';
    public cache_last_update = 0;
    public schema: ISchema;

    // for problem detection v1 @ todo remove next line
    [key: string]: boolean | string | number | ISchema | Array<Resource> | Function | Page;
}
