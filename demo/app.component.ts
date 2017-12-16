import { Component, OnInit } from '@angular/core';
import { JsonapiCore } from 'ngx-jsonapi';

@Component({
    selector: 'demo-app',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent /* implements OnInit */ {
    public loading = '';

    public constructor(private jsonapiCore: JsonapiCore) {
        jsonapiCore.loadingsStart = (): void => {
            this.loading = 'LOADING...';
        };
        jsonapiCore.loadingsDone = (): void => {
            this.loading = '';
        };
        jsonapiCore.loadingsOffline = (error): void => {
            this.loading = 'No connection!!!';
        };
        jsonapiCore.loadingsError = (error): void => {
            this.loading = 'No connection 2!!!';
        };
    }
}
