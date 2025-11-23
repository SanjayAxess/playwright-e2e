import { expect, Locator, Page } from "@playwright/test";
import { CancelMedicationPage } from "../pages/cancel-medication-page";
import { MedicationBadgesActions } from "./medication-badges-actions";
import { MedicationHomeActions } from "./medication-home-actions";
import { MedicationHomePage } from "../pages/medication-home-page";
import { CommonActions } from "./common-actions";
import cancel_latest_issue_response from "../mock_data/cancel_latest_issue_response.json";
export class CancelMedicationPanelActions {
    private page: Page;
    protected cancelMedicationPage: CancelMedicationPage;
    protected commonActions: CommonActions;
    protected MedicationHomeActions: MedicationHomeActions;
    protected medicationHomePage: MedicationHomePage;

    constructor(page: Page) {
        this.page = page;
        this.cancelMedicationPage = new CancelMedicationPage(this.page);
        this.commonActions = new CommonActions(this.page);
        this.MedicationHomeActions = new MedicationHomeActions(this.page);
        this.medicationHomePage = new MedicationHomePage(this.page);
    }

    async clickFirstKebabMenu() {
        await this.cancelMedicationPage.firstKebabMenu.click();
    }

    async clickCancelIssueOption() {
        await this.cancelMedicationPage.cancelLatestIssue.click();
    }

    async verifyCancelIssuePanel(MedsName: string) {
        await this.cancelMedicationPage.cancelLatestIssuePanel.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toBeVisible();
        await this.verifyCancelIssueDialogHeader("Cancel issue");
        await expect(this.cancelMedicationPage.cancellationReasonField).toContainText("Reason for cancelling");
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toContainText("Additional information");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText("Item");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toContainText("Latest issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelIssueButton).toContainText("Cancel issue");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toContainText("Don't cancel issue");
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toBeVisible();
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toContainText(MedsName);
        await expect(this.cancelMedicationPage.singleUnCancelMedicationIssueDate).toBeVisible();
    }

    async verifyMultipleDrugsCancelIssuePanel(numberOfDrugs: string) {
        await this.cancelMedicationPage.cancelLatestIssuePanel.waitFor({ state: "visible" });
        await this.verifyCancelIssueDialogHeader("Cancel issues");
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationReasonField).toContainText("Reason for cancelling");
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toContainText("Additional information");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText("Item(" + numberOfDrugs + ")");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toContainText("Latest issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelIssueButton).toContainText("Cancel issues");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toContainText("Don't cancel issues");
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
    }

    async clickCancelIssueButton() {
        await this.cancelMedicationPage.cancelIssueButton.click();
    }

    async verifyCancelNotificationPanel() {
        await this.cancelMedicationPage.cancelNotificationPanel.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toBeVisible();
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText("1 issue cancelled.");
    }

    async selectPrescribingErrorCancellationReason() {
        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        // await this.page.locator("//span[contains(text(),'Prescribing error')]").click();
        await this.cancelMedicationPage.prescribeErrorReasonOption.click();

    }

    async verifyTheCancellationErrorBanner() {
        // Implementation for verifying the cancellation error banner
    }

    async verifyInputFieldAcceptsOnly30CharactersAndSpecialCharacters() {
        const inputField = this.cancelMedicationPage.cancelAdditionalInformationInputField;

        const validInput = '123456789012345678901234567890';
        await inputField.fill(validInput);
        await expect(inputField).toHaveValue(validInput);

        const longInput = '12345678901234567890123456789012345';
        await inputField.fill(longInput);
        await expect(inputField).toHaveValue(validInput);

        const specialCharInput = '!@#$%^&*()_+{}|:"<>?';
        await inputField.fill(specialCharInput);
        await expect(inputField).toHaveValue(specialCharInput);
    }

    async verifyTheCancelIssuePanelIsClosed() {
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).not.toBeVisible();
    }

    async verifyTheCancelNotificationPanelIsClosed() {
        await expect(this.cancelMedicationPage.cancelNotificationPanel).not.toBeVisible();
    }

    async clickCancelAdditionalInformationInputField() {
        await this.cancelMedicationPage.cancelAdditionalInformationInputField.click();
    }

    async verifyCancelLatestIssueIsEnabled() {
        await expect(this.cancelMedicationPage.cancelLatestIssue).toBeVisible();
        await expect(this.cancelMedicationPage.cancelLatestIssue).toBeEnabled();
    }

    async verifyCancelLatestIssueIsNotEnabled() {
        await expect(this.cancelMedicationPage.cancelLatestIssue).toBeDisabled();
    }

    async clickTheErrorDialogBoxCloseButton() {
        await this.cancelMedicationPage.cancelIssueColumnSkeleton.waitFor({ state: "hidden" });
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
    }
    async verifyErrorDialogBoxForR_0005ErrorCode() {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Issue expired");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("This item is marked as expired. It can no longer be dispensed to the patient so no further action is required.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Click ‘Refresh’ on the Medication page for the updated issue status.");
    }

    async verifyTheErrorDialogBoxIsClosed() {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).not.toBeVisible();
    }

    async verifyTheColourOfTheElement(locator, color, cssVariable) {
        const element = locator;
        const variable = cssVariable;
        const colorOfTheElement = await element.evaluate((el, cssVar) => {
            const computedStyle = getComputedStyle(el);
            return computedStyle.getPropertyValue(cssVar).trim();
        }, cssVariable);
        await expect(colorOfTheElement).toEqual(color);
    }

    async verifyDownloadedByPharmacyErrorDialog(medication: string, dosage: string, quantity: string,) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Cannot cancel issue");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("This item is with the dispenser. Contact the dispenser to have them return this item to the NHS Spine.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Item");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Latest issue");
        await this.validateThePrescriptionIdDetails();
        await this.validateCopiedTextIsVisible(this.cancelMedicationPage.prescriptionIdValue);
        await this.verifyTheDispenserDetails();
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateTheMedicationDetailsInErrorDialog(medication, dosage, quantity);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("A cancellation rejection task has been created in EMIS Web Workflow Manager.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async verifyDownloadedByPharmacyAndDispenseActiveErrorDialog(medication: string, dosage: string, quantity: string,) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Cannot cancel issue");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("This item is with the dispenser. Contact the dispenser to have them return this item to the NHS Spine.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Item");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Latest issue");
        await this.validateThePrescriptionIdDetails();
        await this.validateCopiedTextIsVisible(this.cancelMedicationPage.prescriptionIdValue);
        await this.verifyTheDispenserDetails();
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateTheMedicationDetailsInErrorDialog(medication, dosage, quantity);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("A cancellation rejection task has been created in EMIS Web Workflow Manager.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async verifySpineNonRetryableErrorDialog(medication: string, dosage: string, quantity: string,) {
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toBeVisible();
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("Something went wrong");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("An error occurred and this item cannot be cancelled. Contact the patient directly to take the appropriate action.");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("Item");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("Latest issue");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(medication);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(dosage);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(quantity);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("Patient");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("FARADAY, Performance Test Two (Mrs)");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("Date of birth:");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("NHS number:");
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText("Mobile tel:");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async verifyErrorDialogBoxForR_0004ErrorCode(medication: string, dosage: string, quantity: string) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.alertErrorIcon).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issue");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("This item is marked as dispensed to patient. Contact the dispenser/patient directly to take appropriate action.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("A cancellation rejection task has been created in EMIS Web Workflow Manager.");
        await this.validateThePrescriptionIdDetails();
        await this.validateCopiedTextIsVisible(this.cancelMedicationPage.prescriptionIdValue);
        await this.verifyTheDispenserDetails();
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateTheMedicationDetailsInErrorDialog(medication, dosage, quantity);
    }

    async verifyErrorDialogBoxForR_0008ErrorCode(medicationName: string, today: string) {
        const labelName = "Technical error";
        const additionalText = "Try cancelling again."
        this.verifySingleCancellationUniversalErrorDialogBox(medicationName, today, labelName, additionalText);
        await expect(this.cancelMedicationPage.tryAgainButton).toBeVisible();
        // await expect(this.cancelMedicationPage.errorValidationBanner).toBeVisible();
        // await expect(this.cancelMedicationPage.cancelIssueButton).toBeVisible();
        // await expect(this.cancelMedicationPage.doNotCancelIssueButton).toBeVisible();
        // await expect(this.cancelMedicationPage.latestIssueTableHeader).toBeVisible();
        // await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toBeVisible();
        // await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText("Item");
        // await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toBeVisible();
        // await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toContainText("Latest issue");
        // await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toBeVisible();
        // await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toContainText(MedsName);
        // await expect(this.cancelMedicationPage.singleUnCancelMedicationIssueDate).toBeVisible();
        // await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("Cannot cancel issue");
        // await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("This item");
        // await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("cannot be found ");
        // await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("on the NHS Spine. Try cancelling again. If this error persists, use the");
        // await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("to check the prescription’s status and location.");
        // await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("EPS Prescription Tracker");
        // await expect(this.cancelMedicationPage.latestIssueTableHeader).toContainText("Cancel latest issue");
        // await expect(this.cancelMedicationPage.prescriptionIdLabel).toBeVisible();
        // await expect(this.cancelMedicationPage.prescriptionIdLabel).toContainText("Prescription ID: ");
        // await expect(this.cancelMedicationPage.prescriptionIdValue).toBeVisible();
        // await this.verifyPrescriptionIdCanBeCopied(this.cancelMedicationPage.prescriptionIdValue, this.cancelMedicationPage.cancelAdditionalInformationInputField);
    }

    async verifyErrorDialogBoxForR_5000_0099_5006And5888ErrorCodes(medication: string, dosage: string, quantity: string) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.alertErrorIcon).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(medication);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(dosage);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(quantity);
        await expect(this.cancelMedicationPage.prescriptionIdLabel).toBeVisible();
        await expect(this.cancelMedicationPage.prescriptionIdLabel).toContainText("Prescription ID: ");
        await expect(this.cancelMedicationPage.prescriptionIdValue).toBeVisible();
        await this.validateThePrescriptionIdDetails();
        await this.validateCopiedTextIsVisible(this.cancelMedicationPage.prescriptionIdValue);
        await this.verifyTheDispenserDetails();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Something went wrong");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("An error occurred and this item cannot be cancelled. Please contact the dispenser/patient directly to take appropriate action.");
        await this.verifyThePatientDetailsInErrorDialog();
    }

    async validateCopiedTextIsVisible(prescriptionId) {
        const copyElementLocator: Locator = await prescriptionId;
        await copyElementLocator.click();
        await expect(this.cancelMedicationPage.copiedText).toBeVisible();
    }

    async verifyPrescriptionIdCanBeCopied(prescriptionId, textBox) {
        const copyElementLocator: Locator = await prescriptionId;
        const textFieldLocator: Locator = await textBox;
        await expect(this.cancelMedicationPage.copiedText).not.toBeVisible();
        await copyElementLocator.click();
        await expect(this.cancelMedicationPage.copiedText).toBeVisible();
        // const clipboardText = await this.page.evaluate(() => navigator.clipboard.readText());
        const prescriptionIdValue: string = await copyElementLocator.innerText();
        await textFieldLocator.fill(prescriptionIdValue);
        const pastedText = await textFieldLocator.inputValue();
        await expect(pastedText).toEqual(prescriptionIdValue)
    }

    async clickTheDoNotCancelIssueButton() {
        await this.cancelMedicationPage.doNotCancelIssueButton.click();
    }

    async clickCancelIssueButtonAndValidateTheSpinnerForRetryableError() {
        await this.cancelMedicationPage.cancelIssueButton.click();
        await expect(this.cancelMedicationPage.cancelIssueButton).toBeDisabled();
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toBeDisabled();
        await expect(this.cancelMedicationPage.errorValidationBanner).not.toBeVisible();
        // await expect(this.cancelMedicationPage.cancelIssueButtonSpinner).toBeVisible();
    }
    async verifyTheErrorBannerForRetriableErrorBanner(medsName: string) {
        await this.cancelMedicationPage.cancelLatestIssuePanel.waitFor({ state: "visible" });
        await (this.cancelMedicationPage.cancelIssueButton).isEnabled();
        await (this.cancelMedicationPage.doNotCancelIssueButton).isEnabled();
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toBeVisible();
        await expect(this.cancelMedicationPage.errorValidationBanner).toBeVisible();
        await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("Couldn't cancel issue");
        await expect(this.cancelMedicationPage.errorValidationBanner).toContainText("Try again");
        await expect(this.cancelMedicationPage.errorValidationBannerErrorIcon).toBeVisible();
        await expect(this.cancelMedicationPage.errorValidationBannerErrorIconTitle).toContainText("Error");
        await expect(this.cancelMedicationPage.cancellationReasonField).toContainText("Reason for cancelling");
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toContainText("Additional information");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText("Item");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toContainText("Latest issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelIssueButton).toContainText("Cancel issue");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toContainText("Don't cancel issue");
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toBeVisible();
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toContainText(medsName);
        await expect(this.cancelMedicationPage.singleUnCancelMedicationIssueDate).toBeVisible();
        await this.clickCancelIssueButtonAndValidateTheSpinnerForRetryableError();
        await this.clickTheDoNotCancelIssueButton();
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).not.toBeVisible();
        await expect(this.cancelMedicationPage.errorValidationBanner).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForR_0009ErrorCode(medication: string, dosage: string, quantity: string) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issue");
        await this.clickErrorExpandButton_single();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("The NHS Spine cancellation functionality is unavailable.");
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateTheMedicationDetailsInErrorDialog(medication, dosage, quantity);
        await this.verifyTheDispenserDetails();
        await this.validateThePrescriptionIdDetails()
        await this.validateCopiedTextIsVisible(this.cancelMedicationPage.prescriptionIdValue);
    }

    async verifyTheErrorDialogBoxForR_0007ErrorCode(medication: string, dosage: string, quantity: string) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issue");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Another user has unsuccessfully attempted to cancel this item but it is either with the dispenser or dispensed to the patient. Contact the dispenser / patient directly to take appropriate action.");
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateTheMedicationDetailsInErrorDialog(medication, dosage, quantity);
        await this.verifyTheDispenserDetails();
        await this.validateThePrescriptionIdDetails()
    }

    async verifyTheDispenserDetails() {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Dispenser");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Dispenser details are not available.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Use the EPS Prescription Tracker");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("to look up the dispenser contact details.")
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Opens in new tab/window")
    }

    async verifyThePatientDetailsInErrorDialog() {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Patient");
        // await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("FARADAY, Performance Test Two");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Date of birth:");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("NHS number:");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Mobile tel:");
    }

    async validateTheMedicationDetailsInErrorDialog(medication: string, dosage: string, quantity: string) {
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(medication);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(dosage);
        await expect(this.cancelMedicationPage.somethingWentwrongErrorDialog).toContainText(quantity);
    }

    async validateThePrescriptionIdDetails() {
        await expect(this.cancelMedicationPage.prescriptionIdLabel).toBeVisible();
        await expect(this.cancelMedicationPage.prescriptionIdLabel).toContainText("Prescription ID");
        await expect(this.cancelMedicationPage.prescriptionIdValue).toBeVisible();
        await expect(this.cancelMedicationPage.copiedText).not.toBeVisible();
        await this.cancelMedicationPage.prescriptionIdValue.click();
        await expect(this.cancelMedicationPage.copiedText).toBeVisible();
    }

    async verifyAlreadyCancelledErrorDialog(medication: string, dosage: string, quantity: string,) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Issue already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("This item has already been cancelled.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Item");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Latest issue");
        await this.validateTheMedicationDetailsInErrorDialog(medication, dosage, quantity);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Click 'Refresh' on the Medication page for the updated issue status.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async verifyPendingCancellationMedicationCount(expectedCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await this.page.waitForLoadState('load');
        const selectedMedications = await this.cancelMedicationPage.singleCancelMedicationDrugName;
        const count = await selectedMedications.count();
        await expect(count).toEqual(expectedCount);
    }

    async clickCancelIssueIcon() {
        await this.cancelMedicationPage.cancelLatestIssueButton.click();
    }

    async verifyErrorDialogBox_AllFailedRetryable_cancelMultipleMedication(count: number) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${count})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeEnabled();
        await this.clickTryAgainButton();
        await expect(this.cancelMedicationPage.multipleCancellationTryAgainSpinner).toBeVisible();
        await expect(this.cancelMedicationPage.retryingText).toBeVisible();
        await expect(this.cancelMedicationPage.cancelIssueColumnSkeleton).toBeVisible();
    }

    async clickTryAgainButton() {
        await this.cancelMedicationPage.tryAgainButton.click();
    }

    async validateTheTryagainButtonIsNotVisible() {
        await this.cancelMedicationPage.cancelIssueColumnSkeleton.waitFor({ state: "hidden" });
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyErrorDialogBox_AllFailedNonRetryable_cancelMultipleMedication(count: number) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${count})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Contact the patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyTheMedicationListedInThePendingCancellationMedicationTable(medicationDetails: string) {
        await expect(this.cancelMedicationPage.pendingCancellationMedicationTable).toBeVisible();
        await expect(this.cancelMedicationPage.pendingCancellationMedicationTable).toContainText(medicationDetails);
    }

    async verifyTheSelectedMedicationCountInThePendingCancellationMedicationTable(count: number) {
        const selectedMedications = this.cancelMedicationPage.singleCancelMedicationDrugName;
        const medicationCount = await selectedMedications.count();
        await expect(medicationCount).toEqual(count);
    }

    async validateTableScrollbarIsVisible() {
        const tableElement = this.cancelMedicationPage.pendingCancellationMedicationTable;
        const hasScrollbar = await tableElement.evaluate((el) => {
            return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
        });
        await expect(hasScrollbar).toBeTruthy();
    }

    async verifyErrorDialogBox_PatialSuccess_NonRetriable_cancelMultipleMedication(notCancelledCount: number, overallCount: number) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel some issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`${notCancelledCount} out of ${overallCount} issues couldn’t be cancelled. Here are the reasons and what you should do.`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${notCancelledCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Contact the patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyErrorDialogBoxIsClosed() {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async verifyCancellationToastNotification(count: number) {
        await expect(this.cancelMedicationPage.cancelNotificationPanel.nth(0)).toBeVisible();
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText("Refresh Medication page to view.");
        if (count == 1) {
            await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText(`Issue cancelled.`);
        } else {
            await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText(`Issues cancelled.`);
        }
    }

    async verifyPartialSuccessCancellationToastNotification(cancelled_count: number, expected_count: number) {
        await expect(this.cancelMedicationPage.cancelNotificationPanel.nth(0)).toBeVisible();
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText("Refresh Medication page to view.");
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText("Success");
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText(`Issues cancelled for ${cancelled_count} of ${expected_count} items.`);
        await expect(this.cancelMedicationPage.cancelNotificationPanel).toContainText("Close toast notification");
    }

    async validateCancelCourseToastMessage() {
        await this.medicationHomePage.toastNotificationsText.first().isVisible();
        await expect(this.medicationHomePage.toastNotificationsText.first()).toContainText("SuccessIssue cancelled.Refresh Medication page to view.Close toast notification");
    }

    async verifyTheErrorDialogBoxForPartialSuccessAndRetriableError(notCancelledCount: number, overallCount: number) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel some issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`${notCancelledCount} out of ${overallCount} issues couldn’t be cancelled. Here are the reasons and what you should do.`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${notCancelledCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Contact the patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
    }

    async validateSpinnerAndSkeletonOnTryAgainClick() {
        await expect(this.cancelMedicationPage.multipleCancellationTryAgainSpinner).toBeVisible();
        await expect(this.cancelMedicationPage.retryingText).toBeVisible();
        // await expect(this.cancelMedicationPage.cancelIssueColumnSkeleton).toBeVisible();
    }

    async verifyTheErrorDialogBoxForPartialSuccess_RetriableError_alreadyCancelled(notCancelledCount: number, overallCount: number) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel some issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`${notCancelledCount} out of ${overallCount} issues couldn’t be cancelled. Here are the reasons and what you should do.`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${notCancelledCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Contact the patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
    }

    async verifyTheErrorDialogBoxForPartialSuccess_NonRetriableError_alreadyCancelled(notCancelledCount: number, totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel some issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`${notCancelledCount} out of ${totalCount} issues couldn’t be cancelled. Here are the reasons and what you should do.`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${notCancelledCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Contact the patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForPartialSuccess_And_alreadyCancelled(notCancelledCount: number, totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel some issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`${notCancelledCount} out of ${totalCount} issues couldn’t be cancelled. Here are the reasons and what you should do.`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${notCancelledCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Contact the patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyAllAlreadyCancelledNonEPSMedicationError(count) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText(`Issues not cancelled (${count})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateLatestCancelIssueTableScrollable();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async validateLatestCancelIssueTableScrollable() {
        const tableSelector = this.cancelMedicationPage.errorDialogTable;
        const isScrollable = await tableSelector.evaluate((table) => {
            return table.scrollHeight > table.clientHeight;
        });
        await expect(isScrollable).toBe(true);
    }

    async validatePartialAlreadyCancelledLatestCancelIssueTableScrollable() {
        const tableSelector = this.cancelMedicationPage.cancelMedicationTable;
        const isScrollable = await tableSelector.evaluate((table) => {
            return table.scrollHeight > table.clientHeight;
        });
        await expect(isScrollable).toBe(true);
    }

    async verifySomeAlreadyCancelledNonEPSMedicationError(count) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Cannot cancel some issues");
        await expect(this.cancelMedicationPage.multipleIssueErrorContent).toContainText("3 out of 4 issues couldn’t be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText(`Issues not cancelled (${count})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateLatestCancelIssueTableScrollable();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton.click();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForR_0002AndR_0003ErrorCodes_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("With dispenser");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Contact the dispenser.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForR_0004ErrorCode_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Dispensed to patient");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Contact the dispenser/patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForR_0006ErrorCode_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Already cancelled");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Contact the dispenser/patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Try cancelling again.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForR_0008AndR0009ErrorCodes_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).toBeEnabled();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Contact the dispenser/patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Try cancelling again.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
    }
    async verifyTheErrorDialogBoxForR_5000_0099_5006And5888ErrorCodes_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Contact the dispenser/patient.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Technical error");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
    }

    async verifyTheErrorDialogBoxForR_0007ErrorCode_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Cancellation already requested. Either wait or contact the dispenser yourself.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Pending");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
    }

    async verifyTheErrorDialogBoxForR_0005ErrorCode_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Cancellation already requested. Either wait or contact the dispenser yourself.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Expired");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
    }

    async verifyTheErrorDialogBoxForR_0010ErrorCode_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toBeVisible();
        await expect(this.cancelMedicationPage.tryAgainButton).not.toBeVisible();
        await expect(this.cancelMedicationPage.alreadyCancelledTag).not.toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Not dispensed");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issues");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("None of the issues could be cancelled. Here are the reasons and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Cancellation already requested. Either wait or contact the dispenser yourself.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Pending");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("No further action required.");
        await this.verifyThePatientDetailsInErrorDialog();
    }

    async verifyWorkflowTasksCreatedTextIsVisible_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("Cancellation rejection tasks have been created in EMIS Web Workflow Manager.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
    }

    async verifyWorkflowTasksCreatedTextIsNotVisible_multipleCancellation(totalCount: number) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).not.toContainText("Cancellation rejection tasks have been created in EMIS Web Workflow Manager.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText(`Issues not cancelled (${totalCount})`);
    }

    async verifyWorkflowTaskCreatedTextIsVisible_singleCancellation() {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxContent).toContainText("A cancellation rejection task has been created in EMIS Web Workflow Manager.");
    }

    async verifyTheRequiredLabelInErrorDialog(label: string) {
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText(label);
    }

    async verifySingleCancellationUniversalErrorDialogBox(medicationName: string, today: string, labelName: string, additionalText: string) {
        await this.cancelMedicationPage.cancelMedicationErrorDialogBox.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxCloseButton).toBeEnabled();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBoxHeader).toContainText("Cannot cancel issue");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("This issue couldn’t be cancelled.");
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText(additionalText);
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Here is the reason and what you should do.");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText("Issue not cancelled");
        await expect(this.cancelMedicationPage.singleUnCancelMedicationIssueDate).toContainText(today);
        await expect(this.cancelMedicationPage.unCancelledMedication_single).toContainText(medicationName);
        await this.verifyTheRequiredLabelInErrorDialog(labelName);
        await this.verifyThePatientDetailsInErrorDialog();
        await this.validateTheExpandedSectionForsingleCancellation();
    }

    async clickErrorExpandButton_single() {
        await this.cancelMedicationPage.errorExpandButtonSingle.click();
    }

    async verifyPrescriptionIdIsNotVisible() {
        await expect(this.cancelMedicationPage.prescriptionIdLabel).not.toBeVisible();
        await expect(this.cancelMedicationPage.prescriptionIdValue).not.toBeVisible();
    }

    async validateTheExpandedSectionForsingleCancellation() {
        await expect(this.cancelMedicationPage.errorExpandButtonSingle).toBeVisible();
        await this.clickErrorExpandButton_single();
        await expect(this.cancelMedicationPage.errorExpandButtonSingle).toBeVisible();
        await this.verifyPrescriptionIdLabelIsVisible();
        await this.clickErrorExpandButton_single();
        await this.verifyPrescriptionIdIsNotVisible();
        await expect(this.cancelMedicationPage.cancelMedicationErrorDialogBox).toContainText("Here is the reason and what you should do.");
    }

    async verifyPrescriptionIdLabelIsVisible() {
        await expect(this.cancelMedicationPage.prescriptionIdLabel).toBeVisible();
    }

    async expectMedicationIsNotIssued(medicationName: string) {
        const rows = this.cancelMedicationPage.currentMedicationsTable.locator('tr');
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const rowText = await row.textContent();
            if (rowText && rowText.includes(medicationName)) {
                const cells = row.locator('td');
                const cellCount = await cells.count();
                let found = false;
                for (let j = 0; j < cellCount; j++) {
                    const cellText = await cells.nth(j).textContent();
                    if (cellText && cellText.trim() === "Not issued") {
                        found = true;
                        break;
                    }
                }
                await expect(found).toBe(true);
                return;
            }
        }
    }

    async verifyCancelIssuePanelFields(MedsName: string, randomGuid: string, Quantity: string) {
        await this.cancelMedicationPage.cancelLatestIssuePanel.waitFor({ state: "visible" });
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationReasonField).toContainText("Reason for cancelling");
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toBeVisible();
        await expect(this.cancelMedicationPage.cancellationAdditionalInformation).toContainText("Additional information");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderItem).toContainText("Item");
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toBeVisible();
        await expect(this.cancelMedicationPage.cancelMedicationHeaderLatestIssue).toContainText("Latest issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.cancelIssueButton).toContainText("Cancel issue");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toBeVisible();
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toContainText("Don't cancel issue");
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).toBeVisible();
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toBeVisible();
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toContainText(MedsName);
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toContainText(randomGuid);
        await expect(this.cancelMedicationPage.singleCancelMedicationDrugName).toContainText(Quantity);
        const issueDate = await this.commonActions.getTodayDate();
        await expect(this.cancelMedicationPage.singleUnCancelMedicationIssueDate).toContainText(issueDate);
        await expect(this.cancelMedicationPage.singleUnCancelMedicationIssueDate).toBeVisible();
        await this.clickTheDoNotCancelIssueButton();
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).not.toBeVisible();
        await this.cancelMedicationPage.cancelLatestIssueButton.click();
        await this.cancelMedicationPage.cannotCancelIssueDialogXButton.click();
        await expect(this.cancelMedicationPage.cancelLatestIssuePanel).not.toBeVisible();
    }

    async verifyCancelIssueDialogAtScreenSizes() {
        // 1400x1100
        await this.page.setViewportSize({ width: 1400, height: 1100 });
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toHaveText("Cancel issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toHaveText("Cancel issue");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toHaveText("Don't cancel issue");

        // 576x640
        await this.page.setViewportSize({ width: 576, height: 640 });
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toHaveText("Cancel issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toHaveText("Cancel issue");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toHaveText("Don't cancel issue");

        // 320x640
        await this.page.setViewportSize({ width: 320, height: 640 });
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toHaveText("Cancel issue");
        await expect(this.cancelMedicationPage.cancelIssueButton).toHaveText("Cancel issue");
        await expect(this.cancelMedicationPage.doNotCancelIssueButton).toHaveText("Don't cancel issue");
    }

    async verifyCancelIssueDialogHeader(value: string) {
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toBeVisible();
        await expect(this.cancelMedicationPage.latestIssueTableHeader).toHaveText(value);
    }

    async validateCancellationReasonDropdownOptions() {

        await this.cancelMedicationPage.cancellationReasonDropdown.click();

        await expect(this.cancelMedicationPage.cancellationReasonOption1).toHaveText("Prescribing error");
        await expect(this.cancelMedicationPage.cancellationReasonOption2).toHaveText("Clinical contraindication");
        await expect(this.cancelMedicationPage.cancellationReasonOption3).toHaveText("Change to medication treatment regime");
        await expect(this.cancelMedicationPage.cancellationReasonOption4).toHaveText("Clinical grounds");
        await expect(this.cancelMedicationPage.cancellationReasonOption5).toHaveText("At the patient's request");
        await expect(this.cancelMedicationPage.cancellationReasonOption6).toHaveText("At the pharmacist's request");

        await this.cancelMedicationPage.cancellationReasonOption1.click();
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("Prescribing error");

        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        await this.cancelMedicationPage.cancellationReasonOption2.click();
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("Clinical contraindication");

        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        await this.cancelMedicationPage.cancellationReasonOption3.click();
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("Change to medication treatment regime");

        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        await this.cancelMedicationPage.cancellationReasonOption4.click();
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("Clinical grounds");

        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        await this.cancelMedicationPage.cancellationReasonOption5.click();
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("At the patient's request");

        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        await this.cancelMedicationPage.cancellationReasonOption6.click();
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("At the pharmacist's request");
    }

    async selectCancellationReasonWithKeyboard() {
        await this.cancelMedicationPage.cancellationReasonDropdown.click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await expect(this.cancelMedicationPage.cancellationReasonDropdown).toHaveText("Clinical grounds");
    }

    async expectCancelLatestIssueIsAvailable() {
        await expect(this.cancelMedicationPage.cancelLatestIssue).toBeVisible();
        await expect(this.cancelMedicationPage.cancelLatestIssue).toContainText("Cancel issue");
    }

    async expectCancelLatestIssueIsNotAvailable() {
        await expect(this.cancelMedicationPage.cancelLatestIssue).not.toBeVisible();
    }

    async expectCancelLatestIssueIsDisabled() {
        await expect(this.cancelMedicationPage.cancelLatestIssue).toBeDisabled();
    }

    async expectCancelLatestIssueIsEnabled() {
        await expect(this.cancelMedicationPage.cancelLatestIssue).toBeEnabled();
    }

    async validateToolTipForCancelLatestIssueOptionForRD() {
        await this.cancelMedicationPage.cancelLatestIssue.hover();
        await expect(this.cancelMedicationPage.cancelLatestIssueTooltipContent.first()).toBeVisible();
        await expect(this.cancelMedicationPage.cancelLatestIssueTooltipContent.first()).toContainText("Go to EMIS Web to cancel the latest issue.");
    }

    async validateToolTipForCancelLatestIssueOptionForIssuedElseWhere() {
        await this.cancelMedicationPage.cancelLatestIssue.hover();
        await expect(this.cancelMedicationPage.cancelLatestIssueTooltipContent.first()).toBeVisible();
        await expect(this.cancelMedicationPage.cancelLatestIssueTooltipContent.first()).toContainText("Cannot cancel latest issue for a medication issued elsewhere.");
    }

    async expectVisibleTooltipWithText(expectedText: string) {
        const tooltip = this.cancelMedicationPage.cancelLatestIssueTooltipContent
            .filter({ hasText: expectedText })
            .first();
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toContainText(expectedText);
    }

    async hoverCancelLatestIssueOption() {
        await this.cancelMedicationPage.cancelLatestIssue.hover();
    }

    async expectCancelLatestIssueTooltipNotVisible() {
        const tooltip = this.cancelMedicationPage.cancelLatestIssueTooltipContent;
        await expect(tooltip).not.toBeVisible();
        expect(await tooltip.count()).toBe(0);
    }

    async expectCancelLatestIssueTooltipDoesNotContain(text: string) {
        const tooltip = this.cancelMedicationPage.cancelLatestIssueTooltipContent;
        await expect(tooltip).not.toContainText(text);
    }

    async mockCancelLatestIssueResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(cancel_latest_issue_response));
    }
}