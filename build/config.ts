export interface PackageDescription {
    name: string;
    hasTestingModule: boolean;
    bundle: boolean;
}

export interface Config {
    packages: Array<PackageDescription>;
    scope: string;
}

export const packages: Array<PackageDescription> = [
    {
        name: 'vp-ngx-jsonapi',
        hasTestingModule: false,
        bundle: true
    }
];
