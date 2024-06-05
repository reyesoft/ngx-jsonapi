import '../sources/http.service';
import '../sources/store.service';

export class CoreServices {
    public constructor(protected JsonapiHttp: any, protected rsJsonapiConfig: any, protected JsonapiStoreService: any) {}
}
