import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic, feature } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { expect } from "@playwright/test";

test.describe("Show More and Less Button for info for pharmacy and patient sections on current medication", () => {
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


    test('Verify the functionality of show more and show less button for pharmacy and patient info section_ long texts ', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText, medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
        await expect(medicationHome.patientInfoTitle).toBeVisible();
        await expect(medicationHome.pharmacyInfoText).toBeVisible();
        await expect(medicationHome.patientInfoText).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeEnabled();
        await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeEnabled();
        await medicationHome.pharmacyInfoShowMoreButton.click();
        await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoMoreText);
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
        await medicationHome.patientInfoShowMoreButton.click();
        await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoMoreText);
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
    });

    test('Verify the functionality of show more and show less button for pharmacy and patient info section for different break points', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText, medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);

        const breakpoints = [
            { width: 1500, height: 1200 },
            { width: 992, height: 1200 },
            { width: 768, height: 1200 },
            { width: 576, height: 1200 },
            { width: 320, height: 1200 }
        ];

        for (const breakpoint of breakpoints) {
            await page.setViewportSize(breakpoint);
            await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
            await expect(medicationHome.patientInfoTitle).toBeVisible();
            await expect(medicationHome.pharmacyInfoText).toBeVisible();
            await expect(medicationHome.patientInfoText).toBeVisible();
            await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
            await expect(medicationHome.pharmacyInfoShowMoreButton).toBeEnabled();
            await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
            await expect(medicationHome.patientInfoShowMoreButton).toBeEnabled();
            await medicationHome.pharmacyInfoShowMoreButton.click();
            await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoMoreText);
            await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
            await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
            await medicationHome.patientInfoShowMoreButton.click();
            await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoMoreText);
            await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
            await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
            await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
            await medicationHome.pharmacyInfoShowLessButton.click();
            await medicationHome.patientInfoShowLessButton.click();
        }
    });


    test('Verify the functionality of show more and show less button for pharmacy and patient info section when multiple medications are present - long texts ', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        const medication1 = "Aspirin 75mg tablets";
        const medication2 = "Co-cyprindiol 2000microgram";
        await addMedicationPanelActions.addAcuteMedication(medication1, randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText, medicationHome.patientInfoMoreText);
        await addMedicationPanelActions.addAcuteMedication(medication2, randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText, medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await expect(medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication1)).toBeVisible();
        await expect(medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication1)).toBeVisible();
        await expect(medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication1)).toBeEnabled();
        await expect(medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication1)).toBeEnabled();
        await expect(medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication2)).toBeVisible();
        await expect(medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication2)).toBeVisible();
        await expect(medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication2)).toBeEnabled();
        await expect(medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication2)).toBeEnabled();
        expect(await medicationHomeActions.getPatientInfoShowMoreButtonCount()).toEqual(2);
        expect(await medicationHomeActions.getPharmacyInfoShowMoreButtonCount()).toEqual(2);
        await medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication1).click();
        await expect(medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication1)).not.toBeVisible();
        await expect(medicationHome.getPharmacyInfoShowLessButtonForTheMedication(medication1)).toBeVisible();
        await medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication2).click();
        await expect(medicationHome.getPharmacyInfoShowMoreButtonForTheMedication(medication2)).not.toBeVisible();
        await expect(medicationHome.getPharmacyInfoShowLessButtonForTheMedication(medication2)).toBeVisible();
        await medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication1).click();
        await expect(medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication1)).not.toBeVisible();
        await expect(medicationHome.getPatientInfoShowLessButtonForTheMedication(medication1)).toBeVisible();
        await medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication2).click();
        await expect(medicationHome.getPatientInfoShowMoreButtonForTheMedication(medication2)).not.toBeVisible();
        await expect(medicationHome.getPatientInfoShowLessButtonForTheMedication(medication2)).toBeVisible();
        expect(await medicationHomeActions.getPatientInfoShowLessButtonCount()).toEqual(2);
        expect(await medicationHomeActions.getPharmacyInfoShowLessButtonCount()).toEqual(2);
    });

    test('Verify whether the pharmacy info label and respective showmore button is not displayed while adding medication without that details', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", '', medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).not.toBeVisible();
        await expect(medicationHome.patientInfoTitle).toBeVisible();
        await expect(medicationHome.pharmacyInfoText).not.toBeVisible();
        await expect(medicationHome.patientInfoText).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeEnabled();
        await medicationHome.patientInfoShowMoreButton.click();
        await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoMoreText);
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
    });

    test('Verify whether the patient info label and respective showmore button is not displayed while adding medication without that details', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
        await expect(medicationHome.patientInfoTitle).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoText).toBeVisible();
        await expect(medicationHome.patientInfoText).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeEnabled();
        await medicationHome.pharmacyInfoShowMoreButton.click();
        await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoMoreText);
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeEnabled();
    });


    test('Verify show more and show less buttons are only displayed for pharmacy and patient info section with less text on small screens', { tag: ["@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions }) => {
        await page.setViewportSize({ width: 1500, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoLessText, medicationHome.patientInfoLessText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
        await expect(medicationHome.patientInfoTitle).toBeVisible();
        await expect(medicationHome.pharmacyInfoText).toBeVisible();
        await expect(medicationHome.patientInfoText).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await page.setViewportSize({ width: 576, height: 1000 });
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
        await medicationHome.pharmacyInfoShowMoreButton.click();
        await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoLessText);
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
        await medicationHome.patientInfoShowMoreButton.click();
        await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoLessText);
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
    });

});

test.describe("Show More and Less Button for info for pharmacy and patient sections on past medication", () => {
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


    test('Verify the functionality of show more and show less button for pharmacy and patient info section in past medication screen', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText, medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
        await expect(medicationHome.patientInfoTitle).toBeVisible();
        await expect(medicationHome.pharmacyInfoText).toBeVisible();
        await expect(medicationHome.patientInfoText).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeEnabled();
        await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeEnabled();
        await medicationHome.pharmacyInfoShowMoreButton.click();
        await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoMoreText);
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
        await medicationHome.patientInfoShowMoreButton.click();
        await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoMoreText);
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
    });

    test('Verify the functionality of show more and show less button for pharmacy and patient info section for different break points in past medication screen', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText, medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);

        const breakpoints = [
            { width: 1500, height: 1200 },
            { width: 992, height: 1200 },
            { width: 768, height: 1200 },
            { width: 576, height: 1200 },
            { width: 320, height: 1200 }
        ];

        for (const breakpoint of breakpoints) {
            await page.setViewportSize(breakpoint);
            await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
            await expect(medicationHome.patientInfoTitle).toBeVisible();
            await expect(medicationHome.pharmacyInfoText).toBeVisible();
            await expect(medicationHome.patientInfoText).toBeVisible();
            await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
            await expect(medicationHome.pharmacyInfoShowMoreButton).toBeEnabled();
            await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
            await expect(medicationHome.patientInfoShowMoreButton).toBeEnabled();
            await medicationHome.pharmacyInfoShowMoreButton.click();
            await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoMoreText);
            await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
            await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
            await medicationHome.patientInfoShowMoreButton.click();
            await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoMoreText);
            await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
            await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
            await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
            await medicationHome.pharmacyInfoShowLessButton.click();
            await medicationHome.patientInfoShowLessButton.click();
        }
    });

    test('Verify whether the pharmacy info label and respective showmore button is not displayed while adding medication without that details in past medication screen', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", '', medicationHome.patientInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).not.toBeVisible();
        await expect(medicationHome.patientInfoTitle).toBeVisible();
        await expect(medicationHome.pharmacyInfoText).not.toBeVisible();
        await expect(medicationHome.patientInfoText).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeEnabled();
        await medicationHome.patientInfoShowMoreButton.click();
        await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoMoreText);
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
    });

    test('Verify whether the patient info label and respective showmore button is not displayed while adding medication without that details_past medication', { tag: ["@regression", "@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await page.setViewportSize({ width: 1200, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoMoreText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
        await expect(medicationHome.patientInfoTitle).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoText).toBeVisible();
        await expect(medicationHome.patientInfoText).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeEnabled();
        await medicationHome.pharmacyInfoShowMoreButton.click();
        await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoMoreText);
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeEnabled();
    });


    test('Verify show more and show less buttons are only displayed for pharmacy and patient info section with less text on small screens_past medication', { tag: ["@US416584", "@US404690"] }, async ({ page, commonActions, medicationHome, medicationHomeActions, addMedicationPanelActions, endCourseActions }) => {
        await page.setViewportSize({ width: 1500, height: 1000 });
        await medicationHomeActions.clickPrescribeButton();
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150", medicationHome.pharmacyInfoLessText, medicationHome.patientInfoLessText);
        await medicationHomeActions.clickDetailPanelCloseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.searchCurrentMedication(randomGuid);
        await medicationHomeActions.clickCurrentMoreOptionsButton();
        await endCourseActions.clickCurrentMedsEndCourseButton();
        await endCourseActions.clickEndCourseButton();
        await medicationHomeActions.clickMedsRefreshButton();
        await medicationHomeActions.clickPastMedicationTab();
        await medicationHomeActions.searchPastMedication(randomGuid);
        await expect(medicationHome.pharmacyInfoTitle).toBeVisible();
        await expect(medicationHome.patientInfoTitle).toBeVisible();
        await expect(medicationHome.pharmacyInfoText).toBeVisible();
        await expect(medicationHome.patientInfoText).toBeVisible();
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await page.setViewportSize({ width: 320, height: 1000 });
        await expect(medicationHome.pharmacyInfoShowMoreButton).toBeVisible();
        await expect(medicationHome.patientInfoShowMoreButton).toBeVisible();
        await medicationHome.pharmacyInfoShowMoreButton.click();
        await expect(medicationHome.pharmacyInfoText).toContainText(medicationHome.pharmacyInfoLessText);
        await expect(medicationHome.pharmacyInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.pharmacyInfoShowLessButton).toBeVisible();
        await medicationHome.patientInfoShowMoreButton.click();
        await expect(medicationHome.patientInfoText).toContainText(medicationHome.patientInfoLessText);
        await expect(medicationHome.patientInfoShowMoreButton).not.toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeVisible();
        await expect(medicationHome.patientInfoShowLessButton).toBeEnabled();
    });
});