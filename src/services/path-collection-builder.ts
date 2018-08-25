import { PathBuilder } from './path-builder';
import { IParamsCollection } from '../interfaces';
import { Service } from '../service';
import { UrlParamsBuilder } from './url-params-builder';
import { Core } from '../core';

export class PathCollectionBuilder extends PathBuilder {
    public applyParams(service: Service, params: IParamsCollection = {}) {
        super.applyParams(service, params);

        let paramsurl = new UrlParamsBuilder();
        if (Object.keys(params.remotefilter).length > 0) {
            if (service.parseToServer) {
                service.parseToServer(params.remotefilter);
            }
            this.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }

        if (params.page) {
            if (params.page.number > 1) {
                this.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.number + '=' + params.page.number);
            }
            if (params.page.size) {
                this.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.size + '=' + params.page.size);
            }
        }
        if (params.sort.length) {
            this.addParam('sort=' + params.sort.join(','));
        }
    }
}
