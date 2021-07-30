import { IBasicDataResource } from './interfaces/data-resource';
import { IDocumentData } from './interfaces/document';
import { Resource } from './resource';
export declare type SourceType = 'new' | 'memory' | 'store' | 'server';
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
export declare class Document implements IDocumentData, IDocumentHasResources, IDocumentHasIds, IDocumentHasId, IDocumentHasResource {
    data: any;
    builded: boolean;
    content: any;
    is_loading: boolean;
    loaded: boolean;
    source: SourceType;
    cache_last_update: number;
    meta: {
        [key: string]: any;
    };
}
export {};
