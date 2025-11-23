import type { Locator, Page } from "@playwright/test";

export class RecordMedicationPage {

    private _acpToastNotification: Locator;
    private _addToValidationError: Locator;
    private _apiErrorTryAgainBanner: Locator;
    private _applyButton: Locator;
    private _clinicalWarningPanel: Locator;
    private _combinedRecordAndRecordAnotherButton: Locator;
    private _combinedRecordButton: Locator;
    private _currentMedicationRadioButton: Locator;
    private _currentMedicationRadioButtonLabel: Locator;
    private _dateIssuedDatePicker: Locator;
    private _dateIssuedField: Locator;
    private _dateIssuedLabel: Locator;
    private _discardMedicationButton: Locator;
    private _discardMedicationDialogCloseButton: Locator;
    private _discardWarningCancelButton: Locator;
    private _dosageField: Locator;
    private _durationField: Locator;
    private _durationValidationError: Locator;
    private _durationValueErrorBanner: Locator;
    private _editMedicationButton: Locator;
    private _expandMenuButton: Locator;
    private _highWarningPopup: Locator;
    private _highWarningPopupProceedButton: Locator;
    private _leaveInCurrentButton: Locator;
    private _locationIssuedDropdown: Locator;
    private _locationIssuedDropdownHospital: Locator;
    private _locationIssuedDropdownOutOfHoursService: Locator;
    private _locationIssuedDropdownOverTheCounter: Locator;
    private _locationIssuedLabel: Locator;
    private _locationIssuedValidationError: Locator;
    private _medDiscardWarningDialog: Locator;
    private _medicationField: Locator;
    private _medicationValidationError: Locator;
    private _medsSearchComboBoxButton: Locator;
    private _moveToPastButton: Locator;
    private _moveToPastErrorDialog: Locator;
    private _newestFirstRadioButton: Locator;
    private _noGroupRadioButton: Locator;
    private _pastMedicationRadioButton: Locator;
    private _pastMedicationRadioButtonLabel: Locator;
    private _addToFormElement: Locator;
    private _quantityField: Locator;
    private _quantityValidationError: Locator;
    private _recordAndRecordAnotherButtton: Locator;
    private _recordButton: Locator;
    private _recordCancelButton: Locator;
    private _recordCloseButton: Locator;
    private _recordMedicationPanelHeader: Locator;
    private _recordMedsLargeButton: Locator;
    private _recordMedsMediumButton: Locator;
    private _recordMedsSmallButton: Locator;
    private _recordNotificationPanel: Locator;
    private _sortButton: Locator;
    private _validationErrorBanner: Locator;
    private _noResultsFoundDialog: Locator;
    private _dosageText: Locator;
    private _editDosage: Locator;
    private _clearButton: Locator;
    private _dosageDropdown: Locator;
    private _dosageDropdownButton: Locator;
    private _dosageDropdownOptions: Locator;
    private _drugInfoWarningProceedButton: Locator;

    constructor(private readonly _page: Page) { }

    get recordMedsLargeButton(): Locator {
        return (this._recordMedsLargeButton ??= this._page.getByTestId("meds-record-large-button"));
    }

    get recordMedsMediumButton(): Locator {
        return (this._recordMedsMediumButton ??= this._page.getByTestId("meds-record-medium-button"));
    }

    get recordMedsSmallButton(): Locator {
        return (this._recordMedsSmallButton ??= this._page.getByTestId("meds-record-small-button"));
    }

    get recordMedicationPanelHeader(): Locator {
        return (this._recordMedicationPanelHeader ??= this._page.getByTestId("medicationPanelHeader"));
    }

    get locationIssuedDropdown(): Locator {
        return (this._locationIssuedDropdown ??= this._page.getByTestId("locationDropdown-value"));
    }

    get locationIssuedLabel(): Locator {
        return (this._locationIssuedLabel ??= this._page.getByText("Location issued"));
    }

    get dateIssuedLabel(): Locator {
        return (this._dateIssuedLabel ??= this._page.getByText("Date issued"));
    }

    get dateIssuedDatePicker(): Locator {
        return (this._dateIssuedDatePicker ??= this._page.locator("button[title='Select date']"));
    }

    get dateIssuedField(): Locator {
        return (this._dateIssuedField ??= this._page.getByTestId("recordDrug-dateIssued"));
    }

    get medicationField(): Locator {
        return (this._medicationField ??= this._page.getByTestId("medsSearchCombobox-input"));
    }

    get dosageField(): Locator {
        return (this._dosageField ??= this._page.getByTestId("recordDrug-dosage-input"));
    }

    get dosageFieldInput(): Locator {
        return this._page.getByTestId("recordDrug-dosage-input");
    }

    get quantityField(): Locator {
        return (this._quantityField ??= this._page.getByTestId("recordDrug-quantity").nth(0));
    }

    get durationField(): Locator {
        return (this._durationField ??= this._page.getByTestId("recordDrug-duration").nth(0));
    }

    get recordAndRecordAnotherButtton(): Locator {
        return (this._recordAndRecordAnotherButtton ??= this._page.getByTestId("recordDrugAndAddAnother-submit"));
    }

    get recordButton(): Locator {
        return (this._recordButton ??= this._page.getByTestId("recordDrug-submit"));
    }

    get recordCancelButton(): Locator {
        return (this._recordCancelButton ??= this._page.getByTestId("recordDrug-cancel"));
    }

    get recordCloseButton(): Locator {
        return (this._recordCloseButton ??= this._page.getByTestId("detailPanel-close-button"));
    }

    get locationIssuedDropdownHospital(): Locator {
        return (this._locationIssuedDropdownHospital ??= this._page.getByTestId("location-RecordHospital"));
    }

    get locationIssuedDropdownOutOfHoursService(): Locator {
        return (this._locationIssuedDropdownOutOfHoursService ??= this._page.getByTestId("location-OutOfHours"));
    }

    get locationIssuedDropdownOverTheCounter(): Locator {
        return (this._locationIssuedDropdownOverTheCounter ??= this._page.getByTestId("location-OverTheCounter"));
    }

    get combinedRecordAndRecordAnotherButton(): Locator {
        return (this._combinedRecordAndRecordAnotherButton ??= this._page.getByTestId("combinedRecordSubmit"));
    }

    get combinedRecordButton(): Locator {
        return (this._combinedRecordButton ??= this._page.getByTestId("recordDrug-dropdown-item"));
    }

    get expandMenuButton(): Locator {
        return (this._expandMenuButton ??= this._page.getByTestId("expandMenuButton"));
    }

    get currentMedicationRadioButton(): Locator {
        return (this._currentMedicationRadioButton ??= this._page.getByTestId("CurrentMedication-currentmedication-input"));
    }

    get pastMedicationRadioButton(): Locator {
        return (this._pastMedicationRadioButton ??= this._page.getByTestId("PastMedication-pastmedication-input"));
    }

    get currentMedicationRadioButtonLabel(): Locator {
        return (this._currentMedicationRadioButtonLabel ??= this._page.getByTestId("CurrentMedication-currentmedication-label"));
    }

    get pastMedicationRadioButtonLabel(): Locator {
        return (this._pastMedicationRadioButtonLabel ??= this._page.getByTestId("PastMedication-pastmedication-label"));
    }

    get addToFormElement(): Locator {
        return (this._addToFormElement ??= this._page.getByTestId("addToOptionsFormElement"));
    }

    // Aliases for backward compatibility
    get currentMedicationOptionRadioButton(): Locator {
        return this.currentMedicationRadioButton;
    }

    get pastMedicationOptionRadioButton(): Locator {
        return this.pastMedicationRadioButton;
    }

    get clinicalWarningPanel(): Locator {
        return (this._clinicalWarningPanel ??= this._page.getByTestId("//div[@data-testid='clinical-warning__dialog-warning-container-testId']"));
    }

    get recordNotificationPanel(): Locator {
        return (this._recordNotificationPanel ??= this._page.locator("//*[@data-testid='acp-notification']"));
    }

    getDropDowmMedication(medication: string): Locator {
        return this._page.locator(`//*[@data-testid='medicationSearchItemDescription']//span[text()='${medication}']`);
    }

    get sortButton(): Locator {
        return (this._sortButton ??= this._page.getByTestId("btn-group-sort-open"));
    }

    get noGroupRadioButton(): Locator {
        return (this._noGroupRadioButton ??= this._page.locator("//button[@id='noGroup']"));
    }

    get newestFirstRadioButton(): Locator {
        return (this._newestFirstRadioButton ??= this._page.locator("//button[@id='latestIssueDate']"));
    }

    get applyButton(): Locator {
        return (this._applyButton ??= this._page.getByTestId("btn-group-sort-apply"));
    }

    get locationIssuedValidationError(): Locator {
        return (this._locationIssuedValidationError ??= this._page.getByTestId("test-select-a-location"));
    }

    get medicationValidationError(): Locator {
        return (this._medicationValidationError ??= this._page.getByTestId("test-select-a-medication"));
    }

    get quantityValidationError(): Locator {
        return (this._quantityValidationError ??= this._page.getByTestId("test-enter-a-quantity"));
    }

    get durationValidationError(): Locator {
        return (this._durationValidationError ??= this._page.getByTestId("test-enter-a-duration"));
    }

    get addToValidationError(): Locator {
        return (this._addToValidationError ??= this._page.getByTestId("test-select-an-option"));
    }

    get validationErrorBanner(): Locator {
        return (this._validationErrorBanner ??= this._page.getByTestId("validation-banner-content"));
    }

    get durationValueErrorBanner(): Locator {
        return (this._durationValueErrorBanner ??= this._page.getByTestId("test-enter-a-duration-greater-than-0"));
    }

    get editMedicationButton(): Locator {
        return (this._editMedicationButton ??= this._page.getByTestId("edit-button-medication"));
    }

    get medsSearchComboBoxButton(): Locator {
        return this._page.getByTestId("medsSearchCombobox-input");
    }

    get medDiscardWarningDialog(): Locator {
        return (this._medDiscardWarningDialog ??= this._page.getByTestId("medsDiscardWarning"));
    }

    get discardWarningCancelButton(): Locator {
        return (this._discardWarningCancelButton ??= this._page.getByTestId("medsWarningCancelButton"));
    }

    get discardMedicationButton(): Locator {
        return (this._discardMedicationButton ??= this._page.getByTestId("medsWarningDiscardButton"));
    }

    get discardMedicationDialogCloseButton(): Locator {
        return (this._discardMedicationDialogCloseButton ??= this._page.getByTestId("dialog-header-close-button"));
    }

    get apiErrorTryAgainBanner(): Locator {
        return (this._apiErrorTryAgainBanner ??= this._page.getByTestId("validation-banner-content"));
    }

    get acpToastNotification(): Locator {
        return (this._acpToastNotification ??= this._page.getByTestId("acp-toast-container"));
    }

    get moveToPastErrorDialog(): Locator {
        return (this._moveToPastErrorDialog ??= this._page.getByTestId("medsMoveToPastErrorAlert"));
    }

    get leaveInCurrentButton(): Locator {
        return (this._leaveInCurrentButton ??= this._page.getByTestId("recordDrug-leaveInCurrent"));
    }

    get moveToPastButton(): Locator {
        return (this._moveToPastButton ??= this._page.getByTestId("recordDrug-moveToPast"));
    }

    get highWarningPopup(): Locator {
        return (this._highWarningPopup ??= this._page.getByTestId("clinical-warning__npsa-dialog-alert-testId"));
    }

    get highWarningPopupProceedButton(): Locator {
        return (this._highWarningPopupProceedButton ??= this._page.getByTestId("clinical-warning__npsa-dialog-proceed-testId"));
    }

    get noResultsFoundDialog(): Locator {
        return (this._noResultsFoundDialog ??= this._page.getByTestId("textOnlyItem"));
    }

    get dosageText(): Locator {
        return (this._dosageText ??= this._page.getByTestId("dosageFormElement"));
    }

    get editDosage(): Locator {
        return (this._editDosage ??= this._page.getByTestId("edit-dosage"));
    }

    get clearButton(): Locator {
        return (this._clearButton ??= this._page.locator("button.Combobox_clear_Ec-8TsGT"));
    }

    get dosageDropdown(): Locator {
        return (this._dosageDropdown ??= this._page.getByTestId("dosageSearchItem"));
    }

    get dosageDropdownButton(): Locator {
        return (this._dosageDropdownButton ??= this._page
            .locator('button[aria-label="Show suggestions"][data-icon-only="true"][data-dd-action-name="Button"][data-variant="custom"]')
            .first()
        );
    }

    get dosageDropdownOptions(): Locator {
        return (this._dosageDropdownOptions ??= this._page.locator('li[role="option"]'));
    }

    get drugInfoWarningProceedButton(): Locator {
        return (this._drugInfoWarningProceedButton ??= this._page.getByTestId('clinical-warning__dialog-Proceed-testId'));
    }
}