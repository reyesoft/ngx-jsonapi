import { Observable, Observer } from 'rxjs';
import { IDocumentData } from '../interfaces/document';
import { IDocumentResource } from '../interfaces/data-object';
import { IHttp } from '../interfaces/http';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { Core } from '../core';

export class ReactHttp implements IHttp {
    public exec(path: string, method: Method, data?: IDocumentResource): Observable<IDocumentData> {
        let config: AxiosRequestConfig = {
            url: Core.me.injectedServices.rsJsonapiConfig?.url + path,
            method: method,
            data: data || null,
            headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            }
        };

        return new Observable((observer: Observer<IDocumentData>) => {
            axios.request(config)
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
