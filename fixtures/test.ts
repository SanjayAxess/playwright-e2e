import { mergeTests } from "@playwright/test";
import { test as base, TestOptions } from "@emisgroup/xgp-playwright-boilerplate";
import { PatientSelectPage } from "../pages/patient-select-page";
import { AddMedicationPanelPage } from "../pages/prescribe-add-medication-panel-page";
import { ClinicalWarningPopupPage } from "../pages/clinical-warning-popup-page";
import { MedicationHomePage } from "../pages/medication-home-page";
import { IssueMedicationPanelPage } from "../pages/prescribe-issue-medication-panel-page";
import { IssueMedicationPanelActions } from "../actions/prescribe-issue-medication-panel-actions";
import { CommonActions } from "../actions/common-actions";
import { AddMedicationPanelActions } from "../actions/prescribe-add-medication-panel-actions";
import { ClinicalWarningPopupActions } from "../actions/clinical-warning-popup-actions";
import { MedicationHomeActions } from "../actions/medication-home-actions";
import { RecordMedicationPage } from "../pages/record-medication-page";
import { RecordMedicationPanelActions } from "../actions/record-medication-actions";
import { CancelMedicationPage } from "../pages/cancel-medication-page";
import { IssueMethodPage } from "../pages/prescribe-drug-issue-method-page";
import { CancelMedicationPanelActions } from "../actions/cancel-medication-panel-actions";
import { VisualTestActions } from "../actions/visual-test-actions";
import { RegimeReviewPage } from "../pages/regime-review-page";
import { RegimeReviewActions } from "../actions/regime-review-actions";
import { MedicationBadgesActions } from "../actions/medication-badges-actions";
import { RequestIssuePage } from "../pages/request-issue-page";
import { RequestIssueActions } from "../actions/request-issue-actions";
import { EndCourseMedicationActions } from "../actions/end-medication-actions";
import { DeleteMedicationActions } from "../actions/delete-medication-action";
import { EditMedicationActions } from "../actions/edit-medication-panel-actions";
import { EndCourseMedicationPage } from "../pages/end-medication-page";


export type TestConfig = {
  personGuid?: string;
} & PageFixtures & TestOptions & ActionFixtures;

export type PageFixtures = {
  patient: PatientSelectPage;
  addMedication: AddMedicationPanelPage;
  clinicalWarning: ClinicalWarningPopupPage;
  medicationHome: MedicationHomePage;
  issueMedication: IssueMedicationPanelPage;
  recordMedication: RecordMedicationPage;
  cancelMedication: CancelMedicationPage;
  issueMethods: IssueMethodPage;
  regimeReview: RegimeReviewPage;
  requestIssue: RequestIssuePage;
  endCourseMedicationPage: EndCourseMedicationPage;
};

export type ActionFixtures = {
  issueMedicationPanelActions: IssueMedicationPanelActions;
  commonActions: CommonActions;
  addMedicationPanelActions: AddMedicationPanelActions;
  clinicalWarningPopupActions: ClinicalWarningPopupActions;
  medicationHomeActions: MedicationHomeActions;
  recordMedicationPanelActions: RecordMedicationPanelActions;
  cancelMedicationPanelActions: CancelMedicationPanelActions;
  visualTestActions: VisualTestActions;
  regimeReviewActions: RegimeReviewActions;
  medicationBadgesActions: MedicationBadgesActions;
  requestIssueActions: RequestIssueActions;
  endCourseActions: EndCourseMedicationActions;
  deleteMedicationActions: DeleteMedicationActions;
  editMedicationActions: EditMedicationActions;
};

export const pages = base.extend<PageFixtures>({
  patient: async ({ page }, use) => {
    const patientSelectPage = new PatientSelectPage(page);
    await use(patientSelectPage);
  },
  addMedication: async ({ page }, use) => {
    const addMedicationPanelPage = new AddMedicationPanelPage(page);
    await use(addMedicationPanelPage);
  },
  clinicalWarning: async ({ page }, use) => {
    const clinicalWarningPopupPage = new ClinicalWarningPopupPage(page);
    await use(clinicalWarningPopupPage);
  },
  medicationHome: async ({ page }, use) => {
    const medicationHomePage = new MedicationHomePage(page);
    await use(medicationHomePage);
  },
  issueMedication: async ({ page }, use) => {
    const issueMedicationPanelPage = new IssueMedicationPanelPage(page);
    await use(issueMedicationPanelPage);
  },
  recordMedication: async ({ page }, use) => {
    const recordMedicationPanelPage = new RecordMedicationPage(page);
    await use(recordMedicationPanelPage);
  },
  cancelMedication: async ({ page }, use) => {
    const cancelMedicationPanelPage = new CancelMedicationPage(page);
    await use(cancelMedicationPanelPage);
  },
  issueMethods: async ({ page }, use) => {
    const issueMethodPage = new IssueMethodPage(page);
    await use(issueMethodPage);
  },
  regimeReview: async ({ page }, use) => {
    const regimeReviewPage = new RegimeReviewPage(page);
    await use(regimeReviewPage);
  },
  requestIssue: async ({ page }, use) => {
    const requestIssuePage = new RequestIssuePage(page);
    await use(requestIssuePage);
  },
  endCourseMedicationPage: async ({ page }, use) => {
    const endCourseMedicationPage = new EndCourseMedicationPage(page);
    await use(endCourseMedicationPage);
  }
});

export const actions = base.extend<ActionFixtures>({
  issueMedicationPanelActions: async ({ page }, use) => {
    const issueMedicationPanelActions = new IssueMedicationPanelActions(page);
    await use(issueMedicationPanelActions);
  },
  commonActions: async ({ page }, use) => {
    const commonActions = new CommonActions(page);
    await use(commonActions);
  },
  addMedicationPanelActions: async ({ page }, use) => {
    const addMedicationPanelActions = new AddMedicationPanelActions(page);
    await use(addMedicationPanelActions);
  },
  clinicalWarningPopupActions: async ({ page }, use) => {
    const clinicalWarningPopupActions = new ClinicalWarningPopupActions(page);
    await use(clinicalWarningPopupActions);
  },
  medicationHomeActions: async ({ page }, use) => {
    const medicationHomeActions = new MedicationHomeActions(page);
    await use(medicationHomeActions);
  },
  recordMedicationPanelActions: async ({ page }, use) => {
    const recordMedicationPanelActions = new RecordMedicationPanelActions(page);
    await use(recordMedicationPanelActions);
  },
  cancelMedicationPanelActions: async ({ page }, use) => {
    const cancelMedicationPanelActions = new CancelMedicationPanelActions(page);
    await use(cancelMedicationPanelActions);
  },
  visualTestActions: async ({ page }, use) => {
    const visualTestActions = new VisualTestActions(page);
    await use(visualTestActions);
  },
  regimeReviewActions: async ({ page }, use) => {
    const regimeReviewActions = new RegimeReviewActions(page);
    await use(regimeReviewActions);
  },
  medicationBadgesActions: async ({ page }, use) => {
    const medicationBadgesActions = new MedicationBadgesActions(page);
    await use(medicationBadgesActions);
  },
  requestIssueActions: async ({ page }, use) => {
    const requestIssueActions = new RequestIssueActions(page);
    await use(requestIssueActions);
  },
  endCourseActions: async ({ page }, use) => {
    const endCourseActions = new EndCourseMedicationActions(page);
    await use(endCourseActions);
  },
  deleteMedicationActions: async ({ page }, use) => {
    const deleteMedicationActions = new DeleteMedicationActions(page);
    await use(deleteMedicationActions);
  },
  editMedicationActions: async ({ page }, use) => {
    const editMedicationActions = new EditMedicationActions(page);
    await use(editMedicationActions);
  }
});

export const options = base.extend<TestConfig>({
  personGuid: ["ebb50c69-1324-4423-8e0a-eb8471fe5dbc", { option: true }]
});

export const test = mergeTests(options, pages, actions);