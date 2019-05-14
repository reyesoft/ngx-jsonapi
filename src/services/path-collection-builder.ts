import { PathBuilder } from './path-builder';
import { IParamsCollection } from '../interfaces';
import { Service } from '../service';
import { UrlParamsBuilder } from './url-params-builder';
import { Core } from '../core';

export class PathCollectionBuilder extends PathBuilder {
    public applyParams(service: Service, params: IParamsCollection = {}) {
        super.applyParams(service, params);

        let paramsurl = new UrlParamsBuilder();
        if (params.remotefilter && Object.keys(params.remotefilter).length > 0) {
            if (service.parseToServer) {
                service.parseToServer(params.remotefilter);
            }
            this.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }

        if (params.fields) {
            let fields_param: string = '';
            for (let resource_type in params.fields) {
                fields_param += `fields[${resource_type}]=${params.fields[resource_type].join(',')}`;
            }
            this.addParam(fields_param);
        }

        if (params.page) {
            if (params.page.number > 1) {
                this.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.number + '=' + params.page.number);
            }
            if (params.page.size) {
                this.addParam(Core.injectedServices.rsJsonapiConfig.parameters.page.size + '=' + params.page.size);
            }
        }
        if (params.sort && params.sort.length) {
            this.addParam('sort=' + params.sort.join(','));
        }
    }

    protected addParam(param: string): void {
        this.get_params.push(param);
    }
}
