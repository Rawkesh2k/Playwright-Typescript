import { test as base } from "@playwright/test";

export type TestOptions = {
  globalsqaURL: string;
  formLayoutsPage: string;
};
export const test = base.extend<TestOptions>({
  globalsqaURL: ["", { option: true }],
  formLayoutsPage: [
    async ({ page }, use) => {
      await page.goto(process.env.URL);
      await page.getByText("Button Triggering AJAX Request").click();
      //Everything before use() will be setting up the environment as preconditions
      await use(""); 
      //Everything after use() will be setting up the environment as teardown
      //meaning they will be executed after all the tests are completed executing   
      console.log('teardown')
    },
    { auto: true },  //--This means to initialize the fixture at the very start when the execution starts
  ],
});
