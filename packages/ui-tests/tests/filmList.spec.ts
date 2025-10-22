import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage.page';
import { localhost } from "@af/config"

let homepage: Homepage;

test.describe("AutoFlow Film Store Homepage - Film list", () => {
  test.beforeEach(async ({page}) => {
    homepage = new Homepage(page);
    await page.goto(localhost.config.url);
  });

  test("List of films should show with a title, release year, director and rating", async ({page}) => {
    // confirms the table has rendered
    await homepage.filmTable.waitFor({state: "visible"});
    // Gets all information from the table
    const allFilms = await homepage.getAllFilms();
    // Confirms each film has an entry for each heading 
    // Uses soft asserts to allow all data to be checked and reported
    allFilms.forEach(film => {
      expect.soft(film.name.length, `Name missing from film: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
      expect.soft(film.released.length, `Release date missing from film: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
      expect.soft(film.director.length, `Director missing from film: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
      expect.soft(film.rating.length, `Rating missing from film: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
    });
  })

  test("Films in table should have name, 4 digit year", async () => {
    // Gets all film information from the table
    const allFilms = await homepage.getAllFilms();
    // Checks all of the information for each section exists and is in the correct format
    allFilms.forEach(film => {
      const releaseYear = Number.parseInt(film.released);
      const rating = Number.parseFloat(film.rating.split(" / ")[0]);

      expect.soft(film.name.length, `Name missing from film: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
      expect.soft(releaseYear, `Release date: ${releaseYear} lower than 1887: ${JSON.stringify(film)}`).toBeGreaterThan(1887);
      expect.soft(releaseYear, `Release date: ${releaseYear} higher than current year: ${JSON.stringify(film)}`).toBeLessThanOrEqual(new Date().getFullYear());
      expect.soft(film.director.length, `Director missing from film: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
      expect.soft(rating, `Rating of ${rating} not a valid score: ${JSON.stringify(film)}`).toBeGreaterThanOrEqual(1);
      expect.soft(rating, `Rating of ${rating} not a valid score: ${JSON.stringify(film)}`).toBeLessThanOrEqual(10);
    });
  })

});
