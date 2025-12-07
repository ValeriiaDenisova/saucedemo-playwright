import { test } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/LoginPage';
import { InventoryPage } from '../../../pageObjects/InventoryPage';
import { CartPage } from '../../../pageObjects/CartPage';
import { CheckoutStepOnePage } from '../../../pageObjects/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../../pageObjects/CheckoutStepTwoPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
});


test('TC-1 Successful Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  await loginPage.login(user);
  await inventoryPage.verifyInventoryPageIsDisplayed();
});


test('TC-2 Unsuccessful Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const user = {
    username: 'invalid_user',
    password: 'invalid_password'
  };
  await loginPage.login(user);
  await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
});


test('TC-3 Add Product to Cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  await loginPage.login(user);
  await inventoryPage.verifyPriceByTitle('Sauce Labs Backpack', '$29.99');

  await inventoryPage.addToCartByTitle('Sauce Labs Backpack');
  await inventoryPage.verifyNumberOfAddedItems(1);

  await inventoryPage.clickCartButton();
  await inventoryPage.verifyNumberOfAddedItems(1);
});


test('TC-4 Checkout Process', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  await loginPage.login(user);
  await inventoryPage.verifyPriceByTitle('Sauce Labs Bike Light', '$9.99');

  await inventoryPage.addToCartByTitle('Sauce Labs Bike Light');
  await inventoryPage.verifyNumberOfAddedItems(1);

  await inventoryPage.clickCartButton();
  await cartPage.checkout();

  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinueButton();

  await checkoutStepTwoPage.verifyCheckoutPage();
});


test('TC-5 Logout Functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  await loginPage.login(user);
  await loginPage.logout();

  await loginPage.verifyLoginPageIsDisplayed();
});


test('TC-6 Remove item from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  await loginPage.login(user);
  await inventoryPage.addToCartByTitle('Sauce Labs Backpack');
  await inventoryPage.removeFromCartByTitle('Sauce Labs Backpack');

});
