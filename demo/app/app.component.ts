import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { JsonapiCore } from 'ngx-jsonapi';

@Component({
    selector: 'demo-app',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterModule],
    templateUrl: './app.component.html'
})
export class AppComponent /* implements OnInit */ {
    public loading: string = '';

    public constructor(private jsonapiCore: JsonapiCore) {
        jsonapiCore.loadingsStart = (): void => {
            this.loading = 'LOADING...';
        };
        jsonapiCore.loadingsDone = (): void => {
            this.loading = '';
        };
        jsonapiCore.loadingsOffline = (_error): void => {
            this.loading = 'No connection!!!';
        };
        jsonapiCore.loadingsError = (_error): void => {
            this.loading = 'No connection 2!!!';
        };
    }
}
