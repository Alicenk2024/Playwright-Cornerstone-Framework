import { expect, type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class CheckoutPage {
  readonly page: Page;

  readonly customer: {
    emailInput: Locator;
    continueBtn: Locator;
    subscribeToggle: Locator;
    privacyPolicyToggle: Locator;
    signInNowLink: Locator;
  };

  readonly shippingAddressForm: {
    countryDropDown: Locator;
    firstName: Locator;
    lastName: Locator;
    address: Locator;
    apartmentNumber: Locator;
    companyName: Locator;
    city: Locator;
    state: Locator;
    postalCode: Locator;
    phoneNumber: Locator;
    continueBtn: Locator;
  };

  readonly paymentForm: {
    creditCardNumber: Locator;
    expiration: Locator;
    nameOnCard: Locator;
    cvv: Locator;
    placeOrderBtn: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.customer = {
      emailInput: page.locator("#email"),
      continueBtn: page.locator(
        '[data-test="customer-continue-as-guest-button"]'
      ),
      subscribeToggle: page.locator('[for="shouldSubscribe"]'),
      privacyPolicyToggle: page.locator('[for="privacyPolicy"]'),
      signInNowLink: page.locator(""),
    };

    this.shippingAddressForm = {
      countryDropDown: page.locator("#countryCodeInput"),
      firstName: page.locator('[data-test="firstNameInput-text"]'),
      lastName: page.locator('[data-test="lastNameInput-text"]'),
      address: page.locator('[data-test="addressLine1Input-text"]'),
      apartmentNumber: page.locator('[data-test="addressLine2Input-text"]'),
      companyName: page.locator('[data-test="companyInput-text"]'),
      city: page.locator('[data-test="cityInput-text"]'),
      state: page.locator('[data-test="provinceInput-text"]'),
      postalCode: page.locator('[data-test="postCodeInput-text"]'),
      phoneNumber: page.locator('[data-test="phoneInput-text"]'),
      continueBtn: page.locator("#checkout-shipping-continue"),
    };

    this.paymentForm = {
      creditCardNumber: page.locator("#ccNumber"),
      expiration: page.locator("#ccExpiry"),
      nameOnCard: page.locator("#ccName"),
      cvv: page.locator("#ccCvv"),
      placeOrderBtn: page.locator("#checkout-payment-continue"),
    };
  }

  /**
   * A function that completes the customer form with a randomly generated email
   * using faker.js
   */
  async completeCustomerForm() {
    const randomEmail = faker.internet.email({ firstName: "Alicenk" });
    await this.customer.emailInput.fill(randomEmail);
    await this.customer.privacyPolicyToggle.click();
    await this.customer.continueBtn.click();
  }

  /**
   * A function that completes the shipping address form (mandatory fields ONLY)
   */
  async completeShippingDetails(country: string) {
    await this.shippingAddressForm.countryDropDown.selectOption(country);
    await this.shippingAddressForm.firstName.fill("Ali");
    await this.shippingAddressForm.lastName.fill("Demir");
    await this.shippingAddressForm.address.fill("53 Victoria Park Road");
    await this.shippingAddressForm.city.fill("London");
    await this.shippingAddressForm.postalCode.fill("E7 8UG");
    await this.shippingAddressForm.phoneNumber.fill("07780191827");
    await this.shippingAddressForm.continueBtn.click();
  }

  /**
   * A function that completes the payment details form
   */
  async completePaymentDetails() {
    await this.paymentForm.creditCardNumber.fill("4111 1111 1111 1111");
    await this.paymentForm.expiration.fill("12/24");
    await this.paymentForm.nameOnCard.fill("A Demir");
    await this.paymentForm.cvv.fill("737");
    await this.paymentForm.placeOrderBtn.click();
  }
}
