import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Core as JsonapiCore, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { Http as JsonapiHttp } from './sources/http.service';
import { JsonapiConfig } from './jsonapi-config';
import { JsonRipper } from './services/json-ripper';
import { StoreService } from './sources/store.service';

/**
 * Proveedor standalone para usar en bootstrapApplication o en 'providers' de componentes standalone.
 * Ejemplo de uso:
 *   providers: [provideNgxJsonapiStandalone(config)]
 */
export function provideNgxJsonapiStandalone(config: JsonapiConfig): EnvironmentProviders {
    return makeEnvironmentProviders([{ provide: JsonapiConfig, useValue: config }, StoreService, JsonRipper, JsonapiHttp, JsonapiCore]);
}

// NgxJsonapiModule eliminado: usar provideNgxJsonapiStandalone(config) en su lugar
