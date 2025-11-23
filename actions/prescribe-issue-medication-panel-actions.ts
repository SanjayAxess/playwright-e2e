import { expect, Page } from "@playwright/test";
import { IssueMedicationPanelPage } from "../pages/prescribe-issue-medication-panel-page";
import { IssueMethodPage } from "../pages/prescribe-drug-issue-method-page";
import { EndCourseMedicationPage } from "../pages/end-medication-page";
import { AddMedicationPanelActions } from "./prescribe-add-medication-panel-actions";
import { CommonActions } from "./common-actions";
import { MedicationHomeActions } from "./medication-home-actions";
import single_drug_prepare_response from "../mock_data/single_drug_prepare_response.json";
import single_drug_prescription_response from "../mock_data/single_drug_prescription_response.json";
import multiple_drugs_prepare_response from "../mock_data/multiple_drugs_prepare_response.json";
import multiple_drugs_prepare_api_response_all_nhs_error_503 from "../mock_data/multiple_drugs_prepare_api_response_all_nhs_error_503.json";
import multiple_drugs_prepare_api_response_all_nhs_error_400 from "../mock_data/multiple_drugs_prepare_api_response_all_nhs_error_400.json";
import multiple_drugs_prepare_api_response_partial_nhs_error_503 from "../mock_data/multiple_drugs_prepare_api_response_partial_nhs_error_503.json";
import multiple_drugs_prepare_api_response_partial_nhs_error_400 from "../mock_data/multiple_drugs_prepare_api_response_partial_nhs_error_400.json";
import signature_request_api_response from "../mock_data/signature_request_api_response.json";
import signature_response_api_response from "../mock_data/signature_response_api_response.json";
import multiple_drugs_prescription_api_response_all_nhs_error_503 from "../mock_data/multiple_drugs_prescription_api_response_all_nhs_error_503.json";
import multiple_drugs_prescription_api_response_all_nhs_error_400 from "../mock_data/multiple_drugs_prescription_api_response_all_nhs_error_400.json";
import multiple_drugs_prescription_api_response_partial_nhs_error_503 from "../mock_data/multiple_drugs_prescription_api_response_partial_nhs_error_503.json";
import multiple_drugs_prescription_api_response_partial_nhs_error_400 from "../mock_data/multiple_drugs_prescription_api_response_partial_nhs_error_400.json";
import multiple_drugs_prescription_response from "../mock_data/multiple_drugs_prescription_response.json";
import multiple_eps_issued_drugs_get_meds_response_mock from "../mock_data/multiple_eps_issued_drugs_get_meds_response.json";
import migration_degraded_allergy_response from "../mock_data/migration_degraded_allergy.json";
import gp2gp_and_migration_degraded_allergy_response from "../mock_data/gp2gp_and_migration_degraded_allergy.json";
import gp2gp_degraded_allergy_response from "../mock_data/gp2gp_degraded_allergy.json";
import { RecordMedicationPage } from "../pages/record-medication-page";
import { MedicationHomePage } from "../pages/medication-home-page";

export class IssueMedicationPanelActions {
    protected issueMedicationPanelPage: IssueMedicationPanelPage;
    protected addMedicationPanelActions: AddMedicationPanelActions;
    protected issueMethodPage: IssueMethodPage;
    protected commonActions: CommonActions;
    protected medicationHomeActions: MedicationHomeActions;
    protected endCourseMedicationPage: EndCourseMedicationPage;
    protected medicationHomePage: MedicationHomePage;

    constructor(protected readonly _page: Page) {
        this.issueMedicationPanelPage = new IssueMedicationPanelPage(this._page);
        this.issueMethodPage = new IssueMethodPage(this._page);
        this.endCourseMedicationPage = new EndCourseMedicationPage(this._page);
        this.addMedicationPanelActions = new AddMedicationPanelActions(this._page);
        this.commonActions = new CommonActions(this._page);
        this.medicationHomeActions = new MedicationHomeActions(this._page);
        this.medicationHomePage = new MedicationHomePage(this._page);
    }

    async mousehoverPharmacyAddress3Dots() {
        await this.issueMedicationPanelPage.pharmacyAddress3Dots.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.pharmacyAddress3Dots.isEnabled();
        await this.issueMedicationPanelPage.pharmacyAddress3Dots.hover();
    }

    async verifyPharmacyAddressTooltipUsingTab(addressText: string) {
        await this.clickIssueTab();
        await this.issueMedicationPanelPage.pharmacyAddress3Dots.waitFor({ state: "visible" });
        await this.clickIssueTab();
        await this.commonActions.pressTab();
        await this.commonActions.pressTab();
        await this.commonActions.pressTab();
        await expect(this.issueMedicationPanelPage.pharmacyAddressTooltip.first()).toContainText(addressText);
    }

    async verifyPharmacyAddressTooltipbyMouseHovering(addressText: string) {
        await this.clickIssueTab();
        await this.issueMedicationPanelPage.pharmacyAddress3Dots.waitFor({ state: "visible" });
        await this.clickIssueTab();
        await this.mousehoverPharmacyAddress3Dots();
        await this.issueMedicationPanelPage.pharmacyAddressTooltip.first().waitFor({ state: "visible" });
        await expect(this.issueMedicationPanelPage.pharmacyAddressTooltip.first()).toContainText(addressText);
    }

    async verifyIssueButtonIsEnabled() {
        await this.issueMedicationPanelPage.button.issue.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.issue.isEnabled;
    }

    async clickIssueButton() {
        await this.issueMedicationPanelPage.button.issue.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.issue.click();
    }

    async clickIssueLaterButton() {
        await this.issueMedicationPanelPage.button.issueLater.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async clickTryAgainButton() {
        await this.issueMedicationPanelPage.button.tryAgain_failure.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
    }

    async clickIssueTab() {
        await this.issueMedicationPanelPage.issueMedicationTab.click();
    }

    async clickPostDateIcon() {
        await this.issueMedicationPanelPage.postDateIcon.click();
    }

    async enterPostDate(postDate: string) {
        await this.issueMedicationPanelPage.postDateField.fill(postDate);
    }

    async clickPostDateApplyButton() {
        await this.issueMedicationPanelPage.button.postDate_Apply.click();
    }

    async applyPostdate(postDate: string) {
        await this.clickIssueTab();
        await this.clickPostDateIcon();
        await this.issueMedicationPanelPage.postDateField.fill(postDate);
        await this.clickPostDateApplyButton();
        await expect(this.issueMedicationPanelPage.postDateBatch).toBeVisible();
        await this.issueMedicationPanelPage.postDateBatch.hover();
        await this.commonActions.verifyTootltipText("Postdating 1 prescription: " + postDate);
    }

    async closeIssuePanel() {
        await this.issueMedicationPanelPage.button.issuePanel_X.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.issuePanel_X.click();
    }

    async closeDiscardPanel() {
        await this.issueMedicationPanelPage.button.discard_close.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.discard_close.click();
    }

    async viewLastDrugInIssueList() {
        await this.issueMedicationPanelPage.issueMethodHeaderInIssuePanel.hover();
        await this._page.mouse.wheel(0, 50000);
        await this.issueMedicationPanelPage.lastDrugInIssueList.scrollIntoViewIfNeeded();
    }

    async issueMedication() {
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async issue_EPS_Medication_With_SigningToken() {
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async issue_EPS_Multiple_Medication_With_All_200_Mocks() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 200, () => JSON.stringify(multiple_drugs_prescription_response));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async issue_EPS_Single_Medication_With_All_200_Mocks() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(single_drug_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 200, () => JSON.stringify(single_drug_prescription_response));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.medicationHomeActions.clickToastNotificationCloseButton();
    }

    async issue_EPS_Medication_With_Prepare_Network_Block() {
        await this.commonActions.blockAPI("**/prepare");
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_Signature_Request_Network_Block() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.blockAPI("**/signature-request");
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_Signature_Response_Network_Block() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.blockAPI("**/signature-response");
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_Prescription_Network_Block() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.blockAPI("**/prescriptions");
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_Unauthorised_User() {
        // Mock enables the EPS Issue Method to be displayed, but the user is not authorised to issue the drug.
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_Failure_In_Second_Set_Of_EPS_Check() {
        // Mock enables the EPS Issue Method to be displayed,Then Try to issue after disabling the mock before clicking the issue button
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.commonActions.setLocalStorage("mock-eps", "false");
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSRevalidationError();
        const [newPage] = await Promise.all([
            this._page.context().waitForEvent("page"),
            this.issueMedicationPanelPage.epsErrors.eps_revalidation_error.getByRole("link", { name: "EPS troubleshooting guide" }).click()
        ]);
        await newPage.waitForLoadState("domcontentloaded");
        expect(newPage.url()).toContain("https://emisprod.service-now.com/");
        await newPage.close();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_All_Prepare_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 503);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_All_Prepare_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 400);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_All_Prepare_Internal_NHS_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 400, () => JSON.stringify(multiple_drugs_prepare_api_response_all_nhs_error_503));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_All_Prepare_Internal_NHS_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 400, () => JSON.stringify(multiple_drugs_prepare_api_response_all_nhs_error_400));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_Partial_Prepare_Internal_NHS_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_api_response_partial_nhs_error_503));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 200, () => JSON.stringify(multiple_drugs_prescription_response));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSPartialRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_Partial_Prepare_Internal_NHS_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_api_response_partial_nhs_error_400));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 200, () => JSON.stringify(multiple_drugs_prescription_response));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSPartialNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_All_Signature_Request_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 503);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_All_Signature_Request_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 400);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_All_Signature_Response_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 503);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_All_Signature_Response_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 400);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_All_Prescriptions_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 503);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_All_Prescriptions_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 400);
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_All_Prescriptions_Internal_NHS_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 400, () => JSON.stringify(multiple_drugs_prescription_api_response_all_nhs_error_503));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_All_Prescriptions_Internal_NHS_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 400, () => JSON.stringify(multiple_drugs_prescription_api_response_all_nhs_error_400));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async issue_EPS_Medication_With_Partial_Prescriptions_Internal_NHS_503_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 200, () => JSON.stringify(multiple_drugs_prescription_api_response_partial_nhs_error_503));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSPartialRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["EPS", "Any pharmacy"]);
    }

    async issue_EPS_Medication_With_Partial_Prescriptions_Internal_NHS_400_Mock() {
        await this.commonActions.mockUrl("**/prepare", 200, () => JSON.stringify(multiple_drugs_prepare_response));
        await this.commonActions.mockUrl("**/signature-request", 200, () => JSON.stringify(signature_request_api_response));
        await this.commonActions.mockUrl("**/signature-response**", 200, () => JSON.stringify(signature_response_api_response));
        await this.commonActions.mockUrl("**/prescriptions", 200, () => JSON.stringify(multiple_drugs_prescription_api_response_partial_nhs_error_400));
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.clickEPSProceedButton();
        await this.enterDummyToken();
        await this.verifyEPSPartialNonRetryError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.verifyIssueMethodHeaderInIssuePanel(["Printed", "NHS prescription"]);
    }

    async clickEPSProceedButton() {
        await this.issueMedicationPanelPage.button.eps_Proceed.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.eps_Proceed.click();
    }

    async clickEPSDoNotProceedButton() {
        await this.issueMedicationPanelPage.button.eps_DoNotProceed.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.eps_DoNotProceed.click();
    }

    async clickEPSConsent_X_Button() {
        await this.issueMedicationPanelPage.button.epsConsentPanel_X.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.button.epsConsentPanel_X.click();
    }

    async enterDummyToken() {
        await this.issueMedicationPanelPage.dummyTokenTextbox.waitFor();
        await this.issueMedicationPanelPage.dummyTokenTextbox.fill(process.env.MOCK_SIGNING_TOKEN);
    }

    async clickCloseEPSIssueErrorPopup() {
        await this.issueMedicationPanelPage.button.epsErrorPopup_Close.click();
    }

    async verifyNonEPSIssueError() {
        await expect(this.issueMedicationPanelPage.epsErrors.non_eps_error).toContainText("An error occurred while issuing medication. Try again.");
    }

    async verifyEPSRetryError() {
        await expect(this.issueMedicationPanelPage.epsErrors.eps_retry_error).toContainText("An error occurred while issuing medication via EPS. Try again or issue a printed prescription instead.");
    }

    async verifyEPSNonRetryError() {
        await expect(this.issueMedicationPanelPage.epsErrors.eps_non_retry_error).toContainText("An error occurred while issuing medication via EPS. The issue method will change to Printed when you close this message. Issue this medication as a printed prescription instead.");
    }

    async verifyEPSPartialRetryError() {
        await expect(this.issueMedicationPanelPage.epsErrors.eps_partial_retry_error).toContainText("An error occurred while issuing medication via EPS. Some items were not issued. These remain on the Issue tab.Try again or issue a printed prescription instead.");
    }

    async verifyEPSPartialNonRetryError() {
        await expect(this.issueMedicationPanelPage.epsErrors.eps_partial_non_retry_error).toContainText("An error occurred while issuing medication via EPS. Some items were not issued. These remain on the Issue tab.The issue method will change to Printed when you close this message. Issue this medication as a printed prescription instead.");
    }

    async verifyEPSRevalidationError() {
        await expect(this.issueMedicationPanelPage.epsErrors.eps_revalidation_error).toContainText("An error occurred while issuing via EPS. Issue a printed prescription instead.");
        await expect(this.issueMedicationPanelPage.epsErrors.eps_revalidation_error).toContainText("Read our EPS troubleshooting guide");
        await expect(this.issueMedicationPanelPage.epsErrors.eps_revalidation_error).toContainText("on EMIS Now.");
    }

    async verifyIssueMethodHeaderInIssuePanel(issueMethod: string[]) {
        await this.issueMedicationPanelPage.issueMethodHeaderInIssuePanel.waitFor({ state: "visible" });
        for (let i = 0; i < issueMethod.length; i++) {
            await expect(this.issueMedicationPanelPage.issueMethodHeaderInIssuePanel).toContainText(issueMethod[i]);
        }
    }

    async verifyFirstDrugDetailsInIssuePanel(drugDetails: string[]) {
        for (const drugs of drugDetails) {
            await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(0)).toContainText(drugs);
        }
    }

    async verifyIssueDrugError(error: number) {
        await this.commonActions.mockUrl("**/prescriptions", error);
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.verifyNonEPSIssueError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.commonActions.unMockUrl();
    }

    async verifyIssueDrugBlockError() {
        await this.commonActions.blockAPI("**/prescriptions");
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
        await this.verifyNonEPSIssueError();
        await this.clickCloseEPSIssueErrorPopup();
        await this.commonActions.unblockAPI("**/prescriptions");
    }

    async verifyBothClinicalWarningBlockErrorAndEPSCheckBlockError(randomGuid: string) {
        await this.commonActions.blockAPI("**/prescriber-warnings/search");
        await this.commonActions.blockAPI("**/patient**");
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("EMIS-X couldn’t load clinical decision support. Try loading again or issue the medication in EMIS Web instead.");
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).toBeDisabled();
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this._page.waitForTimeout(2000);
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await this.commonActions.unblockAPI("**/prescriber-warnings/search");
        await this.commonActions.unblockAPI("**/patient**");
        await this._page.waitForTimeout(2000);
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async verifyBothClinicalWarningErrorAndEPSCheckError(error: number, randomGuid: string) {
        await this.commonActions.mockUrl("**/prescriber-warnings/search", error);
        await this.commonActions.mockUrl("**/patient**", error);
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("EMIS-X couldn’t load clinical decision support. Try loading again or issue the medication in EMIS Web instead.");
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).toBeDisabled();
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this._page.waitForTimeout(2000);
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await this.commonActions.unMockUrl();
        await this._page.waitForTimeout(2000);
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async verifyClinicalWarningErrorinIssueTab(error: number, randomGuid: string) {
        await this.commonActions.mockUrl("**/prescriber-warnings/search", error);
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("EMIS-X couldn’t load clinical decision support. Try loading again or issue the medication in EMIS Web instead.");
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).toBeDisabled();
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this._page.waitForTimeout(2000);
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await this.commonActions.unMockUrl();
        await this._page.waitForTimeout(2000);
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async verifyClinicalWarningBlockErrorinIssueTab(randomGuid: string) {
        await this.commonActions.blockAPI("**/prescriber-warnings/search");
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("EMIS-X couldn’t load clinical decision support. Try loading again or issue the medication in EMIS Web instead.");
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).toBeDisabled();
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this._page.waitForTimeout(2000);
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Cannot issue medication");
        await this.commonActions.unblockAPI("**/prescriber-warnings/search");
        await this._page.waitForTimeout(2000);
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async verifyEpsCheckErrorinIssueTab(error: number, randomGuid: string) {
        await this.commonActions.mockUrl("**/patient**", error);
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Couldn’t confirm EPS eligibility");
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Something went wrong and we couldn’t confirm EPS eligibility. Try again or issue a printed prescription instead.");
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this._page.waitForTimeout(2000);
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Couldn’t confirm EPS eligibility");
        await this.commonActions.unMockUrl();
        await this._page.waitForTimeout(2000);
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async verifyEpsCheckBlockErrorinIssueTab(randomGuid: string) {
        await this.commonActions.blockAPI("**/patient**");
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 75mg dispersible tablets " + randomGuid);
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Couldn’t confirm EPS eligibility");
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Something went wrong and we couldn’t confirm EPS eligibility. Try again or issue a printed prescription instead.");
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this._page.waitForTimeout(2000);
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText("Couldn’t confirm EPS eligibility");
        await this.commonActions.unblockAPI("**/patient**");
        await this._page.waitForTimeout(2000);
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.issueMedicationPanelPage.button.issueLater.click();
    }

    async clickIssueMethodDropdownOption() {
        await this.issueMethodPage.issueMethodDropdown.click();
    }

    async clickPrintedNHSPrescriptionDropdownOption() {
        await this.issueMethodPage.printedNhsPrescriptionDropdownOption.click();
    }

    async clickEPSPrimaryNominationDropdownOption() {
        await this.issueMethodPage.epsPrimaryNominationDropdownOption.click();
    }

    async clickEPSApplianceNominationDropdownOption() {
        await this.issueMethodPage.epsApplianceNominationDropdownOption.click();
    }

    async clickEPSAnyPharmacyDropdownOption() {
        await this.issueMethodPage.epsAnyPharmacyDropdownOption.click();
    }

    async verifyDiscardDialoginIssuePanelIfPostdateIsApplied() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", "verifydiscarddialog", "11", "11", "Pharmacy Test", "Patient Test");
        await this.clickIssueTab();
        await this.applyPostdate("10-Apr-2026");
        await this.closeIssuePanel();
        await expect(this.issueMedicationPanelPage.discardAlertIcon).toBeVisible();
        await this.addMedicationPanelActions.validateDiscardDialog("Close without issuing?", "You have one or more medications that have not been issued. Postdating has also been applied which will be lost. Are you sure you want to close without issuing?");
    }

    async verifyDiscardDialoginIssuePanelIfPostdateIsNotApplied() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", "verifydiscarddialog", "11", "11", "Pharmacy Test", "Patient Test");
        await this.clickIssueTab();
        await this.closeIssuePanel();
        await expect(this.issueMedicationPanelPage.discardAlertIcon).toBeVisible();
        await this.addMedicationPanelActions.validateDiscardDialog("Close without issuing?", "You have one or more medications that have not been issued. Are you sure you want to close without issuing?");
    }

    async verifyDiscardDialogInIssuePanelThroughAddToPrescription() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Arjun ear drops (Arjun Products Ltd)", "verifydiscarddialog", "11", "11", "Pharmacy Test", "Patient Test");
        await this.clickIssueTab();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Arjun ear drops (Arjun Products Ltd)");
        await this.closeIssuePanel();
        await this.addMedicationPanelActions.verifyDiscardDialogIsVisible();
        await expect(this.issueMedicationPanelPage.discardAlertIcon).toBeVisible();
        await this.addMedicationPanelActions.validateDiscardDialog("Close without issuing?", "You have one or more medications that have not been issued. Are you sure you want to close without issuing?");
        await this.addMedicationPanelActions.clickDiscardDialogCancelButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toBeVisible();
        await this.addMedicationPanelActions.clickPrescribeDiscardButton();

    }

    async verifyClickingXbuttonInDiscardDialogReturnsToIssueScreen() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Avanafil 50mg tablets", "verifydiscarddialog", "11", "11", "Pharmacy Test", "Patient Test");
        await this.clickIssueTab();
        await this.applyPostdate("10-Apr-2026");
        await this.clickIssueLaterButton();
        await expect(this.issueMedicationPanelPage.discardAlertIcon).toBeVisible();
        await this.addMedicationPanelActions.validateDiscardDialog("Discard postdating?", "Issuing later will mean that the postdating applied to this prescription will be lost.");
    }

    async verifyDiscardDialogNotShownIfItsRepeatOrRepeatDispensingPrescType() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Hydroxycarbamide 100mg tablets", "addingrepeatdrug", "6", "6", "5", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        await this.clickIssueLaterButton();
        await this.addMedicationPanelActions.verifyDiscardDialogIsNotVisible();
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatDispensingMedication("Liquid paraffin light 70% gel", "addingrddrug", "1", "20", "8", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        await this.clickIssueLaterButton();
        await this.addMedicationPanelActions.verifyDiscardDialogIsNotVisible();
    }

    async verifyIssueMethodHeaderAndDropdownValues() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Hydroxycarbamide 100mg tablets", "addingrepeatdrug", "6", "6", "5", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.button.issue).toBeVisible();
        await expect(this.issueMedicationPanelPage.button.issueLater).toBeVisible();
        await expect(this.issueMethodPage.issueMethodDropdown).toBeVisible();
        await expect(this.issueMethodPage.issueMethodDropdown).toContainText("Issue method");
        await expect(this.issueMedicationPanelPage.issueMethodHeaderInIssuePanel).toContainText("Printed");
        await expect(this.issueMedicationPanelPage.issueMethodHeaderInIssuePanel).toContainText("NHS prescription");
        await this.issueMethodPage.issueMethodDropdown.click();
        await expect(this.issueMethodPage.epsPrimaryNominationDropdownOption).toBeDisabled();
        await expect(this.issueMethodPage.epsPrimaryNominationDropdownOption).toContainText("EPS Primary nomination");
        await expect(this.issueMethodPage.epsApplianceNominationDropdownOption).toBeDisabled();
        await expect(this.issueMethodPage.epsApplianceNominationDropdownOption).toContainText("EPS Appliance nomination");
        await expect(this.issueMethodPage.epsAnyPharmacyDropdownOption).toBeDisabled();
        await expect(this.issueMethodPage.epsAnyPharmacyDropdownOption).toContainText("EPS Any pharmacy");
        await expect(this.issueMethodPage.printedNhsPrescriptionDropdownOption).toBeDisabled();
        await expect(this.issueMethodPage.printedNhsPrescriptionDropdownOption).toContainText("Printed NHS prescription");
        await this._page.keyboard.press("Escape");
        await this.clickIssueLaterButton();
    }

    async verifyPostdateIsDisabledAndTooltipIsShownForRepeatDispensing() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatDispensingMedication("Nitrazepam 5mg tablets", "postdate for rd", "1", "20", "8", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await this.issueMedicationPanelPage.postDateIcon.hover();
        await this.commonActions.verifyTootltipText("Postdating only available for acute medication. Use EMIS Web to postdate other medication.");
        await this.clickIssueLaterButton();
    }

    async verifyPostdateIsDisabledAndTooltipIsShownForRepeatMedication() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Nitrazepam 5mg tablets", "postdate for repeat", "6", "6", "5", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await this.issueMedicationPanelPage.postDateIcon.hover();
        await this.commonActions.verifyTootltipText("Postdating only available for acute medication. Use EMIS Web to postdate other medication.");
        await this.clickIssueLaterButton();
    }

    async verifyPostdateIsEnabledAndAbleToAddCurrentAndFutureDateForAcute() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "postdate for acute", "8", "8", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeEnabled();
        await this.clickPostDateIcon();
        await expect(this.issueMedicationPanelPage.postDateDialog).toBeVisible();
        await expect(this.issueMedicationPanelPage.noOfPostDatePrescription).toBeVisible();
        await expect(this.issueMedicationPanelPage.noOfPostDatePrescriptionTextBox).toContainText("1");
        const todayDate = await this.commonActions.getTodayDate();
        await this.checkPostDateHasCurrentDateByDefault();
        await this.clickPostDateApplyButton();
        await expect(this.issueMedicationPanelPage.postDateDialog).not.toBeVisible();
        await expect(this.issueMedicationPanelPage.postDateBatch).toBeVisible();
        await expect(this.issueMedicationPanelPage.postDateBatch).toContainText("Postdating applied");
        await this.issueMedicationPanelPage.postDateBatch.hover();
        await this.commonActions.verifyTootltipText(`Postdating 1 prescription: ${todayDate}`);
        await this.clickPostDateIcon();
        await this.clickremovePostdate();
        await expect(this.issueMedicationPanelPage.postDateBatch).not.toBeVisible();
        await this.clickPostDateIcon();
        const futureDate = await this.commonActions.getFutureDate();
        await this.issueMedicationPanelPage.postDateField.fill(futureDate);
        await this.clickPostDateApplyButton();
        await expect(this.issueMedicationPanelPage.postDateBatch).toBeVisible();
        await expect(this.issueMedicationPanelPage.postDateBatch).toContainText("Postdating applied");
        await this.issueMedicationPanelPage.postDateBatch.hover();
        await this.commonActions.verifyTootltipText(`Postdating 1 prescription: ${futureDate}`);
        await this.clickIssueLaterButton();
        await this.closeDiscardPanel();
    }

    async checkPostDateHasCurrentDateByDefault() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
        await expect(this.issueMedicationPanelPage.postDateField).toHaveValue(formattedDate);
    }

    async clickremovePostdate() {
        await this.issueMedicationPanelPage.removePostdate.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.removePostdate.click();
    }

    async cancelPostdate() {
        await this.issueMedicationPanelPage.cancelPostdate.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.cancelPostdate.click();
    }

    async postdateValidationError(Error: string) {
        await this.issueMedicationPanelPage.postdateValidation.waitFor({ state: "visible" });
        await expect(this.issueMedicationPanelPage.postdateValidation).toContainText(Error);
    }

    async verifyPostdateIsNotSavedIfClickOnCancelButton() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "postdate for acute", "8", "8", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeEnabled();
        await this.clickPostDateIcon();
        await expect(this.issueMedicationPanelPage.postDateDialog).toBeVisible();
        await expect(this.issueMedicationPanelPage.noOfPostDatePrescription).toBeVisible();
        await expect(this.issueMedicationPanelPage.noOfPostDatePrescriptionTextBox).toContainText("1");
        await this.checkPostDateHasCurrentDateByDefault();
        await this.cancelPostdate();
        await expect(this.issueMedicationPanelPage.postDateDialog).not.toBeVisible();
        await expect(this.issueMedicationPanelPage.postDateBatch).not.toBeVisible();
        await this.clickIssueLaterButton();
    }

    async verifyErrorIfPostdateEnteredAsInvalid() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "postdate for acute", "8", "8", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeEnabled();
        await this.clickPostDateIcon();
        await this.issueMedicationPanelPage.postDateField.fill("18-Apr-2024");
        await this.clickPostDateApplyButton();
        await expect(this.issueMedicationPanelPage.postdateValidation).toContainText("The date must be today or in the next 12 months.");
        await this.addMedicationPanelActions.validateBannerError();
        await this.issueMedicationPanelPage.postDateField.fill("2021-Mar-20");
        await this.clickPostDateApplyButton();
        await expect(this.issueMedicationPanelPage.postdateValidation).toContainText("Enter a date in the format dd-Mmm-yyyy.");
        await this.cancelPostdate();
        await this.clickIssueLaterButton();
    }

    async verifyAbleToApplyPostdateIfAllTheAddedMedicationsAreAcuteInTheIssueList() {
        await this.medicationHomeActions.clickPrescribeButton();
        //adding 1st acute medication
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "acute 1", "8", "8", "Pharmacy Text1", "Patient Text1");
        //adding 2nd acute medication
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "acute 2", "6", "6", "Pharmacy Text2", "Patient Text2");
        await this.clickIssueTab();
        //apply postdate
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeEnabled();
        await this.clickPostDateIcon();
        await expect(this.issueMedicationPanelPage.postDateDialog).toBeVisible();
        await expect(this.issueMedicationPanelPage.noOfPostDatePrescription).toBeVisible();
        await expect(this.issueMedicationPanelPage.noOfPostDatePrescriptionTextBox).toContainText("1");
        await this.checkPostDateHasCurrentDateByDefault();
        await this.clickPostDateApplyButton();
        await expect(this.issueMedicationPanelPage.postDateDialog).not.toBeVisible();
        await expect(this.issueMedicationPanelPage.postDateBatch).toBeVisible();
        await expect(this.issueMedicationPanelPage.postDateBatch).toContainText("Postdating applied");
        await this.issueMedicationPanelPage.postDateBatch.hover();
        const todayDate = await this.commonActions.getTodayDate();
        await this.commonActions.verifyTootltipText(`Postdating 1 prescription: ${todayDate}`);
        await this.clickIssueLaterButton();
        await this.closeDiscardPanel();
    }

    async verifyPostdateIsDisabledAndShownTooltipIfRepeatMedicationAddedInTheIssueList() {
        await this.medicationHomeActions.clickPrescribeButton();
        //adding acute medication
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "acute 1", "8", "8", "Pharmacy Text1", "Patient Text1");
        //adding repeat medication
        await this.addMedicationPanelActions.addRepeatMedication("Nitrazepam 5mg tablets", "postdate for repeat", "6", "6", "5", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await this.issueMedicationPanelPage.postDateIcon.hover();
        await this.commonActions.verifyTootltipText("Postdating only available for acute medication. Use EMIS Web to postdate other medication.");
        await this.clickIssueLaterButton();
    }

    async verifyPostdateIsDisabledAndShownTooltipIfRepeatDispensingMedicationAddedInTheIssueList() {
        await this.medicationHomeActions.clickPrescribeButton();
        //adding acute medication
        await this.addMedicationPanelActions.addAcuteMedication("Nitrazepam 5mg tablets", "acute 1", "8", "8", "Pharmacy Text1", "Patient Text1");
        //adding repeat dispensing medication
        await this.addMedicationPanelActions.addRepeatDispensingMedication("Nitrazepam 5mg tablets", "postdate for rd", "1", "20", "8", "CD4 Pharmacy Text", "CD4 Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await this.issueMedicationPanelPage.postDateIcon.hover();
        await this.commonActions.verifyTootltipText("Postdating only available for acute medication. Use EMIS Web to postdate other medication.");
        await this.clickIssueLaterButton();
    }

    async clickIssueTabThreeDotsButton(selectDrugs: number) {
        const drugCount = await this.issueMedicationPanelPage.issueTabThreeDotsButton.count();
        if (selectDrugs < 0 || selectDrugs >= drugCount) {
            throw new Error(`Invalid drug selection index: ${selectDrugs}. Available drugs: ${drugCount}`);
        }
        await this.issueMedicationPanelPage.issueTabThreeDotsButton.nth(selectDrugs).click();
    }

    async clickIssueTabThreeDotsRemoveButton() {
        await this.issueMedicationPanelPage.issueTabThreeDotsRemoveButton.waitFor({ state: "visible" });
        await this.issueMedicationPanelPage.issueTabThreeDotsRemoveButton.click();
    }


    async verifyAbleToRemoveMedicationFromIssueListWhereIssueMethodIsNHSPrinted() {
        //Adding Acute drug
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Aspirin 300mg tablets", "acute drug", "10", "10", "Pharmacy Acute", "Patient Acute");
        //Adding Repeat Dispensing drug
        await this.addMedicationPanelActions.addRepeatDispensingMedication("Glycopyrronium bromide 1mg tablets", "repeat dispensing drug", "2", "20", "5", "Pharmacy Repeat Dispensing", "Patient Repeat Dispensing");
        //Adding Repeat drug
        await this.addMedicationPanelActions.addRepeatMedication("Diethylstilbestrol 1mg tablets", "repeat drug", "5", "5", "3", "Pharmacy Repeat", "Patient Repeat");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   3");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await this.issueMedicationPanelPage.postDateIcon.hover();
        await this.commonActions.verifyTootltipText("Postdating only available for acute medication. Use EMIS Web to postdate other medication.");
        //Verifying drug names in the issue list
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(0)).toContainText("Aspirin 300mg tablets");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(1)).toContainText("Diethylstilbestrol 1mg tablets");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(2)).toContainText("Glycopyrronium bromide 1mg tablets");
        //Removing Repeat drug
        await this.clickIssueTabThreeDotsButton(1);
        await this.clickIssueTabThreeDotsRemoveButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   2");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(0)).toContainText("Aspirin 300mg tablets");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(1)).toContainText("Glycopyrronium bromide 1mg tablets");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        //Removing Repeat Dispensing drug
        await this.clickIssueTabThreeDotsButton(1);
        await this.clickIssueTabThreeDotsRemoveButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   1");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(0)).toContainText("Aspirin 300mg tablets");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeEnabled();
        //Removing Acute drug
        await this.clickIssueTabThreeDotsButton(0);
        await this.clickIssueTabThreeDotsRemoveButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   0");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await expect(this.issueMedicationPanelPage.issueTabNoMedication).toContainText("No medication to issue yetGo to the Add tab and add some medication first.");
        //Adding drug via Add to Prescription
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Aspirin 300mg tablets");
        await this._page.waitForTimeout(10000);
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Diethylstilbestrol 1mg tablets");
        await this._page.waitForTimeout(10000);
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Glycopyrronium bromide 1mg tablets");
        //Removing the Repeat drug
        await this.clickIssueTabThreeDotsButton(1);
        await this.clickIssueTabThreeDotsRemoveButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   2");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(0)).toContainText("Aspirin 300mg");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(1)).toContainText("Glycopyrronium bromide 1mg tablets");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        //Removing Repeat Dispensing drug
        await this.clickIssueTabThreeDotsButton(1);
        await this.clickIssueTabThreeDotsRemoveButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   1");
        await expect(this.issueMedicationPanelPage.issuePanelDrugLists.nth(0)).toContainText("Aspirin 300mg");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeEnabled();
        //Removing Acute drug
        await this.clickIssueTabThreeDotsButton(0);
        await this.clickIssueTabThreeDotsRemoveButton();
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toHaveText("Issue   0");
        await expect(this.issueMedicationPanelPage.postDateIcon).toBeDisabled();
        await expect(this.issueMedicationPanelPage.issueTabNoMedication).toContainText("No medication to issue yetGo to the Add tab and add some medication first.");
    }

    async mockGetMedicationApiResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(multiple_eps_issued_drugs_get_meds_response_mock));
    }

    /**
     * Checks the 'structuredDosage' attribute in the network response for POST /prescriptions requests.
     * Ensures that the attribute exists and is null (until SD update is implemented in MKB).
     */
    async checkPrescriptionStructuredDosageAttributeInNetworkResponse() {
        // Collect POST /prescriptions requests with 201 status
        const requests: { request: any; response: any }[] = [];
        const listener = async (request: any) => {
            if (request.url().includes('/prescriptions') && request.method() === 'POST') {
                const response = await request.response();
                if (response && response.status() === 201) {
                    requests.push({ request, response });
                }
            }
        };

        this._page.on('requestfinished', listener);

        // Wait for network activity to finish (adjust timeout as needed)
        await this._page.waitForResponse(
            response =>
                response.url().includes('/prescriptions') &&
                response.request().method() === 'POST' &&
                response.status() === 201
        );

        // Remove the event listener to avoid side effects
        this._page.off('requestfinished', listener);

        if (requests.length === 0) {
            throw new Error('No POST /prescriptions request with 201 status found');
        }

        // Retrieve the request payload
        const payload = await requests[0].request.postDataJSON?.();
        const structuredDosage =
            payload?.data?.attributes?.prescriptions?.[0]?.prescriptionItems?.[0]?.structuredDosage;

        expect(structuredDosage).toBeDefined();
        // Expecting structuredDosage to be null until the SD update is implemented in MKB
        expect(structuredDosage).toBeNull();
    }

    async clickIssueButtonForStructuredDosageCheck() {
        await this.clickIssueTab();
        await this.viewLastDrugInIssueList();
        await this.clickIssueButton();
    }

    async verifyMigrationsDegradedAllergyErrorBanner() {
        await this.commonActions.mockUrl("**/allergies**", 200, () => JSON.stringify(migration_degraded_allergy_response));
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Paracetamol 500mg capsules", "gp2gp_degraded_allergy_error", "99", "65");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toBeVisible();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "errorCannot issue medicationThis patient's record has one or more degraded drug allergies from your organisation's migration to EMIS Web. These must be resolved before you can issue medication."
        );
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
    }

    async verifyGP2GPAndMigrationsDegradedAllergyErrorBanner() {
        await this.commonActions.mockUrl("**/allergies**", 200, () => JSON.stringify(gp2gp_and_migration_degraded_allergy_response));
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Paracetamol 500mg capsules", "gp2gp_degraded_allergy_error", "99", "65");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toBeVisible();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "errorCannot issue medicationThis patient's record has degraded drug allergies from a GP2GP transfer and from your organisation's migration to EMIS Web. These must be resolved before you can issue medication.");
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
    }

    async verifyGP2GPDegradedAllergyErrorBanner() {
        await this.commonActions.mockUrl("**/allergies**", 200, () => JSON.stringify(gp2gp_degraded_allergy_response));
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addAcuteMedication("Paracetamol 500mg capsules", "gp2gp_degraded_allergy_error", "99", "65");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toBeVisible();
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "errorCannot issue medicationThis patient's record has one or more GP2GP degraded drug allergies that must be resolved before you can issue medication.");
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
    }

    async verifyAllergyApiFailureBannerAndRecovery() {
        //await this.commonActions.mockUrl("**/allergies**", 200, () => JSON.stringify(gp2gp_degraded_allergy_response));
        // Block the allergies API endpoint
        await this.commonActions.blockAPI("**/allergies**");
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.clickPrescribeButton();
        // Add Repeat medication (simulate 100+ allergies scenario)
        await this.addMedicationPanelActions.addRepeatMedication("Paracetamol 500mg tablets", "addingrepeatdrug", "6", "6", "5", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        // Verify degraded allergy API error banner
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "EMIS-X couldn't load degraded drug allergy data. We don't know if this patient record has any drug allergy degrades, so we've disabled issuing until the data is there. Try loading it again."
        );
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();

        // Unblock the allergies API endpoint
        await this.commonActions.unblockAPI("**/allergies");
        await this.commonActions.mockUrl("**/allergies**", 200, () => JSON.stringify(gp2gp_degraded_allergy_response));
        // Click Try Again button on the error banner
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();

        // Wait for the new error banner to appear
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "This patient's record has one or more GP2GP degraded drug allergies that must be resolved before you can issue medication."
        );
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
    }

    async verifyAllergyApiFailureBannerAndRecoveryForNonDegradedAllergyPatient() {
        // Block the allergies API endpoint
        await this.commonActions.blockAPI("**/allergies**");
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Paracetamol 500mg tablets", "addingrepeatdrug", "6", "6", "5", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        // Verify degraded allergy API error banner
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "EMIS-X couldn't load degraded drug allergy data. We don't know if this patient record has any drug allergy degrades, so we've disabled issuing until the data is there. Try loading it again."
        );
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();

        // Unblock the allergies API endpoint
        await this.commonActions.unblockAPI("**/allergies**");
        // Click Try Again button on the error banner
        await this.issueMedicationPanelPage.button.tryAgain_failure.click();

        // Wait for the error banner to disappear
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).not.toBeVisible();
        await this.viewLastDrugInIssueList();
        await expect(this.issueMedicationPanelPage.button.issue).not.toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
    }

    async verifyDegradedAllergyApiFailureBannerNotShownForLessThan100Allergies() {
        // Block the allergies API endpoint
        await this.commonActions.blockAPI("**/allergies**");
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.commonActions.mockUrl("**/allergies**", 200, () => JSON.stringify(migration_degraded_allergy_response));
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Paracetamol 500mg tablets", "addingrepeatdrug", "6", "6", "5", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        // The degraded allergy API failure banner should NOT be visible
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).not.toContainText(
            "errorCannot issue medicationEMIS-X couldn't load degraded drug allergy data. We don't know if this patient record has any drug allergy degrades, so we've disabled issuing until the data is there. Try loading it again."
        );

        // The migration degraded allergy banner should be visible
        await expect(this.issueMedicationPanelPage.epsErrors.clinical_warnings_and_eps_check_api_failure_error).toContainText(
            "This patient's record has one or more degraded drug allergies from your organisation's migration to EMIS Web. These must be resolved before you can issue medication."
        );
        await expect(this.issueMedicationPanelPage.button.issue).toBeDisabled();
        await expect(this.issueMedicationPanelPage.button.issueLater).not.toBeDisabled();
        await this.clickIssueLaterButton();
        await this.medicationHomeActions.clickMedsRefreshButton();
        await this.commonActions.unblockAPI("**/allergies**");
    }

    async clickIssueMedicationTab() {
        await this.issueMedicationPanelPage.issueMedicationTab.click();
    }

    async verifyPrintedMedicationWarningText() {
        await expect(this.issueMedicationPanelPage.printMedicationWarning).toContainText(
            "This will be issued as a stored script and saved in EMIS Web. View and print stored scripts from the EMIS Ball > System Tools > Prescription Printing."
        );
    }

    async verifyEPSTroubleshootingGuideLinkRedirects() {
        await this.medicationHomeActions.clickPrescribeButton();
        await this.addMedicationPanelActions.addRepeatMedication("Paracetamol 500mg tablets", "addingrepeatdrug", "6", "6", "5", "Pharmacy Text", "Patient Text");
        await this.clickIssueTab();
        await expect(this.issueMedicationPanelPage.epsIssueBannerContent).toBeVisible();
        await expect(this.issueMedicationPanelPage.epsIssueBannerContent).toContainText("Cannot issue prescription via EPS.");
        await expect(this.issueMedicationPanelPage.epsIssueBannerContent).toContainText("EPS troubleshooting guide");
        const [newPage] = await Promise.all([
            this._page.context().waitForEvent("page"),
            this.issueMedicationPanelPage.epsIssueBannerContent.getByRole("link", { name: "EPS troubleshooting guide" }).click()
        ]);
        await newPage.waitForLoadState("domcontentloaded");
        expect(newPage.url()).toContain("https://emisprod.service-now.com/");
        await newPage.close();
        await expect(this.issueMedicationPanelPage.epsIssueBannerClose).toBeVisible();
        await this.issueMedicationPanelPage.epsIssueBannerClose.click();
        await expect(this.issueMedicationPanelPage.epsIssueBannerContent).not.toBeVisible();
        await this.clickIssueButton();
    }

    async verifyReissueWarning() {
        await this.medicationHomeActions.SearchAndAddMedicationToIssueTab("Paracetamol 500mg tablets");
        await expect(this.issueMedicationPanelPage.reissueWarning).toBeVisible();
        await expect(this.issueMedicationPanelPage.reissueWarning).toContainText("Already issued today.");
        await this.clickIssueLaterButton();
    }

    async validateEpsDeclarationTextDialog() {
        const epsEpsDeclarationText = 'The system will digitally sign this prescription on your behalf. Reauthenticate using your NHS Care Identity to confirm your intention to digitally sign and issue this electronic prescription.';
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText(epsEpsDeclarationText);
    }

    async verifyLateIssueWarningIsDisplayed() {
        const lateIssueWarning = this.issueMedicationPanelPage.lateIssueWarning;
        await expect(lateIssueWarning).toBeVisible();
        const warningTextContent = await lateIssueWarning.textContent();
        await expect(warningTextContent).toContain("Late issue warning: last issued");
    }

    async verifyMaximumIntervalWarningIsDisplayed() {
        const maximumIntervalWarning = this.issueMedicationPanelPage.maximumIntervalWarning;
        await expect(maximumIntervalWarning).toBeVisible();
        const warningTextContent = await maximumIntervalWarning.textContent();
        await expect(warningTextContent).toContain("days ago. Maximum interval set to");
        await expect(warningTextContent).toContain("days");
    }

    async verifyMaximumIntervalWarningIsDisplayedWithText(expectedText: string) {
        const maximumIntervalWarning = this.issueMedicationPanelPage.maximumIntervalWarning;
        await expect(maximumIntervalWarning).toBeVisible();
        const warningTextContent = await maximumIntervalWarning.textContent();
        await expect(warningTextContent).toContain(`Maximum interval set to ${expectedText}`);
    }

    async verifyMinimumIntervalWarningIsDisplayedWithText(expectedText: string) {
        const minimumIntervalWarning = this.issueMedicationPanelPage.minimumIntervalWarning;
        await expect(minimumIntervalWarning).toBeVisible();
        const warningTextContent = await minimumIntervalWarning.textContent();
        await expect(warningTextContent).toContain(`Minimum interval set to ${expectedText}`);
    }

    async verifyDrugLevelWarningIsDisplayedFirst() {
        const warnings = this.issueMedicationPanelPage.eachWarning;
        await expect(warnings.nth(0)).toBeVisible();
        await expect(warnings.nth(1)).toBeVisible();
        const firstWarningText = await warnings.nth(0).textContent();
        const secondWarningText = await warnings.nth(1).textContent();
        await expect(firstWarningText).toContain("Maximum interval set to");
        await expect(secondWarningText).toContain("Late issue warning: last issued");
    }

    async verifyMinimumIntervalWarningIsDisplayedFirst() {
        const warnings = this.issueMedicationPanelPage.eachWarning;
        await expect(warnings.nth(0)).toBeVisible();
        await expect(warnings.nth(1)).toBeVisible();
        const firstWarningText = await warnings.nth(0).textContent();
        const secondWarningText = await warnings.nth(1).textContent();
        await expect(firstWarningText).toContain("Minimum interval set to");
        await expect(secondWarningText).toContain("Maximum interval set to");
    }

    async verifyAlreadyIssuedTodayWarningIsDisplayed() {
        const alreadyIssuedTodayWarning = this.issueMedicationPanelPage.alreadyIssuedTodayWarning;
        await expect(alreadyIssuedTodayWarning).toBeVisible();
        const warningTextContent = await alreadyIssuedTodayWarning.textContent();
        await expect(warningTextContent).toEqual("Already issued today.");
    }

    async scollToWarningInfoPaneltBottom() {
        const medsPage = new RecordMedicationPage(this._page);
        const tableContainer = medsPage.clinicalWarningPanel;
        await tableContainer.scrollIntoViewIfNeeded();
        const tableHeight = await tableContainer.evaluate(
            (tableContainer) => tableContainer.scrollHeight
        );
        await tableContainer.evaluate((tableContainer, tableHeight) => {
            tableContainer.scrollTop = tableHeight;
        }, tableHeight);
        await this._page.waitForTimeout(3000);
    }

    async parseDate(dateString: string): Promise<Date> {
        const [day, monthStr, year] = dateString.split('-');
        if (!day || !monthStr || !year) {
            throw new Error(`Invalid date string format: "${dateString}"`);
        }
        const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(monthStr.toLowerCase());
        if (month === -1) {
            throw new Error(`Invalid month string: "${monthStr}"`);
        }
        return new Date(Number(year), month, Number(day));
    }

    async dateDifference(date1: Date, date2: Date): Promise<number> {
        const differenceInTime = date2.getTime() - date1.getTime();
        const diffDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return diffDays;
    }

    async verifyCorrectDateCountInLateIssueWarning(medicationName: string) {
        await this._page.waitForTimeout(4000);
        const medsPage = new RecordMedicationPage(this._page);
        const dateForDrug = `//tr[td/div/div/div/button/span[contains(text(),'${medicationName}')]]/td[4]`;
        await medsPage.recordCloseButton.click();
        await this._page.locator("//button[text()='Close']").click();
        await this._page.waitForTimeout(2000);
        const dateText = await this._page.locator(dateForDrug).textContent();
        const kebabMenuForADrug = `//tr[td/div/div/div/button/span[contains(text(),'${medicationName}')]]/td/button[@data-testid='currentMoreOptionsButton']`;
        await this._page.waitForSelector(kebabMenuForADrug);
        await this._page.locator(kebabMenuForADrug).click();
        const isAlertBannerVisible = await medsPage.clinicalWarningPanel.isVisible();
        if (isAlertBannerVisible) {
            await this.scollToWarningInfoPaneltBottom();
            await medsPage.drugInfoWarningProceedButton.click();
            await this._page.waitForTimeout(2000);
        }
        await this.medicationHomePage.currentMedicationMoreOptions.addToPrescription.click();
        const TargetDate = await this.parseDate((dateText ?? '').trim());
        const today = new Date();
        const dateDifference = await this.dateDifference(today, TargetDate);
        const lateIssueWarning = await this.issueMedicationPanelPage.lateIssueWarning;
        const warningTextContent = await lateIssueWarning.textContent();
        expect(warningTextContent).toEqual(`Late issue warning: last issued ${dateDifference * (-1)} days ago.`);
    }

    async checkIssueTabIsDisabled() {
        await this.issueMedicationPanelPage.issueMedicationTab.waitFor({ state: "visible" });
        await expect(this.issueMedicationPanelPage.issueMedicationTab).toBeDisabled();
    }
}