import { Locator } from "@playwright/test";
import { BasePage } from "./basePages/BasePage";

export class CheckoutStepOnePage extends BasePage {

    readonly firstNameInput: Locator = this.page.locator('[data-test="firstName"]');
    readonly lastNameInput: Locator = this.page.locator('[data-test="lastName"]');
    readonly zipCodeInput: Locator = this.page.locator('[data-test="postalCode"]');
    readonly continueButton: Locator = this.page.locator('[data-test="continue"]');

    async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}