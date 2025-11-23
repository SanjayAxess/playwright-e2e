import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("Cancel Issue Medication", () => {
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

    test("Validating user able to Cancel issue of drug having single issue", { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.clickCancelIssueOption();
        await cancelMedicationPanelActions.verifyCancelIssuePanel("Aspirin 75mg tablets");
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await cancelMedicationPanelActions.expectMedicationIsNotIssued("Aspirin 75mg tablets");
    });

    test("Validating user able to Cancel issues of multiple drugs", { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Paracetamol 500mg tablets", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Paracetamol 500mg capsules", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.verifyMultipleDrugsCancelIssuePanel("4");
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(4);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await cancelMedicationPanelActions.expectMedicationIsNotIssued("Co-cyprindiol 2000microgram");
        await cancelMedicationPanelActions.expectMedicationIsNotIssued("Aspirin 75mg tablets");
        await cancelMedicationPanelActions.expectMedicationIsNotIssued("Paracetamol 500mg tablets");
        await cancelMedicationPanelActions.expectMedicationIsNotIssued("Paracetamol 500mg capsules");
    });

    test("Validating fields in the cancel issue dialog box", { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.verifyCancelIssuePanelFields("Co-cyprindiol 2000microgram", randomGuid, "12");
    });

    test('Validating cancel issue dialog box at different screen sizes', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.verifyCancelIssueDialogAtScreenSizes();
    });

    test('Validating dropdown values in the Reason for cancellation field in the cancel issue dialog box', { tag: ["@regression", "@US481134", "@dev"] }, async ({ page, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1400, height: 1100 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.validateCancellationReasonDropdownOptions();
        await page.setViewportSize({ width: 360, height: 720 });
        await cancelMedicationPanelActions.validateCancellationReasonDropdownOptions();
    });

    test('Validating dropdown values in the Reason for cancellation field in the cancel issue dialog box are able to select using keyboard', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.validateCancellationReasonDropdownOptions();
        await cancelMedicationPanelActions.selectCancellationReasonWithKeyboard();
    });

    test('Validating Cancel issue is available in the three dots menu for current medication', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsAvailable();
    });

    test('Validating Cancel issue is not available in the three dots menu for past medication', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectlocationIssuedDropdownOverTheCounter();
        await recordMedicationPanelActions.searchAndSelectMedication("Arachis oil 130ml enema");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(20.24);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(119);
        await recordMedicationPanelActions.selectPastMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsNotAvailable();
    });

    test('Validating Cancel issue option is disabled for acute medications which has no issues', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
    });

    test('Validating Cancel issue option is enabled for acute medications which has one or more issues', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsEnabled();
    });

    test('Validating Cancel issue option is disabled for repeat medications which has no issues', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
    });

    test('Validating Cancel issue option is enabled for repeat medications which has issues', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsEnabled();
    });

    test('Validating Cancel issue option is disabled for repeat dispensing medications which has no issues', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
    });

    test('Validating Cancel issue option is disabled for repeat dispensing medications which is issued', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("Go to EMIS Web to cancel the latest issue.");
    });

    test('Validating Cancel issue option is disabled for Issued elsewhere medication(Hospital)', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
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
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("Cannot cancel latest issue for a medication issued elsewhere.");
    });

    test('Validating Cancel issue option is disabled for Issued elsewhere medication(Out of Hours Service)', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectLocationIssuedDropdownOutOfHoursService();
        await recordMedicationPanelActions.searchAndSelectMedication("Malathion 0.5% aqueous liquid");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(119);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(119);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("Cannot cancel latest issue for a medication issued elsewhere.");
    });

    test('Validating Cancel issue option is disabled for Issued elsewhere medication(Over the Counter)', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
        await recordMedicationPanelActions.clickRecordButton();
        await recordMedicationPanelActions.clickLocationIssuedDropdown();
        await recordMedicationPanelActions.selectlocationIssuedDropdownOverTheCounter();
        await recordMedicationPanelActions.searchAndSelectMedication("Malathion 0.5% aqueous liquid");
        await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
        await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(119);
        await recordMedicationPanelActions.enterRequiredValueIntoRecordDurationField(119);
        await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
        await recordMedicationPanelActions.clickRecordPanelRecordButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("Cannot cancel latest issue for a medication issued elsewhere.");
    });

    test('Validating Cancel issue option is disabled and has No tooltip for acute drug if Prescription request status is pending and not issued earlier', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, requestIssueActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is disabled and has No tooltip for repeat drug if Prescription request status is pending and not issued earlier', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, requestIssueActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is disabled and has No tooltip for repeat dispensing drug if Prescription request status is pending and not issued earlier', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, requestIssueActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is disabled and has No tooltip for automatic drug if Prescription request status is pending and not issued earlier', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
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
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test(' Validating Cancel issue option is disabled and has tooltip for acute drug if Prescription request status is pending and has earlier issuance', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions, requestIssueActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("This medication has an outstanding request that must be actioned in EMIS Web before cancelling the latest issue.");
    });

    test('Validating Cancel issue option is disabled and has tooltip for repeat drug if Prescription request status is pending and has earlier issuance', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, requestIssueActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("This medication has an outstanding request that must be actioned in EMIS Web before cancelling the latest issue.");
    });

    test('Validating Cancel issue option is disabled and has tooltip for repeat dispensing drug if Prescription request status is pending and has earlier issuance', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, addMedicationPanelActions, requestIssueActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addRepeatDispensingMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("Go to EMIS Web to cancel the latest issue.");
    });

    test('Validating Cancel issue option is disabled and has tooltip for automatic drug if Prescription request status is pending and has earlier issuance', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Carbamazepine 100mg tablets Automatic Hospital pending");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectVisibleTooltipWithText("Cannot cancel latest issue for a medication issued elsewhere.");
    });

    test('Validating Cancel issue option is enabled and has NO tooltip for acute drug if Prescription request status is Approved', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Amantadine 100mg capsules");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsEnabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is enabled and has NO tooltip for repeat drug if Prescription request status is Approved', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Budesonide 64micrograms/dose nasal spray");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsEnabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is disabled and has NO tooltip for acute drug if Prescription request status is Rejected and not issued earlier', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Asacol 800mg MR gastro-resistant tablets (AbbVie Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is disabled and has NO tooltip for repeat drug if Prescription request status is Rejected and not issued earlier', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Benzydamine 0.15% mouthwash sugar free");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsDisabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is enabled and has NO tooltip for acute drug if Prescription request status is Rejected and has earlier issuance', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aztreonam 1g powder for solution for injection vials");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsEnabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });

    test('Validating Cancel issue option is enabled and has NO tooltip for repeat drug if Prescription request status is Rejected and has earlier issuance', { tag: ["@regression", "@US481134", "@dev"] }, async ({ medicationHomeActions, cancelMedicationPanelActions }) => {
        await cancelMedicationPanelActions.mockCancelLatestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Byannli 700mg/3.5ml prolonged-release suspension for injection pre-filled syringes (Janssen-Cilag Ltd)");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await cancelMedicationPanelActions.expectCancelLatestIssueIsEnabled();
        await cancelMedicationPanelActions.hoverCancelLatestIssueOption();
        await cancelMedicationPanelActions.expectCancelLatestIssueTooltipNotVisible();
    });
})
