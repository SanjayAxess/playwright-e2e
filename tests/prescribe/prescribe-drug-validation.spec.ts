import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("add drug fields validation in prescribe panel", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });
  test.beforeEach(async () => {
    await feature(
      "Prescription Information",
      "EMISXGP-641",
      "https://emisgroup.aha.io/features/EMISXGP-641"
    );
  });
  //[#US377756 #US378016 #US378013 #US377818]
  test("verifying medication field in the add drug tab of prescribe panel[Faraday08-clinical-safety-Partial-Search][Faraday07-clinical-safety-Medication-Details][Faraday08-clinical-safety-Infinite-Scrollbar]", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyMedicationFieldInPrescribeAddTab();
    await addMedicationPanelActions.verifyAllPrecribeFieldsAreClearedByDeletingMedicationUsingXButton();
    await addMedicationPanelActions.verifyRedErrorMessageClearedIfClearTheMedicationField();
  })

  //[#US380818 #US417776]
  test("verifying non-NHS[prescribed privately] items are removed from the dropdown list in prescribe medication", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyNonNHSItemsAreRemovedFromDropdown();
  })

  //[#US427663 #US435858]
  test("verifying medication field Edit icon in prescribe new medication panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateMedicationFieldEditIcon();
  })

  //[#US371565]
  test("verifying dosage field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyDosageFieldInPrescribeAddTab();
  })

  //[#US427663 #US435858]
  test("verifying dosage field Edit icon in prescribe new medication panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateDosageFieldEditIcon();
  })

  //[#US371566 #US364573]
  test("verifying quantity field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyQuantityFieldInPrescribeAddTab();
  })

  //[#US373168]
  test("verifying duration field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyDurationFieldInPrescribeAddTab();
    await addMedicationPanelActions.verifyMaxQuantityWarningErrorMessage();
  })

  //[#US371568 #US371587]
  test("verifying prescription type field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyPrescriptionTypeFieldInPrescribeAddTab();
  })

  //[#US371582 #US389865]
  test("verifying no. of authorised issues field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyNoOfAuthorisedIssuesFieldInPrescribeAddTab();
  })

  //[#US432918 #US432917 #US432916 #US432919 #US432920 #US371591]
  test("verifying prescription options field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifySLSCheckboxInPrescribeAddTab();
    await addMedicationPanelActions.verifyContraceptiveCheckboxInPrescribeAddTab();
    await addMedicationPanelActions.verifyPersonallyAdministeredOptionInPrescribePanel();
    await addMedicationPanelActions.verifyVariableUseCheckboxInPrescribeAddTab();
    await addMedicationPanelActions.verifySTIUseFSCheckboxInPrescribeAddTab();
    await addMedicationPanelActions.verifyAssortedFlavourCheckboxInPrescribeAddTab();
  })

  //[#US374743]
  test("verifying authorising clinician field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyAuthorisingClinicianInPrescribePanel();
  })

  //[#US371573]
  test("verifying information for pharmacy field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateInformationForPharmacyField();
  })

  //[#US371574]
  test("verifying information for patient field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateInformationForPatientField();
  })

  //[#US371569]
  test("verifying review date field in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateReviewDateField();
  })

  //[#US434055]
  test("verifying add & add another button in the add drug tab of prescribe panel", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateAddAndAddAnotherButton();
  })

  //[#US434053]
  test("verifying added values are retained in the Add tab if switches to Issue, then switches back to Add tab", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateSwitchToAddTabFromIssueTab();
  })

  //[#US385190 #US385191 #US385192 #US434511 #US385193 #US418229 #US385194 #US385195 #US385196 #US385197]
  test("verifying error banner after clicking Add button without medication data", { tag: ["@regression", "@stg", "@1pr_check"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyMedicationFieldErrorMessage();
    await addMedicationPanelActions.verifyDosageFieldErrorMessage();
    await addMedicationPanelActions.verifyQuantityFieldErrorMessage();
    await addMedicationPanelActions.verifyDurationFieldErrorMessage();
    await addMedicationPanelActions.VerifyAuthorisingClinicianFieldErrorBanner();
    await addMedicationPanelActions.verifyErrorMessageWithoutEnteringAllMandatoryFields();
    await addMedicationPanelActions.VerifyErrorBannerAndWarningForRDOver365Days();
    await addMedicationPanelActions.VerifyInformationForPharmacyFieldErrorBanner();
    await addMedicationPanelActions.VerifyInformationForPatientFieldErrorBanner();
    await addMedicationPanelActions.verifyReviewDateFieldErrorMessage();
  })

  //[#US391175 #US391176 #US391183 #US391178 #US391248(2) #US391184]
  test("Verifying discard dialog panel in add tab while prescribing medication", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyPrescribeDiscardDialogWhenClickingOnXbuttonWithOnlyMedicationFieldPopulated();
    await addMedicationPanelActions.verifyPrescribeDiscardDialogWhenClickingOnXbuttonWithAllFieldsPopulatedExceptMedicationField();
    await addMedicationPanelActions.verifyClickingOnCancelbuttonInDiscardDialogReturnsToPrescribeMedicationPanelWithPreviouslyFilledInData();
    await addMedicationPanelActions.verifyPrescribePanelClosedIfClickingOnXButtonWithNoDrugInfoAdded();
    await addMedicationPanelActions.verifyClickingOnDiscardButtonInDiscardDialogClosesPrescribeDialogAndPanel();
    await addMedicationPanelActions.verifyClickingOnXbuttonInDiscardDialogReturnsToPrescribeMedicationPanelWithPreviouslyFilledInData();
  })

  test("verify controlled drug status text in the clinical warnings dialog", { tag: ["@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyCD2Text("Morphine 10mg tablets");
    await addMedicationPanelActions.verifyCD3Text("Temazepam 10mg tablets");
    await addMedicationPanelActions.verifyCD4Text1("Danazol 50mg capsules");
    await addMedicationPanelActions.verifyCD4Text2("Nitrazepam 5mg tablets");
    await addMedicationPanelActions.verifyCD5Text("Codeine 15mg tablets");
    await addMedicationPanelActions.verifyNoTextForNonCDDrugs("Aluminium hydroxide 500mg chewable tablets");
  });

  test("verify LHS-RHS warning Badges in medication list of add prescribe panel ", { tag: ["@US384940", "@US384939", "@US384941", "@regression", "@stg"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.verifyLHSAndRHSWarningBadgesInMedicationField();
  });

  test("verify show pack details in the prescribe panel ", { tag: ["@regression", "@stg", "@pr_check"] }, async ({ addMedicationPanelActions }) => {
    await addMedicationPanelActions.validateShowPackDetailsCheckboxAndPackDetailsForEachDrug();
    await addMedicationPanelActions.validateTooltipForPackDetailsInMedicationDropdown();
  });
});

test.describe("issue drug fields validation in prescribe panel", () => {
  test.beforeEach(beforeEach);
  test.beforeEach(beforeEachMedication);
  let randomGuid: string;
  test.beforeEach(() => {
    randomGuid = generateRandomGuid();
  });

  //[#US385183, #US385283, #US385208, #US385285, #US387246]
  test("verifying discard dialog in issue tab", { tag: ["@US394153", "@regression", "@stg"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions }) => {
    await issueMedicationPanelActions.verifyDiscardDialoginIssuePanelIfPostdateIsApplied();
    await addMedicationPanelActions.clickPrescribeDiscardButton();
    await issueMedicationPanelActions.verifyDiscardDialoginIssuePanelIfPostdateIsNotApplied();
    await addMedicationPanelActions.clickDiscardDialogXButton();
    await issueMedicationPanelActions.clickIssueLaterButton();
    await issueMedicationPanelActions.verifyClickingXbuttonInDiscardDialogReturnsToIssueScreen();
    await addMedicationPanelActions.clickDiscardDialogCancelButton();
    await issueMedicationPanelActions.clickIssueTab();
    await addMedicationPanelActions.verifyDiscardDialogIsNotVisible();
    await issueMedicationPanelActions.clickIssueLaterButton();
    await addMedicationPanelActions.clickPrescribeDiscardButton();
    await issueMedicationPanelActions.verifyDiscardDialogNotShownIfItsRepeatOrRepeatDispensingPrescType();
    await issueMedicationPanelActions.verifyDiscardDialogInIssuePanelThroughAddToPrescription();
  });

  //[ #US384842, #US384841 #US384482, #US384434, #US384509]
  test("validating issue Method dropdown values and remove medication field in the Issue tab", { tag: ["@regression", "@stg"] }, async ({ issueMedicationPanelActions }) => {
    await issueMedicationPanelActions.verifyIssueMethodHeaderAndDropdownValues();
    await issueMedicationPanelActions.verifyAbleToRemoveMedicationFromIssueListWhereIssueMethodIsNHSPrinted();
  });

  //[ #US391337, #US391336, #US434355] 
  test("validating postdate field in the Issue tab", { tag: ["@regression", "@stg"] }, async ({ issueMedicationPanelActions }) => {
    await issueMedicationPanelActions.verifyPostdateIsDisabledAndTooltipIsShownForRepeatDispensing();
    await issueMedicationPanelActions.verifyPostdateIsDisabledAndTooltipIsShownForRepeatMedication();
    await issueMedicationPanelActions.verifyPostdateIsEnabledAndAbleToAddCurrentAndFutureDateForAcute();
    await issueMedicationPanelActions.verifyPostdateIsNotSavedIfClickOnCancelButton();
    await issueMedicationPanelActions.verifyErrorIfPostdateEnteredAsInvalid();
    await issueMedicationPanelActions.verifyAbleToApplyPostdateIfAllTheAddedMedicationsAreAcuteInTheIssueList();
    await issueMedicationPanelActions.verifyPostdateIsDisabledAndShownTooltipIfRepeatMedicationAddedInTheIssueList();
    await issueMedicationPanelActions.verifyPostdateIsDisabledAndShownTooltipIfRepeatDispensingMedicationAddedInTheIssueList();
  });

  test("validating degraded drug allergies Error banner in the Issue tab", { tag: ["@regression", "@stg"] }, async ({ issueMedicationPanelActions }) => {
    await issueMedicationPanelActions.verifyMigrationsDegradedAllergyErrorBanner();
    await issueMedicationPanelActions.verifyGP2GPAndMigrationsDegradedAllergyErrorBanner();
    await issueMedicationPanelActions.verifyGP2GPDegradedAllergyErrorBanner();
    await issueMedicationPanelActions.verifyAllergyApiFailureBannerAndRecovery();
    await issueMedicationPanelActions.verifyAllergyApiFailureBannerAndRecoveryForNonDegradedAllergyPatient();
    await issueMedicationPanelActions.verifyDegradedAllergyApiFailureBannerNotShownForLessThan100Allergies();
  });

  test("validating EPS banner and Reissue warning in the issue screen", { tag: ["@regression", "@stg"] }, async ({ issueMedicationPanelActions }) => {
    await issueMedicationPanelActions.verifyEPSTroubleshootingGuideLinkRedirects();
    await issueMedicationPanelActions.verifyReissueWarning();
  });

});