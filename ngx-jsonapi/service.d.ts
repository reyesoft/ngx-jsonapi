import { Resource } from './resource';
import { PathBuilder } from './services/path-builder';
import { IParamsCollection, IParamsResource, IAttributes } from './interfaces';
import { DocumentCollection } from './document-collection';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { PathCollectionBuilder } from './services/path-collection-builder';
import { ClonedResource } from './cloned-resource';
export declare class Service<R extends Resource = Resource> {
    type: string;
    resource: typeof Resource;
    collections_ttl: number;
    protected path: string;
    constructor();
    register(): Service<R> | false;
    /**
     * @deprecated since 2.2.0. Use new() method.
     */
    newResource(): R;
    newCollection(): DocumentCollection<R>;
    new(): R;
    getPrePath(): string;
    getPath(): string;
    getClone(id: string, params?: IParamsResource): Observable<ClonedResource<R>>;
    get(id: string, params?: IParamsResource): Observable<R>;
    private getGetFromLocal;
    protected getGetFromServer(path: any, resource: R, subject: Subject<R>): void;
    getService<T extends Service<R>>(): T;
    getOrCreateCollection(path: PathCollectionBuilder): DocumentCollection<R>;
    getOrCreateResource(id: string): R;
    createResource(id: string): R;
    /**
     * deprecated since 2.2
     */
    clearCacheMemory(): Promise<boolean>;
    clearCache(): Promise<boolean>;
    parseToServer(attributes: IAttributes): void;
    parseFromServer(attributes: IAttributes): void;
    delete(id: string, params?: Object): Observable<void>;
    all(params?: IParamsCollection): Observable<DocumentCollection<R>>;
    private getAllFromLocal;
    protected getAllFromServer(path: PathBuilder, params: IParamsCollection, temporary_collection: DocumentCollection<R>, subject: BehaviorSubject<DocumentCollection<R>>): void;
}
