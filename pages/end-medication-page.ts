import { Locator, Page } from "@playwright/test";

export class EndCourseMedicationPage {
    private _endCourseButton: Locator;
    private _currentMedsEndCourse: Locator;
    private _reasonForEndingCourse: Locator;
    private _endCourseDialog: Locator;
    private _doNotEndCourseButton: Locator;
    private _endCourseCloseBtn: Locator;
    private _endCourseInfoText: Locator;
    private _doNotEndButtonSmallView: Locator;
    private _endMedicationNotificationPanel: Locator;
    private _cannotEndCourseTooltipContent: Locator;

    constructor(private readonly _page: Page) { }

    get endCourseButton(): Locator {
        return (this._endCourseButton ??= this._page.getByTestId('endCourseButton'));
    }

    get currentMedsEndCourse(): Locator {
        return (this._currentMedsEndCourse ??= this._page.getByTestId('currentMedsEndCourse'));
    }

    get reasonForEndingCourse(): Locator {
        return this._reasonForEndingCourse ??= this._page.getByTestId("endCourseDialogReasonForEndingCourse");
    }

    get endCourseDialog(): Locator {
        return this._endCourseDialog ??= this._page.getByTestId("dialog");
    }

    get doNotEndCourseButton(): Locator {
        return this._doNotEndCourseButton ??= this._page.getByTestId("doNotEndCourseButton");
    }

    get endCourseCloseBtn(): Locator {
        return this._endCourseCloseBtn ??= this._page.getByTestId("dialog-header-close-button");
    }

    get endCourseInfoText(): Locator {
        return this._endCourseInfoText ??= this._page.getByTestId("endCourseLatestIssueInfoText");
    }

    get doNotEndSmallView(): Locator {
        return this._doNotEndButtonSmallView ??= this._page.getByTestId("doNotEndCourseButtonSmall");
    }

    get endMedicationNotificationPanel(): Locator {
        return (this._endMedicationNotificationPanel ??= this._page.getByTestId("acp-toast"));
    }

    get cannotEndCourseTooltipContent(): Locator {
        return this._cannotEndCourseTooltipContent ??= this._page.getByTestId("cannot-end-course-tooltip-content");
    }
}