import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { CommonActions } from "../../actions/common-actions";

test.describe("past medication screen", () => {
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

  test("Validating past Tab Headers and table data at the x-large size(table size greater than or equal to 1200px)", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1000);
    await medicationHomeActions.clickPastMedicationTab();
    // Verify column headers
    const expectedHeaders = [
      "Drug / Dosage / Quantity",
      "Date stopped",
      "Reason stopped",
      "Last issue date"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml", "31-Oct-2023", "test 4", "19-Mar-2024  (Calc)", ""],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip", "31-Oct-2023", "hospital test", "31-Oct-2023", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet", "02-Nov-2023", "delete", "18-Oct-2023", ""],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet", "31-Oct-2023", "Change of strength", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip", "31-Oct-2023", "test1", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet", "02-Nov-2023", "test dekete", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet", "02-Nov-2023", "test delete", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet", "02-Jan-2024", "test", "Not issued", ""],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tablet", "31-Oct-2023", "test5", "Not issued", ""],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram", "31-Oct-2023", "test3", "Not issued", ""],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml", "31-Oct-2023", "test 2", "Not issued", ""],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tablet", "31-Oct-2023", "test", "Not issued", ""],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet", "31-Oct-2023", "Other Reason selected while replacing", "Not issued", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInXLargeView(tableData);
  });

  test("Validating past Tab Headers and table data at the large size(table size lesser than 1200px and greater than or equal to 992px)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await commonActions.updateScreenSize(1400, 1100);
    await medicationHomeActions.clickPastMedicationTab();
    // Verify column headers
    const expectedHeaders = [
      "Drug / Dosage / Quantity",
      "Date stopped",
      "Reason stopped",
      "Last issue date"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml", "31-Oct-2023", "test 4", "19-Mar-2024  (Calc)", ""],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip", "31-Oct-2023", "hospital test", "31-Oct-2023", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet", "02-Nov-2023", "delete", "18-Oct-2023", ""],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet", "31-Oct-2023", "Change of strength", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip", "31-Oct-2023", "test1", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet", "02-Nov-2023", "test dekete", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet", "02-Nov-2023", "test delete", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet", "02-Jan-2024", "test", "Not issued", ""],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tablet", "31-Oct-2023", "test5", "Not issued", ""],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram", "31-Oct-2023", "test3", "Not issued", ""],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml", "31-Oct-2023", "test 2", "Not issued", ""],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tablet", "31-Oct-2023", "test", "Not issued", ""],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet", "31-Oct-2023", "Other Reason selected while replacing", "Not issued", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInLargeView(tableData);
  });

  test("Validating past Tab Headers and table data at the medium size(table size lesser than 992px and greater than or equal to 768px)", { tag: ["@regression", "@all"] }, async ({ page, commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await commonActions.updateScreenSize(900, 720);
    await medicationHomeActions.clickPastMedicationTab();
    // Verify column headers
    const expectedHeaders = [
      "Drug / Dosage / Quantity",
      "Date stopped",
      "Last issue date"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 mlReason stopped: test 4", "31-Oct-2023", "19-Mar-2024  (Calc)", ""],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 stripReason stopped: hospital test", "31-Oct-2023", "31-Oct-2023", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tabletReason stopped: delete", "02-Nov-2023", "18-Oct-2023", ""],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tabletReason stopped: Change of strength", "31-Oct-2023", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 stripReason stopped: test1", "31-Oct-2023", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tabletReason stopped: test dekete", "02-Nov-2023", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tabletReason stopped: test delete", "02-Nov-2023", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tabletReason stopped: test", "02-Jan-2024", "Not issued", ""],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tabletReason stopped: test5", "31-Oct-2023", "Not issued", ""],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gramReason stopped: test3", "31-Oct-2023", "Not issued", ""],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 mlReason stopped: test 2", "31-Oct-2023", "Not issued", ""],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tabletReason stopped: test", "31-Oct-2023", "Not issued", ""],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tabletReason stopped: Other Reason selected while replacing", "31-Oct-2023", "Not issued", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInMediumView(tableData);
  });

  test("Validating past Tab Headers and table data at the small size(table size lesser than 768px and greater than or equal to 576px)", { tag: ["@regression", "@all"] }, async ({ page, commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await commonActions.updateScreenSize(700, 720);
    await medicationHomeActions.clickPastMedicationTab();
    // Verify column headers
    const expectedHeaders = [
      "Drug / Dosage / Quantity",
      "Last issue date"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 mlReason stopped: test 4Date stopped: 31-Oct-2023", "19-Mar-2024  (Calc)", ""],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 stripReason stopped: hospital testDate stopped: 31-Oct-2023", "31-Oct-2023", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tabletReason stopped: deleteDate stopped: 02-Nov-2023", "18-Oct-2023", ""],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tabletReason stopped: Change of strengthDate stopped: 31-Oct-2023", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 stripReason stopped: test1Date stopped: 31-Oct-2023", "Not issued", "Not visible on the patient's online record"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tabletReason stopped: test deketeDate stopped: 02-Nov-2023", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tabletReason stopped: test deleteDate stopped: 02-Nov-2023", "Not issued", ""],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tabletReason stopped: testDate stopped: 02-Jan-2024", "Not issued", ""],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tabletReason stopped: test5Date stopped: 31-Oct-2023", "Not issued", ""],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gramReason stopped: test3Date stopped: 31-Oct-2023", "Not issued", ""],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 mlReason stopped: test 2Date stopped: 31-Oct-2023", "Not issued", ""],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tabletReason stopped: testDate stopped: 31-Oct-2023", "Not issued", ""],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tabletReason stopped: Other Reason selected while replacingDate stopped: 31-Oct-2023", "Not issued", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInSmallView(tableData);
  });

  test("Validating past Tab Headers and table data at the x-small size(table size lesser than 576px and greater than or equal to 280px)", { tag: ["@regression", "@all"] }, async ({ page, commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await commonActions.updateScreenSize(500, 720);
    await medicationHomeActions.clickPastMedicationTab();
    // Verify column headers
    const expectedHeaders = [
      "Drug / Dosage / Quantity"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["nogroup", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 1 ml More actions Reason stopped: test 4Date stopped: 31-Oct-2023Last issue date: 19-Mar-2024  (Calc)"],
        ["nogroup", "Aviva testing strips (Roche Diabetes Care Ltd)Use In Blood Glucose Test Meter As Directed, 1 strip More actions Reason stopped: hospital testDate stopped: 31-Oct-2023Last issue date: 31-Oct-2023"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet More actions Reason stopped: deleteDate stopped: 02-Nov-2023Last issue date: 18-Oct-2023"],
        ["nogroup", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet More actions Reason stopped: Change of strengthDate stopped: 31-Oct-2023Last issue date: Not issued"],
        ["nogroup", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip More actions Reason stopped: test1Date stopped: 31-Oct-2023Last issue date: Not issued"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet More actions Reason stopped: test deketeDate stopped: 02-Nov-2023Last issue date: Not issued"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 28 tablet More actions Reason stopped: test deleteDate stopped: 02-Nov-2023Last issue date: Not issued"],
        ["nogroup", "Aspirin 75mg dispersible tabletsOne To Be Taken Each Day, 12 tablet More actions Reason stopped: testDate stopped: 02-Jan-2024Last issue date: Not issued"],
        ["nogroup", "Eslicarbazepine 800mg tabletsFStest, 1 tablet More actions Reason stopped: test5Date stopped: 31-Oct-2023Last issue date: Not issued"],
        ["nogroup", "Liquid paraffin light 70% gelApply To Wet Skin And Rinse, 1 gram More actions Reason stopped: test3Date stopped: 31-Oct-2023Last issue date: Not issued"],
        ["nogroup", "Paracetamol 120mg/5ml oral suspension paediatricTwo 5ml Spoonfuls Every 4 To 6 Hours When Necessary.  No More Than 4 Doses In 24 Hours, 1 ml More actions Reason stopped: test 2Date stopped: 31-Oct-2023Last issue date: Not issued"],
        ["nogroup", "Risedronate sodium 5mg tabletstest, 1 tablet More actions Reason stopped: testDate stopped: 31-Oct-2023Last issue date: Not issued"],
        ["nogroup", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)PrivatePersonally administeredtest, 22 tablet More actions Reason stopped: Other Reason selected while replacingDate stopped: 31-Oct-2023Last issue date: Not issued"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating PFS Visibility Icon in past medication screen", { tag: ["@regression", "@view_meds_prod", "@all", "@clinical-safety", "@stg"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockPastMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1000);
    await medicationHomeActions.clickPastMedicationTab();
    // Verify PFS Icon color
    const expectedColor = "rgb(43, 51, 55)";
    await medicationHomeActions.PFSIcon(expectedColor);
  });

  test("Validating No past medication Found Screen when patient has no drugs", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.mockEmptyMedicationApiResponse();
    await medicationHomeActions.clickPastMedicationTab();
    const expectedText = ["No past medication", "This patient has no past medications in their clinical record."];
    await medicationHomeActions.validateNoMedicationFoundScreen(expectedText);
  });

  test("Validating Something went wrong screen when View Medication API fails in Past Medication screen", { tag: ["@clinical-safety", "@stg", "@regression", "@view_meds_prod", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await commonActions.mockUrl("**/medications**", 400)
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
    await commonActions.mockUrl("**/medications**", 404)
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
    await commonActions.mockUrl("**/medications**", 401)
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
    await commonActions.mockUrl("**/medications**", 500)
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
    await commonActions.mockUrl("**/medications**", 503)
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
    await commonActions.mockUrl("**/medications**", 504)
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
    await commonActions.blockAPI("**/medications**")
    await medicationHomeActions.clickCurrentMedicationTab();
    await medicationHomeActions.clickPastMedicationTab();
    await medicationHomeActions.verifyViewMedicationError("past");
  });
});