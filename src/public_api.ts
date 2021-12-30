/* tslint:disable:file-name-casing */
export * from './interfaces/index';
export { Autoregister } from './decorators/autoregister';
export { Core as JsonapiCore, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
export { Resource } from './resource';
export { JsonapiBootstrap } from './bootstraps/jsonapi-bootstrap';
export { DocumentResource } from './document-resource';
export { DocumentCollection } from './document-collection';
export { Service } from './service';
export { StoreService } from './sources/store.service';
export { HttpAngular } from './sources/http-angular.service';
export { JsonRipper } from './services/json-ripper';
