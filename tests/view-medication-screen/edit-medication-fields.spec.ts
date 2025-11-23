import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { expect } from "@playwright/test";
import { AddMedicationPanelActions } from "../../actions/prescribe-add-medication-panel-actions";

test.describe("End Medication flow", () => {
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

    test('Verify Edit option is disabled and has tooltip for repeat dispensing issued drug', { tag: ["@regression", "@dev", "@US481623", "@US393345", "@US460164"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("Go to EMIS Web to edit repeat dispensing medication.");
    });

    test('Verify Edit option is disabled and has tooltip for repeat dispensing not issued drug', { tag: ["@regression", "@dev", "@US481623", "@US393345", "@US460164"] }, async ({ medicationHomeActions, addMedicationPanelActions, editMedicationActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.verifyEditOptionDisabledWithoutTooltip();
    });

    test('Verify Edit option is disabled and has tooltip for Automatic issued drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Dispos-A-Gloves non-sterile medium (Ansell Medical Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton(1);
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("Go to EMIS Web to edit Automatic medication.");
    });

    test('Verify Edit option is disabled and has tooltip for Automatic not issued drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Disulfiram 200mg tablets Not_issued automatic");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("Go to EMIS Web to edit Automatic medication.");
    });

    test('Verify Edit option is disabled and has tooltip for repeat dispensing Hospital drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Paracetamol 250mg/5ml oral suspension Hospital RepeatDispensing");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("Go to EMIS Web to edit repeat dispensing medication.");
    });

    test('Verify Edit option is disabled and has tooltip for Automatic Hospital drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Polyvinyl alcohol 1.4% eye drops Hospital Automatic");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("Go to EMIS Web to edit Automatic medication.");
    });

    test('Verify Edit option is enabled and has NO tooltip for repeat not issued drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Dispos-A-Gloves non-sterile medium (Ansell Medical Ltd) not issued - Repeat");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has NO tooltip for repeat issued drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets No.of issues less than No. of Authorised issues");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has NO tooltip for acute not issued drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets Not issued Acute");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has NO tooltip for acute issued drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has NO tooltip for repeat Hospital drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Paracetamol 500mg capsules Hospital Repeat");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has NO tooltip for acute Hospital drug', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aviva testing strips (Roche Diabetes Care Ltd) Hospital Acute");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is disabled and has tooltip for repeat drug if Prescription status is pending', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Besavar XL 10mg tablets (Zentiva Pharma UK Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("This medication has an outstanding request that must be actioned in EMIS Web before editing.");
    });

    test('Verify Edit option is disabled and has tooltip for acute drug if Prescription status is pending', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Ametop 4% gel dispensing pack");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("This medication has an outstanding request that must be actioned in EMIS Web before editing.");
    });

    test('Verify Edit option is disabled and has tooltip for acute drug if Prescription status is Approved', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Amantadine 100mg capsules");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is disabled and has tooltip for acute Hospital drug if Prescription status is pending', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Caspofungin 50mg powder for solution for infusion vials");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("This medication has an outstanding request that must be actioned in EMIS Web before editing.");
    });

    test('Verify Edit option is disabled and has tooltip for repeat Hospital drug if Prescription status is pending', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Calcitriol 250nanogram capsules");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("This medication has an outstanding request that must be actioned in EMIS Web before editing.");
    });

    test('Verify Edit option is enabled and has no tooltip for Acute drug if Prescription status is Rejected', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Asacol 800mg MR gastro-resistant tablets (AbbVie Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has no tooltip for Repeat drug if Prescription status is Approved', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Budesonide 64micrograms/dose nasal spray");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is enabled and has no tooltip for Repeat drug if Prescription status is Rejected', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationDifferentStatusResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Benzydamine 0.15% mouthwash sugar free");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionEnabled();
    });

    test('Verify Edit option is disabled and has tooltip for medications which are withdrawn', { tag: ["@regression", "@dev", "@US393345", "@US481623"] }, async ({ medicationHomeActions, editMedicationActions }) => {
        await editMedicationActions.mockEditMedicationResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Active testing strips");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.hoverOnEditMedicationOption();
        await editMedicationActions.expectCurrentEditMedicationOptionDisabled();
        await editMedicationActions.verifyEditOptionDisabledWithTooltip("Cannot edit as this medication has been withdrawn from the UK market.");
    });

    test('Validating Prescribe Edit Medication Right side panel fields ', { tag: ["@regression", "@dev"] }, async ({ recordMedication, clinicalWarningPopupActions, addMedicationPanelActions, medicationHome, medicationHomeActions, issueMedicationPanelActions, editMedicationActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Alendronic acid 70mg tablets", "prescribeedit", "11", "11", "Pharmacy Test", "Patient Test");
        await addMedicationPanelActions.clickCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("prescribeedit");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnMedicationOption();
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await editMedicationActions.verifyEditMedicationHeader();
        await editMedicationActions.verifyEditTabIsEnabled();
        await issueMedicationPanelActions.checkIssueTabIsDisabled();
        await editMedicationActions.verifyDrugNameInEditScreen("Alendronic acid 70mg tablets");
        await editMedicationActions.verifyElementBackgroundColor("Alendronic acid 70mg tablets", "rgba(0, 0, 0, 0)");
        await medicationHomeActions.clickMedsRefreshButton();
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await editMedicationActions.verifyEditMedicationHeader();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.selectDontGroupAndLastIssueDate_ViewOptions();
        await editMedicationActions.verifyEditMedicationHeader();
        await expect(medicationHome.button.prescribe_medium).not.toBeEnabled();
        await expect(recordMedication.recordMedsMediumButton).not.toBeEnabled();
        await editMedicationActions.verifyEditScreenBottomButtons();
    });


    test('Validating Dosage field in Prescribe Edit Medication screen', { tag: ["@regression", "@dev"] }, async ({ editMedicationActions }) => {
        await editMedicationActions.dosageFieldValidationsInEditScreen();
        await editMedicationActions.quantityFieldValidationsInEditScreen();
        await editMedicationActions.durationFieldValidationsInEditScreen();
        await editMedicationActions.prescriptionTypeFieldValidationsInEditScreen();
        await editMedicationActions.numberOfAuthorisedIssuesFieldValidationsInEditScreen();
    });
});