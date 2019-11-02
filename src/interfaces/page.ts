export interface IPage {
    // http://jsonapi.org/format/#fetching-pagination
    number?: number;
    size?: number;

    limit?: number;
    cursor?: string | number;

    // multinexo
    total_resources?: number;
    resources_per_page?: number; // @deprecated: 2.0.1 (use size instead)
}
