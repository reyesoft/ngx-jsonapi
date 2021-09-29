export class JsonapiConfig {
    public url: string = 'http://yourdomain/api/v1/';
    public params_separator?: string = '?';
    public unify_concurrency?: boolean = true;
    public cache_prerequests?: boolean = true;
    /* eslint-disable */
    public parameters?:
        | {
              page: {
                  number: string;
                  size: string;
              };
          }
        | undefined = {
        page: {
            number: 'page[number]',
            size: 'page[size]'
        }
    };
    /* eslint-enable */
}
