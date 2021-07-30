import { JsonapiConfig } from '../jsonapi-config';
import { IRipper } from '../services/json-ripper.interface';
import { IStoreService } from '../sources/store-service.interface';
export declare class AngularBootstrap {
    static bootstrap(user_config: JsonapiConfig, jsonapiStore?: IStoreService, jsonRipper?: IRipper): void;
}
