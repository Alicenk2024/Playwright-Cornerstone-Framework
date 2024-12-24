import { expect, type Locator, type Page } from "@playwright/test";

export class PLP {
  readonly itemCard: Locator;

  constructor(page: Page) {
    this.itemCard = page.locator(".card-image");
  }
}

//Inside the PLP Class, we always have a constructor body with our selectors and
//functions outside of the constructor
