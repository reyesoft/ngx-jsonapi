import { DocumentCollection } from '../document-collection';
import { DocumentResource } from '../document-resource';
export interface IRelationships {
    [key: string]: DocumentCollection | DocumentResource;
}
