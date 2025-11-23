
import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("View medication screen", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });

    test("Validate Detail Panel for current and past medications in view medications screen", { tag: ["@regression"] }, async ({ medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets " + randomGuid);
        await medicationHomeActions.verifyMedicationUnderline("Aspirin 75mg tablets", false);
        await medicationHomeActions.hoverOnMedication("Aspirin 75mg tablets");
        await medicationHomeActions.verifyMedicationUnderline("Aspirin 75mg tablets", true);
        await medicationHomeActions.clickFirstMedicationButtonByPrefix("Aspirin 75mg tablets");
        await medicationHomeActions.verifyMedicationUnderline("Aspirin 75mg tablets", true);
        const dateValue = await medicationHomeActions.getFormattedDate();
        await medicationHomeActions.validateMedicationDetailsPanel({
            medicationName: "Aspirin 75mg tablets ",
            authorisingClinicianValue: 'TESTER, Faraday (Dr)',
            dateOfAuthorisationValue: dateValue,
            signingClinicianValue: 'TESTER, Faraday (Dr)'
        });
        await medicationHomeActions.validateDetailsPanelCloseScenario();
        await medicationHomeActions.validateMedicationDetailsInCurrentTab();
        await medicationHomeActions.validateMedicationDetailsInPastTab(addMedicationPanelActions, issueMedicationPanelActions, randomGuid);
    });

    test("Validate Detail Panel for current and past medications in different screen size", { tag: ["@regression"] }, async ({ medicationHomeActions, issueMedicationPanelActions, addMedicationPanelActions }) => {
        const screenSizes = [
            { width: 1600, height: 1100 },
            { width: 800, height: 720 },
            { width: 575, height: 720 }
        ];
        let randomGuid = generateRandomGuid();
        await medicationHomeActions.verifyMedicationDetailsPanelInCurrentAndPastTabsAtScreenSizes(
            addMedicationPanelActions,
            issueMedicationPanelActions,
            randomGuid,
            screenSizes
        );
    });
})