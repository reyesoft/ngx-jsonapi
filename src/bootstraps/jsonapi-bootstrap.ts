import { HttpAngular } from '../sources/http-angular.service';
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

        console.log(bootstrapConfig.http.httpClient, '------', bootstrapConfig.http ? new HttpAngular(bootstrapConfig.http.httpClient, config) : new Http())

        Core.getInstance().injectedServices = {
            JsonapiStoreService: bootstrapConfig.jsonapiStore ? bootstrapConfig.jsonapiStore : new StoreFakeService(),
            JsonapiHttp: bootstrapConfig.http ? new HttpAngular(bootstrapConfig.http.httpClient, config) : new Http(),
            json_ripper: bootstrapConfig.jsonRipper ? bootstrapConfig.jsonRipper : new JsonRipperFake(),
            rsJsonapiConfig: config
        };
    }
}
