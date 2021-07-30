import { IPage } from '../interfaces/page';
export declare class Page implements IPage {
    number: number;
    total_resources: number;
    size?: number | undefined;
    resources_per_page?: number | undefined;
}
