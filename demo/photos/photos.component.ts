import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PhotosService } from './photos.service';
import { forEach } from '../foreach';
import * as Jsonapi from '../../src';
import { JsonapiCore } from '../../src';

@Component({
    selector: 'photos',
    templateUrl: './photos.component.html'
})
export class PhotosComponent {
    public photos: Jsonapi.ICollection;

    /** @ngInject */
    constructor(
        protected PhotosService: Jsonapi.IService
    ) {
        // if you check your console, library make only one request
        this.makeRequest(1);
        this.makeRequest(2);
        this.makeRequest(3);
        this.makeRequest(4);
        this.makeRequest(5);
    }

    public $onInit() {

    }

    public makeRequest(id) {
        this.photos = this.PhotosService.all(
            succes => {
                console.log('photos success', id, this.photos);
            }
        );
    }
}
