import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("prescribe drug", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "Issue a Drug",
      "EMISXGP-660",
      "https://emisgroup.aha.io/features/EMISXGP-660"
    );
  });

  test("add and issue acute drug with postdate", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "99", "65");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Aspirin 75mg dispersible tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Aspirin 75mg dispersible tablets", "99 tablet", randomGuid],
      "",
      "Not issued",
      "",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Aspirin 75mg dispersible tablets", "99 tablet", randomGuid, "Acute issue"]);
    await issueMedicationPanelActions.applyPostdate(await commonActions.getFutureDate());
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Aspirin 75mg dispersible tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Aspirin 75mg dispersible tablets", "99 tablet", randomGuid],
      "",
      await commonActions.getFutureDate(),
      "",
      "Print (Stored)");
  });

  test("add and issue acute sls drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "A`1234567890-=~!@#$%^&*()_+[]'\;/.,{}|\":?>q ertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWW EEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE PPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP , WWWWWWWWWWWWWWWWWW WMMMMMMMMMMM", "A`1234567890-=~!@#$%^&*()_+[]'\;/.,{}|\":?>q ertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWWWWWWWWWWWWWWWW EEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE PPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP , WWWWWWWWWWWWWWWWWW WMMMMMMMMMMM");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["SLS", "Avanafil 50mg tablets", "99999 tablet", randomGuid],
      "",
      "Not issued",
      "",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Avanafil 50mg tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Avanafil 50mg tablets", "99999 tablet", randomGuid, "Acute issue"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Avanafil 50mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["SLS", "Avanafil 50mg tablets", "99999 tablet", randomGuid],
      "",
      await commonActions.getTodayDate(),
      "",
      "Print (Stored)");
  });

  test("add and issue repeat contraceptive drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Co-cyprindiol 2000microgram", randomGuid, "12", "12", "12", "Pharmacy contraceptive Test", "Patient contraceptive Test");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Co-cyprindiol 2000microgram " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["OC", "Co-cyprindiol 2000microgram/35microgram tablets", "12 tablet", randomGuid, "Info. for pharmacy:Pharmacy contraceptive Test", "Info. for patient:Patient contraceptive Test"],
      "",
      "Not issued",
      "0 of 12",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Co-cyprindiol 2000microgram " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Co-cyprindiol 2000microgram/35microgram tablets", "12 tablet", randomGuid, "Repeat issue 1 of 12"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Co-cyprindiol 2000microgram " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["OC", "Co-cyprindiol 2000microgram/35microgram tablets", "12 tablet", randomGuid, "Info. for pharmacy:Pharmacy contraceptive Test", "Info. for patient:Patient contraceptive Test"],
      "",
      await commonActions.getTodayDate(),
      "1 of 12",
      "Print (Stored)");
  });

  test("add and issue repeat personally administered drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addPersonallyAdministeredRepeatMedication("Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd)", randomGuid, "125", "10", "10", "PA Pharmacy Test", "PA Patient Test");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd) " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Personally administered", "Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd)", "125 unit dose", randomGuid, "Info. for pharmacy:PA Pharmacy Test", "Info. for patient:PA Patient Test"],
      "",
      "Not issued",
      "0 of 10",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd) " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd)", "125 unit dose", randomGuid, "Repeat issue 1 of 10"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd) " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Personally administered", "Carmellose 0.5% eye drops 0.4ml unit dose preservative free (Alissa Healthcare Research Ltd)", "125 unit dose", randomGuid, "Info. for pharmacy:PA Pharmacy Test", "Info. for patient:PA Patient Test"],
      "",
      await commonActions.getTodayDate(),
      "1 of 10",
      "Print (Stored)");
  });

  test("add and issue acute assorted flavours drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAssortedFlavoursAcuteMedication("Fortisip 2kcal liquid (Flavour Not Specified)", randomGuid, "12", "10", "AF Pharmacy Test", "AF Patient Test");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Fortisip 2kcal liquid (Flavour Not Specified) " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Assorted flavours", "Fortisip 2kcal liquid (Flavour Not Specified)", "12 x 200 ml", randomGuid, "Info. for pharmacy:AF Pharmacy Test", "Info. for patient:AF Patient Test"],
      "",
      "Not issued",
      "",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Fortisip 2kcal liquid (Flavour Not Specified) " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Fortisip 2kcal liquid (Flavour Not Specified)", "12 x 200 ml", randomGuid, "Acute issue"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Fortisip 2kcal liquid (Flavour Not Specified) " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Assorted flavours", "Fortisip 2kcal liquid (Flavour Not Specified)", "12 x 200 ml", randomGuid, "Info. for pharmacy:AF Pharmacy Test", "Info. for patient:AF Patient Test"],
      "",
      await commonActions.getTodayDate(),
      "",
      "Print (Stored)");
  });

  test("add and issue repeat STI use (FS) drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addStiUseFSRepeatMedication("Salmeterol 25micrograms", randomGuid, "9", "9", "50", "STI Pharmacy Test", "STI Patient Test", await commonActions.getFutureDate());
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Salmeterol 25micrograms/dose inhaler CFC free " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["FS", "Salmeterol 25micrograms/dose inhaler CFC free", "9 x 120 dose", randomGuid, "Info. for pharmacy:STI Pharmacy Test", "Info. for patient:STI Patient Test"],
      await commonActions.getFutureDate(),
      "Not issued",
      "0 of 50",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Salmeterol 25micrograms/dose inhaler CFC free " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Salmeterol 25micrograms/dose inhaler CFC free", "9 x 120 dose", randomGuid, "Repeat issue 1 of 50"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Salmeterol 25micrograms/dose inhaler CFC free " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["FS", "Salmeterol 25micrograms/dose inhaler CFC free", "9 x 120 dose", randomGuid, "Info. for pharmacy:STI Pharmacy Test", "Info. for patient:STI Patient Test"],
      await commonActions.getFutureDate(),
      await commonActions.getTodayDate(),
      "1 of 50",
      "Print (Stored)");
  });

  test("add and issue repeat dispensing variable use drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addVURepeatDispensingMedication("Cotton crepe bandage BP 1988 10cm x 4.5m", randomGuid, "9", "9", "5", "VU Pharmacy Test", "VU Patient Test", await commonActions.getFutureDate());
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Cotton crepe bandage BP 1988 10cm x 4.5m " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Variable use", "Cotton crepe bandage BP 1988 10cm x 4.5m", "9 bandage", randomGuid, "Info. for pharmacy:VU Pharmacy Test", "Info. for patient:VU Patient Test"],
      await commonActions.getFutureDate(),
      "Not issued",
      "0 of 5",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Cotton crepe bandage BP 1988 10cm x 4.5m " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Cotton crepe bandage BP 1988 10cm x 4.5m", "9 bandage", randomGuid, "Repeat dispensing (5 issues)"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Cotton crepe bandage BP 1988 10cm x 4.5m " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Variable use", "Cotton crepe bandage BP 1988 10cm x 4.5m", "9 bandage", randomGuid, "Info. for pharmacy:VU Pharmacy Test", "Info. for patient:VU Patient Test"],
      await commonActions.getFutureDate(),
      await commonActions.getTodayDate(),
      "1 of 5",
      "Print (Stored)");
  });

  test("add and issue CD 2 drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Diamorphine 10mg tablets", randomGuid, "9", "150", "CD2 Pharmacy Text", "CD2 Patient Text");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Diamorphine 10mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["CD", "Diamorphine 10mg tablets", "9 tablet", randomGuid, "Info. for pharmacy:CD2 Pharmacy Text", "Info. for patient:CD2 Patient Text"],
      "",
      "Not issued",
      "",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Diamorphine 10mg tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["CD", "Diamorphine 10mg tablets", "Nine (9) tablet", randomGuid, "Acute issue"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Diamorphine 10mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["CD", "Diamorphine 10mg tablets", "9 tablet", randomGuid, "Info. for pharmacy:CD2 Pharmacy Text", "Info. for patient:CD2 Patient Text"],
      "",
      await commonActions.getTodayDate(),
      "",
      "Print (Stored)");
  });

  test("add and issue CD 3 drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Temazepam 20mg tablets", randomGuid, "12312", "15", "5", "CD3 Pharmacy Text", "CD3 Patient Text");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Temazepam 20mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["CD", "Temazepam 20mg tablets", "12312 tablet", randomGuid, "Info. for pharmacy:CD3 Pharmacy Text", "Info. for patient:CD3 Patient Text"],
      "",
      "Not issued",
      "0 of 5",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Temazepam 20mg tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["CD", "Temazepam 20mg tablets", "Twelve thousand three hundred and twelve (12312) tablet", randomGuid, "Repeat issue 1 of 5"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Temazepam 20mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["CD", "Temazepam 20mg tablets", "12312 tablet", randomGuid, "Info. for pharmacy:CD3 Pharmacy Text", "Info. for patient:CD3 Patient Text"],
      "",
      await commonActions.getTodayDate(),
      "1 of 5",
      "Print (Stored)");
  });

  test("add and issue CD 4 drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Nitrazepam 5mg tablets", randomGuid, "1", "20", "8", "CD4 Pharmacy Text", "CD4 Patient Text", await commonActions.getFutureDate());
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Nitrazepam 5mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["CD", "Nitrazepam 5mg tablets", "1 tablet", randomGuid, "Info. for pharmacy:CD4 Pharmacy Text", "Info. for patient:CD4 Patient Text"],
      await commonActions.getFutureDate(),
      "Not issued",
      "0 of 8",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Nitrazepam 5mg tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["CD", "Nitrazepam 5mg tablets", "1 tablet", randomGuid, "Repeat dispensing (8 issues)"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Nitrazepam 5mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["CD", "Nitrazepam 5mg tablets", "1 tablet", randomGuid, "Info. for pharmacy:CD4 Pharmacy Text", "Info. for patient:CD4 Patient Text"],
      await commonActions.getFutureDate(),
      await commonActions.getTodayDate(),
      "1 of 8",
      "Print (Stored)");
  });

  test("add and issue HRT drug", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Estradiol 50micrograms", randomGuid, "12312", "15", "5", "Pharmacy Text", "Patient Text");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.searchCurrentMedication("Estradiol 50micrograms " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["HRT", "Estradiol 50micrograms", "12312 patch", randomGuid, "Info. for pharmacy:Pharmacy Text", "Info. for patient:Patient Text"],
      "",
      "Not issued",
      "0 of 5",
      "");
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Estradiol 50micrograms " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["HRT", "Estradiol 50micrograms", "12312 patch", randomGuid, "Repeat issue 1 of 5"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Estradiol 50micrograms " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["HRT", "Estradiol 50micrograms", "12312 patch", randomGuid, "Info. for pharmacy:Pharmacy Text", "Info. for patient:Patient Text"],
      "",
      await commonActions.getTodayDate(),
      "1 of 5",
      "Print (Stored)");
  });

  test("add an acute drug and issue it multiple times", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Aspirin 75mg tablets", "20 tablet", randomGuid, "Acute issue"]);
    await issueMedicationPanelActions.applyPostdate(await commonActions.getFutureDate());
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Aspirin 75mg tablets", "20 tablet", randomGuid],
      "",
      await commonActions.getFutureDate(),
      "",
      "Print (Stored)");
  });

  test("add a repeat drug and issue it multiple times", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatMedication("Hydroxycarbamide 100mg tablets", randomGuid, "12312", "15", "5", "High warning and Issue repeat multiple times", "Patient Text");
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Hydroxycarbamide 100mg tablets " + randomGuid);
    await issueMedicationPanelActions.verifyFirstDrugDetailsInIssuePanel(
      ["Hydroxycarbamide 100mg tablets", "12312 tablet", randomGuid, "Repeat issue 2 of 5"]);
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Hydroxycarbamide 100mg tablets " + randomGuid);
    await medicationHomeActions.validateCurrentMedicationFirstRowAtXlargeView(
      ["Hydroxycarbamide 100mg tablets", "12312 tablet", randomGuid, "Info. for pharmacy:High warning and Issue repeat multiple times", "Info. for patient:Patient Text"],
      "",
      await commonActions.getTodayDate(),
      "2 of 5",
      "Print (Stored)");
  });

  test("add a repeat dispensing drug and can't able to re-issue it multiple times", { tag: ["@regression", "@stg"] }, async ({ commonActions, medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addRepeatDispensingMedication("Liquid paraffin light 70% gel", randomGuid, "1", "20", "8", "", "", await commonActions.getFutureDate());
    await issueMedicationPanelActions.issueMedication();
    await medicationHomeActions.clickMedsRefreshButton();
    await medicationHomeActions.searchCurrentMedication("Liquid paraffin light 70% gel " + randomGuid);
    await medicationHomeActions.clickThreeDotsMenu();
    await medicationHomeActions.mousehoverAddToPrescription();
    await commonActions.verifyTootltipText("Can't add to prescription as this medication has already been issued. Go to EMIS Web to re-authorise.")
  });

});