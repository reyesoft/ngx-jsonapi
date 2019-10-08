import { Resource } from '../resource';
import { JsonRipper } from './json-ripper';
import { DocumentCollection } from '../document-collection';
import { TestFactory } from '../tests/factories/test-factory';

// describe('JsonRipper for resources', () => {
//     let book = TestFactory.getBook('5');
//     book.attributes.title = 'Fahrenheit 451';
//     book.addRelationship(TestFactory.getAuthor('2'), 'author');
//     // @todo maxi: factory dont work?
//     // book.addRelationship(TestFactory.getPhoto('2'));
//     // book.addRelationship(TestFactory.getPhoto('1'));
//
//     it('A resource is converted to objects for a DataProvider', () => {
//         let mocked_service_data: { [key: string]: any } = { parseToServer: false };
//         spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
//
//         let obj = JsonRipper.toResourceElements('some.key', book);
//         expect(obj.length).toBe(1);
//         expect(obj[0].key).toBe('some.key');
//         expect(obj[0].content.data).toMatchObject({
//             attributes: { title: 'Fahrenheit 451' },
//             id: '5',
//             type: 'books',
//             relationships: {
//                 author: {
//                     data: { id: '2', type: 'authors' }
//                 }
//             }
//         });
//
//         // hasManyRelationships
//         // expect(obj[2].content.data.relationships.books.data.length).toBe(2);
//         // expect(Object.keys(obj[2].content.data.relationships.books.data[0]).length).toBe(2); // id and type
//     });
//
//     it('A resource with include is converted to objects for a DataProvider', () => {
//         let mocked_service_data: { [key: string]: any } = { parseToServer: false };
//         spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
//
//         let obj = JsonRipper.toResourceElements('some.key', book, ['author']);
//         expect(obj.length).toBe(2);
//         expect(obj[0].key).toBe('some.key');
//         expect(obj[1].content.data).toMatchObject({
//             id: '2',
//             type: 'authors',
//             attributes: {
//                 name: /.+/
//             },
//             relationships: {}
//         });
//     });
//
//     it('A ripped resource saved via DataProvider is converted to a Json', async done => {
//         let mocked_service_data: { [key: string]: any } = { parseToServer: false };
//         spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
//
//         let jsonRipper = new JsonRipper();
//         await jsonRipper.saveResource(book);
//         let json = await jsonRipper.getResource(JsonRipper.getResourceKey(book));
//         expect(json.data).toMatchObject({
//             attributes: { title: /.+/ },
//             id: '5',
//             type: 'books',
//             relationships: {
//                 author: {
//                     data: { id: /.+/, type: 'authors' }
//                 }
//             }
//         });
//
//         done();
//     }, 500);
//
//     it('A ripped resource maintain cache_last_update property', async () => {
//         let mocked_service_data: { [key: string]: any } = { parseToServer: false };
//         spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
//
//         let jsonRipper = new JsonRipper();
//         await jsonRipper.saveResource(book);
//         let json = await jsonRipper.getResource(JsonRipper.getResourceKey(book));
//         expect(json.data.cache_last_update).toBeGreaterThanOrEqual(Date.now() - 100);
//     });
//
//     it('A ripped resource with include saved via DataProvider is converted to a Json', async done => {
//         let mocked_service_data: { [key: string]: any } = { parseToServer: false };
//         spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
//
//         let jsonRipper = new JsonRipper();
//         await jsonRipper.saveResource(book, ['author']);
//         let json = await jsonRipper.getResource(JsonRipper.getResourceKey(book), ['author']);
//         expect(json.included.length).toEqual(1);
//         expect(json.included[0]).toMatchObject({
//             id: '2',
//             type: 'authors',
//             attributes: {},
//             relationships: {}
//         });
//
//         done();
//     }, 500);
//
//     it('A ripped resource with hasOne = null saved via DataProvider is converted to a Json', async () => {
//         let mocked_service_data: { [key: string]: any } = { parseToServer: false };
//         spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);
//
//         let jsonRipper = new JsonRipper();
//         book.relationships.author.data = null;
//         await jsonRipper.saveResource(book, ['author']);
//         let json = await jsonRipper.getResource(JsonRipper.getResourceKey(book), ['author']);
//         expect(json.included.length).toEqual(0);
//         expect(json.data.relationships.author.data).toEqual(null);
//         // expect(json.included[0]).toMatchObject({
//         //     id: '2',
//         //     type: 'authors',
//         //     attributes: {},
//         //     relationships: {}
//         // });
//     });
//
//     it('Requesting DataProvider not cached resource thrown an error', done => {
//         let jsonRipper = new JsonRipper();
//         jsonRipper
//             .getResource('extrange_type.id')
//             .then()
//             .catch(data => {
//                 done();
//             });
//     }, 50);
// });

describe('JsonRipper for collections', () => {
    let authors = new DocumentCollection();
    // TODO: remove books include in next line when toObject gets fixed (call jsonripper in non provided service)
    authors.data.push(TestFactory.getAuthor('2', ['books']));
    let author1 = TestFactory.getAuthor('1', ['books']);
    author1.attributes.name = 'Ray Bradbury';
    authors.data.push(author1);
    author1.relationships.books.data[0].id = '1';
    author1.relationships.books.data[1].id = '2';
    let book1 = author1.relationships.books.data[0];
    book1.addRelationship(author1, 'author');
    console.log(author1.relationships.books.data[1]);

    /* Is private now
    it('A collection is converted to objects for a DataProvider', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let obj = JsonRipper.collectionToElement('some/url', authors);
        expect(obj.length).toBe(3);
        expect(obj[0].key).toBe('some/url');
        expect(obj[0].content.keys).toMatchObject(['authors.2', 'authors.1']); // unsorted resources is intentional
        expect(obj[2].content.data).toMatchObject({
            attributes: { name: 'Ray Bradbury' },
            id: '1',
            type: 'authors',
            relationships: {
                books: {
                    data: [{ id: '1', type: 'books' }, { id: '2', type: 'books' }]
                }
            }
        });

        // hasManyRelationships
        expect(obj[2].content.data.relationships.books.data.length).toBe(2);
        expect(Object.keys(obj[2].content.data.relationships.books.data[0]).length).toBe(2); // id and type
    });

    it('A collection with include is converted to objects for a DataProvider', () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let obj = JsonRipper.collectionToElement('some/url/include', authors, ['books']);
        expect(obj.length).toBe(5);
        expect(obj[0].key).toBe('some/url/include');
        expect(obj[0].content.keys).toMatchObject(['authors.2', 'authors.1']);
        expect(obj[4].content.data).toMatchObject({
            id: '2',
            type: 'books',
            attributes: {},
            relationships: {}
        });
    });
    */

    it('A ripped collection saved via DataProvider is converted to a Json', async done => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let jsonRipper = new JsonRipper();
        jsonRipper.saveCollection('some/url', authors);

        let json = await jsonRipper.getCollection('some/url');
        expect(json.data.length).toEqual(2);
        expect(json.data[1]).toMatchObject({
            attributes: { name: 'Ray Bradbury' },
            id: '1',
            type: 'authors',
            relationships: {
                books: {
                    data: [{ id: '1', type: 'books' }, { id: '2', type: 'books' }]
                }
            }
        });

        done();
    });

    it('A ripped collection maintain cache_last_update property', async () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let jsonRipper = new JsonRipper();
        jsonRipper.saveCollection('some/url', authors);
        let json = await jsonRipper.getCollection('some/url');
        expect(json.cache_last_update).toBeGreaterThanOrEqual(Date.now() - 100);
    });

    it('A ripped collection with include saved via DataProvider is converted to a Json', async () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let jsonRipper = new JsonRipper();
        jsonRipper.saveCollection('some/url/include', authors, ['books']);

        let json = await jsonRipper.getCollection('some/url/include', ['books']);
        expect(json.data.length).toEqual(2);
        expect(json.included.length).toEqual(4); // @TODO: equal to 2 when books include is removed in describe's first getAuthor

        // @TODO: change to json.included[0] when books include is removed in describe's first getAuthor
        expect(json.included[2]).toMatchObject({
            id: '1',
            type: 'books',
            attributes: {},
            relationships: {
                author: {
                    data: { id: '1', type: 'authors' }
                }
            }
        });
    });

    it('A ripped collection returns _lastupdate_time on collection and resources property', async () => {
        spyOn(Resource.prototype, 'getService').and.returnValue({});

        let jsonRipper = new JsonRipper();
        jsonRipper.saveCollection('some/url/include', authors, ['books']);

        let json = await jsonRipper.getCollection('some/url/include', ['books']);
        expect(json.cache_last_update).toBeGreaterThan(0);

        // collection.fill responsability to fill, but ripper need to comunicate last update
        expect(json.data[1].cache_last_update).toBeGreaterThan(0);
    }, 50);

    it('Requesting a DataProvider not cached collection thrown an error', async done => {
        let jsonRipper = new JsonRipper();
        jsonRipper
            .getCollection('some/bad/url')
            .then()
            .catch(data => {
                done();
            });
    });
});
