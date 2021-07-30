import { IParamsCollection } from './interfaces/params-collection';
import { Resource } from './resource';
import { Page } from './services/page';
import { Document, SourceType } from './document';
import { ICacheable } from './interfaces/cacheable';
import { IDataCollection, ICacheableDataCollection } from './interfaces/data-collection';
import { IBasicDataResource } from './interfaces/data-resource';
export declare class RelatedDocumentCollection<R extends Resource = Resource> extends Document implements ICacheable {
    data: Array<Resource | IBasicDataResource>;
    page: Page;
    ttl: number;
    content: 'ids' | 'collection';
    trackBy(index: number, iterated_resource: Resource): string;
    find(id: string): R | null;
    fill(data_collection: IDataCollection | ICacheableDataCollection): void;
    private getResourceOrFail;
    replaceOrAdd(resource: R): void;
    hasMorePages(): boolean | null;
    setLoaded(value: boolean): void;
    setLoadedAndPropagate(value: boolean): void;
    setBuilded(value: boolean): void;
    setBuildedAndPropagate(value: boolean): void;
    setSource(value: SourceType): void;
    setSourceAndPropagate(value: SourceType): void;
    setCacheLastUpdate(value?: number): void;
    setCacheLastUpdateAndPropagate(value?: number): void;
    toObject(params?: IParamsCollection): IDataCollection;
}
export declare class DocumentCollection<R extends Resource = Resource> extends RelatedDocumentCollection<R> {
    data: Array<R>;
    content: 'collection';
}
