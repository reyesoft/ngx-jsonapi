import { IDataObject } from '../interfaces/data-object';
import { NoDuplicatedHttpCallsService } from '../services/noduplicatedhttpcalls.service';
import { HttpClient } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
export declare class Http {
    private http;
    private rsJsonapiConfig;
    private noDuplicatedHttpCallsService;
    constructor(http: HttpClient, rsJsonapiConfig: JsonapiConfig, noDuplicatedHttpCallsService: NoDuplicatedHttpCallsService);
    delete(path: string): Promise<IDataObject>;
    get(path: string): Promise<IDataObject>;
    exec(path: string, method: string, data?: IDataObject, call_loadings_error?: boolean): Promise<IDataObject>;
}
