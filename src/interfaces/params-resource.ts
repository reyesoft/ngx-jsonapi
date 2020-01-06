import { IParams } from './params';

export interface IParamsResource extends IParams {
    id?: string;
    include_get?: Array<string>;
    include_save?: Array<string>;
}

export function implementsIParamsResource(params: IParams): params is IParamsResource {
    return (
        (<IParamsResource>params).id !== undefined ||
        (<IParamsResource>params).include_get !== undefined ||
        (<IParamsResource>params).include_save !== undefined
    );
}
