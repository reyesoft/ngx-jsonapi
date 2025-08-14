import { PathBuilder } from './path-builder';
import { IParamsCollection } from '../interfaces';
import { Service } from '../service';
import { UrlParamsBuilder } from './url-params-builder';
import { Core } from '../core';
import { FilterSerializer } from './filter';

export class PathCollectionBuilder extends PathBuilder {
    public applyParams(service: Service, params: IParamsCollection = {}) {
        super.applyParams(service, params);

        let paramsurl = new UrlParamsBuilder();
        if (params.remotefilter) {
                let filterParsed = FilterSerializer.serialize(params.remotefilter);
                this.addParam(paramsurl.toparams({ filter: filterParsed }));
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
        if (params.custom_http_params && params.custom_http_params.length > 0) {
            this.addParam(params.custom_http_params.join('&'));
        }
    }

    private getPageConfig(): { number: string; size: string } {
        return (
            (Core.me.injectedServices.rsJsonapiConfig.parameters && Core.me.injectedServices.rsJsonapiConfig.parameters.page) || {
                number: 'number',
                size: 'size'
            }
        );
    }

    protected addParam(param: string): void {
        this.get_params.push(param);
    }
}
