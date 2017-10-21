import { IResource } from '../interfaces';

export interface ICache {
    setResource(resource: IResource): void;
    deprecateCollections(path_start_with: string): boolean;
}
