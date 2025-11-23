import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("End Medication flow", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    let randomGuid1: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
        randomGuid1 = generateRandomGuid();
    });

    test.afterEach(async ({ commonActions }) => {
        await commonActions.unMockUrl();
        await commonActions.unBlockAllUrls();
    });

    test('Verify user able to edit acute medication which is not issued in prescribe panel', { tag: ["@regression", "@dev1", "@US364573", "@US392237", "@US481623"] }, async ({ medicationHomeActions, addMedicationPanelActions, editMedicationActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", initialDosage, "20", "45");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "30", "35");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 30 tablet`],
            "",
            "",
            "",
            "",
        );
    });

    test('Verify user able to edit acute medication which is issued in prescribe panel[Faraday25-clinical-safety-Unable to reauthorise a prescription]', { tag: ["@regression", "@dev1", "@US364573", "@US392237", "@US481623"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", initialDosage, "20", "45");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "30", "35");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 30 tabletUpdated`],
            "",
            await commonActions.getTodayDate(),
            "",
            "Print (Stored)",
        );
    });

    test('Verify user able to edit repeat medication which is not issued in prescribe panel', { tag: ["@regression", "@dev1", "@US364573", "@US392237", "@US481623"] }, async ({ medicationHomeActions, addMedicationPanelActions, editMedicationActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Aspirin 75mg tablets", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "30", "35");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 30 tablet`],
            "",
            "",
            "",
            "",
        );
    });

    test('Verify user able to edit repeat medication which is issued in prescribe panel', { tag: ["@regression", "@dev1", "@US364573", "@US392237", "@US481623"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Aspirin 75mg tablets", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "30", "35");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 30 tabletUpdated`, "Info. for pharmacy:Pharmacy contraceptive Test"],
            "",
            await commonActions.getTodayDate(),
            "0 of 35",
            "Print (Stored)",
        );
    });

    test('Verify edit medication with only mandatory fields in prescribe panel', { tag: ["@regression", "@dev1", "@US392237", "@US8911101"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", initialDosage, "20", "45");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editMandatoryFields(updatedDosage, "30", "35", "6");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 30 tabletUpdated`],
            "",
            await commonActions.getTodayDate(),
            "",
            "Print (Stored)",
        );
    });

    test('Verify edit medication with every fields in the edit form in prescribe panel', { tag: ["@regression", "@dev1", "@US392237", "@US8911101"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", initialDosage, "20", "45");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editAllFields(updatedDosage, "30", "35", "6", "Information for Pharmacy", "Information for Patient", "21-Mar-2026");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tabletsPersonally administered${updatedDosage}, 30 tabletUpdated`, "Info. for pharmacy:Information for Pharmacy", "Info. for patient:Information for Patient"],
            "21-Mar-2026",
            await commonActions.getTodayDate(),
            "",
            "Print (Stored)",
        );
    });

    test('Verify edit medication with only non-mandatory fields in prescribe panel', { tag: ["@regression", "@dev1", "@US392237", "@US8911101"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Aspirin 75mg tablets", initialDosage, "12", "12", "12");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editNonMandatoryFields(updatedDosage, "Information for Pharmacy", "Information for Patient", "21-Mar-2026");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tabletsPersonally administered${updatedDosage}, 12 tabletUpdated`, "Info. for pharmacy:Information for Pharmacy", "Info. for patient:Information for Patient"],
            "21-Mar-2026",
            await commonActions.getTodayDate(),
            "1 of 12",
            "Print (Stored)",
        );
    });

    test('Verify edit medication with minimum values in the fields in prescribe panel', { tag: ["@regression", "@dev1", "@US392237", "@US8911101"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Aspirin 75mg tablets", initialDosage, "1", "1", "1", "b", "c", "12-Feb-2026");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "0.01", "1", "T", "T", "12-Mar-2026");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 0.01 tabletUpdated`, "Info. for pharmacy:T", "Info. for patient:T"],
            "12-Mar-2026",
            await commonActions.getTodayDate(),
            "1 of 1",
            "Print (Stored)",
        );
    });

    test('Verify edit medication with maximum values in the fields in prescribe panel', { tag: ["@regression", "@dev1", "@US392237", "@US8911101"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Aspirin 75mg tablets", initialDosage, "1", "1", "1", "b", "c", "12-Feb-2026");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "65535", "899999.99", "50", "A`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWWWWWWW EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEE PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWW WWWWEWMMMMMMMMMMM", "A`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWWWWWWW EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEE PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWW WWWWEWMMMMMMMMMMM", "12-Feb-2026");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 65535 tabletUpdated`, "Info. for pharmacy:A`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWWWWWWW EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEE PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWW WWWWEWMMMMMMMMMMM", "Info. for patient:A`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWWWWWWW EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEE PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWW WWWWEWMMMMMMMMMMM"],
            "12-Feb-2026",
            await commonActions.getTodayDate(),
            "0 of 50",
            "Print (Stored)",
        );
    });

    test('Validate edit medication with only mandatory field in the record panel', { tag: ["@regression", "@dev1", "@US364573", "@US394724", "@US8911101"] }, async ({ medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;

        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownOutOfHoursService();
        await recordMedicationPanelActions.searchAndSelectMedication("Complan Shake oral powder 57g sachets milk (Nutricia Ltd)");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(initialDosage);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(5);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(1);
        await recordMedicationPanelActions.clickcurrentMedicationOptionRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editRecordPanelMandatoryFields("10", false);
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(initialDosage);
        await medicationHomeActions.validatePastMedicationFirstRowAtXlargeView(
            [`Complan Shake oral powder 57g sachets milk (Nutricia Ltd)${initialDosage}, 10 sachet`],
            await commonActions.getTodayDate(),
            "",
            await commonActions.getTodayDate(),
        );
    });

    test('Validate edit medication with only non mandatory field in the record panel', { tag: ["@regression", "@dev1", "@US394724", "@US8911101"] }, async ({ medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownOutOfHoursService();
        await recordMedicationPanelActions.searchAndSelectMedication("Complan Shake oral powder 57g sachets milk (Nutricia Ltd)");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(initialDosage);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(5);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(1);
        await recordMedicationPanelActions.clickcurrentMedicationOptionRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editRecordPanelNonMandatoryFields(updatedDosage);
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Complan Shake oral powder 57g sachets milk (Nutricia Ltd)${updatedDosage}, 5 sachet`],
            "",
            "",
            "",
            "",
        );
    });

    test('Validate edit medication with all field in the record panel', { tag: ["@regression", "@dev1", "@US432027", "@US8911101"] }, async ({ medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownOutOfHoursService();
        await recordMedicationPanelActions.searchAndSelectMedication("Complan Shake oral powder 57g sachets milk (Nutricia Ltd)");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(initialDosage);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(5);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(1);
        await recordMedicationPanelActions.clickcurrentMedicationOptionRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await recordMedicationPanelActions.validateTheMedicationRecordedNotificationPanel();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editRecordPanelAllFields("10", updatedDosage, false);
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(updatedDosage);
        await medicationHomeActions.validatePastMedicationFirstRowAtXlargeView(
            [`Complan Shake oral powder 57g sachets milk (Nutricia Ltd)${updatedDosage}, 10 sachet`],
            await commonActions.getTodayDate(),
            "",
            await commonActions.getTodayDate(),
        );
    });

    test('Validate 30 days warning for duration field in edit panel for controlled drugs', { tag: ["@regression", "@dev1", "@US394724", "@US8911101"] }, async ({ medicationHomeActions, addMedicationPanelActions, clinicalWarningPopupActions, editMedicationActions, commonActions }) => {
        const initialDosage = randomGuid;
        const updatedDosage = generateRandomGuid();

        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Diamorphine 5mg powder for solution for injection ampoules", randomGuid, "12", "12", "12", "Controlled Drug Test", "Controlled Drug Test");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(initialDosage);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await editMedicationActions.clickOnEditMedicationOption();
        await editMedicationActions.editFields(updatedDosage, "30", "35");
        await editMedicationActions.clickUpdateOnly();
        await editMedicationActions.validateEditMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(updatedDosage);
        await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
            [`Aspirin 75mg tablets${updatedDosage}, 30 tablet`],
            "",
            "",
            "",
            "",
        );
    });
})