import type { Locator, Page } from "@playwright/test";

type ClinicalWarning_Buttons = {
  back_clinicalWarnings: Locator;
  proceed_clinicalWarnings: Locator;
  close_clinicalWarnings: Locator;
  proceed_npsa: Locator;
  doNotProceed_npsa: Locator;
  tryAgain_ApiFailure: Locator;
}

export class ClinicalWarningPopupPage {

  private _button: ClinicalWarning_Buttons;
  private _clinicalWarningDialogHeader: Locator;
  private _highTag: Locator;
  private _NoneWarning: Locator;
  private _clinicalWarningMessage: Locator;
  private _loadingSpinner: Locator;
  private _viewButton: Locator;
  private _clinicalWarningDialogHeaderCloseButton: Locator;

  constructor(private readonly _page: Page) { }

  get button(): ClinicalWarning_Buttons {
    if (!this._button) {
      this._button = {
        back_clinicalWarnings: this._page.getByTestId("clinical-warning__dialog-Back-testId"),
        proceed_clinicalWarnings: this._page.getByTestId("clinical-warning__dialog-Proceed-testId"),
        close_clinicalWarnings: this._page.getByTestId("clinical-warning__dialog-Close-testId"),
        proceed_npsa: this._page.getByTestId("clinical-warning__npsa-dialog-proceed-testId"),
        doNotProceed_npsa: this._page.getByTestId("clinical-warning__npsa-dialog-do-not-proceed-testId"),
        tryAgain_ApiFailure: this._page.getByTestId("btn-banner-try-again")
      };
    }
    return this._button;
  }

  get clinicalWarningDialogHeader(): Locator {
    return (this._clinicalWarningDialogHeader ??= this._page.getByTestId("clinical-warning__dialog-warning-container-header-testId"));
  }

  get highTag(): Locator {
    return (this._highTag ??= this._page.getByText("High"));
  }

  get NoneWarning(): Locator {
    return (this._NoneWarning ??= this._page.getByText("Warnings: None"));
  }

  get clinicalWarningMessage(): Locator {
    return (this._clinicalWarningMessage ??= this._page.locator("//div[@class='clinical-warning__dialog-warning-container-section-banner-condition-codes']"));
  }

  get loadingSpinner(): Locator {
    return (this._loadingSpinner ??= this._page.getByTestId("loading-screen"));
  }

  get viewButton(): Locator {
    return (this._viewButton ??= this._page.getByTestId("clinical-warning__badge-section-button-testId"));
  }

  get clinicalWarningDialogHeaderCloseButton(): Locator {
    return (this._clinicalWarningDialogHeaderCloseButton ??= this._page.getByTestId("dialog-header-close-button"));
  }

  get clinicalWarningsApiFailureErrorDialog(): Locator {
    return this._page.getByTestId("clinical-warning-api-failure-banner-testId");
  }

  get clinicalWarningsErrorTryAgainButton(): Locator {
    return this._page.getByTestId("clinical-warning-api-failure-try-again-button-testId");
  }

}