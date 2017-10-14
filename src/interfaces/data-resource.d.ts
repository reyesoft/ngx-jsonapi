import { IAttributes } from '../interfaces';
import { ILinks } from '../interfaces/links.d';

interface IDataResource {
    type: string;
    id: string;
    attributes?: IAttributes;
    relationships?: object;
    links?: ILinks;
    meta?: object;
}
