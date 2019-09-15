import { JsonapiCore, NgxJsonapiModule } from '.';
import { JsonapiConfig } from './jsonapi-config';
/*
  This file is to import the main module. By importing it into this
  spec file, all the attached components get traversed and recognized
  in the code coverage stats.
*/

describe('ngx-jsonapi Module', () => {
    it('should load', () => {
        expect(NgxJsonapiModule).toBeDefined();
    });

    it('should throw error when imported more than once', () => {
        expect(
            (): NgxJsonapiModule => new NgxJsonapiModule(NgxJsonapiModule, new JsonapiCore(new JsonapiConfig(), undefined, undefined))
        ).toThrow('NgxJsonapiModule is already loaded. Import it in the AppModule only');
    });
});
