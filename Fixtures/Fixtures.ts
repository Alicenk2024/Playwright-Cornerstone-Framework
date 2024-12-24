import { test as base } from "@playwright/test";

import { PLP, CheckoutPage } from "./index";

type CustomFixtures = {
  // Cornerstone Pages
  PLP: PLP;
  CheckoutPage: CheckoutPage;
};

export const test = base.extend<CustomFixtures>({
  PLP: async ({ page }, use) => {
    await use(new PLP(page));
  },
  CheckoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});
export { expect } from "@playwright/test";
