import { Document } from './document';

describe('document', () => {
    it('should be can created', () => {
        let document = new Document();
        expect(document.builded).toBe(false);
    });
});
