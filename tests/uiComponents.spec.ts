import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    (await page.$('//a[@title="Forms"]')).click();
    await page.getByText("Form Layouts").click();
  });
  test("Input Fields", async ({ page }) => {
    const usingGridEmailInput = page.locator("#inputEmail1");

    await page.waitForTimeout(2000);
    await usingGridEmailInput.fill("brotest@test.com");
    await usingGridEmailInput.fill("brotest@test.com");
    await page.waitForTimeout(2000);
    await usingGridEmailInput.clear();
    await page.waitForTimeout(2000);
    await usingGridEmailInput.pressSequentially("test@test.com", {
      delay: 500,
    });
    await usingGridEmailInput.pressSequentially("test@test.com", {
      delay: 500,
    });
  });

  test("Handling Radio Buttons", async ({ page }) => {
    const usingTheGrid = page.locator("nb-card", { hasText: "Using the Grid" });
    //await usingTheGrid.getByLabel("Option 1").check({ force: true });
    //await usingTheGrid.getByLabel("Option 1").check({ force: true });
    await page.locator('//span[normalize-space()="Option 1"]').click();
    await page.locator('//span[normalize-space()="Option 1"]').click();
    expect(
      await page.locator('//span[normalize-space()="Option 1"]')
    ).toBeChecked();
    await page.locator('//span[normalize-space()="Option 2"]').click();
    await page.locator('//span[normalize-space()="Option 2"]').click();
    expect(
      await usingTheGrid.getByRole("radio", { name: "Option 2" }).isChecked()
    ).toBeTruthy();
    expect(
      await page.locator('//span[normalize-space()="Option 1"]').isChecked
    ).toBeFalsy();
  });

  test("lists and dropdowns", async ({ page }) => {
    const dropdownMenu = page.locator("ngx-header nb-select");
    await dropdownMenu.click();
    page.getByRole("list");
    //const optionsList = page.getByRole('list').locator('nb-option')
    const optionsList = page.locator("nb-option-list nb-option");
    await expect(optionsList).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);
    await optionsList.filter({ hasText: "Cosmic" }).click();
    // await optionsList.filter({hasText:'Cosmic'}).click()

    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };
    await dropdownMenu.click();
    for (const color in colors) {
      await optionsList.filter({ hasText: color }).click();
      await expect(header).toHaveCSS("background-color", colors[color]);
      await dropdownMenu.click();
      await page.waitForTimeout(1500)
    }
  });
});
