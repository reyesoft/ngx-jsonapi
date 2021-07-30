import { IParamsCollection, IParamsResource } from '../interfaces';
import { Service } from '../service';
export declare class PathBuilder {
    paths: Array<string>;
    includes: Array<string>;
    protected get_params: Array<string>;
    applyParams(service: Service, params?: IParamsResource | IParamsCollection): void;
    appendPath(value: string): void;
    getForCache(): string;
    get(): string;
    private setInclude;
}
