import { Locator, Page, expect } from '@playwright/test';

export default class HomePage {
    readonly page: Page;

    readonly productWholePrice: Locator;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productWholePrice = page.locator("[id='corePriceDisplay_desktop_feature_div']")
            .locator("span[class='a-offscreen']").first();
        this.productName = page.locator("#productTitle");
    }

    async validateProductInfo(itemPrice: string, itemName: string) {
        await this.validateProductPrice(itemPrice);
        await this.validateProductName(itemName);
    }

    async validateProductPrice(itemPrice: string) {
        await expect(this.productWholePrice).toContainText(itemPrice)
    }

    async validateProductName(itemName: string) {
        await expect(this.productName).toContainText(itemName)
    }
}
