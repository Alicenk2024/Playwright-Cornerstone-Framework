import { test, expect } from "../../Fixtures/Fixtures";

test("Maximum of 12 Items for a PLP", async ({ page, PLP }) => {
  // GIVEN: I navigate to Cornerstone's homepage.
  await page.goto("https://cornerstone-light-demo.mybigcommerce.com/");

  // WHEN: I navigate to a PLP with multiple pages.
  await page.locator(".navPages").getByText("Shop All").click();

  // THEN: There should be a maximum of 12 items on the first page
  expect(await PLP.itemCard.count()).toBeGreaterThanOrEqual(0);
  expect(await PLP.itemCard.count()).toBeLessThanOrEqual(12);

  // AND: Pagination is visible
  await expect(page.locator(".pagination-list")).toBeVisible();
});

// Product Listing Page (PLP) is a category page displaying all items for that category
// Prodcut Display Page (PDP) is the page you see when you click on a specific item
