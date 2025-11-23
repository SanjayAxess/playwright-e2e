import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { expect } from "@playwright/test";
import { CancelMedicationPage } from "../../pages/cancel-medication-page";
import { IssueMedicationPanelPage } from "../../pages/prescribe-issue-medication-panel-page";

test.describe("Drug and org level warnings", () => {
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
    test("Verify whether the late issue warning is displayed properly while prescribing medication", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Salbutamol 100");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyLateIssueWarningIsDisplayed();

    });

    test("Verify whether the correct date count is displayed in the late issue warning for the medication", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Salbutamol 100");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyLateIssueWarningIsDisplayed();
        await issueMedicationPanelActions.verifyCorrectDateCountInLateIssueWarning("Salbutamol 100");
    });

    test("Verify whether the maximum interval warning is displayed properly for the medication", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Salbutamol 100");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyMaximumIntervalWarningIsDisplayed();
    });

    test("Verify whether the 'Already issued today' warning is displayed properly for the medication", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Aspirin 75mg tablets", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
        await issueMedicationPanelActions.clickIssueTab();
        await issueMedicationPanelActions.clickIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickKebabMenuForMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyAlreadyIssuedTodayWarningIsDisplayed();
    });

    test("Verify whether the drug level warning is displayed first when have both drug level and org level warnings", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Salbutamol 100");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyMaximumIntervalWarningIsDisplayed();
        await issueMedicationPanelActions.verifyLateIssueWarningIsDisplayed();
        await issueMedicationPanelActions.verifyDrugLevelWarningIsDisplayedFirst();
    });

    test("Verify whether '1 day' text is displayed instead of '1 days' when set the drug level maximum value 1", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Cell-based quadrivalent influenza vaccine");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyMaximumIntervalWarningIsDisplayedWithText("1 day");
    });

    test("Verify whether the minimum interval warning(drug level) is displayed properly for the medication", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Cell-based quadrivalent influenza vaccine");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyMinimumIntervalWarningIsDisplayedWithText("5000 days");
    });

    test("Verify whether the drug level warning is displayed first when both minimum interval and maximum interval warnings are present", { tag: ["@US395363", "@US373583", "@regression"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, issueMedication }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await medicationHomeActions.getDrugAndOrgLevelWarningsMedication_Mock();
        await medicationHomeActions.clickKebabMenuForMedication("Cell-based quadrivalent influenza vaccine");
        await medicationHomeActions.clickAddToPrescriptionButton();
        await expect(issueMedication.issueMedicationTab).toBeVisible();
        await issueMedicationPanelActions.verifyMinimumIntervalWarningIsDisplayedWithText("5000 days");
        await issueMedicationPanelActions.verifyMaximumIntervalWarningIsDisplayedWithText("1 day");
        await issueMedicationPanelActions.verifyMinimumIntervalWarningIsDisplayedFirst();
    });

});