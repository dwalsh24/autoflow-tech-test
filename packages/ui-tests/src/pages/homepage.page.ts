import { type Locator, type Page } from "@playwright/test";

type film = {name:string, released: string, director: string, rating: string};

export class Homepage {
    readonly page: Page;
    readonly filmTable: Locator;
    readonly filmTableRow: Locator;
    readonly titleInput: Locator;
    readonly releaseYearInput: Locator;
    readonly directorInput: Locator;
    readonly ratingInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filmTable = page.getByRole("table");
        this.filmTableRow = this.filmTable.locator("tbody").getByRole("row");
        this.titleInput = page.locator("#title");
        this.releaseYearInput = page.locator("#releaseYear");
        this.directorInput = page.locator("#director");
        this.ratingInput = page.locator("#rating");
        this.submitButton = page.getByRole("button").filter({hasText: "Ad Film"});
        this.errorMessages = page.locator(".errorText");
    }

    async getAllFilms(): Promise<Array<film>> {
        const allFilms: Array<film> = [];
        const allTableRows = await this.filmTableRow.all();
        for (const row of allTableRows) {
            const rowData = (await row.innerText()).split("\t");
            allFilms.push({
                name: rowData[0],
                released: rowData[1],
                director: rowData[2],
                rating: rowData[3],
            })
        }
        return allFilms;
    }
}