import { JsonapiConfig } from '../jsonapi-config';
import { IRipper } from '../services/json-ripper.interface';
import { IStoreService } from '../sources/store-service.interface';

export interface IBootstrapConfig {
    user_config: JsonapiConfig;
    jsonapiStore?: IStoreService;
    jsonRipper?: IRipper;
}
