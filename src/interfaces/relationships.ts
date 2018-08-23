import { IDocumentData } from './document';

import {
    IRelationshipNone,
    IRelationshipId,
    IRelationshipIds,
    IRelationshipResource,
    IRelationshipCollection
} from '../interfaces/relationship';

export interface IRelationships {
    [value: string]:
        | IRelationshipNone
        | IRelationshipId
        | IRelationshipIds
        | IRelationshipResource
        | IRelationshipCollection
        | IDocumentData;
}
