import { expect } from "@playwright/test";
import { BasePage } from "./basePages/BasePage";

export class CheckoutStepTwoPage extends BasePage {

    readonly finishButton = this.page.locator('[data-test="finish"]');
    readonly paymentInformation = this.page.getByText('Payment Information:');
    readonly shippingInformation = this.page.getByText('Shipping Information:');
    readonly totalAmount = this.page.getByText('Price Total');

    async verifyCheckoutPage() {
        await expect(this.paymentInformation).toBeVisible();
        await expect(this.shippingInformation).toBeVisible();
        await expect(this.totalAmount).toBeVisible();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}