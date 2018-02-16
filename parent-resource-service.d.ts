import { IExecParams, IExecParamsProcessed } from './interfaces';
export declare class ParentResourceService {
    protected proccess_exec_params(exec_params: IExecParams): IExecParamsProcessed;
    protected runFc(some_fc: any, param: any): any;
}
