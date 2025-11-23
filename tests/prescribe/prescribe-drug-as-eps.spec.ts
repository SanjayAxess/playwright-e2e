import { beforeEachMedication, beforeEachEPSMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("prescribe drug as EPS with CIS2 Token", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachEPSMedication);
  let randomGuid: string;
  test.beforeEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("signature-token", process.env.MOCK_SIGNATURE_TOKEN);
  });
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "[4] Send Signed EPS Prescription UI + E2E Testing",
      "EMISXGP-792",
      "https://emisgroup.aha.io/features/EMISXGP-792"
    );
  });
  test.afterEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("signature-token", "");
  });

  test("Prescribe Acute drug through EPS to Any Pharmacy", { tag: ["@CIS2"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_SigningToken();
  });
});

test.describe("prescribe multiple drugs as EPS with CIS2 Token", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachEPSMedication);
  let randomGuid: string;
  test.beforeEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("signature-token", process.env.MOCK_SIGNATURE_TOKEN);
  });
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "[4] Send Signed EPS Prescription UI + E2E Testing",
      "EMISXGP-792",
      "https://emisgroup.aha.io/features/EMISXGP-792"
    );
  });
  test.afterEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("signature-token", "");
  });

  test("Prescribe multiple drugs through EPS to Any Pharmacy", { tag: ["@CIS2"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "9", "6", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_SigningToken();
  });
});

test.describe("prescribe drug as EPS with Mock", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("mock-eps", "true");
  });
  test.beforeEach(async () => {
    await feature(
      "[4] Send Signed EPS Prescription UI + E2E Testing",
      "EMISXGP-792",
      "https://emisgroup.aha.io/features/EMISXGP-792"
    );
  });
  test.afterEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("mock-eps", "false");
    await commonActions.unMockUrl();
  });

  test("Prescribe drug through EPS as Any Pharmacy with mock", { tag: ["@regression"] }, async ({ commonActions, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    // Mocked drug in the response of each api's in below method
    await issueMedicationPanelActions.issue_EPS_Single_Medication_With_All_200_Mocks();
  });

  test("Prescribe drug through EPS as Primary Nomination with mock", { tag: ["@regression"] }, async ({ commonActions, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await commonActions.setLocalStorage("mock-primary-nomination", "true");
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    // Mocked drug in the response of each api's in below method
    await issueMedicationPanelActions.issue_EPS_Single_Medication_With_All_200_Mocks();
    await commonActions.setLocalStorage("mock-primary-nomination", "false");
  });

  test("Prescribe drug through EPS as EPS Appliance Nomination with mock", { tag: ["@regression"] }, async ({ commonActions, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await commonActions.setLocalStorage("mock-appliance-nomination", "true");
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    // Mocked drug in the response of each api's in below method
    await issueMedicationPanelActions.issue_EPS_Single_Medication_With_All_200_Mocks();
    await commonActions.setLocalStorage("mock-appliance-nomination", "false");
  });

  //Bug fix needed
  // test("View eps primary nomination address details in tooltip by tabbing three dots",{ tag: ["@regression","@stg"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions}) => {
  //   await medicationHomeActions.clickPrescribeButton();    
  //   await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "1", "2"); 
  //   await issueMedicationPanelActions.verifyPharmacyAddressTooltipUsingTab("LLOYDSPHARMACY (FND21)");
  // });

  // test("View eps primary nomination address details in tooltip by mousehover",{ tag: ["@regression","@stg"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions}) => {
  //   await medicationHomeActions.clickPrescribeButton();    
  //   await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "1", "2");
  //   await issueMedicationPanelActions.verifyPharmacyAddressTooltipbyMouseHovering("LLOYDSPHARMACY (FND21)");
  // });
});

test.describe("prescribe multiple drugs as EPS with mock", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("mock-eps", "true");
  });
  test.beforeEach(async () => {
    await feature(
      "[4] Send Signed EPS Prescription UI + E2E Testing",
      "EMISXGP-792",
      "https://emisgroup.aha.io/features/EMISXGP-792"
    );
  });
  test.afterEach(async ({ commonActions }) => {
    await commonActions.setLocalStorage("mock-eps", "false");
    await commonActions.unMockUrl();
  });

  test("Issue multiple medications through EPS with mock", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    // Mocked multiple drugs in the response of each api's in below method
    await issueMedicationPanelActions.issue_EPS_Multiple_Medication_With_All_200_Mocks();
  });
});