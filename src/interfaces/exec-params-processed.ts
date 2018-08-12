import { IParamsCollection, IParamsResource } from '../interfaces';

export interface IExecParamsProcessed {
    id: string;
    params: IParamsCollection | IParamsResource;
    exec_type: 'all' | 'get' | 'delete' | 'save';
}
