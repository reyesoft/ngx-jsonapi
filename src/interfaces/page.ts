export interface IPage {
    number: number;

    // http://jsonapi.org/format/#fetching-pagination
    size?: number;

    // multinexo
    total_resources?: number;
    resources_per_page?: number; // @deprecated: 2.0.1 (use size instead)
}
