import { IResourcesByType } from '../interfaces';
import { IRelationships } from '../interfaces/relationship';
export declare class ResourceRelationshipsConverter {
    private getService;
    private relationships_from;
    private relationships_dest;
    private included_resources;
    constructor(getService: Function, relationships_from: object, relationships_dest: IRelationships, included_resources: IResourcesByType);
    buildRelationships(): void;
    private __buildRelationshipHasMany;
    private __buildRelationshipHasOne;
    private __buildRelationship;
}
