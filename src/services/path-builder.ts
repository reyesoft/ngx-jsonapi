import { IParamsCollection, IParamsResource } from '../interfaces';
import { Core } from '../core';
import { Service } from '../service';

export class PathBuilder {
    public paths: string[] = [];
    public includes: string[] = [];
    private get_params: string[] = [];

    public applyParams(service: Service, params: IParamsResource | IParamsCollection = {}) {
        this.appendPath(service.getPrePath());
        if (params.beforepath) {
            this.appendPath(params.beforepath);
        }
        this.appendPath(service.getPath());
        if (params.include) {
            this.setInclude(params.include);
        }
    }

    public appendPath(value: string) {
        if (value !== '') {
            this.paths.push(value);
        }
    }

    public addParam(param: string): void {
        this.get_params.push(param);
    }

    public getForCache(): string {
        return this.paths.join('/') + this.get_params.join('/');
    }

    public get(): string {
        let params = [...this.get_params];

        if (this.includes.length > 0) {
            params.push('include=' + this.includes.join(','));
        }

        return this.paths.join('/') + (params.length > 0 ? Core.injectedServices.rsJsonapiConfig.params_separator + params.join('&') : '');
    }

    private setInclude(strings_array: string[]) {
        this.includes = strings_array;
    }
}
