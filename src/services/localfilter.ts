import * as Jsonapi from '../interfaces';
import { Base } from '../services/base';

export class LocalFilter {
    private localfilterparams;

    /** @ngInject */
    public constructor(
        localfilter: object
    ) {
        this.localfilterparams = localfilter || {};
    }

    private passFilter(resource: Jsonapi.IResource, localfilter): boolean {
        for (let attribute in localfilter) {
            if (typeof resource !== 'object' || !('attributes' in resource)) {
                // is not a resource. Is an internal property, for example $source
                return true;
            } else if (typeof localfilter[attribute] === 'object') {
                // its a regular expression
                return localfilter[attribute].test(resource.attributes[attribute]);
            } else if (typeof resource.attributes[attribute] === 'string') {
                // just a string
                return (resource.attributes[attribute] === localfilter[attribute]);
            }
        }

        return false;
    }

    public filterCollection(source_collection: Jsonapi.ICollection, dest_collection: Jsonapi.ICollection) {
        if (Object.keys(this.localfilterparams).length) {
            Base.forEach(source_collection, (resource, key) => {
                if (this.passFilter(resource, this.localfilterparams)) {
                    dest_collection[key] = resource;
                }
            });
        }
    }
}
