export interface IParams {
    beforepath?: string;
    fields?: object;
    include?: Array<string>;
    ttl?: number;
    meta?: {
        [key: string]: any;
    };
}
