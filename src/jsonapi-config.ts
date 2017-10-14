export class JsonapiConfig {
    public url: string = 'http://yourdomain/api/v1/';
    public params_separator?= '?';
    public delay? = 0;
    public unify_concurrency?= true;
    public cache_prerequests?= true;
    public parameters? = {
        page: {
            number: 'page[number]',
            limit: 'page[limit]'
        }
    };
}
