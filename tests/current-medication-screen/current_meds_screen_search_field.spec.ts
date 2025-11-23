import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("current medication screen search field", () => {
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

  test("Validating current search option after entering 1 character(All drugs are listed - Should not filter based on search value)", { tag: ["@clinical-safety", "@stg", "@regression", "@view_meds_prod", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1100);
    await medicationHomeActions.searchCurrentMedication("3");
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device"],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram"],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet"],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet"],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml"],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet"],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 device"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram"],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tablet"],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tablet"],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 ml"],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tablet"],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 ml"],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gram"],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet"],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsule"],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tablet"],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage"],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device"],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 ml"],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 ml"],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 ml"],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gram"],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating current search option after entering empty spaces (All drugs are listed - Should not filter based on search value)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1100);
    await medicationHomeActions.searchCurrentMedication("     ");
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device"],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram"],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet"],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet"],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml"],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet"],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet"],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 device"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram"],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tablet"],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tablet"],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 ml"],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tablet"],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 ml"],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gram"],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet"],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsule"],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tablet"],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage"],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device"],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 ml"],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 ml"],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 ml"],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gram"],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating current search option after entering 2 characters (Should return drugs matching the search value)", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1100);
    await medicationHomeActions.searchCurrentMedication("br");
    const visibleTableData = {
      rows: () => [
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(visibleTableData);
  });

  test("Validating current search option after entering more than 2 characters (Should return drugs matching the search value) and sorted (Name A-Z)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1100);
    await medicationHomeActions.searchCurrentMedication("Active");

    const tableData = {
      rows: () => [
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device"],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 device"],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating current search option accepts alphanumeric and characters by space separation (Should return drugs matching the search value)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1100);
    await medicationHomeActions.searchCurrentMedication("Ac (Roche * -");
    const tableData = {
      rows: () => [
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating current search option accepts special characters (Should return drugs matching the search value)", { tag: ["@regression", "@all"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await commonActions.updateScreenSize(1600, 1100);
    await medicationHomeActions.searchCurrentMedication("*.%/-(&)!\\\+=<>");
    const tableData = {
      rows: () => [
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating No results found Screen in current tab when searched with invalid drug", { tag: ["@regression", "@view_meds_prod", "@all", "@smoke", "@medication_view", "@stg", "@pr_check"] }, async ({ commonActions, medicationHomeActions, page }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.searchCurrentMedication("Invalid data");
    await medicationHomeActions.validateNoMedicationResultsFoundScreen();
  });

  test("Validating current search option is not available when patient has no drugs", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.mockEmptyMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifySearchOptionTextboxIsNotAvailable("current");
  });
});