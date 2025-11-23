import { beforeEachMedication, beforeEachEPSMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("error flows while prescribing drug as EPS with mock", () => {
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

  test("EPS issue failure - when user is unauthorised to issue the eps drug", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Unauthorised_User();
  });

  test("EPS issue failure - when EPS 2nd set of checks fails while issuing medication", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Failure_In_Second_Set_Of_EPS_Check();
  });

  test("EPS issue failure - when medication is errored in prepare API due to network disconnection", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Prepare_Network_Block();
  });

  test("EPS issue failure - when medication is errored in signature request API due to network disconnection", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Signature_Request_Network_Block();
  });

  test("EPS issue failure - when medication is errored in signature response API due to network disconnection", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Signature_Response_Network_Block();
  });

  test("EPS issue failure - when medication is errored in prescription API due to network disconnection", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Prescription_Network_Block();
  });
});

test.describe("error flows while prescribing multiple drugs as EPS with mock", () => {
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

  test("EPS issue failure when all medications are errored in prepare API as retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prepare_503_Mock();
  });

  test("EPS issue failure when all medications are errored in prepare API as non-retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prepare_400_Mock();
  });

  test("EPS issue failure when all medications are errored in prepare API(internal NHS api failure as retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prepare_Internal_NHS_503_Mock();
  });

  test("EPS issue failure when all medications are errored in prepare API(internal NHS api failure as non-retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prepare_Internal_NHS_400_Mock();
  });

  test("EPS issue failure when partial medications are errored in prepare API(some internal NHS api failure as retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Partial_Prepare_Internal_NHS_503_Mock();
  });

  test("EPS issue failure when partial medications are errored in prepare API(some internal NHS api failure as non-retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Partial_Prepare_Internal_NHS_400_Mock();
  });

  test("EPS issue failure when all medications are errored in signature-request API as retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Signature_Request_503_Mock();
  });

  test("EPS issue failure when all medications are errored in signature-request API as non-retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Signature_Request_400_Mock();
  });

  test("EPS issue failure when all medications are errored in signature-response API as retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Signature_Response_503_Mock();
  });

  test("EPS issue failure when all medications are errored in signature-response API as non-retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Signature_Response_400_Mock();
  });

  test("EPS issue failure when all medications are errored in prescription API as retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prescriptions_503_Mock();
  });

  test("EPS issue failure when all medications are errored in prescription API as non-retriable error", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prescriptions_400_Mock();
  });

  test("EPS issue failure when all medications are errored in prescription API(internal NHS api failure as retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prescriptions_Internal_NHS_503_Mock();
  });

  test("EPS issue failure when all medications are errored in prescription API(internal NHS api failure as non-retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_All_Prescriptions_Internal_NHS_400_Mock();
  });

  test("EPS issue failure when partial medications are errored in prescription API(some internal NHS api failure as retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Partial_Prescriptions_Internal_NHS_503_Mock();
  });

  test("EPS issue failure when partial medications are errored in prescription API(some internal NHS api failure as non-retriable error)", { tag: ["@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issue_EPS_Medication_With_Partial_Prescriptions_Internal_NHS_400_Mock();
  });

});