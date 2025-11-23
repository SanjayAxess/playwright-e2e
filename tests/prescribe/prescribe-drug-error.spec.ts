import { beforeEachMedication, generateRandomGuid} from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("prescribe drug error flows", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });

  test("user can't able to add drug if add drug api fails",{ tag: ["@regression","@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyAddDrugError(400);
    await addMedicationPanelActions.verifyAddDrugError(404);
    await addMedicationPanelActions.verifyAddDrugError(401);
    await addMedicationPanelActions.verifyAddDrugError(500);
    await addMedicationPanelActions.verifyAddDrugError(503);
    await addMedicationPanelActions.verifyAddDrugError(504);
    await addMedicationPanelActions.verifyAddDrugBlockError();
  })
  
  test("user can't able to issue drug if issue drug api fails",{ tag: ["@regression","@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "99", "65");
    await medicationHomeActions.clickMedsRefreshButton();
    await addMedicationPanelActions.clickCloseButton();
    await medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
    await issueMedicationPanelActions.verifyIssueDrugError(400);
    await issueMedicationPanelActions.verifyIssueDrugError(404);
    await issueMedicationPanelActions.verifyIssueDrugError(401);
    await issueMedicationPanelActions.verifyIssueDrugError(500);
    await issueMedicationPanelActions.verifyIssueDrugError(503);
    await issueMedicationPanelActions.verifyIssueDrugError(504);
    await issueMedicationPanelActions.verifyIssueDrugBlockError();
  })
  
  test("user can't able to add drug if clinical warnings api fails",{ tag: ["@regression","@stg"] }, async ({ addMedicationPanelActions }) => {
    //await addMedicationPanelActions.verifyClinicalWarningError(400);
    //await addMedicationPanelActions.verifyClinicalWarningError(404);
    //await addMedicationPanelActions.verifyClinicalWarningError(401);
    //await addMedicationPanelActions.verifyClinicalWarningError(500);
    //await addMedicationPanelActions.verifyClinicalWarningError(503);
    //await addMedicationPanelActions.verifyClinicalWarningError(504);
    await addMedicationPanelActions.verifyClinicalWarningBlockError();
  })

  test("user can't able to issue drug if both clinical warnings api and eps check api fails",{ tag: ["@regression","@stg"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "99", "65");
    await addMedicationPanelActions.clickCloseButton(); 
    await issueMedicationPanelActions.verifyBothClinicalWarningErrorAndEPSCheckError(404, randomGuid);
    await issueMedicationPanelActions.verifyBothClinicalWarningErrorAndEPSCheckError(400, randomGuid);
    await issueMedicationPanelActions.verifyBothClinicalWarningErrorAndEPSCheckError(401, randomGuid);
    await issueMedicationPanelActions.verifyBothClinicalWarningErrorAndEPSCheckError(500, randomGuid);
    await issueMedicationPanelActions.verifyBothClinicalWarningErrorAndEPSCheckError(503, randomGuid);
    await issueMedicationPanelActions.verifyBothClinicalWarningErrorAndEPSCheckError(504, randomGuid);
    await issueMedicationPanelActions.verifyBothClinicalWarningBlockErrorAndEPSCheckBlockError(randomGuid);
  })

  test("user can't able to issue drug if clinical warnings api fails",{ tag: ["@regression","@stg"] }, async ({medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions}) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "99", "65");
    await addMedicationPanelActions.clickCloseButton(); 
    await issueMedicationPanelActions.verifyClinicalWarningErrorinIssueTab(404, randomGuid);
    await issueMedicationPanelActions.verifyClinicalWarningErrorinIssueTab(400, randomGuid);
    await issueMedicationPanelActions.verifyClinicalWarningErrorinIssueTab(401, randomGuid);
    await issueMedicationPanelActions.verifyClinicalWarningErrorinIssueTab(500, randomGuid);
    await issueMedicationPanelActions.verifyClinicalWarningErrorinIssueTab(503, randomGuid);
    await issueMedicationPanelActions.verifyClinicalWarningErrorinIssueTab(504, randomGuid);
    await issueMedicationPanelActions.verifyClinicalWarningBlockErrorinIssueTab(randomGuid);
  })

  test("user can't able to issue drug if eps check api fails",{ tag: ["@regression","@stg"] }, async ({medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions}) => {
    await medicationHomeActions.clickPrescribeButton();
    await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg dispersible tablets", randomGuid, "99", "65");
    await addMedicationPanelActions.clickCloseButton(); 
    await issueMedicationPanelActions.verifyEpsCheckErrorinIssueTab(404, randomGuid);
    await issueMedicationPanelActions.verifyEpsCheckErrorinIssueTab(400, randomGuid);
    await issueMedicationPanelActions.verifyEpsCheckErrorinIssueTab(401, randomGuid);
    await issueMedicationPanelActions.verifyEpsCheckErrorinIssueTab(500, randomGuid);
    await issueMedicationPanelActions.verifyEpsCheckErrorinIssueTab(503, randomGuid);
    await issueMedicationPanelActions.verifyEpsCheckErrorinIssueTab(504, randomGuid);
    await issueMedicationPanelActions.verifyEpsCheckBlockErrorinIssueTab(randomGuid);
  })

});