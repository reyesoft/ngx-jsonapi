import { Observable, of } from "rxjs";

export class HttpClient {
    public request<R>(method: string, url: string, options?: {
        body?: any;
        headers?: {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        reportProgress?: boolean;
        withCredentials?: boolean;
    }): Observable<R> {
        return of();
    };
}
