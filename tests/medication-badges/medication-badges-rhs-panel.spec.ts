import { expect, Locator, Page } from "@playwright/test";
import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { MedicationBadgesActions } from "../../actions/medication-badges-actions";

test.describe("Medication badges validation - current medication Info panel", () => {
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

    test("should display 'FP10PCD' badge after the drug name in RHS panel for current medication ", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Diamorphine', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Diamorphine 10mg tabletsCDFP10PCDAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Private', 'Personally administered' and 'FS' badges properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Atorvastatin 20mg tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Atorvastatin 20mg tabletsPrivatePersonally administeredFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'OC' badge properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Co-cyprindiol 2000microgram/35microgram tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Co-cyprindiol 2000microgram/35microgram tabletsOCAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'CD' and 'SLS' badges properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Clobazam 10mg tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Clobazam 10mg tabletsCDSLSAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issue—');
    });

    test("should display 'Assorted flavours' badge properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Fortisip 2kcal liquid (Flavour Not Specified)', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavoursAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'CD' and 'Instalment prescribed' badges properly in current medication info pane", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Methadone 1mg/ml oral solution', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Methadone 1mg/ml oral solutionCDInstalment prescribedAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Variable use' badge properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Latanoprost 50micrograms/ml eye drops', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Latanoprost 50micrograms/ml eye dropsVariable useAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'CD' and 'Instalment prescribed' badges properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Methadone 1mg/ml oral solution', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Methadone 1mg/ml oral solutionCDInstalment prescribedAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Non dm+d' badge properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('*Aurum/Prunus Pills', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('*Aurum/Prunus PillsNon dm+dAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Withdrawn' badge properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Crizanlizumab 100mg/10ml solution for infusion vials', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Crizanlizumab 100mg/10ml solution for infusion vialsWithdrawnPrivatePersonally administeredFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation07-Aug-2024Signing clinician of latest issue—');
    });

    test("should display 'HRT' badge properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Estradiol 10microgram pessaries', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Estradiol 10microgram pessariesHRTAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Private', 'Personally administered', 'HRT' and 'FS' badges properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Estriol 0.01% vaginal cream with applicator', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Estriol 0.01% vaginal cream with applicatorPrivatePersonally administeredHRTFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Non dm+d' and 'Personally administered' badges properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('*Apis/Arnica Injection D3/D4, 1 ml', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('*Apis/Arnica Injection D3/D4, 1 ml ampNon dm+dPersonally administeredAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Private', 'Personally administered', 'Withdrawn' and 'FS' badges properly in current medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        await medicationBadgesActions.clickOnRequiredMedication('Crizanlizumab 100mg/10ml solution for infusion vials', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Crizanlizumab 100mg/10ml solution for infusion vialsWithdrawnPrivatePersonally administeredFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation07-Aug-2024Signing clinician of latest issue—');
    });

    test("should validate all current medication badges in RHS panel", { tag: ["@US412496", "@regression", "@view_meds_prod"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1500, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();

        const testCases = [
            {
                name: 'Diamorphine',
                expected: 'Diamorphine 10mg tabletsCDFP10PCDAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Atorvastatin 20mg tablets',
                expected: 'Atorvastatin 20mg tabletsPrivatePersonally administeredFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Co-cyprindiol 2000microgram/35microgram tablets',
                expected: 'Co-cyprindiol 2000microgram/35microgram tabletsOCAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Clobazam 10mg tablets',
                expected: 'Clobazam 10mg tabletsCDSLSAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issue—'
            },
            {
                name: 'Fortisip 2kcal liquid (Flavour Not Specified)',
                expected: 'Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavoursAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Methadone 1mg/ml oral solution',
                expected: 'Methadone 1mg/ml oral solutionCDInstalment prescribedAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Latanoprost 50micrograms/ml eye drops',
                expected: 'Latanoprost 50micrograms/ml eye dropsVariable useAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: '*Aurum/Prunus Pills',
                expected: '*Aurum/Prunus PillsNon dm+dAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Crizanlizumab 100mg/10ml solution for infusion vials',
                expected: 'Crizanlizumab 100mg/10ml solution for infusion vialsWithdrawnPrivatePersonally administeredFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation07-Aug-2024Signing clinician of latest issue—'
            },
            {
                name: 'Estradiol 10microgram pessaries',
                expected: 'Estradiol 10microgram pessariesHRTAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Estriol 0.01% vaginal cream with applicator',
                expected: 'Estriol 0.01% vaginal cream with applicatorPrivatePersonally administeredHRTFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: '*Apis/Arnica Injection D3/D4, 1 ml amp',
                expected: '*Apis/Arnica Injection D3/D4, 1 ml ampNon dm+dPersonally administeredAuthorising clinicianTEST, Emis (Dr)Date of authorisation16-Jun-2025Signing clinician of latest issueTEST, Emis (Dr)'
            }
        ];

        for (const { name, expected } of testCases) {
            await medicationBadgesActions.clickOnRequiredMedication(name, 0);
            await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS(expected);
        }
    });
});

test.describe("Medication badges validation - past medication Info panel", () => {
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

    test("should display 'Private' badge for Atorvastatin 10mg tablets in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Atorvastatin 10mg tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Atorvastatin 10mg tabletsPrivateAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'CD' and 'SLS' badges for Clobazam 20mg tablets in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Clobazam 20mg tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Clobazam 20mg tabletsCDFP10PCDSLSAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'OC' badge for Co-cyprindiol 2000microgram/35microgram tablets in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Co-cyprindiol 2000microgram/35microgram tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Co-cyprindiol 2000microgram/35microgram tabletsOCAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'Assorted flavours' badge for Fortisip 2kcal liquid (Flavour Not Specified) in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Fortisip 2kcal liquid (Flavour Not Specified)', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavoursAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'FS' badge for Latanoprost 50micrograms/ml / Timolol 5mg/ml eye drops in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Cyproterone 50mg tablets', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Cyproterone 50mg tabletsFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'CD' and 'Variable use' badges for required medication in past medication info panel", { tag: ["@US412496", "@allCurrent"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Methadone 10mg/1ml solution for injection ampoules', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Methadone 10mg/1ml solution for injection ampoulesCDInstalment prescribedVariable useAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'CD' and 'Instalment prescribed' badges for Methadone 10mg/1ml solution for injection ampoules in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Methadone 10mg/1ml solution for injection ampoules', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Methadone 10mg/1ml solution for injection ampoulesCDInstalment prescribedAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'Personally administered' badge for Prednisolone acetate 1% eye drops in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Prednisolone acetate 1% eye drops', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Prednisolone acetate 1% eye dropsPersonally administeredAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—');
    });

    test("should display 'Non dm+d' badge for *Aurum/Prunus Pills in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('*Aurum/Prunus Pills', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('*Aurum/Prunus PillsNon dm+dAuthorising clinicianTEST, Emis (Dr)Date of authorisation10-Jul-2024Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should display 'Withdrawn' badge for Crizanlizumab 100mg/10ml solution for infusion vials in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Prizanlizumab 100mg/10ml solution for infusion vials', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Prizanlizumab 100mg/10ml solution for infusion vialsWithdrawnAuthorising clinicianTEST, Emis (Dr)Date of authorisation24-Jul-2024Signing clinician of latest issue—');
    });


    test("should display 'HRT' badge for Estradiol 10microgram pessarie for infusion vials in past medication info panel", { tag: ["@US412496"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        await medicationBadgesActions.clickOnRequiredMedication('Estradiol 10microgram pessaries', 0);
        await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS('Estradiol 10microgram pessariesHRTAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issueTEST, Emis (Dr)');
    });

    test("should validate all past medication badges in RHS panel", { tag: ["@US412496", "@regression", "@view_meds_prod"] }, async ({ page, medicationBadgesActions, medicationHomeActions }) => {
        await page.setViewportSize({ width: 1600, height: 1500 });
        await page.waitForLoadState('load');
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();

        const testCases = [
            {
                name: 'Atorvastatin 10mg tablets',
                expected: 'Atorvastatin 10mg tabletsPrivateAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Clobazam 20mg tablets',
                expected: 'Clobazam 20mg tabletsCDFP10PCDSLSAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Co-cyprindiol 2000microgram/35microgram tablets',
                expected: 'Co-cyprindiol 2000microgram/35microgram tabletsOCAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Fortisip 2kcal liquid (Flavour Not Specified)',
                expected: 'Fortisip 2kcal liquid (Flavour Not Specified)Assorted flavoursAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Cyproterone 50mg tablets',
                expected: 'Cyproterone 50mg tabletsFSAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Methadone 10mg/1ml solution for injection ampoules',
                expected: 'Methadone 10mg/1ml solution for injection ampoulesCDInstalment prescribedVariable useAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Prednisolone acetate 1% eye drops',
                expected: 'Prednisolone acetate 1% eye dropsPersonally administeredAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: '*Aurum/Prunus Pills',
                expected: '*Aurum/Prunus PillsNon dm+dAuthorising clinicianTEST, Emis (Dr)Date of authorisation10-Jul-2024Signing clinician of latest issueTEST, Emis (Dr)'
            },
            {
                name: 'Prizanlizumab 100mg/10ml solution for infusion vials',
                expected: 'Prizanlizumab 100mg/10ml solution for infusion vialsWithdrawnAuthorising clinicianTEST, Emis (Dr)Date of authorisation24-Jul-2024Signing clinician of latest issue—'
            },
            {
                name: 'Estradiol 10microgram pessaries',
                expected: 'Estradiol 10microgram pessariesHRTAuthorising clinicianTEST, Emis (Dr)Date of authorisation12-Jul-2024Signing clinician of latest issueTEST, Emis (Dr)'
            }
        ];

        for (const { name, expected } of testCases) {
            await medicationBadgesActions.clickOnRequiredMedication(name, 0);
            await medicationBadgesActions.verifyBadgesDisplayedForMedicationRHS(expected);
        }
    });
});
