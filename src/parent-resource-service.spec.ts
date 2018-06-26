import { JsonapiCore } from '.';
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
    it('runFc should run the given function with the given parameters', () => {
        let parentResourceServiceTest = new ParentResourceServiceTest();
        let returnArgsSpy = spyOn(parentResourceServiceTest, 'returnArgs');
        expect(returnArgsSpy).toHaveBeenCalledWith('runFc is working');
    });
    it('if IExecParams object is provided as argument, proccess_exec_params() sould return an IExecParamsProcessed object', () => {
        let execParams {
            id: string;
            params?: IParamsCollection | IParamsResource | Function;
            fc_success?: Function;
            fc_error?: Function;
            exec_type: 'all' | 'get' | 'delete' | 'save';
        }
    });
});
