import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly shoppingCartBadge: Locator;
    readonly burgerMenu: Locator;
    readonly logoutButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        this.burgerMenu = this.page.locator('#react-burger-menu-btn');
        this.logoutButton = this.page.locator('#logout_sidebar_link');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async logout() {
        this.clickBurgerMenu();
        this.clickLogoutButton();
    }

    async clickBurgerMenu() {
        await this.burgerMenu.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async verifyNumberOfAddedItems(expectedCount: number) {
        const actualCount = await this.shoppingCartBadge.innerText();
        expect(actualCount).toBe(expectedCount.toString());
    }
}