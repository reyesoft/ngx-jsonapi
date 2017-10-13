import { IParamsCollection, IParamsResource } from '../interfaces';

export interface IExecParams {
    id: string;
    params?: IParamsCollection | IParamsResource | Function;
    fc_success?: Function;
    fc_error?: Function;
    exec_type: 'all' | 'get' | 'delete' | 'save';
}
