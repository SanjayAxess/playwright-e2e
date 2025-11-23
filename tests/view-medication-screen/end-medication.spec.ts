import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

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

    test('Validate user able to end a medication [Faraday26-clinical-safety-End-course]', { tag: ["@regression", "@US481134"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, commonActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.validatePastMedicationFirstRowAtXlargeView(
            ["Aspirin 75mg tablets", randomGuid, "20"],
            await commonActions.getTodayDate(),
            "",
            "");
    });

    test('Validate End course of drug without cancelling issue in prescribe panel', { tag: ["@regression", "@US481134"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, commonActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.validatePastMedicationFirstRowAtXlargeView(
            ["Aspirin 75mg tablets", randomGuid, "20"],
            await commonActions.getTodayDate(),
            "Test reason for ending course",
            await commonActions.getTodayDate());
    });

    test('Validate could not end course error message when end course API fails while ending the course[Faraday06-clinical-safety-Errors/warnings]', { tag: ["@regression", "@US481134"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, commonActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.blockEndCourseAPI();
        await endCourseActions.clickEndCourseButton();
        await endCourseActions.validateEndCourseError();
        await endCourseActions.unBlockEndCourseAPI();
        await endCourseActions.clickEndCourseButton();
        await endCourseActions.validateEndCourseToastMessage();
    });

    test('Verify End course option is enabled for Acute drug which is issued in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is enabled for Acute drug which is not issued in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is enabled for Repeat drug which is issued in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is enabled for Repeat drug which is not issued in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is enabled for Repeat dispensing drug which is issued in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is enabled for Repeat dispensing drug which is not issued in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is enabled for issued elsewhere drug in the current medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, endCourseActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Malathion 0.5% aqueous liquid");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(119);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
    });

    test('Verify End course option is not available for the drugs which is in the past medication screen', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, endCourseActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Malathion 0.5% aqueous liquid");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(119);
        await recordMedicationPanelActions.selectPastMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionNotAvailable();
    });

    test('Validate "End course" dialog for the issued drug', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, endCourseActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Malathion 0.5% aqueous liquid");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(119);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.validateEndCourseDialog();
    });

    test('Verify Info text with icon is not displayed in End course dialog, if the drug is not issued', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.validateEndCourseInfoTextNotAvailable();
    });

    test('Verify Do not end course button got truncated to Do not end in the smaller screen', { tag: ["@regression", "@US481622"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await page.setViewportSize({ width: 1400, height: 1100 });
        await endCourseActions.validateDoNotEndTextSmallView();
    });

    test('Verify red validation message & error banner is displayed when exceeding the character limit in Reason field', { tag: ["@regression", "@US481622"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.validateReasonForEndingCourseFieldValidation();
    });

    test('Validating End course success notification', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await endCourseActions.validateEndCourseToastMessage();
    });

    test('Verify End course option is disabled and has tooltip for acute drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Ametop 4% gel dispensing pack");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is disabled and has tooltip for Repeat drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Besavar XL 10mg tablets (Zentiva Pharma UK Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is disabled and has tooltip for Repeat dispensing drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Epaderm ointment (Molnlycke Health Care Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is disabled and has tooltip for Automatic drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Fenapin 20mg/1ml solution for infusion ampoules (Galvany Pharma Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is disabled and has tooltip for acute Hospital drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Caspofungin 50mg powder for solution for infusion vials");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is disabled and has tooltip for repeat Hospital drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Calcitriol 250nanogram capsules");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is disabled and has tooltip for repeat dispensing Hospital drug if Prescription status is pending', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Catridecacog 2,500unit powder and solvent for solution for injection vials");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionDisabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsAvailable();
    });

    test('Verify End course option is enabled and has no tooltip for acute drug if Prescription status is Approved', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Amantadine 100mg capsules");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsNotAvailable();
    });

    test('Verify End course option is enabled and has no tooltip for Repeat drug if Prescription status is Approved', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Budesonide 64micrograms/dose nasal spray");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsNotAvailable();
    });

    test('Verify End course option is enabled and has no tooltip for acute drug if Prescription status is Rejected', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Asacol 800mg MR gastro-resistant tablets (AbbVie Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsNotAvailable();
    });

    test('Verify End course option is enabled and has no tooltip for Repeat drug if Prescription status is Rejected', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Benzydamine 0.15% mouthwash sugar free");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsNotAvailable();
    });

    test('Verify End course option is enabled and has no tooltip for Repeat dispensing drug if Prescription status is Rejected', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, endCourseActions }) => {
        await medicationHomeActions.getEndMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Liquid paraffin light 70% gel");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.validateEndCourseOptionEnabled();
        await endCourseActions.hoverEndCourseOption();
        await endCourseActions.validateCannotEndCourseTooltipIsNotAvailable();
    });
})