import { test } from "../../../fixtures/base-fixture";
import { users } from './../../../testData';


test.describe('Positive tests with Fixture', () => {
  test.use({ username: users.standard.username });

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


  test('TC-4 Remove item from cart', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByTitle('Sauce Labs Backpack');
    await inventoryPage.removeFromCartByTitle('Sauce Labs Backpack');

  });
});


test.describe('Negative tests with Fixture', () => {
  test.use({ username: users.invalid.username });

  test('TC-5 Unsuccessful Login test', async ({ loginPage }) => {
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
});
