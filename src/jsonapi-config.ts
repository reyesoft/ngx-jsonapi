export class JsonapiConfig {
    public url: string = 'http://yourdomain/api/v1/';
    params_separator?= '?';
    delay? = 0;
    unify_concurrency?= true;
    cache_prerequests?= true;
    parameters? = {
        page: {
            number: 'page[number]',
            limit: 'page[limit]'
        }
    };
}
