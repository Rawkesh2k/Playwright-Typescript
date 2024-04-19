import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  //by providing the url in the config file,
  //we can provide / as below to access the URl
  await page.goto("/");
});

test.describe.only("Form Layouts Page", () => {
  test.describe.configure({ retries: 2 });
  //test.describe.configure({mode: 'serial'})
  // When set to 'serial', it means that the test suites will be executed one after another, in a sequential manner.
  //This mode ensures that each test suite starts only after the previous one has completed,
  //providing a clear and deterministic order of execution.
  //This can be useful in scenarios where tests have dependencies or require a specific setup/teardown sequence.
  test.beforeEach(async ({ page }) => {
    (await page.$('//a[@title="Forms"]')).click();
    await page.getByText("Form Layouts").click();
  });
  test.only("Input Fields", async ({ page }) => {
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
    // await usingGridEmailInput.pressSequentially("test@test.com", {
    //   delay: 500,
    // });
    // await usingGridEmailInput.pressSequentially("test@test.com", {
    //   delay: 500,
    // });
  });

  test("Handling Radio Buttons", async ({ page }) => {
    const usingTheGrid = page.locator("nb-card", { hasText: "Using the Grid" });
    //await usingTheGrid.getByLabel("Option 1").check({ force: true });
    //await usingTheGrid.getByLabel("Option 1").check({ force: true });
    await page.locator('//span[normalize-space()="Option 1"]').click();
    await page.locator('//span[normalize-space()="Option 1"]').click();
    page.screenshot({ path: "screenshots/formsLayoutsPage.png" });
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
      await page.waitForTimeout(1500);
    }
  });

  test("Handling tooltips", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();
    await page.getByText("Tooltip").click();
    const tooltipcard = page.locator("nb-card", {
      hasText: "Tooltip Placements",
    });
    await page.locator('//button[normalize-space()="Top"]').hover();
  });

  test("Dialog box", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();
    await page.waitForTimeout(1000);
    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });
    await page
      .getByRole("table")
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();
    await page.waitForTimeout(1000);

    await page.waitForTimeout(1000);
  });

  test("Web Tables", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();
    await page.waitForTimeout(1000);
    const targetRole = page.getByRole("row", { name: "twitter@outlook.com" });
    await page.waitForTimeout(1000);
    await targetRole.locator(".nb-edit").click();
    //await targetRole.locator(".nb-edit").click();
    await page.waitForTimeout(1000);
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.waitForTimeout(1000);
    await page.locator("input-editor").getByPlaceholder("Age").fill("26");
    await page.waitForTimeout(1000);
    await page.locator(".nb-checkmark").click();
    //await page.locator('.nb-checkmark').click()

    //test filtering of the table values

    const ages = ["20", "30", "40", "200"];
    for (let age of ages) {
      await page.locator("input-filter").getByPlaceholder("Age").clear();
      await page.waitForTimeout(1000);
      await page.locator("input-filter").getByPlaceholder("Age").fill(age);
      await page.waitForTimeout(1000);
      const rows = page.locator("tbody tr");
      for (let row of await rows.all()) {
        const cellValue = await row.locator("td").last().textContent();
        expect(cellValue).toEqual(age);
        if (age == "200") {
          expect(
            await page
              .getByRole("cell", { name: "No data found" })
              .textContent()
          ).toContain("No data found");
        } else {
          expect(cellValue).toEqual(age);
        }
      }
    }
  });

  test("sliders", async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.locator('//a[@title="IoT Dashboard"]').click();
    await page.waitForTimeout(1000);
    //Update Slider Attribute
    // const tempGauge = page.locator(
    //   '[tabtitle="Temperature"] ngx-temperature-dragger circle'
    // );
    // await tempGauge.evaluate((node) => {
    //   node.setAttribute("cx", "232.630");
    //   node.setAttribute("cy", "232.630");
    // });
    // await page.waitForTimeout(1000);
    // await tempGauge.click();
    // await page.waitForTimeout(1000);

    //Real Time mouse movement
    const tempBox = page.locator(
      '[tabtitle="Temperature"] ngx-temperature-dragger circle'
    );
    await tempBox.scrollIntoViewIfNeeded();
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.waitForTimeout(1000);
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y);
    await page.waitForTimeout(1000);
    await page.mouse.move(x + 100, y + 100);
    await page.waitForTimeout(1000);
    await page.mouse.up();
    await page.waitForTimeout(1000);
  });
});
