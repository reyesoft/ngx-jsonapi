export declare class JsonapiConfig {
    url: string;
    params_separator?: string | undefined;
    unify_concurrency?: boolean | undefined;
    cache_prerequests?: boolean | undefined;
    parameters?: {
        page: {
            number: string;
            size: string;
        };
    } | undefined;
}
