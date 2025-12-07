import { test as base } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { CartPage } from "../pageObjects/CartPage";
import { CheckoutStepOnePage } from "../pageObjects/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pageObjects/CheckoutStepTwoPage";
import { InventoryPage } from "../pageObjects/InventoryPage";

type MyFixture = {
    username: string | undefined;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    inventoryPage: InventoryPage;
    loginPage: LoginPage;
    before: void;
    after: void;
    token: string;
};

export const test = base.extend<MyFixture>({
    username: undefined,
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);

        await use(cartPage);
    },
    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);

        await use(checkoutStepOnePage);
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

        await use(checkoutStepTwoPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);

        await use(inventoryPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },

    // token: async ({ }, use) => {
    //     const tokens = {
    //         access_token: "testasasfkmasko[mnfg",
    //         refresh_token: "asfasfasfasfasf",
    //         expiration: 900,
    //     };

    //     await use(tokens.access_token);
    // },

    before: [
        async ({ loginPage, username }, use) => {
            await loginPage.navigate();
            await loginPage.login({
                username: username!,
                password: "secret_sauce",
            });

            await use();
        },
        { auto: true, title: "executing before test are finished" },
    ],

    after: [
        async ({ loginPage }, use) => {
            await use();

            try {
                console.log("test");
                await loginPage.logoutIfPossible();
            } catch (error) {
                console.log("Logout failed:", error);
            }
        },
        { auto: true, title: "executing after test are finished" },
    ],
});
