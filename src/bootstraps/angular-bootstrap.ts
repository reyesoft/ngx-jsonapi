import { Injector, Optional } from '@angular/core';
import { IHttp } from '../interfaces/http';
import { Core, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from '../core';
import { JsonapiConfig } from '../jsonapi-config';
import { IRipper } from '../services/json-ripper.interface';
import { IStoreService } from '../sources/store-service.interface';

export class AngularBootstrap {
    public static bootstrap(@Optional() user_config: JsonapiConfig, jsonapiHttp: IHttp, injector: Injector): void {
        let config = new JsonapiConfig();

        for (let k in config) {
            (<any>config)[k] = user_config[k] !== undefined ? user_config[k] : (<any>config)[k];
        }

        Core.getInstance().injectedServices = {
            JsonapiStoreService: injector.get<IStoreService>(<any>JSONAPI_STORE_SERVICE),
            JsonapiHttp: jsonapiHttp,
            json_ripper: injector.get<IRipper>(<any>JSONAPI_RIPPER_SERVICE),
            rsJsonapiConfig: config
        };
    }
}
