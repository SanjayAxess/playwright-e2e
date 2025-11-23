import { expect, Page } from "@playwright/test";
import { ClinicalWarningPopupPage } from "../pages/clinical-warning-popup-page";

export class ClinicalWarningPopupActions {
    protected clinicalWarningPopupPage: ClinicalWarningPopupPage;

    constructor(protected readonly _page: Page) {
        this.clinicalWarningPopupPage = new ClinicalWarningPopupPage(this._page);

    }

    async proceedWithClinicalWarningWindow() {
        await this.clinicalWarningPopupPage.loadingSpinner.waitFor({ state: "hidden" });
        if (!await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.isVisible() && await this.clinicalWarningPopupPage.button.tryAgain_ApiFailure.isVisible()) {
            await this.clinicalWarningPopupPage.button.tryAgain_ApiFailure.click();
            await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.waitFor({ state: "visible" });
            await this.clinicalWarningPopupPage.clinicalWarningMessage.last().scrollIntoViewIfNeeded();
            await this.clinicalWarningPopupPage.button.proceed_clinicalWarnings.click();
        } else if (!await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.isVisible() && await this.clinicalWarningPopupPage.NoneWarning.isVisible()) {
            return;
        } else if (await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.isVisible()) {
            await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.waitFor({ state: "visible" });
            if (await this.clinicalWarningPopupPage.clinicalWarningMessage.isVisible()) {
                await this.clinicalWarningPopupPage.clinicalWarningMessage.last().scrollIntoViewIfNeeded();
            }
            await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.hover();
            await this._page.mouse.wheel(0, 50000);
            await this.clinicalWarningPopupPage.button.proceed_clinicalWarnings.click();
        } else if (!await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.isVisible() && await this.clinicalWarningPopupPage.button.proceed_npsa.isVisible()) {
            await this.clinicalWarningPopupPage.button.proceed_npsa.click();
            await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.waitFor({ state: "visible" });
            if (await this.clinicalWarningPopupPage.clinicalWarningMessage.isVisible()) {
                await this.clinicalWarningPopupPage.clinicalWarningMessage.last().scrollIntoViewIfNeeded();
            }
            await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.hover();
            await this._page.mouse.wheel(0, 50000);
            await this.clinicalWarningPopupPage.button.proceed_clinicalWarnings.click();
        }
    }

    async verifyCDStatusText(CDText: string) {
        await this.clinicalWarningPopupPage.clinicalWarningDialogHeader.isVisible();
        await expect(this.clinicalWarningPopupPage.clinicalWarningDialogHeader).toContainText(CDText);
        await this.clinicalWarningPopupPage.clinicalWarningDialogHeaderCloseButton.click();
    }


    async clickViewButtonandverifyCDStatusText(CDText: string) {
        await this.clinicalWarningPopupPage.viewButton.isVisible();
        await this.clinicalWarningPopupPage.viewButton.click();
        await expect(this.clinicalWarningPopupPage.clinicalWarningDialogHeader).toContainText(CDText);
        await this.clinicalWarningPopupPage.button.close_clinicalWarnings.click();
    }

    async clickClinicalWarningsErrorTryAgainButton() {
        await this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton.click();
    }

    async verifyClinicalWarningsApiErrorDialog() {
        await this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog.isVisible();
        await expect(this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog).toContainText("Cannot record medication");
        await expect(this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog).toContainText("EMIS-X couldn't load clinical decision support. Try loading again or record the medication in EMIS Web instead.");
        await this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton.isVisible();
        await expect(this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton).toContainText("Try again");
        await this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton.click();
        await this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog.isVisible();
        await expect(this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog).toContainText("Cannot record medication");
        await expect(this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog).toContainText("EMIS-X couldn't load clinical decision support. Try loading again or record the medication in EMIS Web instead.");
        await this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton.isVisible();
        await expect(this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton).toContainText("Try again");
        await this._page.unroute('**/prescriber-warnings');
        await this.clinicalWarningPopupPage.clinicalWarningsErrorTryAgainButton.click();
        await expect(this.clinicalWarningPopupPage.clinicalWarningsApiFailureErrorDialog).not.toBeVisible();
    }

}
