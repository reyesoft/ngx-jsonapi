import { Base } from './base';

export class UrlParamsBuilder {
    public toparams(params: any): string {
        let ret: string = '';
        Base.forEach(params, (value, key) => {
            ret += this.toparamsarray(value, '&' + key);
        });

        return ret.slice(1);
    }

    private toparamsarray(params: any, add: any): string {
        let ret: string = '';
        if (Array.isArray(params) || params instanceof Object) {
            Base.forEach(params, (value, key) => {
                ret += this.toparamsarray(encodeURIComponent(value), add + '[' + key + ']');
            });
        } else {
            ret += add + '=' + params;
        }

        return ret;
    }
}
