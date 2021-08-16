import { Core } from '../core';
import { IBootstrapConfig } from '../interfaces/bootstrap-config';
import { JsonapiConfig } from '../jsonapi-config';
import { JsonRipperFake } from '../services/json-ripper-fake';
import { Http } from '../sources/http.service';
import { StoreFakeService } from '../sources/store-fake.service';

export class JsonapiBootstrap {
    public static bootstrap(bootstrapConfig: IBootstrapConfig): void {
        let config = new JsonapiConfig();

        for (let k in config) {
            (<any>config)[k] = bootstrapConfig.user_config[k] !== undefined ? bootstrapConfig.user_config[k] : (<any>config)[k];
        }

        Core.getInstance().injectedServices = {
            JsonapiStoreService: bootstrapConfig.jsonapiStore ? bootstrapConfig.jsonapiStore : new StoreFakeService(),
            JsonapiHttp: new Http(),
            json_ripper: bootstrapConfig.jsonRipper ? bootstrapConfig.jsonRipper : new JsonRipperFake(),
            rsJsonapiConfig: config
        };
    }
}
