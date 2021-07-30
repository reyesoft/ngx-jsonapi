import { IParams } from './params';
export interface IParamsResource extends IParams {
    id?: string;
    include_get?: Array<string>;
    include_save?: Array<string>;
}
