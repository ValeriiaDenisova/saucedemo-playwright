import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePages/BasePage";

export class LoginPage extends BasePage {

    readonly userNameInput: Locator = this.page.locator("#user-name");
    readonly passwordInput: Locator = this.page.locator("#password");
    readonly loginButton: Locator = this.page.locator("#login-button");
    readonly errorMessage: Locator = this.page.locator('[data-test="error"]');

    async login(user: { username: string, password: string }) {
        await this.fillUserName(user.username);
        await this.fillPassword(user.password);
        await this.clickLoginButton();
    }

    async fillUserName(userName: string) {
        await this.userNameInput.fill(userName);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

    async verifyLoginPageIsDisplayed() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
        await expect(this.userNameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}