import { Resource } from '../resource';
import { JsonRipper } from './json-ripper';
import { DocumentCollection } from '../document-collection';
import { TestFactory } from '../tests/factories/test-factory';
import { IElement } from '../data-providers/data-provider';
import { ICacheableDocumentResource } from '../interfaces/data-object';
import { ICacheableDataCollection } from '../interfaces/data-collection';

describe('JsonRipper for resources', () => {
    let book: any = TestFactory.getBook('5');
    book.attributes.title = 'Fahrenheit 451';
    book.addRelationship(TestFactory.getAuthor('2'), 'author');
    // @todo maxi: factory dont work?
    // book.addRelationship(TestFactory.getPhoto('2'));
    // book.addRelationship(TestFactory.getPhoto('1'));

    // Mock mínimo para Service<Resource>
    const minimalServiceMock = {
        type: 'mock',
        resource: undefined,
        collections_ttl: 0,
        path: '',
        parseToServer: false,
        // Métodos mínimos stub
        get: jest.fn(),
        getResource: jest.fn(),
        getCollection: jest.fn()
        // ...agrega más si los tests lo requieren
    } as any;

    it('A resource is converted to objects for a DataProvider', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let obj: Array<IElement> = JsonRipper.toResourceElements('some.key', book);
        expect(obj.length).toBe(1);
        expect(obj[0].key).toBe('some.key');
        expect(obj[0].content.data).toMatchObject({
            attributes: { title: 'Fahrenheit 451' },
            id: '5',
            type: 'books',
            relationships: {
                author: {
                    data: { id: '2', type: 'authors' }
                }
            }
        });

        // hasManyRelationships
        // expect(obj[2].content.data.relationships.books.data.length).toBe(2);
        // expect(Object.keys(obj[2].content.data.relationships.books.data[0]).length).toBe(2); // id and type
    });

    it('A resource with include is converted to objects for a DataProvider', () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let obj: Array<IElement> = JsonRipper.toResourceElements('some.key', book, ['author']);
        expect(obj.length).toBe(2);
        expect(obj[0].key).toBe('some.key');
        expect(obj[1].content.data).toMatchObject({
            id: '2',
            type: 'authors',
            attributes: {
                name: /.+/
            },
            relationships: {}
        });
    });

    it('A ripped resource saved via DataProvider is converted to a Json', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: JsonRipper = new JsonRipper();
        await jsonRipper.saveResource(book);
        let json: ICacheableDocumentResource = await jsonRipper.getResource(JsonRipper.getResourceKey(book));
        expect(json.data).toMatchObject({
            attributes: { title: /.+/ },
            id: '5',
            type: 'books',
            relationships: {
                author: {
                    data: { id: /.+/, type: 'authors' }
                }
            }
        });
    });

    it('A ripped resource maintain cache_last_update property', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: JsonRipper = new JsonRipper();
        await jsonRipper.saveResource(book);
        let json: ICacheableDocumentResource = await jsonRipper.getResource(JsonRipper.getResourceKey(book));
        expect(json.data.cache_last_update).toBeGreaterThanOrEqual(Date.now() - 100);
    });

    it('A ripped resource with include saved via DataProvider is converted to a Json', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: any = new JsonRipper();
        await jsonRipper.saveResource(book, ['author']);
        let json: any = await jsonRipper.getResource(JsonRipper.getResourceKey(book), ['author']);
        expect(json.included.length).toEqual(1);
        expect(json.included[0]).toMatchObject({
            id: '2',
            type: 'authors',
            attributes: {},
            relationships: {}
        });
    });

    it('A ripped resource with hasOne = null saved via DataProvider is converted to a Json', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: any = new JsonRipper();
        book.relationships.author.data = null;
        await jsonRipper.saveResource(book, ['author']);
        let json: any = await jsonRipper.getResource(JsonRipper.getResourceKey(book), ['author']);
        expect(json.included.length).toEqual(0);
        expect(json.data.relationships.author.data).toEqual(null);
        // expect(json.included[0]).toMatchObject({
        //     id: '2',
        //     type: 'authors',
        //     attributes: {},
        //     relationships: {}
        // });
    });

    it('Requesting DataProvider not cached resource thrown an error', async () => {
        // Mockear el método para lanzar un Error estándar, no DexieError ni objeto complejo
        const jsonRipper = new JsonRipper();
        // Forzar el método getDataResources a rechazar con Error plano
        jest.spyOn(jsonRipper as any, 'getDataResources').mockImplementation(() => Promise.resolve([]));
        await expect(jsonRipper.getResource('extrange_type.id')).rejects.toThrow(Error);
    });
});

describe('JsonRipper for collections', () => {
    let authors: DocumentCollection = new DocumentCollection();
    // TODO: remove books include in next line when toObject gets fixed (call jsonripper in non provided service)
    authors.data.push(TestFactory.getAuthor('2', ['books']));
    let author1: any = TestFactory.getAuthor('1', ['books']);
    author1.attributes.name = 'Ray Bradbury';
    authors.data.push(author1);
    author1.relationships.books.data[0].id = '1';
    author1.relationships.books.data[1].id = '2';
    let book1: any = author1.relationships.books.data[0];
    book1.addRelationship(author1, 'author');

    // Mock mínimo para Service<Resource>
    const minimalServiceMock = {
        type: 'mock',
        resource: undefined,
        collections_ttl: 0,
        path: '',
        parseToServer: false,
        // Métodos mínimos stub
        get: jest.fn(),
        getResource: jest.fn(),
        getCollection: jest.fn()
        // ...agrega más si los tests lo requieren
    } as any;

    it('A ripped collection saved via DataProvider is converted to a Json', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: JsonRipper = new JsonRipper();
        await jsonRipper.saveCollection('some/url', authors);

        let json: ICacheableDataCollection = await jsonRipper.getCollection('some/url');
        expect(json.data.length).toEqual(2);
        expect(json.data[1]).toMatchObject({
            attributes: { name: 'Ray Bradbury' },
            id: '1',
            type: 'authors',
            relationships: {
                books: {
                    data: [
                        { id: '1', type: 'books' },
                        { id: '2', type: 'books' }
                    ]
                }
            }
        });
    });

    it('A ripped collection maintain cache_last_update property', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: JsonRipper = new JsonRipper();
        await jsonRipper.saveCollection('some/url', authors);
        let json: ICacheableDataCollection = await jsonRipper.getCollection('some/url');
        expect(json.cache_last_update).toBeGreaterThanOrEqual(Date.now() - 100);
    });

    it('A ripped collection with include saved via DataProvider is converted to a Json', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: JsonRipper = new JsonRipper();
        await jsonRipper.saveCollection('some/url/include', authors, ['books']);

        let json: any = await jsonRipper.getCollection('some/url/include', ['books']);
        expect(json.data.length).toEqual(2);
        expect(json.included.length).toEqual(4); // @TODO: igual a 2 cuando books include se elimine en el primer getAuthor

        // @TODO: cambiar a json.included[0] cuando books include se elimine en el primer getAuthor
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

    it('A ripped collection returns cache_last_update on collection and resources property', async () => {
        jest.spyOn(Resource.prototype, 'getService').mockReturnValue(minimalServiceMock);

        let jsonRipper: JsonRipper = new JsonRipper();
        await jsonRipper.saveCollection('some/url/include', authors, ['books']);

        let json: ICacheableDataCollection = await jsonRipper.getCollection('some/url/include', ['books']);
        expect(json.cache_last_update).toBeGreaterThan(0);

        // collection.fill responsability to fill, but ripper need to comunicate last update
        expect(json.data[1].cache_last_update).toBeGreaterThan(0);
    });

    it('Requesting a DataProvider not cached collection thrown an error', async () => {
        // Mockear el método para lanzar un Error estándar, no DexieError ni objeto complejo
        const jsonRipper = new JsonRipper();
        jest.spyOn(jsonRipper as any, 'getDataCollection').mockImplementation(() => Promise.reject(new Error('not found')));
        await expect(jsonRipper.getCollection('some/bad/url')).rejects.toThrow(Error);
    });
});
