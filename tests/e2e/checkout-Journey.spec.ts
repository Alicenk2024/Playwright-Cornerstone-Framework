import { test, expect } from "../../Fixtures/Fixtures";

test("E2E Checkout", async ({ page, PLP, CheckoutPage }) => {
  // GIVEN: I navigate to Cornerstone's homepage.
  await page.goto("https://cornerstone-light-demo.mybigcommerce.com/");
  // WHEN: I search for "table"
  await page.locator("#quick-search-expand").click();
  await page.locator("#nav-quick-search").fill("table");
  await page.keyboard.press("Enter");

  // THEN: I click on the first item to basket and add to cart
  await page.locator(".card-figcaption-body").first().click();
  await page.locator('[data-button-type="add-cart"]').click();

  // AND: I click on Checkout button
  await page.getByText("Check out").click();

  // THEN: I fill in my Email, Shipping, Billing & Payment Details
  await CheckoutPage.completeCustomerForm();

  //Waits for all the network calls to execute and then timesout for 0.5 seconds after the last call
  await page.waitForLoadState("networkidle");

  await CheckoutPage.completeShippingDetails("Turkey");
  await CheckoutPage.completePaymentDetails();

  // AND: Assert(confirm) payment has gone through
  await expect(
    page.locator('[data-test="order-confirmation-heading"]')
  ).toHaveText("Thank you Ali!");
  await expect(
    page.locator('[data-test="order-confirmation-heading"]')
  ).toHaveText(/Ali/);
});
