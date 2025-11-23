import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("Request Issue Medication", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });

    test.afterEach(async ({ commonActions }) => {
        await commonActions.unMockUrl();
        await commonActions.unBlockAllUrls();
    });

    test("Verify User able to request issue for acute drug", { tag: ["@regression", "@dev", "@1pr_check"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await requestIssueActions.validatePendingIconForCurrentRequestedMedication("Prescription requested");
    });

    test("Verify whether the warning is displayed while adding the drug as printed prescription in EMIS-X[[Lovelace20]]", { tag: ["@regression", "@US414840", "@US481134", "@pr_check"] }, async ({ medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.clickIssueMedicationTab();
        await issueMedicationPanelActions.verifyPrintedMedicationWarningText();
    });

    test("Verify whether the 'Pending' icon and respective tooltip texts are displayed properly for current requested medication", { tag: ["@regression", "@US372122", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Paracetamol 120mg/5ml oral suspension paediatric");
        await requestIssueActions.validatePendingIconForCurrentRequestedMedication("Prescription requested Requested on: 30-Apr-2024 02:24pm");
    });

    test("Verify the 'Pending' icon is displayed for past medication after using mock", { tag: ["@regression", "@US372122", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, page }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Paracetamol 120mg/5ml oral suspension paediatric");
        await requestIssueActions.validatePendingIconForPastMedication("Prescription requested Requested on: 30-Apr-2024 02:24pm");
    });

    test("Verify the 'Rejected' icon and tooltip for current medication after using mock", { tag: ["@regression", "@US372122", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets");
        await requestIssueActions.validateRejectedIconForCurrentMedication("Prescription request rejected Requested on: 30-Apr-2024 02:11pm");
    });

    test("Verify the 'Rejected' icon and tooltip for past medication after using mock", { tag: ["@regression", "@US372122", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Aspirin 75mg tablets");
        await requestIssueActions.validateRejectedIconForPastMedication("Prescription request rejected Requested on: 30-Apr-2024 02:11pm");
    });

    test("Verify whether the Request issue option is disabled for current medication already requested", { tag: ["@regression", "@US372122", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Paracetamol 120mg/5ml oral suspension paediatric");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.hoverCurrentMedsRequestIssue();
        await requestIssueActions.expectCurrentRequestIssueOptionDisabled();
    });

    test("Verify whether the 'Request issue' option is enabled for current rejected drug", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.hoverCurrentMedsRequestIssue();
        await requestIssueActions.expectCurrentRequestIssueOptionEnabled();
    });

    test("Verify whether the 'Request issue' option is enabled for past rejected drug", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickPastMoreOptionsButton();
        await requestIssueActions.hoverPastMedsRequestIssue();
        await requestIssueActions.expectPastRequestIssueOptionEnabled();
    });

    test("Verify whether the 'Request issue' option is enabled for current issued drug", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.hoverCurrentMedsRequestIssue();
        await requestIssueActions.expectCurrentRequestIssueOptionEnabled();
    });

    test("Verify whether the 'Request issue' option is disabled when request issue panel is opened", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelOpened();
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.expectCurrentRequestIssueOptionDisabled();
    });

    test("Verify whether the high priority check box is selected when clicking on 'High priority' label", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await requestIssueActions.expectHighPriorityCheckboxUnchecked();
        await requestIssueActions.clickHighPriorityCheckbox();
        await requestIssueActions.expectHighPriorityCheckboxChecked();
        await requestIssueActions.clickHighPriorityCheckbox();
        await requestIssueActions.expectHighPriorityCheckboxUnchecked();
    });

    test("Verify discard error message is displayed on clicking X button in request issue details panel", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.expectMedsDiscardWarningText();
    });

    test("Verify discard error message is displayed on clicking Cancel button in request issue details panel", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await requestIssueActions.clickRequestIssueCancelButton();
        await medicationHomeActions.expectMedsDiscardWarningText();
    });

    test("Verify request issue details panel remains open when closing discard error banner by clicking X button", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.expectMedsDiscardWarningText();
        await requestIssueActions.clickRequestIssueDialogHeaderCloseButton();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await requestIssueActions.expectRequestIssuePanelOpened();
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.expectMedsDiscardWarningText();
        await requestIssueActions.clickRequestIssueWarningCancelButton();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await requestIssueActions.expectRequestIssuePanelOpened();
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.expectMedsDiscardWarningText();
        await requestIssueActions.clickRequestIssueWarningDiscardButton();
        await requestIssueActions.expectRequestIssuePanelClosed();
    });

    test("Verify user able to select user from the user picker on first click in current medication screen", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelOpened();
        await requestIssueActions.validateSendRequestToInputFieldForCurrentMedication();
    });

    test("Verify user able to select user from the user picker on first click in past medication screen", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickPastMoreOptionsButton();
        await requestIssueActions.clickPastMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelOpened();
        await requestIssueActions.validateSendRequestToInputFieldForPastMedication();
    });

    test("Verify error message is displayed while request issue without selecting a clinician in current medication", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await requestIssueActions.selectAnAuthorisingClinicianErrorInCurrentMedication();
    });

    test("Verify error message is displayed while request issue without selecting a clinician in past medication", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickPastMoreOptionsButton();
        await requestIssueActions.clickPastMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelMedicationNameIs("Aspirin 75mg tablets");
        await requestIssueActions.selectAnAuthorisingClinicianErrorInPastMedication();
    });

    test("Verify error message is displayed for clinician without prescribing rights in current medication", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelOpened();
        await requestIssueActions.selectClinicianWithoutPrescribingRightsAndRequestIssue();
        await requestIssueActions.expectCouldntRequestIssueErrorVisible();
        await requestIssueActions.expectClinicianNotAuthorisedErrorAndValidationBanner();
    });

    test("Verify error message is displayed for clinician without prescribing rights in past medication", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickPastMoreOptionsButton();
        await requestIssueActions.clickPastMedsRequestIssue();
        await requestIssueActions.expectRequestIssuePanelOpened();
        await requestIssueActions.selectClinicianWithoutPrescribingRightsAndRequestIssue();
        await requestIssueActions.expectCouldntRequestIssueErrorVisible();
        await requestIssueActions.expectClinicianNotAuthorisedErrorAndValidationBanner();
    });

    test("Verify error message is displayed for request issue API failure in current medication", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await requestIssueActions.clickCurrentMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.validateRequestIssueApiFailureError();
    });

    test("Verify error message is displayed for request issue API failure in past medication", { tag: ["@regression", "@dev", "@US481134"] }, async ({ medicationHomeActions, requestIssueActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await requestIssueActions.mockRequestIssueResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Aspirin 75mg tablets");
        await medicationHomeActions.clickPastMoreOptionsButton();
        await requestIssueActions.clickPastMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.validateRequestIssueApiFailureError();
    });
})

