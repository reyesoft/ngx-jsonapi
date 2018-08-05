import { ICollection } from '../interfaces';
import { Resource } from '../resource';
import { IDataResource } from './data-resource';

export interface IRelationship {
    data: any;
    hasid: boolean;
    content: string;
}

export interface IRelationshipNone extends IRelationship {
    data: {};
    hasid: false;
    content: 'none';
}

export interface IRelationshipIds extends IRelationship {
    data: { [id: string]: IDataResource };
    hasid: false;
    content: 'ids';
}

export interface IRelationshipCollection extends IRelationship {
    data: ICollection;
    hasid: false;
    content: 'collection';
}

export interface IRelationshipId extends IRelationship {
    data: IDataResource;
    hasid: true;
    content: 'id';
}

export interface IRelationshipResource extends IRelationship {
    data: Resource;
    hasid: true;
    content: 'resource';
}
