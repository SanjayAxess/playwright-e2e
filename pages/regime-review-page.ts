import type { Locator, Page, Route } from "@playwright/test";

export class RegimeReviewPage {
    private _currentReviewDateLabel: Locator;
    private _currentReviewDateTextBox: Locator;
    private _datePicker: Locator;
    private _datePickerTextBox: Locator;
    private _dayLocator: Locator;
    private _nextReviewDateLabel: Locator;
    private _reviewCodeLabel: Locator;
    private _reviewDueDropdown: Locator;
    private _reviewOverDueDropdown: Locator;
    private _reviewDueDropdownMenuContent: Locator;
    private _reviewMenu: Locator;
    private _regimeReviewPanel: Locator;
    private _regimeReviewCloseButton: Locator;
    private _setReviewDateButton: Locator;
    private _reviewDateIcon: Locator;
    private _eachReviewCodeTypeButton: Locator;
    private _eachReviewCodeType: Locator;
    private _cancelButton: Locator;
    private _defaultRadioButton: Locator;
    private _discardErrorBanner: Locator;
    private _discardCloseButton: Locator;
    private _discardCancelButton: Locator;
    private _discardButton: Locator;
    private _regimeReviewCancelButton: Locator;
    private _discardErrorText: Locator;
    private _removeReviewDateOption: Locator;
    private _removeReviewDateAlertPanel: Locator;
    private _removeReviewAlertPanelCancelButton: Locator;
    private _removeReviewAlertPanelCloseButton: Locator;
    private _removeReviewAlertPanelRemoveButton: Locator;
    private _removeRegimeReviewLabel: Locator;
    private _removeReviewAlertPanelTexts: Locator;
    private _removeReviewDateApiErrorBanner: Locator;
    private _removeReviewDateApiErrorMessage: Locator;
    private _datePickerErrorMessage: Locator;
    private _regimeReviewPanelOkButton: Locator;
    private _reviewOption: Locator;
    private _validationBanner: Locator;
    private _validationBannerText: Locator;
    private _rHSPanelBadgesAndDrugNameDiv: Locator;
    private _reviewCodeSection: Locator;
    private readonly _page: Page;

    private _allReviewCodes: string[];
    readonly email: string;
    readonly pass: string;
    readonly grant_type: string;
    readonly client_id: string;
    readonly scope: string;
    readonly response_type: string;
    readonly tokenUrl: string;
    apiToken: string;
    status: number;

    constructor(page: Page) {
        this._page = page;
    }

    get currentReviewDateLabel(): Locator {
        return (this._currentReviewDateLabel ??= this._page.locator("//label[@for='currentReviewDateField']"));
    }

    get currentReviewDateTextBox(): Locator {
        return (this._currentReviewDateTextBox ??= this._page.locator("//input[@id='currentReviewDateId']"));
    }

    get datePicker(): Locator {
        return (this._datePicker ??= this._page.locator("//button[@title='Select date']"));
    }

    get datePickerTextBox(): Locator {
        return (this._datePickerTextBox ??= this._page.locator("(//input[@data-dd-action-name='Input'])[2]"));
    }

    get dayLocator(): Locator {
        return (this._dayLocator ??= this._page.locator("//button[@name='day']"));
    }

    get nextReviewDateLabel(): Locator {
        return (this._nextReviewDateLabel ??= this._page.locator("//label[@for='nextReviewDateField']"));
    }

    get reviewCodeLabel(): Locator {
        return (this._reviewCodeLabel ??= this._page.locator("//label[contains(text(),'Review code')]"));
    }

    get reviewDueDropdown(): Locator {
        return (this._reviewDueDropdown ??= this._page.locator("(//button[@data-testid='meds-review-due-button'])"));
    }

    get reviewOverDueDropdown(): Locator {
        return (this._reviewOverDueDropdown ??= this._page.locator("//button[@data-testid='meds-review-overdue-button']").nth(0));
    }

    get reviewDueDropdownMenuContent(): Locator {
        return (this._reviewDueDropdownMenuContent ??= this._page.locator("//div[@data-testid='dropdown-menu']"));
    }

    get reviewMenu(): Locator {
        return (this._reviewMenu ??= this._page.locator("//div[text()='Review']"));
    }

    get regimeReviewPanel(): Locator {
        return (this._regimeReviewPanel ??= this._page.locator("//div[@data-dd-action-name='DetailPanel']"));
    }

    get regimeReviewCloseButton(): Locator {
        return (this._regimeReviewCloseButton ??= this._page.locator("//button[@data-testid='detailPanel-close-button']"));
    }

    get reviewOption(): Locator {
        return (this._reviewOption ??= this._page.getByTestId("meds-dropdown-edit-review-button"));
    }
    // ...existing code...

    get setReviewDateButton(): Locator {
        return (this._setReviewDateButton ??= this._page.locator("(//div[text()='Set review date'])[1]"));
    }

    get reviewDateIcon(): Locator {
        return (this._reviewDateIcon ??= this._page.locator("//*[name()='title'][normalize-space()='Review date expired']"));
    }

    get eachReviewCodeTypeButton(): Locator {
        return (this._eachReviewCodeTypeButton ??= this._page.locator("(//div[@id='reviewCode']//div)//button"));
    }

    get eachReviewCodeType(): Locator {
        return (this._eachReviewCodeType ??= this._page.locator("(//div[@id='reviewCode']//div)"));
    }

    get cancelButton(): Locator {
        return (this._cancelButton ??= this._page.locator("//button[@data-testid='regimeReview-cancel-btn']"));
    }

    get defaultRadioButton(): Locator {
        return (this._defaultRadioButton ??= this._page.locator("//button[@aria-label='Medication review']"));
    }

    get discardErrorBanner(): Locator {
        return (this._discardErrorBanner ??= this._page.locator("//*[text()='Discard regime review?']"));
    }

    get discardCloseButton(): Locator {
        return (this._discardCloseButton ??= this._page.locator("//button[@data-testid='dialog-header-close-button']"));
    }

    get discardCancelButton(): Locator {
        return (this._discardCancelButton ??= this._page.locator("//button[@data-testid='medsWarningCancelButton']"));
    }

    get discardButton(): Locator {
        return (this._discardButton ??= this._page.locator("//button[@data-testid='medsWarningDiscardButton']"));
    }

    get regimeReviewCancelButton(): Locator {
        return (this._regimeReviewCancelButton ??= this._page.locator("//button[@data-testid='regimeReview-cancel-btn']"));
    }

    get discardErrorText(): Locator {
        return (this._discardErrorText ??= this._page.locator("//span[text()='There are unsaved changes. Are you sure you want to discard them?']"));
    }

    get removeReviewDateOption(): Locator {
        return (this._removeReviewDateOption ??= this._page.locator("//div[contains(text(),'Remove review date')]"));
    }

    get removeReviewDateAlertPanel(): Locator {
        return (this._removeReviewDateAlertPanel ??= this._page.locator("//div[@data-testid='alert']"));
    }

    get removeReviewAlertPanelCancelButton(): Locator {
        return (this._removeReviewAlertPanelCancelButton ??= this._page.locator("//button[@data-testid='remove-review-date-cancel']"));
    }

    get removeReviewAlertPanelCloseButton(): Locator {
        return (this._removeReviewAlertPanelCloseButton ??= this._page.locator("//button[@data-testid='dialog-header-close-button']"));
    }

    get removeReviewAlertPanelRemoveButton(): Locator {
        return (this._removeReviewAlertPanelRemoveButton ??= this._page.locator("//button[@data-testid='remove-review-date-button']"));
    }

    get removeRegimeReviewLabel(): Locator {
        return (this._removeRegimeReviewLabel ??= this._page.locator("//div[text()='Remove regime review date']"));
    }

    get removeReviewAlertPanelTexts(): Locator {
        return (this._removeReviewAlertPanelTexts ??= this._page.locator("//div[@data-testid='dialog-content']"));
    }

    get removeReviewDateApiErrorBanner(): Locator {
        return (this._removeReviewDateApiErrorBanner ??= this._page.locator("//div[@data-testid='remove-alert-validation-banner']"));
    }

    get removeReviewDateApiErrorMessage(): Locator {
        return (this._removeReviewDateApiErrorMessage ??= this._page.locator("(//div[@data-testid='remove-alert-validation-banner']//div)[3]"));
    }

    get datePickerErrorMessage(): Locator {
        return (this._datePickerErrorMessage ??= this._page.locator("(//label[text()='Next patient review date or duration']/following-sibling::div)[2]"));
    }

    get regimeReviewPanelOkButton(): Locator {
        return (this._regimeReviewPanelOkButton ??= this._page.locator("//button[@data-testid='regimeReview-ok-btn']"));
    }

    get validationBanner(): Locator {
        return (this._validationBanner ??= this._page.locator("//div[@data-testid='validation-banner']"));
    }

    get validationBannerText(): Locator {
        return (this._validationBannerText ??= this._page.locator("//div[@data-testid='validation-banner-content']//div[1]"));
    }

    get rHSPanelBadgesAndDrugNameDiv(): Locator {
        return (this._rHSPanelBadgesAndDrugNameDiv ??= this._page.locator("//div[@data-testid='medication-details-panel']"));
    }

    get reviewCodeSection(): Locator {
        return (this._reviewCodeSection ??= this._page.locator("//div[@data-testid='reviewCodeElement']"));
    }

    get allReviewCodes(): string[] {
        return this._allReviewCodes = [
            'Trainee medical technician (247879015)',
            'Medically retired (250857018)',
            'M.E.Association member (251193010)',
            'Taxi cab driver medical exam (265514016)',
            'Fostering medical examination (265567016)',
            'Medication review (282653015) (default)',
            'Allergic rhinitis due to pollen (348109017)',
            'Medication review due (458904017)',
            'Heart failure annual review (1484918019)',
            'Glandular fever screening test (1485543011)',
            'Asthma medication review (1488436019)',
            'Coronary heart disease medication review (1488440011)',
            'Diabetes medication review (1488441010)',
            'Patient medication advice (1488540013)',
            'Med3 certificate issued to patient (11561000000115)',
            'Medication review with patient (137851000000113)',
            'Medical practitioner (712111000006112)',
            '[RFC] Myalgic encephalomyelitis (ME) (915641000006116)',
            'People who are important to me (14918711000006110)',
            'How I communicate and how to communicate with me (14918731000006116)',
            'None'
        ];
    }
}
