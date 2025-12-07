import { test, expect } from "@playwright/test";

test("Zara. Get and update cookies", async ({ page, context }) => {
    await page.goto("https://www.zara.com/es/en/");
    await page.getByRole("button", { name: "Accept All Cookies" }).click();
    await page.getByRole("button", { name: "Yes, continue on Spain" }).click();


    await context.addCookies([
        {
            name: "test",
            value: "125151",
            domain: ".zara.com",
            path: "/",
        },
    ]);

    const cookiesBeforeModification = await context.cookies();

    const newCookies = cookiesBeforeModification.map((cookies) => {
        if (cookies.name === "test") {
            cookies.value = "changed";
        }

        return cookies;
    });

    await context.clearCookies();
    await context.addCookies(newCookies);

    const cookiesAfterModification = await context.cookies();

    expect(
        cookiesBeforeModification.filter((cookies) => cookies.name === "test")
    ).toBeTruthy();
});
