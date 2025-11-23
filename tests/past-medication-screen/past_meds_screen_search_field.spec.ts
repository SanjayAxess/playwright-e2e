import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("past medication screen search field", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "Medication View MVP - part 1",
      "EMISXGP-30",
      "https://emisgroup.aha.io/features/EMISXGP-30"
    );
  });

  test("Validating past search option after entering 1 character(All drugs are listed - Should not filter based on search value)", { tag: ["@clinical-safety", "@stg", "@regression", "@view_meds_prod", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.searchPastMedication("3");
    // Verify table values
    const tableData = {
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
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating past search option after entering empty spaces (All drugs are listed - Should not filter based on search value)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.searchPastMedication("     ");
    // Verify table values
    const tableData = {
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
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating past search option after entering 2 characters (Should return drugs matching the search value)", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.searchPastMedication("Ac");

    const visibleTableData = {
      rows: () => [
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet"],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml"]
      ]
    };

    await medicationHomeActions.validatePreparationValuesInMedicationPage(visibleTableData);
  });

  test("Validating past search option after entering more than 2 characters (Should return drugs matching the search value) and sorted (Name A-Z)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.searchPastMedication("Active");

    const tableData = {
      rows: () => [
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"]
      ]
    };

    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating past search option accepts alphanumeric and special characters by space separation (Should return drugs matching the search value)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.searchPastMedication("Ac / 1 ml");

    const tableData = {
      rows: () => [
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml"]
      ]
    };

    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating No results found Screen in past tab when searched with invalid drug", { tag: ["@regression", "@view_meds_prod", "@all", "@smoke", "@medication_view", "@stg", "@pr_checks"] }, async ({ commonActions, medicationHomeActions, page }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.searchPastMedication("Invalid data");
    await medicationHomeActions.validateNoMedicationResultsFoundScreen();
  });

  test("Validating past search option is not available when patient has no drugs", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.mockEmptyMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifySearchOptionTextboxIsNotAvailable("past");
  });
});