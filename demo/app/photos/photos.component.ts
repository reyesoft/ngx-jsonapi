import { Component } from '@angular/core';

import { DocumentCollection } from 'ngx-jsonapi';
import { Photo, PhotosService } from './photos.service';

@Component({
    selector: 'demo-photos',
    standalone: true,
    imports: [],
    templateUrl: './photos.component.html',
    providers: [PhotosService]
})
export class PhotosComponent {
    public photos: DocumentCollection<Photo> | null = null;

    public constructor(protected photosService: PhotosService) {
        // if you check your console, library make only one request
        this.makeRequest(1);
        this.makeRequest(2);
        this.makeRequest(3);
        this.makeRequest(4);
        this.makeRequest(5);
    }

    public makeRequest(id: number): void {
        this.photosService.all().subscribe((photos) => {
            this.photos = photos as DocumentCollection<Photo>;
            console.log('photos success', id, this.photos);
        });
    }
}
