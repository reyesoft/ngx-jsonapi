export interface Environment {
    production: boolean;
    jsonapi_url: string;
}

export const environment: Environment = {
    production: true,
    jsonapi_url: '//jsonapiplayground.reyesoft.com/v2/'
};
