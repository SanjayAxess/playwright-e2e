import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("current medication view options field", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "Medication View MVP - Part 2",
      "EMISXGP-226",
      "https://emisgroup.aha.io/features/EMISXGP-226"
    );
  });


  test("Validating Current View Options Icon and Dialog box", { tag: ["@regression", "@all", "@smoke", "@medication_view", "@stg"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.verifyCurrentViewOptionsDialogBox();
  });

  test("Validating Current View Options is not available when patient has no drugs", { tag: ["@regression", "@all"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.mockEmptyMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewOptionsDialogBoxIsNotAvailable();
  });

  test("Validating Grouping and sorting in the current medication screen [Faraday12-clinical-safety-sorting/filtering of medications]", { tag: ["@regression", "@1view_meds_prod", "@all", "@stg"] }, async ({ commonActions, addMedicationPanelActions, medicationHomeActions, issueMedicationPanelActions }) => {
    //Adding medications to the current medication screen
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "12", "12", "Acute Not Issued");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Cyproterone 50mg tablets", randomGuid, "10", "10", "Acute Issued");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "99", "65", "Acute Issued with postdate");
    await issueMedicationPanelActions.applyPostdate(await commonActions.getFutureDate());
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Avanafil 50mg tablets", randomGuid, "1", "11", "5", "Repeat Not Issued");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Cyproterone 50mg tablets", randomGuid, "1", "9", "7", "Repeat Issued");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Nitrazepam 5mg tablets", randomGuid, "1", "20", "8", "RD not issued");
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Avanafil 50mg tablets", randomGuid, "1", "20", "4", "RD issued");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication(randomGuid);
    //Validating the default sorting(Name (A-Z)) and grouping(Prescription type) of medications in the current medication screen
    const DefaultData = {
      rows: () => [
        ["Acute", "Aspirin 75mg dispersible tablets"],
        ["Acute", "Avanafil 50mg tablets"],
        ["Acute", "Cyproterone 50mg tablets"],
        ["Repeat", "Avanafil 50mg tablets"],
        ["Repeat", "Cyproterone 50mg tablets"],
        ["Repeat dispensing", "Avanafil 50mg tablets"],
        ["Repeat dispensing", "Nitrazepam 5mg tablets"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(DefaultData);
    //Validating the sorting(LastIssueDate) and grouping(Prescription type) of medications in the current medication screen
    await medicationHomeActions.selectPrescriptionTypeAndLastIssueDate_ViewOptions();
    const PrescriptionTypeAndLastIssueDateData = {
      rows: () => [
        ["Acute", "Aspirin 75mg dispersible tablets"],
        ["Acute", "Cyproterone 50mg tablets"],
        ["Acute", "Avanafil 50mg tablets"],
        ["Repeat", "Cyproterone 50mg tablets"],
        ["Repeat", "Avanafil 50mg tablets"],
        ["Repeat dispensing", "Avanafil 50mg tablets"],
        ["Repeat dispensing", "Nitrazepam 5mg tablets"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(PrescriptionTypeAndLastIssueDateData);
    //Validating the sorting(Name (A-Z)) and grouping(Dont group) of medications in the current medication screen
    await medicationHomeActions.selectDontGroupAndName_ViewOptions();
    const DontGroupAndNameData = {
      rows: () => [
        ["nogroup", "Aspirin 75mg dispersible tablets"],
        ["nogroup", "Avanafil 50mg tablets"],
        ["nogroup", "Avanafil 50mg tablets"],
        ["nogroup", "Avanafil 50mg tablets"],
        ["nogroup", "Cyproterone 50mg tablets"],
        ["nogroup", "Cyproterone 50mg tablets"],
        ["nogroup", "Nitrazepam 5mg tablets"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(DontGroupAndNameData);
    //Validating the sorting(LastIssueDate) and grouping(Dont group) of medications in the current medication screen
    await medicationHomeActions.selectDontGroupAndLastIssueDate_ViewOptions();
    const DontGroupAndLastIssueDateData = {
      rows: () => [
        ["nogroup", "Aspirin 75mg dispersible tablets"],
        ["nogroup", "Avanafil 50mg tablets"],
        ["nogroup", "Cyproterone 50mg tablets"],
        ["nogroup", "Cyproterone 50mg tablets"],
        ["nogroup", "Avanafil 50mg tablets"],
        ["nogroup", "Avanafil 50mg tablets"],
        ["nogroup", "Nitrazepam 5mg tablets"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(DontGroupAndLastIssueDateData);
  });
});