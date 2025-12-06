import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePages/BasePage";

export class InventoryPage extends BasePage {

    readonly cartButton: Locator = this.page.locator('[data-test="shopping-cart-link"]');
    readonly productsTitle: Locator = this.page.locator('.title');

    private async getRemoveButtonByTitle(itemName: string) {
        return "#remove-" + itemName.toLowerCase().replace(/\s+/g, '-');
    }

    private async getAddButtonByTitle(itemName: string) {
        return "#add-to-cart-" + itemName.toLowerCase().replace(/\s+/g, '-');
    }

    async addToCartByTitle(itemName: string) {
        const addButton = await this.getAddButtonByTitle(itemName);
        await this.page.locator(addButton).click();
    }

    async verifyInventoryPageIsDisplayed() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.productsTitle).toHaveText('Products');
    }

    async removeFromCartByTitle(itemName: string) {
        const removeButton = await this.getRemoveButtonByTitle(itemName);
        await this.page.locator(removeButton).click();
    }

    async getPriceByTitle(itemName: string) {
        const priceLocator = this.page.locator(`//*[text()='${itemName}']/ancestor::div[@data-test='inventory-item-description']//div[@class='inventory_item_price']`);
        return priceLocator.textContent();
    }

    async verifyPriceByTitle(itemName: string, expectedPrice: string) {
        const actualPrice = await this.getPriceByTitle(itemName);
        expect(actualPrice).toBe(expectedPrice);
    }

    async clickCartButton() {
        await this.cartButton.click();
    }



}