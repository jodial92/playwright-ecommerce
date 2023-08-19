import { test, expect, type Page } from '@playwright/test';
import HomePage from '../src/pages/HomePage';
import SearchResultsPage from '../src/pages/SearchResultsPage';
import ProductPage from '../src/pages/ProductPage';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const data = parse(fs.readFileSync(path.join(__dirname, '/data/products.csv')), {
    columns: true,
    skip_empty_lines: true
  });

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.amazon.com.mx');
});

test.describe('New Search', () => {

    for (const item of data) {
        test(`Should allow me to search for: ${item.product}`, async ({ page }) => {
            const homePage = new HomePage(page);
            const searchResultsPage = new SearchResultsPage(page);
            const productPage = new ProductPage(page);
            let itemPrice;
            let itemName;
    
            await homePage.searchProduct(item.product);
            itemPrice = await searchResultsPage.getSelectedItemWholePrice();
            itemName = await searchResultsPage.getSelectedItemName();
            await searchResultsPage.selectItem();
            await productPage.validateProductInfo(itemPrice, itemName);
        });
    }
});
