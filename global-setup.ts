import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://demo.learnwebdriverio.com/');

    const user = {
        email: 'valera@gm.com',
        password: '123456'
    };

    await page.locator("[href='/login']").click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
    await page.getByRole('button', { name: 'Sign in' }).first().click();
    await page.waitForTimeout(3000);

    // Save storage state
    await page.context().storageState({ path: 'storageState.json' });

    await browser.close();
}

export default globalSetup;