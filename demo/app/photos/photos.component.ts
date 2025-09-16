import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service, DocumentCollection } from 'ngx-jsonapi';
import { Photo, PhotosService } from './photos.service';

@Component({
    selector: 'demo-photos',
    standalone: true,
    imports: [CommonModule],
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

    public makeRequest(id: any): void {
        this.photosService.all().subscribe((photos) => {
            this.photos = photos as any;
            console.log('photos success', id, this.photos);
        });
    }
}
