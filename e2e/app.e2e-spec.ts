import { ExampleAppPage } from './app.po';

describe('demo App', () => {
    let page: ExampleAppPage;

    beforeEach(() => {
        page = new ExampleAppPage();
    });

    it('should display the app title in the menu', () => {
        page.navigateTo();
        expect(page.getAppDescription()).toContain('Book Collection');
    });
});
