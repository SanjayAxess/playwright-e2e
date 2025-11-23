import { beforeEachMedication, generateRandomGuid} from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("acute medication", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });

  test("add and issue acute sls drug",{ tag: ["@regression","@stg"] }, async ({ medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", randomGuid, "99999", "65535", "Pharmacy Test", "Patient Test");
    await issueMedicationPanelActions.issueMedication();
  });

});