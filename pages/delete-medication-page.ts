import { Locator, Page } from "@playwright/test";

export class DeleteMedicationPage {
    private _pastMedsDeleteCourse: Locator;
    private _deleteCourseDialogReason: Locator;
    private _deleteCourseCancelBtn: Locator;
    private _deleteCourseSubmitBtn: Locator;
    private _deleteCourseDialog: Locator;
    private _dialogFooter: Locator;

    constructor(private readonly _page: Page) { }

    get pastMedsDeleteCourse(): Locator {
        return this._pastMedsDeleteCourse ??= this._page.getByTestId("pastMedsDeleteCourse");
    }

    get deleteCourseDialogReason(): Locator {
        return this._deleteCourseDialogReason ??= this._page.getByTestId("deleteCourseDialogReason");
    }

    get deleteCourseCancelBtn(): Locator {
        return this._deleteCourseCancelBtn ??= this._page.getByTestId("deleteCourseCancelBtn");
    }

    get deleteCourseSubmitBtn(): Locator {
        return this._deleteCourseSubmitBtn ??= this._page.getByTestId("deleteCourseSubmitBtn");
    }

    get deleteCourseDialog(): Locator {
        return this._deleteCourseDialog ??= this._page.getByTestId("deleteCourseDialog");
    }

    get dialogFooter(): Locator {
        return this._dialogFooter ??= this._page.getByTestId("dialog-footer");
    }

}