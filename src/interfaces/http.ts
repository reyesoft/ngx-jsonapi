import { Observable } from 'rxjs';
import { IDocumentResource } from './data-object';
import { IDocumentData } from './document';

export interface IHttp {
    exec(path: string, method: string, data?: IDocumentResource): Observable<IDocumentData>
}
