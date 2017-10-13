import { IResource } from './resource';

export interface IResourcesById {
    [resource_id: string]: IResource;
}
