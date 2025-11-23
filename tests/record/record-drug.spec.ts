import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { CommonActions } from "../../actions/common-actions";

test.describe("record drug", () => {
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

    test("Validating Record Medication button with side panel for different screen size responsiveness", { tag: ["@US327387", "@US327389", "@US327391", "@view_meds_prod"] }, async ({ commonActions, recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.validateRecordMedicationPanel();
        await recordMedicationPanelActions.clickRecordCloseButton();
        await commonActions.updateScreenSize(1200, 1000)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.validateRecordMedicationPanel();
        await recordMedicationPanelActions.clickRecordCloseButton();
        await commonActions.updateScreenSize(992, 1000)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.validateRecordMedicationPanel();
        await recordMedicationPanelActions.clickRecordCloseButton();
        await commonActions.updateScreenSize(768, 700)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.validateRecordMedicationPanel();
        await recordMedicationPanelActions.clickRecordCloseButton();
        await commonActions.updateScreenSize(576, 700)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.validateRecordMedicationPanel();
        await recordMedicationPanelActions.clickRecordCloseButton();
        await commonActions.updateScreenSize(320, 1000)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.validateRecordMedicationPanel();
        await recordMedicationPanelActions.clickRecordCloseButton();
    });

    test("Verify the record button is displayed for various breakpoints", { tag: ["@US327389"] }, async ({ commonActions, recordMedicationPanelActions }) => {
        await commonActions.updateScreenSize(1200, 1000)
        await recordMedicationPanelActions.verifyTheRecordButtonIsVisible();
        await commonActions.updateScreenSize(992, 1000)
        await recordMedicationPanelActions.verifyTheRecordButtonIsVisible();
        await commonActions.updateScreenSize(768, 700)
        await recordMedicationPanelActions.verifyTheRecordButtonIsVisible();
        await commonActions.updateScreenSize(576, 700)
        await recordMedicationPanelActions.verifyTheRecordButtonIsVisible();
        await commonActions.updateScreenSize(320, 1000)
        await recordMedicationPanelActions.verifyTheRecordButtonIsVisible();
    });

    test("Validating Record medication of Acute drug in Current Medication Screen with Date issued as past date", { tag: ["@US353411", "@US354515", "@US353415", "@US395571", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await commonActions.updateScreenSize(1500, 600)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Aspirin 75mg tablets");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTheDateIssuedValue("12-Nov-2023");
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(5);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        // await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets " + randomGuid);
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(5, ["Record Hospital (Stored)"])
        await recordMedicationPanelActions.verifyTheMedicationIsRecorded("Aspirin 75mg tablets");
    });

    test("Validating Record medication of SLS drug in Current Medication Screen with Date issued as today date and without dosage", { tag: ["@US395571", "@US353411", "@US353415"] }, async ({ commonActions, medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await commonActions.updateScreenSize(1500, 600);
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Aspirin 75mg tablets");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.scrollDownAndCloseTheClinicalWaning();
        const today = await commonActions.getTodayDate();
        await recordMedicationPanelActions.enterTheDateIssuedValue(today);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(75);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        // await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets " + 75);
        await recordMedicationPanelActions.verifyTheMedicationIsRecorded("Aspirin 75mg tablets");
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(5, ["Record Hospital (Stored)"]);
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(4, [today])
    });

    test("Validating Record medication of SLS drug in Current Medication Screen with Date issued as today date", { tag: ["@US395571", "@regression", "@US353411", "@US353415", "@pr_check"] }, async ({ commonActions, medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Aspirin 75mg tablets");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.scrollDownAndCloseTheClinicalWaning();
        const today = await commonActions.getTodayDate();
        await recordMedicationPanelActions.enterTheDateIssuedValue(today);
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(7);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        // await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets " + randomGuid);
        await recordMedicationPanelActions.verifyTheMedicationIsRecorded("Aspirin 75mg tablets");
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(5, ["Record Hospital (Stored)"]);
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(4, [today])
    });

    test("Validating Record medication of Contraceptive drug in Current Medication Screen & filled Quantity as decimal number", { tag: ["@US395571", "@US353411"] }, async ({ medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Cyproterone 50mg tablets");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(999999.99);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Cyproterone 50mg tablets " + 999999.99);
        await recordMedicationPanelActions.verifyTheMedicationIsRecorded("Cyproterone 50mg tablets");
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(4, ["Record Hospital (Stored)"]);
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(2, ["999999.99"]);
        await recordMedicationPanelActions.sortMedicationWithNoGroupAndNewestFirst();
        await recordMedicationPanelActions.verifyTheMedicationIsRecorded("Cyproterone 50mg tablets");
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(4, ["Record Hospital (Stored)"]);
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(2, ["999999.99"]);
    });

    test("Validating Record medication of NPSA Cytotoxic drug when filled Dosage with freetext & Quantity is 0", { tag: ["@US395571", "@US353411", "@regression"] }, async ({ medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Hydroxycarbamide 500mg capsules");
        await recordMedicationPanelActions.verifyHighWarningText();
        await recordMedicationPanelActions.clickHighWarningProceedButton()
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField("");
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(0);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Hydroxycarbamide 500mg capsules ");
        await recordMedicationPanelActions.verifyTheMedicationIsRecorded("Hydroxycarbamide 500mg capsules");
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(4, ["Record Hospital (Stored)"]);
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(2, ["0"]);
        await recordMedicationPanelActions.sortMedicationWithNoGroupAndNewestFirst();
    });

    test("Validating Recorded medication with past date is displaying in past screen when Allocate to Past medication is selected", { tag: ["@US395575", "@regression"] }, async ({ medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.enterTheDateIssuedValue("12-Nov-2023");
        await recordMedicationPanelActions.searchAndSelectMedication("Hydroxycarbamide 500mg capsules");
        await recordMedicationPanelActions.verifyHighWarningText();
        await recordMedicationPanelActions.clickHighWarningProceedButton()
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(10);
        await recordMedicationPanelActions.selectPastMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Hydroxycarbamide 500mg capsules " + randomGuid);
        await medicationHomeActions.validateEachColumnInFirstRowOfPastMedication(3, ["12-Nov-2023"]);
    });

    test("Validating Recorded medication with current date is displaying in past screen when Allocate to Past medication is selected", { tag: ["@US395575", "@regression"] }, async ({ clinicalWarningPopupActions, medicationHomeActions, recordMedicationPanelActions, commonActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.searchAndSelectMedication("Olive oil ear drops");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(10);
        await recordMedicationPanelActions.selectPastMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        const today = await commonActions.getTodayDate();
        await medicationHomeActions.validateEachColumnInFirstRowOfPastMedication(3, [today]);
    });

    test("Verify OOH/OTC medication is saved and displayed under Issued Elsewhere heading in EMIS-X", { tag: ["@US396121", "@regression"] }, async ({ clinicalWarningPopupActions, medicationHomeActions, recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectlocationIssuedDropdownOverTheCounter();
        await recordMedicationPanelActions.searchAndSelectMedication("Malathion 0.5% aqueous liquid");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTheDateIssuedValue("12-Nov-2023");
        await recordMedicationPanelActions.enterTextIntoRecordDosageField("To Be Used As Directed");
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(119);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(119);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Malathion 0.5% aqueous liquid To Be Used As Directed");
        await medicationHomeActions.validateEachColumnInFirstRowOfCurrentMedication(4, ["Over The Counter (Stored)"]);
    });

    test("Verify the medication is displayed in past drugs screen if 'Past medication' selected", { tag: ["@US370862", "@regression"] }, async ({ clinicalWarningPopupActions, medicationHomeActions, recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectlocationIssuedDropdownOverTheCounter();
        await recordMedicationPanelActions.enterTheDateIssuedValue("12-Nov-2023");
        await recordMedicationPanelActions.searchAndSelectMedication("Arachis oil 130ml enema");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(20.24);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(119);
        await recordMedicationPanelActions.selectPastMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Arachis oil 130ml enema " + randomGuid);
        await medicationHomeActions.validateEachColumnInFirstRowOfPastMedication(3, ["12-Nov-2023"]);
    });

    test("Validating 'Record & record another' and 'Cancel' button functionality in record panel", { tag: ["@US435337"] }, async ({ clinicalWarningPopupActions, medicationHomeActions, recordMedicationPanelActions, recordMedication, commonActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.verifyRecordAndRecordAnotherButtonIsVisible();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.enterTheDateIssuedValue("12-Nov-2023");
        await recordMedicationPanelActions.searchAndSelectMedication("Arachis oil 130ml enema");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField("One To Be Taken Each Day");
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(10);
        await recordMedicationPanelActions.selectPastMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordAndRecordAnotherButton();
        await recordMedicationPanelActions.verifyFieldsAreCleared();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
        await recordMedicationPanelActions.enterTheDateIssuedValue("12-Nov-2023");
        await recordMedicationPanelActions.searchAndSelectMedication("Arachis oil 130ml enema");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.clickRecordPanelCancelButton();
        // await recordMedicationPanelActions.verifyTheDiscardPanel("Arachis oil 130ml enema");
        await recordMedicationPanelActions.clickDiscardMedicationDialogCancelButton();
        test.expect(await recordMedication.recordMedicationPanelHeader.isVisible()).toBeTruthy();
        await recordMedicationPanelActions.clickRecordPanelCancelButton();
        // await recordMedicationPanelActions.verifyTheDiscardPanel("");
        await recordMedicationPanelActions.clickDiscardMedicationDialogDicardButton();
        test.expect(await recordMedication.recordMedicationPanelHeader.isVisible()).toBeFalsy();
        await commonActions.updateScreenSize(750, 600)
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.verifyCombinedRecordAndRecordAnotherButtonIsVisible();
        await recordMedicationPanelActions.verifyExpandMenuButtonIsVisible();
        test.expect(await recordMedication.recordAndRecordAnotherButtton.isVisible()).toBeFalsy();
        await recordMedicationPanelActions.clickRecordPanelCancelButton();
        test.expect(await recordMedication.recordMedicationPanelHeader.isVisible()).toBeFalsy();
    });
});
