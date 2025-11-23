import { Locator, Page } from "@playwright/test";

export class EditMedicationPage {
    private _editMedicationOption: Locator;
    private _editTooltip: Locator;
    private _editDosage: Locator;
    private _updateAndIssueButton: Locator;
    private _updateOnlyButton: Locator;
    private _editDuration: Locator;
    private _repeatDispensingColor: Locator;
    constructor(private readonly _page: Page) { }

    get editMedicationOption(): Locator {
        return this._editMedicationOption ??= this._page.getByTestId("currentMedsEditDrug");
    }

    get editTooltip(): Locator {
        return (this._editTooltip ??= this._page
            .getByRole('tooltip')
            .getByTestId('listItemControlforEditMedication-children')
            .first()
        );
    }

    get editDosage(): Locator {
        return this._editDosage ??= this._page.getByTestId("edit-dosage");
    }

    get updateAndIssueButton(): Locator {
        return (this._updateAndIssueButton ??= this._page.getByTestId('prescribeDrug-updateAndIssueMediumViewPort'));
    }

    get updateOnlyButton(): Locator {
        return (this._updateOnlyButton ??= this._page.getByTestId('prescribeDrug-updateOnlyMediumViewPort'));
    }

    get editDuration(): Locator {
        return (this._editDuration ??= this._page.getByTestId('prescribeDrug-duration'));
    }

    get editMedicationHeader(): Locator {
        return this._page.getByTestId("medicationPanelHeader");
    }

    get editTab(): Locator {
        return this._page.getByTestId("meds-pkg-edit-tab");
    }

    get prescribeEditDrugName(): Locator {
        return this._page.getByTestId("prescribe-edit-preparation-name");
    }

    get editUpdateAndIssueButton(): Locator {
        return this._page.getByTestId("prescribeDrug-updateAndIssueMediumViewPort");
    }

    get editUpdateOnlyButton(): Locator {
        return this._page.getByTestId("prescribeDrug-updateOnlyMediumViewPort");
    }

    get editCancelButton(): Locator {
        return this._page.getByTestId("prescribeDrug-updateCancel");
    }

    get repeatDispensingColor(): Locator {
         return (this._repeatDispensingColor ??= this._page.locator('//*[@id="prescriptionType"]/div[3]/label/span/span'));
    }
}