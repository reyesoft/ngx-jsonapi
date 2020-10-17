/* tslint:disable:file-name-casing */
export * from './ngx-jsonapi.module';
/* tslint:enable:file-name-casing */
export * from './interfaces';
export { Autoregister } from './decorators/autoregister';
export { Core as JsonapiCore, JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
export { Resource } from './resource';
export { DocumentResource } from './document-resource';
export { DocumentCollection } from './document-collection';
export { Service } from './service';
