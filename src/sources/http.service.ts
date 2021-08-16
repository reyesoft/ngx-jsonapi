import { IDocumentResource } from '../interfaces/data-object';
import { share, tap } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { IDocumentData } from '../interfaces/document';
import { IHttp } from '../interfaces/http';
import { Core } from '../core';
import axios, { AxiosRequestConfig, Method } from 'axios';

export class Http implements IHttp {
    // NOTE: GET requests are stored in a this object to prevent duplicate requests
    public get_requests: { [key: string]: Observable<IDocumentData> } = {};

    public exec(path: string, method: Method, data?: IDocumentResource): Observable<IDocumentData> {
        let config: AxiosRequestConfig = {
            url: Core.me.injectedServices.rsJsonapiConfig.url + path,
            method: method,
            data: data || null,
            headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            }
        };

        if (method === 'get') {
            if (!this.get_requests[path]) {
                let obs = new Observable((observer: Observer<IDocumentData>): void => {
                    axios
                        .request(config)
                        .then((response: any) => {
                            observer.next(response.data as IDocumentData);
                            observer.complete();
                        })
                        .catch(error => {
                            observer.error(error);
                        });
                }).pipe(
                    tap(() => {
                        delete this.get_requests[path];
                    }),
                    share()
                );
                this.get_requests[path] = obs;

                return obs;
            }

            return this.get_requests[path];
        }

        return new Observable((observer: Observer<IDocumentData>): void => {
            axios
                .request(config)
                .then(response => {
                    observer.next(response.data as IDocumentData);
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                });
        }).pipe(
            tap(() => {
                delete this.get_requests[path];
            }),
            share()
        );
    }
}
