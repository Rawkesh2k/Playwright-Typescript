import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL);
  await page.getByText("Button Triggering AJAX Request").click();
});
test('Auto waiting',async({page})=>{
   const successBtn =  await page.locator('.bg-success')
   await successBtn.click()

   const successBtnText = await successBtn.textContent()
   expect(successBtnText).toContain('Data loaded with AJAX get request.')
})
