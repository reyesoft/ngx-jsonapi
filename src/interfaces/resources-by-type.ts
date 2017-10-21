import { IResourcesById } from './resources-by-id';

export interface IResourcesByType {
    [type: string]: IResourcesById;
}
