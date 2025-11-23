import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { expect } from "@playwright/test";
import { CancelMedicationPage } from "../../pages/cancel-medication-page";

test.describe("Issue method validation", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });
    test.afterEach(async ({ commonActions }) => {
        await commonActions.unMockUrl();
        await commonActions.unBlockAllUrls();
    });
    test("Verify 'Appliance nomination' issue method dropdown is disabled when not all medications are appliances and selected issue method is 'NHS printed'", { tag: ["@US454206", "@regression"] }, async ({ addMedicationPanelActions, issueMethods, issueMedication, commonActions, issueMedicationPanelActions, medicationHomeActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await issueMedicationPanelActions.clickEPSPrimaryNominationDropdownOption();
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        const isEnabled = await issueMethods.epsApplianceNominationDropdownOption.isEnabled();
        test.expect(isEnabled).toBeTruthy();
        await issueMedicationPanelActions.clickPrintedNHSPrescriptionDropdownOption();
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        const isDisabled = await issueMethods.epsApplianceNominationDropdownOption.isDisabled();
        test.expect(isDisabled).toBeTruthy();
    })

    test("Verify 'Appliance nomination' issue method dropdown is enabled when all medications are appliances and selected issue method is 'NHS printed'", { tag: ["@US454206", "@regression"] }, async ({ addMedicationPanelActions, issueMethods, issueMedication, commonActions, issueMedicationPanelActions, medicationHomeActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("K-Band bandage 10cm x 4m (Urgo Ltd)", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await issueMedicationPanelActions.clickEPSPrimaryNominationDropdownOption();
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        const isEnabled = await issueMethods.epsApplianceNominationDropdownOption.isEnabled();
        test.expect(isEnabled).toBeTruthy();
        await issueMedicationPanelActions.clickPrintedNHSPrescriptionDropdownOption();
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        const isEnabled2 = await issueMethods.epsApplianceNominationDropdownOption.isEnabled();
        test.expect(isEnabled2).toBeTruthy();
    })

    test('Check prescription structured dosage attribute in network response', { tag: ["@US467188", "@regression"] }, async ({ addMedicationPanelActions, issueMedicationPanelActions, medicationHomeActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
        await issueMedicationPanelActions.clickIssueButtonForStructuredDosageCheck();
        await issueMedicationPanelActions.checkPrescriptionStructuredDosageAttributeInNetworkResponse();
    });

    test("Verify declaration text dialog is displayed properly when user clicks the 'Issue' button for EPS flow", { tag: ["@US435976", "@regression", "@all", "@clinical-safety", "@prescribe_drug", "@stg"] }, async ({ page, commonActions, clinicalWarning, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, endCourseMedicationPage, issueMedication, cancelMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "9", "6", "5", "Test data -Dosage One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - One To Be Taken Each Day - Test data with maximum 400 characters in the Dosage field.", "Patient Test");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedicationPanelActions.clickIssueButton();
        await expect(endCourseMedicationPage.endCourseDialog).toBeVisible();
        await expect(issueMedication.button.eps_DoNotProceed).toBeVisible();
        await expect(issueMedication.button.eps_Proceed).toBeVisible();
        await expect(cancelMedication.cannotCancelIssueDialogXButton).toBeVisible();
        await issueMedicationPanelActions.validateEpsDeclarationTextDialog();
        await issueMedication.button.eps_DoNotProceed.click();
        await expect(endCourseMedicationPage.endCourseDialog).not.toBeVisible();
        await issueMedicationPanelActions.clickIssueButton();
        await expect(endCourseMedicationPage.endCourseDialog).toBeVisible();
        await issueMedication.button.eps_Proceed.click();
        await expect(clinicalWarning.loadingSpinner).toBeVisible();
    });
    test("Verify the Printed NHS prescription radio button is disabled when patient and medication have 'EPS Appliance nomination' and 'EPS Primary nomination' access", { tag: ["@US434358", "@regression", "@stg", "@US423729", "@all"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedication.issueTabThreeDotsButton.click();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationRadioButton).not.toBeDisabled();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeChecked();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeChecked();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).not.toBeChecked();
        await expect(issueMethods.epsPrimaryNominationRadioButton).not.toBeChecked();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeDisabled();
    });
    test("Verify EPS related radio buttons are disabled when patient does not have EPS access", { tag: ["@US434358", "@regression", "@US423729", "@stg"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "false");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedication.issueTabThreeDotsButton.click();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeChecked();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeChecked();
        await expect(issueMethods.epsPrimaryNominationRadioButton).not.toBeChecked();
        await expect(issueMethods.epsApplianceNominationRadioButton).not.toBeChecked();
    });

    test("Verify 'EPS Appliance nomination' method is not available when medication does not support it", { tag: ["@US434358", "@regression", "@US423729", "@stg"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedication.issueTabThreeDotsButton.click();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsApplianceNominationRadioButton).not.toBeVisible();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeVisible();
    });

    test("Verify 'EPS Appliance nomination' radio button is disabled when patient has 'EPS Primary nomination' but not 'EPS Appliance nomination'", { tag: ["@US434358", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "false");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedication.issueTabThreeDotsButton.click();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeChecked();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationRadioButton).not.toBeChecked();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeChecked();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeDisabled();
    });

    test("Verify issue method is displayed based on selected radio button", { tag: ["@US434358", "@regression", "@US423729", "@stg"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await expect(issueMethods.issueMethodHeader).toHaveText(/Appliance nomination/);
        await issueMedication.issueTabThreeDotsButton.click();
        await issueMethods.epsPrimaryNominationRadioButton.click();
        await expect(issueMethods.issueMethodHeader).toHaveText(/Primary nomination/);
        await issueMedication.issueTabThreeDotsButton.click();
        await issueMethods.epsAnyPharmacyRadioButton.click();
        await expect(issueMethods.issueMethodHeader).toHaveText(/Any pharmacy/);
    });

    test("Verify 'EPS Primary nomination' radio button is disabled when patient does not have 'EPS Primary nomination' access", { tag: ["@US434358", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "false");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedication.issueTabThreeDotsButton.click();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsPrimaryNominationRadioButton).not.toBeChecked();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationRadioButton).toBeChecked();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyRadioButton).not.toBeChecked();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeDisabled();
    });

    test("Verify 'EPS appliance nomination' method is not available when patient does not have 'EPS Primary nomination' and medication does not support 'EPS Appliance nomination'", { tag: ["@US434358", "@regression", "@US423729", "@clinical-safety", "@stg"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "false");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedication.issueTabThreeDotsButton.click();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeVisible();
        await expect(issueMethods.epsApplianceNominationRadioButton).not.toBeVisible();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationRadioButton).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyRadioButton).toBeChecked();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionRadioButton).not.toBeChecked();
    });

    test("Verify possible to switch between NHS Printed and EPS Any when patient does not have a primary nomination but has appliance nomination, and no medications are appliances", { tag: ["@US434358", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1200, height: 900 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "false");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await addMedicationPanelActions.addRepeatMedication("Liquid paraffin light 63.4% bath additive", generateRandomGuid(), "5", "5", "", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).not.toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).not.toBeDisabled();
        await issueMethods.printedNhsPrescriptionDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).not.toBeDisabled();
    });

    test("Verify possible to switch between NHS Printed and EPS Any when patient does not have a primary nomination or appliance nomination", { tag: ["@US449061", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "false");
        await commonActions.setLocalStorage("mock-appliance-nomination", "false");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await addMedicationPanelActions.addRepeatMedication("Liquid paraffin light 63.4% bath additive", generateRandomGuid(), "5", "5", "6", "", "");
        // await medicationHomeActions.clickToastNotificationCloseButton();
        await issueMedicationPanelActions.clickIssueTab();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).not.toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).not.toBeDisabled();
        await issueMethods.printedNhsPrescriptionDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).not.toBeDisabled();
    });

    test("Verify possible to switch between NHS Printed, EPS Any, and EPS Primary nomination when patient does not have appliance nomination", { tag: ["@US449061", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "false");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await addMedicationPanelActions.addRepeatMedication("Liquid paraffin light 63.4% bath additive", generateRandomGuid(), "5", "5", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/Primary nomination/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).not.toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).not.toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).not.toBeDisabled();
        await issueMethods.printedNhsPrescriptionDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeDisabled();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).not.toBeDisabled();
        await issueMethods.epsPrimaryNominationDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/Primary nomination/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/NHS prescription/);
    });

    test("Verify possible to switch between NHS Printed, EPS Any, EPS Primary nomination, and EPS Appliance nomination when patient has both nominations and at least one medication is an appliance", { tag: ["@US449061", "@regression", "@US423729", "@stg"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "5", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await expect(issueMethods.issueMethodTopHeader.nth(0)).toHaveText(/Primary nomination/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).not.toBeDisabled();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).not.toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).not.toBeDisabled();
        await issueMethods.printedNhsPrescriptionDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeDisabled();
        await issueMethods.epsPrimaryNominationDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/Primary nomination/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/NHS prescription/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await issueMethods.epsApplianceNominationDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader.nth(1)).toHaveText(/Appliance nomination/);
        await expect(issueMethods.issueMethodTopHeader.nth(0)).toHaveText(/Primary nomination/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeDisabled();
        await issueMethods.epsAnyPharmacyDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/Any pharmacy/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/Primary nomination/);

    });

    test("Verify all EPS related issue method dropdown's options are disabled when logging user is not a signing user", { tag: ["@US449061", "@regression", "@US423729", "@stg"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1200, height: 900 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "5", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMethods.signIngClinicianField.nth(1).fill("RAJENDRAN");
        await issueMethods.getSigningClinicianOption("RAJENDRAN, Roshini (Dr)").click();
        await page.waitForTimeout(1000);
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeDisabled();
    });

    test("Verify all EPS related issue method dropdown's options are disabled when patient does not have EPS access", { tag: ["@US449061", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-primary-nomination", "true");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "5", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await page.waitForTimeout(1000);
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeDisabled();
    });

    test("Verify possible to switch between NHS Printed, EPS Any, and EPS Appliance nomination when patient does not have a primary nomination but has appliance nomination and one medication is an appliance", { tag: ["@US449061", "@regression", "@US423729"] }, async ({ page, commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMethods, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await commonActions.setLocalStorage("mock-eps", "true");
        await commonActions.setLocalStorage("mock-primary-nomination", "false");
        await commonActions.setLocalStorage("mock-appliance-nomination", "true");
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", generateRandomGuid(), "5", "9", "6", "", "");
        await addMedicationPanelActions.addRepeatMedication("Crepe bandage BP 1988 10cm x 4.5m", generateRandomGuid(), "5", "5", "6", "", "");
        await issueMedicationPanelActions.clickIssueTab();
        await page.waitForTimeout(1000);
        await expect(issueMethods.issueMethodTopHeader.nth(0)).toHaveText(/Appliance nomination/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeVisible();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).toBeVisible();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeVisible();
        await expect(issueMethods.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsApplianceNominationDropdownOption).toBeDisabled();
        await expect(issueMethods.epsAnyPharmacyDropdownOption).not.toBeDisabled();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).not.toBeDisabled();
        await issueMethods.printedNhsPrescriptionDropdownOption.click();
        await expect(issueMethods.issueMethodTopHeader).toHaveText(/NHS prescription/);
        await expect(issueMethods.issueMethodTopHeader).not.toHaveText(/Any pharmacy/);
        await issueMedicationPanelActions.clickIssueMethodDropdownOption();
        await expect(issueMethods.printedNhsPrescriptionDropdownOption).toBeDisabled();
    });

});
