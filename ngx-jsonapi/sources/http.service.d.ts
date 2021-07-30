import { IDocumentResource } from '../interfaces/data-object';
import { Observable } from 'rxjs';
import { IDocumentData } from '../interfaces/document';
import { IHttp } from '../interfaces/http';
import { Method } from 'axios';
export declare class Http implements IHttp {
    get_requests: {
        [key: string]: Observable<IDocumentData>;
    };
    exec(path: string, method: Method, data?: IDocumentResource): Observable<IDocumentData>;
}
