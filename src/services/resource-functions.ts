import { IResource, ICollection } from '../interfaces';

export class ResourceFunctions {
    static resourceToResource(source: IResource, destination: IResource): void {
        destination.attributes = source.attributes;

        // remove relationships on destination resource
        for (let type_alias in destination.relationships) {
            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            } else {
                // this resource is a collection?
                if (!('id' in destination.relationships[type_alias].data)) {
                    for (let id in destination.relationships[type_alias].data) {
                        if (!(id in source.relationships[type_alias].data)) {
                            delete destination.relationships[type_alias];
                        }
                    }
                }
            }
        }

        // add source relationships to destination
        for (let type_alias in source.relationships) {
            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(
                        (<IResource>source.relationships[type_alias].data),
                        type_alias
                    );
            } else {
                destination.addRelationships(<ICollection>source.relationships[type_alias].data, type_alias);
            }
        }
    }
}
