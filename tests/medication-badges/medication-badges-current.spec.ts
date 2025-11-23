import { expect, Locator, Page } from "@playwright/test";
import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";


test.describe("Medication badges validation", () => {
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

    const fp10pcdExamples = [
        { width: 1200, height: 1200, row: 8, column: 2, expectedValue: "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet" },
        { width: 992, height: 1200, row: 8, column: 2, expectedValue: "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet" },
        { width: 768, height: 1200, row: 8, column: 2, expectedValue: "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet" },
        { width: 600, height: 1200, row: 8, column: 2, expectedValue: "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet" },
        { width: 320, height: 1200, row: 8, column: 2, expectedValue: "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet More actions Last issued: 05-Jun-2025 Issue method: Print (Stored)" },
    ];

    for (const { width, height, row, column, expectedValue } of fp10pcdExamples) {
        test(`Verify whether the 'FP10PCD' badge is displayed at left hand of the drug name for current medication at ${width}x${height}`, { tag: ["@US412498"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Diamorphine');
        });
    }

    const pastFp10pcdExamples = [
        { width: 1200, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 992, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 768, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 600, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 320, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of pastFp10pcdExamples) {
        test(`Verify whether the 'FP10PCD' badge is displayed at left hand of the drug name for past medication at ${width}x${height}`, { tag: ["@US412498"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.selectPastMedicationPage();
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Clobazam 20mg tablets');
        });
    }

    const privateBadgeExamples = [
        { width: 1200, height: 1200, row: 3, column: 2, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 22 tablet" },
        { width: 992, height: 1200, row: 3, column: 2, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 22 tablet" },
        { width: 768, height: 1200, row: 3, column: 2, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 22 tablet" },
        { width: 600, height: 1200, row: 3, column: 2, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 22 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of privateBadgeExamples) {
        test(`Verify whether private badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await page.waitForTimeout(4000);
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 10mg tablets');
        });
    }

    const privatePaBadgeExamples = [
        { width: 1200, height: 1200, row: 4, column: 2, expectedValue: "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet" },
        { width: 992, height: 1200, row: 4, column: 2, expectedValue: "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet" },
        { width: 768, height: 1200, row: 4, column: 2, expectedValue: "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet" },
        { width: 600, height: 1200, row: 4, column: 2, expectedValue: "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet" },
        { width: 320, height: 1200, row: 4, column: 2, expectedValue: "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of privatePaBadgeExamples) {
        test(`Verify whether private, Personally administered badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await page.waitForTimeout(4000);
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 20mg tablets');
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Atorvastatin 20mg tablets');
        });
    }

    const slsBadgeExamples = [
        { width: 1200, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 992, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 768, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 600, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 320, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of slsBadgeExamples) {
        test(`Verify whether SLS badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await page.waitForTimeout(2000);
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('SLS', 'Clobazam');
        });
    }

    const ocBadgeExamples = [
        { width: 1200, height: 1200, row: 6, column: 2, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet" },
        { width: 992, height: 1200, row: 6, column: 2, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet" },
        { width: 768, height: 1200, row: 6, column: 2, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet" },
        { width: 600, height: 1200, row: 6, column: 2, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet" },
        { width: 320, height: 1200, row: 6, column: 2, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of ocBadgeExamples) {
        test(`Verify whether OC badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('OC', 'Co-cyprindiol');
        });
    }

    const assortedFlavoursBadgeExamples = [
        { width: 1200, height: 1200, row: 10, column: 2, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 992, height: 1200, row: 10, column: 2, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 768, height: 1200, row: 10, column: 2, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 600, height: 1200, row: 10, column: 2, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 320, height: 1200, row: 10, column: 2, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
    ];

    for (const { width, height, row, column, expectedValue } of assortedFlavoursBadgeExamples) {
        test(`Verify whether assorted flavours badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Assorted flavours', 'Fortisip');
        });
    }

    const fsBadgeExamples = [
        { width: 1200, height: 1200, row: 7, column: 2, expectedValue: "CDDiamorphine 10mg tabletsFSTest, 1 tablet" },
        { width: 600, height: 1200, row: 7, column: 2, expectedValue: "CDDiamorphine 10mg tabletsFSTest, 1 tablet" },
        { width: 320, height: 1200, row: 7, column: 2, expectedValue: "CDDiamorphine 10mg tabletsFSTest, 1 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of fsBadgeExamples) {
        test(`Verify whether FS badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('FS', 'Diamorphine');
        });
    }

    const personallyAdministeredBadgeExamples = [
        { width: 1200, height: 1200, row: 12, column: 2, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 992, height: 1200, row: 12, column: 2, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 768, height: 1200, row: 12, column: 2, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 760, height: 1200, row: 12, column: 2, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 320, height: 1200, row: 12, column: 2, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
    ];

    for (const { width, height, row, column, expectedValue } of personallyAdministeredBadgeExamples) {
        test(`Verify whether Personally administered badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Prednisolone');
        });
    }

    const variableUseBadgeExamples = [
        { width: 1200, height: 1200, row: 13, column: 2, expectedValue: "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml" },
        { width: 992, height: 1200, row: 13, column: 2, expectedValue: "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml" },
        { width: 768, height: 1200, row: 13, column: 2, expectedValue: "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml" },
        { width: 600, height: 1200, row: 13, column: 2, expectedValue: "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml" },
        { width: 320, height: 1200, row: 13, column: 2, expectedValue: "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml" },
    ];

    for (const { width, height, row, column, expectedValue } of variableUseBadgeExamples) {
        test(`Verify whether Variable use badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Variable use', 'Latanoprost');
        });
    }

    const instalmentPrescribedBadgeExamples = [
        { width: 1200, height: 1200, row: 11, column: 2, expectedValue: "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml" },
        { width: 992, height: 1200, row: 11, column: 2, expectedValue: "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml" },
        { width: 768, height: 1200, row: 11, column: 2, expectedValue: "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml" },
        { width: 600, height: 1200, row: 11, column: 2, expectedValue: "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml" },
        { width: 320, height: 1200, row: 11, column: 2, expectedValue: "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml" },
    ];

    for (const { width, height, row, column, expectedValue } of instalmentPrescribedBadgeExamples) {
        test(`Verify whether Instalment prescribed badge is displayed next to drug name in current medication screen at ${width}x${height}`, { tag: ["@US412498", "@US418272"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Instalment prescribed', 'Methadone');
        });
    }

    const nonDmdBadgeExamples = [
        { width: 1200, height: 1200, row: 2, column: 2, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
        { width: 600, height: 1200, row: 2, column: 2, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
        { width: 320, height: 1200, row: 2, column: 2, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
    ];

    for (const { width, height, row, column, expectedValue } of nonDmdBadgeExamples) {
        test(`Verify whether the 'Non dm+d' badge is displayed at left hand of the drug name for current medication at ${width}x${height}`, { tag: ["@US412498", "@US266493"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');
        });
    }

    const pastNonDmdBadgeExamples = [
        { width: 1200, height: 1200, row: 1, column: 1, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
        { width: 992, height: 1200, row: 1, column: 1, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
        { width: 768, height: 1200, row: 1, column: 1, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
        { width: 600, height: 1200, row: 1, column: 1, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
        { width: 320, height: 1200, row: 1, column: 1, expectedValue: "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram" },
    ];

    for (const { width, height, row, column, expectedValue } of pastNonDmdBadgeExamples) {
        test(`Verify whether the 'Non dm+d' badge is displayed at left hand of the drug name for past medication at ${width}x${height}`, { tag: ["@US412498", "@US266493"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.selectPastMedicationPage();
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');
        });
    }

    const cdBadgeExamples = [
        { width: 1200, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 992, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 768, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 600, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
        { width: 320, height: 1200, row: 5, column: 2, expectedValue: "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of cdBadgeExamples) {
        test(`Verify whether the 'CD' badge is displayed at left hand of the drug name for current medication at ${width}x${height}`, { tag: ["@US412498", "@US266493"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 10mg tablets');
        });
    }

    const pastCdBadgeExamples = [
        { width: 1200, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 992, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 768, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 600, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 320, height: 1200, row: 3, column: 1, expectedValue: "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
    ];

    for (const { width, height, row, column, expectedValue } of pastCdBadgeExamples) {
        test(`Verify whether the 'CD' badge is displayed at left hand of the drug name for past medication at ${width}x${height}`, { tag: ["@US412498", "@US266493"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.selectPastMedicationPage();
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 20mg tablets');
        });
    }

    const hrtBadgeExamples = [
        { width: 1200, height: 1200, row: 9, column: 2, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
        { width: 992, height: 1200, row: 9, column: 2, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
        { width: 768, height: 1200, row: 9, column: 2, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
        { width: 600, height: 1200, row: 9, column: 2, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
        { width: 320, height: 1200, row: 9, column: 2, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
    ];

    for (const { width, height, row, column, expectedValue } of hrtBadgeExamples) {
        test(`Verify whether the 'HRT' badge is displayed at right hand of the drug name for current medication at ${width}x${height}`, { tag: ["@US412498", "@US266493"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');
        });
    }

    const pastHrtBadgeExamples = [
        { width: 1200, height: 1200, row: 6, column: 1, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessaryReason stopped: test" },
        { width: 992, height: 1200, row: 6, column: 1, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
        { width: 768, height: 1200, row: 6, column: 1, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessaryReason stopped: test" },
        { width: 600, height: 1200, row: 6, column: 1, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessaryReason stopped: test" },
        { width: 320, height: 1200, row: 6, column: 1, expectedValue: "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary" },
    ];

    for (const { width, height, row, column, expectedValue } of pastHrtBadgeExamples) {
        test(`Verify whether the 'HRT' badge is displayed at right hand of the drug name for past medication at ${width}x${height}`, { tag: ["@US412498", "@US266493"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
            await page.waitForLoadState('load');
            await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
            await page.setViewportSize({ width, height });
            await medicationBadgesActions.selectPastMedicationPage();
            await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');
        });
    }

    const allBadgesBreakpoints = [
        { width: 1200, height: 1500 },
        { width: 992, height: 1500 },
        { width: 768, height: 1500 },
        { width: 600, height: 1500 },
        { width: 320, height: 1600 },
    ];

    for (const { width, height } of allBadgesBreakpoints) {
        test(`Validate all badges are displayed for current medication at ${width}x${height}`, { tag: ["@US412498", "@US418272", "@US266493", "@regression"] }, async ({ page, medicationBadgesActions, medicationHomeActions, medicationHome }) => {
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationHome.currentMedicationTab.waitFor({ state: 'visible' });
            // FP10PCD
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Diamorphine');
            // Private
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 10mg tablets');
            // Private + Personally administered
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 20mg tablets');
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Atorvastatin 20mg tablets');
            // SLS
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('SLS', 'Clobazam');
            // OC
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('OC', 'Co-cyprindiol');
            // Assorted flavours
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Assorted flavours', 'Fortisip');
            // FS
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('FS', 'Diamorphine');
            // Personally administered
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Prednisolone');
            // Variable use
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Variable use', 'Latanoprost');
            // Instalment prescribed
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Instalment prescribed', 'Methadone');
            // Non dm+d
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');
            // CD
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 10mg tablets');
            // HRT
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');
        });
    }


    const allBadgeBreakpoints = [
        { width: 1200, height: 1500 },
        { width: 992, height: 1500 },
        { width: 768, height: 1500 },
        { width: 600, height: 1500 },
        { width: 320, height: 1600 },
    ];

    for (const { width, height } of allBadgeBreakpoints) {
        test(`Validate all badge types and cell values are displayed and verified in current and past medication screens at ${width}x${height}`, { tag: ["@US412498", "@US418272", "@US266493", "@regression"] }, async ({ page, medicationBadgesActions, medicationHomeActions, medicationHome }) => {
            await medicationHomeActions.getMedicationBadgesResponse_Mock();
            await page.setViewportSize({ width, height });
            await medicationHome.currentMedicationTab.waitFor({ state: 'visible' });
            await medicationBadgesActions.verifyTableCellValue(8, 2, "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Diamorphine');

            await medicationBadgesActions.verifyTableCellValue(3, 2, "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 22 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 10mg tablets');

            await medicationBadgesActions.verifyTableCellValue(4, 2, "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 20mg tablets');
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Atorvastatin 20mg tablets');

            await medicationBadgesActions.verifyTableCellValue(5, 2, "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('SLS', 'Clobazam');

            await medicationBadgesActions.verifyTableCellValue(6, 2, "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('OC', 'Co-cyprindiol');

            await medicationBadgesActions.verifyTableCellValue(10, 2, "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Assorted flavours', 'Fortisip');

            await medicationBadgesActions.verifyTableCellValue(7, 2, "CDDiamorphine 10mg tabletsFSTest, 1 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('FS', 'Diamorphine');

            await medicationBadgesActions.verifyTableCellValue(12, 2, "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Prednisolone');

            await medicationBadgesActions.verifyTableCellValue(13, 2, "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Variable use', 'Latanoprost');

            await medicationBadgesActions.verifyTableCellValue(11, 2, "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Instalment prescribed', 'Methadone');

            await medicationBadgesActions.verifyTableCellValue(2, 2, "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram");
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');

            await medicationBadgesActions.verifyTableCellValue(5, 2, "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 10mg tablets');

            await medicationBadgesActions.verifyTableCellValue(9, 2, "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');

            await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
            await medicationBadgesActions.selectPastMedicationPage();

            await medicationBadgesActions.verifyTableCellValue(3, 1, "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Clobazam 20mg tablets');

            await medicationBadgesActions.verifyTableCellValue(2, 1, "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 10mg tablets');

            await medicationBadgesActions.verifyTableCellValue(1, 1, "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram");
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');

            await medicationBadgesActions.verifyTableCellValue(3, 1, "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet");
            await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 20mg tablets');

            await medicationBadgesActions.verifyTableCellValue(6, 1, "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary");
            await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');
        });
    }

    test(`Validate all badge types and cell values are displayed and verified in current and past medication screens at 1500px`, { tag: ["@US412498", "@US418272", "@US266493", "@regression", "@view_meds_prod"] }, async ({ page, medicationBadgesActions, medicationHomeActions, medicationHome }) => {
        await medicationHomeActions.getMedicationBadgesResponse_Mock();
        await page.setViewportSize({ width: 1500, height: 1200 });
        await medicationHome.currentMedicationTab.waitFor({ state: 'visible' });
        await medicationBadgesActions.verifyTableCellValue(8, 2, "CDFP10PCDDiamorphine 10mg tabletsFP10PCD Automatic, 3 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Diamorphine');

        await medicationBadgesActions.verifyTableCellValue(3, 2, "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 22 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 10mg tablets');

        await medicationBadgesActions.verifyTableCellValue(4, 2, "Atorvastatin 20mg tabletsPrivatePersonally administeredOne To Be Taken Each Day, 22 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 20mg tablets');
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Atorvastatin 20mg tablets');

        await medicationBadgesActions.verifyTableCellValue(5, 2, "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('SLS', 'Clobazam');

        await medicationBadgesActions.verifyTableCellValue(6, 2, "Co-cyprindiol 2000microgram/35microgram tabletsOCAs Directed, 14 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('OC', 'Co-cyprindiol');

        await medicationBadgesActions.verifyTableCellValue(10, 2, "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Assorted flavours', 'Fortisip');

        await medicationBadgesActions.verifyTableCellValue(7, 2, "CDDiamorphine 10mg tabletsFSTest, 1 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('FS', 'Diamorphine');

        await medicationBadgesActions.verifyTableCellValue(12, 2, "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Personally administered', 'Prednisolone');

        await medicationBadgesActions.verifyTableCellValue(13, 2, "Latanoprost 50micrograms/ml eye dropsVariable useOne Drop To Be Used At Night In The Affected Eye(s), 10 ml");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Variable use', 'Latanoprost');

        await medicationBadgesActions.verifyTableCellValue(11, 2, "CDMethadone 1mg/ml oral solutionInstalment prescribedAs Directed, 1 ml");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Instalment prescribed', 'Methadone');

        await medicationBadgesActions.verifyTableCellValue(2, 2, "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram");
        await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');

        await medicationBadgesActions.verifyTableCellValue(5, 2, "CDClobazam 10mg tabletsSLSTwo To Be Taken Each Day, 10 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 10mg tablets');

        await medicationBadgesActions.verifyTableCellValue(9, 2, "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');

        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();

        await medicationBadgesActions.verifyTableCellValue(3, 1, "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForMedication('FP10PCD', 'Clobazam 20mg tablets');

        await medicationBadgesActions.verifyTableCellValue(2, 1, "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('Private', 'Atorvastatin 10mg tablets');

        await medicationBadgesActions.verifyTableCellValue(1, 1, "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram");
        await medicationBadgesActions.verifyBadgeDisplayedForMedication('Non dm+d', 'Aurum/Prunus Pills');

        await medicationBadgesActions.verifyTableCellValue(3, 1, "CDFP10PCDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet");
        await medicationBadgesActions.verifyBadgeDisplayedForMedication('CD', 'Clobazam 20mg tablets');

        await medicationBadgesActions.verifyTableCellValue(6, 1, "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary");
        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS('HRT', 'Estradiol 10microgram pessaries');
    });
});
