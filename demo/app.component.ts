import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    providers: [
        // Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
