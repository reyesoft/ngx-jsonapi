import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DocumentCollection } from "ngx-jsonapi";
import { System, SystemsService } from "./systems.service";

@Component({
    selector: "bc-systems",
    templateUrl: "./systems.component.html",
    styles: []
})
export class SystemsComponent {
    public systems: DocumentCollection<System>;

    public constructor(
        private route: ActivatedRoute,
        private authorsService: SystemsService
    ) {
        route.queryParams.subscribe(({ page }) => {
            authorsService.all().subscribe(
                systems => {
                    this.systems = systems;
                },
                error => console.error("Could not load authors :(", error)
            );
        });
    }
}
