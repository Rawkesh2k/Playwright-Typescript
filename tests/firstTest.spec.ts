import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  (await page.$('//a[@title="Forms"]')).click();
  await page.getByText("Form Layouts").click();
});

test("Navigate to Form Layouts Page", async ({ page }) => {
  await page.getByText("Form Layouts").click();
});

test("Navigate to Date Picker Page", async ({ page }) => {
  await page.getByText("Datepicker").click();
});

test("Locator Syntax Rules", async ({ page }) => {
  //By tage name
  page.locator("input");

  //By ID
  page.locator("#inputEmail");

  //By Class Value
  page.locator(".shape-rectangle");

  //By Attribute
  page.locator('[placeholder="Email"]');

  //By Full Class Value
  page.locator('[class="input-f=ull-with-values"]');

  //By Xpath - Not recommended

  //By partial text match
  page.locator(':text("Using")');

  //By exact text match
  page.locator(':text-is("Using the grid")');
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.waitForTimeout(3000);
  (await page.$(".custom-checkbox")).click();
  await page.waitForTimeout(3000);
  (await page.$(".custom-checkbox")).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByLabel("");
});

test("Locating child elements", async ({ page }) => {
  //privide a space bewteen parent and child element and we're good to go
  //await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  //or we can write the above piece of code in the below way too - locator chaining
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.waitForTimeout(1000);
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 1")')
    .click();
  await page.waitForTimeout(1000);
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  //locating with indexes is not preferred
  await page.locator("nb-card").nth(4).locator(':text-is("Option 2")').click();
});

test("Locating Parent Elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page.waitForTimeout(1000);
  //we can actually filter number of similar elements in order to reach a particular element as below
  //await page.locator("#inputEmail3").fill("testValueFilling");
  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing locators", async ({ page }) => {
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const emailField =basicForm.getByRole("textbox", { name: "Email" })
  await emailField
    .fill("testEmail@org.au");

  await page.waitForTimeout(1000);
  await basicForm
    .getByRole("textbox", { name: "Password" })
    .fill("testPassword@123");

  await page.waitForTimeout(1000);
  await basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue('testEmail@org.au')
});

test('Extracting values',async({page})=>{

  //single test value
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all or set of text values
  const allRadioButtoonLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtoonLabels).toContain('Option 4')

})
