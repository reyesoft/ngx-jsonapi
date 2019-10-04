import { DocumentCollection } from './../document-collection';
import { IRelationships } from './../interfaces/relationship';

export class CacheableHelper {
    public static propagateLoaded(relationships: IRelationships, value: boolean): void {
        for (let relationship_alias in relationships) {
            let relationship = relationships[relationship_alias];
            if (relationship instanceof DocumentCollection) {
                // we need to add builded, becuase we dont save objects with content='ids'.
                // these relationships are broken (without any data on data)
                relationship.setLoaded(value && relationship.builded);
            }
        }
    }
}
