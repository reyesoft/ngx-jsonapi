import { Core } from '../core';
import { JsonapiConfig } from '../jsonapi-config';
import { IRipper } from '../services/json-ripper.interface';
import { IStoreService } from '../sources/store-service.interface';
import { Http } from '../sources/http.service';
import { StoreFakeService } from '../sources/store-fake.service';
import { JsonRipperFake } from '../services/json-ripper-fake';

export class AngularBootstrap {
    public static bootstrap(user_config: JsonapiConfig, jsonapiStore?: IStoreService, jsonRipper?: IRipper): void {
        let config = new JsonapiConfig();

        for (let k in config) {
            (<any>config)[k] = user_config[k] !== undefined ? user_config[k] : (<any>config)[k];
        }

        Core.getInstance().injectedServices = {
            JsonapiStoreService: jsonapiStore ? jsonapiStore : new StoreFakeService(),
            JsonapiHttp: new Http(),
            json_ripper: jsonRipper ? jsonRipper : new JsonRipperFake(),
            rsJsonapiConfig: config
        };
    }
}
