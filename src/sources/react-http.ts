import { Observable, Observer } from 'rxjs';
import { IDocumentData } from '../interfaces/document';
import { IDocumentResource } from '../interfaces/data-object';
import { IHttp } from '../interfaces/http';
import axios from 'axios';

export class ReactHttp implements IHttp {
    public exec(path: string, method: string, data?: IDocumentResource): Observable<IDocumentData> {
        return new Observable((observer: Observer<IDocumentData>) => {
            axios[method.toLowerCase()](path)
                .then((response: IDocumentData) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                })
        })
    }
}
