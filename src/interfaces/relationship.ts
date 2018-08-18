import { ICollection } from '../interfaces';
import { Resource } from '../resource';
import { IDataResource } from './data-resource';

export interface IRelationship {
    data: any;
    builded: boolean;
    hasid?: boolean; // @deprecated since 2.0.0
    content: string;
}

export interface IRelationshipNone extends IRelationship {
    data: {};
    builded: false;
    content: 'none';
}

export interface IRelationshipIds extends IRelationship {
    data: IDataResource[];
    builded: false;
    content: 'ids';
}

export interface IRelationshipCollection<R extends Resource = R> extends IRelationship {
    data: ICollection<R>;
    builded: true;
    content: 'collection';
}

export interface IRelationshipId extends IRelationship {
    data: IDataResource;
    builded: false;
    content: 'id';
}

export interface IRelationshipResource extends IRelationship {
    data: Resource;
    builded: true;
    content: 'resource';
}
