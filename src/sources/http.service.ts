import { Injectable } from '@angular/core';
import { IDataObject } from '../interfaces/data-object';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDocumentData } from '../interfaces/document';

@Injectable()
export class Http {
    public constructor(private http: HttpClient, private rsJsonapiConfig: JsonapiConfig) {}

    public exec(path: string, method: string, data?: IDataObject): Observable<IDocumentData> {
        let req = {
            body: data || null,
            headers: new HttpHeaders({
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            })
        };

        let obs = this.http.request<IDocumentData>(method, this.rsJsonapiConfig.url + path, req);
        if (method === 'get') {
            obs.pipe(share());
        }

        return obs;
    }
}
