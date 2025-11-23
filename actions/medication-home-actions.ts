import { expect, Page } from "@playwright/test";
import { MedicationHomePage } from "../pages/medication-home-page";
import { CommonActions } from "./common-actions";
import current_get_meds_response from "../mock_data/current_get_meds_response.json";
import past_get_meds_response from "../mock_data/past_get_meds_response.json";
import empty_get_meds_response from "../mock_data/empty_get_meds_response.json";
import confidential_patient_accessible_by_user_api_response from "../mock_data/confidential_patient_accessible_by_user_api_response.json";
import confidential_patient_not_accessible_by_user_api_response from "../mock_data/confidential_patient_not_accessible_by_user_api_response.json";
import get_medication_badges_response from "../mock_data/get_meds_badges_response.json";
import get_medication_badges_info_section_response from "../mock_data/get_meds_badges_info_response.json";
import { EndCourseMedicationActions } from "../actions/end-medication-actions";
import get_medication_badges_Past_response from "../mock_data/get_meds_badges_past_response.json";
import get_diff_cd_badges_response from "../mock_data/cd_badge_diff_schedule_response.json";
import { IssueMedicationPanelActions } from "./prescribe-issue-medication-panel-actions";
import delete_past_medication_response from "../mock_data/delete_past_medication_response.json";
import end_medication_current_response from "../mock_data/end_medication_current_response.json";
import get_drug_and_org_level_warnings_response from "../mock_data/drug_and_org_level_warnings_response.json";
import drug_and_org_level_warnings_Org_response from "../mock_data/warnings_organisation_response.json";
import get_meds_include_all_prescription_type_response from "../mock_data/multiple_eps_issued_drugs_get_meds_response_all_type.json";

export class MedicationHomeActions {
    protected medicationHomePage: MedicationHomePage;
    protected commonActions: CommonActions;
    protected endCourseMedicationActions: EndCourseMedicationActions;

    constructor(protected readonly _page: Page) {
        this.medicationHomePage = new MedicationHomePage(this._page);
        this.commonActions = new CommonActions(this._page);
        this.endCourseMedicationActions = new EndCourseMedicationActions(this._page);
    }

    async clickPrescribeButton() {
        await this._page.getByText("Past").waitFor({ state: "visible" });
        if (await this.medicationHomePage.button.prescribe_large.isVisible()) {
            await this.medicationHomePage.button.prescribe_large.click();
        } else if (await this.medicationHomePage.button.prescribe_medium.isVisible()) {
            await this.medicationHomePage.button.prescribe_medium.click();
        } else if (await this.medicationHomePage.button.prescribe_small.isVisible()) {
            await this.medicationHomePage.button.prescribe_small.click();
        } else {
            throw new Error("Prescribe button not found");
        }
    }

    async searchCurrentMedication(medication: string) {
        await this.medicationHomePage.searchMedication.current.waitFor();
        await this.medicationHomePage.searchMedication.current.fill(medication);
        await this._page.waitForTimeout(2000);
    }

    async searchPastMedication(medication: string) {
        await this.medicationHomePage.searchMedication.past.waitFor();
        await this.medicationHomePage.searchMedication.past.fill(medication);
        await this._page.waitForTimeout(2000);
    }

    async SearchAndAddMedicationToIssueTab(medication: string) {
        await this.medicationHomePage.searchMedication.current.clear();
        await this.medicationHomePage.searchMedication.current.fill(medication);
        await this._page.waitForTimeout(3000);
        await this.medicationHomePage.currentMedicationMoreOptions.three_dots.first().click();
        // await this.medicationHomePage.currentMedicationMoreOptions.three_dots.click();
        await this.medicationHomePage.currentMedicationMoreOptions.addToPrescription.click();

    }

    async clickCurrentMedicationTab() {
        await this.medicationHomePage.currentMedicationTab.click();
    }

    async clickPastMedicationTab() {
        await this._page.waitForLoadState('load');
        await this.medicationHomePage.pastMedicationTab.click();
    }

    async clickToastNotificationCloseButton() {
        await this.medicationHomePage.button.toastNotification_X.click();
    }

    async clickMedsRefreshButton() {
        await this._page.waitForLoadState('load');
        await this.medicationHomePage.medsRefreshButton.click();
    }

    async clickThreeDotsMenu() {
        await this.medicationHomePage.currentMedicationMoreOptions.three_dots.click();
    }

    async clickToolBarMoreOptionsMenu() {
        await this.medicationHomePage.msmToolBar.msmThreeDotsButton.click();
    }

    async verifyAddToPrescriptionState(state: string) {
        if (state === "enabled") {
            await expect(this.medicationHomePage.currentMedicationMoreOptions.addToPrescription).toBeEnabled();
        } else if (state === "disabled") {
            await expect(this.medicationHomePage.currentMedicationMoreOptions.addToPrescription).not.toBeEnabled();
        } else {
            throw new Error("Invalid state provided");
        }
    }

    async mousehoverAddToPrescription() {
        await this.medicationHomePage.currentMedicationMoreOptions.addToPrescription.hover();
    }

    async verifyMultiCheckboxIsVisibleInCurrentTab() {
        for (let checkboxIndex = 1; checkboxIndex <= 3; checkboxIndex++) {
            const checkbox = this.medicationHomePage.getMedicationCheckboxCurrentTab(checkboxIndex - 1);
            await checkbox.waitFor({ state: "visible" });
            expect(checkbox).toBeVisible();
        }
    }

    async verifyMultiCheckBoxIsNotVisibleInPastTab() {
        const checkbox = this.medicationHomePage.getMedicationCheckboxCurrentTab(0);
        await expect(checkbox).not.toBeVisible();
    }

    async SelectSingleDrugCheckbox(CheckboxtoClick: number) {
        await this.medicationHomePage.eachMedicationCheckbox.nth(CheckboxtoClick - 1).check();
    }

    async UnSelectSingleDrugCheckbox(CheckboxtoUncheck: number) {
        await this.medicationHomePage.eachMedicationCheckbox.nth(CheckboxtoUncheck - 1).uncheck();
    }

    //enter number of checkboxes to be clicked starting from first checkbox
    async SelectMultipleCheckbox(firstCheckboxtoClick: number, numberOfCheckboxesToClick: number) {
        for (let i = firstCheckboxtoClick - 1; i < (firstCheckboxtoClick + numberOfCheckboxesToClick) - 1; i++) {
            await this.medicationHomePage.eachMedicationCheckbox.nth(i).check();
        }
    }

    //enter number of checkboxes to be unchecked starting from first checkbox
    async UnselectMultipleCheckbox(firstCheckboxtoClick: number, numberOfCheckboxesToClick: number) {
        for (let i = firstCheckboxtoClick - 1; i < (firstCheckboxtoClick + numberOfCheckboxesToClick) - 1; i++) {
            await this.medicationHomePage.eachMedicationCheckbox.nth(i).uncheck();
        }
    }

    async verifyMsmToolBarOptions(DrugSelectedCount: string) {
        await expect(this.medicationHomePage.msmToolBar.msmToolBarSelectedText).toContainText(`${DrugSelectedCount} selected in Current medication`);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toContainText("Cancel issue");
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).not.toBeEnabled();
    }

    async closeMsmToolBar() {
        await this.medicationHomePage.msmToolBar.msmToolBarClearIcon.click();
    }

    async verifyAcuteFirstDrugRowBackgroundColorIsBlue() {
        const backgroundColor = await this.medicationHomePage.acuteFirstDrugRow.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(backgroundColor).toBe("rgb(212, 232, 255)")
    }

    async verifyAcuteFirstDrugRowBackgroundColorIsWhite() {
        const backgroundColor = await this.medicationHomePage.acuteFirstDrugRow.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(backgroundColor).toBe("rgba(0, 0, 0, 0)")
    }

    async verifyHyperlinkIsAvailableForDrugs() {
        await expect(this.medicationHomePage.hyperlinkInDrugs).toBeVisible();
    }

    async clickTheDrug() {
        await this.medicationHomePage.hyperlinkInDrugs.click();
    }

    async verifyHyperlinkIsNotAvailableForDrugs() {
        await this.medicationHomePage.hyperlinkInDrugs.click();
        await expect(this.medicationHomePage.detailsPanel).not.toBeVisible();
    }

    async verifyDetailsPanelIsOpen() {
        await expect(this.medicationHomePage.detailsPanel).toBeVisible();
    }

    async verifyThreeDotsMenuState(state: string, positionOfThreeDots: number = 1) {
        if (state === "enabled") {
            await expect(this.medicationHomePage.currentMedicationMoreOptions.three_dots.nth(positionOfThreeDots - 1)).toBeEnabled();
        } else if (state === "disabled") {
            await expect(this.medicationHomePage.currentMedicationMoreOptions.three_dots.nth(positionOfThreeDots - 1)).not.toBeEnabled();
        } else {
            throw new Error("Invalid state provided");
        }
    }

    async verifyThreedotsMenuIsDisabledBasedOnDrugSelection() {
        await this.SelectSingleDrugCheckbox(1);
        await this.verifyThreeDotsMenuState("disabled", 1);
        await this.verifyThreeDotsMenuState("disabled", 2);
        await this.verifyThreeDotsMenuState("disabled", 3);
        await this.verifyThreeDotsMenuState("disabled", 4);
        await this.UnSelectSingleDrugCheckbox(1);
        await this.verifyThreeDotsMenuState("enabled", 1);
        await this.verifyThreeDotsMenuState("enabled", 2);
        await this.verifyThreeDotsMenuState("enabled", 3);
        await this.verifyThreeDotsMenuState("enabled", 4);
        await this.SelectSingleDrugCheckbox(2);
        await this.verifyThreeDotsMenuState("disabled", 1);
        await this.verifyThreeDotsMenuState("disabled", 2);
        await this.verifyThreeDotsMenuState("disabled", 3);
        await this.verifyThreeDotsMenuState("disabled", 4);
        await this.SelectSingleDrugCheckbox(3);
        await this.verifyThreeDotsMenuState("disabled", 1);
        await this.verifyThreeDotsMenuState("disabled", 2);
        await this.verifyThreeDotsMenuState("disabled", 3);
        await this.verifyThreeDotsMenuState("disabled", 4);
        await this.SelectSingleDrugCheckbox(1);
        await this.verifyThreeDotsMenuState("disabled", 1);
        await this.verifyThreeDotsMenuState("disabled", 2);
        await this.verifyThreeDotsMenuState("disabled", 3);
        await this.verifyThreeDotsMenuState("disabled", 4);
        await this.UnselectMultipleCheckbox(1, 3);
        await this.verifyThreeDotsMenuState("enabled", 1);
        await this.verifyThreeDotsMenuState("enabled", 2);
        await this.verifyThreeDotsMenuState("enabled", 3);
        await this.verifyThreeDotsMenuState("enabled", 4);
        await this.SelectMultipleCheckbox(1, 4);
        await this.verifyThreeDotsMenuState("disabled", 1);
        await this.verifyThreeDotsMenuState("disabled", 2);
        await this.verifyThreeDotsMenuState("disabled", 3);
        await this.verifyThreeDotsMenuState("disabled", 4);
        await this.closeMsmToolBar();
        await this.verifyThreeDotsMenuState("enabled", 1);
        await this.verifyThreeDotsMenuState("enabled", 2);
        await this.verifyThreeDotsMenuState("enabled", 3);
        await this.verifyThreeDotsMenuState("enabled", 4);
    }

    async validateEachColumnInFirstRowOfCurrentMedication(column: number, value: string[]) {
        await this._page.waitForLoadState('load');
        for (const val of value) {
            const columnValue = await this.medicationHomePage.firstRowEachValue.nth(column - 1).innerText();
            await expect(columnValue).toContain(val);
        }
    }

    async validateEachColumnInFirstRowOfPastMedication(column: number, value: string[]) {
        await this._page.waitForLoadState('load');
        for (const val of value) {
            const columnValue = await this.medicationHomePage.firstRowEachValueForPast.nth(column - 1).innerText();
            await expect(columnValue).toContain(val);
        }
    }

    async validateCurrentMedicationFirstRowAtXlargeView(DrugDosageQuantity: string[], reviewDate: string = null, latestIssueDate: string = null, issueNumber: string = null, issueMethod: string = null) {
        await this._page.setViewportSize({ width: 1600, height: 1200 });
        await this._page.waitForTimeout(2000);
        await this.validateEachColumnInFirstRowOfCurrentMedication(2, DrugDosageQuantity);
        await this.validateEachColumnInFirstRowOfCurrentMedication(3, [reviewDate]);
        await this.validateEachColumnInFirstRowOfCurrentMedication(4, [latestIssueDate]);
        await this.validateEachColumnInFirstRowOfCurrentMedication(5, [issueNumber]);
        await this.validateEachColumnInFirstRowOfCurrentMedication(6, [issueMethod]);
    }

    async validatePastMedicationFirstRowAtXlargeView(DrugDosageQuantity: string[], dateStopped: string = null, reasonStopped: string = null, lastIssueDate: string = null) {
        await this._page.setViewportSize({ width: 1600, height: 1200 });
        await this._page.waitForTimeout(2000);
        await this.validateEachColumnInFirstRowOfPastMedication(1, DrugDosageQuantity);
        await this.validateEachColumnInFirstRowOfPastMedication(2, [dateStopped]);
        await this.validateEachColumnInFirstRowOfPastMedication(3, [reasonStopped]);
        await this.validateEachColumnInFirstRowOfPastMedication(4, [lastIssueDate]);
    }

    async verifyCancelIssueButtonIsDisabledAfterSelecting4Drugs() {
        await this.SelectSingleDrugCheckbox(1);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        await this.SelectSingleDrugCheckbox(2);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        await this.SelectSingleDrugCheckbox(3);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        await this.SelectSingleDrugCheckbox(4);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        await this.SelectSingleDrugCheckbox(5);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).not.toBeEnabled();
        await this.verifyTooltipTextForMSMCancelIssueButton("You can only cancel up to 4 issues at a time.");
        await this.UnSelectSingleDrugCheckbox(1);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        await this.UnselectMultipleCheckbox(2, 4);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).not.toBeVisible();
        await this.SelectMultipleCheckbox(1, 4);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        await this.SelectMultipleCheckbox(5, 2);
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).not.toBeEnabled();
        await this.verifyTooltipTextForMSMCancelIssueButton("You can only cancel up to 4 issues at a time.");
    }

    async verifymsmToolBarCancelIssueButtonState(state: string) {
        if (state === "enabled") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        } else if (state === "disabled") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).not.toBeEnabled();
        } else if (state === "visible") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeVisible();
        } else if (state === "invisible") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).not.toBeVisible();
        }
        else {
            throw new Error("Invalid state provided");
        }
    }

    async verifymsmToolBarCancelIssueButtonText() {
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeVisible();
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toContainText("Cancel issue");
    }

    async verifymsmToolBarMenuCancelIssueButtonText() {
        await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).toBeVisible();
        await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).toContainText("Cancel issue");
    }

    async verifymsmToolBarMoreOptionsButtonState(state: string) {
        if (state === "enabled") {
            await expect(this.medicationHomePage.msmToolBar.msmThreeDotsButton).toBeEnabled();
        } else if (state === "disabled") {
            await expect(this.medicationHomePage.msmToolBar.msmThreeDotsButton).not.toBeEnabled();
        } else if (state === "visible") {
            await expect(this.medicationHomePage.msmToolBar.msmThreeDotsButton).toBeVisible();
        } else if (state === "invisible") {
            await expect(this.medicationHomePage.msmToolBar.msmThreeDotsButton).not.toBeVisible();
        }
        else {
            throw new Error("Invalid state provided");
        }
    }

    async verifymsmToolBarMoreOptionsCancelIssueDropdownState(state: string) {
        if (state === "enabled") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).toBeEnabled();
        } else if (state === "disabled") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).not.toBeEnabled();
        } else if (state === "visible") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).toBeVisible();
        } else if (state === "invisible") {
            await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).not.toBeVisible();
        }
        else {
            throw new Error("Invalid state provided");
        }
    }

    async verifyTooltipTextForMSMCancelIssueButton(tooltipText: string) {
        await this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton.hover();
        await expect(this.medicationHomePage.msmCancelIssueButtonTooltip).toContainText(tooltipText);
    }

    async clickmsmthreedotsbutton() {
        await this.medicationHomePage.msmToolBar.msmThreeDotsButton.click();
    }

    async verifyMsmCancelIssueButtonIsDisabledWhenWritePanelIsOpen() {
        await this.SelectMultipleCheckbox(1, 2);
        await this.clickmsmthreedotsbutton();
        await expect(this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton).not.toBeEnabled();
    }

    async verifyNoTooltipInMsmCancelIssueButtonWhenWritePanelIsOpen() {
        if (await this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton.isVisible()) {
            await this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton.hover();
        } else {
            await this.medicationHomePage.msmToolBar.msmToolBarMenuCancelLatestIssueButton.hover();
        }
        await expect(this.medicationHomePage.msmCancelIssueButtonTooltip).not.toBeVisible();
    }

    async verifyMsmCancelIssueButtonIsEnabledAfterClosingTheWritePanel() {
        await expect(this.medicationHomePage.msmToolBar.msmToolBarCancelLatestIssueButton).toBeEnabled();
        const selectedCheckboxes = await Promise.all([
            this.medicationHomePage.eachMedicationCheckbox.nth(0).isChecked(),
            this.medicationHomePage.eachMedicationCheckbox.nth(1).isChecked()
        ]);
        expect(selectedCheckboxes).toEqual([true, true]);
    }

    async clickThreeDotsButtonEditDrug() {
        await this.medicationHomePage.currentMedicationEditButton.click();
    }

    async mockCurrentMedicationApiResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(current_get_meds_response));
    }

    async mockPastMedicationApiResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(past_get_meds_response));
    }

    async mockEmptyMedicationApiResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(empty_get_meds_response));
    }

    async validateTableValuesInXLargeView(table: { rows: () => string[][] }) {
        await this._page.setViewportSize({ width: 1600, height: 1200 });
        const rows = table.rows();
        let groupRowIndex = 0;
        await this._page.waitForTimeout(2000);

        // Check the visibility of current and past medication tables
        const isCurrentVisible = await this._page.locator(`//*[contains(@data-testid,'meds-table-body')]`).first().isVisible();
        const isPastVisible = !isCurrentVisible && await this._page.locator(`//*[contains(@data-testid,'meds-past-table-body')]`).first().isVisible();

        for (let i = 0; i < rows.length; i++) {
            // Reset groupRowIndex if prescription type changes
            if (i === 0 || rows[i][0] !== rows[i - 1][0]) {
                groupRowIndex = 0;
            }
            const prescriptionType = rows[i][0];
            // Determine row index based on preparation type
            const rowIndex = rows[i][0] === "nogroup" ? groupRowIndex + 1 : groupRowIndex + 2;

            if (isCurrentVisible) {
                // Validate columns: 2 (Drug/Dosage/Quantity), 3 (Review date), 4 (Last issued), 5 (Issue number), 6 (Issue method), 8 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 4, [rows[i][3]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 5, [rows[i][4]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 6, [rows[i][5]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 8, [rows[i][6]])
                ]);
            } else if (isPastVisible) {
                // Validate columns: 2 (Drug/Dosage/Quantity), 3 (Date stopped), 4 (Reason stopped), 5 (Last issued), 6 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 1, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][3]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 4, [rows[i][4]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 6, [rows[i][5]])
                ]);
            }
            groupRowIndex++;
        }
    }

    async validateColumnHeadersInMedicationPage(headers: string[]) {
        for (let index = 0; index < headers.length; index++) {
            const position = index + 1;
            const headerLocator = this._page.locator(`//table/thead/tr/th[${position}]`);
            await this._page.waitForTimeout(5000);
            await expect(headerLocator).toHaveText(headers[index]);
        }
    }

    async validateEachRowOfCurrentMedication(prescriptionType: string, row: number, column: number, value: string[]) {
        await this._page.waitForLoadState('load');
        for (const val of value) {
            var locator = this._page.locator(`//*[@data-testid='meds-table-body-${prescriptionType}']/tr[${row}]/td`).or(this._page.locator(`//*[@data-testid='meds-past-table-body-${prescriptionType}']/tr[${row}]/td`));
            await expect(locator.nth(column - 1)).toContainText(val);
        }
    }

    async validateTableValuesInLargeView(table: { rows: () => string[][] }) {
        await this._page.setViewportSize({ width: 1400, height: 1000 });
        const rows = table.rows();
        let groupRowIndex = 0;
        await this._page.waitForTimeout(2000);

        // Check the visibility of current and past medication tables
        const isCurrentVisible = await this._page.locator(`//*[contains(@data-testid,'meds-table-body')]`).first().isVisible();
        const isPastVisible = !isCurrentVisible && await this._page.locator(`//*[contains(@data-testid,'meds-past-table-body')]`).first().isVisible();

        for (let i = 0; i < rows.length; i++) {
            // Reset groupRowIndex if prescription type changes
            if (i === 0 || rows[i][0] !== rows[i - 1][0]) {
                groupRowIndex = 0;
            }
            const prescriptionType = rows[i][0];
            // Determine row index based on preparation type
            const rowIndex = rows[i][0] === "nogroup" ? groupRowIndex + 1 : groupRowIndex + 2;

            if (isCurrentVisible) {
                // Validate columns: 2 (Drug/Dosage/Quantity), 3 (Review date), 4 (Last issued), 5 (Issue number / method), 7 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 4, [rows[i][3]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 5, [rows[i][4]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 7, [rows[i][5]])
                ]);
            } else if (isPastVisible) {
                // Validate columns: 1 (Drug/Dosage/Quantity), 2 (Date stopped), 3 (Reason stopped), 4 (Last issued), 6 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 1, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][3]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 4, [rows[i][4]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 6, [rows[i][5]])
                ]);
            }
            groupRowIndex++;
        }
    }

    async validateTableValuesInMediumView(table: { rows: () => string[][] }) {
        await this._page.setViewportSize({ width: 900, height: 800 });
        const rows = table.rows();
        let groupRowIndex = 0;
        await this._page.waitForTimeout(2000);

        // Check the visibility of current and past medication tables
        const isCurrentVisible = await this._page.locator(`//*[contains(@data-testid,'meds-table-body')]`).first().isVisible();
        const isPastVisible = !isCurrentVisible && await this._page.locator(`//*[contains(@data-testid,'meds-past-table-body')]`).first().isVisible();

        for (let i = 0; i < rows.length; i++) {
            // Reset groupRowIndex if prescription type changes
            if (i === 0 || rows[i][0] !== rows[i - 1][0]) {
                groupRowIndex = 0;
            }
            const prescriptionType = rows[i][0];
            // Determine row index based on preparation type
            const rowIndex = rows[i][0] === "nogroup" ? groupRowIndex + 1 : groupRowIndex + 2;
            if (isCurrentVisible) {
                // Validate columns: 2 (Drug/Dosage/Quantity), 3 (Last issued), 4 (Issue number / method), 6 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 4, [rows[i][3]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 6, [rows[i][4]])
                ]);
            } else if (isPastVisible) {
                // Validate columns: 1 (Drug/Dosage/Quantity), 2 (Date stopped), 3 (Last issued), 5 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 1, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][3]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 5, [rows[i][4]])
                ]);
            }
            groupRowIndex++;
        }
    }

    async validateTableValuesInSmallView(table: { rows: () => string[][] }) {
        await this._page.setViewportSize({ width: 700, height: 700 });
        const rows = table.rows();
        let groupRowIndex = 0;
        await this._page.waitForTimeout(2000);

        // Check the visibility of current and past medication tables
        const isCurrentVisible = await this._page.locator(`//*[contains(@data-testid,'meds-table-body')]`).first().isVisible();
        const isPastVisible = !isCurrentVisible && await this._page.locator(`//*[contains(@data-testid,'meds-past-table-body')]`).first().isVisible();

        for (let i = 0; i < rows.length; i++) {
            // Reset groupRowIndex if prescription type changes
            if (i === 0 || rows[i][0] !== rows[i - 1][0]) {
                groupRowIndex = 0;
            }
            const prescriptionType = rows[i][0];
            // Determine row index based on preparation type
            const rowIndex = rows[i][0] === "nogroup" ? groupRowIndex + 1 : groupRowIndex + 2;
            if (isCurrentVisible) {
                // Validate columns: 2 (Drug/Dosage/Quantity), 3 (Last issued / number / method), 5 (PFS Icon)
                await Promise.all([
                    await this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][1]]),
                    await this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 3, [rows[i][2]]),
                    await this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 5, [rows[i][3]])
                ]);
            } else if (isPastVisible) {
                // Validate columns: 1 (Drug/Dosage/Quantity), 2 (Last issued), 4 (PFS Icon)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 1, [rows[i][1]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 2, [rows[i][2]]),
                    this.validateEachRowOfCurrentMedication(prescriptionType, rowIndex, 4, [rows[i][3]])
                ]);
            }
            groupRowIndex++;
        }
    }

    //x-small size
    async validatePreparationValuesInMedicationPage(table: { rows: () => string[][] }) {
        const rows = table.rows();
        let groupRowIndex = 0;
        await this._page.waitForLoadState('load');

        // Check the visibility of current and past medication tables
        const isCurrentVisible = await this._page.locator(`//*[contains(@data-testid,'meds-table-body')]`).first().isVisible();
        const isPastVisible = !isCurrentVisible && await this._page.locator(`//*[contains(@data-testid,'meds-past-table-body')]`).first().isVisible();

        for (let i = 0; i < rows.length; i++) {
            // Reset groupRowIndex if prescription type changes
            if (i === 0 || rows[i][0] !== rows[i - 1][0]) {
                groupRowIndex = 0;
            }
            // Determine row index based on preparation type
            const rowIndex = rows[i][0] === "nogroup" ? groupRowIndex + 1 : groupRowIndex + 2;

            if (isCurrentVisible) {
                // Validate columns: 2 (Drug/Dosage/Quantity)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(rows[i][0], rowIndex, 2, [rows[i][1]])
                ]);
            } else if (isPastVisible) {
                // Validate columns: 1 (Drug/Dosage/Quantity)
                await Promise.all([
                    this.validateEachRowOfCurrentMedication(rows[i][0], rowIndex, 1, [rows[i][1]])
                ]);
            }
            groupRowIndex++;
        }
    }

    async PFSIcon(color: string) {
        const IconUI = this.medicationHomePage.pfsIcon.first();
        const initialColor = await IconUI.evaluate((el) => {
            return getComputedStyle(el).textDecorationColor;
        });
        expect(initialColor).toContain(color);
    }

    async validateNoMedicationFoundScreen(expectedText: string[]) {
        // Verify no medication found screen
        await expect(this.medicationHomePage.noMedicationFoundIcon).toBeVisible();
        for (const val of expectedText) {
            await expect(this.medicationHomePage.noMedicationFoundText).toContainText(val);
        }
    }

    async validateNoMedicationResultsFoundScreen() {
        // Verify No results found Screen in current tab
        const expectedText = ["No results found", "Try searching again using different criteria."];
        await expect(this.medicationHomePage.noResultsMedicationFoundIcon).toBeVisible();
        for (const val of expectedText) {
            await expect(this.medicationHomePage.noResultsMedicationFoundText).toContainText(val);
        }
    }

    async verifyViewMedicationError(medicationType: string) {
        await this.medicationHomePage.medsApiErrorIcon.waitFor({ state: "visible" });
        await expect(this.medicationHomePage.medsApiErrorText).toContainText("Something went wrong");
        await expect(this.medicationHomePage.medsApiErrorText).toContainText("Sorry but we cannot retrieve this patient's " + medicationType + " medications at the moment. Try again later or return to the main clinical system to view it.");
        await expect(this.medicationHomePage.medsApiErrorRetryButton).toBeVisible();
        await this.medicationHomePage.medsApiErrorRetryButton.click();
        await this._page.waitForTimeout(2000);
        await this.medicationHomePage.medsApiErrorIcon.waitFor({ state: "visible" });
        await expect(this.medicationHomePage.medsApiErrorText).toContainText("Something went wrong");
        await expect(this.medicationHomePage.medsApiErrorText).toContainText("Sorry but we cannot retrieve this patient's " + medicationType + " medications at the moment. Try again later or return to the main clinical system to view it.");
        await expect(this.medicationHomePage.medsApiErrorRetryButton).toBeVisible();
        await this.commonActions.unMockUrl();
        await this.medicationHomePage.medsApiErrorRetryButton.click();
        await this._page.waitForTimeout(2000);
        await expect(this.medicationHomePage.medsApiErrorIcon).not.toBeVisible();
        await expect(this.medicationHomePage.medsApiErrorText).not.toBeVisible();
    }

    async validateNoSharedDataBannerIsDisplayedIfPatientHaveCurrentDrugs() {
        await expect(this.medicationHomePage.sharedDataBanner).toBeVisible();
        await expect(this.medicationHomePage.sharedDataBanner).toContainText("Shared data is not yet available on EMIS-X. View any of this patient's clinical data from other organisations in the main clinical system.");
    }

    async validateNoSharedDataBannerIsDisplayedIfPatientHaveNoCurrentDrugs() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(empty_get_meds_response));
        await expect(this.medicationHomePage.sharedDataBanner).toBeVisible();
        await expect(this.medicationHomePage.sharedDataBanner).toContainText("Shared data is not yet available on EMIS-X. View any of this patient's clinical data from other organisations in the main clinical system.");
    }

    async validateNoSharedDataBannerIsNotDisplayedAfterClickingDismiss() {
        await expect(this.medicationHomePage.sharedDataBanner).toBeVisible();
        await expect(this.medicationHomePage.sharedDataBanner).toContainText("Shared data is not yet available on EMIS-X. View any of this patient's clinical data from other organisations in the main clinical system.");
        await this.medicationHomePage.sharedDataDismissButton.click();
        await expect(this.medicationHomePage.sharedDataBanner).not.toBeVisible();
    }

    async mockConfidentialPatientAccessableByUserApiResponse() {
        await this.commonActions.mockUrl("**/patients**", 200, () => JSON.stringify(confidential_patient_accessible_by_user_api_response));
    }

    async validateConfidentialRecordScreenIsNotVisibleIfPatientIsConfidentialAndAccessibleByUser() {
        await this.commonActions.mockUrl("**/patients**", 200, () => JSON.stringify(confidential_patient_accessible_by_user_api_response));
        await this.clickMedsRefreshButton();
        await expect(this.medicationHomePage.patientBanner).toBeVisible();
        await expect(this.medicationHomePage.confidentialPageHeader).not.toBeVisible();
        await expect(this.medicationHomePage.confidentialPagInstructions).not.toBeVisible();
        await expect(this.medicationHomePage.confidentialPageAccess).not.toBeVisible();
    }

    async validateConfidentialRecordScreenIsNotVisibleIfPatientIsNotConfidential() {
        await expect(this.medicationHomePage.patientBanner).toBeVisible();
        await expect(this.medicationHomePage.medicationTopBar).toBeVisible();
        await expect(this.medicationHomePage.medicationTopBar).toContainText("Medication");
        await expect(this.medicationHomePage.medsRefreshButton).toBeVisible();
        await expect(this.medicationHomePage.medsRefreshButton).toContainText("Refresh");
        await expect(this.medicationHomePage.confidentialPageHeader).not.toBeVisible();
        await expect(this.medicationHomePage.confidentialPagInstructions).not.toBeVisible();
        await expect(this.medicationHomePage.confidentialPageAccess).not.toBeVisible();
    }

    async validateConfidentialRecordScreenIsNotVisibleIfPatientIsConfidentialAndNotAccessibleByUser() {
        await this.commonActions.mockUrl("**/medications**", 403, () => JSON.stringify(confidential_patient_not_accessible_by_user_api_response));
        await this.clickMedsRefreshButton();
        await expect(this.medicationHomePage.patientBanner).toBeVisible();
        for (const header of [
            "Drug / Dosage / Quantity",
            "Review date",
            "Last issued",
            "Issue number",
            "Issue method"
        ]) {
            const headerLocator = this._page.locator(`//table/thead/tr/th[normalize-space(text())='${header}']`);
            await expect(headerLocator).not.toBeVisible();
        }
        await expect(this.medicationHomePage.currentMeds).toContainText("Something went wrong");
        await this.commonActions.unMockUrl();
    }

    async verifyCurrentViewOptionsDialogBox() {
        await this.mockCurrentMedicationApiResponse();
        await this.medicationHomePage.viewOptions.viewOptionsButton.waitFor({ state: "visible" });
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.CurrentTab).toContainText("Current");
        await expect(this.medicationHomePage.viewOptions.PastTab).toContainText("Past");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("View options");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Group by");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Sort by");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Prescription type");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Name (A-Z)");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Last issue date (newest first)");
        // verify default checkbox selected in current view options
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).not.toBeChecked();
        // verify default checkbox selected in past view options
        await this.medicationHomePage.viewOptions.PastTab.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        // verify user able to update the view options and cancel it without saving
        await this.medicationHomePage.viewOptions.CurrentTab.click();
        await this.medicationHomePage.viewOptions.GroupBy_DontGroup.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await this.medicationHomePage.viewOptions.SortBy_LastIssueDate.click();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await this.medicationHomePage.viewOptions.CancelButton.click();
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).not.toBeChecked();
        await this.medicationHomePage.viewOptions.X_Button.click();
        // verify user able to update the view options and save it
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await this.medicationHomePage.viewOptions.GroupBy_DontGroup.click();
        await this.medicationHomePage.viewOptions.SortBy_LastIssueDate.click();
        await this.medicationHomePage.viewOptions.PastTab.click();
        await this.medicationHomePage.viewOptions.GroupBy_PrescriptionType.click();
        await this.medicationHomePage.viewOptions.SortBy_Name.click();
        await this.medicationHomePage.viewOptions.ApplyButton.click();
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await this.medicationHomePage.viewOptions.PastTab.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).not.toBeChecked();
        await this.medicationHomePage.viewOptions.CancelButton.click();
        // verify view options are changed to default after refreshing
        await this.clickMedsRefreshButton();
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).not.toBeChecked();
        await this.medicationHomePage.viewOptions.PastTab.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        await this.medicationHomePage.viewOptions.X_Button.click();
    }

    async verifyPastViewOptionsDialogBox() {
        await this.mockPastMedicationApiResponse();
        await this.medicationHomePage.pastMedicationTab.click();
        await this.medicationHomePage.viewOptions.viewOptionsButton.waitFor({ state: "visible" });
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.CurrentTab).toContainText("Current");
        await expect(this.medicationHomePage.viewOptions.PastTab).toContainText("Past");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("View options");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Group by");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Sort by");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Prescription type");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Name (A-Z)");
        await expect(this.medicationHomePage.viewOptions.formElement).toContainText("Last issue date (newest first)");
        // verify default checkbox selected in past view options
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        // verify user able to update the view options and cancel it without saving
        await this.medicationHomePage.viewOptions.GroupBy_PrescriptionType.click();
        await this.medicationHomePage.viewOptions.SortBy_Name.click();
        await this.medicationHomePage.viewOptions.CancelButton.click();
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        await this.medicationHomePage.viewOptions.X_Button.click();
        // verify user able to update the view options and save it
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await this.medicationHomePage.viewOptions.GroupBy_PrescriptionType.click();
        await this.medicationHomePage.viewOptions.SortBy_Name.click();
        await this.medicationHomePage.viewOptions.ApplyButton.click();
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).toBeChecked();
        await this.medicationHomePage.viewOptions.X_Button.click();
        // verify view options are changed to default after refreshing
        await this.clickMedsRefreshButton();
        await this.medicationHomePage.pastMedicationTab.click();
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await expect(this.medicationHomePage.viewOptions.GroupBy_PrescriptionType).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.GroupBy_DontGroup).toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_Name).not.toBeChecked();
        await expect(this.medicationHomePage.viewOptions.SortBy_LastIssueDate).toBeChecked();
        await this.medicationHomePage.viewOptions.X_Button.click();
    }

    async selectPrescriptionTypeAndName_ViewOptions() {
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await this.medicationHomePage.viewOptions.GroupBy_PrescriptionType.click();
        await this.medicationHomePage.viewOptions.SortBy_Name.click();
        await this.medicationHomePage.viewOptions.ApplyButton.click();
    }

    async selectDontGroupAndLastIssueDate_ViewOptions() {
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await this.medicationHomePage.viewOptions.GroupBy_DontGroup.click();
        await this.medicationHomePage.viewOptions.SortBy_LastIssueDate.click();
        await this.medicationHomePage.viewOptions.ApplyButton.click();
    }

    async selectDontGroupAndName_ViewOptions() {
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await this.medicationHomePage.viewOptions.GroupBy_DontGroup.click();
        await this.medicationHomePage.viewOptions.SortBy_Name.click();
        await this.medicationHomePage.viewOptions.ApplyButton.click();
    }

    async selectPrescriptionTypeAndLastIssueDate_ViewOptions() {
        await this.medicationHomePage.viewOptions.viewOptionsButton.click();
        await this.medicationHomePage.viewOptions.GroupBy_PrescriptionType.click();
        await this.medicationHomePage.viewOptions.SortBy_LastIssueDate.click();
        await this.medicationHomePage.viewOptions.ApplyButton.click();
    }

    async verifyViewOptionsDialogBoxIsNotAvailable() {
        await expect(this.medicationHomePage.currentMedicationTab).toBeVisible();
        await expect(this.medicationHomePage.viewOptions.viewOptionsButton).not.toBeVisible();
    }

    async verifySearchOptionTextboxIsNotAvailable(state: "current" | "past") {
        await expect(this.medicationHomePage.currentMedicationTab).toBeVisible();
        const searchBox = state === "current"
            ? this.medicationHomePage.searchMedication.current
            : this.medicationHomePage.searchMedication.past;
        await expect(searchBox).not.toBeVisible();
    }

    async verifyRepeatHeaderPositionAfterScrolling() {
        const yAxisValue = 200
        const selector = this.medicationHomePage.medsSecondSubheader;
        await selector.waitFor({ state: 'visible' });
        const box = await selector.boundingBox();
        const beforeYAxisValue = box?.y ?? 0;
        await selector.hover();
        await this._page.mouse.wheel(0, yAxisValue);
        const box2 = await selector.boundingBox();
        const afterYAxisValue = box2?.y ?? 0;
        expect(beforeYAxisValue).not.toEqual(afterYAxisValue);
        await this._page.mouse.wheel(0, yAxisValue);
        const box3 = await selector.boundingBox();
        const afterYAxisValue2 = box3?.y ?? 0;
        expect(afterYAxisValue).toEqual(afterYAxisValue2);
    }

    async clickFirstMedicationButtonByPrefix(medicationName: string) {
        const locator = this._page.locator(`[data-testid^="preparation-btn-${medicationName}"]`).first();
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.click();
    }

    async validateMedicationDetailsPanel({
        medicationName,
        authorisingClinicianLabel = 'Authorising clinician',
        authorisingClinicianValue,
        dateOfAuthorisationLabel = 'Date of authorisation',
        dateOfAuthorisationValue,
        signingClinicianLabel = 'Signing clinician of latest issue',
        signingClinicianValue
    }: {
        medicationName: string,
        authorisingClinicianLabel?: string,
        authorisingClinicianValue: string,
        dateOfAuthorisationLabel?: string,
        dateOfAuthorisationValue?: string,
        signingClinicianLabel?: string,
        signingClinicianValue: string
    }) {
        const panel = this._page.locator('[data-testid="medication-details-panel"]');
        await expect(panel).toBeVisible();
        await expect(panel).toContainText(medicationName);
        await expect(panel).toContainText(authorisingClinicianLabel);
        await expect(panel).toContainText(authorisingClinicianValue);
        await expect(panel).toContainText(dateOfAuthorisationLabel);

        const labelTestIds = [
            { label: authorisingClinicianLabel, testId: 'meds-details-authorising-clinician-label' },
            { label: dateOfAuthorisationLabel, testId: 'meds-details-date-of-authorisation-label' },
            { label: signingClinicianLabel, testId: 'meds-details-signing-clinician-label' }
        ];

        for (const { testId } of labelTestIds) {
            const labelLocator = this._page.getByTestId(testId);
            const color = await labelLocator.evaluate(
                (el) => window.getComputedStyle(el).color
            );
            expect(color).toBe('rgb(89, 97, 101)');
        }

        const dateValue = dateOfAuthorisationValue ?? await this.getFormattedDate();
        await expect(panel).toContainText(dateValue);

        await expect(panel).toContainText(signingClinicianLabel);
        await expect(panel).toContainText(signingClinicianValue);
    }

    async verifyMedicationUnderline(medicationName: string, shouldBeUnderlined: boolean) {
        const medSpan = this._page.locator(
            `//button[@data-testid="preparation-btn-${medicationName}"]/span`
        );
        await medSpan.waitFor({ state: 'visible', timeout: 5000 });
        const textDecoration = await medSpan.evaluate((el) =>
            window.getComputedStyle(el).textDecorationLine
        );
        if (shouldBeUnderlined) {
            expect(textDecoration).toContain('underline');
        } else {
            expect(textDecoration).not.toContain('underline');
        }
    }

    async hoverOnMedication(medicationName: string) {
        const medSpan = this._page.locator(
            `//button[@data-testid="preparation-btn-${medicationName}"]/span`
        );
        await medSpan.hover();
    }

    async getFormattedDate() {
        const today = new Date();
        return today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    }

    async validateDetailsPanelCloseScenario() {
        const panel = this._page.locator('[data-testid="medication-details-panel"]');
        await expect(panel).toBeVisible();
        await this.medicationHomePage.pastMedicationTab.click();
        await expect(panel).not.toBeVisible();
        await this.medicationHomePage.currentMedicationTab.click();
        await this.clickFirstMedicationButtonByPrefix("Aspirin 75mg tablets");
        await expect(panel).toBeVisible();
        await this.medicationHomePage.medsRefreshButton.click();
        await expect(panel).not.toBeVisible();
        await this.clickFirstMedicationButtonByPrefix("Aspirin 75mg tablets");
        await expect(panel).toBeVisible();
        await this.searchCurrentMedication("Aspirin 75mg tablets ");
        await expect(panel).not.toBeVisible();
        await this.clickFirstMedicationButtonByPrefix("Aspirin 75mg tablets");
        await this.medicationHomePage.btnGroupSortOpenButton.click();
        await this.medicationHomePage.btnGroupSortCloseButton.click();
        await expect(panel).toBeVisible();
        await this.medicationHomePage.btnGroupSortOpenButton.click();
        await this.medicationHomePage.btnGroupSortApplyButton.click();
        await expect(panel).not.toBeVisible();
    }

    async validateMedicationDetailsInCurrentTab() {
        await this.searchCurrentMedication("Aspirin 75mg tablets ");
        const medName = "Aspirin 75mg tablets";
        await this.clickFirstMedicationButtonByPrefix(medName);
        const dateValue = await this.getFormattedDate();
        await this.validateMedicationDetailsPanel({
            medicationName: medName,
            authorisingClinicianValue: 'TESTER, Faraday (Dr)',
            dateOfAuthorisationValue: dateValue,
            signingClinicianValue: 'TESTER, Faraday (Dr)'
        });
    }

    async validateMedicationDetailsInPastTab(
        addMedicationPanelActions,
        issueMedicationPanelActions,
        randomGuid: string
    ) {
        await this.clickPrescribeButton();
        const medName = `Aspirin 75mg tablets`;
        await addMedicationPanelActions.addAcuteMedication("Aspirin 75mg tablets", randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await this.clickMedsRefreshButton();
        await this.searchCurrentMedication(randomGuid);
        await this.medicationHomePage.currentMoreOptionsButton.nth(1).click();
        await this.endCourseMedicationActions.clickCurrentMedsEndCourseButton();
        await this.endCourseMedicationActions.clickEndCourseButton();
        await this.clickMedsRefreshButton();
        await this.clickPastMedicationTab();
        await this.searchPastMedication(randomGuid);
        await this.clickFirstMedicationButtonByPrefix(medName);
        const dateValue = await this.getFormattedDate();
        await this.validateMedicationDetailsPanel({
            medicationName: medName,
            authorisingClinicianValue: 'TESTER, Faraday (Dr)',
            dateOfAuthorisationValue: dateValue,
            signingClinicianValue: 'TESTER, Faraday (Dr)'
        });
    }

    async verifyMedicationDetailsPanelInCurrentAndPastTabsAtScreenSizes(
        addMedicationPanelActions,
        issueMedicationPanelActions,
        randomGuid: string,
        screenSizes: { width: number, height: number }[]
    ) {

        await this._page.setViewportSize({ width: 1600, height: 1100 });
        await this.clickPrescribeButton();
        const medName = `Aspirin 75mg tablets`;
        await addMedicationPanelActions.addAcuteMedication(medName, randomGuid, "20", "150");
        await issueMedicationPanelActions.issueMedication();
        await this.clickMedsRefreshButton();

        await this.searchCurrentMedication(medName);
        await this.clickFirstMedicationButtonByPrefix(medName);

        for (const size of screenSizes) {
            try {
                await this._page.setViewportSize({ width: size.width, height: size.height });
                const dateValue = await this.getFormattedDate();
                await this.validateMedicationDetailsPanel({
                    medicationName: medName,
                    authorisingClinicianValue: 'TESTER, Faraday (Dr)',
                    dateOfAuthorisationValue: dateValue,
                    signingClinicianValue: 'TESTER, Faraday (Dr)'
                });
            } catch (error) {
                throw new Error(`Error at screen size: width=${size.width}, height=${size.height}\n${error}`);
            }
        }

        await this._page.setViewportSize({ width: 1600, height: 1100 });

        const closeBtn = this.medicationHomePage.detailPanelCloseButton;
        await expect(closeBtn).toBeVisible();
        await closeBtn.scrollIntoViewIfNeeded();
        await this._page.waitForTimeout(200);
        await closeBtn.click();

        await this.medicationHomePage.currentMoreOptionsButton.nth(1).click();
        await this.endCourseMedicationActions.clickCurrentMedsEndCourseButton();
        await this.endCourseMedicationActions.clickEndCourseButton();

        await this.clickMedsRefreshButton();
        await this.clickPastMedicationTab();
        await this.searchPastMedication(medName);
        await this.clickFirstMedicationButtonByPrefix(medName);

        for (const size of screenSizes) {
            await this._page.setViewportSize({ width: size.width, height: size.height });
            const dateValue = await this.getFormattedDate();
            await this.validateMedicationDetailsPanel({
                medicationName: medName,
                authorisingClinicianValue: 'TESTER, Faraday (Dr)',
                dateOfAuthorisationValue: dateValue,
                signingClinicianValue: 'TESTER, Faraday (Dr)'
            });
        }
    }

    async getMedicationBadgesResponse_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(get_medication_badges_response));
        await this.medicationHomePage.currentMedicationTab.waitFor({ state: "visible" });
    }

    async getMedicationBadgesResponsePast_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(get_medication_badges_Past_response));
    }

    async checkMedicationNameColorInCurrentScreen() {
        const color = await this.medicationHomePage.medicationNameCurrent.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe("rgb(21, 82, 151)")
    }

    async checkMedicationNameColorInPastScreen() {
        const color = await this.medicationHomePage.medicationNamePast.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe("rgb(21, 82, 151)")
    }

    async clickPastMoreOptionsButton(index: number = 0) {
        await expect(this.medicationHomePage.pastMoreOptionsButton.nth(index)).toBeVisible();
        await this.medicationHomePage.pastMoreOptionsButton.nth(index).click();
    }

    async clickCurrentMoreOptionsButton(index: number = 0) {
        await expect(this.medicationHomePage.currentMoreOptionsButton.nth(index)).toBeVisible();
        await this.medicationHomePage.currentMoreOptionsButton.nth(index).click();
    }

    async expectMedsDiscardWarningText() {
        await expect(this.medicationHomePage.medsDiscardWarning).toBeVisible();
        await expect(this.medicationHomePage.medsDiscardWarning).toContainText("Discard issue request?");
        await expect(this.medicationHomePage.medsDiscardWarning).toContainText(
            "You have not finished requesting an issue for a medication. Are you sure you want to discard?"
        );
    }

    async clickDetailPanelCloseButton() {
        await this.medicationHomePage.detailPanelCloseButton.click();
    }

    async getMedicationBadgesInfoPanelResponse_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(get_medication_badges_info_section_response));
        await this.medicationHomePage.currentMedicationTab.waitFor({ state: "visible" });
    }

    async getMedicationDiffCDBadgesResponse_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(get_diff_cd_badges_response));
        await this.medicationHomePage.currentMedicationTab.waitFor({ state: "visible" });
    }

    async getDeleteMedication_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(delete_past_medication_response));
    }

    async getEndMedication_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(end_medication_current_response));
    }

    async waitForToastNotification(expectedText: string) {
        const toast = this._page.locator('[data-testid="acp-toast-container"]')
            .filter({ hasText: expectedText });
        await expect(toast).toBeVisible();
        await expect(toast).toContainText(expectedText);
    }

    async clickKebabMenuForMedication(medicationName: string) {
        await this._page.waitForTimeout(2000);
        const screenWidth = await this._page.evaluate(() => window.screen.width);
        let kebabMenuSelector: string;
        if (screenWidth > 575) {
            kebabMenuSelector = `//tr[td/div/div/div/button/span[contains(text(),'${medicationName}')]]/td/button[@data-testid='currentMoreOptionsButton']`;
        } else {
            kebabMenuSelector = `//tr[td/div/div/div/button/span[contains(text(),'${medicationName}')]]//button[@data-testid='currentMoreOptionsButton']`;
        }
        await this._page.waitForSelector(kebabMenuSelector);
        await this._page.locator(kebabMenuSelector).first().click();
    }

    async clickAddToPrescriptionButton() {
        await this.medicationHomePage.currentMedicationMoreOptions.addToPrescription.waitFor({ state: "visible" });
        await this.medicationHomePage.currentMedicationMoreOptions.addToPrescription.click();
    }

    async getDrugAndOrgLevelWarningsMedication_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(get_drug_and_org_level_warnings_response));
    }

    async getDrugAndOrgLevelWarningsOrganization_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(drug_and_org_level_warnings_Org_response));
    }

    async getPharmacyInfoShowMoreButtonCount() {
        return await this.medicationHomePage.pharmacyInfoShowMoreButton.count();
    }

    async getPharmacyInfoShowLessButtonCount() {
        return await this.medicationHomePage.pharmacyInfoShowLessButton.count();
    }

    async getPatientInfoShowMoreButtonCount() {
        return await this.medicationHomePage.patientInfoShowMoreButton.count();
    }

    async getPatientInfoShowLessButtonCount() {
        return await this.medicationHomePage.patientInfoShowLessButton.count();
    }

    async getMedsIncludeAllPrescriptionType_Mock() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(get_meds_include_all_prescription_type_response));
    }


}