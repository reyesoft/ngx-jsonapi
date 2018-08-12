import { IParamsCollection, IParamsResource } from '../interfaces';

export interface IExecParams {
    id: string;
    params?: IParamsCollection | IParamsResource | Function;
    exec_type: 'all' | 'get' | 'delete' | 'save';
}
