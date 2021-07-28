import { Component, OnInit } from '@angular/core';
import { JsonapiCore } from 'ngx-jsonapi';

@Component({
    selector: 'demo-app',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent /* implements OnInit */ {
    public loading = '';

    public constructor() {
        JsonapiCore.getInstance().loadingsStart = (): void => {
            this.loading = 'LOADING...';
        };
        JsonapiCore.getInstance().loadingsDone = (): void => {
            this.loading = '';
        };
        JsonapiCore.getInstance().loadingsOffline = (error): void => {
            this.loading = 'No connection!!!';
        };
        JsonapiCore.getInstance().loadingsError = (error): void => {
            this.loading = 'No connection 2!!!';
        };
    }
}
