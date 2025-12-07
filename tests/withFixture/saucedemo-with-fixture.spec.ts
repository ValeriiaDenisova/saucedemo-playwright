import { test } from "./../../fixtures/base-fixture";
import { LoginPage } from '../../pageObjects/LoginPage';
import { InventoryPage } from '../../pageObjects/InventoryPage';
import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutStepOnePage } from '../../pageObjects/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pageObjects/CheckoutStepTwoPage';

// test.beforeEach(async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.navigate();
// });

test.describe('Positive tests with Fixture', () => {
  test.use({ username: "standard_user" });

  test('TC-1 Successful Login test', async ({ inventoryPage }) => {
    await inventoryPage.verifyInventoryPageIsDisplayed();
  });


  test('TC-2 Add Product to Cart', async ({ inventoryPage }) => {
    await inventoryPage.verifyPriceByTitle('Sauce Labs Backpack', '$29.99');

    await inventoryPage.addToCartByTitle('Sauce Labs Backpack');
    await inventoryPage.verifyNumberOfAddedItems(1);

    await inventoryPage.clickCartButton();
    await inventoryPage.verifyNumberOfAddedItems(1);
  });


  test('TC-3 Checkout Process', async ({ inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {

    await inventoryPage.verifyPriceByTitle('Sauce Labs Bike Light', '$9.99');

    await inventoryPage.addToCartByTitle('Sauce Labs Bike Light');
    await inventoryPage.verifyNumberOfAddedItems(1);

    await inventoryPage.clickCartButton();
    await cartPage.checkout();

    await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.clickContinueButton();

    await checkoutStepTwoPage.verifyCheckoutPage();
  });


  test('TC-4 Remove item from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    //  await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCartByTitle('Sauce Labs Backpack');
    await inventoryPage.removeFromCartByTitle('Sauce Labs Backpack');

  });
});


test.describe('Negative tests with Fixture', () => {
  test.use({ username: "invalid_user" });

  test('TC-5 Unsuccessful Login test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
});
