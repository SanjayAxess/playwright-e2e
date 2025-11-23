import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { CommonActions } from "../../actions/common-actions";

test.describe("current medication screen", () => {
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

  test("validating current Tab Headers and table data at the x-large size(table size greater than or equal to 1200px)", { tag: ["@regression", "@stg", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await commonActions.updateScreenSize(1600, 1000);
    // Verify column headers
    const expectedHeaders = [
      "",
      "Drug / Dosage / Quantity",
      "Review date",
      "Last issued",
      "Issue number",
      "Issue method"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge", "", "10-Jan-2024 (Calc)", "6 of 6 (Calc)", "Dispense pending (Stored)", "Not visible on the patient's online record"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip", "", "23-Aug-2023", "", "Dispensed", "Not visible on the patient's online record"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device", "", "30-Aug-2023", "", "Dispense removed", ""],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram", "", "30-Aug-2023", "", "Private Dispensed", ""],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet", "", "30-Aug-2023", "", "Private Dispense removed", ""],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet", "", "30-Aug-2023", "", "Private Partially dispensed", ""],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml", "", "11-Dec-2023", "", "Private Dispense pending (Stored)", ""],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet", "", "30-Aug-2023", "", "Partially dispensed", ""],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet", "10-Aug-2025", "01-Aug-2023", "0 of 11", "Record For Notes", ""],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 device", "01-Jul-2025", "30-Aug-2023", "2 of 2", "Record For Notes (Stored)", "Not visible on the patient's online record"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram", "", "09-Feb-2024", "3 of 3", "Private Record For Notes (Stored)", ""],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tablet", "", "29-Aug-2023", "", "Print", ""],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tablet", "01-Sep-2023", "29-Aug-2023", "3 of 22", "Private Print (Stored)", ""],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 ml", "", "29-Aug-2023", "2 of 20", "Private Print", ""],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tablet", "", "29-Aug-2023", "0 of 34", "Private Record For Notes", ""],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 ml", "", "07-Nov-2023", "6 of 6", "Print (Stored)", ""],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gram", "", "23-Aug-2023", "0 of 2", "Private Handwritten (Stored)", ""],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet", "", "03-Sep-2023", "6 of 6", "Handwritten", ""],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsule", "", "29-Aug-2023", "0 of 2", "Private Handwritten", ""],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tablet", "", "29-Aug-2023", "0 of 2", "Handwritten (Stored)", ""],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage", "", "22-Sep-2023", "", "Record Hospital (Stored)", ""],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip", "", "22-Sep-2023", "", "Private Record Hospital (Stored)", ""],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device", "", "01-Apr-2023", "", "Record Hospital", ""],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 ml", "", "16-Jan-2024", "6 of 6", "Out Of Hours (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 ml", "", "16-Jan-2024", "6 of 6", "Out Of Hours", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 ml", "", "29-Aug-2023", "", "Over The Counter (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gram", "", "29-Aug-2023", "", "Over The Counter", ""],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial", "", "29-Aug-2023", "", "Private Record Hospital", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInXLargeView(tableData);
  });

  test("validating current Tab Headers and table data at the large size (table size less than 1200px)", { tag: ["@regression", "@stg", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await commonActions.updateScreenSize(1400, 1000);
    // Verify column headers
    const expectedHeaders = [
      "",
      "Drug / Dosage / Quantity",
      "Review date",
      "Last issued",
      "Issue number / method"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);
    // Verify table values
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge", "", "10-Jan-2024 (Calc)", "6 of 6 (Calc)Dispense pending (Stored)", "Not visible on the patient's online record"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip", "", "23-Aug-2023", "Dispensed", "Not visible on the patient's online record"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device", "", "30-Aug-2023", "Dispense removed", ""],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram", "", "30-Aug-2023", "Private Dispensed", ""],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet", "", "30-Aug-2023", "Private Dispense removed", ""],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet", "", "30-Aug-2023", "Private Partially dispensed", ""],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml", "", "11-Dec-2023", "Private Dispense pending (Stored)", ""],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet", "", "30-Aug-2023", "Partially dispensed", ""],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet", "10-Aug-2025", "01-Aug-2023", "0 of 11Record For Notes", ""],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 device", "01-Jul-2025", "30-Aug-2023 (Calc)", "2 of 2 (Calc)Record For Notes (Stored)", "Not visible on the patient's online record"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram", "", "09-Feb-2024", "3 of 3Private Record For Notes (Stored)", ""],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tablet", "", "29-Aug-2023", "Print", ""],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tablet", "01-Sep-2023", "29-Aug-2023", "3 of 22Private Print (Stored)", ""],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 ml", "", "29-Aug-2023", "2 of 20Private Print", ""],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tablet", "", "29-Aug-2023", "0 of 34Private Record For Notes", ""],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 ml", "", "07-Nov-2023 (Calc)", "6 of 6 (Calc)Print (Stored)", ""],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gram", "", "23-Aug-2023", "0 of 2Private Handwritten (Stored)", ""],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet", "", "03-Sep-2023 (Calc)", "6 of 6 (Calc)Handwritten", ""],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsule", "", "29-Aug-2023", "0 of 2Private Handwritten", ""],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tablet", "", "29-Aug-2023", "0 of 2Handwritten (Stored)", ""],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage", "", "22-Sep-2023", "Record Hospital (Stored)", ""],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip", "", "22-Sep-2023", "Private Record Hospital (Stored)", ""],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device", "", "01-Apr-2023", "Record Hospital", ""],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 ml", "", "16-Jan-2024 (Calc)", "6 of 6 (Calc)Out Of Hours (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 ml", "", "16-Jan-2024 (Calc)", "6 of 6 (Calc)Out Of Hours", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 ml", "", "29-Aug-2023", "Over The Counter (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gram", "", "29-Aug-2023", "Over The Counter", ""],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial", "", "29-Aug-2023", "Private Record Hospital", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInLargeView(tableData);
  });

  test("validating current Tab Headers and table data at the medium size (table size less than 992px and greater than or equal to 768px)", { tag: ["@regression", "@stg", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await commonActions.updateScreenSize(900, 720);

    // Verify column headers
    const expectedHeaders = [
      "",
      "Drug / Dosage / Quantity",
      "Last issued",
      "Issue number / method",
      ""
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);

    // Verify table values
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge", "10-Jan-2024 (Calc)", "6 of 6 (Calc)Dispense pending (Stored)", "Not visible on the patient's online record"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip", "23-Aug-2023", "Dispensed", "Not visible on the patient's online record"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device", "30-Aug-2023", "Dispense removed", ""],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram", "30-Aug-2023", "Private Dispensed", ""],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet", "30-Aug-2023", "Private Dispense removed", ""],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet", "30-Aug-2023", "Private Partially dispensed", ""],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml", "11-Dec-2023", "Private Dispense pending (Stored)", ""],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet", "30-Aug-2023", "Partially dispensed", ""],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tabletReview date: 10-Aug-2025", "01-Aug-2023", "0 of 11Record For Notes", ""],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 deviceUpdatedReview date: Review date expired01-Jul-2025", "30-Aug-2023 (Calc)", "2 of 2 (Calc)Record For Notes (Stored)", "Not visible on the patient's online record"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram", "09-Feb-2024", "3 of 3Private Record For Notes (Stored)", ""],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tablet", "29-Aug-2023", "Print", ""],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tabletReview date: Review date expired01-Sep-2023", "29-Aug-2023", "3 of 22Private Print (Stored)", ""],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 ml", "29-Aug-2023", "2 of 20Private Print", ""],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tablet", "29-Aug-2023", "0 of 34Private Record For Notes", ""],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 ml", "07-Nov-2023 (Calc)", "6 of 6 (Calc)Print (Stored)", ""],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gram", "23-Aug-2023", "0 of 2Private Handwritten (Stored)", ""],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet", "03-Sep-2023 (Calc)", "6 of 6 (Calc)Handwritten", ""],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsule", "29-Aug-2023", "0 of 2Private Handwritten", ""],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tablet", "29-Aug-2023", "0 of 2Handwritten (Stored)", ""],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage", "22-Sep-2023", "Record Hospital (Stored)", ""],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip", "22-Sep-2023", "Private Record Hospital (Stored)", ""],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device", "01-Apr-2023", "Record Hospital", ""],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 ml", "16-Jan-2024 (Calc)", "6 of 6 (Calc)Out Of Hours (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 ml", "16-Jan-2024 (Calc)", "6 of 6 (Calc)Out Of Hours", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 ml", "29-Aug-2023", "Over The Counter (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gram", "29-Aug-2023", "Over The Counter", ""],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial", "29-Aug-2023", "Private Record Hospital", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInMediumView(tableData);
  });

  test("validating current Tab Headers and table data at the small size (table size less than 768px and greater than or equal to 576px)", { tag: ["@regression", "@stg", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await commonActions.updateScreenSize(700, 720);
    // Verify column headers
    const expectedHeaders = [
      "",
      "Drug / Dosage / Quantity",
      "Last issued / number / method",
      ""
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);

    // Verify table values
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge", "10-Jan-2024 (Calc)6 of 6 (Calc)Dispense pending (Stored)", "Not visible on the patient's online record"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 strip", "23-Aug-2023 Dispensed", "Not visible on the patient's online record"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device", "30-Aug-2023 Dispense removed", ""],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram", "30-Aug-2023 Private Dispensed", ""],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet", "30-Aug-2023 Private Dispense removed", ""],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet", "30-Aug-2023 Private Partially dispensed", ""],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml", "11-Dec-2023 Private Dispense pending (Stored)", ""],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet", "30-Aug-2023 Partially dispensed", ""],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tabletReview date: 10-Aug-2025", "01-Aug-2023 0 of 11Record For Notes", ""],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 deviceUpdatedReview date: Review date expired01-Jul-2025", "30-Aug-2023 (Calc)2 of 2 (Calc)Record For Notes (Stored)", "Not visible on the patient's online record"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram", "09-Feb-2024 Number of authorised issues has been reached.3 of 3Private Record For Notes (Stored)", ""],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tablet", "29-Aug-2023 Print", ""],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tabletReview date: Review date expired01-Sep-2023", "29-Aug-2023 3 of 22Private Print (Stored)", ""],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 ml", "29-Aug-2023 2 of 20Private Print", ""],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tablet", "29-Aug-2023 0 of 34Private Record For Notes", ""],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 ml", "07-Nov-2023 (Calc)6 of 6 (Calc)Print (Stored)", ""],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gram", "23-Aug-2023 0 of 2Private Handwritten (Stored)", ""],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet", "03-Sep-2023 (Calc)6 of 6 (Calc)Handwritten", ""],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsule", "29-Aug-2023 0 of 2Private Handwritten", ""],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tablet", "29-Aug-2023 0 of 2Handwritten (Stored)", ""],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage", "22-Sep-2023 Record Hospital (Stored)", ""],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip", "22-Sep-2023 Private Record Hospital (Stored)", ""],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device", "01-Apr-2023 Record Hospital", ""],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 ml", "16-Jan-2024 (Calc)6 of 6 (Calc)Out Of Hours (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 ml", "16-Jan-2024 (Calc)6 of 6 (Calc)Out Of Hours", ""],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 ml", "29-Aug-2023 Over The Counter (Stored)", ""],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gram", "29-Aug-2023 Over The Counter", ""],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial", "29-Aug-2023 Private Record Hospital", ""]
      ]
    };
    await medicationHomeActions.validateTableValuesInSmallView(tableData);
  });

  test("validating current Tab Headers and table data at the x-small size (table size less than 576px and greater than or equal to 280px)", { tag: ["@regression", "@stg", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await commonActions.updateScreenSize(500, 720);

    // Verify column headers
    const expectedHeaders = [
      "",
      "Drug / Dosage / Quantity"
    ];
    await medicationHomeActions.validateColumnHeadersInMedicationPage(expectedHeaders);

    // Verify table values
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridgeUpdated More actions Last issued: 10-Jan-2024  (Calc)Issue number: 6 of 6 (Calc)Issue method: Dispense pending (Stored)"],
        ["Acute", "Active testing strips (Roche Diabetes Care Ltd)*.%/-(&)!\\\+=<> special characters, 2 stripUpdated More actions Last issued: 23-Aug-2023 Issue method: Dispensed"],
        ["Acute", "Afex Active male urinal system with extra large briefs A100-XL-08 (iMEDicare Ltd)2 per day, 22 device More actions Last issued: 30-Aug-2023 Issue method: Dispense removed"],
        ["Acute", "Bactroban 2% ointment (GlaxoSmithKline UK Ltd)Apply Three Times A Day, 22 gram More actions Last issued: 30-Aug-2023 Issue method: Private Dispensed"],
        ["Acute", "Dacadis MR 30mg tablets (Viatris UK Healthcare Ltd)test, 2 tablet More actions Last issued: 30-Aug-2023 Issue method: Private Dispense removed"],
        ["Acute", "Finasteride 5mg tabletstest, 11 tablet More actions Last issued: 30-Aug-2023 Issue method: Private Partially dispensed"],
        ["Acute", "Liquid paraffin light 63.4% bath additivePrivateAdd One To Three Capfuls To Bath Water, Or Apply To Wet Skin And Rinse, 2 ml More actions Last issued: 11-Dec-2023 Issue method: Private Dispense pending (Stored)"],
        ["Acute", "Zebinix 200mg tablets (BIAL Pharma UK Ltd)test, 22 tablet More actions Last issued: 30-Aug-2023 Issue method: Partially dispensed"],
        ["Repeat", "Abacavir 300mg tablets2-200 for 5 days, 2 tablet More actions Review date: 10-Aug-2025Last issued: 01-Aug-2023 Issue number: 0 of 11Issue method: Record For Notes"],
        ["Repeat", "Active class 2 (23-32mmHg) leggings lymphoedema garment extra large Black (Lipoelastic Ltd)test, 1 deviceUpdated More actions Review date: Review date expired01-Jul-2025Last issued: 30-Aug-2023  (Calc)Issue number: 2 of 2 (Calc)Issue method: Record For Notes (Stored)Not visible on the patient's online record"],
        ["Repeat", "Adapalene 0.1% geltest, 1 gram More actions Last issued: 09-Feb-2024 Issue number: Number of authorised issues has been reached.3 of 3Issue method: Private Record For Notes (Stored)"],
        ["Repeat", "Felodipine 2.5mg modified-release tabletsDosage 2, 1 tabletUpdated More actions Last issued: 29-Aug-2023 Issue method: Print"],
        ["Repeat", "Felodipine 5mg modified-release tabletsPrivate2 per day, 1 tablet More actions Review date: Review date expired01-Sep-2023Last issued: 29-Aug-2023 Issue number: 3 of 22Issue method: Private Print (Stored)"],
        ["Repeat", "Paracetamol 120mg/5ml oral suspension paediatricPrivateTest, 1 mlUpdated More actions Last issued: 29-Aug-2023 Issue number: 2 of 20Issue method: Private Print"],
        ["Repeat", "Paracetamol 500mg tabletsPrivateTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 1 tabletUpdated More actions Last issued: 29-Aug-2023 Issue number: 0 of 34Issue method: Private Record For Notes"],
        ["Repeat", "Paroxetine 10mg/5ml oral suspension sugar freeOne 5ml Spoonful To Be Taken Each Morning, 70 mlUpdated More actions Last issued: 07-Nov-2023  (Calc)Issue number: 6 of 6 (Calc)Issue method: Print (Stored)"],
        ["Repeat dispensing", "Adapalene 0.1% cream2 per day, 22 gramUpdated More actions Last issued: 23-Aug-2023 Issue number: 0 of 2Issue method: Private Handwritten (Stored)"],
        ["Repeat dispensing", "Felodipine 10mg modified-release tablets2 per day, 2 tablet More actions Last issued: 03-Sep-2023  (Calc)Issue number: 6 of 6 (Calc)Issue method: Handwritten"],
        ["Repeat dispensing", "Paracetamol 500mg capsulesTwo To Be Taken Every 4-6 Hours Up To Four Times A Day, 32 capsuleUpdated More actions Last issued: 29-Aug-2023 Issue number: 0 of 2Issue method: Private Handwritten"],
        ["Repeat dispensing", "Rabeprazole 10mg gastro-resistant tabletsOne Or Two To Be Taken Each Day, 1 tabletUpdated More actions Last issued: 29-Aug-2023 Issue number: 0 of 2Issue method: Handwritten (Stored)"],
        ["Issued elsewhere", "Actico bandage 10cm x 6m (L&R Medical UK Ltd)test, 8395 bandage More actions Last issued: 22-Sep-2023 Issue method: Record Hospital (Stored)"],
        ["Issued elsewhere", "Active testing strips (Roche Diabetes Care Ltd)test, 12 strip More actions Last issued: 22-Sep-2023 Issue method: Private Record Hospital (Stored)"],
        ["Issued elsewhere", "AeroChamber Plus (Trudell Medical UK Ltd)2 per week, 22 device More actions Last issued: 01-Apr-2023 Issue method: Record Hospital"],
        ["Issued elsewhere", "Fluorometholone 0.1% eye dropsTo Be Used As Directed, 11 mlUpdated More actions Last issued: 16-Jan-2024  (Calc)Issue number: 6 of 6 (Calc)Issue method: Out Of Hours (Stored)"],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additiveAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 2 mlUpdated More actions Last issued: 16-Jan-2024  (Calc)Issue number: 6 of 6 (Calc)Issue method: Out Of Hours"],
        ["Issued elsewhere", "Liquid paraffin light 63.4% bath additivePrivateAdd Half To Two Capfuls To Bath Water Or Apply To Wet Skin And Rinse, 22 mlUpdated More actions Last issued: 29-Aug-2023 Issue method: Over The Counter (Stored)"],
        ["Issued elsewhere", "Liquid paraffin light 70% gelPrivateApply To Wet Skin And Rinse, 1 gramUpdated More actions Last issued: 29-Aug-2023 Issue method: Over The Counter"],
        ["Issued elsewhere", "Zevtera 500mg powder for concentrate for solution for infusion vials (Advanz Pharma)1 per day, 1 vial More actions Last issued: 29-Aug-2023 Issue method: Private Record Hospital"]
      ]
    };
    await medicationHomeActions.validatePreparationValuesInMedicationPage(tableData);
  });

  test("Validating PFS Visibility Icon in current medication screen", { tag: ["@regression", "@view_meds_prod", "@all", "@clinical-safety", "@stg"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    // Verify table values
    const tableData = {
      rows: () => [
        ["Acute", "Abasaglar 100units/ml solution for injection 3ml cartridges (Eli Lilly and Company Ltd)For Subcutaneous Injection, According To Requirements, 12 cartridge", "", "10-Jan-2024 (Calc)", "6 of 6 (Calc)", "Dispense pending (Stored)", "Not visible on the patient's online record"],
      ]
    };
    await medicationHomeActions.validateTableValuesInXLargeView(tableData);

    // Verify PFS Icon color
    const expectedColor = "rgb(43, 51, 55)";
    await medicationHomeActions.PFSIcon(expectedColor);
  });

  test("Validating No Current Medication Found Screen when patient has no drugs", { tag: ["@regression", "@all"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.mockEmptyMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    const expectedText = ["No current medication", "This patient has no current medications in their clinical record."];
    await medicationHomeActions.validateNoMedicationFoundScreen(expectedText);
  });

  test("Validating Something went wrong screen when View Medication API fails in Current Medication screen", { tag: ["@clinical-safety", "@stg", "@regression", "@view_meds_prod", "@all", "@view_meds_prod"] }, async ({ commonActions, medicationHomeActions }) => {
    await commonActions.mockUrl("**/medications**", 400)
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
    await commonActions.mockUrl("**/medications**", 404)
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
    await commonActions.mockUrl("**/medications**", 401)
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
    await commonActions.mockUrl("**/medications**", 500)
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
    await commonActions.mockUrl("**/medications**", 503)
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
    await commonActions.mockUrl("**/medications**", 504)
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
    await commonActions.blockAPI("**/medications**")
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyViewMedicationError("current");
  });

  test("Verify whether the sub header is sticky along with column header while scrolling the same sub header's type medications", { tag: ["@US359469", "@all", "@regression"] }, async ({ commonActions, medicationHomeActions }) => {
    await medicationHomeActions.mockCurrentMedicationApiResponse();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.verifyRepeatHeaderPositionAfterScrolling();
  });

  test("Verify colour of the Medication name updated to Primary DIM In Current Screen", { tag: ["@US472807", "@all", "@regression"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.checkMedicationNameColorInCurrentScreen();
  });

  test("Verify colour of the Medication name updated to Primary DIM In Past Screen", { tag: ["@US472807", "@all", "@regression"] }, async ({ medicationHomeActions }) => {
    await medicationHomeActions.checkMedicationNameColorInPastScreen();
  });

});