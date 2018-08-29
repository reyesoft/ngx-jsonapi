export interface ISchema {
    attributes?: object; // @deprecated
    relationships?: object;
    ttl?: number; // @deprecated since 2.0.0: moved to service
}
