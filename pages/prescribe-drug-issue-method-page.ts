import type { Locator, Page } from "@playwright/test";

export class IssueMethodPage {
    constructor(private readonly _page: Page) { }
    get issueMethodDropdown(): Locator {
        return this._page.getByTestId("changeIssueMethodButton");
    }
    get issueMethodDropdownList(): Locator {
        return this._page.locator("//*[@data-testid='dropdown-menu']/div");
    }

    get epsPrimaryNominationDropdownOption(): Locator {
        return this._page.getByTestId("issueMethodEPSPrimaryNomination");
    }

    get epsApplianceNominationDropdownOption(): Locator {
        return this._page.getByTestId("issueMethodEPSApplianceNomination");
    }

    get epsAnyPharmacyDropdownOption(): Locator {
        return this._page.getByTestId("issueMethodEPSAnyPharmacy");
    }

    get printedNhsPrescriptionDropdownOption(): Locator {
        return this._page.getByTestId("issueMethodNHSPrintedScript");
    }

    get epsPrimaryNominationRadioButton(): Locator {
        return this._page.getByTestId("issue-method-epsprimarynomination");
    }

    get epsApplianceNominationRadioButton(): Locator {
        return this._page.getByTestId("issue-method-epsappliancenomination");
    }

    get epsAnyPharmacyRadioButton(): Locator {
        return this._page.getByTestId("issue-method-epsanypharmacy");
    }

    get printedNhsPrescriptionRadioButton(): Locator {
        return this._page.getByTestId("issue-method-nhsprescription");
    }

    get issueMethodHeader(): Locator {
        return this._page.getByTestId("issue-method-header-header");
    }

    get issueMethodTopHeader(): Locator {
        return this._page.getByTestId("issue-method-header-listitem-children");
    }

    get signIngClinicianField(): Locator {
        return this._page.getByTestId("users-singlepicker-input");
    }

    getSigningClinicianOption(name: string): Locator {
        return this._page.getByTitle(name);
    }
}