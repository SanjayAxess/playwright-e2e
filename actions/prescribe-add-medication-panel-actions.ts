import { expect, Page } from "@playwright/test";
import { AddMedicationPanelPage } from "../pages/prescribe-add-medication-panel-page";
import { ClinicalWarningPopupActions } from "./clinical-warning-popup-actions";
import { MedicationHomeActions } from "./medication-home-actions";
import { CommonActions } from "./common-actions";
import { IssueMedicationPanelPage } from "../pages/prescribe-issue-medication-panel-page";
export class AddMedicationPanelActions {
    protected addMedicationPanelPage: AddMedicationPanelPage;
    protected clinicalWarningPopupActions: ClinicalWarningPopupActions;
    protected medicationHomeActions: MedicationHomeActions;
    protected commonActions: CommonActions;
    protected issueMedicationPanelPage: IssueMedicationPanelPage;

    constructor(protected readonly _page: Page) {
        this.addMedicationPanelPage = new AddMedicationPanelPage(this._page);
        this.clinicalWarningPopupActions = new ClinicalWarningPopupActions(this._page);
        this.medicationHomeActions = new MedicationHomeActions(this._page);
        this.commonActions = new CommonActions(this._page);
        this.issueMedicationPanelPage = new IssueMedicationPanelPage(this._page);
    }

    async clickAddMedicationTab() {
        await this.addMedicationPanelPage.addMedicationTab.click();
    }

    async search(medication: string) {
        await this.addMedicationPanelPage.medicationSearch.input.waitFor();
        await this.addMedicationPanelPage.medicationSearch.input.fill(medication);
    }

    async select(medication: string) {
        await this.addMedicationPanelPage.medicationSearch.option(medication).nth(0).waitFor({ state: "visible" });
        (await this.addMedicationPanelPage.medicationSearch.option(medication).count()) === 1
            ? await this.addMedicationPanelPage.medicationSearch.option(medication).first().click()
            : await this.addMedicationPanelPage.medicationSearch.option(medication).getByText(medication).nth(0).click();
    }

    async searchAndSelect(medication: string) {
        await this.search(medication);
        await this.select(medication);
    }

    async enterQuantity(quantity: string) {
        await this.addMedicationPanelPage.quantity.textBox.waitFor();
        await this.addMedicationPanelPage.quantity.textBox.fill(quantity);
    }

    async enterDosage(dosage: string) {
        await this.addMedicationPanelPage.dosage.input.waitFor();
        await this.addMedicationPanelPage.dosage.input.fill(dosage);
    }

    async selectAcutePrescriptionType() {
        await this.addMedicationPanelPage.prescriptionType.acute.click();
    }

    async selectRepeatPrescriptionType() {
        await this.addMedicationPanelPage.prescriptionType.repeat.click();
    }

    async selectRepeatDispensingPrescriptionType() {
        await this.addMedicationPanelPage.prescriptionType.repeatDispensing.click();
    }

    async enterDuration(duration: string) {
        await this.addMedicationPanelPage.duration.textBox.waitFor();
        await this.addMedicationPanelPage.duration.textBox.fill(duration);
    }

    async clickDurationSixMonthsWarningsCheckbox() {
        await this.addMedicationPanelPage.durationSixMonthswarningsCheckbox.checkbox.click();
    }

    async clickMaximumQuantityWarningsCheckbox() {
        await this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.checkbox.click();
    }

    async clickCdDrug30DaysWarningsCheckbox() {
        await this.addMedicationPanelPage.cdDrug30DayswarningsCheckbox.checkbox.click();
    }

    async enterAuthorisedIssues(numberOfAuthorisedIssues: string) {
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.waitFor();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill(numberOfAuthorisedIssues);
    }

    async enterInformationForPharmacy(informationForPharmacy: string) {
        await this.addMedicationPanelPage.informationForPharmacy.textBox.waitFor();
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(informationForPharmacy);
    }

    async enterInformationForPatient(informationForPatient: string) {
        await this.addMedicationPanelPage.informationForPatient.textBox.waitFor();
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(informationForPatient);
    }

    async enterIndividualReviewDate(individualReviewDate: string) {
        await this.addMedicationPanelPage.reviewDate.input.waitFor();
        await this.addMedicationPanelPage.reviewDate.input.fill(individualReviewDate);
    }

    async selectPAPrescriptionOptions() {
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministered.click();
    }

    async selectAssortedFlavourPrescriptionOptions() {
        await this.addMedicationPanelPage.prescriptionOptions.assortedFlavours.click();
    }

    async selectStiUseFSPrescriptionOptions() {
        await this.addMedicationPanelPage.prescriptionOptions.stiUse.click();
    }

    async selectVUPrescriptionOptions() {
        await this.addMedicationPanelPage.prescriptionOptions.variableUse.click();
    }

    async clickAddAndIssue() {
        await this.addMedicationPanelPage.button.addAndIssue.waitFor();
        await this.addMedicationPanelPage.button.addAndIssue.click();
    }

    async clickAddAnother() {
        await this.addMedicationPanelPage.button.addAndIssue.waitFor();
        await this.addMedicationPanelPage.button.addAndAddAnother.click();
    }

    async AcceptRiskWarningAndContinue() {
        await this._page.waitForTimeout(2000);
        if (await this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.checkbox.isVisible() && !await this.addMedicationPanelPage.durationSixMonthswarningsCheckbox.checkbox.isVisible()) {
            console.log("Maximum quantity warning checkbox is visible as quantity exceeds maximum recommended dose");
            await this.clickMaximumQuantityWarningsCheckbox();
        } else if (await this.addMedicationPanelPage.durationSixMonthswarningsCheckbox.checkbox.isVisible() && !await this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.checkbox.isVisible()) {
            console.log("Duration six months warning checkbox is visible as duration is entered above 180 days");
            await this.clickDurationSixMonthsWarningsCheckbox();
        } else if (await this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.checkbox.isVisible() && await this.addMedicationPanelPage.durationSixMonthswarningsCheckbox.checkbox.isVisible()) {
            console.log("Both maximum quantity warning and duration six months warning checkboxes are visible");
            await this.clickMaximumQuantityWarningsCheckbox();
            await this.clickDurationSixMonthsWarningsCheckbox();
        } else if (await this.addMedicationPanelPage.cdDrug30DayswarningsCheckbox.checkbox.isVisible()) {
            console.log("CD drug 30 days warning checkbox is visible as quantity exceeds maximum recommended dose for CD drugs");
            await this.clickCdDrug30DaysWarningsCheckbox();
        }
        else {
            console.log("No warning checkboxes are visible");
        }
    }

    async addAcuteMedication(medication: string, dosage: string, quantity: string, duration: string, informationForPharmacy?: string, informationForPatient?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectAcutePrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async addRepeatMedication(medication: string, dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues: string, informationForPharmacy?: string, informationForPatient?: string, individualReviewDate?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectRepeatPrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.enterAuthorisedIssues(numberOfAuthorisedIssues);
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.enterIndividualReviewDate(individualReviewDate ? individualReviewDate : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async addRepeatDispensingMedication(medication: string, dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues?: string, informationForPharmacy?: string, informationForPatient?: string, individualReviewDate?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectRepeatDispensingPrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.enterAuthorisedIssues(numberOfAuthorisedIssues ? numberOfAuthorisedIssues : "");
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.enterIndividualReviewDate(individualReviewDate ? individualReviewDate : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async addPersonallyAdministeredRepeatMedication(medication: string, dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues: string, informationForPharmacy?: string, informationForPatient?: string, individualReviewDate?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectRepeatPrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.enterAuthorisedIssues(numberOfAuthorisedIssues);
        await this.selectPAPrescriptionOptions();
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.enterIndividualReviewDate(individualReviewDate ? individualReviewDate : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async addStiUseFSRepeatMedication(medication: string, dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues: string, informationForPharmacy?: string, informationForPatient?: string, individualReviewDate?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectRepeatPrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.enterAuthorisedIssues(numberOfAuthorisedIssues);
        await this.selectStiUseFSPrescriptionOptions();
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.enterIndividualReviewDate(individualReviewDate ? individualReviewDate : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async addAssortedFlavoursAcuteMedication(medication: string, dosage: string, quantity: string, duration: string, informationForPharmacy?: string, informationForPatient?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectAcutePrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.selectAssortedFlavourPrescriptionOptions();
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async addVURepeatDispensingMedication(medication: string, dosage: string, quantity: string, duration: string, numberOfAuthorisedIssues?: string, informationForPharmacy?: string, informationForPatient?: string, individualReviewDate?: string) {
        await this.clickAddMedicationTab();
        await this.searchAndSelect(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage(dosage);
        await this.enterQuantity(quantity);
        await this.enterDuration(duration);
        await this.selectRepeatDispensingPrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.selectVUPrescriptionOptions();
        await this.enterAuthorisedIssues(numberOfAuthorisedIssues ? numberOfAuthorisedIssues : "");
        await this.enterInformationForPharmacy(informationForPharmacy ? informationForPharmacy : "");
        await this.enterInformationForPatient(informationForPatient ? informationForPatient : "");
        await this.enterIndividualReviewDate(individualReviewDate ? individualReviewDate : "");
        await this.clickAddAnother();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async clickCloseButton() {
        await this.addMedicationPanelPage.button.cancelAdd.waitFor();
        await this.addMedicationPanelPage.button.cancelAdd.click();
    }

    async clickPrescribeDiscardButton() {
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyCD2Text(MedName: string) {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect(MedName);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.clinicalWarningPopupActions.clickViewButtonandverifyCDStatusText("Schedule 2 (CD)");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyCD3Text(MedName: string) {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect(MedName);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.clinicalWarningPopupActions.clickViewButtonandverifyCDStatusText("Schedule 3 (CD No Register)");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyCD4Text1(MedName: string) {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect(MedName);
        await this.clinicalWarningPopupActions.verifyCDStatusText("Schedule 4 (CD Anab)");
        await this.clickCloseButton();
    }

    async verifyCD4Text2(MedName: string) {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect(MedName);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.clinicalWarningPopupActions.clickViewButtonandverifyCDStatusText("Schedule 4 (CD Benz)");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyCD5Text(MedName: string) {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect(MedName);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.clinicalWarningPopupActions.clickViewButtonandverifyCDStatusText("Schedule 5 (CD Inv)");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyNoTextForNonCDDrugs(MedName: string) {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect(MedName);
        await this.clinicalWarningPopupActions.verifyCDStatusText("");
        await this.clickCloseButton();
    }

    async verifyMedicationFieldErrorMessage() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.search("");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.medicationSearch.error("test-select-a-medication").waitFor();
        expect(this.addMedicationPanelPage.medicationSearch.error("test-select-a-medication")).toContainText("Select a medication.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
    }

    async verifyDosageFieldErrorMessage() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage")).toContainText("Select or enter a dosage.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyQuantityFieldErrorMessage() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying quantity field error message");
        await this.enterQuantity("");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.dosage.error("test-enter-a-quantity").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyDurationFieldErrorMessage() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying duration field error message");
        await this.enterQuantity("10");
        await this.enterDuration("");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.dosage.error("test-enter-a-duration").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-enter-a-duration")).toContainText("Enter a duration.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.enterDuration("10");
        await this.selectRepeatPrescriptionType();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).not.toBeVisible();
        await this.enterDuration("0");
        await this.clickAddMedicationTab();
        await this.addMedicationPanelPage.duration.error("test-enter-a-duration-greater-than-0").waitFor();
        expect(this.addMedicationPanelPage.duration.error("test-enter-a-duration-greater-than-0")).toContainText("Enter a duration greater than 0.");
        const errorMessage = this.addMedicationPanelPage.duration.error("test-enter-a-duration-greater-than-0");
        const whiteSpace = await errorMessage.evaluate((el) => getComputedStyle(el).whiteSpace);
        const overflow = await errorMessage.evaluate((el) => getComputedStyle(el).overflow);
        const errorMessageWidth = await errorMessage.evaluate((el) => getComputedStyle(el).width);
        expect(errorMessageWidth).toBe("130px");
        expect(whiteSpace).toBe("normal");
        expect(overflow).not.toBe("hidden");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyErrorMessageWithoutEnteringAllMandatoryFields() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.dosage.error("test-enter-a-quantity").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage")).toContainText("Select or enter a dosage.");
        await this.addMedicationPanelPage.dosage.error("test-enter-a-quantity").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await this.addMedicationPanelPage.dosage.error("test-enter-a-duration").waitFor();
        expect(this.addMedicationPanelPage.dosage.error("test-enter-a-duration")).toContainText("Enter a duration.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
    }

    async VerifyErrorBannerAndWarningForRDOver365Days() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying duration field error message");
        await this.enterQuantity("1");
        await this.selectRepeatDispensingPrescriptionType();
        await this.enterDuration("29");
        await this.enterAuthorisedIssues("13");
        await this.addMedicationPanelPage.duration.formElement.click();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues").waitFor();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues")).toContainText("Repeat dispensing courses must be 365 days or less. Reduce the number of authorised issues.");
        await this.enterIndividualReviewDate("21-Mar-2026");
        await this.clickAddAndIssue();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues")).toContainText("Repeat dispensing courses must be 365 days or less. Reduce the number of authorised issues.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.enterAuthorisedIssues("12");
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues")).not.toBeVisible();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).not.toBeVisible();
        await this.enterDuration("73");
        await this.enterAuthorisedIssues("05");
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues")).not.toBeVisible();
        await this.enterDuration("61");
        await this.enterAuthorisedIssues("");
        await this.addMedicationPanelPage.duration.formElement.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues")).not.toBeVisible();
        await this.clickAddAndIssue();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("6");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-repeat-dispensing-courses-must-be-365-days-or-less-reduce-the-number-of-authorised-issues")).toContainText("Repeat dispensing courses must be 365 days or less. Reduce the number of authorised issues.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async VerifyAuthorisingClinicianFieldErrorBanner() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying information for pharmacy field error message");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.addMedicationPanelPage.authorisingClinician.clearButton.click();
        await this.clickAddAndIssue();
        expect(this.addMedicationPanelPage.authorisingClinician.error("test-select-an-authorising-clinician")).toContainText("Select an authorising clinician");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async VerifyInformationForPharmacyFieldErrorBanner() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying information for pharmacy field error message");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.enterInformationForPharmacy("`1234567890-=~!@#$%^&*()_+[]'\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM-1234");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.informationForPharmacy.error("informationForPharmacyField").waitFor();
        expect(this.addMedicationPanelPage.informationForPharmacy.error("informationForPharmacyField")).toContainText("Character limit exceeded by 4");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async VerifyInformationForPatientFieldErrorBanner() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying information for pharmacy field error message");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.enterInformationForPatient("`1234567890-=~!@#$%^&*()_+[]'\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM-1234");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.informationForPharmacy.error("informationForPatientField").waitFor();
        expect(this.addMedicationPanelPage.informationForPharmacy.error("informationForPatientField")).toContainText("Character limit exceeded by 4");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }
    async verifyReviewDateFieldErrorMessage() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("verifying review date field error message");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectRepeatPrescriptionType();
        await this.enterIndividualReviewDate("12-Feb-1995");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.reviewDate.error("test-the-date-must-be-in-the-next-12-months").waitFor();
        expect(this.addMedicationPanelPage.reviewDate.error("test-the-date-must-be-in-the-next-12-months")).toContainText("The date must be in the next 12 months.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.enterIndividualReviewDate("09-Feb");
        await this.clickAddAndIssue();
        expect(this.addMedicationPanelPage.reviewDate.error("test-enter-a-date-in-the-format-dd-mmm-yyyy")).toContainText("Enter a date in the format dd-Mmm-yyyy.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyNoErrorAfterEnteringValidData() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.medicationSearch.error("test-select-a-medication").waitFor();
        expect(this.addMedicationPanelPage.medicationSearch.error("test-select-a-medication")).toContainText("Select a medication.");
        expect(this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage")).toContainText("Select or enter a dosage.");
        expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("valid dosage");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectAcutePrescriptionType();
        await this.enterInformationForPharmacy("valid information for pharmacy");
        await this.enterInformationForPatient("valid information for patient");
        await this.enterIndividualReviewDate("12-Feb-2024");
        await this.clickAddAndIssue();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).not.toBeVisible();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyPrescribeDiscardDialogWhenClickingOnXbuttonWithOnlyMedicationFieldPopulated() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.clickCloseButton();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discarddialogContent).toContainText("You have not finished adding new medication: Simple eye ointment. Are you sure you want to discard it without adding it to the record or issuing it?");
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogCancelButton.click();
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("Simple eye ointment");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyPrescribeDiscardDialogWhenClickingOnXbuttonWithAllFieldsPopulatedExceptMedicationField() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("10");
        await this.enterInformationForPharmacy("valid information for pharmacy");
        await this.enterInformationForPatient("valid information for patient");
        await this.enterIndividualReviewDate("12-Mar-2026");
        await this.clickCloseButton();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyClickingOnCancelbuttonInDiscardDialogReturnsToPrescribeMedicationPanelWithPreviouslyFilledInData() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("10");
        await this.enterInformationForPharmacy("valid information for pharmacy");
        await this.enterInformationForPatient("valid information for patient");
        await this.enterIndividualReviewDate("12-Mar-2026");
        await this.clickCloseButton();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogCancelButton.click();
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("10");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("5");
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).toBeChecked();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("10");
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toContainText("valid information for pharmacy");
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toContainText("valid information for patient");
        await expect(this.addMedicationPanelPage.reviewDate.input).toHaveValue("12-Mar-2026");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyPrescribePanelClosedIfClickingOnXButtonWithNoDrugInfoAdded() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.clickCloseButton();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).not.toBeVisible();
    }

    async verifyClickingOnDiscardButtonInDiscardDialogClosesPrescribeDialogAndPanel() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("10");
        await this.enterInformationForPharmacy("valid information for pharmacy");
        await this.enterInformationForPatient("valid information for patient");
        await this.enterIndividualReviewDate("12-Mar-2026");
        await this.clickCloseButton();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
        await expect(this.addMedicationPanelPage.addMedicationTab).not.toBeVisible();
    }

    async verifyClickingOnXbuttonInDiscardDialogReturnsToPrescribeMedicationPanelWithPreviouslyFilledInData() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("10");
        await this.enterInformationForPharmacy("valid information for pharmacy");
        await this.enterInformationForPatient("valid information for patient");
        await this.enterIndividualReviewDate("12-Mar-2026");
        await this.clickCloseButton();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogXButton.click();
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("10");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("5");
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).toBeChecked();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("10");
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toHaveText("valid information for pharmacy");
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toHaveText("valid information for patient");
        await expect(this.addMedicationPanelPage.reviewDate.input).toHaveValue("12-Mar-2026");
        await this.clickCloseButton();
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton.click();
    }

    async verifyAddDrugError(error: number) {
        await this.commonActions.mockUrl("**/medication", error);
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Aspirin 75mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("dosage");
        await this.enterQuantity("12");
        await this.enterDuration("12");
        await this.selectAcutePrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.clickAddAnother();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Couldn't add medication");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Try again");
        await this.clickCloseButton();
        await this.commonActions.unMockUrl();
        await this.clickPrescribeDiscardButton();
    }

    async verifyAddDrugBlockError() {
        await this.commonActions.blockAPI("**/medication");
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Aspirin 75mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("dosage");
        await this.enterQuantity("12");
        await this.enterDuration("12");
        await this.selectAcutePrescriptionType();
        await this.AcceptRiskWarningAndContinue();
        await this.clickAddAnother();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Couldn't add medication");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Try again");
        await this.clickCloseButton();
        await this.commonActions.unblockAPI("**/medication");
        await this.clickPrescribeDiscardButton();
    }

    async verifyClinicalWarningError(error: number) {
        await this.commonActions.mockUrl("**/prescriber-warnings", error);
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Aspirin 75mg tablets");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("Cannot prescribe medication");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("EMIS-X couldn't load clinical decision support. Try loading again or prescribe the medication in EMIS Web instead.");
        await expect(this.addMedicationPanelPage.button.addAndIssue).toBeDisabled();
        await expect(this.addMedicationPanelPage.button.addAndAddAnother).toBeDisabled();
        await this.addMedicationPanelPage.button.clinicalWarningsErrorBanner_TryAgain.click();
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("Cannot prescribe medication");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("EMIS-X couldn't load clinical decision support. Try loading again or prescribe the medication in EMIS Web instead.");
        await expect(this.addMedicationPanelPage.button.addAndIssue).toBeDisabled();
        await expect(this.addMedicationPanelPage.button.addAndAddAnother).toBeDisabled();
        await this.commonActions.unMockUrl();
        await this.addMedicationPanelPage.button.clinicalWarningsErrorBanner_TryAgain.click();
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).not.toContainText("Cannot prescribe medication");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).not.toContainText("EMIS-X couldn't load clinical decision support. Try loading again or prescribe the medication in EMIS Web instead.");
        await expect(this.addMedicationPanelPage.button.addAndIssue).not.toBeDisabled();
        await expect(this.addMedicationPanelPage.button.addAndAddAnother).not.toBeDisabled();
        await this.clickCloseButton();
        await this.commonActions.unMockUrl();
        await this.clickPrescribeDiscardButton();
    }

    async verifyClinicalWarningBlockError() {
        await this.commonActions.blockAPI("**/prescriber-warnings");
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Aspirin 75mg tablets");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("Cannot prescribe medication");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("EMIS-X couldn't load clinical decision support. Try loading again or prescribe the medication in EMIS Web instead.");
        await expect(this.addMedicationPanelPage.button.addAndIssue).toBeDisabled();
        await expect(this.addMedicationPanelPage.button.addAndAddAnother).toBeDisabled();
        await this.addMedicationPanelPage.button.clinicalWarningsErrorBanner_TryAgain.click();
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("Cannot prescribe medication");
        await expect(this.addMedicationPanelPage.medicationClinicalWarningValidationBanner).toContainText("EMIS-X couldn't load clinical decision support. Try loading again or prescribe the medication in EMIS Web instead.");
        await expect(this.addMedicationPanelPage.button.addAndIssue).toBeDisabled();
        await expect(this.addMedicationPanelPage.button.addAndAddAnother).toBeDisabled();
        await this.commonActions.unblockAPI("**/prescriber-warnings");
        await this.addMedicationPanelPage.button.clinicalWarningsErrorBanner_TryAgain.click();
        await this._page.waitForTimeout(2000);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.button.addAndIssue).not.toBeDisabled();
        await expect(this.addMedicationPanelPage.button.addAndAddAnother).not.toBeDisabled();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async validateDiscardDialog(discarddialog: string, dialogContent: string) {
        await this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog.waitFor();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toContainText(discarddialog);
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardDialogDiscardMedicationButton).toBeVisible();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardDialogCancelButton).toBeVisible();
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discarddialogContent).toContainText(dialogContent);
    }

    async clickDiscardDialogCancelButton() {
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogCancelButton.click();
    }

    async clickDiscardDialogXButton() {
        await this.addMedicationPanelPage.prescribeDiscardButton.discardDialogXButton.click();
    }

    async verifyDiscardDialogIsVisible() {
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).toBeVisible();
    }

    async verifyDiscardDialogIsNotVisible() {
        await expect(this.addMedicationPanelPage.prescribeDiscardButton.discardWarningdialog).not.toBeVisible();
    }

    async verifyMedicationFieldInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.medicationSearch.formElement.waitFor();
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("Medication");
        await expect(this.addMedicationPanelPage.medicationSearch.input).toHaveAttribute("placeholder", "Search for medication");
        await this.addMedicationPanelPage.medicationSearch.input.click();
        await expect(this.addMedicationPanelPage.medicationSearch.error("textOnlyItem")).toContainText("Begin typing to search");
        await this.searchAndSelect("Aspirin 75mg dispersible tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("Aspirin 75mg dispersible tablets");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await expect(this.addMedicationPanelPage.medicationSearch.input).toHaveValue("Aspirin 75mg dispersible tablets");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await expect(this.addMedicationPanelPage.medicationSearch.input).toHaveValue("");
        await this.search("par");
        await expect(this._page.getByTestId("medicationSearchItemDescriptionText")).toHaveCount(50);
        await expect(this.addMedicationPanelPage.medicationSearch.error("infiniteScrollListEndOfList")).not.toBeVisible();
        await this._page.getByRole("option").nth(49).scrollIntoViewIfNeeded();
        await expect(this._page.getByTestId("medicationSearchItemDescriptionText")).toHaveCount(99);
        await expect(this.addMedicationPanelPage.medicationSearch.error("infiniteScrollListEndOfList")).not.toBeVisible();
        await this._page.getByRole("option").nth(99).scrollIntoViewIfNeeded();
        await expect(this._page.getByTestId("medicationSearchItemDescriptionText")).toHaveCount(122);
        await expect(this.addMedicationPanelPage.medicationSearch.error("infiniteScrollListEndOfList")).toContainText("End of list");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.search("aaaaa");
        await expect(this.addMedicationPanelPage.medicationSearch.error("textOnlyItem")).toContainText("No results found. Try using a different search term.");
        await this.clickCloseButton();
    }

    async verifyDosageFieldInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.dosage.formElement.waitFor();
        await expect(this.addMedicationPanelPage.dosage.formElement).toContainText("Dosage");
        await expect(this.addMedicationPanelPage.dosage.input).toHaveValue("");
        await expect(this.addMedicationPanelPage.dosage.input).toHaveAttribute("placeholder", "Select or enter a dosage");
        await this.addMedicationPanelPage.dosage.input.click();
        await expect(this.addMedicationPanelPage.dosage.error("medsErrorItemText")).toContainText("A medication must be selected before any dosages can be viewed.");
        await this.addMedicationPanelPage.dosage.input.fill("FreeText data");
        await expect(this.addMedicationPanelPage.dosage.error("medsErrorItemText")).toContainText("A medication must be selected before any dosages can be viewed.");
        await this.addMedicationPanelPage.dosage.dropDownButton.click();
        await expect(this.addMedicationPanelPage.dosage.error("medsErrorItemText")).not.toBeVisible();
        await this.addMedicationPanelPage.quantity.formElement.click({ force: true });
        //Validating Freetext filter search on the Dosage field
        await this.searchAndSelect("Paracetamol Caplets 500 mg");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.addMedicationPanelPage.dosage.input.click();
        await expect(this.addMedicationPanelPage.dosage.error("medsErrorItemText")).not.toBeVisible();
        await expect(this.addMedicationPanelPage.dosage.input).not.toHaveValue("FreeText data");
        await expect(this.addMedicationPanelPage.dosage.option("One To Be Taken Every 4-6 Hours Up To Four Times A Day")).toBeVisible();
        await expect(this.addMedicationPanelPage.dosage.option("Two To Be Taken Every 4-6 Hours Up To Four Times A Day")).toBeVisible();
        await this.addMedicationPanelPage.dosage.input.fill("One");
        await expect(this.addMedicationPanelPage.dosage.option("One To Be Taken Every 4-6 Hours Up To Four Times A Day")).toBeVisible();
        await expect(this.addMedicationPanelPage.dosage.option("Two To Be Taken Every 4-6 Hours Up To Four Times A Day")).not.toBeVisible();
        await this.addMedicationPanelPage.dosage.input.fill("Two");
        await expect(this.addMedicationPanelPage.dosage.option("One To Be Taken Every 4-6 Hours Up To Four Times A Day")).not.toBeVisible();
        await expect(this.addMedicationPanelPage.dosage.option("Two To Be Taken Every 4-6 Hours Up To Four Times A Day")).toBeVisible();
        await this.addMedicationPanelPage.dosage.input.fill("Three");
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).toContainText("No matching dosages found.");
        await this.addMedicationPanelPage.dosage.clearButton.click();
        await expect(this.addMedicationPanelPage.dosage.input).toHaveValue("");
        await expect(this.addMedicationPanelPage.dosage.option("One To Be Taken Every 4-6 Hours Up To Four Times A Day")).toBeVisible();
        await expect(this.addMedicationPanelPage.dosage.option("Two To Be Taken Every 4-6 Hours Up To Four Times A Day")).toBeVisible();
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).not.toBeVisible();
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        //Validating No associated dosage message on the Dosage field for drugs without any dosages
        await this.searchAndSelect("Paracetamol 120mg suppositories");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.addMedicationPanelPage.dosage.input.click();
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).toContainText("No suggested dosages are available for this medication. You have the option to enter your dosage instructions here.");
        await this.addMedicationPanelPage.dosage.dropDownButton.click();
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).not.toBeVisible();
        await this.addMedicationPanelPage.dosage.dropDownButton.click();
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).toContainText("No suggested dosages are available for this medication. You have the option to enter your dosage instructions here.");
        await this.addMedicationPanelPage.dosage.input.fill("FreeText data");
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).toContainText("No suggested dosages are available for this medication. You have the option to enter your dosage instructions here.");
        await this.addMedicationPanelPage.dosage.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).not.toBeVisible();
        await this.addMedicationPanelPage.dosage.error("edit-button-dosage").click();
        await expect(this.addMedicationPanelPage.dosage.error("textOnlyItem")).toContainText("No suggested dosages are available for this medication. You have the option to enter your dosage instructions here.");
        await expect(this.addMedicationPanelPage.dosage.input).toHaveValue("FreeText data");
        await this.addMedicationPanelPage.dosage.clearButton.click();
        await expect(this.addMedicationPanelPage.dosage.input).toHaveValue("");
    }

    async verifyQuantityFieldInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.quantity.formElement.waitFor();
        await expect(this.addMedicationPanelPage.quantity.formElement).toContainText("Quantity");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("");
        await this.addMedicationPanelPage.quantity.textBox.fill("123456");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("123456");
        await expect(this.addMedicationPanelPage.quantity.textBox).toBeFocused();
        await this.addMedicationPanelPage.quantity.textBox.fill("123456.99");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("123456.99");
        await this.addMedicationPanelPage.quantity.textBox.clear();
        await this.addMedicationPanelPage.quantity.textBox.pressSequentially("999999.99");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("999999.99");
        await this.addMedicationPanelPage.quantity.textBox.clear();
        await this.addMedicationPanelPage.quantity.textBox.pressSequentially("1234567890");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("123456");
        await this.addMedicationPanelPage.quantity.textBox.clear();
        await this.addMedicationPanelPage.quantity.textBox.pressSequentially("0.1234567890");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("0.12");
        await this.addMedicationPanelPage.quantity.textBox.clear();
        // Validating quantity should be greater than 0
        await this.addMedicationPanelPage.quantity.textBox.fill("0");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity-greater-than-0")).toContainText("Enter a quantity greater than 0.");
        await this.addMedicationPanelPage.quantity.textBox.fill("0.02");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity-greater-than-0")).not.toBeVisible();
        // Validating UoM is showing in Quantity field of EMIS-X prescribe medication panel
        await this.searchAndSelect("Salbutamol 100micrograms");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("inhalers x 200 dose");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Fortisip 2kcal liquid");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("bottles x 200 ml");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Complan Shake oral powder 57g sachets (Flavour Not Specified)");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("sachets");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Comfifast Easywrap stockinette clava");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("devices");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Cutimed Alginate dressing 10cm x 10cm (Essity UK Ltd)");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("dressings");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Fresubin 1000 Complete liquid (Fresenius Kabi Ltd)");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("bags x 1 litre");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Lidocaine");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("ampoules");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Leukopor tape 2.5cm");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("m");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Lifestyle gluten free brown bread rolls");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.quantity.Label).toContainText("packs x 400 gram");
    }

    async verifyDurationFieldInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.duration.formElement.waitFor();
        await expect(this.addMedicationPanelPage.duration.formElement).toContainText("Duration");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("");
        await this.addMedicationPanelPage.duration.textBox.fill("12345");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("12345");
        await expect(this.addMedicationPanelPage.duration.textBox).toBeFocused();
        await this.addMedicationPanelPage.duration.textBox.fill("98765");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("98765");
        await this.addMedicationPanelPage.duration.textBox.clear();
        await this.addMedicationPanelPage.duration.textBox.pressSequentially("99999.99");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("99999");
        await this.addMedicationPanelPage.duration.textBox.clear();
        await this.addMedicationPanelPage.duration.textBox.pressSequentially("1234567890");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("12345");
        await this.addMedicationPanelPage.duration.textBox.clear();
        await this.addMedicationPanelPage.duration.textBox.pressSequentially("0.1234567890");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("01234");
        await this.addMedicationPanelPage.duration.textBox.clear();
        await this.clickCloseButton();
    }

    async verifyPrescriptionTypeFieldInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionType.formElement.waitFor();
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toContainText("Prescription type");
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toContainText("Acute");
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toContainText("Repeat");
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toContainText("Repeat dispensing");
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionType.repeat.click();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.acute).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionType.repeatDispensing.click();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.acute).not.toBeChecked();
        // Validate The radio option will be reset back to 'Acute' if the medication is removed (cleared from the medication field)
        await this.searchAndSelect("Lidocaine");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.addMedicationPanelPage.prescriptionType.repeat.check();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).toBeChecked();
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeChecked();
        // Validate Schedule 2 or 3 medications are restricted from adding as Repeat Dispensing
        await this.searchAndSelect("Morphine 5mg modified");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).not.toContainText("Repeat dispensing");
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeVisible();
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Temazepam 20mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).not.toContainText("Repeat dispensing");
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeVisible();
        // Validate Schedule 4 medications are NOT restricted from adding as Repeat Dispensing
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Nitrazepam 5mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionType.formElement).toContainText("Repeat dispensing");
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).toBeVisible();
    }

    async verifyNoOfAuthorisedIssuesFieldInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.formElement).not.toBeVisible();
        // Validate Number of Authorised issues field with different data when repeat is selected
        await this.addMedicationPanelPage.prescriptionType.repeat.click();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.formElement).toContainText("Number of authorised issues");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("0");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("0");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toBeFocused();
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).toContainText("Enter a value between 1 and 50.");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("50");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("50");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).not.toBeVisible();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("51");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("51");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).toContainText("Enter a value between 1 and 50.");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("1");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("1");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-1-and-50")).not.toBeVisible();
        // Validate Number of Authorised issues field with different data when repeat dispensing is selected
        await this.addMedicationPanelPage.prescriptionType.repeatDispensing.check();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.formElement).toBeVisible();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("0");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("0");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-2-and-13")).toContainText("Enter a value between 2 and 13.");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("13");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("13");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-2-and-13")).not.toBeVisible();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("14");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("14");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-2-and-13")).toContainText("Enter a value between 2 and 13.");
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("2");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("2");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-2-and-13")).not.toBeVisible();
        await this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox.fill("1");
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.textBox).toHaveValue("1");
        await this.addMedicationPanelPage.duration.formElement.click({ force: true });
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.error("test-enter-a-value-between-2-and-13")).toContainText("Enter a value between 2 and 13.");
    }

    async verifySLSCheckboxInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionOptions.formElement.waitFor({ state: 'visible' });
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("Prescription options");
        // Verify SLS checkbox is NOT visible when the medication is not Selected
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("SLS");
        await expect(this.addMedicationPanelPage.prescriptionOptions.sls).not.toBeVisible();
        // Verify SLS checkbox is NOT visible when medication which is not SLS is selected
        await this.searchAndSelect("Lifestyle gluten free brown bread rolls");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("SLS");
        await expect(this.addMedicationPanelPage.prescriptionOptions.sls).not.toBeVisible();
        // Verify SLS checkbox is visible when medication which is SLS is selected
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await this.searchAndSelect("Avanafil 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("SLS");
        await expect(this.addMedicationPanelPage.prescriptionOptions.sls).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.sls).toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.sls.uncheck();
        await expect(this.addMedicationPanelPage.prescriptionOptions.sls).not.toBeChecked();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyContraceptiveCheckboxInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionOptions.formElement.waitFor({ state: 'visible' });
        // Verify SLS checkbox is NOT visible when the medication is not Selected
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("Contraceptive use");
        await expect(this.addMedicationPanelPage.prescriptionOptions.contraceptiveUse).not.toBeVisible();

        // Verify contraceptive checkbox is NOT visible for non-contraceptive medication
        await this.searchAndSelect("Aspirin 75mg dispersible tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("Contraceptive use");
        await expect(this.addMedicationPanelPage.prescriptionOptions.contraceptiveUse).not.toBeVisible();
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();

        // Verify contraceptive checkbox is visible and checked for contraceptive medication
        await this.searchAndSelect("Co-cyprindiol 2000microgram");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("Contraceptive use");
        await expect(this.addMedicationPanelPage.prescriptionOptions.contraceptiveUse).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.contraceptiveUse).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.contraceptiveUse).not.toBeDisabled();

        // Verify SLS checkbox is NOT visible for contraceptive medication
        await expect(this.addMedicationPanelPage.prescriptionOptions.sls).not.toBeVisible();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyPersonallyAdministeredOptionInPrescribePanel() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionOptions.formElement.waitFor({ state: 'visible' });
        // Verify Personally Admininstered checkbox is visible when the medication is not Selected
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("Personally administered");
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).toBeVisible();

        // Validate Personally Administered checkbox for Acute Prescription
        await this.searchAndSelect("Avanafil 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("Dosage data for PA test");
        await this.enterQuantity("12");
        await this.enterDuration("12");
        await this.selectAcutePrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).not.toBeDisabled();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministeredLabel.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Administered to the patient by a healthcare professional");

        // Validate Personally Administered checkbox for Repeat Prescription
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("4");
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).not.toBeDisabled();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministeredLabel.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Administered to the patient by a healthcare professional");

        // Validate Personally Administered checkbox is disabled for Repeat Dispensing Prescription
        await this.selectRepeatDispensingPrescriptionType();
        await this.enterAuthorisedIssues("4");
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).toBeDisabled();
        await expect(this.addMedicationPanelPage.prescriptionOptions.personallyAdministered).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministeredLabel.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Administered to the patient by a healthcare professional. Not applicable for repeat dispensing prescriptions");
        await this.selectRepeatPrescriptionType();
        await this.addMedicationPanelPage.prescriptionOptions.personallyAdministered.click();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).toBeDisabled();
        await this.addMedicationPanelPage.prescriptionType.repeatDispensingLabel.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Not applicable for personally administered medication");
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifySTIUseFSCheckboxInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionOptions.formElement.waitFor({ state: 'visible' });
        // Verify STI use (FS) checkbox is visible when the medication is not selected
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("STI use (FS)");
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeVisible();

        // Verify STI use (FS) checkbox is visible and enabled for Acute Prescription
        await this.searchAndSelect("Fortisip 2kcal liquid");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("once");
        await this.enterQuantity("1");
        await this.enterDuration("1");
        await this.selectAcutePrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("STI use (FS)");
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.stiUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeChecked();

        // Verify STI use (FS) checkbox is visible and enabled for Repeat Prescription
        await this.selectRepeatPrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("STI use (FS)");
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.stiUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.stiUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeChecked();

        // Verify STI use (FS) checkbox is visible and enabled for Repeat Dispensing Prescription
        await this.selectRepeatDispensingPrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).toContainText("STI use (FS)");
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.stiUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.stiUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.stiUse).toBeChecked();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyVariableUseCheckboxInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionOptions.formElement.waitFor({ state: 'visible' });
        // Verify Variable use checkbox is not visible when the medication is not selected
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("Variable use");
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeVisible();

        // Verify Variable use checkbox is not visible for Acute Prescription
        await this.searchAndSelect("Fortisip 2kcal liquid");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("once");
        await this.enterQuantity("1");
        await this.enterDuration("1");
        await this.selectAcutePrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("Variable use");

        // Verify Variable use checkbox is visible and enabled for Repeat Prescription
        await this.selectRepeatPrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.variableUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeDisabled();
        await this.addMedicationPanelPage.prescriptionType.acuteLabel.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Not applicable for variable use medication.");
        await this.addMedicationPanelPage.prescriptionOptions.variableUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeChecked();

        // Verify Variable use checkbox is visible and enabled for Repeat Dispensing Prescription
        await this.selectRepeatDispensingPrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.variableUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeDisabled();
        await this.addMedicationPanelPage.prescriptionType.acuteLabel.hover();
        await expect(this._page.getByTestId("tooltip-text").first()).toContainText("Not applicable for variable use medication.");
        await this.addMedicationPanelPage.prescriptionOptions.variableUse.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.variableUse).not.toBeChecked();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyAssortedFlavourCheckboxInPrescribeAddTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.prescriptionOptions.formElement.waitFor({ state: 'visible' });

        // Verify Assorted flavour checkbox is not visible when the medication is not selected
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("Assorted flavour");
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeVisible();

        // Verify Assorted flavour checkbox is NOT visible for non-Assorted flavour medication
        await this.searchAndSelect("Aspirin 75mg dispersible tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.addMedicationPanelPage.prescriptionOptions.formElement).not.toContainText("Assorted flavour");
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeVisible();
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();

        // Verify Assorted flavour checkbox is visible and enabled for assorted flavour drugs
        await this.searchAndSelect("Fortisip 2kcal liquid (Flavour Not Specified)");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("once");
        await this.enterQuantity("1");
        await this.enterDuration("1");
        await this.selectAcutePrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.assortedFlavours.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeChecked();

        // Verify Assorted flavour checkbox is visible and enabled for Repeat Prescription
        await this.selectRepeatPrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.assortedFlavours.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.assortedFlavours.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeChecked();

        // Verify Assorted flavour checkbox is visible and enabled for Repeat Dispensing Prescription
        await this.selectRepeatDispensingPrescriptionType();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeVisible();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeDisabled();
        await this.addMedicationPanelPage.prescriptionOptions.assortedFlavours.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).not.toBeChecked();
        await this.addMedicationPanelPage.prescriptionOptions.assortedFlavours.click();
        await expect(this.addMedicationPanelPage.prescriptionOptions.assortedFlavours).toBeChecked();
        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }


    async verifyAuthorisingClinicianInPrescribePanel() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.authorisingClinician.formElement.waitFor({ state: 'visible' });
        await expect(this.addMedicationPanelPage.authorisingClinician.formElement).toContainText("Authorising clinician");
        const environment = process.env.ENV || "int";
        let expectedClinicianName = "";
        if (environment === "dev") {
            expectedClinicianName = "WATSON, Emma (Miss)";
        } else if (environment === "int") {
            expectedClinicianName = "WATSON, Emma (Miss)";
        } else if (environment === "stg") {
            expectedClinicianName = "SMITH, Maggie (Miss)";
        }
        await expect(this.addMedicationPanelPage.authorisingClinician.input).toHaveValue(expectedClinicianName);
        await this.addMedicationPanelPage.authorisingClinician.clearButton.click();
        await expect(this.addMedicationPanelPage.authorisingClinician.input).toHaveValue("");
        await this.addMedicationPanelPage.authorisingClinician.input.fill("TeamFaraday");
        await expect(this.addMedicationPanelPage.authorisingClinician.option(expectedClinicianName)).toContainText("TeamFaraday@emishealth.com");
    }

    async validateInformationForPharmacyField() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.informationForPharmacy.formElement.waitFor({ state: 'visible' });

        // Field and Label texts validation
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText("Information for pharmacy");
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText(
            "This will be printed on the left-hand side of the prescription, below the relevant medication."
        );
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toBeVisible();
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toHaveValue("");
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).not.toBeFocused();
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText("500 characters remaining");

        // Characters remaining count validation
        const inputText1 = "`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100";
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(inputText1);
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toBeFocused();
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toHaveValue(inputText1);
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText("400 characters remaining");

        const inputText2 =
            "`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM";
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(inputText2);
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText("0 characters remaining");

        // Leading and Trailing spaces not removal validation
        const inputText3 = "    Remove spaces before and after but not in the, middle   ";
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(inputText3);
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toHaveValue(inputText3);
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText("440 characters remaining");
        await this.addMedicationPanelPage.informationForPatient.textBox.click();
        await expect(this.addMedicationPanelPage.informationForPharmacy.formElement).toContainText("440 characters remaining");

        // Character limit exceed validation
        const inputText4 =
            "`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM-1234";
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(inputText4);
        await expect(this.addMedicationPanelPage.informationForPharmacy.error("informationForPharmacyField")).toContainText(
            "Character limit exceeded by 5"
        );

        const inputText5 =
            "Test-`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM";
        await this.addMedicationPanelPage.informationForPharmacy.textBox.fill(inputText5);
        await expect(this.addMedicationPanelPage.informationForPharmacy.error("informationForPharmacyField")).toContainText(
            "Character limit exceeded by 505"
        );

        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async validateInformationForPatientField() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.informationForPatient.formElement.waitFor({ state: 'visible' });

        // Field and Label texts validation
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText("Information for patient");
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText(
            "Printed on the right-hand side of the prescription. It is not associated with the relevant medication. This will not be printed on the medication label."
        );
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toBeVisible();
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toHaveValue("");
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).not.toBeFocused();
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText("500 characters remaining");

        // Characters remaining count validation
        const inputText1 = "`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100";
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(inputText1);
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toBeFocused();
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toHaveValue(inputText1);
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText("400 characters remaining");

        const inputText2 =
            "`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM";
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(inputText2);
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText("0 characters remaining");

        // Leading and Trailing spaces not removal validation
        const inputText3 = "    Remove spaces before and after but not in the, middle   ";
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(inputText3);
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toHaveValue(inputText3);
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText("440 characters remaining");
        await this.addMedicationPanelPage.informationForPharmacy.textBox.click();
        await expect(this.addMedicationPanelPage.informationForPatient.formElement).toContainText("440 characters remaining");

        // Character limit exceed validation
        const inputText4 =
            "`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM-1234";
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(inputText4);
        await expect(this.addMedicationPanelPage.informationForPatient.error("informationForPatientField")).toContainText(
            "Character limit exceeded by 5"
        );

        const inputText5 =
            "Test-`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?><qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMM";
        await this.addMedicationPanelPage.informationForPatient.textBox.fill(inputText5);
        await expect(this.addMedicationPanelPage.informationForPatient.error("informationForPatientField")).toContainText(
            "Character limit exceeded by 505"
        );

        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async validateReviewDateField() {
        await this.medicationHomeActions.clickPrescribeButton();

        // Validate the field is not visible for Acute prescription type
        await expect(this.addMedicationPanelPage.reviewDate.formElement).not.toBeVisible();

        // Validate the field is visible for Repeat prescription type
        await this.selectRepeatPrescriptionType();
        await expect(this.addMedicationPanelPage.reviewDate.formElement).toBeVisible();
        await expect(this.addMedicationPanelPage.reviewDate.formElement).toContainText("Individual review date for this medication");

        // Validate the field is visible for Repeat Dispensing prescription type
        await this.selectRepeatDispensingPrescriptionType();
        await expect(this.addMedicationPanelPage.reviewDate.formElement).toBeVisible();
        await expect(this.addMedicationPanelPage.reviewDate.formElement).toContainText("Individual review date for this medication");

        // Validate entering a valid date
        await this.addMedicationPanelPage.reviewDate.input.click();
        await this.addMedicationPanelPage.reviewDate.input.fill("12-Feb-2026");
        await expect(this.addMedicationPanelPage.reviewDate.error("test-enter-a-date-in-the-format-dd-mmm-yyyy")).not.toBeVisible();
        await expect(this.addMedicationPanelPage.reviewDate.error("test-the-date-must-be-in-the-next-12-months")).not.toBeVisible();

        // Validate entering a past date
        await this.addMedicationPanelPage.reviewDate.input.fill("12-Feb-1995");
        await this.addMedicationPanelPage.reviewDate.formElement.click();
        await expect(this.addMedicationPanelPage.reviewDate.error("test-the-date-must-be-in-the-next-12-months")).toContainText("The date must be in the next 12 months.");

        // Validate entering a far future date
        await this.addMedicationPanelPage.reviewDate.input.fill("12-Feb-2205");
        await this.addMedicationPanelPage.reviewDate.formElement.click();
        await expect(this.addMedicationPanelPage.reviewDate.error("test-the-date-must-be-in-the-next-12-months")).toContainText("The date must be in the next 12 months.");

        // Validate entering an invalid date format
        await this.addMedicationPanelPage.reviewDate.input.fill("09-Feb");
        await this.addMedicationPanelPage.reviewDate.formElement.click();
        await expect(this.addMedicationPanelPage.reviewDate.error("test-enter-a-date-in-the-format-dd-mmm-yyyy")).toContainText("Enter a date in the format dd-Mmm-yyyy.");

        await this.clickCloseButton();
        await this.clickPrescribeDiscardButton();
    }

    async verifyNonNHSItemsAreRemovedFromDropdown() {
        await this.medicationHomeActions.clickPrescribeButton();

        // Verify "Biotrol Draina" is not available in the dropdown
        await this.search("Biotrol Draina");
        await expect(this.addMedicationPanelPage.medicationSearch.error("textOnlyItem")).toContainText("No results found. Try using a different search term.");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();

        // Verify "Dalmane" is not available in the dropdown
        await this.search("Dalmane");
        await expect(this.addMedicationPanelPage.medicationSearch.error("textOnlyItem")).toContainText("No results found. Try using a different search term.");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();

        // Verify "Alprazolam" is not available in the dropdown
        await this.search("Alprazolam");
        await expect(this.addMedicationPanelPage.medicationSearch.error("textOnlyItem")).toContainText("No results found. Try using a different search term.");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();

        await this.clickCloseButton();
    }

    async validateMedicationFieldEditIcon() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.medicationSearch.formElement.waitFor();

        // Verify "Medication" field and search combobox
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("Medication");
        await expect(this.addMedicationPanelPage.medicationSearch.input).toBeVisible();

        // Search and select a medication
        await this.searchAndSelect("Dovobet ointment (LEO Pharma)");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();

        // Verify selected medication and its color
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("Dovobet ointment (LEO Pharma)");
        await expect(this.addMedicationPanelPage.medicationSearch.selectedMedication).toHaveCSS("color", "rgb(21, 82, 151)");

        // Verify edit icon and re-enable search combobox
        await expect(this.addMedicationPanelPage.medicationSearch.editMedication).toBeVisible();
        // Verify Edit medication tooltip text
        await this.addMedicationPanelPage.medicationSearch.editMedication.hover();
        await expect(this.addMedicationPanelPage.medicationSearch.editMedication).toContainText("Edit medication");
        await this.addMedicationPanelPage.medicationSearch.editMedication.click();
        await expect(this.addMedicationPanelPage.medicationSearch.input).toBeVisible();
        await expect(this.addMedicationPanelPage.medicationSearch.input).toHaveValue("Dovobet ointment (LEO Pharma)");

        // Select a different medication
        await this.searchAndSelect("Dovobet gel (LEO Pharma)");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();

        // Verify updated medication
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("Dovobet gel (LEO Pharma)");
    }

    async validateDosageFieldEditIcon() {
        await this.medicationHomeActions.clickPrescribeButton();

        // Search and select a medication
        await this.searchAndSelect("Anastrozole 1mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();

        // Verify dosage options and select one
        await this.addMedicationPanelPage.dosage.input.click();
        await expect(this.addMedicationPanelPage.dosage.option("One To Be Taken Each Day")).toBeVisible();
        await this.addMedicationPanelPage.dosage.option("One To Be Taken Each Day").click();

        // Verify selected dosage and its color
        await expect(this.addMedicationPanelPage.dosage.selectedDosage).toContainText("One To Be Taken Each Day");
        await expect(this.addMedicationPanelPage.dosage.selectedDosage).toHaveCSS("color", "rgb(43, 51, 55)");

        // Verify edit icon and re-enable dosage input
        await expect(this.addMedicationPanelPage.dosage.editDosage).toBeVisible();
        // Verify Edit dosage tooltip text
        await this.addMedicationPanelPage.dosage.editDosage.hover();
        await expect(this.addMedicationPanelPage.dosage.editDosage).toContainText("Edit dosage");
        await this.addMedicationPanelPage.dosage.editDosage.click();
        await expect(this.addMedicationPanelPage.dosage.input).toHaveValue("One To Be Taken Each Day");

        // Clear dosage and enter free text
        await this.addMedicationPanelPage.dosage.clearButton.click();
        await this.addMedicationPanelPage.dosage.formElement.click();
        await this.addMedicationPanelPage.dosage.input.fill("Enter the freetest dosage here");
        await this._page.keyboard.press("Enter");

        // Verify free text dosage is saved
        await expect(this.addMedicationPanelPage.dosage.selectedDosage).toContainText("Enter the freetest dosage here");
        await expect(this.addMedicationPanelPage.dosage.input).not.toBeVisible();
    }

    async validateAddAndAddAnotherButton() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("Dosage for Addanother");
        await this.enterQuantity("24");
        await this.enterDuration("12");
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("4");
        await this.clickAddAnother();
        // Verify toast notification
        await this.medicationHomeActions.clickToastNotificationCloseButton();
        // Verify fields are reset
        await expect(this.addMedicationPanelPage.medicationSearch.input).toHaveValue("");
        await expect(this.addMedicationPanelPage.dosage.input).toHaveValue("");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("");
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeat).not.toBeChecked();
        await expect(this.addMedicationPanelPage.prescriptionType.repeatDispensing).not.toBeChecked();
        await expect(this.addMedicationPanelPage.numberOfAuthorisedIssues.formElement).not.toBeVisible();
    }

    async validateSwitchToAddTabFromIssueTab() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("Dosage for Addanother");
        await this.enterQuantity("24");
        await this.enterDuration("12");
        await this.clickAddAndIssue();
        // Verify toast notification
        await this.medicationHomeActions.clickToastNotificationCloseButton();
        await this.clickAddMedicationTab();
        await this.searchAndSelect("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("Updated dosage");
        await this.enterQuantity("212");
        await this.enterDuration("121");
        await this.issueMedicationPanelPage.issueMedicationTab.click();
        // Validating added values are retained in the Add tab if switches to Issue, then switches back to Add tab
        await this.clickAddMedicationTab();
        await this.addMedicationPanelPage.medicationSearch.selectedMedication.waitFor({ state: 'visible' });
        await expect(this.addMedicationPanelPage.medicationSearch.selectedMedication).toContainText("Cyproterone 50mg tablets");
        await expect(this.addMedicationPanelPage.dosage.selectedDosage).toContainText("Updated dosage");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("212");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("121");
    }


    async clickEditIcon() {
        await this.addMedicationPanelPage.editMedicationIcon.click();
    }

    async verifyAllPrecribeFieldsAreClearedByDeletingMedicationUsingXButton() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.enterDosage("valid dosage");
        await this.enterQuantity("10");
        await this.enterDuration("5");
        await this.selectRepeatPrescriptionType();
        await this.enterAuthorisedIssues("13");
        await this.enterInformationForPharmacy("valid information for pharmacy");
        await this.enterInformationForPatient("valid information for patient");
        await this.enterIndividualReviewDate("12-Mar-2026");
        await this.clickEditIcon();
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await expect(this.addMedicationPanelPage.medicationSearch.formElement).toContainText("");
        await expect(this.addMedicationPanelPage.dosage.formElement).toContainText("");
        await expect(this.addMedicationPanelPage.quantity.textBox).toHaveValue("");
        await expect(this.addMedicationPanelPage.duration.textBox).toHaveValue("");
        await expect(this.addMedicationPanelPage.prescriptionType.acute).toBeChecked();
        await expect(this.addMedicationPanelPage.informationForPharmacy.textBox).toContainText("");
        await expect(this.addMedicationPanelPage.informationForPatient.textBox).toContainText("");
        await this.clickCloseButton();
    }

    async verifyRedErrorMessageClearedIfClearTheMedicationField() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Simple eye ointment");
        await this.clickAddAndIssue();
        await this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage").waitFor({ state: "visible" });
        expect(this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage")).toContainText("Select or enter a dosage.");
        expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).toContainText("Enter a quantity.");
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickEditIcon();
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await expect(this.addMedicationPanelPage.dosage.error("test-select-or-enter-a-dosage")).not.toBeVisible();
        await expect(this.addMedicationPanelPage.quantity.error("test-enter-a-quantity")).not.toBeVisible();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).not.toBeVisible();
        await this.clickCloseButton();
    }

    async validateBannerError() {
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toBeVisible();
        await expect(this.addMedicationPanelPage.medicationValidationBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
    }

    async verifyLHSAndRHSWarningBadgesInMedicationField() {
        await this.medicationHomeActions.clickPrescribeButton();
        //Alert red badge warning validation
        await this.search("hydroxychloroquine 200mg tablets");
        await expect(this.addMedicationPanelPage.alertTag).toBeVisible();
        await expect(this.addMedicationPanelPage.alertTag).toHaveAttribute("title", "General alert - this medication requires an increased level of caution when prescribing.");
        await expect(this.addMedicationPanelPage.alertTag).toHaveAttribute("style", "background-color: var(--urgent); color: var(--white);");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        //Cytotoxic red badge warning validation
        await this.search("hydroxycarbamide 100mg tablets");
        await expect(this.addMedicationPanelPage.cytotoxicTag).toBeVisible();
        await expect(this.addMedicationPanelPage.cytotoxicTag).toHaveAttribute("title", "Cytotoxic drug - this medication requires an increased level of caution when prescribing.");
        await expect(this.addMedicationPanelPage.cytotoxicTag).toHaveAttribute("style", "background-color: var(--urgent); color: var(--white);");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        //Verify the order of warning badges
        await this.verifyPositionOfLHSBadges();
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        // Non-formulary white information badge validation
        await this.search("paracetamol 80mg suppositories");
        await expect(this.addMedicationPanelPage.nonFormularyTag).toBeVisible();
        await expect(this.addMedicationPanelPage.nonFormularyTag).toHaveAttribute("title", "Item not in the selected formulary.");
        await expect(this.addMedicationPanelPage.nonFormularyTag).toHaveAttribute("style", "background-color: var(--white); color: var(--neutral-30);");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        // Non dm+d white information badge validation
        await this.search("Paracetamol Caplets 500 mg");
        await expect(this.addMedicationPanelPage.nonDmdTag).toBeVisible();
        await expect(this.addMedicationPanelPage.nonDmdTag).toHaveAttribute("style", "background-color: var(--white); color: var(--neutral-30);");
        await expect(this.addMedicationPanelPage.nonDmdTag).toHaveAttribute("title", "Item not in the NHS dictionary of medicines and devices. Prescription cannot be sent via EPS.");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        // Checking the order of the information badges
        await this.verifyPositionOfRHSBadges();
    }

    async verifyPositionOfLHSBadges() {
        await this.search("hydroxycarbamide 500mg capsules");
        await this.addMedicationPanelPage.positionOfLHSTags.first().waitFor({ state: "visible" });
        const lhsTags = await this.addMedicationPanelPage.positionOfLHSTags.allTextContents();
        expect(lhsTags[0]).toBe("AlertCytotoxic");
    }

    async verifyPositionOfRHSBadges() {
        await this.search("*Dtp Vaccine Tablets");
        await this.addMedicationPanelPage.positionOfRHSTags.first().waitFor({ state: "visible" });
        const rhsTags = await this.addMedicationPanelPage.positionOfRHSTags.allTextContents();
        expect(rhsTags[0]).toBe("Non dm+dNon-formulary");
    }

    async validateShowPackDetailsCheckboxAndPackDetailsForEachDrug() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.showPackDetailsCheckBox.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.showPackDetailsCheckBox).not.toBeChecked();
        await this.search("Malathion 0.5% aqueous");
        await expect(this.addMedicationPanelPage.medicationSearchItemList).not.toContainText("150 ml/£15.96");
        await this.addMedicationPanelPage.showPackDetailsCheckBox.click();
        await expect(this.addMedicationPanelPage.showPackDetailsCheckBox).toBeChecked();
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        await this.search("Malathion 0.5% aqueous");
        await this.addMedicationPanelPage.medicationSearchItemList.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.medicationSearchItemList).toContainText("150 ml/£15.96");
        await this.addMedicationPanelPage.showPackDetailsCheckBox.click();
        await expect(this.addMedicationPanelPage.showPackDetailsCheckBox).not.toBeChecked();
        await expect(this.addMedicationPanelPage.medicationSearchItemList).not.toBeVisible();
        await this.addMedicationPanelPage.showPackDetailsCheckBox.click();
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        await this.search("Ipratropium bromide 20micrograms/ dose inhaler CFC free");
        await this.addMedicationPanelPage.medicationSearchItemList.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.medicationSearchItemList).toContainText("200 doses/£5.56");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        await this.search("Vaxelis vaccine suspension");
        await this.addMedicationPanelPage.medicationSearchItemList.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.medicationSearchItemList).toContainText("1 pre-filled disposable injection/£45.31");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        await this.search("Gelatin 4% infusion 1litre bags");
        await this.addMedicationPanelPage.medicationSearchItemList.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.medicationSearchItemList).toContainText("6 bags/£54.54");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        await this.search("Aspirin 75mg gastro");
        await this.addMedicationPanelPage.medicationSearchItemList.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.medicationSearchItemList).toContainText("28 tablets/£0.7656");
        await this.clickCloseButton();
    }

    async validateTooltipForPackDetailsInMedicationDropdown() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelPage.showPackDetailsCheckBox.click();
        // Validate tooltip for "Peak flow meter standard range"
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        await this.search("Peak flow meter standard range");
        await expect(this.addMedicationPanelPage.packDetails.packDetail47154).toHaveAttribute("title", "Drug Tariff England/Wales");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        // Validate tooltip for "Liquid paraffin light 70% gel"
        await this.search("Liquid paraffin light 70% gel");
        await expect(this.addMedicationPanelPage.packDetails.packDetail235339).toHaveAttribute("title", "Drug Tariff England/Wales");
        await this.addMedicationPanelPage.medicationSearch.clearButton.click();
        await this.addMedicationPanelPage.medicationSearch.formElement.click();
        // Validate tooltip for "Rosuvastatin 40mg tablets"
        await this.search("Rosuvastatin 40mg tablets");
        await expect(this.addMedicationPanelPage.packDetails.packDetail85084).toHaveAttribute("title", "Drug Tariff England/Wales");
        await this.clickCloseButton();
    }

    async verifyMaxQuantityWarningErrorMessage() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.searchAndSelect("Acebutolol 400mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterDosage("checking max quantity warning");
        await this.enterQuantity("4");
        await this.enterDuration("1");
        await this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.formElement.waitFor({ state: "visible" });
        await expect(this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.formElement).toContainText("4 tablets over 1 day exceeds the maximum recommended dose of 3 per day.I accept the risk and want to continue.");
        await expect(this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.checkbox).not.toBeChecked();
        await this.clickAddAndIssue();
        await expect(this.addMedicationPanelPage.maximumQuantitywarningsCheckbox.formElement).toContainText("Accept the risk to continue.");
    }
}