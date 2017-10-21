import { Base } from './services/base';
import { isFunction } from 'rxjs/util/isFunction';
import { noop } from 'rxjs/util/noop';
import { ICollection, IExecParams, IExecParamsProcessed } from './interfaces';

export class ParentResourceService {
    /*
    This method sort params for all(), get(), delete() and save()
    */
    protected proccess_exec_params(exec_params: IExecParams): IExecParamsProcessed {
        // makes `params` optional
        if (isFunction(exec_params.params)) {
            exec_params.fc_error = exec_params.fc_success;
            exec_params.fc_success = <Function>exec_params.params;
            exec_params.params = {...{}, ...Base.Params};
        } else {
            if (typeof exec_params.params === 'undefined') {
                exec_params.params = {...{}, ...Base.Params};
            } else {
                exec_params.params = {...{}, ...Base.Params, ...exec_params.params};
            }
        }

        exec_params.fc_success = isFunction(exec_params.fc_success) ? exec_params.fc_success : noop;
        exec_params.fc_error = isFunction(exec_params.fc_error) ? exec_params.fc_error : undefined;

        return <IExecParamsProcessed>exec_params; // @todo
    }

    protected runFc(some_fc, param) {
        return isFunction(some_fc) ? some_fc(param) : noop();
    }

}
