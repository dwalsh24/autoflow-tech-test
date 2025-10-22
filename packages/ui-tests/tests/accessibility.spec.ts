import { test, expect } from "@playwright/test";
import { localhost } from "@af/config"
import AxeBuilder from "@axe-core/playwright";

let axeBuilder: AxeBuilder;

test.describe("AutoFlow Film Store Homepage - Accessibility testing", () => {
  test.beforeEach(async ({ page }) => {
    axeBuilder = new AxeBuilder({ page });
    await page.goto(localhost.config.url);
  });

  test("Analyze page", async ({ page }) => {
    const scanResults = await axeBuilder.analyze();
    expect(scanResults.violations, `${scanResults.violations.length} accessibility violations found`).toEqual([]);
  });
});
