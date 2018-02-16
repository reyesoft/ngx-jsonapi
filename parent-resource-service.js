/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Base } from './services/base';
import { isFunction } from 'rxjs/util/isFunction';
import { noop } from 'rxjs/util/noop';
export class ParentResourceService {
    /**
     * @param {?} exec_params
     * @return {?}
     */
    proccess_exec_params(exec_params) {
        // makes `params` optional
        if (isFunction(exec_params.params)) {
            exec_params.fc_error = exec_params.fc_success;
            exec_params.fc_success = /** @type {?} */ (exec_params.params);
            exec_params.params = Object.assign({}, Base.Params);
        }
        else {
            if (typeof exec_params.params === 'undefined') {
                exec_params.params = Object.assign({}, Base.Params);
            }
            else {
                exec_params.params = Object.assign({}, Base.Params, exec_params.params);
            }
        }
        exec_params.fc_success = isFunction(exec_params.fc_success) ? exec_params.fc_success : noop;
        exec_params.fc_error = isFunction(exec_params.fc_error) ? exec_params.fc_error : undefined;
        return /** @type {?} */ (exec_params); // @todo
    }
    /**
     * @param {?} some_fc
     * @param {?} param
     * @return {?}
     */
    runFc(some_fc, param) {
        return isFunction(some_fc) ? some_fc(param) : noop();
    }
}
//# sourceMappingURL=parent-resource-service.js.map