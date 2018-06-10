import { Base } from './base';
import { isObject } from 'rxjs/util/isObject';

export class UrlParamsBuilder {
    private toparamsarray(params, add): string {
        let ret = '';
        if (Array.isArray(params) || isObject(params)) {
            Base.forEach(params, (value, key) => {
                ret += this.toparamsarray(value, add + '[' + key + ']');
            });
        } else {
            ret += add + '=' + params;
        }

        return ret;
    }

    public toparams(params): string {
        let ret = '';
        Base.forEach(params, (value, key) => {
            ret += this.toparamsarray(value, '&' + key);
        });

        return ret.slice(1);
    }
}
