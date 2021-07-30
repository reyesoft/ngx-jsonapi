import { Service } from './service';
import { IDocumentResource, ICacheableDocumentResource } from './interfaces/data-object';
import { IAttributes, IParamsResource, ILinks } from './interfaces';
import { ICacheable } from './interfaces/cacheable';
import { Observable } from 'rxjs';
import { IRelationships } from './interfaces/relationship';
import { SourceType } from './document';
export declare class Resource implements ICacheable {
    id: string;
    type: string;
    attributes: IAttributes;
    relationships: IRelationships;
    links: ILinks;
    meta: {
        [key: string]: any;
    };
    is_new: boolean;
    is_saving: boolean;
    is_loading: boolean;
    loaded: boolean;
    source: SourceType;
    cache_last_update: number;
    ttl: number;
    reset(): void;
    toObject(params?: IParamsResource): IDocumentResource;
    fill(data_object: IDocumentResource | ICacheableDocumentResource): boolean;
    addRelationship<T extends Resource>(resource: T, type_alias?: string): void;
    addRelationships<R extends Resource>(resources: Array<R>, type_alias: string): void;
    removeRelationship(type_alias: string, id: string): boolean;
    hasManyRelated(resource: string): boolean;
    hasOneRelated(resource: string): boolean;
    restore<T extends Resource>(params?: IParamsResource): Observable<object>;
    getService(): Service;
    delete(): Observable<void>;
    save<T extends Resource>(params?: IParamsResource): Observable<object>;
    setLoaded(value: boolean): void;
    setLoadedAndPropagate(value: boolean): void;
    /** @todo generate interface */
    setSource(value: SourceType): void;
    setSourceAndPropagate(value: SourceType): void;
    setCacheLastUpdate(value?: number): void;
}
