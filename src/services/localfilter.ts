import { Base } from '../services/base';
import { Resource } from '../resource';
import { DocumentCollection } from '../document-collection';

export class LocalFilter {
    private localfilterparams;

    public constructor(localfilter: object) {
        this.localfilterparams = localfilter || {};
    }

    public filterCollection(source_collection: DocumentCollection, dest_collection: DocumentCollection) {
        if (Object.keys(this.localfilterparams).length) {
            Base.forEach(source_collection, (resource, key) => {
                if (this.passFilter(resource, this.localfilterparams)) {
                    dest_collection[key] = resource;
                }
            });
        }
    }

    private passFilter(resource: Resource, localfilter): boolean {
        for (let attribute in localfilter) {
            if (typeof resource !== 'object' || !('attributes' in resource)) {
                // is not a resource. Is an internal property, for example $source
                return true;
            } else if (typeof localfilter[attribute] === 'object') {
                // its a regular expression
                return localfilter[attribute].test(resource.attributes[attribute]);
            } else if (typeof resource.attributes[attribute] === 'string') {
                // just a string
                return resource.attributes[attribute].includes(localfilter[attribute]);
            }
        }

        return false;
    }
}
