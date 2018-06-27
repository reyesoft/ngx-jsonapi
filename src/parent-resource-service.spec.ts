import { JsonapiCore } from '.';
import { Base } from './services/base';
import { ParentResourceService } from './parent-resource-service';
import { ICollection, IExecParams, IExecParamsProcessed } from './interfaces';

/*
  This file is to import the main module. By importing it into this
  spec file, all the attached components get traversed and recognized
  in the code coverage stats.
*/

class ParentResourceServiceTest extends ParentResourceService {
    public testProccessExecParams(exec_params) {
        return this.proccess_exec_params(exec_params);
    }
    public testRunFc(func, args): any {
        return this.runFc(func, args);
    }
    public returnArgs(args): any {
        return args;
    }
}

describe('ngx-jsonapi Module', () => {
    it('should load', () => {
        expect(ParentResourceServiceTest).toBeDefined();
    });
    it('if a function is given as first parameter, runFc should run the given function with the given parameters', () => {
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let returnArgsSpy = spyOn(parentResourceServiceTest, 'returnArgs');
        parentResourceServiceTest.testRunFc(parentResourceServiceTest.returnArgs, 'runFc is working');
        expect(returnArgsSpy).toHaveBeenCalledWith('runFc is working');
    });
    it('runFc shouldn\'t do anything if the first attribute given is not a function', () => {
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let runFcSpy = spyOn(parentResourceServiceTest, 'runFc');
        expect(parentResourceServiceTest.testRunFc('something', 'runFc is working')).toBe(undefined);
    });
    it('if IExecParams object with a function in params property is provided as argument \
        to proccess_exec_params(), it should return an IExecParamsProcessed object with Base.params in params property, \
        .params function in fc_success and fc_success function in fc_error', () => {
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let params = (): string => { return 'test_exec_params'; };
        let fc_success = (): string => { return 'test_exec_params success'; };
        let fc_error = (): string => { return 'test_exec_params error'; };
        let exec_params_with_function = {
            id: 'test_exec_params',
            params: params,
            fc_success: fc_success,
            fc_error: fc_error,
            exec_type: 'all'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_function).params).toEqual({ ...{}, ...Base.Params });
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_function).fc_success).toEqual(params);
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_function).fc_error).toEqual(fc_success);
    });
    it('if IExecParams object with undefined in params property is provided as argument \
        to proccess_exec_params(), it should return an IExecParamsProcessed object with Base.params in params property', () => {
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let exec_params_with_undefined = {
            id: 'test_exec_params',
            params: undefined,
            fc_success: (): string => { return 'test_exec_params success'; },
            fc_error: (): string => { return 'test_exec_params error'; },
            exec_type: 'get'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_undefined).params).toEqual({ ...{}, ...Base.Params });
    });
    it('if IExecParams object with an object in params property is provided as argument \
        to proccess_exec_params(), it should return an IExecParamsProcessed object with Base.params and the passed params \
        merged in params property', () => {
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let exec_params_with_object = {
            id: 'test_exec_params',
            params: { test: 'test_exec_params' },
            fc_success: (): string => { return 'test_exec_params success'; },
            fc_error: (): string => { return 'test_exec_params error'; },
            exec_type: 'all'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_object).params)
            .toEqual({ ...{}, ...Base.Params, ...exec_params_with_object.params });
    });
    it('proccess_exec_params() should fail if provided with a non IExecParams object', () => {
        // TODO: cahnge test or fix method to return false or an error in such case
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let exec_params = {
            id: 'test_exec_params',
            params: 'test_exec_params'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params)).toBeFalsy();
    });
});
