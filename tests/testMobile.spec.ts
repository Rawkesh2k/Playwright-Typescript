import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.only("Input Fields", async ({ page }, testinfo) => {
  if (testinfo.project.name == "mobile") {
    (await page.locator(".sidebar-toggle")).click();
  }
  (await page.$('//a[@title="Forms"]')).click();
  await page.getByText("Form Layouts").click();
  if (testinfo.project.name == "mobile") {
    (await page.locator(".sidebar-toggle")).click();
  }
  const usingGridEmailInput = page.locator("#inputEmail1");
  const randomEmail = faker.internet.exampleEmail();
  await page.waitForTimeout(1000);
  await usingGridEmailInput.fill("brotest@test.com");
  await page.waitForTimeout(1000);
  await usingGridEmailInput.fill(randomEmail);
  //taking screenshots for debugging purposes
  await page.screenshot({ path: "screenshots/formsLayoutsPage.png" });
  //for taking screenshot of a specific locator
  await page
    .locator("#inputEmail1")
    .screenshot({ path: "screenshots/locatorSpecificSS.png" });
  await page.waitForTimeout(1000);
  await usingGridEmailInput.clear();
  await page.waitForTimeout(1000);
  await usingGridEmailInput.fill("brotest@test.com");
  await page.waitForTimeout(1000);
  await usingGridEmailInput.fill(randomEmail);
  await page.waitForTimeout(1000);
});
