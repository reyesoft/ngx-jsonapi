import { Resource } from '../resource';

export interface IResourcesById {
    [resource_id: string]: Resource;
}
