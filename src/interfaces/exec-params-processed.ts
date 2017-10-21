import { IParamsCollection, IParamsResource } from '../interfaces';

export interface IExecParamsProcessed {
    id: string;
    params: IParamsCollection | IParamsResource;
    fc_success: Function;
    fc_error: Function;
    exec_type: 'all' | 'get' | 'delete' | 'save';
}
