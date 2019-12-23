import { Resource } from './resource';
import { IParamsResource } from './interfaces';
import { IDocumentResource } from './interfaces/data-object';
import { ClonedDocumentResource } from './cloned-document-resource';
import { cloneDeep } from 'lodash';
import { IClonedResource } from './interfaces/cloned-resource';

export class ClonedResource<T extends Resource> extends Resource implements IClonedResource {
    private parent: Resource;
    public attributes: T['attributes'];
    public relationships: T['relationships'];

    public constructor(resource: T) {
        super();
        // @note using cloneDeep because the parent may have changed since clone (example: data received from socket while editing clone)
        this.parent = cloneDeep(resource);
        this.type = this.parent.type; // this line should go to fill method?
        delete this.relationships; // remove empty relationships object so fill method creates them... how can we improve inheritance to remove this?
        let include = Object.keys(this.parent.relationships);
        this.fill(this.parent.toObject({ include: include }));
        this.copySourceFromParent();
    }

    public toObject(params?: IParamsResource): IDocumentResource {
        return new ClonedDocumentResource(this, this.parent, params).getResourceObject();
    }

    public superToObject(params?: IParamsResource) {
        return super.toObject(params);
    }

    private copySourceFromParent() {
        this.source = this.parent.source;
        for (let relationship in this.relationships) {
            this.relationships[relationship].source = this.parent.relationships[relationship].source;
        }
    }
}
