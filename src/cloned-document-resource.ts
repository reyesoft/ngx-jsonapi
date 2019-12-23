import { IDocumentResource } from './interfaces/data-object';
import { Resource } from './resource';
import { IClonedResource, isClonedResource } from './interfaces/cloned-resource';
import { isEqual } from 'lodash';
import { IParamsResource } from './interfaces';
import { IDataResource } from './interfaces/data-resource';

export class ClonedDocumentResource {
    // @todo: cannot implement IDocumentResource because toObject returns an object, not an instance,
    //  so if something changed in this response, we would have to duplicate code here...
    private resource_object: IDocumentResource;
    private parent_resource_object: IDocumentResource;

    public constructor(
        cloned_resource: IClonedResource | IDataResource,
        parent_resource: Resource | IDataResource,
        params?: IParamsResource
    ) {
        // calling toObject two times because we need different objects
        if (parent_resource instanceof Resource) {
            this.parent_resource_object = parent_resource.toObject(params);
        } else {
            this.parent_resource_object = { data: parent_resource };
        }
        if (isClonedResource(cloned_resource)) {
            this.resource_object = cloned_resource.superToObject(params);
        } else {
            this.resource_object = { data: cloned_resource };
        }
        this.removeDuplicatedAttributes();
        this.removeDuplicatedRelationships();
        this.removeDuplicatedIncludes();
    }

    public getResourceObject(): IDocumentResource {
        return this.resource_object;
    }

    private removeDuplicatedIncludes(): this {
        if (!this.resource_object.included || !this.parent_resource_object.included) {
            return this;
        }
        let parent_included = this.parent_resource_object.included;
        this.resource_object.included = this.resource_object.included.filter(included_resource => {
            return !isEqual(included_resource, parent_included.find(include => include.id === included_resource.id));
        });
        this.resource_object.included = this.resource_object.included.map(included => {
            if (!parent_included.find(include => include.id === included.id)) {
                return included;
            }

            return new ClonedDocumentResource(included, parent_included.find(include => include.id === included.id)).getResourceObject()
                .data;
        });

        return this;
    }

    private removeDuplicatedRelationships(): this {
        if (!this.resource_object.data.relationships || !this.parent_resource_object.data.relationships) {
            return this;
        }
        for (let relationship in this.resource_object.data.relationships) {
            if (
                isEqual(this.resource_object.data.relationships[relationship], this.parent_resource_object.data.relationships[relationship])
            ) {
                delete this.resource_object.data.relationships[relationship];
            }
        }

        return this;
    }

    private removeDuplicatedAttributes(): this {
        if (!this.resource_object.data.attributes || !this.parent_resource_object.data.attributes) {
            return this;
        }
        for (let attribute in this.resource_object.data.attributes) {
            if (this.resource_object.data.attributes[attribute] === this.parent_resource_object.data.attributes[attribute]) {
                delete this.resource_object.data.attributes[attribute];
            }
        }

        return this;
    }
}
