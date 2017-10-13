import '../sources/http.service';
import '../sources/store.service';

export class CoreServices {

    /** @ngInject */
    public constructor(
        protected JsonapiHttp,
        protected rsJsonapiConfig,
        protected JsonapiStoreService
    ) {

    }
}
// migrationProblem
// angular.module('Jsonapi.services').service('JsonapiCoreServices', CoreServices);
