import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service, ICollection, Resource } from 'ngx-jsonapi';

import { forEach } from '../foreach';
import { BooksService } from './books.service';

@Component({
    selector: 'demo-books',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    public books: ICollection;

    public constructor(
        protected booksService: BooksService
    ) {
        this.books = booksService.all(
            {
                page: { number: 2 },
                include: ['books', 'photos']
            },
            success => {
                console.info('success books controll', this.books);
            },
            error => {
                console.info('error books controll', error);
            }
        );
    }

    public getAll(remotefilter) {

        // we add some remote filter
        remotefilter.date_published = {
            since: '1983-01-01',
            until: '2010-01-01'
        };

        this.books = this.booksService.all(
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
                    (<Resource>this.books[Object.keys(this.books)[2]].relationships.author.data).attributes
                );

                console.log('BooksRequest#2 requested');
                let books2 = this.booksService.all(
                    success2 => {
                        console.log('BooksRequest#2 received (author data from cache)',
                            <Resource>books2[Object.keys(this.books)[1]].relationships.author.data
                        );
                    }
                );

                // TEST 2
                console.log('BookRequest#3 requested');
                let book1 = this.booksService.get('1',
                    success1 => {
                        console.log('BookRequest#3 received (author data from cache)',
                            (<Resource>book1.relationships.author.data).attributes
                        );
                    }
                );
            },
            error => {
                console.log('error books controller', error);
            }
        );
    }

    public delete(book: Resource) {
        this.booksService.delete(book.id);
    }
}
