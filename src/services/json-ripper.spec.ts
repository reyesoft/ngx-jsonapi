import { Dexie } from 'dexie';
import { Resource } from '../resource';
import { JsonRipper } from './json-ripper';
import { DocumentCollection } from '../document-collection';
import { TestFactory } from '../test-factory/test-factory';

describe('JsonRipper', () => {
    let authors = new DocumentCollection();
    authors.data.push(TestFactory.getAuthor('1'));
    let author2 = TestFactory.getAuthor('2');
    author2.attributes.name = 'Ray Bradbury';
    authors.data.push(author2);
    let book1 = TestFactory.getBook('1');
    book1.addRelationship(author2, 'author');
    author2.addRelationship(book1);
    author2.addRelationship(TestFactory.getBook('2'));

    it('A collection is converted to objects for a DataProvider', () => {
        let mocked_service_data: { [key: string]: any } = { parseToServer: false };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);

        let obj = JsonRipper.toElements('some/url', authors);
        expect(obj.length).toBe(3);
        expect(obj[0].key).toBe('some/url');
        expect(obj[0].data).toMatchObject(['authors.1', 'authors.2']);
        expect(obj[2].data.data).toMatchObject({
            attributes: { name: 'Ray Bradbury' },
            id: '2',
            type: 'authors',
            relationships: {
                books: {
                    data: [{ id: '1', type: 'books' }, { id: '2', type: 'books' }]
                }
            }
        });

        // hasManyRelationships
        expect(obj[2].data.data.relationships.books.data.length).toBe(2);
        expect(Object.keys(obj[2].data.data.relationships.books.data[0]).length).toBe(2); // id and type
    });

    it('A collection with include is converted to objects for a DataProvider', () => {
        let mocked_service_data: { [key: string]: any } = { parseToServer: false };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);

        let obj = JsonRipper.toElements('some/url/include', authors, ['books']);
        expect(obj.length).toBe(5);
        expect(obj[0].key).toBe('some/url/include');
        expect(obj[0].data).toMatchObject(['authors.1', 'authors.2']);
        expect(obj[4].data.data).toMatchObject({
            id: '2',
            type: 'books',
            attributes: {},
            relationships: {}
        });
    });

    it('A ripped collection saved via DataProvider is converted to a Json', done => {
        let mocked_service_data: { [key: string]: any } = { parseToServer: false };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);

        let jsonRipper = new JsonRipper();
        jsonRipper.saveCollection('some/url', authors);

        // read cached object
        jsonRipper.getCollection('some/url').then(json => {
            expect(json.data.length).toEqual(2);

            expect(json.data[1]).toMatchObject({
                attributes: { name: 'Ray Bradbury' },
                id: '2',
                type: 'authors',
                relationships: {
                    books: {
                        data: [{ id: '1', type: 'books' }, { id: '2', type: 'books' }]
                    }
                }
            });

            done();
        });
    }, 500);

    it('A ripped collection with include saved via DataProvider is converted to a Json', done => {
        let mocked_service_data: { [key: string]: any } = { parseToServer: false };
        spyOn(Resource.prototype, 'getService').and.returnValue(mocked_service_data);

        let jsonRipper = new JsonRipper();
        jsonRipper.saveCollection('some/url/include', authors, ['books']);

        // read cached object
        jsonRipper.getCollection('some/url/include', ['books']).then(json => {
            expect(json.data.length).toEqual(2);
            expect(json.included.length).toEqual(2);

            expect(json.included[1]).toMatchObject({
                id: '2',
                type: 'books',
                attributes: {},
                relationships: {
                    author: {
                        data: { id: /.+/, type: 'authors' }
                    }
                }
                // ,
                // relationships: {
                //     books: {
                //         data: [{ id: '1', type: 'aaa' }, { id: '2', type: 'aaa' } ]
                //     }
                // }
            });

            done();
        });
    }, 500);

    it('Requesting a DataProvider not cached collection thrown an error', done => {
        let jsonRipper = new JsonRipper();
        jsonRipper
            .getCollection('some/bad/url')
            .then()
            .catch(data => {
                done();
            });
    }, 500);
});
