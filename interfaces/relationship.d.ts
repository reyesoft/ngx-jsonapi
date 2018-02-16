import { ICollection } from '../interfaces';
import { Resource } from '../resource';
import { IDataResource } from './data-resource';
export interface IRelationship {
    data: ICollection | Resource | IDataResource | {};
    content: 'none' | 'collection' | 'ids' | 'resource' | 'id';
}
