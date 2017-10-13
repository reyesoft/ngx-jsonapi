import { ICollection, IResource } from '../interfaces';
import { IDataResource } from './data-resource';

interface IRelationship {
    // IDataResource added for this reason:
    // redefined from IDataResource (return errors /home/rsk/desarrollo/ts-angular-jsonapi/src/library/services/resource-functions.ts)
    data: ICollection | IResource | IDataResource | {};
}
