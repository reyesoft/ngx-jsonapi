import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';

export class ResourceFunctions {
    public static resourceToResource(source: Resource, destination: Resource): void {
        destination.attributes = source.attributes;

        // remove relationships on destination resource
        for (let type_alias in destination.relationships) {
            // problem with no declared services
            if (destination.relationships[type_alias].data === undefined) {
                continue;
            }

            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            } else {
                // relation is a collection
                let collection = <DocumentCollection>destination.relationships[type_alias];
                for (let resource of collection.data) {
                    if (collection.find(resource.id) === null) {
                        delete destination.relationships[type_alias];
                    }
                }
            }
        }

        // add source relationships to destination
        for (let type_alias in source.relationships) {
            // problem with no declared services
            if (source.relationships[type_alias].data === undefined) {
                continue;
            }

            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(<Resource>source.relationships[type_alias].data, type_alias);
            } else {
                destination.addRelationships(<Array<Resource>>source.relationships[type_alias].data, type_alias);
            }
        }
    }
}
