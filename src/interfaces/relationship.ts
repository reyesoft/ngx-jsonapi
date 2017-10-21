import { ICollection } from '../interfaces';
import { Resource } from '../';
import { IDataResource } from './data-resource';

export interface IRelationship {
    // IDataResource added for this reason:
    // redefined from IDataResource (return errors /home/rsk/desarrollo/ts-angular-jsonapi/src/library/services/resource-functions.ts)
    data: ICollection | Resource | IDataResource | {};
}
