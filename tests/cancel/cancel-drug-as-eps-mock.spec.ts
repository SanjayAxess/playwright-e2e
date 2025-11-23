import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("Cancel multiple EPS issued drug with mock response", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });
    test.beforeEach(async () => {
        await feature(
            "[3] Cancel Multiple Medication EPS UI (Downloaded by Pharmacy) (S)",
            "EMISXGP-1286",
            "https://emisgroup.aha.io/features/EMISXGP-1286"
        );
    });
    test.afterEach(async ({ commonActions }) => {
        await commonActions.setLocalStorage("mock-eps", "false");
        await commonActions.unMockUrl();
    });
    test("Verify that the error dialog box displays the 'Dispensed to patient' tag and the message 'Contact the dispenser / patient.' for the R-0004 error code.", { tag: ["@US463700"] }, async ({ page, issueMedicationPanelActions, cancelMedicationPanelActions, medicationHomeActions, commonActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0004|R-0004|R-0004|R-0004");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0004ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
    });

    test("Verify whether the success notification is displayed when cancelling multiple eps issued medications", { tag: ["@US462523"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(4);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "");
    });

    test("Verify visibility of 'Cancellation rejection tasks have been created in EMIS Web Workflow Manager.' text in error dialog for multiple medication cancellations across various scenarios", { tag: ["@US475191", "@regression"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-00002|R-0003|R-0002|R-0003");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyWorkflowTasksCreatedTextIsVisible_multipleCancellation(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-00002|R-0003|400|500");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyWorkflowTasksCreatedTextIsVisible_multipleCancellation(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "504|501|400|500");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyWorkflowTasksCreatedTextIsNotVisible_multipleCancellation(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
    });

    test("Verify whether the error dialog box is displayed with 'Expired' tag when several medications cancellation failed with R-0005 error code", { tag: ["@US463700"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0005|R-0005|R-0005|R-0005");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0005ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
    });

    test("Verify whether the error dialog box is displayed with 'Already cancelled' tag when several medications cancellation failed with R-0006 error code", { tag: ["@US463700"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0006|R-0006|R-0006|R-0006");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0006ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
    });

    test("Verify whether the error dialog box is displayed with 'Pending' tag 'Cancellation already requested. Either wait or contact the dispenser yourself.' text when several medications cancellation failed with R-0007 error code", { tag: ["@US463700"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0007|R-0007|R-0007|R-0007");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0007ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
    });

    test("Verify that the error dialog box for multiple cancellation for different R-code errors", { tag: ["@US463700", "@regression"] }, async ({ page, issueMedicationPanelActions, cancelMedicationPanelActions, medicationHomeActions, commonActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0004|R-0004|R-0004|R-0004");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0004ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0005|R-0005|R-0005|R-0005");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0005ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0006|R-0006|R-0006|R-0006");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0006ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0010|R-0010|R-0010|R-0010");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0010ErrorCode_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0002|R-0003|R-0003|R-0002");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0002AndR_0003ErrorCodes_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-5000|R-0099|R-5006|400");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_5000_0099_5006And5888ErrorCodes_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0008|R-0008|R-0008|504");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0008AndR0009ErrorCodes_multipleCancellation(4);
        await cancelMedicationPanelActions.verifyPendingCancellationMedicationCount(4);
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
    });
});

test.describe("Cancel single EPS issued drug with mock response", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });
    test.beforeEach(async () => {
        await feature(
            "[1] Cancel Single Medication EPS UI (NOT Downloaded by Pharmacy) (XS)",
            "EMISXGP-689",
            "https://emisgroup.aha.io/features/EMISXGP-689"
        );
    });
    test.afterEach(async ({ commonActions }) => {
        await commonActions.setLocalStorage("mock-eps", "false");
        await commonActions.unMockUrl();
    });

    test("Verify universal dialog displays correct text for all error codes during single medication cancellation via cancel issue button", { tag: ["@US474815", "@regression"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "400");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        const todayDate = await commonActions.getTodayDate();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Technical error", "Contact the dispenser/patient.");
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "504");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Technical error", "Try cancelling again.");
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0002");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "With dispenser", "Contact the dispenser.");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0004");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Dispensed to patient", "Contact the dispenser/patient.");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0008");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Technical error", "Try cancelling again.");
        await cancelMedicationPanelActions.clickTryAgainButton();
        await cancelMedicationPanelActions.validateSpinnerAndSkeletonOnTryAgainClick();
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-5000");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Technical error", "Contact the dispenser/patient.");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0007");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Pending", "Cancellation already requested. Either wait or contact the dispenser yourself.");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0006");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Already cancelled", "");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0005");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Expired", "");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0010");
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Not dispensed", "");
        await cancelMedicationPanelActions.verifyWorkflowTaskCreatedTextIsVisible_singleCancellation();
        await cancelMedicationPanelActions.verifyTheDispenserDetails();
        await cancelMedicationPanelActions.clickTheErrorDialogBoxCloseButton();
    });

    test("Validate the error dialogue box for R-0009 error code", { tag: ["@US452362", "@US466335", "@US474815", "@regression"] }, async ({ issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions, cancelMedication }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await issueMedicationPanelActions.mockGetMedicationApiResponse();
        await medicationHomeActions.clickMedsRefreshButton();
        await cancelMedicationPanelActions.clickFirstKebabMenu();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0009");
        await cancelMedicationPanelActions.verifyCancelLatestIssueIsEnabled();
        await cancelMedicationPanelActions.clickCancelIssueOption();
        await cancelMedicationPanelActions.verifyCancelIssuePanel("Amoxicillin 250mg capsules");
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        const todayDate = await commonActions.getTodayDate();
        await cancelMedicationPanelActions.verifySingleCancellationUniversalErrorDialogBox("Amoxicillin 250mg capsules", "11-Apr-2025", "Technical error", "Try cancelling again.");
        await cancelMedicationPanelActions.clickTryAgainButton();
        await cancelMedicationPanelActions.validateSpinnerAndSkeletonOnTryAgainClick();
        await cancelMedicationPanelActions.verifyTheErrorDialogBoxForR_0009ErrorCode("Amoxicillin 250mg capsules", "12", "12");
    });

    test("Verify whether the success notification is displayed when cancelling multiple eps issued acute medications", { tag: ["@US8830043", "@regression"] }, async ({ medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(4);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "");
    });

    test("Verify whether the success notification is displayed when cancelling multiple eps issued repeat medications", { tag: ["@US8830043"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(5, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(4);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "");
    });

    test("Verify whether the success notification is displayed when cancelling multiple eps issued RD medications", { tag: ["@US8830043", "@regression"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(9, 4);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(4);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "");
    });

    test("Verify whether the success notification is displayed when cancelling single eps issued medication", { tag: ["@US8830043"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(5, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(9, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "");
    });

    test("Verify partial success notification when cancelling a mix of acute, repeat, and RD EPS issued medications", { tag: ["@US8830043", "@regression"] }, async ({ page, issueMedicationPanelActions, cancelMedication, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await page.setViewportSize({ width: 1200, height: 650 });
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 2);
        await medicationHomeActions.SelectMultipleCheckbox(5, 1);
        await medicationHomeActions.SelectMultipleCheckbox(9, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "R-0007|200|200|200");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedication.cannotCancelIssueDialogCloseButton.click();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyPartialSuccessCancellationToastNotification(3, 4);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "");
    });

    test("Verify whether the success notification is displayed when cancelling single eps issued medication via kebab menu", { tag: ["@US8830043", "@regression"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions, cancelMedication }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickKebabMenuForMedication("Aspirin 75mg tablets");
        await cancelMedication.cancelLatestIssue.click();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickKebabMenuForMedication("Hydroxocobalamin 1mg/1ml solution for injection ampoules");
        await cancelMedication.cancelLatestIssue.click();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickKebabMenuForMedication("Felodipine 2.5mg modified-release tablets");
        await cancelMedication.cancelLatestIssue.click();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
    });

    test("Verify success notification when cancelling single EPS medication sequentially without refresh after previous cancellation", { tag: ["@US8830043"] }, async ({ page, issueMedicationPanelActions, addMedicationPanelActions, medicationHomeActions, commonActions, cancelMedicationPanelActions }) => {
        await commonActions.setLocalStorage("mock-eps", "true");
        await medicationHomeActions.getMedsIncludeAllPrescriptionType_Mock();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.SelectMultipleCheckbox(1, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await commonActions.setLocalStorage("cancellatestissue_mock_scenario", "fullsuccess");
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
        await medicationHomeActions.UnselectMultipleCheckbox(1, 1);
        await medicationHomeActions.SelectMultipleCheckbox(2, 1);
        await cancelMedicationPanelActions.clickCancelIssueIcon();
        await cancelMedicationPanelActions.selectPrescribingErrorCancellationReason();
        await cancelMedicationPanelActions.clickCancelIssueButton();
        await cancelMedicationPanelActions.verifyTheCancelIssuePanelIsClosed();
        await cancelMedicationPanelActions.verifyCancellationToastNotification(1);
        await medicationHomeActions.clickToastNotificationCloseButton();
        await cancelMedicationPanelActions.verifyTheCancelNotificationPanelIsClosed();
    });
})
