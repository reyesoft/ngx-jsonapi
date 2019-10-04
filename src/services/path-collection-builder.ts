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
        if (params.page) {
            if (params.page.number > 1) {
                this.addParam(this.getPageConfig().number + '=' + params.page.number);
            }
            if (params.page.size) {
                this.addParam(this.getPageConfig().size + '=' + params.page.size);
            }
        }
        if (params.sort && params.sort.length) {
            this.addParam('sort=' + params.sort.join(','));
        }
    }

    private getPageConfig(): { number: string; size: string } {
        return (
            (Core.injectedServices.rsJsonapiConfig.parameters && Core.injectedServices.rsJsonapiConfig.parameters.page) || {
                number: 'number',
                size: 'size'
            }
        );
    }

    protected addParam(param: string): void {
        this.get_params.push(param);
    }
}
