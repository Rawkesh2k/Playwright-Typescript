import { test, expect } from "@playwright/test";
import {NavigationPage} from "../PageObjects/navigationPage"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test('Navigate to the page',async ({ page }) => {
   const  navigateTo =  new NavigationPage(page)
   await navigateTo.formlayouts()
  });