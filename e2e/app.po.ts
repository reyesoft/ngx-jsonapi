import { browser, element, by } from 'protractor';

export class ExampleAppPage {
    public async navigateTo() {
        return browser.get('/');
    }

    public async  getAppDescription() {
        return element(by.css('mat-toolbar-row')).getText();
    }
}
