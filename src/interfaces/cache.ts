import { Resource } from '../resource';

export interface ICache {
    setResource(resource: Resource): void;
    deprecateCollections(path_start_with: string): boolean;
}
