import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, DocumentResource } from 'ngx-jsonapi';
import { Photo } from './photos.service';

@Component({
    selector: 'demo-photos',
    templateUrl: './photos.component.html'
})
export class PhotosComponent {
    public photos: DocumentResource<Photo>;

    public constructor(protected photosService: Service) {
        // if you check your console, library make only one request
        this.makeRequest(1);
        this.makeRequest(2);
        this.makeRequest(3);
        this.makeRequest(4);
        this.makeRequest(5);
    }

    public makeRequest(id) {
        this.photosService.all().subscribe(succes => {
            console.log('photos success', id, this.photos);
        });
    }
}
