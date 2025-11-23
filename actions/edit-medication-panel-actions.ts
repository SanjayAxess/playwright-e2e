import { Page, expect } from "@playwright/test";
import { CommonActions } from "./common-actions";
import { EditMedicationPage } from "../pages/edit-medication-page";
import { RequestIssuePage } from "../pages/request-issue-page";
import { ClinicalWarningPopupActions } from "./clinical-warning-popup-actions";
import edit_medication_response from "../mock_data/edit_medication_response.json";
import edit_medication_different_status_response from "../mock_data/edit_medication_different_status_response.json";
import { MedicationHomeActions } from "./medication-home-actions";
import { RequestIssueActions } from "./request-issue-actions";
import { AddMedicationPanelPage } from "../pages/prescribe-add-medication-panel-page";
import { AddMedicationPanelActions } from "./prescribe-add-medication-panel-actions";
import { MedicationHomePage } from "../pages/medication-home-page";
import { RecordMedicationPanelActions } from "./record-medication-actions";
import { RecordMedicationPage } from "../pages/record-medication-page";

export class EditMedicationActions {
    protected addMedicationPanelPage: AddMedicationPanelPage;
    protected commonActions: CommonActions;
    protected EditMedicationPage: EditMedicationPage;
    protected clinicalWarningPopupActions: ClinicalWarningPopupActions;
    protected medicationHomeActions: MedicationHomeActions;
    protected addMedicationPanelActions: AddMedicationPanelActions;
    protected medicationHomePage: MedicationHomePage;
    protected RequestIssuePage: RequestIssuePage;
    protected requestIssueActions: RequestIssueActions;
    protected recordMedicationPage: RecordMedicationPage;
    protected recordMedicationPanelActions: RecordMedicationPanelActions;
    protected recordMedicationPanelPage: RecordMedicationPage;

    constructor(protected readonly _page: Page) {
        this.addMedicationPanelPage = new AddMedicationPanelPage(this._page);
        this.commonActions = new CommonActions(this._page);
        this.EditMedicationPage = new EditMedicationPage(this._page);
        this.clinicalWarningPopupActions = new ClinicalWarningPopupActions(this._page);
        this.medicationHomeActions = new MedicationHomeActions(this._page);
        this.addMedicationPanelActions = new AddMedicationPanelActions(this._page);
        this.medicationHomePage = new MedicationHomePage(this._page);
        this.RequestIssuePage = new RequestIssuePage(this._page);
        this.requestIssueActions = new RequestIssueActions(this._page);
        this.recordMedicationPage = new RecordMedicationPage(this._page);
        this.recordMedicationPanelActions = new RecordMedicationPanelActions(this._page);
        this.recordMedicationPanelPage = new RecordMedicationPage(this._page);
    }

    async verifyEditOptionDisabledWithTooltip(tooltipText: string) {
        await this.EditMedicationPage.editMedicationOption.waitFor({ state: 'visible' });
        await expect(this.EditMedicationPage.editMedicationOption).toBeDisabled();
        await expect(this.EditMedicationPage.editTooltip).toBeVisible();
        await expect(this.EditMedicationPage.editTooltip).toHaveText(tooltipText);
    }

    async verifyEditOptionDisabledWithoutTooltip() {
        await this.EditMedicationPage.editMedicationOption.waitFor({ state: 'visible' });
        await expect(this.EditMedicationPage.editMedicationOption).toBeDisabled();
        await expect(this.EditMedicationPage.editTooltip).not.toBeVisible();
    }

    async hoverOnEditMedicationOption() {
        await this.EditMedicationPage.editMedicationOption.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editMedicationOption.hover();
        await expect(this.EditMedicationPage.editMedicationOption).toBeVisible();
    }

    async clickOnEditMedicationOption() {
        await this.EditMedicationPage.editMedicationOption.waitFor({ state: 'visible' });
        await expect(this.EditMedicationPage.editMedicationOption).toContainText("Edit");
        await this.EditMedicationPage.editMedicationOption.click();
    }

    async editFields(dosage?: string, quantity?: string, duration?: string, numberOfAuthorisedIssues?: string, informationForPharmacy?: string, informationForPatient?: string, individualReviewDate?: string) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();

        if (dosage !== undefined) {
            await this.EditMedicationPage.editDosage.waitFor({ state: 'visible' });
            await this.EditMedicationPage.editDosage.click();
            await this.addMedicationPanelPage.dosage.input.waitFor();
            await this.addMedicationPanelPage.dosage.input.fill(dosage);
        }

        if (quantity !== undefined) {
            await this.addMedicationPanelPage.quantity.textBox.waitFor();
            await this.addMedicationPanelPage.quantity.textBox.fill(quantity);
        }

        if (duration !== undefined) {
            await this.EditMedicationPage.editDuration.waitFor({ state: 'visible' });
            await this.EditMedicationPage.editDuration.click();
            await this.EditMedicationPage.editDuration.fill(duration);
        }

        if (numberOfAuthorisedIssues !== undefined) {
            await this.addMedicationPanelPage.prescriptionType.repeat.click();
            await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.waitFor();
            await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill(numberOfAuthorisedIssues);
        }

        if (informationForPharmacy !== undefined) {
            await this.addMedicationPanelPage.informationForPharmacy.textBox.waitFor();
            await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(informationForPharmacy);
        }

        if (informationForPatient !== undefined) {
            await this.addMedicationPanelPage.informationForPatient.textBox.waitFor();
            await this.addMedicationPanelPage.informationForPatient.textBox.fill(informationForPatient);
        }

        if (individualReviewDate !== undefined) {
            await this.addMedicationPanelPage.reviewDate.input.waitFor();
            await this.addMedicationPanelPage.reviewDate.input.clear();
            await this.addMedicationPanelPage.reviewDate.input.fill(individualReviewDate);
        }

        await this.clickUpdateOnly();
    }

    async editMandatoryFields(dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.EditMedicationPage.editDosage.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editDosage.click();
        await this.addMedicationPanelPage.dosage.input.waitFor();
        await this.addMedicationPanelPage.dosage.input.fill(dosage);
        await this.addMedicationPanelPage.quantity.textBox.waitFor();
        await this.addMedicationPanelPage.quantity.textBox.fill(quantity);
        await this.EditMedicationPage.editDuration.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editDuration.click();
        await this.EditMedicationPage.editDuration.fill(duration);
        await this.addMedicationPanelPage.prescriptionType.repeat.click();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.waitFor();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill(numberOfAuthorisedIssues);
        await this.RequestIssuePage.usersSinglePickerInput.waitFor({ state: 'visible' });
        await this.RequestIssuePage.usersSinglePickerInput.click();
        await this.requestIssueActions.selectSendRequestToUser();
        await this.clickUpdateOnly();
    }

    async editRecordPanelMandatoryFields(quantity: string, addToCurrentMedication: boolean) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();

        await this.recordMedicationPage.quantityField.waitFor();
        await this.recordMedicationPage.quantityField.fill(quantity);

        if (addToCurrentMedication) {
            await this.recordMedicationPage.currentMedicationRadioButtonLabel.click();
        } else {
            await this.recordMedicationPage.pastMedicationRadioButtonLabel.click();
        }
        await this.recordMedicationPage.recordButton.waitFor({ state: 'visible' });
        await this.recordMedicationPage.recordButton.click();
    }

    async editRecordPanelNonMandatoryFields(dosageValue: string) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this._page.waitForTimeout(2000);
        await this.recordMedicationPage.editDosage.waitFor({ state: 'visible' });
        await this.recordMedicationPage.editDosage.click();
        await this.recordMedicationPage.clearButton.waitFor({ state: 'visible' });
        await this.recordMedicationPage.clearButton.click();
        await this.recordMedicationPage.dosageField.fill(dosageValue);
        await this._page.keyboard.press('Enter');
        await this.recordMedicationPage.recordButton.waitFor({ state: 'visible' });
        await this.recordMedicationPage.recordButton.click();
    }

    async editRecordPanelAllFields(quantity: string, dosageValue: string, addToCurrentMedication: boolean) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();

        await this.recordMedicationPage.quantityField.waitFor();
        await this.recordMedicationPage.quantityField.fill(quantity);

        if (addToCurrentMedication) {
            await this.recordMedicationPage.currentMedicationRadioButtonLabel.click();
        } else {
            await this.recordMedicationPage.pastMedicationRadioButtonLabel.click();
        }
        await this._page.waitForTimeout(2000);

        await this.recordMedicationPage.editDosage.waitFor({ state: 'visible' });
        await this.recordMedicationPage.editDosage.click();
        await this.recordMedicationPage.clearButton.waitFor({ state: 'visible' });
        await this.recordMedicationPage.clearButton.click();
        await this.recordMedicationPage.dosageField.fill(dosageValue);
        await this._page.keyboard.press('Enter');

        await this.recordMedicationPage.recordButton.waitFor({ state: 'visible' });
        await this.recordMedicationPage.recordButton.click();
    }

    async editNonMandatoryFields(dosage: string, informationForPharmacy: string, informationForPatient: string, individualReviewDate: string) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.EditMedicationPage.editDosage.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editDosage.click();
        await this.addMedicationPanelPage.dosage.input.waitFor();
        await this.addMedicationPanelPage.dosage.input.fill(dosage);
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministered.click();
        await this.addMedicationPanelPage.informationForPharmacy.textBox.waitFor();
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(informationForPharmacy);
        await this.addMedicationPanelPage.informationForPatient.textBox.waitFor();
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(informationForPatient);
        await this.addMedicationPanelPage.reviewDate.input.waitFor();
        await this.addMedicationPanelPage.reviewDate.input.clear();
        await this.addMedicationPanelPage.reviewDate.input.fill(individualReviewDate);
    }

    async editAllFields(dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues: string, informationForPharmacy: string, informationForPatient: string, individualReviewDate: string) {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.EditMedicationPage.editDosage.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editDosage.click();
        await this.addMedicationPanelPage.dosage.input.waitFor();
        await this.addMedicationPanelPage.dosage.input.fill(dosage);
        await this.addMedicationPanelPage.quantity.textBox.waitFor();
        await this.addMedicationPanelPage.quantity.textBox.fill(quantity);
        await this.EditMedicationPage.editDuration.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editDuration.click();
        await this.EditMedicationPage.editDuration.fill(duration);
        await this.addMedicationPanelPage.prescriptionType.repeat.click();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.waitFor();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill(numberOfAuthorisedIssues);
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministered.click();
        await this.addMedicationPanelPage.informationForPharmacy.textBox.waitFor();
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(informationForPharmacy);
        await this.addMedicationPanelPage.informationForPatient.textBox.waitFor();
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(informationForPatient);
        await this.RequestIssuePage.usersSinglePickerInput.waitFor({ state: 'visible' });
        await this.RequestIssuePage.usersSinglePickerInput.click();
        await this.requestIssueActions.selectSendRequestToUser();
        await this.addMedicationPanelPage.reviewDate.input.waitFor();
        await this.addMedicationPanelPage.reviewDate.input.fill(individualReviewDate);
        await this.clickUpdateOnly();
    }

    async mockEditMedicationResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(edit_medication_response));
    }

    async mockEditMedicationDifferentStatusResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(edit_medication_different_status_response));
    }

    async expectCurrentEditMedicationOptionDisabled() {
        await expect(this.EditMedicationPage.editMedicationOption).toBeDisabled();
    }

    async expectCurrentEditMedicationOptionEnabled() {
        await expect(this.EditMedicationPage.editMedicationOption).toBeEnabled();
    }

    async clickUpdateAndIssue() {
        await this.EditMedicationPage.updateAndIssueButton.waitFor({ state: 'visible' });
        await this.EditMedicationPage.updateAndIssueButton.click();
    }

    async clickUpdateOnly() {
        await this.EditMedicationPage.updateOnlyButton.waitFor({ state: 'visible' });
        await this.EditMedicationPage.updateOnlyButton.click();
    }

    async validateEditMedicationToastMessage() {
        await this.medicationHomePage.toastNotificationsText.isVisible();
        await expect(this.medicationHomePage.toastNotificationsText).toContainText("Medication updated.Refresh Medication page to view.");
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async editControlledDrugValidation() {
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.EditMedicationPage.editDuration.waitFor({ state: 'visible' });
        await this.EditMedicationPage.editDuration.click();
        await this.EditMedicationPage.editDuration.fill("31");
        await this.clickUpdateOnly();
    }

    async verifyEditMedicationHeader() {
        await this.EditMedicationPage.editMedicationHeader.waitFor({ state: 'visible' });
        await expect(this.EditMedicationPage.editMedicationHeader).toBeVisible();
        await expect(this.EditMedicationPage.editMedicationHeader).toHaveText("Edit medication");
    }

    async verifyEditTabIsEnabled() {
        await expect(this.EditMedicationPage.editTab).toBeEnabled();
        await expect(this.EditMedicationPage.editTab).toHaveText("Edit");
    }

    async verifyDrugNameInEditScreen(DrugName: string) {
        await expect(this.EditMedicationPage.prescribeEditDrugName).toBeVisible();
        await expect(this.EditMedicationPage.prescribeEditDrugName).toContainText(DrugName);
    }

    async verifyElementBackgroundColor(DrugName: string, color: string) {
        const element = this.EditMedicationPage.prescribeEditDrugName;
        await expect(element).toHaveCSS("background-color", color);
        await expect(element).toHaveText(DrugName);
    }

    async clickUpdateOnlyButton() {
        await expect(this.EditMedicationPage.editUpdateOnlyButton).toBeVisible();
        await this.EditMedicationPage.editUpdateOnlyButton.click();
    }

    async clickUpdateAndIssueButton() {
        await expect(this.EditMedicationPage.editUpdateAndIssueButton).toBeVisible();
        await this.EditMedicationPage.editUpdateAndIssueButton.click();
    }

    async clickCancelButton() {
        await expect(this.EditMedicationPage.editCancelButton).toBeVisible();
        await this.EditMedicationPage.editCancelButton.click();
    }

    async verifyEditScreenBottomButtons() {
        await expect(this.EditMedicationPage.editUpdateAndIssueButton).toBeVisible();
        await expect(this.EditMedicationPage.editUpdateAndIssueButton).toContainText("Update & issue");
        await expect(this.EditMedicationPage.editUpdateOnlyButton).toBeVisible();
        await expect(this.EditMedicationPage.editUpdateOnlyButton).toContainText("Update only");
        await expect(this.EditMedicationPage.editCancelButton).toBeVisible();
        await expect(this.EditMedicationPage.editCancelButton).toContainText("Cancel");
    }

    async dosageFieldValidationsInEditScreen() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Alendronic acid 70mg tablets", "dosagecheck", "11", "11", "Pharmacy Test", "Patient Test");
        await this.addMedicationPanelActions.clickCloseButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.searchCurrentMedication("dosagecheck");
        await this.medicationHomeActions.clickCurrentMoreOptionsButton();
        await this.clickOnEditMedicationOption();
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.dosage.formElement).toContainText("Dosage");
        await expect(this.addMedicationPanelPage.dosage.selectedDosage).toContainText("dosagecheck");
        await expect(this.addMedicationPanelPage.dosage.selectedDosage).toHaveCSS("color", "rgb(43, 51, 55)");
        await this.addMedicationPanelPage.dosage.editDosage.click();
        await this.addMedicationPanelPage.dosage.clearButton.click();
        await expect(this.recordMedicationPanelPage.dosageFieldInput).toHaveValue("");
        await expect(this.addMedicationPanelPage.dosage.option("Take One Tablet Weekly")).toBeVisible();
        await this.recordMedicationPanelPage.dosageFieldInput.fill("123456 !@#$%^&*() Test data");
        await expect(this.recordMedicationPanelPage.dosageFieldInput).toHaveValue("123456 !@#$%^&*() Test data");
        await this.addMedicationPanelPage.dosage.clearButton.click();
        await expect(this.recordMedicationPanelPage.dosageFieldInput).toHaveValue("");
        await expect(this.recordMedicationPanelPage.dosageFieldInput).toHaveCSS("border-color", "rgb(113, 121, 125)");
        await this.addMedicationPanelPage.dosage.formElement.click();
        await this.addMedicationPanelPage.quantity.formElement.click();
        await expect(this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage")).toContainText("Select or enter a dosage.");
        await expect(this.recordMedicationPanelPage.dosageFieldInput).toHaveCSS("border-color", "rgb(220, 53, 70)");
        await this.medicationHomeActions.clickDetailPanelCloseButton();
        await this.addMedicationPanelActions.clickPrescribeDiscardButton();

    }

    async quantityFieldValidationsInEditScreen() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Alendronic acid 70mg tablets", "qtycheck", "11", "11", "Pharmacy Test", "Patient Test");
        await this.addMedicationPanelActions.clickCloseButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.searchCurrentMedication("qtycheck");
        await this.medicationHomeActions.clickCurrentMoreOptionsButton();
        await this.clickOnEditMedicationOption();
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.formElement).toContainText("Quantity");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("11");
        await this.addMedicationPanelPage.quantity.textBox.fill("123456");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("123456");
        await expect(this.addMedicationPanelPage.quantity.textBox).toBeFocused();
        await this.addMedicationPanelPage.quantity.textBox.fill("123456.99");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("123456.99");
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).not.toBeVisible();
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("123456.99");
        await this.addMedicationPanelPage.quantity.textBox.fill("1234567890");
        await expect(this.addMedicationPanelPage.quantity.textBox).not.toHaveValue("1234567890");
        await this.addMedicationPanelPage.quantity.textBox.fill("123.456");
        await expect(this.addMedicationPanelPage.quantity.textBox).not.toHaveValue("123.456");
        await this.addMedicationPanelPage.quantity.textBox.fill("");
        await this.addMedicationPanelPage.dosage.formElement.click();
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.quantity.textBox).not.toBeFocused();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).toBeVisible();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveCSS("border-color", "rgb(220, 53, 70)");
        await this.addMedicationPanelPage.quantity.textBox.click();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).toBeVisible();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await this.addMedicationPanelPage.quantity.textBox.fill("0");
        await this.addMedicationPanelPage.dosage.formElement.click();
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity-greater-than-0")).toBeVisible();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity-greater-than-0")).toContainText("Enter a quantity greater than 0.");
        await this.addMedicationPanelPage.quantity.textBox.fill("0.01");
        await this.addMedicationPanelPage.dosage.formElement.click();
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity-greater-than-0")).not.toBeVisible();
        await this.addMedicationPanelPage.quantity.textBox.fill("99.99");
        await this.addMedicationPanelPage.dosage.formElement.click();
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity-greater-than-0")).not.toBeVisible();
        await this.medicationHomeActions.clickDetailPanelCloseButton();
        await this.addMedicationPanelActions.clickPrescribeDiscardButton();
    }

    async durationFieldValidationsInEditScreen() { 
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Alendronic acid 70mg tablets", "durationcheck", "11", "11", "Pharmacy Test", "Patient Test");
        await this.addMedicationPanelActions.clickCloseButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.searchCurrentMedication("durationcheck");
        await this.medicationHomeActions.clickCurrentMoreOptionsButton();
        await this.clickOnEditMedicationOption();
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.duration.formElement).toBeVisible();
        await expect(this.addMedicationPanelPage.duration.formElement).toContainText("Duration");
        await expect(this.addMedicationPanelPage.duration.formElement).toContainText("days");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("11");
        await expect(this.addMedicationPanelPage.duration.textBox).not.toBeFocused();
        await this.addMedicationPanelPage.duration.textBox.fill("12345");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("12345");
        await expect(this.addMedicationPanelPage.duration.textBox).toBeFocused();
        await this.addMedicationPanelPage.dosage.formElement.click();
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("12345");
        await this.addMedicationPanelPage.duration.textBox.fill("123456");
        await expect(this.addMedicationPanelPage.duration.textBox).not.toHaveValue("123456");
        await this.addMedicationPanelPage.duration.textBox.fill("123.45");
        await expect(this.addMedicationPanelPage.duration.textBox).not.toHaveValue("123.45");
        await this.addMedicationPanelPage.duration.textBox.fill("1.");
        await expect(this.addMedicationPanelPage.duration.textBox).not.toHaveValue("1.");
        await this.addMedicationPanelPage.duration.textBox.fill("99999");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("99999");
        await this.addMedicationPanelPage.duration.textBox.fill("");
        await this.clickUpdateOnlyButton();
        await expect(this.addMedicationPanelPage.duration.error("test-enter-a-duration")).toContainText("Enter a duration.");
        await this.addMedicationPanelPage.duration.textBox.fill("0");
        await this.clickUpdateOnlyButton();
        await expect(this.addMedicationPanelPage.duration.error("test-enter-a-duration-greater-than-0")).toContainText("Enter a duration greater than 0.");
        await this.medicationHomeActions.clickDetailPanelCloseButton();
        await this.addMedicationPanelActions.clickPrescribeDiscardButton();
    }

    async prescriptionTypeFieldValidationsInEditScreen() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Alendronic acid 70mg tablets", "presctype", "11", "11","4", "Pharmacy Test", "Patient Test");
        await this.addMedicationPanelActions.clickCloseButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.searchCurrentMedication("presctype");
        await this.medicationHomeActions.clickCurrentMoreOptionsButton();
        await this.clickOnEditMedicationOption();
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toContainText("Prescription type");
        await expect(this.addMedicationPanelPage.prescriptionType.repeatLabel).toContainText("Repeat");
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.acute).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionType.acute.click();
        await expect(this.addMedicationPanelPage.prescriptionType.acuteLabel).toContainText("Acute");
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).toBeDisabled();
        const color = await this.EditMedicationPage.repeatDispensingColor.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe("rgb(148, 148, 148)");
        await this.addMedicationPanelPage.prescriptionType.repeatDispensingInput.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Go to EMIS Web to set this medication to repeat dispensing.");
        await this.medicationHomeActions.clickDetailPanelCloseButton();
        await this.addMedicationPanelActions.clickPrescribeDiscardButton();
    }
    
    async numberOfAuthorisedIssuesFieldValidationsInEditScreen() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Alendronic acid 70mg tablets", "presctype", "11", "11","4", "Pharmacy Test", "Patient Test");
        await this.addMedicationPanelActions.clickCloseButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.searchCurrentMedication("presctype");
        await this.medicationHomeActions.clickCurrentMoreOptionsButton();
        await this.clickOnEditMedicationOption();
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.formElement).toBeVisible();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.formElement).toContainText("Number of authorised issues");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("4");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).not.toBeVisible();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("14");
        await this.addMedicationPanelPage.authorisingClinician.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).not.toBeVisible();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("50");
        await this.addMedicationPanelPage.authorisingClinician.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).not.toBeVisible();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("51");
        await this.addMedicationPanelPage.authorisingClinician.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).toBeVisible();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).toContainText("Enter a value between 1 and 50.");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("0");
        await this.addMedicationPanelPage.authorisingClinician.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).toBeVisible();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).toContainText("Enter a value between 1 and 50.");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveCSS("border-color", "rgb(220, 53, 70)");
        await this.medicationHomeActions.clickDetailPanelCloseButton();
        await this.addMedicationPanelActions.clickPrescribeDiscardButton();
    }

}