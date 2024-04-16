import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly formLayoutMenuItem: Locator;
  constructor(page: Page) {
    this.page = page;
    this.formLayoutMenuItem = page.getByText("Form Layouts")
  }

  async formlayouts() {
    await this.page.getByText("Forms").click();
    await this.formLayoutMenuItem.click();
  }
}
