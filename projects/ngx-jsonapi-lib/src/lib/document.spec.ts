import { Document } from './document';

describe('document', () => {
    it('should be created', () => {
        let document: Document = new Document();
        expect(document.builded).toBe(false);
        expect(document.loaded).toBeFalsy();
    });
});
