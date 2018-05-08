import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, ICollection } from 'vp-ngx-jsonapi';

import { forEach } from '../../foreach';
import { PhotosService } from './photos.service';

@Component({
    selector: 'demo-photos',
    templateUrl: './photos.component.html'
})
export class PhotosComponent {
    public photos: ICollection;

    public constructor(
        protected photosService: Service
    ) {
        // if you check your console, library make only one request
        this.makeRequest(1);
        this.makeRequest(2);
        this.makeRequest(3);
        this.makeRequest(4);
        this.makeRequest(5);
    }

    public makeRequest(id) {
        this.photosService.all(
            succes => {
                console.log('photos success', id, this.photos);
            }
        );
    }
}
