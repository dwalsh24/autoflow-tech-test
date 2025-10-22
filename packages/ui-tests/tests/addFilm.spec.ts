import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage.page';
import { localhost } from "@af/config"

let homepage: Homepage;

test.describe("AutoFlow Film Store Homepage - Add films", () => {
  test.beforeEach(async ({page}) => {
    homepage = new Homepage(page);
    await page.goto(localhost.config.url);
  });

  test("Add film section shows inputs for title, release year, director, rating, and a submit button", async ({page}) => {
    await expect.soft(homepage.titleInput, "Title input not visible").toBeVisible();
    await expect.soft(homepage.titleInput, "Title input not required").toHaveAttribute("required");

    await expect.soft(homepage.releaseYearInput, "Release Year input not visible").toBeVisible();
    await expect.soft(homepage.releaseYearInput, "Release Year input not required").toHaveAttribute("required");

    await expect.soft(homepage.directorInput, "Director input not visible").toBeVisible();
    await expect.soft(homepage.directorInput, "Director input not required").toHaveAttribute("required");

    await expect.soft(homepage.ratingInput, "Rating input not visible").toBeVisible();
    await expect.soft(homepage.ratingInput, "Rating input not required").toHaveAttribute("required");

    await expect.soft(homepage.submitButton, "Submit button not visible").toBeVisible();
  })

  test("Using valid inputs, the user can add a film to the table with no reload", async () => {
    await homepage.titleInput.fill("Test Film");
    await homepage.releaseYearInput.fill("1999");
    await homepage.directorInput.fill("Test Director");
    await homepage.ratingInput.fill("9.5");
    await homepage.submitButton.click();
    expect(await homepage.titleInput.textContent()).toBe("");
    expect(await homepage.releaseYearInput.textContent()).toBe("");
    expect(await homepage.directorInput.textContent()).toBe("");
    expect(await homepage.ratingInput.textContent()).toBe("");

    const filmList = await homepage.getAllFilms();
    expect.soft(filmList[filmList.length - 1]).toBe(
        {
                name: "Test Film",
                released: "1999",
                director: "Test Director",
                rating: "9.5 / 10",
        }
    )
  });


});
