import { JsonapiConfig } from '../jsonapi-config';
import { IRipper } from '../services/json-ripper.interface';
import { IStoreService } from '../sources/store-service.interface';

export interface IBootstrapConfig {
    http?: any;
    framework?: string;
    user_config: JsonapiConfig;
    jsonapiStore?: IStoreService;
    jsonRipper?: IRipper;
}
