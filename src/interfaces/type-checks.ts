import { IParams } from './params';
import { IParamsResource } from './params-resource';

// @note: had to put type-check methods in a different file because the compiler fails otherwise
export function implementsIParamsResource(params: IParams): params is IParamsResource {
    return (
        (<IParamsResource>params).id !== undefined ||
        (<IParamsResource>params).include_get !== undefined ||
        (<IParamsResource>params).include_save !== undefined
    );
}
