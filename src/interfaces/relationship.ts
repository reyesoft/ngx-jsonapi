import { ICollection } from '../interfaces';
import { Resource } from '../resource';
import { IDataResource } from './data-resource';

// @todo: use different types by content
export interface IRelationship {
    // IDataResource added for this reason:
    // redefined from IDataResource (return errors /home/rsk/desarrollo/ts-angular-jsonapi/src/library/services/resource-functions.ts)
    data: ICollection | Resource | IDataResource | {};
    content: 'none' | 'collection' | 'ids' | 'resource' | 'id';
}
