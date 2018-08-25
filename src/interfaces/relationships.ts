import { IDocumentData } from './document';

import { IRelationshipNone, IRelationshipId, IRelationshipIds, IRelationshipResource } from '../interfaces/relationship';

export interface IRelationships {
    [value: string]: IRelationshipNone | IRelationshipId | IRelationshipIds | IRelationshipResource | IDocumentData;
}
