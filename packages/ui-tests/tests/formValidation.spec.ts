import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage.page';
import { localhost } from "@af/config"

let homepage: Homepage;

test.describe("AutoFlow Film Store Homepage - Form Validation", () => {
  test.beforeEach(async ({page}) => {
    homepage = new Homepage(page);
    await page.goto(localhost.config.url);
  });

  test("Clicking add film with no fields filled shows inline error for each missing field", async ({page}) => {
    await homepage.submitButton.click();
    const allErrorMessages = await homepage.errorMessages.allTextContents();
    expect(allErrorMessages.length, "Less than 4 error messages shown").toEqual(4);
  })

  test("Entering a non-numeric or invalid year in release year, then clicking submit, shows an error", async ({ page }) => {
    const startingFilms = await homepage.getAllFilms();
    await homepage.titleInput.fill("Test Film");
    await homepage.releaseYearInput.fill("test");
    await homepage.directorInput.fill("Test Director");
    await homepage.ratingInput.fill("9.5");
    await homepage.submitButton.click();
    const allErrorMessages = await homepage.errorMessages.allTextContents();
    expect.soft(allErrorMessages.length).toEqual(1);
    expect.soft(startingFilms, "Film has been added to the list").toEqual(await homepage.getAllFilms());
    expect(await page.getByText("Enter a 4-digit year between 1888 and current year")).toBeVisible();
  });

    test("Entering an invalid rating, not between 1-10, then clicking submit, shows an error", async ({ page }) => {
    const startingFilms = await homepage.getAllFilms();
    await homepage.titleInput.fill("Test Film");
    await homepage.releaseYearInput.fill("1999");
    await homepage.directorInput.fill("Test Director");
    await homepage.ratingInput.fill("-1");
    await homepage.submitButton.click();    
    const allErrorMessages = await homepage.errorMessages.allTextContents();
    expect.soft(allErrorMessages.length).toEqual(1);
    expect.soft(startingFilms, "Film has been added to the list").toEqual(await homepage.getAllFilms());
    expect(await page.getByText("Enter a rating between 1-10")).toBeVisible();
  });

});
