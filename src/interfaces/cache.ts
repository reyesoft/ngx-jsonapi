import { Resource } from '../resource';

export interface ICache {
    setResource(resource: Resource, update_lastupdate?: boolean): void;
    deprecateCollections(path_start_with: string): boolean;
}
