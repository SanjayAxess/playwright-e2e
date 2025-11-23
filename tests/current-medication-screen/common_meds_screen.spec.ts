import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("common medication screen", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });

    test("Validating No shared data banner in current screen", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ medicationHomeActions }) => {
        await medicationHomeActions.validateNoSharedDataBannerIsDisplayedIfPatientHaveCurrentDrugs();
        await medicationHomeActions.validateNoSharedDataBannerIsDisplayedIfPatientHaveNoCurrentDrugs();
        await medicationHomeActions.validateNoSharedDataBannerIsNotDisplayedAfterClickingDismiss();
    });

    test("Validating Confidential Record Screen", { tag: ["@regression", "@all", "@view_meds_prod"] }, async ({ medicationHomeActions }) => {
        await medicationHomeActions.validateConfidentialRecordScreenIsNotVisibleIfPatientIsConfidentialAndAccessibleByUser();
        await medicationHomeActions.validateConfidentialRecordScreenIsNotVisibleIfPatientIsConfidentialAndNotAccessibleByUser();
        await medicationHomeActions.validateConfidentialRecordScreenIsNotVisibleIfPatientIsNotConfidential();
    });

});
