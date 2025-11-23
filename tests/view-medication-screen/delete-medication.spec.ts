import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("Delete medication flow", () => {
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

    test('Verify when user clicks on Delete course button the medication should be deleted and removed from current and past medications', { tag: ["@regression", "@US481622", "@pr_check"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, deleteMedicationActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await endCourseActions.validateEndCourseToastMessage();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.enterDeleteCourseDialogReason("Test reason for deleting course");
        await deleteMedicationActions.clickDeleteCourseSubmitBtn();
        await deleteMedicationActions.validateDeleteMedicationToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await deleteMedicationActions.expectMedicationIsNotPresentInCurrent("Aspirin 75mg tablets");
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await deleteMedicationActions.expectMedicationIsNotPresentInPast("Aspirin 75mg tablets");
    });

    test('Validate Could not delete course error message when Delete course API fails while deleting drug[Faraday06-clinical-safety-Errors/warnings]', { tag: ["@regression", "@US481622"] }, async ({ medicationHomeActions, addMedicationPanelActions, endCourseActions, deleteMedicationActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.enterDeleteCourseDialogReason("Test reason for deleting course");
        await deleteMedicationActions.blockDeleteCourseAPI();
        await deleteMedicationActions.clickDeleteCourseSubmitBtn();
        await deleteMedicationActions.validateDeleteCourseAPIError();
        await deleteMedicationActions.unBlockDeleteCourseAPI();
        await deleteMedicationActions.clickDeleteCourseSubmitBtn();
        await deleteMedicationActions.validateDeleteMedicationToastMessage();
    });

    test('Validate Delete course dialog box', { tag: ["@regression", "@US481622"] }, async ({ deleteMedicationActions, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.validateDeleteCourseDialogBox();
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.expectDeleteCourseDialogRemainsOpenOnOutsideClick();
    });

    test('Verify Delete course option is enabled for drug which is NOT issued in the past medication screen', { tag: ["@regression", "@US481622", "@dev"] }, async ({ deleteMedicationActions, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.validateDeleteCourseOptionEnabled();
    });

    test('Verify Delete course option is enabled for drug which has all issues as cancelled in the past medication screen', { tag: ["@regression", "@US481622", "@dev"] }, async ({ deleteMedicationActions, medicationHomeActions, addMedicationPanelActions, endCourseActions, issueMedicationPanelActions, cancelMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.validateDeleteCourseOptionEnabled();
    });

    test('Verify Delete course option is disabled for drug which has active issue in the past medication screen', { tag: ["@regression", "@US481622", "@dev"] }, async ({ deleteMedicationActions, medicationHomeActions, addMedicationPanelActions, endCourseActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.validateDeleteCourseOptionDisabled();
    });

    test('Verify Delete course option is NOT available for drugs in the current medication screen', { tag: ["@regression", "@US481622", "@dev"] }, async ({ deleteMedicationActions, medicationHomeActions, addMedicationPanelActions, issueMedicationPanelActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await deleteMedicationActions.validateDeleteCourseOptionNotAvailable();
    });

    test('Verify Delete course panel with invalid data in the Reason for deleting course field', { tag: ["@regression", "@US481622", "@dev"] }, async ({ deleteMedicationActions, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.reasonForDeletingCourseFieldValidation();
    });

    test('Verify Cannot Delete course popup is displayed when user tries to delete drug which is medication requested', { tag: ["@regression", "@US481622", "@dev"] }, async ({ requestIssueActions, medicationHomeActions, addMedicationPanelActions, endCourseActions, deleteMedicationActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.clickPastMoreOptionsButton();
        await requestIssueActions.clickPastMedsRequestIssue();
        await requestIssueActions.selectSendRequestToUser();
        await requestIssueActions.clickRequestIssueButton();
        await requestIssueActions.validatePendingIconForCurrentRequestedMedication("Prescription requested");
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.enterDeleteCourseDialogReason("Test reason for deleting course");
        await deleteMedicationActions.clickDeleteCourseSubmitBtn();
        await deleteMedicationActions.validateCannotDeleteCoursePopup();
    });

    test('Verify Cannot Delete course popup is displayed when user tries to delete drug which is linked with problem', { tag: ["@regression", "@US481622", "@dev"] }, async ({ medicationHomeActions, deleteMedicationActions }) => {
        await medicationHomeActions.getDeleteMedication_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication("Salbutamol 100micrograms/dose inhaler CFC free Drug linked with the problem which cannot be deleted");
        await medicationHomeActions.clickPastMoreOptionsButton();
        await deleteMedicationActions.clickPastMedsDeleteCourse();
        await deleteMedicationActions.enterDeleteCourseDialogReason("Test reason for deleting course");
        await deleteMedicationActions.clickDeleteCourseSubmitBtn();
        await deleteMedicationActions.validateCannotDeleteCoursePopup();
    });

    test('Validate Add drug - Issue drug - Cancel Issue - End course - Delete drug in prescribe panel and Notifications after corresponding actions[Faraday04-Faraday05-Faraday13-clinical-safety-Refresh-Notification]', { tag: ["@regression", "@US481622", "@dev", "@pr_check"] }, async ({ addMedicationPanelActions, medicationHomeActions, deleteMedicationActions, issueMedicationPanelActions, cancelMedicationPanelActions, endCourseActions }) => {
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.validateCancelCourseToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.enterReasonForEndingCourse("Test reason for ending course");
        await endCourseActions.clickEndCourseButton();
        await endCourseActions.validateEndCourseToastMessage();
        await medicationHomeActions.clickMedsRefreshButton();
        // await medicationHomeActions.clickPastMedicationTab();
        // await medicationHomeActions.searchPastMedication(randomGuid);
        // await medicationHomeActions.clickPastMoreOptionsButton();
        // await deleteMedicationActions.clickPastMedsDeleteCourse();
        // await deleteMedicationActions.enterDeleteCourseDialogReason("Test reason for deleting course");
        // await deleteMedicationActions.clickDeleteCourseSubmitBtn();
        // await deleteMedicationActions.validateDeleteMedicationToastMessage();
    });
})