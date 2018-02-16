import { IParamsCollection, IParamsResource } from '../interfaces';
import { Service } from '../service';
export declare class PathBuilder {
    paths: Array<string>;
    includes: Array<string>;
    private get_params;
    applyParams(service: Service, params?: IParamsResource | IParamsCollection): void;
    appendPath(value: string): void;
    addParam(param: string): void;
    private setInclude(strings_array);
    getForCache(): string;
    get(): string;
}
