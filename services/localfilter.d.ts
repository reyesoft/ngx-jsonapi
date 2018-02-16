import { ICollection } from '../interfaces/';
export declare class LocalFilter {
    private localfilterparams;
    constructor(localfilter: object);
    private passFilter(resource, localfilter);
    filterCollection(source_collection: ICollection, dest_collection: ICollection): void;
}
