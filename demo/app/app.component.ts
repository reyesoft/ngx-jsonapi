import { Component } from '@angular/core';
import { JsonapiCore } from 'ngx-jsonapi';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'demo-app',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './app.component.html'
})
export class AppComponent {
    public loading: string = '';

    public constructor(
        private jsonapiCore: JsonapiCore
    ) {
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
