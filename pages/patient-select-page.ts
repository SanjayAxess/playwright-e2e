import type { Locator, Page } from "@playwright/test";

export class PatientSelectPage {
  private _searchBox?: Locator;
  private _searchResults?: Locator;

  constructor(private readonly _page: Page) {}

  get searchBox(): Locator {
    return (this._searchBox ??= this._page.getByTestId("searchbox-testid").locator("visible=true"));
  }

  get searchResults(): Locator {
    return (this._searchResults ??= this._page.getByTestId("patient-quicksearch-listitem-testid"));
  }
}
