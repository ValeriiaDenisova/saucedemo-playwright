import { expect, Page } from "@playwright/test";
import { BasePage } from "./basePages/BasePage";

export class CartPage extends BasePage {

    readonly checkOutButton = this.page.locator('[data-test="checkout"]');

    private async getRemoveButtonByTitle(itemName: string) {
        return "#remove-" + itemName.toLowerCase().replace(/\s+/g, '-');
    }

    async removeFromCartByTitle(itemName: string) {
        const removeButton = await this.getRemoveButtonByTitle(itemName);
        await this.page.locator(removeButton).click();
    }

    async getPriceByTitle(itemName: string) {
        const priceLocator = this.page.locator(`//*[text()='${itemName}']/ancestor::div[@class='cart_item']//div[@class='inventory_item_price']`);
        return priceLocator.textContent();
    }

    async verifyPriceByTitle(itemName: string, expectedPrice: string | null) {
        expect(expectedPrice).not.toBeNull();

        const actualPrice = await this.getPriceByTitle(itemName);
        expect(actualPrice).toBe(expectedPrice);
    }

    async checkout() {
        await this.checkOutButton.click();
    }



}