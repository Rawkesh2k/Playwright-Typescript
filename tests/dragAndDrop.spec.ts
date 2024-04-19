//import { expect } from "@playwright/test";
import { test } from "../test-options"; //--> importing this from TestOptions file rather then default @playwright lib
//in order to call the url from the playwright config file

test("Drag And Drop with iFrame", async ({ page, globalsqaURL }) => {
  await page.goto(globalsqaURL);
  await page.waitForTimeout(1000);
  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
  await page.waitForTimeout(1000);
  await frame
    .locator("li", { hasText: "High Tatras 2" })
    .dragTo(frame.locator("#trash"));
  await page.waitForTimeout(1000);

  //precise control
  await frame.locator("li", { hasText: "High Tatras 3" }).hover();
  await page.waitForTimeout(1000);
  await page.mouse.down();
  await page.waitForTimeout(1000);
  await frame.locator("#trash").hover();
  await page.waitForTimeout(1000);
  await page.mouse.up();
  await page.waitForTimeout(3000);
});
