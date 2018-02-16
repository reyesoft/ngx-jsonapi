export class JsonapiConfig {
    public url: string = 'http://yourdomain/api/v1/';
    public params_separator? = '?';
    public unify_concurrency? = true;
    public cache_prerequests? = true;
    public cachestore_support? = true;
    public parameters? = {
        page: {
            number: 'page[number]',
            size: 'page[size]'
        }
    };
}
