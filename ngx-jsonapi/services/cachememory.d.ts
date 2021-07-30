import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';
export declare class CacheMemory<R extends Resource = Resource> {
    private resources;
    private collections;
    private static instance;
    private constructor();
    static getInstance(): CacheMemory;
    clearCache(): void;
    getResource(type: string, id: string): Resource | null;
    getResourceOrFail(type: string, id: string): Resource;
    private getKey;
    getOrCreateCollection(url: string): DocumentCollection<R>;
    setCollection(url: string, collection: DocumentCollection<R>): void;
    getOrCreateResource(type: string, id: string): Resource;
    setResource(resource: Resource, update_lastupdate?: boolean): void;
    deprecateCollections(path_includes?: string): boolean;
    removeResource(type: string, id: string): void;
    private fillExistentResource;
}
