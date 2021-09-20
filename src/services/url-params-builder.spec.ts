import { UrlParamsBuilder } from './url-params-builder';

describe('UrlParamsBuilder', () => {
    let urlparamsbuilder: UrlParamsBuilder = new UrlParamsBuilder();

    it('toparamsarray(complex_object) should be converted to uri params string', () => {
        let params: any = {
            param1: {
                modif1: 'foo',
                modif2: true
            },
            param2: 'bar'
        };
        expect(urlparamsbuilder.toparams(params)).toBe('param1[modif1]=foo&param1[modif2]=true&param2=bar');
    });
});
