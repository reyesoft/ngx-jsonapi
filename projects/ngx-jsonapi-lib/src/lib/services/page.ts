import { IPage } from '../interfaces/page';

export class Page implements IPage {
    // eslint-disable-next-line id-blacklist
    public number: number = 1;

    public total_resources: number = 0;
    public size?: number = 0;
    public resources_per_page?: number = 0; // @deprecated (v2.0.0)
}
