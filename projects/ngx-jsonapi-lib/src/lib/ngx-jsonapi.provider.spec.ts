import { provideNgxJsonapiStandalone } from './ngx-jsonapi.provider';
import { JsonapiConfig } from './jsonapi-config';
import { EnvironmentProviders } from '@angular/core';

describe('NgxJsonapi Provider', () => {
    it('should be defined', () => {
        expect(provideNgxJsonapiStandalone).toBeDefined();
        expect(typeof provideNgxJsonapiStandalone).toBe('function');
    });
});
