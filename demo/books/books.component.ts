import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BooksService } from './books.service';
import { forEach } from '../foreach';
import * as Jsonapi from '../../src';
import { JsonapiCore } from '../../src';

@Component({
    selector: 'books',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    public books: Jsonapi.ICollection;

    /** @ngInject */
    constructor(
        protected BooksService: BooksService,
        // protected $stateParams
    ) {
        BooksService.register();
        this.books = BooksService.all(
            // { include: ['books', 'photos'] },
            success => {
                console.log('success books controll', this.books);
            },
            error => {
                console.log('error books controll', error);
            }
        );
    }

    public $onInit() {

    }

    public getAll(remotefilter) {

        // we add some remote filter
        remotefilter.date_published = {
            since: '1983-01-01',
            until: '2010-01-01'
        };

        this.books = this.BooksService.all(
            {
                localfilter: {
                    // name: 'Some name'
                },
                remotefilter: remotefilter,
                page: { number: 1 },
                include: ['author', 'photos']
            },
            success => {
                console.log('success books controller', success, this.books);

                /*** YOU CAN REMOVE THE NEXT TEST LINES **/

                // TEST 1
                // this test merge data with cache (this not include author or photos)
                console.log('BooksRequest#1 received (author data from server)',
                    (<Jsonapi.IResource>this.books[Object.keys(this.books)[2]].relationships.author.data).attributes
                );

                console.log('BooksRequest#2 requested');
                let books2 = this.BooksService.all(
                    success2 => {
                        console.log('BooksRequest#2 received (author data from cache)',
                            (<Jsonapi.IResource>books2[Object.keys(this.books)[1]].relationships.author.data)
                        );
                    }
                );

                // TEST 2
                console.log('BookRequest#3 requested');
                let book1 = this.BooksService.get(1,
                    success1 => {
                        console.log('BookRequest#3 received (author data from cache)',
                            (<Jsonapi.IResource>book1.relationships.author.data).attributes
                        );
                    });
            },
            error => {
                console.log('error books controller', error);
            }
        );
    }

    public delete(book: Jsonapi.IResource) {
        this.BooksService.delete(book.id);
    }
}
