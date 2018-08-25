import { Resource } from '../resource';
import { IDataResource } from './data-resource';
import { IDocument } from './document';

export interface IRelationship<R extends Resource = Resource> extends IDocument<R> {
    hasid?: boolean; // @deprecated since 2.0.0
}

export interface IRelationshipNone extends IRelationship {
    builded: false;
}

export interface IRelationshipIds extends IRelationship {
    builded: false;
}

export interface IRelationshipId extends IRelationship {
    data: IDataResource;
    builded: false;
    content: 'id';
}

export interface IRelationshipResource<R extends Resource = R> extends IRelationship {
    data: R;
    builded: true;
    content: 'resource';
}
