import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("multiple select medications in current medication screen", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "[2] Select Multiple Medications - Cancel Issue",
      "EMISXGP-1355",
      "https://emisgroup.aha.io/features/EMISXGP-1355"
    );
  });

  test("verify MSM checkboxes in current and past screen", { tag: ["@regression", "@stg"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.verifyMultiCheckboxIsVisibleInCurrentTab();
    await medicationHomeActions.clickPastMedicationTab()
    await medicationHomeActions.verifyMultiCheckBoxIsNotVisibleInPastTab();
  });

  test("verify MSM toolbar in the current screen", { tag: ["@regression", "@stg"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.SelectMultipleCheckbox(1, 4);
    await medicationHomeActions.verifyMsmToolBarOptions("4");
    await medicationHomeActions.closeMsmToolBar();
  });

  test("verify drug row is highlighted based on the MSM checkbox selection", { tag: ["@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets " + randomGuid);
    await medicationHomeActions.SelectSingleDrugCheckbox(1);
    await medicationHomeActions.verifyAcuteFirstDrugRowBackgroundColorIsBlue();
    await medicationHomeActions.UnSelectSingleDrugCheckbox(1);
    await medicationHomeActions.verifyAcuteFirstDrugRowBackgroundColorIsWhite();
  });

  test("verify hyperlink removed for all the drugs when checkbox(MSM ON) is selected", { tag: ["@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets " + randomGuid);
    await medicationHomeActions.verifyHyperlinkIsAvailableForDrugs();
    await medicationHomeActions.clickTheDrug();
    await medicationHomeActions.verifyDetailsPanelIsOpen();
    await medicationHomeActions.SelectSingleDrugCheckbox(1);
    await medicationHomeActions.verifyHyperlinkIsNotAvailableForDrugs();
  });

  test("verify 3 dots menu is disabled when any drug is selected on MSM", { tag: ["@460595", "@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyThreedotsMenuIsDisabledBasedOnDrugSelection();
  });

  test("Grey out the Cancel issue button if more than 4 drugs are selected in MSM", { tag: ["@461263", "@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication(randomGuid);
    await medicationHomeActions.verifyCancelIssueButtonIsDisabledAfterSelecting4Drugs();
  });

  test("Grey out the Cancel issue button if not issued drug selected in MSM", { tag: ["@461168", "@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication(randomGuid);
    await medicationHomeActions.SelectSingleDrugCheckbox(1);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("disabled");
    await medicationHomeActions.verifyTooltipTextForMSMCancelIssueButton("One or more of the selected rows are not eligible to be cancelled.");
    await medicationHomeActions.UnSelectSingleDrugCheckbox(1);
  });

  test("Grey out the Cancel issue button if repeat dispensing drug selected in MSM", { tag: ["@461168", "@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Acebutolol 400mg tablets", randomGuid, "24", "24", "10", "RD Pharmacy Test", "RD Patient Test");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.searchCurrentMedication("Acebutolol 400mg tablets " + randomGuid);
    await medicationHomeActions.SelectSingleDrugCheckbox(1);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("disabled");
    await medicationHomeActions.verifyTooltipTextForMSMCancelIssueButton("One or more of the selected rows are not eligible to be cancelled.");
    await medicationHomeActions.UnSelectSingleDrugCheckbox(1);
  });

  test("Grey out the Cancel issue button if issued elsewhere drug selected in MSM", { tag: ["@461168", "@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, recordMedicationPanelActions, clinicalWarningPopupActions }) => {
    await commonActions.updateScreenSize(1000, 600);
    await recordMedicationPanelActions.clickRecordButton();
    await recordMedicationPanelActions.clickLocationIssuedDropdown();
    await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
    await recordMedicationPanelActions.searchAndSelectMedication("Cyproterone 50mg tablets");
    await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
    await recordMedicationPanelActions.enterTextIntoRecordDosageField(randomGuid);
    await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(99);
    await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
    await recordMedicationPanelActions.clickRecordPanelRecordButton();
    await medicationHomeActions.clickToastNotificationCloseButton();
    await medicationHomeActions.searchCurrentMedication("Cyproterone 50mg tablets " + randomGuid);
    await medicationHomeActions.SelectSingleDrugCheckbox(1);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("disabled");
    await medicationHomeActions.verifyTooltipTextForMSMCancelIssueButton("One or more of the selected rows are not eligible to be cancelled.");
    await medicationHomeActions.UnSelectSingleDrugCheckbox(1);
  });

  test("Grey out the Cancel issue button and validate the tooltip priority", { tag: ["@461168", "@regression", "@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    //add and issue drug1
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99", "535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    //add and issue drug2
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "9", "635", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    //add and don't issue drug3
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await addMedicationPanelActions.clickCloseButton();
    //add and don't issue drug4
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Acebutolol 400mg tablets", randomGuid, "2", "2", "2", "RD Pharmacy Test", "RD Patient Test");
    await addMedicationPanelActions.clickCloseButton();
    //add and don't issue drug5
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Acebutolol 400mg tablets", randomGuid, "14", "14", "4", "RD Pharmacy Test", "RD Patient Test");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication(randomGuid);
    await medicationHomeActions.SelectMultipleCheckbox(1, 3);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("disabled");
    await medicationHomeActions.verifyTooltipTextForMSMCancelIssueButton("One or more of the selected rows are not eligible to be cancelled.");
    await medicationHomeActions.UnselectMultipleCheckbox(1, 3);
    await medicationHomeActions.SelectMultipleCheckbox(1, 2);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("enabled");
    await medicationHomeActions.UnselectMultipleCheckbox(1, 2);
    await medicationHomeActions.SelectMultipleCheckbox(1, 5);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("disabled");
    await medicationHomeActions.verifyTooltipTextForMSMCancelIssueButton("You can only cancel up to 4 issues at a time.");
    await medicationHomeActions.UnselectMultipleCheckbox(1, 5);
  });

  test("multiple select toolbar behaviour with cancel issue button at different screen sizes", { tag: ["@460599", "@regression", "@dev"] }, async ({ commonActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    //add and issue drug1
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99", "535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    //add and issue drug2
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "9", "635", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
    //add and don't issue drug3
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await addMedicationPanelActions.clickCloseButton();
    // larger screen size
    await medicationHomeActions.searchCurrentMedication(randomGuid);
    await commonActions.updateScreenSize(1200, 700);
    await medicationHomeActions.SelectMultipleCheckbox(1, 2);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonText();
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("visible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsButtonState("invisible");
    // 1 px greater than smaller screen size
    await commonActions.updateScreenSize(576, 900);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("visible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsButtonState("invisible");
    // smaller screen size
    await commonActions.updateScreenSize(575, 900);
    await medicationHomeActions.verifymsmToolBarCancelIssueButtonState("invisible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsButtonState("visible");
    await medicationHomeActions.clickToolBarMoreOptionsMenu();
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("visible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("enabled");
    await medicationHomeActions.verifymsmToolBarMenuCancelIssueButtonText();
    await medicationHomeActions.SelectSingleDrugCheckbox(3);
    await medicationHomeActions.clickToolBarMoreOptionsMenu();
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("visible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("disabled");
    // x-smaller screen size
    await commonActions.updateScreenSize(350, 900);
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("visible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("disabled");
    await medicationHomeActions.UnSelectSingleDrugCheckbox(3);
    await medicationHomeActions.clickToolBarMoreOptionsMenu();
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("visible");
    await medicationHomeActions.verifymsmToolBarMoreOptionsCancelIssueDropdownState("enabled");
  });

  test("Grey out the Cancel issue button State in MSM when Write panel is open", { tag: ["@461367", "@regression", "@stg"] }, async ({ medicationHomeActions, clinicalWarningPopupActions, cancelMedicationPanelActions, recordMedicationPanelActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    //add and issue drug 1
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("AabChlor Sodium Chloride 5% eye drops", randomGuid, "90", "530", "Pharmacy Test1", "Patient Test1");
    await issueMedicationPanelActions.issueMedication();
    //add and issue drug 2
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("AabChlor Sodium Chloride 5% eye drops", randomGuid, "99", "535", "Pharmacy Test2", "Patient Test2");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    //Record Panel
    await medicationHomeActions.searchCurrentMedication("AabChlor Sodium");
    await recordMedicationPanelActions.clickRecordButton();
    await medicationHomeActions.verifyMsmCancelIssueButtonIsDisabledWhenWritePanelIsOpen();
    await medicationHomeActions.verifyNoTooltipInMsmCancelIssueButtonWhenWritePanelIsOpen();
    await recordMedicationPanelActions.clickLocationIssuedDropdown();
    await recordMedicationPanelActions.selectLocationIssuedDropdownHospital();
    await recordMedicationPanelActions.searchAndSelectMedication("Aspirin 75mg tablets");
    await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
    await recordMedicationPanelActions.enterTextIntoRecordDosageField("record dosage");
    await recordMedicationPanelActions.enterRequiredValueIntoRecordQuantityField(5);
    await recordMedicationPanelActions.selectCurrentMedicationRadioButton();
    await recordMedicationPanelActions.clickRecordPanelRecordButton();
    await recordMedicationPanelActions.clickRecordCloseButton();
    await medicationHomeActions.verifyMsmCancelIssueButtonIsEnabledAfterClosingTheWritePanel();
    await medicationHomeActions.closeMsmToolBar();
    //Prescribe Panel
    await medicationHomeActions.clickPrescribeButton();
    await medicationHomeActions.verifyMsmCancelIssueButtonIsDisabledWhenWritePanelIsOpen();
    await medicationHomeActions.verifyNoTooltipInMsmCancelIssueButtonWhenWritePanelIsOpen();
    await addMedicationPanelActions.addAcuteMedication("AabChlor Sodium Chloride 5% eye drops", randomGuid, "99", "535", "Pharmacy Test2", "Patient Test2");
    await addMedicationPanelActions.clickCloseButton();
    await addMedicationPanelActions.clickPrescribeDiscardButton();
    await medicationHomeActions.verifyMsmCancelIssueButtonIsEnabledAfterClosingTheWritePanel();
    await medicationHomeActions.closeMsmToolBar();
    //Edit Panel
    await medicationHomeActions.searchCurrentMedication("AabChlor Sodium Chloride 5% eye drops");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await medicationHomeActions.clickThreeDotsButtonEditDrug();
    await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
    await medicationHomeActions.verifyMsmCancelIssueButtonIsDisabledWhenWritePanelIsOpen();
    await medicationHomeActions.verifyNoTooltipInMsmCancelIssueButtonWhenWritePanelIsOpen();
    await medicationHomeActions.closeMsmToolBar();
  });

  test("Grey out the Cancel issue option in 3dots menu when Write panel is open", { tag: ["@463262", "@regression", "@stg"] }, async ({ medicationHomeActions, clinicalWarningPopupActions, cancelMedicationPanelActions, recordMedicationPanelActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    //Record Panel
    await recordMedicationPanelActions.clickRecordButton();
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsNotEnabled();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsNotEnabled();
    await recordMedicationPanelActions.clickRecordCloseButton();
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
    await medicationHomeActions.clickMedsRefreshButton();
    //Prescribe Panel
    await medicationHomeActions.clickPrescribeButton();
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsNotEnabled();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsNotEnabled();
    await addMedicationPanelActions.clickCloseButton();
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
    await medicationHomeActions.clickMedsRefreshButton();
    //Edit Panel
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await medicationHomeActions.clickThreeDotsButtonEditDrug();
    await clinicalWarningPopupActions.proceedWithClinicalWarningWindow();
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsNotEnabled();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsNotEnabled();
    await issueMedicationPanelActions.closeIssuePanel();
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets");
    await cancelMedicationPanelActions.clickFirstKebabMenu();
    await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
    await medicationHomeActions.clickMedsRefreshButton();
  });

});