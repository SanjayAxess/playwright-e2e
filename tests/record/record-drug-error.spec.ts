import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("record drug error", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });
    test.beforeEach(async () => {
        await epic(
            "Record a Medication Part 2",
            "EMISXGP-E-231",
            "https://emisgroup.aha.io/epics/EMISXGP-E-231"
        );
    });

    test("Validating Record panel field error valaidations", { tag: ["@US464127", "@regression", "@pr_check"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.verifyRecordPanelFieldValidations();
    });

    test("Validating Dosage, Quantity and Duration field validation", { tag: ["@US464127", "@regression"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.verifyDosageQuantityAndDurationValidation();
    });

    test("Validating Discard medication alert message in record flow", { tag: ["@US464127", "@regression"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.verifyDiscardDialogValidation();
    });

    test("Validating Couldn't record medication error banner when record medication API fails[Faraday03-clinical-safety-Errors/warnings]", { tag: ["@US464127", "@regression"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.verifyRecordMedicationAPIFailureValidation();
    });

    test("Verify 'Endcourse API failure Warning dialog' when the end course API fails while recording medication and retrying to move to past[Faraday01-clinical-safety-Errors/warnings]", { tag: ["@US464127"] }, async ({ recordMedicationPanelActions, medicationHomeActions, commonActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownOutOfHoursService();
        await recordMedicationPanelActions.searchAndSelectMedication("Cyproterone 50mg tablets");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(5);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(1);
        await recordMedicationPanelActions.clickPastMedicationOptionRadioButton();
        await commonActions.blockAPI('**/end-course');
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.verifyRecordMedicationEndCourseAPIFailureValidation();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.validatePastMedicationFirstRowAtXlargeView(
            ["Cyproterone 50mg tablets", randomGuid, "5 tablet"],
            await commonActions.getTodayDate(),
            "",
            await commonActions.getTodayDate());
    });

    test("Validate Red error banner is displayed when clinical warnings API are failed in record medication panel[Faraday01-clinical-safety-Errors/warnings]", { tag: ["@US464127", "@regression"] }, async ({ recordMedicationPanelActions, medicationHomeActions, commonActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await commonActions.blockAPI('**/prescriber-warnings');
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownOutOfHoursService();
        await recordMedicationPanelActions.searchAndSelectMedication("Cyproterone 50mg tablets");
        await clinicalWarningPopupActions.verifyClinicalWarningsApiErrorDialog();
    });
})