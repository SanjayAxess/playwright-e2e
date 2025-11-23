import { expect, Locator, Page } from "@playwright/test";
import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";
import { MedicationBadgesActions } from "../../actions/medication-badges-actions";

test.describe("Medication badges tooltip validation", () => {
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

    test("Validate all medication badge tooltips for current medication", { tag: ["@US412497", "@view_meds_prod"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        const testCases = [
            {
                badgeName: "OC",
                tooltipTexts: "Prescribed for contraceptive use - free of charge."
            },
            {
                badgeName: "Personally administered",
                tooltipTexts: "Administered by a member of the organisation."
            },
            {
                badgeName: "SLS",
                tooltipTexts: "Selected List Scheme. Restricted by the NHS to prescribing in certain circumstances."
            },
            {
                badgeName: "Assorted flavours",
                tooltipTexts: "Dispensed in assorted flavours."
            },
            {
                badgeName: "CD",
                tooltipTexts: "Controlled drug - Schedule 4."
            },
            {
                badgeName: "Private",
                tooltipTexts: "Cannot be prescribed at NHS expense and cannot be issued via EPS."
            },
            {
                badgeName: "FS",
                tooltipTexts: "Prescribed for sexually transmitted infection - free of charge."
            },
            {
                badgeName: "Instalment prescribed",
                tooltipTexts: "Cannot be issued via EPS."
            },
            {
                badgeName: "FP10PCD",
                tooltipTexts: "Private prescription for controlled drug."
            },
            {
                badgeName: "Variable use",
                tooltipTexts: "Variable use repeat."
            },
            {
                badgeName: "Withdrawn",
                tooltipTexts: "This specific item has been withdrawn from the UK market and cannot be issued. Other variants may still be available."
            },
            {
                badgeName: "Non dm+d",
                tooltipTexts: "Not in the NHS dictionary of medicines and devices. This cannot be issued via EPS."
            },
            {
                badgeName: "HRT",
                tooltipTexts: "Hormone Replacement Therapy. Eligible under HRT prescription pre-payment certificate."
            }
        ];

        await page.setViewportSize({ width: 1600, height: 1100 });

        for (const { badgeName, tooltipTexts } of testCases) {
            await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
            await medicationBadgesActions.hoverBadge(badgeName, 1);
            await medicationBadgesActions.verifyBadgeTooltip(badgeName, tooltipTexts);
        }
    });

    const breakpoints = [
        { width: 1500, height: 1200, name: "desktop" },
        { width: 992, height: 1200, name: "tablet" },
        { width: 320, height: 1200, name: "mobile" }
    ];

    for (const breakpoint of breakpoints) {
        test(`Validate all medication badge tooltips at ${breakpoint.width}px breakpoint for current medication`, { tag: ["@US412497", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
            const testCases = [
                {
                    badgeName: "OC",
                    tooltipTexts: "Prescribed for contraceptive use - free of charge."
                },
                {
                    badgeName: "Personally administered",
                    tooltipTexts: "Administered by a member of the organisation."
                },
                {
                    badgeName: "SLS",
                    tooltipTexts: "Selected List Scheme. Restricted by the NHS to prescribing in certain circumstances."
                },
                {
                    badgeName: "Assorted flavours",
                    tooltipTexts: "Dispensed in assorted flavours."
                },
                {
                    badgeName: "CD",
                    tooltipTexts: "Controlled drug - Schedule 4."
                },
                {
                    badgeName: "Private",
                    tooltipTexts: "Cannot be prescribed at NHS expense and cannot be issued via EPS."
                },
                {
                    badgeName: "FS",
                    tooltipTexts: "Prescribed for sexually transmitted infection - free of charge."
                },
                {
                    badgeName: "Instalment prescribed",
                    tooltipTexts: "Cannot be issued via EPS."
                },
                {
                    badgeName: "FP10PCD",
                    tooltipTexts: "Private prescription for controlled drug."
                },
                {
                    badgeName: "Variable use",
                    tooltipTexts: "Variable use repeat."
                },
                {
                    badgeName: "Withdrawn",
                    tooltipTexts: "This specific item has been withdrawn from the UK market and cannot be issued. Other variants may still be available."
                },
                {
                    badgeName: "Non dm+d",
                    tooltipTexts: "Not in the NHS dictionary of medicines and devices. This cannot be issued via EPS."
                },
                {
                    badgeName: "HRT",
                    tooltipTexts: "Hormone Replacement Therapy. Eligible under HRT prescription pre-payment certificate."
                }
            ];

            await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

            for (const { badgeName, tooltipTexts } of testCases) {
                await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
                await medicationBadgesActions.hoverBadge(badgeName, 1);
                await medicationBadgesActions.verifyBadgeTooltip(badgeName, tooltipTexts);
            }
        });
    }
});

test.describe("Medication badges tooltip validation for past medication", () => {
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

    test("Validate all medication badge tooltips for past medication", { tag: ["@US412497", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        const testCases = [
            {
                badgeName: "OC",
                tooltipTexts: "Prescribed for contraceptive use - free of charge."
            },
            {
                badgeName: "Personally administered",
                tooltipTexts: "Administered by a member of the organisation."
            },
            {
                badgeName: "SLS",
                tooltipTexts: "Selected List Scheme. Restricted by the NHS to prescribing in certain circumstances."
            },
            {
                badgeName: "Assorted flavours",
                tooltipTexts: "Dispensed in assorted flavours."
            },
            {
                badgeName: "CD",
                tooltipTexts: "Controlled drug - Schedule 4."
            },
            {
                badgeName: "Private",
                tooltipTexts: "Cannot be prescribed at NHS expense and cannot be issued via EPS."
            },
            {
                badgeName: "FS",
                tooltipTexts: "Prescribed for sexually transmitted infection - free of charge."
            },
            {
                badgeName: "Instalment prescribed",
                tooltipTexts: "Cannot be issued via EPS."
            },
            {
                badgeName: "FP10PCD",
                tooltipTexts: "Private prescription for controlled drug."
            },
            {
                badgeName: "Variable use",
                tooltipTexts: "Variable use repeat."
            },
            {
                badgeName: "Withdrawn",
                tooltipTexts: "This specific item has been withdrawn from the UK market and cannot be issued. Other variants may still be available."
            },
            {
                badgeName: "Non dm+d",
                tooltipTexts: "Not in the NHS dictionary of medicines and devices. This cannot be issued via EPS."
            },
            {
                badgeName: "HRT",
                tooltipTexts: "Hormone Replacement Therapy. Eligible under HRT prescription pre-payment certificate."
            }
        ];

        await page.setViewportSize({ width: 1600, height: 1100 });

        for (const { badgeName, tooltipTexts } of testCases) {
            await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
            await medicationBadgesActions.selectPastMedicationPage();
            await medicationBadgesActions.hoverBadge(badgeName, 1);
            await medicationBadgesActions.verifyBadgeTooltip(badgeName, tooltipTexts);
        }
    });
    const breakpoints = [
        { width: 1500, height: 1200, name: "desktop" },
        { width: 992, height: 1200, name: "tablet" },
        { width: 320, height: 1200, name: "mobile" }
    ];

    for (const breakpoint of breakpoints) {
        test(`Validate all medication badge tooltips at ${breakpoint.width}px breakpoint for past medication`, { tag: ["@US412497", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
            const testCases = [
                {
                    badgeName: "OC",
                    tooltipTexts: "Prescribed for contraceptive use - free of charge."
                },
                {
                    badgeName: "Personally administered",
                    tooltipTexts: "Administered by a member of the organisation."
                },
                {
                    badgeName: "SLS",
                    tooltipTexts: "Selected List Scheme. Restricted by the NHS to prescribing in certain circumstances."
                },
                {
                    badgeName: "Assorted flavours",
                    tooltipTexts: "Dispensed in assorted flavours."
                },
                {
                    badgeName: "CD",
                    tooltipTexts: "Controlled drug - Schedule 4."
                },
                {
                    badgeName: "Private",
                    tooltipTexts: "Cannot be prescribed at NHS expense and cannot be issued via EPS."
                },
                {
                    badgeName: "FS",
                    tooltipTexts: "Prescribed for sexually transmitted infection - free of charge."
                },
                {
                    badgeName: "Instalment prescribed",
                    tooltipTexts: "Cannot be issued via EPS."
                },
                {
                    badgeName: "FP10PCD",
                    tooltipTexts: "Private prescription for controlled drug."
                },
                {
                    badgeName: "Variable use",
                    tooltipTexts: "Variable use repeat."
                },
                {
                    badgeName: "Withdrawn",
                    tooltipTexts: "This specific item has been withdrawn from the UK market and cannot be issued. Other variants may still be available."
                },
                {
                    badgeName: "Non dm+d",
                    tooltipTexts: "Not in the NHS dictionary of medicines and devices. This cannot be issued via EPS."
                },
                {
                    badgeName: "HRT",
                    tooltipTexts: "Hormone Replacement Therapy. Eligible under HRT prescription pre-payment certificate."
                }
            ];

            await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

            for (const { badgeName, tooltipTexts } of testCases) {
                await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
                await medicationBadgesActions.selectPastMedicationPage();;
                await medicationBadgesActions.hoverBadge(badgeName, 1);
                await medicationBadgesActions.verifyBadgeTooltip(badgeName, tooltipTexts);
            }
        });
    }
});

test.describe("Medication badges tooltip validation in info section - current medication", () => {
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

    const infoPanelTestCases = [
        {
            badgeName: "OC",
            tooltipTexts: "Prescribed for contraceptive use - free of charge.",
            drugName: "Co-cyprindiol 2000microgram/35microgram tablets"
        },
        {
            badgeName: "Personally administered",
            tooltipTexts: "Administered by a member of the organisation.",
            drugName: "Atorvastatin 20mg tablets"
        },
        {
            badgeName: "SLS",
            tooltipTexts: "Selected List Scheme. Restricted by the NHS to prescribing in certain circumstances.",
            drugName: "Clobazam 10mg tablets"
        },
        {
            badgeName: "Assorted flavours",
            tooltipTexts: "Dispensed in assorted flavours.",
            drugName: "Fortisip 2kcal liquid (Flavour Not Specified)"
        },
        {
            badgeName: "FS",
            tooltipTexts: "Prescribed for sexually transmitted infection - free of charge.",
            drugName: "Atorvastatin 20mg tablets"
        },
        {
            badgeName: "Private",
            tooltipTexts: "Cannot be prescribed at NHS expense and cannot be issued via EPS.",
            drugName: "Atorvastatin 20mg tablets"
        },
        {
            badgeName: "CD",
            tooltipTexts: "Controlled drug - Schedule 4.",
            drugName: "Clobazam 10mg tablets"
        },
        {
            badgeName: "Instalment prescribed",
            tooltipTexts: "Cannot be issued via EPS.",
            drugName: "Methadone 1mg/ml oral solution"
        },
        {
            badgeName: "Variable use",
            tooltipTexts: "Variable use repeat.",
            drugName: "Latanoprost 50micrograms/ml eye drops"
        },
        {
            badgeName: "FP10PCD",
            tooltipTexts: "Private prescription for controlled drug.",
            drugName: "Diamorphine 10mg tablets"
        },
        {
            badgeName: "Withdrawn",
            tooltipTexts: "This specific item has been withdrawn from the UK market and cannot be issued. Other variants may still be available.",
            drugName: "Crizanlizumab 100mg/10ml solution for infusion vials"
        },
        {
            badgeName: "Non dm+d",
            tooltipTexts: "Not in the NHS dictionary of medicines and devices. This cannot be issued via EPS.",
            drugName: "*Aurum/Prunus Pills"
        },
        {
            badgeName: "HRT",
            tooltipTexts: "Hormone Replacement Therapy. Eligible under HRT prescription pre-payment certificate.",
            drugName: "Estradiol 10microgram pessaries"
        }
    ];

    test("Verify tooltip texts for medication badges in info panel", { tag: ["@US412497", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        await page.setViewportSize({ width: 1600, height: 1500 });
        await medicationHomeActions.getMedicationBadgesInfoPanelResponse_Mock();
        for (const { badgeName, tooltipTexts, drugName } of infoPanelTestCases) {
            // await medicationHomeActions.navigateToPatientMedication(personGuid);
            await medicationBadgesActions.clickOnRequiredMedication(drugName);
            await medicationBadgesActions.hoverBadgeInInfoPanel(badgeName);
            await medicationBadgesActions.verifyTooltipTextsForBadgeOnInfoPanel(badgeName, tooltipTexts);
        }
    });
});

test.describe("Medication badges tooltip validation in info section - past medication", () => {
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

    const infoPanelTestCases = [
        {
            badgeName: "OC",
            tooltipTexts: "Prescribed for contraceptive use - free of charge.",
            drugName: "Co-cyprindiol 2000microgram/35microgram tablets"
        },
        {
            badgeName: "Personally administered",
            tooltipTexts: "Administered by a member of the organisation.",
            drugName: "Prednisolone acetate 1% eye drops"
        },
        {
            badgeName: "SLS",
            tooltipTexts: "Selected List Scheme. Restricted by the NHS to prescribing in certain circumstances.",
            drugName: "Clobazam 20mg tablets"
        },
        {
            badgeName: "Assorted flavours",
            tooltipTexts: "Dispensed in assorted flavours.",
            drugName: "Fortisip 2kcal liquid (Flavour Not Specified)"
        },
        {
            badgeName: "FS",
            tooltipTexts: "Prescribed for sexually transmitted infection - free of charge.",
            drugName: "Cyproterone 50mg tablets"
        },
        {
            badgeName: "Private",
            tooltipTexts: "Cannot be prescribed at NHS expense and cannot be issued via EPS.",
            drugName: "Atorvastatin 10mg tablets"
        },
        {
            badgeName: "CD",
            tooltipTexts: "Controlled drug - Schedule 4.",
            drugName: "Clobazam 20mg tablets"
        },
        {
            badgeName: "Instalment prescribed",
            tooltipTexts: "Cannot be issued via EPS.",
            drugName: "Methadone 10mg/1ml solution for injection ampoules"
        },
        {
            badgeName: "Variable use",
            tooltipTexts: "Variable use repeat.",
            drugName: "Paracetamol 120mg/5ml oral suspension paediatric"
        },
        {
            badgeName: "FP10PCD",
            tooltipTexts: "Private prescription for controlled drug.",
            drugName: "Clobazam 20mg tablets"
        },
        {
            badgeName: "Withdrawn",
            tooltipTexts: "This specific item has been withdrawn from the UK market and cannot be issued. Other variants may still be available.",
            drugName: "Prizanlizumab 100mg/10ml solution for infusion vials"
        },
        {
            badgeName: "Non dm+d",
            tooltipTexts: "Not in the NHS dictionary of medicines and devices. This cannot be issued via EPS.",
            drugName: "*Aurum/Prunus Pills"
        },
        {
            badgeName: "HRT",
            tooltipTexts: "Hormone Replacement Therapy. Eligible under HRT prescription pre-payment certificate.",
            drugName: "Estradiol 10microgram pessaries"
        }
    ];

    test("Verify tooltip texts for medication badges in info panel", { tag: ["@US412497", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        await page.setViewportSize({ width: 1600, height: 1500 });
        await medicationHomeActions.getMedicationBadgesResponsePast_Mock();
        await medicationBadgesActions.selectPastMedicationPage();
        for (const { badgeName, tooltipTexts, drugName } of infoPanelTestCases) {
            await medicationBadgesActions.clickOnRequiredMedication(drugName);
            await medicationBadgesActions.hoverBadgeInInfoPanel(badgeName);
            await medicationBadgesActions.verifyTooltipTextsForBadgeOnInfoPanel(badgeName, tooltipTexts);
        }
    });

    const cdBadgeTestCases = [
        {
            badgeName: "CD",
            tooltipTexts: "Controlled drug - Schedule 4.",
            drugName: "Clobazam 10mg tablets"
        },
        {
            badgeName: "CD",
            tooltipTexts: "Controlled drug - Schedule 2.",
            drugName: "Methadone 1mg/ml oral solution"
        },
        {
            badgeName: "CD",
            tooltipTexts: "Controlled drug - Schedule 3.",
            drugName: "Buprenorphine 5micrograms/hour transdermal patches"
        }
    ];

    test("Verify tooltip texts for CD badge schedules in info panel", { tag: ["@US430101", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        for (const { badgeName, tooltipTexts, drugName } of cdBadgeTestCases) {
            await medicationHomeActions.getMedicationDiffCDBadgesResponse_Mock();
            await medicationBadgesActions.clickOnRequiredMedication(drugName);
            await medicationBadgesActions.hoverBadgeInInfoPanel(badgeName);
            await medicationBadgesActions.verifyTooltipTextsForBadgeOnInfoPanel(badgeName, tooltipTexts);
        }
    });
});
const diffCdBadgeTestCases = [
    {
        badgeName: "CD",
        tooltipTexts: "Controlled drug - Schedule 3.",
        index: 1
    },
    {
        badgeName: "CD",
        tooltipTexts: "Controlled drug - Schedule 4.",
        index: 2
    },
    {
        badgeName: "CD",
        tooltipTexts: "Controlled drug - Schedule 2.",
        index: 3
    }
];

const breakpoints = [
    { width: 1600, height: 1200 },
    { width: 992, height: 1200 },
    { width: 768, height: 1200 },
    { width: 600, height: 1200 }
];
test.describe("Different CD schedule validation", () => {
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

    test(`Validate CD badge tooltip texts for different schedule values at multiple breakpoints`, { tag: ["@US430101", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        await medicationHomeActions.getMedicationDiffCDBadgesResponse_Mock();
        for (const bp of breakpoints) {
            await page.setViewportSize({ width: bp.width, height: bp.height });
            for (const bdg of diffCdBadgeTestCases) {
                await medicationBadgesActions.hoverBadge(bdg.badgeName, bdg.index);
                await medicationBadgesActions.verifyBadgeTooltip(bdg.badgeName, bdg.tooltipTexts);
            }
        }
    });

    const schedule5TestCases = [
        {
            badgeName: "CD",
            drugName: "Co-codamol 30mg/500mg tablets"
        },
        {
            badgeName: "CD",
            drugName: "Codeine 15mg tablets"
        }
    ];

    test("Verify that the CD badge is not displayed for schedule 5 CD drugs in info section", { tag: ["@US434291", "@regression"] }, async ({ page, medicationHomeActions, medicationBadgesActions }) => {
        await page.setViewportSize({ width: 1500, height: 920 });
        for (const { badgeName, drugName } of schedule5TestCases) {
            await medicationHomeActions.getMedicationDiffCDBadgesResponse_Mock();
            await medicationBadgesActions.verifyBadgeNotDisplayedForDrug(badgeName, drugName);
            await medicationBadgesActions.clickOnRequiredMedication(drugName);
            await medicationBadgesActions.verifyBadgeNotDisplayedForSchedule5CDDrugsInInfoPanel(badgeName);
        }
    });
});