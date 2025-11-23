import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("past medication view options field", () => {
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

  test("Validating past View Options Icon and Dialog box", { tag: ["@regression", "@all", "@smoke", "@medication_view", "@stg"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.verifyPastViewOptionsDialogBox();
  });

  test("Validating past View Options is not available when patient has no drugs", { tag: ["@regression", "@all"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.mockEmptyMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewOptionsDialogBoxIsNotAvailable();
  });

  test("Validating Grouping and sorting in the past medication screen [Faraday12-clinical-safety-sorting/filtering of medications]", { tag: ["@regression", "@view_meds_prod", "@all", "@stg"] }, async ({ commonActions, addMedicationPanelActions, medicationHomeActions, issueMedicationPanelActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    //Validating the default sorting(Name (A-Z)) and grouping(Dont group) of medications in the past medication screen
    const DefaultData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml"],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet"],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tablet"],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram"],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml"],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tablet"],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(DefaultData);

    //Validating the sorting(LastIssueDate) and grouping(Prescription type) of medications in the past medication screen
    await medicationHomeActions.selectPrescriptionTypeAndLastIssueDate_ViewOptions();
    const GroupedData = {
      rows: () => [
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["Acute", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["Acute", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["Acute", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet"],
        ["Acute", "Risedronate sodium 5mg tabletstest, 1 tablet"],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["Repeat", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram"],
        ["Repeat dispensing", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml"],
        ["Repeat dispensing", "Eslicarbazepine 800mg tabletsFStest, 1 tablet"],
        ["Automatic", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml"],
        ["Automatic", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet"],
        ["Issued elsewhere", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip"],
        ["Issued elsewhere", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(GroupedData);

    //Validating the sorting(LastIssueDate) and grouping(Dont group) of medications in the past medication screen
    await medicationHomeActions.selectDontGroupAndLastIssueDate_ViewOptions();
    const LastIssueDateData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml"],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet"],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tablet"],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram"],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml"],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tablet"],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(LastIssueDateData);

    //Validating the sorting(Name (A-Z)) and grouping(Prescription type) of medications in the past medication screen
    await medicationHomeActions.selectPrescriptionTypeAndName_ViewOptions();
    const GroupedByPrescriptionTypeAndNameData = {
      rows: () => [
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["Acute", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["Acute", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["Acute", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet"],
        ["Acute", "Risedronate sodium 5mg tabletstest, 1 tablet"],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["Repeat", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram"],
        ["Repeat dispensing", "Eslicarbazepine 800mg tabletsFStest, 1 tablet"],
        ["Repeat dispensing", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml"],
        ["Automatic", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml"],
        ["Automatic", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet"],
        ["Issued elsewhere", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["Issued elsewhere", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(GroupedByPrescriptionTypeAndNameData);
  });
});