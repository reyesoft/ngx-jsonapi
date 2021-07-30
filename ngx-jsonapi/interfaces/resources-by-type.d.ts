import { Resource } from '../resource';
import { IObjectsById } from './objects-by-id';
export interface IResourcesByType {
    [type: string]: IObjectsById<Resource>;
}
