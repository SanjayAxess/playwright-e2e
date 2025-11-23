import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";


test.describe("Visual test", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });
    test("Validate the prescribe panel_visual testing", { tag: ["@visual"] }, async ({ page, visualTestActions, medicationHome, medicationHomeActions, commonActions, addMedication }) => {
        await commonActions.updateScreenSize(1200, 800);
        await medicationHome.button.prescribe_large.waitFor({ state: 'visible' });
        await medicationHomeActions.clickPrescribeButton();
        await addMedication.prescriptionType.acute.waitFor({ state: 'visible' });
        const baselineImagePath = "./visual-baseline-images/baseline-medication-page-prescribe-panel.png";
        const currentImagePath = "./visual-current-images/current-medication-prescribe-panel.png";
        const diffImagePath = "./visual-difference-images/diff-medication-prescribe-panel.png";
        await visualTestActions.compareAndUpdateBaseline(
            page,
            baselineImagePath,
            currentImagePath,
            diffImagePath,
            100,
            0.1,
            { x: 720, y: 150, width: 500, height: 650 }
        );
    });

    test("Validate medication page record, refresh, and prescribe button_visual testing", { tag: ["@visual"] }, async ({ page, visualTestActions, commonActions, medicationHome }) => {
        await commonActions.updateScreenSize(1500, 800);
        await medicationHome.button.prescribe_large.waitFor({ state: 'visible' });
        const baselineImagePath = "./visual-baseline-images/baseline-medication-page-record-refresh-prescribe-button.png";
        const currentImagePath = "./visual-current-images/current-medication-page-record-refresh-prescribe-button.png";
        const diffImagePath = "./visual-difference-images/diff-medication-page-record-refresh-prescribe-button.png";
        await visualTestActions.compareAndUpdateBaseline(
            page,
            baselineImagePath,
            currentImagePath,
            diffImagePath,
            100,
            0.1,
            { x: 300, y: 140, width: 1500, height: 50 }
        );
    });
});
