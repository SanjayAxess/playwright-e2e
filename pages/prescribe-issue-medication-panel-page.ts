import type { Locator, Page } from "@playwright/test";
import { ComboBox, SearchComboBox, TextBox, DateInput, Checkbox } from "../types";

type IssueMedication_Buttons = {
  issue: Locator;
  issueLater: Locator;
  tryAgain_failure: Locator;
  issuePanel_X: Locator;
  discard_close: Locator;
  eps_Proceed: Locator;
  eps_DoNotProceed: Locator;
  epsConsentPanel_X: Locator;
  cancelSigning: Locator;
  epsErrorPopup_Close: Locator;
  postDate_Apply: Locator;
}

type EPS_Errors = {
  non_eps_error: Locator;
  eps_retry_error: Locator;
  eps_non_retry_error: Locator;
  eps_partial_retry_error: Locator;
  eps_partial_non_retry_error: Locator;
  eps_revalidation_error: Locator;
  clinical_warnings_and_eps_check_api_failure_error: Locator;
}

export class IssueMedicationPanelPage {
  private _button: IssueMedication_Buttons;
  private _issueMedicationTab: Locator;
  private _postDateIcon: Locator;
  private _postDateField: Locator;
  private _pharmacyAddress3Dots: Locator;
  private _pharmacyAddressTooltip: Locator;
  private _epsBatch: Locator;
  private _lastDrugInIssueList: Locator;
  private _dummyTokenTextbox: Locator;
  private _epsErrors: EPS_Errors;
  private _issueMethodHeaderInIssuePanel: Locator;
  private _postDateBatch: Locator;
  private _issueMedicationValidationBanner: Locator;
  private _UnavailableWarning: Locator;
  private _printMedicationWarning: Locator;
  private _lateIssueWarning: Locator;
  private _maximumIntervalWarning: Locator;
  private _minimumIntervalWarning: Locator;
  private _eachWarning: Locator;
  private _alreadyIssuedTodayWarning: Locator;
  constructor(private readonly _page: Page) { }

  get button(): IssueMedication_Buttons {
    if (!this._button) {
      this._button = {
        issue: this._page.getByTestId("issueButton"),
        issueLater: this._page.getByTestId("issueLaterButton"),
        tryAgain_failure: this._page.getByTestId("btn-banner-try-again"),
        issuePanel_X: this._page.getByTestId("detailPanel-close-button"),
        discard_close: this._page.getByTestId("medsWarningDiscardButton"),
        eps_Proceed: this._page.getByTestId("eps-consent-proceed"),
        eps_DoNotProceed: this._page.getByTestId("eps-consent-do-not-proceed"),
        epsConsentPanel_X: this._page.getByTestId("dialog-header-close-button"),
        cancelSigning: this._page.getByTestId("btn-cancel-signing"),
        epsErrorPopup_Close: this._page.getByTestId("eps-issue-alert-close-button"),
        postDate_Apply: this._page.getByTestId("postdateApplyButton")
      };
    }
    return this._button;
  }

  get epsErrors(): EPS_Errors {
    if (!this._epsErrors) {
      this._epsErrors = {
        non_eps_error: this._page.getByTestId("generic-error-alert-content"),
        eps_retry_error: this._page.getByTestId("eps-issue-retriable-error-alert-content"),
        eps_non_retry_error: this._page.getByTestId("eps-issue-non-retriable-error-alert-content"),
        eps_partial_retry_error: this._page.getByTestId("eps-issue-partial-retriable-error-alert-content"),
        eps_partial_non_retry_error: this._page.getByTestId("eps-issue-partial-non-retriable-error-alert-content"),
        eps_revalidation_error: this._page.getByTestId("eps-issue-revalidation-error-alert-content"),
        clinical_warnings_and_eps_check_api_failure_error: this._page.getByTestId("eps-check-error-banner")
      };
    }
    return this._epsErrors;
  }

  get issueMedicationTab(): Locator {
    return (this._issueMedicationTab ??= this._page.getByTestId("meds-pkg-issue-tab"));
  }

  get postDateIcon(): Locator {
    return (this._postDateIcon ??= this._page.getByTestId("postdateButton"));
  }

  get postDateField(): Locator {
    return (this._postDateField ??= this._page.getByTestId("postDate0"));
  }

  get postDateBatch(): Locator {
    return (this._postDateBatch ??= this._page.getByTestId("postdateBadge"));
  }

  get postDateDialog(): Locator {
    return this._page.getByTestId("dialog");
  }

  get noOfPostDatePrescription(): Locator {
    return this._page.getByTestId("numberOfPostDatePrescriptionElement");
  }

  get noOfPostDatePrescriptionTextBox(): Locator {
    return this._page.getByTestId("numberOfPostDatePrescription");
  }

  get firstPrescriptionDate(): Locator {
    return this._page.getByTestId("postDate0");
  }

  get removePostdate(): Locator {
    return this._page.getByTestId("postdateRemoveButton");
  }

  get cancelPostdate(): Locator {
    return this._page.getByTestId("postdateCancelButton");
  }

  get postdateValidation(): Locator {
    return this._page.getByTestId("postdateValidationError0");
  }

  get pharmacyAddress3Dots(): Locator {
    return (this._pharmacyAddress3Dots ??= this._page.getByTestId("custom-ellipsis"));
  }

  get pharmacyAddressTooltip(): Locator {
    return (this._pharmacyAddressTooltip ??= this._page.getByTestId("issue-method-header-pharmacy-tooltip"));
  }

  get epsBatch(): Locator {
    return (this._epsBatch ??= this._page.getByTestId("issue-method-header-eps-badge"));
  }

  get lastDrugInIssueList(): Locator {
    return (this._lastDrugInIssueList ??= this._page.locator("//*[contains(@data-testid,'issue-drug-detail-list-item')]").last());
  }

  get dummyTokenTextbox(): Locator {
    return (this._dummyTokenTextbox ??= this._page.getByTestId("input-signing-token"));
  }

  get issueMethodHeaderInIssuePanel(): Locator {
    return (this._issueMethodHeaderInIssuePanel ??= this._page.getByTestId("issue-method-header-container"));
  }

  get issuePanelDrugLists(): Locator {
    return this._page.locator("//*[contains(@data-testid,'issue-drug-detail-list-item') and contains(@data-testid,'children')]");
  }

  get issueMedicationValidationBanner(): Locator {
    return (this._issueMedicationValidationBanner ??= this._page.getByTestId("issue-validation-banner-content"));
  }

  get discardAlertIcon(): Locator {
    return this._page.getByTestId("alert-warn-icon");
  }

  get issueTabThreeDotsButton(): Locator {
    return this._page.getByTestId("issue-drug-more-options-icon");
  }

  get issueTabThreeDotsRemoveButton(): Locator {
    return this._page.getByTestId("issue-drug-remove-medication");
  }

  get issueTabNoMedication(): Locator {
    return this._page.locator("//*[@data-testid='no-medication-found']/div[2]");
  }

  get printMedicationWarning(): Locator {
    return (this._printMedicationWarning ??= this._page.getByTestId('issue-method-nhs-banner-content'));
  }

  get epsIssueBannerContent(): Locator {
    return this._page.getByTestId("issue-banner-content");
  }

  get epsIssueBannerClose(): Locator {
    return this._page.getByTestId("close-btn");
  }

  get reissueWarning(): Locator {
    return this._page.getByTestId("reissue-warning");
  }

  get lateIssueWarning(): Locator {
    return (this._lateIssueWarning ??= this._page.getByTestId("late-org-reissue-warning"));
  }

  get maximumIntervalWarning(): Locator {
    return (this._maximumIntervalWarning ??= this._page.getByTestId("late-course-reissue-warning"));
  }

  get minimumIntervalWarning(): Locator {
    return (this._minimumIntervalWarning ??= this._page.getByTestId("early-course-reissue-warning"));
  }

  get eachWarning(): Locator {
    return (this._eachWarning ??= this._page.locator("//div[@data-testid='reissue-warning']/div"));
  }

  get alreadyIssuedTodayWarning(): Locator {
    return (this._alreadyIssuedTodayWarning ??= this._page.getByTestId("reissue-warning"));
  }

}
