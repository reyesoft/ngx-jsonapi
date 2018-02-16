import { IRelationships, ISchema, IResourcesByType } from '../interfaces';
export declare class ResourceRelationshipsConverter {
    private getService;
    private relationships_from;
    private relationships_dest;
    private included_resources;
    private schema;
    constructor(getService: Function, relationships_from: object, relationships_dest: IRelationships, included_resources: IResourcesByType, schema: ISchema);
    buildRelationships(): void;
    private __buildRelationshipHasMany(relation_from_value, relation_key);
    private __buildRelationshipDataCollection(relation_from_value, relation_key);
    private __buildRelationshipCollection(relation_from_value, relation_key);
    private __buildRelationshipHasOne(relation_data_from, relation_data_key);
    private __buildRelationship(resource_data_from, included_array);
}
