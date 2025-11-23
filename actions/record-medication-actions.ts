import { expect, Page, test } from "@playwright/test";
import { RecordMedicationPage } from "../pages/record-medication-page";
import { ClinicalWarningPopupPage } from "../pages/clinical-warning-popup-page";
import { ClinicalWarningPopupActions } from "../actions/clinical-warning-popup-actions";
import { MedicationHomeActions } from './medication-home-actions';
import { CommonActions } from "./common-actions";

export class RecordMedicationPanelActions {
    private page: Page;
    protected recordMedicationPanelActions: RecordMedicationPage;
    private clinicalWarningPopupActions: ClinicalWarningPopupActions;
    private medicationHomeActions: MedicationHomeActions;
    private commonActions: CommonActions;

    constructor(page: Page) {
        this.page = page;
        this.recordMedicationPanelActions = new RecordMedicationPage(this.page);
        this.clinicalWarningPopupActions = new ClinicalWarningPopupActions(this.page);
        this.medicationHomeActions = new MedicationHomeActions(this.page);
        this.commonActions = new CommonActions(this.page);
    }

    async clickRecordButton() {

        const pageWidth = await this.page.evaluate(() => {
            return window.innerWidth;
        });
        if (pageWidth >= 992) {
            await this.recordMedicationPanelActions.recordMedsLargeButton.waitFor({ state: 'visible' });
            await this.recordMedicationPanelActions.recordMedsLargeButton.click();
        }
        if (pageWidth < 992 && pageWidth > 320) {
            await this.recordMedicationPanelActions.recordMedsMediumButton.waitFor({ state: 'visible' });
            await this.recordMedicationPanelActions.recordMedsMediumButton.click();
        }
        if (pageWidth <= 320) {
            await this.recordMedicationPanelActions.recordMedsSmallButton.waitFor({ state: 'visible' });
            await this.recordMedicationPanelActions.recordMedsSmallButton.click();
        }
    }

    async verifyTheRecordButtonIsVisible() {

        const pageWidth = await this.page.evaluate(() => {
            return window.innerWidth;
        });
        if (pageWidth >= 992) {
            await expect(this.recordMedicationPanelActions.recordMedsLargeButton).toBeVisible();
        }
        if (pageWidth < 992 && pageWidth > 320) {
            await expect(this.recordMedicationPanelActions.recordMedsMediumButton).toBeVisible();
        }
        if (pageWidth <= 320) {
            await expect(this.recordMedicationPanelActions.recordMedsSmallButton).toBeVisible();
        }
    }

    async clickLocationIssuedDropdown() {
        await this.recordMedicationPanelActions.locationIssuedDropdown.click();
    }

    async validateRecordMedicationPanel() {
        const pageWidth = await this.page.evaluate(() => {
            return window.innerWidth;
        });
        await expect(this.recordMedicationPanelActions.dateIssuedDatePicker).toBeVisible();
        await expect(this.recordMedicationPanelActions.dateIssuedField).toBeVisible();
        await expect(this.recordMedicationPanelActions.dateIssuedLabel).toBeVisible();
        await expect(this.recordMedicationPanelActions.dosageField).toBeVisible();
        await expect(this.recordMedicationPanelActions.locationIssuedDropdown).toBeVisible();
        await expect(this.recordMedicationPanelActions.locationIssuedLabel).toBeVisible();
        await expect(this.recordMedicationPanelActions.medicationField).toBeVisible();
        await expect(this.recordMedicationPanelActions.quantityField).toBeVisible();
        if (pageWidth <= 991 && pageWidth >= 576) {
            await expect(this.recordMedicationPanelActions.combinedRecordAndRecordAnotherButton).toBeVisible();
        }
        else if (pageWidth <= 320) {
            await expect(this.recordMedicationPanelActions.combinedRecordAndRecordAnotherButton).toBeVisible();
        }
        else {
            await expect(this.recordMedicationPanelActions.recordAndRecordAnotherButtton).toBeVisible();
            await expect(this.recordMedicationPanelActions.recordButton).toBeVisible();
        }
        await expect(this.recordMedicationPanelActions.recordCancelButton).toBeVisible();
        await expect(this.recordMedicationPanelActions.recordCloseButton).toBeVisible();
        await expect(this.recordMedicationPanelActions.recordMedicationPanelHeader).toBeVisible();
    }

    async clickRecordCloseButton() {
        await this.recordMedicationPanelActions.recordCloseButton.click();
    }

    async clickExpandMenuButton() {
        await this.recordMedicationPanelActions.expandMenuButton.click();
    }

    async enterTextIntoRecordDosageField(dosageValue: string) {
        await this.page.waitForTimeout(2000);
        await this.recordMedicationPanelActions.dosageField.fill(dosageValue);
        await this.page.keyboard.press('Enter');
    }

    async enterRequiredValueIntoRecordQuantityField(quantityValue: number) {
        await this.recordMedicationPanelActions.quantityField.fill(`${quantityValue}`);
    }

    async enterRequiredValueIntoRecordDurationField(durationValue: number) {
        await this.recordMedicationPanelActions.durationField.fill(`${durationValue}`);
    }

    async enterTextIntoRecordMedicationField(medicationName: string) {
        await this.recordMedicationPanelActions.dosageField.fill(medicationName);
    }

    async searchAndSelectMedication(medication: string) {
        await this.recordMedicationPanelActions.medicationField.waitFor();
        await this.recordMedicationPanelActions.medicationField.fill(medication);
        await this.recordMedicationPanelActions.getDropDowmMedication(medication).waitFor({ state: 'visible' })
        await this.recordMedicationPanelActions.getDropDowmMedication(medication).click();
    }

    async selectLocationIssuedDropdownHospital() {
        await this.recordMedicationPanelActions.locationIssuedDropdown.waitFor();
        await this.recordMedicationPanelActions.locationIssuedDropdownHospital.click();
    }

    async selectLocationIssuedDropdownOutOfHoursService() {
        await this.recordMedicationPanelActions.locationIssuedDropdown.waitFor();
        await this.recordMedicationPanelActions.locationIssuedDropdownOutOfHoursService.click();
    }

    async selectlocationIssuedDropdownOverTheCounter() {
        await this.recordMedicationPanelActions.locationIssuedDropdown.waitFor();
        await this.recordMedicationPanelActions.locationIssuedDropdownOverTheCounter.click();
    }

    async enterTheDateIssuedValue(date: string) {
        await this.recordMedicationPanelActions.dateIssuedField.waitFor();
        await this.recordMedicationPanelActions.dateIssuedField.fill(date);
    }

    async clickRecordPanelRecordButton() {
        await this.recordMedicationPanelActions.recordButton.click();
    }

    async clickRecordAndRecordAnotherButton() {
        await this.recordMedicationPanelActions.recordAndRecordAnotherButtton.click();
    }

    async verifyTheMedicationIsRecorded(medsName: string) {
        const firstMeds = await this.page.locator("//div[@data-testid='medsLeftSideBadges']/following-sibling::button/span").nth(0);
        const firstMedsName = await firstMeds.innerText();
        await expect(firstMedsName).toEqual(medsName);
    }

    async selectCurrentMedicationRadioButton() {
        await this.recordMedicationPanelActions.currentMedicationRadioButton.click();
    }

    async selectPastMedicationRadioButton() {
        await this.recordMedicationPanelActions.pastMedicationRadioButton.click();
    }

    async scrollDownAndCloseTheClinicalWaning() {
        const clinicalWarningPopupPage = new ClinicalWarningPopupPage(this.page);
        await clinicalWarningPopupPage.loadingSpinner.waitFor({ state: "hidden" });
        await this.page.waitForTimeout(1000);
        const isTableContainerVisible = await this.recordMedicationPanelActions.clinicalWarningPanel.isVisible();
        if (isTableContainerVisible) {
            const tableContainer = await this.recordMedicationPanelActions.clinicalWarningPanel;
            await tableContainer.scrollIntoViewIfNeeded();
            const tableHeight = await tableContainer.evaluate(
                (tableContainer) => tableContainer.scrollHeight
            );
            await tableContainer.evaluate((tableContainer, tableHeight) => {
                tableContainer.scrollTop = tableHeight;
            }, tableHeight);
            await this.page.waitForTimeout(3000);
            await clinicalWarningPopupPage.button.proceed_clinicalWarnings.click();
        }
    }

    async validateTheMedicationRecordedNotificationPanel() {
        await this.recordMedicationPanelActions.recordNotificationPanel.waitFor({ state: 'visible' });
        await expect(this.recordMedicationPanelActions.recordNotificationPanel).toContainText("Medication recorded.Refresh Medication page to view.");
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async sortMedicationWithNoGroupAndNewestFirst() {
        await this.clickOnSortButton();
        await this.selectNoGroupRadioButton();
        await this.selectNewestFirstRadioButton();
        await this.clickApplyButton();
    }

    async clickOnSortButton() {
        await this.recordMedicationPanelActions.sortButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.sortButton.click();
    }

    async selectNoGroupRadioButton() {
        await this.recordMedicationPanelActions.noGroupRadioButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.noGroupRadioButton.click();
    }

    async selectNewestFirstRadioButton() {
        await this.recordMedicationPanelActions.newestFirstRadioButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.newestFirstRadioButton.click();
    }

    async clickApplyButton() {
        await this.recordMedicationPanelActions.applyButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.applyButton.click();
    }

    async recordMedication(medication: string, dosage: string, quantity: number, location: string, date: string, isCurrentMedication: boolean) {
        await this.recordMedicationPanelActions.locationIssuedDropdown.waitFor({ state: 'visible' });
        await this.clickLocationIssuedDropdown();
        if (location === 'Hospital') {
            await this.selectLocationIssuedDropdownHospital();
            if (isCurrentMedication) {
                await this.selectCurrentMedicationRadioButton();
            } else {
                await this.selectPastMedicationRadioButton();
            }
        } else if (location === 'Out of Hours Service') {
            await this.selectLocationIssuedDropdownOutOfHoursService();
        } else if (location === 'Over the Counter') {
            await this.selectlocationIssuedDropdownOverTheCounter();
        }
        if (date === '') {
            const currentDate = await this.commonActions.getTodayDate();
            await this.enterTheDateIssuedValue(await currentDate);
        };
        await this.searchAndSelectMedication(medication);
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterTextIntoRecordDosageField(dosage);
        await this.enterRequiredValueIntoRecordQuantityField(quantity);
        await this.clickRecordPanelRecordButton();
    }

    async verifyRecordPanelFieldValidations() {
        await expect(this.recordMedicationPanelActions.locationIssuedValidationError).toContainText("Select a location.");
        await expect(this.recordMedicationPanelActions.medicationValidationError).toContainText("Select a medication.");
        await expect(this.recordMedicationPanelActions.quantityValidationError).toContainText("Enter a quantity.");
        await expect(this.recordMedicationPanelActions.validationErrorBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.clickLocationIssuedDropdown();
        await this.selectLocationIssuedDropdownOutOfHoursService();
        await this.clickRecordPanelRecordButton();
        await expect(this.recordMedicationPanelActions.medicationValidationError).toContainText("Select a medication.");
        await expect(this.recordMedicationPanelActions.quantityValidationError).toContainText("Enter a quantity.");
        await expect(this.recordMedicationPanelActions.durationValidationError).toContainText("Enter a duration.");
        await expect(this.recordMedicationPanelActions.addToValidationError).toContainText("Select an option.");
        await expect(this.recordMedicationPanelActions.validationErrorBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterRequiredValueIntoRecordQuantityField(5);
        await this.enterRequiredValueIntoRecordDurationField(0);
        await this.selectCurrentMedicationRadioButton();
        await this.clickRecordPanelRecordButton();
        await expect(this.recordMedicationPanelActions.durationValueErrorBanner).toContainText("Enter a duration greater than 0.");
        await expect(this.recordMedicationPanelActions.validationErrorBanner).toContainText("Some fields require attention.Correct the errors indicated before proceeding.");
    }

    async clickEditMedicationButton() {
        await this.recordMedicationPanelActions.editMedicationButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.editMedicationButton.click();
    }

    async clickMedSearchComboBoxButton() {
        await this.recordMedicationPanelActions.medsSearchComboBoxButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.medsSearchComboBoxButton.click();
    }

    async verifyDosageQuantityAndDurationValidation() {
        await this.clickLocationIssuedDropdown();
        await this.selectLocationIssuedDropdownOutOfHoursService();
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterTextIntoRecordDosageField("Test");
        await this.enterRequiredValueIntoRecordQuantityField(5);
        await this.enterRequiredValueIntoRecordDurationField(1);
        await this.clickEditMedicationButton();
        await this.clickMedSearchComboBoxButton();
        await this.searchAndSelectMedication("Aspirin 75mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.recordMedicationPanelActions.dosageField).toContainText("");
        await expect(this.recordMedicationPanelActions.quantityField).toContainText("");
        await expect(this.recordMedicationPanelActions.durationField).toContainText("");
    }

    async verifyDiscardDialogValidation() {
        await this.clickLocationIssuedDropdown();
        await this.selectLocationIssuedDropdownOutOfHoursService();
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterTextIntoRecordDosageField("Test");
        await this.enterRequiredValueIntoRecordQuantityField(5);
        await this.enterRequiredValueIntoRecordDurationField(1);
        await this.clickcurrentMedicationOptionRadioButton();
        await this.clickRecordCloseButton();
        await this.recordMedicationPanelActions.medDiscardWarningDialog.isVisible();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Discard medication?");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("You have not finished recording the medication: ");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Cyproterone 50mg tablets. Are you sure you want to discard it without adding it to the record?");
        await this.recordMedicationPanelActions.discardWarningCancelButton.isVisible();
        await this.recordMedicationPanelActions.discardMedicationButton.isVisible();
        await this.recordMedicationPanelActions.discardMedicationDialogCloseButton.isVisible();
        await this.clickDiscardMedicationDialogCloseButton();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).not.toBeVisible();
        await this.clickEditMedicationButton();
        await this.clickMedSearchComboBoxButton();
        await this.searchAndSelectMedication("Aspirin 75mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterRequiredValueIntoRecordQuantityField(5);
        await this.enterRequiredValueIntoRecordDurationField(1);
        await this.clickcurrentMedicationOptionRadioButton();
        await this.clickRecordCloseButton();
        await this.recordMedicationPanelActions.medDiscardWarningDialog.isVisible();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Discard medication?");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("You have not finished recording the medication: ");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Aspirin 75mg tablets. Are you sure you want to discard it without adding it to the record?");
        await this.recordMedicationPanelActions.discardWarningCancelButton.isVisible();
        await this.recordMedicationPanelActions.discardMedicationButton.isVisible();
        await this.recordMedicationPanelActions.discardMedicationDialogCloseButton.isVisible();
        await this.clickDiscardMedicationDialogCancelButton();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).not.toBeVisible();
        await this.clickEditMedicationButton();
        await this.clickMedSearchComboBoxButton();
        await this.searchAndSelectMedication("Aspirin 75mg dispersible tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterRequiredValueIntoRecordQuantityField(5);
        await this.enterRequiredValueIntoRecordDurationField(1);
        await this.clickcurrentMedicationOptionRadioButton();
        await this.clickRecordCloseButton();
        await this.recordMedicationPanelActions.medDiscardWarningDialog.isVisible();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Discard medication?");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("You have not finished recording the medication: ");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Aspirin 75mg dispersible tablets. Are you sure you want to discard it without adding it to the record?");
        await this.recordMedicationPanelActions.discardWarningCancelButton.isVisible();
        await this.recordMedicationPanelActions.discardMedicationButton.isVisible();
        await this.recordMedicationPanelActions.discardMedicationDialogCloseButton.isVisible();
        await this.clickDiscardMedicationDialogDicardButton();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).not.toBeVisible();
    }

    async clickcurrentMedicationOptionRadioButton() {
        await this.recordMedicationPanelActions.currentMedicationOptionRadioButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.currentMedicationOptionRadioButton.click();
    }

    async clickPastMedicationOptionRadioButton() {
        await this.recordMedicationPanelActions.pastMedicationOptionRadioButton.waitFor({ state: 'visible' });
        await this.recordMedicationPanelActions.pastMedicationOptionRadioButton.click();
    }

    async clickDiscardMedicationDialogCloseButton() {
        await this.recordMedicationPanelActions.discardMedicationDialogCloseButton.click();
    }

    async clickDiscardMedicationDialogCancelButton() {
        await this.recordMedicationPanelActions.discardWarningCancelButton.click();
    }

    async clickDiscardMedicationDialogDicardButton() {
        await this.recordMedicationPanelActions.discardMedicationButton.click();
    }

    async verifyRecordMedicationAPIFailureValidation() {
        await this.clickLocationIssuedDropdown();
        await this.selectLocationIssuedDropdownOutOfHoursService();
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        await this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.enterTextIntoRecordDosageField("Test");
        await this.enterRequiredValueIntoRecordQuantityField(5);
        await this.enterRequiredValueIntoRecordDurationField(1);
        await this.clickcurrentMedicationOptionRadioButton();
        await this.commonActions.blockAPI('**/prescriptions');
        await this.clickRecordPanelRecordButton();
        await expect(this.recordMedicationPanelActions.apiErrorTryAgainBanner).toBeVisible();
        await expect(this.recordMedicationPanelActions.apiErrorTryAgainBanner).toContainText("Couldn't record medication");
        await expect(this.recordMedicationPanelActions.apiErrorTryAgainBanner).toContainText("Try again");
        await this.commonActions.unblockAPI('**/prescriptions');
        await this.clickRecordPanelRecordButton();
        await expect(this.recordMedicationPanelActions.acpToastNotification).toBeVisible();
        await expect(this.recordMedicationPanelActions.acpToastNotification).toContainText("Medication recorded.");
        await expect(this.recordMedicationPanelActions.acpToastNotification).toContainText("Refresh Medication page to view.");
    }

    async verifyRecordMedicationEndCourseAPIFailureValidation() {
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toBeVisible();
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Cannot add to Past medication");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Cyproterone 50mg tablets");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("This medication has been recorded, but an error occurred while trying to add it to Past medication.");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("It has been added to Current medication instead.");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("You can either:");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Try moving it to Past medication.");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Leave it in Current medication. You can move it to Past medication yourself by ending the course.");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Leave in Current");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Move to Past");
        await this.clickMovetoPastButton();
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Couldn’t move to Past medication");
        await expect(this.recordMedicationPanelActions.moveToPastErrorDialog).toContainText("Try again or leave it in Current medication.");
        await this.commonActions.unblockAPI('**/end-course');
        await this.clickMovetoPastButton();
        await expect(this.recordMedicationPanelActions.acpToastNotification).toContainText("Medication recorded.");
        await expect(this.recordMedicationPanelActions.acpToastNotification).toContainText("Refresh Medication page to view.");
    }

    async clickMovetoPastButton() {
        await this.recordMedicationPanelActions.moveToPastButton.click();
    }

    async verifyHighWarningText() {
        expect(await this.recordMedicationPanelActions.highWarningPopup).toBeVisible()
        const element = await this.recordMedicationPanelActions.highWarningPopup
        expect(element).toContainText("Caution - high risk"); // Using expect assertion
    }

    async clickHighWarningProceedButton() {
        await this.recordMedicationPanelActions.highWarningPopupProceedButton.click();
    }

    async verifyTheDiscardPanel(medicationName: string) {
        await this.recordMedicationPanelActions.medDiscardWarningDialog.isVisible();
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("Discard medication?");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText("You have not finished recording the medication: ");
        await expect(this.recordMedicationPanelActions.medDiscardWarningDialog).toContainText(`${medicationName} Are you sure you want to discard it without adding it to the record?`);
    }

    async verifyFieldsAreCleared() {
        test.expect(await this.recordMedicationPanelActions.dosageField.inputValue()).toBe('');
        test.expect(await this.recordMedicationPanelActions.quantityField.inputValue()).toBe('');
        test.expect(await this.recordMedicationPanelActions.medicationField.inputValue()).toBe('');
    }

    async clickRecordPanelCancelButton() {
        await this.recordMedicationPanelActions.recordCancelButton.click();
    }

    async verifyRecordAndRecordAnotherButtonIsVisible() {
        await this.page.waitForLoadState('load');
        await expect(this.recordMedicationPanelActions.recordAndRecordAnotherButtton).toBeVisible();
    }

    async verifyExpandMenuButtonIsVisible() {
        await expect(this.recordMedicationPanelActions.expandMenuButton).toBeVisible();
    }

    async verifyCombinedRecordAndRecordAnotherButtonIsVisible() {
        await expect(this.recordMedicationPanelActions.combinedRecordAndRecordAnotherButton).toBeVisible();
    }

    async validateInvalidDrugInMedicationField(medication: string) {
        await this.clickRecordButton();
        await this.recordMedicationPanelActions.medicationField.waitFor();
        await this.recordMedicationPanelActions.medicationField.fill(medication);
        await this.recordMedicationPanelActions.medDiscardWarningDialog.isVisible();
        await expect(this.recordMedicationPanelActions.noResultsFoundDialog).toContainText("No results found. Try using a different search term.");
        await this.recordMedicationPanelActions.recordCloseButton.click();
    }

    async validateQuantityField(dosageValue: string) {
        await this.clickRecordButton();
        await this.recordMedicationPanelActions.quantityField.click();
        await expect(this.recordMedicationPanelActions.quantityField).toContainText("");
        await this.recordMedicationPanelActions.quantityField.fill("123456");
        await expect(this.recordMedicationPanelActions.quantityField).toHaveValue("123456");
        await this.recordMedicationPanelActions.quantityField.fill("123456.99");
        await expect(this.recordMedicationPanelActions.quantityField).toHaveValue("123456.99");
        await this.recordMedicationPanelActions.quantityField.fill("1234567890");
        await expect(this.recordMedicationPanelActions.quantityField).not.toHaveValue("1234567890");
        await this.recordMedicationPanelActions.quantityField.fill("123.456");
        await expect(this.recordMedicationPanelActions.quantityField).not.toHaveValue("123.456");
        await this.clickLocationIssuedDropdown();
        await this.selectLocationIssuedDropdownHospital();
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.recordMedicationPanelActions.dosageField.click();
        await this.recordMedicationPanelActions.dosageField.fill(dosageValue);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.recordMedicationPanelActions.quantityField.click();
        await this.recordMedicationPanelActions.quantityField.fill("0");
        await this.recordMedicationPanelActions.currentMedicationOptionRadioButton.click();
        await this.recordMedicationPanelActions.recordButton.click();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.searchCurrentMedication(dosageValue);
        await this.medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            ["Cyproterone 50mg tablets", "0 tablet", dosageValue],
            "",
            await this.commonActions.getTodayDate(),
            "",
            "Record Hospital (Stored)",
        );
    }

    async verifyDosageFieldPlaceholder(expectedPlaceholder: string) {
        const placeholderValue = await this.recordMedicationPanelActions.dosageField.getAttribute("placeholder");
        await expect(placeholderValue).toBe(expectedPlaceholder);
    }

    async clickClearButton() {
        await this.recordMedicationPanelActions.clearButton.click();
    }

    async selectDosageUsingKeyboard(dosageValue: string) {
        await this.recordMedicationPanelActions.dosageDropdownButton.click();
        await this.page.waitForTimeout(500);

        const dropdownItems = this.recordMedicationPanelActions.dosageDropdownOptions;
        await dropdownItems.first().waitFor({ state: 'visible', timeout: 5000 });
        const itemCount = await dropdownItems.count();

        let targetIndex = -1;
        for (let i = 0; i < itemCount; i++) {
            const text = (await dropdownItems.nth(i).innerText()).trim();
            if (text === dosageValue) {
                targetIndex = i;
                break;
            }
        }
        if (targetIndex === -1) {
            throw new Error(`Dropdown value "${dosageValue}" not found in options.`);
        }

        await this.recordMedicationPanelActions.dosageField.focus();

        for (let i = 0; i <= targetIndex; i++) {
            await this.page.keyboard.press("ArrowDown");
        }
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(300);
        await this.recordMedicationPanelActions.editDosage.click();
        await expect(this.recordMedicationPanelActions.dosageField).toHaveValue(dosageValue);
    }

    async selectDosageUsingScroll(dosageValue: string) {
        await this.recordMedicationPanelActions.dosageDropdownButton.click();
        const dropdownItems = this.recordMedicationPanelActions.dosageDropdownOptions;
        await dropdownItems.first().waitFor({ state: 'visible', timeout: 5000 });

        const itemCount = await dropdownItems.count();
        let targetIndex = -1;
        for (let i = 0; i < itemCount; i++) {
            const text = (await dropdownItems.nth(i).innerText()).trim();
            if (text === dosageValue) {
                targetIndex = i;
                break;
            }
        }
        if (targetIndex === -1) {
            throw new Error(`Dropdown value "${dosageValue}" not found using scroll.`);
        }

        const targetItem = dropdownItems.nth(targetIndex);
        await targetItem.scrollIntoViewIfNeeded();
        await targetItem.click();

        await this.page.waitForTimeout(300);
        await this.recordMedicationPanelActions.editDosage.click();
        await expect(this.recordMedicationPanelActions.dosageField).toHaveValue(dosageValue);
    }

    async verifyDosageDropdownContains(expectedValues: string[]) {
        await this.recordMedicationPanelActions.dosageDropdownButton.click();

        await expect(this.recordMedicationPanelActions.dosageDropdownOptions.first()).toBeVisible();

        const options = this.recordMedicationPanelActions.dosageDropdownOptions;
        const foundValues: string[] = [];

        const optionCount = await options.count();
        for (let i = 0; i < optionCount; i++) {
            const option = options.nth(i);
            if (await option.isVisible()) {
                const text = await option.innerText();
                foundValues.push(text.trim());
            }
        }

        for (const expected of expectedValues) {
            expect(foundValues).toContain(expected);
        }
    }

    async verifyDosageDropdownClosed() {
        await this.page.keyboard.press('Escape');

        await expect(this.recordMedicationPanelActions.dosageDropdownOptions.first()).not.toBeVisible();

        await expect(this.recordMedicationPanelActions.dosageDropdownButton).toBeVisible();
        await expect(this.recordMedicationPanelActions.dosageDropdownOptions).not.toBeVisible();
    }

    async validateDosageField() {
        await this.clickRecordButton();
        await expect(this.recordMedicationPanelActions.recordMedicationPanelHeader).toBeVisible();
        await expect(this.recordMedicationPanelActions.dosageText).toContainText("Dosage");
        await expect(this.recordMedicationPanelActions.dosageFieldInput).toHaveAttribute('placeholder', 'Select or enter a dosage');
        await expect(this.recordMedicationPanelActions.dosageFieldInput).toHaveValue("");
        await expect(this.recordMedicationPanelActions.dosageFieldInput).not.toBeFocused();
        await this.recordMedicationPanelActions.dosageFieldInput.click();
        await expect(this.recordMedicationPanelActions.dosageFieldInput).toBeFocused();
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.recordMedicationPanelActions.dosageField.click();
        await this.recordMedicationPanelActions.dosageFieldInput.fill("123456");
        await expect(this.recordMedicationPanelActions.dosageFieldInput).toHaveValue("123456");
        await this.recordMedicationPanelActions.clearButton.click();
        await expect(this.recordMedicationPanelActions.dosageFieldInput).toHaveValue("");
        await this.recordMedicationPanelActions.recordCloseButton.click();
        await this.recordMedicationPanelActions.discardMedicationButton.click();
        await this.clickRecordButton();
        await this.searchAndSelectMedication("Paracetamol Caplets 500 mg");
        this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await expect(this.recordMedicationPanelActions.dosageDropdownButton).toBeVisible({ timeout: 5000 });
        await expect(this.recordMedicationPanelActions.dosageDropdownButton).toBeEnabled();
        await this.recordMedicationPanelActions.dosageDropdownButton.click();
        await this.verifyDosageDropdownContains([
            "Take One Tablet Every Four to Six Hours",
            "Two To Be Taken Every 4-6 Hours Up To Four Times A Day"
        ]);
        await this.recordMedicationPanelActions.recordMedicationPanelHeader.click();
        await this.verifyDosageDropdownClosed();
        await this.recordMedicationPanelActions.dosageDropdownButton.click();
        await this.verifyDosageDropdownContains([
            "Take One Tablet Every Four to Six Hours",
            "Two To Be Taken Every 4-6 Hours Up To Four Times A Day"
        ]);
        await this.recordMedicationPanelActions.recordMedicationPanelHeader.click();
        await this.verifyDosageDropdownClosed();
    }

    async validateDosageFieldWithKeyboardAndScrollActions() {
        await this.clickRecordButton();
        await this.searchAndSelectMedication("Cyproterone 50mg tablets");
        this.clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await this.selectDosageUsingKeyboard("One To Be Taken Three Times A Day");
        await this.selectDosageUsingScroll("One To Be Taken Three Times A Day");
    }

}