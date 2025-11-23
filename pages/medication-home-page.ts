import type { Locator, Page } from "@playwright/test";

type Medication_Buttons = {
  prescribe_large: Locator;
  prescribe_medium: Locator;
  prescribe_small: Locator;
  toastNotification_X: Locator;
}

type Search_Medication = {
  current: Locator;
  past: Locator;
}

type CurrentMedication_MoreOptions = {
  three_dots: Locator;
  addToPrescription: Locator;
}

type ViewOptions = {
  viewOptionsButton: Locator;
  formElement: Locator;
  CurrentTab: Locator;
  PastTab: Locator;
  GroupBy_PrescriptionType: Locator;
  GroupBy_DontGroup: Locator;
  SortBy_Name: Locator;
  SortBy_LastIssueDate: Locator;
  CancelButton: Locator;
  X_Button: Locator;
  ApplyButton: Locator;
}

type MsmToolBar_Options = {
  msmToolBarClearIcon: Locator;
  msmToolBarSelectedText: Locator;
  msmToolBarCancelLatestIssueButton: Locator;
  msmThreeDotsButton: Locator;
  msmToolBarMenuCancelLatestIssueButton: Locator;
}

export class MedicationHomePage {

  private _button: Medication_Buttons;
  private _toastNotificationsText: Locator;
  private _searchMedication: Search_Medication;
  private _currentMedicationMoreOptions: CurrentMedication_MoreOptions;
  private _currentMedicationTab: Locator;
  private _pastMedicationTab: Locator;
  private _medsRefreshButton: Locator;
  private _firstMedicationCheckboxCurrentTab: Locator;
  private _secondMedicationCheckboxCurrentTab: Locator;
  private _thirdMedicationCheckboxCurrentTab: Locator;
  private _msmToolBar: MsmToolBar_Options;
  private _eachMedicationCheckbox: Locator;
  private _acuteFirstDrugRow: Locator;
  private _hyperlinkInDrugs: Locator;
  private _detailsPanel: Locator;
  private _msmCancelIssueButtonTooltip: Locator;
  private _pfsIcon: Locator;
  private _noMedicationFoundIcon: Locator;
  private _noMedicationFoundText: Locator;
  private _noResultsMedicationFoundIcon: Locator;
  private _noResultsMedicationFoundText: Locator;
  private _medsApiErrorIcon: Locator;
  private _medsApiErrorText: Locator;
  private _medsApiErrorRetryButton: Locator;
  private _medsFirstSubheader: Locator;
  private _medsSecondSubheader: Locator;
  private _viewOptions: ViewOptions;
  private _btnGroupSortCloseButton: Locator;
  private _btnGroupSortApplyButton: Locator;
  private _detailPanelCloseButton: Locator;
  private _btnGroupSortOpenButton: Locator;
  private _currentMoreOptionsButton: Locator;
  private _medicationNameCurrent: Locator;
  private _medicationNamePast: Locator;
  private _medsWarningDiscardButton: Locator;
  private _medsWarningCancelButton: Locator;
  private _medsWarningDialogCloseButton: Locator;
  private _medsWarningAlertIcon: Locator;
  private _medsDiscardWarning: Locator;
  private _validationBannerContent: Locator;
  private _showMorePharmacyButton: Locator;
  private _showLessPharmacyButton: Locator;
  private _showMorePatientButton: Locator;
  private _showLessPatientButton: Locator;
  private _pharmacyInfoTitle: Locator;
  private _patientInfoTitle: Locator;
  private _patientInfoText: Locator;
  private _pharmacyInfoText: Locator;




  constructor(private readonly _page: Page) { }

  get button(): Medication_Buttons {
    if (!this._button) {
      this._button = {
        prescribe_large: this._page.getByTestId("meds-prescribe-large-button"),
        prescribe_medium: this._page.getByTestId("meds-prescribe-medium-button"),
        prescribe_small: this._page.getByTestId("meds-prescribe-small-button"),
        toastNotification_X: this._page.getByTestId("close-button-test-id")
      };
    }
    return this._button;
  }

  get searchMedication(): Search_Medication {
    if (!this._searchMedication) {
      this._searchMedication = {
        current: this._page.locator("//input[@placeholder='Search current medication']"),
        past: this._page.locator("//input[@placeholder='Search past medication']"),
      };
    }
    return this._searchMedication;
  }

  get toastNotificationsText(): Locator {
    return (this._toastNotificationsText ??= this._page
      .getByTestId("acp-toast-container")
      .filter({ hasText: /Refresh Medication page to view/ })
      .first()
    );
  }

  get currentMedicationMoreOptions(): CurrentMedication_MoreOptions {
    if (!this._currentMedicationMoreOptions) {
      this._currentMedicationMoreOptions = {
        three_dots: this._page.getByTestId("currentMoreOptionsButton"),
        addToPrescription: this._page.getByTestId("currentMedsAddToPrescription")
      };
    }
    return this._currentMedicationMoreOptions;
  }

  get currentMedicationTab(): Locator {
    return (this._currentMedicationTab ??= this._page.getByTestId("med-tabs-Current-button"));
  }

  get pastMedicationTab(): Locator {
    return (this._pastMedicationTab = this._page.getByTestId("med-tabs-Past-button"));
  }

  get medsRefreshButton(): Locator {
    return (this._medsRefreshButton ??= this._page.getByTestId("meds-refresh-button"));
  }

  getMedicationCheckboxCurrentTab(index: number): Locator {
    return this._page.getByTestId('meds-table-body-Acute').getByTestId(`checkbox-${index}`);
  }

  get eachMedicationCheckbox(): Locator {
    return (this._eachMedicationCheckbox ??= this._page.locator("//*[contains(@data-testid,\"checkbox-\")]"));
  }

  get acuteFirstDrugRow(): Locator {
    return (this._acuteFirstDrugRow ??= this._page.locator("//*[@data-testid='meds-table-body-Acute']/tr[2]"));
  }

  get hyperlinkInDrugs(): Locator {
    return (this._hyperlinkInDrugs ??= this._page.getByTestId('preparation-btn-Avanafil 50mg tablets'));
  }

  get detailsPanel(): Locator {
    return (this._detailsPanel ??= this._page.getByTestId('medication-details-panel'));
  }

  get msmToolBar(): MsmToolBar_Options {
    if (!this._msmToolBar) {
      this._msmToolBar = {
        msmToolBarClearIcon: this._page.getByTestId('msm-toolbar-selected-block-clear-btn'),
        msmToolBarSelectedText: this._page.getByTestId('msm-toolbar-selected-text'),
        msmToolBarCancelLatestIssueButton: this._page.locator("//*[@data-testid='msm-toolbar-action-btn-cancel-latest-issue']"),
        msmThreeDotsButton: this._page.getByTestId('msm-more-options-btn-icon'),
        msmToolBarMenuCancelLatestIssueButton: this._page.locator("//*[@data-testid='msm-toolbar-action-menu-btn-cancel-latest-issue']"),
      };
    }
    return this._msmToolBar;
  }

  get firstRowEachValue(): Locator {
    return this._page.locator("(//tbody[contains(@data-testid,'meds-table-body')])/tr[2]/td");
  }

  get firstRowEachValueForPast(): Locator {
    return this._page.locator("(//tbody[contains(@data-testid,'meds-past-table-body-nogroup')])/tr/td");
  }

  get msmCancelIssueButtonTooltip(): Locator {
    return (this._msmCancelIssueButtonTooltip ??= this._page.getByTestId('listItemControlForMSMToolbarActionButton-children').first());
  }

  get currentMedicationEditButton(): Locator {
    return this._page.getByTestId("currentMedsEditDrug");
  }

  get patientSearchField(): Locator {
    return this._page.locator("[data-testid='searchbox-testid']").nth(0);
  }

  getPatientResult(patientName: string): Locator {
    return this._page.locator(`[data-testid="patient-quicksearch-listitem-testid"]`, { hasText: patientName });
  }

  get medicationOption(): Locator {
    return this._page.locator(`[data-testid="secondary-menu-item-medication"]`);
  }

  get pfsIcon(): Locator {
    return (this._pfsIcon ??= this._page.getByTestId('meds-pfs-icon'));
  }

  get noMedicationFoundIcon(): Locator {
    return (this._noMedicationFoundIcon ??= this._page.getByTestId('meds-no-medication-found-icon'));
  }

  get noMedicationFoundText(): Locator {
    return (this._noMedicationFoundText ??= this._page.getByTestId('meds-no-medication-found'));
  }

  get noResultsMedicationFoundIcon(): Locator {
    return (this._noResultsMedicationFoundIcon ??= this._page.getByTestId('meds-no-search-results-icon'));
  }

  get noResultsMedicationFoundText(): Locator {
    return (this._noResultsMedicationFoundText ??= this._page.getByTestId('meds-no-search-results'));
  }

  get medsApiErrorIcon(): Locator {
    return (this._medsApiErrorIcon ??= this._page.getByTestId('system-problem'));
  }

  get medsApiErrorText(): Locator {
    return (this._medsApiErrorText ??= this._page.getByTestId('meds-api-failed'));
  }

  get medsApiErrorRetryButton(): Locator {
    return (this._medsApiErrorRetryButton ??= this._page.getByTestId('status-retry-button'));
  }

  get sharedDataBanner(): Locator {
    return this._page.getByTestId("shared-data-banner");
  }

  get sharedDataDismissButton(): Locator {
    return this._page.getByTestId("dismiss-button");
  }

  get confidentialPageHeader(): Locator {
    return this._page.getByTestId("confidentialpage-header");
  }

  get confidentialPagInstructions(): Locator {
    return this._page.getByTestId("confidentialpage-instructions");
  }

  get confidentialPageAccess(): Locator {
    return this._page.getByTestId("confidentialpage-access");
  }

  get confidentialErrorPageHeader(): Locator {
    return this._page.getByTestId("confidentialpage-access");
  }

  get confidentialErrorPageInstructions(): Locator {
    return this._page.getByTestId("confidentialpage-access");
  }

  get medicationTopBar(): Locator {
    return this._page.getByTestId("top-bar");
  }

  get patientBanner(): Locator {
    return this._page.getByTestId("banner-zone1-patient-name");
  }

  get currentMeds(): Locator {
    return this._page.getByTestId("med-container");
  }


  get viewOptions(): ViewOptions {
    if (!this._viewOptions) {
      this._viewOptions = {
        viewOptionsButton: this._page.getByTestId('btn-group-sort-open'),
        formElement: this._page.getByTestId('dialog'),
        CurrentTab: this._page.getByTestId('medsViewOptions-Current-button'),
        PastTab: this._page.getByTestId('medsViewOptions-Past-button'),
        GroupBy_PrescriptionType: this._page.locator("//*[@id='prescriptionType']"),
        GroupBy_DontGroup: this._page.locator("//*[@id='noGroup']"),
        SortBy_Name: this._page.locator("//*[@id='drugName']"),
        SortBy_LastIssueDate: this._page.locator("//*[@id='latestIssueDate']"),
        CancelButton: this._page.getByTestId('btn-group-sort-close'),
        X_Button: this._page.getByTestId('dialog-header-close-button'),
        ApplyButton: this._page.getByTestId('btn-group-sort-apply'),
      };
    }
    return this._viewOptions;
  }

  get medsFirstSubheader(): Locator {
    return (this._medsFirstSubheader ??= this._page.getByTestId('meds-tbody-subheader-0'));
  }

  get medsSecondSubheader(): Locator {
    return (this._medsSecondSubheader ??= this._page.getByTestId('meds-tbody-subheader-1'));
  }

  get btnGroupSortOpenButton(): Locator {
    return (this._btnGroupSortOpenButton ??= this._page.getByTestId('btn-group-sort-open'));
  }

  get btnGroupSortCloseButton(): Locator {
    return (this._btnGroupSortCloseButton ??= this._page.getByTestId('btn-group-sort-close'));
  }

  get btnGroupSortApplyButton(): Locator {
    return (this._btnGroupSortApplyButton ??= this._page.getByTestId('btn-group-sort-apply'));
  }

  get detailPanelCloseButton(): Locator {
    return (this._detailPanelCloseButton ??= this._page.getByTestId('detailPanel-close-button'));
  }

  get currentMoreOptionsButton(): Locator {
    return (this._currentMoreOptionsButton ??= this._page.getByTestId('currentMoreOptionsButton'));
  }

  get medicationNameCurrent(): Locator {
    return (this._medicationNameCurrent ??= this._page.locator("//*[@data-testid='meds-table-body-Acute']/tr[2]/td[2]/div/div[1]/div/button/span"));
  }

  get medicationNamePast(): Locator {
    return (this._medicationNamePast ??= this._page.locator("//*[@data-testid='med-table']/div//tbody/tr[1]/td[1]/div/div[1]/div/button/span"));
  }

  get pastMoreOptionsButton(): Locator {
    return this._page.getByTestId('pastMoreOptionsButton');
  }

  get medsWarningDiscardButton(): Locator {
    return (this._medsWarningDiscardButton ??= this._page.getByTestId('medsWarningDiscardButton'));
  }

  get medsWarningCancelButton(): Locator {
    return (this._medsWarningCancelButton ??= this._page.getByTestId('medsWarningCancelButton'));
  }

  get medsWarningDialogCloseButton(): Locator {
    return (this._medsWarningDialogCloseButton ??= this._page.getByTestId('dialog-header-close-button'));
  }

  get medsWarningAlertIcon(): Locator {
    return (this._medsWarningAlertIcon ??= this._page.getByTestId('alert-warn-icon'));
  }

  get medsDiscardWarning(): Locator {
    return (this._medsDiscardWarning ??= this._page.getByTestId('medsDiscardWarning'));
  }

  get validationBannerContent(): Locator {
    return this._validationBannerContent ??= this._page.getByTestId("validation-banner-content");
  }

  get pharmacyInfoShowMoreButton(): Locator {
    return (this._showMorePharmacyButton ??= this._page.getByTestId("pharmacyInfo-showMore-btn"));
  }

  get pharmacyInfoShowLessButton(): Locator {
    return (this._showLessPharmacyButton ??= this._page.getByTestId("pharmacyInfo-showLess-btn"));
  }

  get patientInfoShowMoreButton(): Locator {
    return (this._showMorePatientButton ??= this._page.getByTestId("patientInfo-showMore-btn"));
  }

  get patientInfoShowLessButton(): Locator {
    return (this._showLessPatientButton ??= this._page.getByTestId("patientInfo-showLess-btn"));
  }

  get pharmacyInfoTitle(): Locator {
    return (this._pharmacyInfoTitle ??= this._page.getByTestId("meds-pharmacyInfo-title"));
  }

  get patientInfoTitle(): Locator {
    return (this._patientInfoTitle ??= this._page.getByTestId("meds-patientInfo-title"));
  }

  get patientInfoText(): Locator {
    return (this._patientInfoText ??= this._page.getByTestId("meds-patientInfo-text"));
  }

  get pharmacyInfoText(): Locator {
    return (this._pharmacyInfoText ??= this._page.getByTestId("meds-pharmacyInfo-text"));
  }

  getPharmacyInfoShowMoreButtonForTheMedication(medicationName: string): Locator {
    return this._page.locator(`//tr[td//span[contains(text(),'${medicationName}')]]/td//button[@data-testid='pharmacyInfo-showMore-btn']`);
  }

  getPharmacyInfoShowLessButtonForTheMedication(medicationName: string): Locator {
    return this._page.locator(`//tr[td//span[contains(text(),'${medicationName}')]]/td//button[@data-testid='pharmacyInfo-showLess-btn']`);
  }

  getPatientInfoShowMoreButtonForTheMedication(medicationName: string): Locator {
    return this._page.locator(`//tr[td//span[contains(text(),'${medicationName}')]]/td//button[@data-testid='patientInfo-showMore-btn']`);
  }

  getPatientInfoShowLessButtonForTheMedication(medicationName: string): Locator {
    return this._page.locator(`//tr[td//span[contains(text(),'${medicationName}')]]/td//button[@data-testid='patientInfo-showLess-btn']`);
  }

  get patientInfoMoreText(): string {
    return "Priya Ramesh, a 40-year-old resident of Anna Nagar, Chennai, visited MedPlus Pharmacy on Arcot Road to refill her prescription for diabetes and hypertension medications.";
  }

  get pharmacyInfoMoreText(): string {
    return "MedPlus, licensed under TN/PH/2023/11234, also offered to deliver the medicines to her home and provided a complimentary blood sugar test as part of their customer care services.";
  }

  get patientInfoLessText(): string {
    return "Priya Ramesh, a 40-year-old resident of Anna Nagar, Chennai";
  }

  get pharmacyInfoLessText(): string {
    return "MedPlus, licensed under TN/PH/2023/11234";
  }

}