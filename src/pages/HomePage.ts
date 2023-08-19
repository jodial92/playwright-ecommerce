import { Locator, Page } from '@playwright/test';

export default class HomePage {
    readonly page: Page;
    
    readonly searchBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator("[id='twotabsearchtextbox']");
    }

    async searchProduct(searchTerm: string) {
        await this.searchBar.fill(searchTerm);
        await this.searchBar.press('Enter');
    }
}
