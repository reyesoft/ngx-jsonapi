import { Injectable } from '@angular/core';
import { IDocumentResource } from '../interfaces/data-object';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';
import { share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDocumentData } from '../interfaces/document';

@Injectable()
export class Http {
    // NOTE: GET requests are stored in a this object to prevent duplicate requests
    public get_requests: { [key: string]: Observable<IDocumentData> } = {};

    public constructor(private http: HttpClient, private rsJsonapiConfig: JsonapiConfig) {}

    public exec(path: string, method: string, data?: IDocumentResource): Observable<IDocumentData> {
        let req = {
            body: data || null,
            headers: new HttpHeaders({
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            })
        };

        // NOTE: prevent duplicate GET requests
        if (method === 'get') {
            if (!this.get_requests[path]) {
                let obs = this.http.request<IDocumentData>(method, this.rsJsonapiConfig.url + path, req).pipe(
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

        return this.http.request<IDocumentData>(method, this.rsJsonapiConfig.url + path, req).pipe(
            tap(() => {
                delete this.get_requests[path];
            }),
            share()
        );
    }
}
