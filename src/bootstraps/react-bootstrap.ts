import { IHttp } from 'src/interfaces/http';
import { Core } from '../core';
import { JsonapiConfig } from '../jsonapi-config';

export class ReactBootstrap {
    public static bootstrap(user_config: JsonapiConfig, jsonapiHttp: IHttp): void {
        let config = new JsonapiConfig();

        for (let k in config) {
            (<any>config)[k] = user_config[k] !== undefined ? user_config[k] : (<any>config)[k];
        }

        Core.getInstance().injectedServices = {
            JsonapiHttp: jsonapiHttp,
            rsJsonapiConfig: config
        };
    }
}
