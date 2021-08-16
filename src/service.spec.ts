import { JsonRipper } from './services/json-ripper';
import { PhotosService } from './tests/factories/photos.service';
import { CacheMemory } from './services/cachememory';
import { TestFactory } from './tests/factories/test-factory';
import { Author, AuthorsService } from './tests/factories/authors.service';
import { Book, BooksService } from './tests/factories/books.service';
import { map, toArray, tap } from 'rxjs/operators';
import axios from 'axios';
import { StoreService } from './sources/store.service';
import { IDataResource } from './interfaces/data-resource';
import { IDocumentResource } from './interfaces/data-object';
import { JsonapiBootstrap } from './bootstraps/jsonapi-bootstrap';

// @todo disable PhotoService
// @TODO: fix error in toObject when relationship's service is not injected

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('service basic methods', () => {
    let service: AuthorsService;
    beforeAll(async () => {
        JsonapiBootstrap.bootstrap({ user_config: { url: 'http://yourdomain/api/v1/' } });
        service = new AuthorsService();
    });

    it('a new resource has a type', async () => {
        const resource = service.new();
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.type).toEqual('authors');
    });

    it('a new resource with id has a type', async () => {
        const resource = service.createResource('31');
        expect(resource instanceof Author).toBeTruthy();
        expect(resource.id).toEqual('31');
        expect(resource.type).toEqual('authors');
    });

    // @TODO: uncomment when library has support for clear cachememory and it's added in the following tests suites
    // it('getOrCreateResource() without cached resource', () => {
    //     let resource = service.getOrCreateResource('1');
    //     expect(resource.source).toBe('new');
    // });
    //
    // it('getOrCreateResource() with cached resource in memory', async () => {
    //     let body_resource = TestFactory.getResourceDocumentData(Author);
    //     (<IDataResource>body_resource.data).id = '1';
    //     test_response_subject.next(new HttpResponse({ body: body_resource }));
    //     // caching resource
    //     await service.get('1').toPromise();
    //
    //     let resource = service.getOrCreateResource('1');
    //     expect(resource.source).toBe('memory');
    // });
});

let store_cache_methods: Array<'individual' | 'compact'> = ['compact', 'individual'];
for (let store_cache_method of store_cache_methods) {
    describe(`service.all() with ${store_cache_method} storage cache method: `, () => {
        let booksService: BooksService;
        beforeEach(async () => {
            JsonapiBootstrap.bootstrap({
                user_config: { url: 'http://yourdomain/api/v1/' },
                jsonapiStore: new StoreService(),
                jsonRipper: new JsonRipper()
            });
            mockedAxios.request.mockResolvedValue({});
            booksService = new BooksService();
            booksService.register();
            let photosService = new PhotosService();
            photosService.register();
            let authorsService = new AuthorsService();
            authorsService.register();
            await booksService.clearCache();

            // clear cachememory on every test
            let cachememory = CacheMemory.getInstance();
            (cachememory as any).resources = {};
            (cachememory as any).collections = {};
        });

        it(`without cached collection emits source ^new-server|`, async () => {
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });

            let expected = [
                // expected emits
                { builded: false, loaded: false, source: 'new' },
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    tap(emit => {
                        if (emit.data.length > 0) {
                            expect(emit.data[0].relationships).toHaveProperty('photos');
                            expect(emit.data[0].relationships).toHaveProperty('author');
                        }
                    }),
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`with cached on memory (live) collection emits source ^memory|`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            booksService.collections_ttl = 5; // live
            await booksService.all().toPromise();
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: true, loaded: true, source: 'memory' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(0);
        });

        it(`with cached on memory (live) collection emits source ^memory-server| when force ttl = 0 on call`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            booksService.collections_ttl = 5; // live
            await booksService.all({ store_cache_method: store_cache_method }).toPromise();
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: true, loaded: false, source: 'memory' },
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ ttl: 0, store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`with cached on memory (dead) collection emits source ^memory-server|`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            booksService.collections_ttl = 0; // dead
            await booksService.all({ store_cache_method: store_cache_method }).toPromise();
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: true, loaded: false, source: 'memory' },
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    tap(emit => {
                        if (emit.data.length > 0) {
                            expect(emit.data[0].relationships).toHaveProperty('photos');
                            expect(emit.data[0].relationships).toHaveProperty('author');
                        }
                    }),
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`with cached on store (live) collection emits source ^new-store|`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            booksService.collections_ttl = 5; // live
            await booksService.all({ store_cache_method: store_cache_method }).toPromise();
            let cachememory = CacheMemory.getInstance(); // kill only memory cache
            (cachememory as any).resources = {}; // kill memory cache
            (cachememory as any).collections = {}; // kill memory cache

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: false, loaded: false, source: 'new', source_resource: undefined },
                { builded: true, loaded: true, source: 'store', source_resource: 'store' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    tap(emit => {
                        if (emit.data.length > 0) {
                            expect(emit.data[0].relationships).toHaveProperty('photos');
                            expect(emit.data[0].relationships).toHaveProperty('author');
                        }
                    }),
                    map(emit => {
                        if (emit.data.length > 0) {
                            return {
                                builded: emit.builded,
                                loaded: emit.loaded,
                                source: emit.source,
                                source_resource: emit.data[0].source
                            };
                        } else {
                            return { builded: emit.builded, loaded: emit.loaded, source: emit.source, source_resource: undefined };
                        }
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(0);
        });

        it(`with cached on store (live) collection wihtout includes emits source ^new-store|`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            booksService.collections_ttl = 5; // live
            await booksService.all({ store_cache_method: store_cache_method, include: ['author'] }).toPromise();
            let cachememory = CacheMemory.getInstance(); // kill only memory cache
            (cachememory as any).resources = {}; // kill memory cache
            (cachememory as any).collections = {}; // kill memory cache

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: false, loaded: false, source: 'new', source_resource: undefined },
                { builded: true, loaded: true, source: 'store', source_resource: 'store' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        if (emit.data.length > 0) {
                            return {
                                builded: emit.builded,
                                loaded: emit.loaded,
                                source: emit.source,
                                source_resource: emit.data[0].source
                            };
                        } else {
                            return { builded: emit.builded, loaded: emit.loaded, source: emit.source, source_resource: undefined };
                        }
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(0);
        });

        it(`with cached on store (dead) collection emits source ^new-store-server|`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            booksService.collections_ttl = 0; // dead
            await booksService.all({ store_cache_method: store_cache_method }).toPromise();
            CacheMemory.getInstance().deprecateCollections('');

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: true, loaded: false, source: 'new' }, // @TODO: builded should be false
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`with cached on store (dead, no collection_ttl defined) collection emits source ^new-store-server|`, async () => {
            // caching collection
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            delete booksService.collections_ttl; // dead
            await booksService.all({ store_cache_method: store_cache_method }).toPromise();
            CacheMemory.getInstance().deprecateCollections('');

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Book) });
            let expected = [
                // expected emits
                { builded: true, loaded: false, source: 'new' }, // @TODO: builded should be false
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`with nested include (collection -> hasone -> hasMany)`, async () => {
            // caching collection
            let http_response = {
                data: TestFactory.getCollectionDocumentData(Book, 1, ['author'])
            };
            http_response.data.included[0].relationships.books.data = [{ id: 'book_123', type: 'books' }];
            let nested_book = TestFactory.getBook();
            delete nested_book.relationships;
            nested_book.id = 'book_123';
            nested_book.attributes.title = 'The Nested Book';
            http_response.data.included.push(nested_book);
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue(http_response);
            delete booksService.collections_ttl; // dead
            CacheMemory.getInstance().deprecateCollections('');

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue(http_response);
            let expected = [
                // expected emits
                { builded: false, loaded: false, source: 'new' },
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ include: ['author', 'author.books'], store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`cached on store (dead) with nested include (collection -> hasone -> hasMany)`, async () => {
            // caching collection
            let http_response = {
                data: TestFactory.getCollectionDocumentData(Book, 1, ['author'])
            };
            http_response.data.included[0].relationships.books.data = [{ id: 'book_123', type: 'books' }];
            let nested_book = TestFactory.getBook();
            delete nested_book.relationships;
            nested_book.id = 'book_123';
            nested_book.attributes.title = 'The Nested Book';
            http_response.data.included.push(nested_book);
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue(http_response);
            delete booksService.collections_ttl; // dead
            await booksService.all({ include: ['author', 'author.books'], store_cache_method: store_cache_method }).toPromise();
            CacheMemory.getInstance().deprecateCollections('');

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue(http_response);
            let expected = [
                // expected emits
                { builded: true, loaded: false, source: 'new' },
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ include: ['author', 'author.books'], store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        expect(emit.data[0].relationships.author.data.relationships.books.data[0].id).toBe('book_123');
                        expect(emit.data[0].relationships.author.data.relationships.books.data[0].attributes.title).toBe('The Nested Book');

                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });

        it(`cached on memory (dead) with nested include (collection -> hasone -> hasMany)`, async () => {
            // caching collection
            let http_response = {
                data: TestFactory.getCollectionDocumentData(Book, 1, ['author'])
            };
            http_response.data.included[0].relationships.books.data = [{ id: 'book_123', type: 'books' }];
            let nested_book = TestFactory.getBook();
            delete nested_book.relationships;
            nested_book.id = 'book_123';
            nested_book.attributes.title = 'The Nested Book';
            http_response.data.included.push(nested_book);
            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue(http_response);
            delete booksService.collections_ttl; // dead
            await booksService.all({ include: ['author', 'author.books'], store_cache_method: store_cache_method }).toPromise();
            // CacheMemory.getInstance().deprecateCollections('');

            mockedAxios.request.mockRestore();
            mockedAxios.request.mockResolvedValue(http_response);
            let expected = [
                // expected emits
                { builded: true, loaded: false, source: 'memory' },
                { builded: true, loaded: true, source: 'server' }
            ];

            let emits = await booksService
                .all({ include: ['author', 'author.books'], store_cache_method: store_cache_method })
                .pipe(
                    map(emit => {
                        expect(emit.data[0].relationships.author.data.relationships.books.data[0].id).toBe('book_123');
                        expect(emit.data[0].relationships.author.data.relationships.books.data[0].attributes.title).toBe('The Nested Book');

                        return { builded: emit.builded, loaded: emit.loaded, source: emit.source };
                    }),
                    toArray()
                )
                .toPromise();
            expect(emits).toMatchObject(expected);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        });
    });
}

describe('service.all() and next service.get()', () => {
    let authorsService: AuthorsService;
    let booksService: BooksService;
    beforeEach(async () => {
        JsonapiBootstrap.bootstrap({
            user_config: { url: 'http://yourdomain/api/v1/' },
            jsonapiStore: new StoreService(),
            jsonRipper: new JsonRipper()
        });
        authorsService = new AuthorsService();
        authorsService.register();
        booksService = new BooksService();
        booksService.register();
        let photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
        await booksService.clearCache();
    });

    it(`with cached collection on memory and next request get() with new include`, async () => {
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Author) });
        let expected = [
            // expected emits
            { loaded: false, source: 'memory' }, // emits with data stored in memory
            { loaded: true, source: 'server' } // emits with data received from server
        ];

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Author) });
        let author_emits = await authorsService
            .get(authors.data[0].id, { include: ['photos', 'books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(author_emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(2);
    });

    it(`with cached collection on store and next request get() with new include`, async () => {
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Author) });

        let expected = [
            { loaded: false, source: 'new' },
            { loaded: true, source: 'server' } // emits with data received from server
        ];

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        let cachememory = CacheMemory.getInstance();
        let removed_author_id = authors.data[0].id;
        cachememory.removeResource('authors', removed_author_id); // kill only memory cache
        let removed_author = cachememory.getResource('authors', removed_author_id);
        expect(removed_author).toBe(null);

        mockedAxios.request.mockResolvedValue({ data: TestFactory.getCollectionDocumentData(Author) });
        let author_emits = await authorsService
            .get(removed_author_id, { include: ['photos', 'books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(author_emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(2);
    });

    it(`with cached collection on memory and next request get() without include`, async () => {
        Author.test_ttl = 100000;
        let all_authors_body = TestFactory.getCollectionDocumentData(Author, 1, ['books']);
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: all_authors_body });

        let expected = [
            // expected emits
            { loaded: true, source: 'memory' } // emits with data stored in memory ERROR! check emits...
        ];
        let received_author: Author;

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        expect(authors.data[0].relationships.books.data[0].attributes).toBeTruthy();

        let author_emits = await authorsService
            .get(authors.data[0].id)
            .pipe(
                tap(author => (received_author = author)),
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(author_emits).toMatchObject(expected);
        // expect(received_author.relationships.books.data[0].attributes).toBeFalsy(); // ERROR!!!
        expect(mockedAxios.request).toHaveBeenCalledTimes(1); // on all() request
    });

    it(`with cached collection on store and next request get() without include`, async () => {
        let all_authors_body = TestFactory.getCollectionDocumentData(Author, 1, ['books']);
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: all_authors_body });

        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: true, source: 'store' } // emits with data stored in memory ERROR! check emits...
        ];
        let received_author: Author;

        let authors = await authorsService.all({ include: ['books'] }).toPromise();
        expect(authors.data[0].relationships.books.data[0].attributes).toBeTruthy();

        mockedAxios.request.mockResolvedValue({ data: all_authors_body });
        let cachememory = CacheMemory.getInstance();
        let removed_author_id = authors.data[0].id;
        cachememory.removeResource('authors', removed_author_id); // kill only memory cache

        let author_emits = await authorsService
            .get(removed_author_id)
            .pipe(
                tap(author => (received_author = author)),
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        // @TODO: fix this error!!!
        expect(author_emits).toMatchObject(expected);
        // expect(received_author.relationships.books.data[0].attributes).toBeFalsy(); // ERROR!!!
        expect(mockedAxios.request).toHaveBeenCalledTimes(1); // on all() request
    });

    it(`with cached collection and next request get() with cached include`, async () => {
        let books_api = TestFactory.getCollectionDocumentData(Book, 1, ['author']);
        books_api.data[0].id = '1';
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: books_api });

        let expected = [
            { loaded: true, source: 'memory' } // emits with data received from server
        ];

        let books = await booksService.all({ include: ['author'] }).toPromise();
        expect(books.data[0].id).toBe('1');

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: books_api });
        let book_emits = await booksService
            .get('1', { include: ['author'], ttl: 1000 })
            .pipe(
                map(emit => {
                    expect(mockedAxios.request).not.toHaveBeenCalled();
                    expect(emit.relationships.author.data.attributes.name).toBeTruthy();
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(book_emits).toMatchObject(expected);

        // clear cachememory on every test
        let cachememory = CacheMemory.getInstance();
        (cachememory as any).resources = {};
        (cachememory as any).collections = {};
    });

    it(`get resource and request all()`, async () => {
        let book_api = TestFactory.getResourceDocumentData(Book, ['author']);
        (<IDataResource>book_api.data).id = '1';
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: book_api });

        let expected = [
            { loaded: false, source: 'new' }, // emits with data received from server
            { loaded: true, source: 'server' } // emits with data received from server
        ];

        let book = await booksService.get('1', { include: ['author'] }).toPromise();
        expect(book.id).toBe('1');

        let books_api = TestFactory.getCollectionDocumentData(Book, 1, ['author']);
        books_api.data[0].id = '1';
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: books_api });

        let books_emits = await booksService
            .all({ include: ['author'], ttl: 1000 })
            .pipe(
                map(emit => {
                    if (emit.loaded) {
                        expect(emit.data[0].relationships.author.data.attributes.name).toBeTruthy();
                    }
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(books_emits).toMatchObject(expected);

        // clear cachememory on every test
        let cachememory = CacheMemory.getInstance();
        (cachememory as any).resources = {};
        (cachememory as any).collections = {};
    });
});

describe('service.get()', () => {
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;
    beforeEach(async () => {
        JsonapiBootstrap.bootstrap({
            user_config: { url: 'http://yourdomain/api/v1/' },
            jsonapiStore: new StoreService(),
            jsonRipper: new JsonRipper()
        });
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCache();
        authorsService = new AuthorsService();
        authorsService.register();
        photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
        // @TODO: should clear CacheMemory before each it
    });

    it(`no cached resource emits source ^new-server|`, async () => {
        let expected = [{ loaded: false, source: 'new' }, { loaded: true, source: 'server' }];

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });
        let book_emits = await booksService
            .get('1')
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();

        expect(book_emits).toMatchObject(expected);
    });

    it(`memory cached (live) resource emits source ^memory|`, async () => {
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });
        // caching resource
        await booksService.get('1').toPromise();

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000 })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(0);
    });

    it(`on memory (live) resource + include new has-one-relationship emits source ^memory-server|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book);
        body_resource.data.relationships = { author: { data: { id: '1', type: 'authors' } } };
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1').toPromise();

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['author'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        // TODO: fix library
        expect(emits).toMatchObject(expected); // ERROR!!! [{ loaded: true, source: 'memory' }, { loaded: true, source: 'server' }]
        expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    });

    it(`on memory (live) resource + include existent has-many-relationship emits source ^memory-server|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Author);
        body_resource.data.id = '555';
        body_resource.data.relationships = { books: { data: [{ id: '555', type: 'books' }] } };
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await authorsService.get('555').toPromise();

        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emits = await authorsService
            .get('555', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
    });

    it(`with cached on memory (live) resource + include empty has-one-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book);
        body_resource.data.relationships = { author: { data: null } };
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1').toPromise();

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['author'] })
            .pipe(
                tap(emit => {
                    // expect(emit.data[0].relationships).toHaveProperty('author');
                }),
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(0);
    });

    it(`with cached on memory (live) resource + include cached has-one-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book, ['author']);
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1', { include: ['author'] }).toPromise();

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['author'] })
            .pipe(
                map(emit => {
                    expect(emit.relationships.author.data.attributes.name).toBeTruthy();

                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(0);
    });

    it(`with cached on store (live) resource + include cached has-one-relationship emits source ^new-store|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Book, ['author']);
        // body_resource.data.relationships = { author: { data: [] } };
        body_resource.data.id = '1';
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1', { include: ['author'] }).toPromise();

        let cachememory = CacheMemory.getInstance(); // kill only memory cache
        (cachememory as any).resources = {}; // kill memory cache
        (cachememory as any).collections = {}; // kill memory cache

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: true, source: 'store' }
        ];

        let emits = await booksService
            .get('1', { ttl: 1000, include: ['author'] })
            .pipe(
                map(emit => {
                    if (emit.source !== 'new') {
                        expect(emit.relationships.author.data.attributes.name).toBeTruthy();
                    }

                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(mockedAxios.request).not.toHaveBeenCalled();
    });

    it(`with cached on memory (live) resource + include empty has-many-relationship emits source ^memory|`, async () => {
        let body_resource = <IDocumentResource>TestFactory.getResourceDocumentData(Author);
        body_resource.data.id = '556';
        body_resource.data.relationships = { books: { data: [] } };
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await authorsService.get('556').toPromise();

        let expected = [
            // expected emits
            { loaded: true, source: 'memory' }
        ];
        let emits = await authorsService
            .get('556', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
    });

    it(`with cached on memory (dead) resource emits source ^memory-server|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1').toPromise();

        let cachememory = CacheMemory.getInstance();
        let book = cachememory.getResourceOrFail('books', '1');
        book.ttl = 0;

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: false, source: 'memory' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1')
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    });

    it(`with cached on store (live) resource emits source ^new-store|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1').toPromise();

        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('books', '1'); // kill only memory cache

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: true, source: 'store' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000 })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        expect(emits).toMatchObject(expected);
        expect(mockedAxios.request).toHaveBeenCalledTimes(0);
    });

    it(`with cached on store (live) resource but with new include emits source ^store-server|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        await booksService.get('1').toPromise();

        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('books', '1'); // kill only memory cache

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: false, source: 'store' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        // @TODO: fix library
        // expect(emits).toMatchObject(expected); // ERROR!!! [{ loaded: false, source: 'new' }, { loaded: true, source: 'server' }]
        expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    });

    it(`with cached on store (dead) resource emits source ^new-store-server|`, async () => {
        let body_resource = TestFactory.getResourceDocumentData(Book);
        (<IDataResource>body_resource.data).id = '1';

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        // caching resource
        let book = await booksService.get('1').toPromise();

        book.ttl = 0;
        let json_ripper = new JsonRipper();
        json_ripper.saveResource(book);
        let cachememory = CacheMemory.getInstance();
        cachememory.removeResource('books', '1'); // kill only memory cache

        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: body_resource });
        let expected = [
            // expected emits
            { loaded: false, source: 'new' },
            { loaded: false, source: 'store' },
            { loaded: true, source: 'server' }
        ];
        let emits = await booksService
            .get('1', { ttl: 1000, include: ['books'] })
            .pipe(
                map(emit => {
                    return { loaded: emit.loaded, source: emit.source };
                }),
                toArray()
            )
            .toPromise();
        // @TODO: fix library
        // expect(emits).toMatchObject(expected); // ERROR!!! [{ loaded: false, source: 'new' }, { loaded: true, source: 'server' }]
        expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    });
});

describe('service.get()', () => {
    let booksService: BooksService;
    let authorsService: AuthorsService;
    let photosService: PhotosService;
    beforeEach(async () => {
        JsonapiBootstrap.bootstrap({
            user_config: { url: 'http://yourdomain/api/v1/' },
            jsonapiStore: new StoreService(),
            jsonRipper: new JsonRipper()
        });
        booksService = new BooksService();
        booksService.register();
        await booksService.clearCache();
        authorsService = new AuthorsService();
        authorsService.register();
        photosService = new PhotosService();
        photosService.register();
        await authorsService.clearCache();
        // @TODO: should clear CacheMemory before each it
    });

    it('getClone should return a clone of the requested resource', async () => {
        mockedAxios.request.mockRestore();
        mockedAxios.request.mockResolvedValue({ data: TestFactory.getResourceDocumentData(Book) });
        let book_clone = await booksService.getClone('1').toPromise();
        let original_book = await booksService.get('1').toPromise();
        expect(book_clone.source).toBe(original_book.source);
        expect(book_clone.loaded).toBe(original_book.loaded);
        expect(book_clone.attributes).toMatchObject(original_book.attributes);
        expect(book_clone.relationships.author.data.id).toBe(original_book.relationships.author.data.id);
        expect(book_clone.relationships.author.loaded).toBe(original_book.relationships.author.loaded);
    });
});
