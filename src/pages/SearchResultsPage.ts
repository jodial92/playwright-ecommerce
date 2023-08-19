import { Locator, Page } from '@playwright/test';

export default class SearchResultsPage {
    readonly page: Page;

    readonly selectedItem: Locator;
    readonly selectedItemWholePrice: Locator;
    readonly selectedItemName: Locator;

    constructor(page: Page) {
      this.page = page;
      this.selectedItem = page.locator("[data-cel-widget='search_result_3']");
      this.selectedItemWholePrice = this.selectedItem.locator("span[class='a-offscreen']").first();
      this.selectedItemName = this.selectedItem.locator("span[class='a-size-base-plus a-color-base a-text-normal']");
    }

    async selectItem() {
      await this.selectedItem.click();
    }

    async getSelectedItemWholePrice() {
      let wholePriceResultsPage;
      let trimed = "0";

      wholePriceResultsPage = await this.selectedItemWholePrice.textContent();

      if (wholePriceResultsPage !== null) {
        trimed = wholePriceResultsPage.toString();
        trimed = trimed.substring(1);
      }

      return trimed;
    }

    async getSelectedItemName() {
      let itemNameResultsPage;
      let trimed = "NA";

      itemNameResultsPage = await this.selectedItemName.textContent();

      if (itemNameResultsPage !== null) {
        trimed = itemNameResultsPage.toString();
      }

      return trimed;
    }
}
