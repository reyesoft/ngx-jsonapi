import { Base } from './base';

describe('Base', () => {
    let urlparamsbuilder = new Base();

    it('isObjectLive() should be return false', () => {
        expect(
            Base.isObjectLive(300, Date.now())
        ).toBe(true)
        expect(
            Base.isObjectLive(300, Date.now() - 400 * 1000)
        ).toBe(false)
    });
});
