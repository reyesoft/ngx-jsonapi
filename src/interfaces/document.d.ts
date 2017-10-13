import { IDataResource } from '../interfaces/data-resource';
import { ILinks } from '../interfaces/links.d';

// http://org/format/#document-top-level
interface IDocument {
    // data in child interface IJsonapiCollection
    // error in child interface IJsonapiErrors
    jsonapi?: string;
    links?: ILinks;
    included?: Array<IDataResource>;
    meta?: { [key: string]: any };
}
