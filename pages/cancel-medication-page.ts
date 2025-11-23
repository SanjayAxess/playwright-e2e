import type { Locator, Page } from "@playwright/test";

export class CancelMedicationPage {

    private _alertErrorIcon: Locator;
    private _alreadyCancelledTag: Locator;
    private _cancelAdditionalInformationInputField: Locator;
    private _cancelIssueButton: Locator;
    private _cancelIssueColumnSkeleton: Locator;
    private _cancelLatestIssue: Locator;
    private _cancelLatestIssueButton: Locator;
    private _cancelLatestIssuePanel: Locator;
    private _cancelMedicationErrorDialogBox: Locator;
    private _cancelMedicationErrorDialogBoxCloseButton: Locator;
    private _cancelMedicationErrorDialogBoxContent: Locator;
    private _cancelMedicationErrorDialogBoxHeader: Locator;
    private _cancelMedicationHeaderItem: Locator;
    private _cancelMedicationHeaderLatestIssue: Locator;
    private _cancelMedicationTable: Locator;
    private _cancelNotificationPanel: Locator;
    private _cannotCancelIssueDialogCloseButton: Locator;
    private _cannotCancelIssueDialogXButton: Locator;
    private _cancellationAdditionalInformation: Locator;
    private _cancellationReasonDropdown: Locator;
    private _cancellationReasonField: Locator;
    private _copiedText: Locator;
    private _doNotCancelIssueButton: Locator;
    private _epsPrescriptionErrorTrackerLink: Locator;
    private _errorDialogTable: Locator;
    private _errorExpandButtonSingle: Locator;
    private _errorValidationBanner: Locator;
    private _errorValidationBannerErrorIcon: Locator;
    private _errorValidationBannerErrorIconTitle: Locator;
    private _firstKebabMenu: Locator;
    private _latestIssueTableHeader: Locator;
    private _multipleCancellationTryAgainSpinner: Locator;
    private _multipleIssueErrorContent: Locator;
    private _patientDetailsDiv: Locator;
    private _pendingCancellationMedicationTable: Locator;
    private _prescribeErrorReasonOption: Locator;
    private _prescriptionIdLabel: Locator;
    private _prescriptionIdValue: Locator;
    private _retryingText: Locator;
    private _singleCancelMedicationDrugName: Locator;
    private _singleUnCancelMedicationIssueDate: Locator;
    private _somethingWentwrongErrorDialog: Locator;
    private _somethingWentwrongErrorDialogCloseButton: Locator;
    private _tryAgainButton: Locator;
    private _unCancelledMedication_single: Locator;
    private _currentMedicationsTable: Locator;
    private _cancellationReasonOption1: Locator;
    private _cancellationReasonOption2: Locator;
    private _cancellationReasonOption3: Locator;
    private _cancellationReasonOption4: Locator;
    private _cancellationReasonOption5: Locator;
    private _cancellationReasonOption6: Locator;
    private _cancelLatestIssueTooltipContent: Locator;
    private _pastMedicationsTable: Locator;

    constructor(private readonly _page: Page) { }

    get firstKebabMenu(): Locator {
        return (this._firstKebabMenu ??= this._page.getByTestId("currentMoreOptionsButton").nth(0));
    }

    get cancelLatestIssue(): Locator {
        return (this._cancelLatestIssue ??= this._page.getByTestId("currentMedsCancelLatestIssue"));
    }

    get cancelLatestIssuePanel(): Locator {
        return (this._cancelLatestIssuePanel ??= this._page.getByTestId("cancelLatestIssueDialog"));
    }

    get latestIssueTableHeader(): Locator {
        return (this._latestIssueTableHeader ??= this._page.getByTestId("cancelLatestIssueDialogHeader"));
    }

    get cancellationReasonField(): Locator {
        return (this._cancellationReasonField ??= this._page.getByTestId("cancellationReasonField"));
    }

    get cancellationReasonDropdown(): Locator {
        return (this._cancellationReasonDropdown ??= this._page.getByTestId("cancellationReasonDropdownTrigger"));
    }

    get cancellationAdditionalInformation(): Locator {
        return (this._cancellationAdditionalInformation ??= this._page.getByTestId("cancellationAdditionalInformation"));
    }

    get cancelIssueButton(): Locator {
        return (this._cancelIssueButton ??= this._page.getByTestId("cancelLatestIssue"));
    }

    get doNotCancelIssueButton(): Locator {
        return (this._doNotCancelIssueButton ??= this._page.getByTestId("doNotCancelIssue"));
    }

    get cancelMedicationHeaderItem(): Locator {
        return (this._cancelMedicationHeaderItem ??= this._page.getByTestId("medication-issue-header-item").nth(0));
    }

    get cancelMedicationHeaderLatestIssue(): Locator {
        return (this._cancelMedicationHeaderLatestIssue ??= this._page.getByTestId("medication-issue-header-latestIssue"));
    }

    get cancelMedicationTable(): Locator {
        return (this._cancelMedicationTable ??= this._page.getByTestId("medication-issue-table-large"));
    }

    get singleCancelMedicationDrugName(): Locator {
        return (this._singleCancelMedicationDrugName ??= this._page.getByTestId("medication-issue-drug"));
    }

    get singleUnCancelMedicationIssueDate(): Locator {
        return (this._singleUnCancelMedicationIssueDate ??= this._page.getByTestId("latestIssue-date"));
    }

    get cancelNotificationPanel(): Locator {
        return (this._cancelNotificationPanel ??= this._page.getByTestId("acp-toast"));
    }

    get errorValidationBanner(): Locator {
        return (this._errorValidationBanner ??= this._page.getByTestId("validation-banner-content"));
    }

    get errorValidationBannerErrorIcon(): Locator {
        return (this._errorValidationBannerErrorIcon ??= this._page.getByTestId("validation-banner-cap"));
    }

    get errorValidationBannerErrorIconTitle(): Locator {
        return (this._errorValidationBannerErrorIconTitle ??= this._page.locator("//div[@data-testid='validation-banner-cap']//*").nth(1));
    }

    get cancelAdditionalInformationInputField(): Locator {
        return (this._cancelAdditionalInformationInputField ??= this._page.getByTestId("cancellationAdditionalInformationInput"));
    }

    get cancelMedicationErrorDialogBox(): Locator {
        return (this._cancelMedicationErrorDialogBox ??= this._page.getByTestId("cancel-multiple-issue-error"));
    }

    get cancelMedicationErrorDialogBoxHeader(): Locator {
        return (this._cancelMedicationErrorDialogBoxHeader ??= this._page.locator("//div[@data-testid='cancel-multiple-issue-error']//header[1]"));
    }

    get cancelMedicationErrorDialogBoxContent(): Locator {
        return (this._cancelMedicationErrorDialogBoxContent ??= this._page.getByTestId("dialog-content"));
    }

    get cancelMedicationErrorDialogBoxCloseButton(): Locator {
        return (this._cancelMedicationErrorDialogBoxCloseButton ??= this._page.getByTestId("cancel-multiple-issue-error-close-button"));
    }

    get cannotCancelIssueDialogXButton(): Locator {
        return (this._cannotCancelIssueDialogXButton ??= this._page.getByTestId("dialog-header-close-button"));
    }

    get cannotCancelIssueDialogCloseButton(): Locator {
        return (this._cannotCancelIssueDialogCloseButton ??= this._page.getByTestId("cancel-multiple-issue-error-close-button"));
    }

    get prescribeErrorReasonOption(): Locator {
        return (this._prescribeErrorReasonOption ??= this._page.getByTestId("cancellation-reason-1"));
    }

    get patientDetailsDiv(): Locator {
        return (this._patientDetailsDiv ??= this._page.getByTestId("patientDetails-displayDetails"));
    }

    get somethingWentwrongErrorDialog(): Locator {
        return (this._somethingWentwrongErrorDialog ??= this._page.getByTestId("cancel-multiple-issue-error"));
    }

    get somethingWentwrongErrorDialogCloseButton(): Locator {
        return (this._somethingWentwrongErrorDialogCloseButton ??= this._page.getByTestId("cancel-multiple-issue-error-close-button"));
    }

    get alertErrorIcon(): Locator {
        return (this._alertErrorIcon ??= this._page.getByTestId("alert-error-icon"));
    }

    get prescriptionIdLabel(): Locator {
        return (this._prescriptionIdLabel ??= this._page.getByTestId("prescription-id-label"));
    }

    get prescriptionIdValue(): Locator {
        return (this._prescriptionIdValue ??= this._page.getByTestId("prescription-id-value"));
    }

    get copiedText(): Locator {
        return (this._copiedText ??= this._page.getByText("Copied!").nth(0));
    }

    get cancelLatestIssueButton(): Locator {
        return (this._cancelLatestIssueButton ??= this._page.getByTestId("msm-toolbar-action-btn-cancel-latest-issue"));
    }

    get tryAgainButton(): Locator {
        return (this._tryAgainButton ??= this._page.getByTestId("try-again-technical-error"));
    }

    get epsPrescriptionErrorTrackerLink(): Locator {
        return (this._epsPrescriptionErrorTrackerLink ??= this._page.locator("//a[contains(text(),'EPS Prescription Tracker')]"));
    }

    get cancelIssueColumnSkeleton(): Locator {
        return (this._cancelIssueColumnSkeleton ??= this._page.getByTestId("latestIssueColumnSkeleton").nth(0));
    }

    get multipleCancellationTryAgainSpinner(): Locator {
        return (this._multipleCancellationTryAgainSpinner ??= this._page.getByTestId("retry-cancel-spinner"));
    }

    get retryingText(): Locator {
        return (this._retryingText ??= this._page.locator("//*[text()='Retrying']"));
    }

    get pendingCancellationMedicationTable(): Locator {
        return (this._pendingCancellationMedicationTable ??= this._page.getByTestId("lastIssueList"));
    }

    get errorDialogTable(): Locator {
        return (this._errorDialogTable ??= this._page.getByTestId("lastIssueList").nth(1));
    }

    get multipleIssueErrorContent(): Locator {
        return (this._multipleIssueErrorContent ??= this._page.getByTestId("cancel-multiple-issue-error-content"));
    }

    get alreadyCancelledTag(): Locator {
        return (this._alreadyCancelledTag ??= this._page.getByText("Already cancelled").nth(1));
    }

    get unCancelledMedication_single(): Locator {
        return (this._unCancelledMedication_single ??= this._page.getByTestId("medication-issue-preparation"));
    }

    get errorExpandButtonSingle(): Locator {
        return (this._errorExpandButtonSingle ??= this._page.getByTestId("error-expand-button"));
    }

    get currentMedicationsTable(): Locator {
        return (this._currentMedicationsTable ??= this._page.getByTestId("meds-current-table"));
    }

    get pastMedicationsTable(): Locator {
        return (this._pastMedicationsTable ??= this._page.getByTestId("meds-past-table"));
    }


    get cancellationReasonOption1(): Locator {
        return (this._cancellationReasonOption1 ??= this._page.getByTestId("cancellation-reason-1"));
    }

    get cancellationReasonOption2(): Locator {
        return (this._cancellationReasonOption2 ??= this._page.getByTestId("cancellation-reason-value-2"));
    }

    get cancellationReasonOption3(): Locator {
        return (this._cancellationReasonOption3 ??= this._page.getByTestId("cancellation-reason-value-3"));
    }

    get cancellationReasonOption4(): Locator {
        return (this._cancellationReasonOption4 ??= this._page.getByTestId("cancellation-reason-value-4"));
    }

    get cancellationReasonOption5(): Locator {
        return (this._cancellationReasonOption5 ??= this._page.getByTestId("cancellation-reason-value-5"));
    }

    get cancellationReasonOption6(): Locator {
        return (this._cancellationReasonOption6 ??= this._page.getByTestId("cancellation-reason-value-6"));
    }

    get cancelLatestIssueTooltipContent(): Locator {
        return this._cancelLatestIssueTooltipContent ??= this._page.getByTestId("cancel-latest-issue-tooltip-content");
    }
}