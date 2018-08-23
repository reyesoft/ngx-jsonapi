import { JsonapiCore } from '.';
import { Base } from './services/base';
import { ParentResourceService } from './parent-resource-service';

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

describe('parent-resource-service test', () => {
    let parentResourceServiceTest = new ParentResourceServiceTest();
    it('should load', () => {
        expect(ParentResourceServiceTest).toBeDefined();
    });
    it('if a function is given as first parameter, runFc should run the given function with the given parameters', () => {
        let returnArgsSpy = spyOn(parentResourceServiceTest, 'returnArgs');
        parentResourceServiceTest.testRunFc(parentResourceServiceTest.returnArgs, 'runFc is working');
        expect(returnArgsSpy).toHaveBeenCalledWith('runFc is working');
    });
    it("runFc shouldn't do anything if the first attribute given is not a function", () => {
        let runFcSpy = spyOn(parentResourceServiceTest, 'runFc');
        expect(parentResourceServiceTest.testRunFc('something', 'runFc is working')).toBe(undefined);
    });
    it('if IExecParams object with a function in params property is provided as argument \
        to proccess_exec_params(), it should return an IExecParamsProcessed object with Base.params in params property', () => {
        let params = (): string => {
            return 'test_exec_params';
        };
        let exec_params_with_function = {
            id: 'test_exec_params',
            params: params,
            exec_type: 'all'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_function).params).toEqual({ ...{}, ...Base.Params });
    });
    it('if IExecParams object with undefined in params property is provided as argument \
        to proccess_exec_params(), it should return an IExecParamsProcessed object with Base.params in params property', () => {
        let exec_params_with_undefined = {
            id: 'test_exec_params',
            params: undefined,
            exec_type: 'get'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_undefined).params).toEqual({ ...{}, ...Base.Params });
    });
    it('if IExecParams object with an object in params property is provided as argument \
        to proccess_exec_params(), it should return an IExecParamsProcessed object with Base.params and the passed params \
        merged in params property', () => {
        let exec_params_with_object = {
            id: 'test_exec_params',
            params: { test: 'test_exec_params' },
            exec_type: 'all'
        };
        expect(parentResourceServiceTest.testProccessExecParams(exec_params_with_object).params).toEqual({
            ...{},
            ...Base.Params,
            ...exec_params_with_object.params
        });
    });
    it('proccess_exec_params() should fail if provided with a non IExecParams object', () => {
        let exec_params = {
            id: 'test_exec_params',
            params: 'PaRaM'
        };
        // expect error, typescript won't allow this
        expect(parentResourceServiceTest.testProccessExecParams(exec_params).params).toEqual({
            0: 'P',
            1: 'a',
            2: 'R',
            3: 'a',
            4: 'M',
            id: '',
            include: []
        });
    });
});
