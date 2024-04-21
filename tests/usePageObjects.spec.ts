import { test, expect } from "@playwright/test";
import { NavigationPage } from "../PageObjects/navigationPage";


test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Navigate to the page @smoke", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formlayouts();
});
