import { expect, test } from "@playwright/test";

test.describe("Conduit. Storage State Test Suite", () => {

    test("Conduit. Verify user is logged in using storage state", async ({ page }) => {
        await page.goto('https://demo.learnwebdriverio.com/');
        // await page.locator("[href='/login']").click();
        // await page.getByRole('textbox', { name: 'Email' }).fill("valera@gm.com");
        // await page.getByRole('textbox', { name: 'Password' }).fill("123456");
        // await page.getByRole('button', { name: 'Sign in' }).click();

        await expect(page.getByText("A place to share your knowledge.")).toBeVisible();
    });
});