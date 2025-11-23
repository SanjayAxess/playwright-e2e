import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("record drug field", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(() => {
        randomGuid = generateRandomGuid();
    });
    test.beforeEach(async () => {
        await epic(
            "Record a Medication Part 2",
            "EMISXGP-E-231",
            "https://emisgroup.aha.io/epics/EMISXGP-E-231"
        );
    });

    test("Validating Record Medication field", { tag: ["@US479633", "@dev", "@regression", "@pr_check"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.validateInvalidDrugInMedicationField("Invalid tablets");
    });

    test("Validating Record Quantity field", { tag: ["@US479633", "@dev", "@regression", "@pr_check"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.validateQuantityField(randomGuid);
    });

    test("Validating Record Dosage field", { tag: ["@US479633", "@dev", "@regression", "@pr_check"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.validateDosageField();
    });

    test("Validating Record Medication dosage field with Keyboard and Scroll actions", { tag: ["@US479633", "@regression"] }, async ({ recordMedicationPanelActions }) => {
        await recordMedicationPanelActions.validateDosageFieldWithKeyboardAndScrollActions();
    });
});