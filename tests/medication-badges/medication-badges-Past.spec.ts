import { expect, Locator, Page } from "@playwright/test";
import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

function runBadgeTest(
    badgeName: string,
    drugName: string,
    examples: Array<{ width: number; height: number; row: number; column: number; expectedValue: string }>
) {
    for (const { width, height, row, column, expectedValue } of examples) {
        test(
            `Verify whether ${badgeName} badge is displayed next to drug name '${drugName}' in past medication screen at ${width}x${height}`,
            { tag: ["@US412498", "@US418272"] },
            async ({ page, medicationBadgesActions, medicationHomeActions }) => {
                await page.waitForLoadState('load');
                await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
                await page.setViewportSize({ width, height });
                await medicationBadgesActions.selectPastMedicationPage();
                await page.waitForTimeout(3000);
                await medicationBadgesActions.verifyTableCellValue(row, column, expectedValue);
                await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS(badgeName, drugName);
            }
        );
    }
}

test.describe("Medication badges validation_Past", () => {
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

    runBadgeTest("Private", "Atorvastatin 10mg tablets", [
        { width: 1200, height: 750, row: 2, column: 1, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tabletReason stopped: test" },
        { width: 992, height: 750, row: 2, column: 1, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tablet" },
        { width: 768, height: 750, row: 2, column: 1, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tabletReason stopped: test" },
        { width: 600, height: 750, row: 2, column: 1, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tabletReason stopped: testDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 2, column: 1, expectedValue: "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tablet More actions Reason stopped: testDate stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("SLS", "Clobazam", [
        { width: 1200, height: 750, row: 3, column: 1, expectedValue: "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 992, height: 750, row: 3, column: 1, expectedValue: "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 768, height: 750, row: 3, column: 1, expectedValue: "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet" },
        { width: 600, height: 750, row: 3, column: 1, expectedValue: "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tabletDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 3, column: 1, expectedValue: "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("OC", "Co-cyprindiol", [
        { width: 1200, height: 750, row: 4, column: 1, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet" },
        { width: 992, height: 750, row: 4, column: 1, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet" },
        { width: 768, height: 750, row: 4, column: 1, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet" },
        { width: 600, height: 750, row: 4, column: 1, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tabletDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 4, column: 1, expectedValue: "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("FS", "Cyproterone", [
        { width: 1200, height: 750, row: 5, column: 1, expectedValue: "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet" },
        { width: 992, height: 750, row: 5, column: 1, expectedValue: "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet" },
        { width: 768, height: 750, row: 5, column: 1, expectedValue: "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet" },
        { width: 600, height: 750, row: 5, column: 1, expectedValue: "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tabletDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 5, column: 1, expectedValue: "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("Assorted flavours", "Fortisip", [
        { width: 1200, height: 750, row: 7, column: 1, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 992, height: 750, row: 7, column: 1, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 768, height: 750, row: 7, column: 1, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml" },
        { width: 600, height: 750, row: 7, column: 1, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 mlDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 7, column: 1, expectedValue: "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("Instalment prescribed", "Methadone", [
        { width: 1200, height: 750, row: 8, column: 1, expectedValue: "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule" },
        { width: 992, height: 750, row: 8, column: 1, expectedValue: "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule" },
        { width: 768, height: 750, row: 8, column: 1, expectedValue: "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule" },
        { width: 600, height: 750, row: 8, column: 1, expectedValue: "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampouleDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 8, column: 1, expectedValue: "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("Variable use", "Paracetamol", [
        { width: 1200, height: 750, row: 9, column: 1, expectedValue: "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml" },
        { width: 992, height: 750, row: 9, column: 1, expectedValue: "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml" },
        { width: 768, height: 750, row: 9, column: 1, expectedValue: "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml" },
        { width: 600, height: 750, row: 9, column: 1, expectedValue: "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 mlDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 9, column: 1, expectedValue: "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    runBadgeTest("Personally administered", "Prednisolone", [
        { width: 1200, height: 750, row: 10, column: 1, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 992, height: 750, row: 10, column: 1, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 768, height: 750, row: 10, column: 1, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml" },
        { width: 600, height: 750, row: 10, column: 1, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 mlDate stopped: 12-Jul-2024" },
        { width: 320, height: 950, row: 10, column: 1, expectedValue: "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml More actions Date stopped: 12-Jul-2024Last issue date: Not issued" }
    ]);

    const breakpoints = [
        { width: 1200, height: 750 },
        { width: 992, height: 750 },
        { width: 768, height: 750 },
        { width: 600, height: 750 },
        { width: 320, height: 950 }
    ];

    const badgeData = [
        {
            badge: "Non dm+d",
            drug: "*Aurum/Prunus Pills",
            values: [
                "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram",
                "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram",
                "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram",
                "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram",
                "Non dm+d*Aurum/Prunus Pillsonce per week, 20 gram"
            ]
        },
        {
            badge: "Private",
            drug: "Atorvastatin 10mg tablets",
            values: [
                "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tabletReason stopped: test",
                "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tablet",
                "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tabletReason stopped: test",
                "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tabletReason stopped: testDate stopped: 12-Jul-2024",
                "Atorvastatin 10mg tabletsPrivateOne To Be Taken Each Day, 50 tablet More actions Reason stopped: testDate stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "SLS",
            drug: "Clobazam",
            values: [
                "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet",
                "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet",
                "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet",
                "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tabletDate stopped: 12-Jul-2024",
                "CDClobazam 20mg tabletsSLSOne To Be Taken Three Times A Day, 15 tablet More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "OC",
            drug: "Co-cyprindiol",
            values: [
                "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet",
                "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet",
                "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet",
                "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tabletDate stopped: 12-Jul-2024",
                "Co-cyprindiol 2000microgram/35microgram tabletsOCContraceptive drug, 3 tablet More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "FS",
            drug: "Cyproterone",
            values: [
                "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet",
                "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet",
                "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet",
                "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tabletDate stopped: 12-Jul-2024",
                "Cyproterone 50mg tabletsFSOne To Be Taken Each Day, 1 tablet More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "HRT",
            drug: "Estradiol 10microgram pessaries",
            values: [
                "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary",
                "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary",
                "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary",
                "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary",
                "Estradiol 10microgram pessariesHRTOne To Be Inserted At Bedtime, 2 pessary"
            ]
        },
        {
            badge: "Assorted flavours",
            drug: "Fortisip",
            values: [
                "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml",
                "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml",
                "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml",
                "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 mlDate stopped: 12-Jul-2024",
                "Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavourstest assorted flavors, 6 x 200 ml More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "Instalment prescribed",
            drug: "Methadone",
            values: [
                "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule",
                "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule",
                "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule",
                "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampouleDate stopped: 12-Jul-2024",
                "CDMethadone 10mg/1ml solution for injection ampoulesInstalment prescribedVariable useTest, 2 ampoule More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "Variable use",
            drug: "Paracetamol",
            values: [
                "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml",
                "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml",
                "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml",
                "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 mlDate stopped: 12-Jul-2024",
                "Paracetamol 120mg/5ml oral suspension paediatricVariable useTest, 2 ml More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        },
        {
            badge: "Personally administered",
            drug: "Prednisolone",
            values: [
                "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml",
                "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml",
                "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml",
                "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 mlDate stopped: 12-Jul-2024",
                "Prednisolone acetate 1% eye dropsPersonally administeredApply Every One To Two Hours Until Controlled Then Reduce Frequency, 40 ml More actions Date stopped: 12-Jul-2024Last issue date: Not issued"
            ]
        }
    ];

    breakpoints.forEach((bp, i) => {
        test(
            `Verify all medication badges are displayed correctly in past medication screen for all drugs at ${bp.width}x${bp.height}`,
            { tag: ["@US412498", "@US418272", "@regression"] },
            async ({ page, medicationBadgesActions, medicationHomeActions }) => {
                await page.waitForLoadState('load');
                await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
                await page.setViewportSize({ width: bp.width, height: bp.height === 750 ? 1500 : bp.height });
                await medicationBadgesActions.selectPastMedicationPage();
                await page.waitForTimeout(3000);

                for (let row = 0; row < badgeData.length; row++) {
                    const { badge, drug, values } = badgeData[row];
                    await medicationBadgesActions.verifyTableCellValue(row + 1, 1, values[i]);
                    if (badge !== 'Non dm+d') {
                        await medicationBadgesActions.verifyBadgeDisplayedForDrugRHS(badge, drug);
                    }
                }
            }
        );
    });
});
