export declare class JsonapiConfig {
    url: string;
    params_separator?: string;
    unify_concurrency?: boolean;
    cache_prerequests?: boolean;
    cachestore_support?: boolean;
    parameters?: {
        page: {
            number: string;
            size: string;
        };
    };
}
