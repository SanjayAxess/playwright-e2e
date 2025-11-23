import type { Locator, Page, Route } from "@playwright/test";

export class RequestIssuePage {

    private _currentPendingIcon: Locator;
    private _currentRejectedIcon: Locator;
    private _pastRejectedIcon: Locator;
    private _currentMedsRequestIssue: Locator;
    private _showSuggestionsButton: Locator;
    private _userSinglePickerDropdownItems: Locator;
    private _usersSinglePickerInput: Locator;
    private _requestIssueButton: Locator;
    private _pastMedsRequestIssue: Locator;
    private _requestIssuePanelHeader: Locator;
    private _highPriorityCheckbox: Locator;
    private _requestIssueCancelButton: Locator;
    private _requestIssueDialogHeaderCloseButton: Locator;
    private _requestIssueWarningCancelButton: Locator;
    private _requestIssueWarningDiscardButton: Locator;
    private _requestIssuePanelMedicationName: Locator;
    private _selectAnAuthorisingClinicianError: Locator;
    private _clinicianNotAuthorisedError: Locator;
    private _requestIssueValidationBannerContent: Locator;
    private _couldntRequestIssueError: Locator;
    private _requestIssueAPIError: Locator;

    constructor(private readonly _page: Page) { }

    get currentPendingIcon(): Locator {
        return (this._currentPendingIcon ??= this._page.locator("//*[local-name()='svg' and @data-testid='request-issue-requested-icon']"));
    }

    get currentRejectedIcon(): Locator {
        return (this._currentRejectedIcon ??= this._page.locator('[data-testid="request-issue-rejected-icon"]'));
    }

    get pastRejectedIcon(): Locator {
        return (this._pastRejectedIcon ??= this._page.locator('[data-testid="request-issue-rejected-icon"]'));
    }

    get currentMedsRequestIssue(): Locator {
        return (this._currentMedsRequestIssue ??= this._page.getByTestId("currentMedsRequestIssue"));
    }

    get pastMedsRequestIssue(): Locator {
        return (this._pastMedsRequestIssue ??= this._page.getByTestId("pastMedsRequestIssue"));
    }

    get showSuggestionsButton(): Locator {
        return (this._showSuggestionsButton ??= this._page.locator('[aria-label="Show suggestions"]'));
    }

    get userSinglePickerDropdownItems(): Locator {
        return (this._userSinglePickerDropdownItems ??= this._page.locator('[data-testid="user-single-picker-dropdown"] div[data-dd-action-name="UserDetails"]'));
    }

    get usersSinglePickerInput(): Locator {
        return (this._usersSinglePickerInput ??= this._page.getByTestId("authorizingClinicianField").getByTestId("users-singlepicker-input"));
    }

    get requestIssueButton(): Locator {
        return (this._requestIssueButton ??= this._page.getByTestId("request-issue-btn"));
    }

    get requestIssuePanelHeader(): Locator {
        return (this._requestIssuePanelHeader ??= this._page.getByTestId('medicationPanelHeader'));
    }

    get highPriorityCheckbox(): Locator {
        return (this._highPriorityCheckbox ??= this._page.getByTestId('request-issue-high-priority'));
    }

    get requestIssueCancelButton(): Locator {
        return (this._requestIssueCancelButton ??= this._page.getByTestId('request-issue-cancel-btn'));
    }

    get requestIssueDialogHeaderCloseButton(): Locator {
        return (this._requestIssueDialogHeaderCloseButton ??= this._page.getByTestId('dialog-header-close-button'));
    }

    get requestIssueWarningCancelButton(): Locator {
        return (this._requestIssueWarningCancelButton ??= this._page.getByTestId('medsWarningCancelButton'));
    }

    get requestIssueWarningDiscardButton(): Locator {
        return (this._requestIssueWarningDiscardButton ??= this._page.getByTestId('medsWarningDiscardButton'));
    }

    get requestIssuePanelMedicationName(): Locator {
        return (this._requestIssuePanelMedicationName ??= this._page.getByTestId('selected-med-preparationname'));
    }

    get selectAnAuthorisingClinicianError(): Locator {
        return (this._selectAnAuthorisingClinicianError ??= this._page.getByTestId('test-select-an-authorising-clinician'));
    }

    get clinicianNotAuthorisedError(): Locator {
        return (this._clinicianNotAuthorisedError ??= this._page.getByTestId('test-this-clinician-is-not-authorised-to-prescribe-the-selected-medication-select-a-different-clinician'));
    }

    get requestIssueValidationBannerContent(): Locator {
        return (this._requestIssueValidationBannerContent ??= this._page.getByTestId('request-issue-validation-banner-content'));
    }

    get couldntRequestIssueError(): Locator {
        return (this._couldntRequestIssueError ??= this._page.getByTestId('test-couldnt-request-issue'));
    }

    get requestIssueAPIError(): Locator {
        return (this._requestIssueAPIError ??= this._page.getByTestId('request-issue-validation-banner-content'));
    }
}
