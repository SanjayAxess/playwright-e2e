import { expect, Page } from '@playwright/test';
import { CommonActions } from "./common-actions";
import request_issue_response from "../mock_data/request_issue_response.json";
import { AddMedicationPanelActions } from './prescribe-add-medication-panel-actions';
import { RequestIssuePage } from '../pages/request-issue-page';

export class RequestIssueActions {
    protected commonActions: CommonActions;
    protected requestIssuePage: RequestIssuePage;

    constructor(protected readonly _page: Page) {
        this.commonActions = new CommonActions(this._page);
        this.requestIssuePage = new RequestIssuePage(this._page);
    }

    async mockRequestIssueResponse() {
        await this.commonActions.mockUrl("**/medications**", 200, () => JSON.stringify(request_issue_response));
    }

    async validatePendingIconForCurrentRequestedMedication(expectedTooltip: string) {

        await this._page.waitForTimeout(1000);
        await expect(this.requestIssuePage.currentPendingIcon).toBeVisible({ timeout: 10000 });
        await this.requestIssuePage.currentPendingIcon.hover();
        const tooltip = this._page.locator("td>svg>title").first();
        await expect(tooltip).toHaveCount(1); 
        const tooltipText = await tooltip.textContent();
        const normalize = (str: string | null | undefined) => str?.replace(/\s+/g, ' ').trim();
        expect(normalize(tooltipText)).toContain(normalize(expectedTooltip));
    }

    async validatePendingIconForPastMedication(expectedTooltip: string) {

        await this._page.waitForTimeout(1000); 
        await expect(this._page.getByTestId("request-issue-requested-icon")).toBeVisible({ timeout: 10000 });
        await this._page.getByTestId("request-issue-requested-icon").hover();
        const tooltip = this._page.locator("td>svg>title").first();
        await expect(tooltip).toHaveCount(1); 
        const tooltipText = await tooltip.textContent();
        const normalize = (str: string | null | undefined) => str?.replace(/\s+/g, ' ').trim();
        expect(normalize(tooltipText)).toContain(normalize(expectedTooltip));
    }

    async validateRejectedIconForCurrentMedication(expectedTooltip: string) {
        await expect(this.requestIssuePage.currentRejectedIcon).toBeVisible({ timeout: 10000 });
        await this.requestIssuePage.currentRejectedIcon.hover();
        const tooltip = this._page.locator("td>svg>title").first();
        await expect(tooltip).toHaveCount(1);
        const tooltipText = await tooltip.textContent();
        const normalize = (str: string | null | undefined) => str?.replace(/\s+/g, ' ').trim();
        expect(normalize(tooltipText)).toContain(normalize(expectedTooltip));
    }

    async validateRejectedIconForPastMedication(expectedTooltip: string) {
        await expect(this.requestIssuePage.pastRejectedIcon).toBeVisible({ timeout: 10000 });
        await this.requestIssuePage.pastRejectedIcon.hover();
        const tooltip = this._page.locator("td>svg>title").first();
        await expect(tooltip).toHaveCount(1);
        const tooltipText = await tooltip.textContent();
        const normalize = (str: string | null | undefined) => str?.replace(/\s+/g, ' ').trim();
        expect(normalize(tooltipText)).toContain(normalize(expectedTooltip));
    }

    async hoverCurrentMedsRequestIssue() {
        await this.requestIssuePage.currentMedsRequestIssue.hover();
    }

    async clickCurrentMedsRequestIssue() {
        await this.requestIssuePage.currentMedsRequestIssue.click();
    }

    async clickShowSuggestionsButton() {
        await this.requestIssuePage.showSuggestionsButton.click();
    }

    async searchAndSelectUserByName(userName?: string) {
        let requestIssueUser = userName;
        const env = process.env.ENV?.toLowerCase();

        if (!requestIssueUser) {
            if (env === 'dev' || env === 'int') {
                requestIssueUser = 'WATSON, Emma (Miss)';
            } else if (env === 'stg') {
                requestIssueUser = 'Maggie Smith';
            }
        }

        console.log(`Running in ENV: ${env}, searching for user: ${requestIssueUser}`);

        if (!requestIssueUser) {
            throw new Error(`User name could not be resolved for environment: ${env}. Please provide a userName explicitly.`);
        }

        await this.requestIssuePage.usersSinglePickerInput.fill(requestIssueUser);
        const userOption = this.requestIssuePage.userSinglePickerDropdownItems.filter({ hasText: requestIssueUser }).first();
        await userOption.waitFor({ state: 'visible' });
        await userOption.click();
    }

    async clickRequestIssueButton() {
        await this.requestIssuePage.requestIssueButton.click();
    }

    async clickRequestIssueCancelButton() {
        await this.requestIssuePage.requestIssueCancelButton.click();
    }

    async expectCurrentRequestIssueOptionEnabled() {
        await expect(this.requestIssuePage.currentMedsRequestIssue).toBeEnabled();
    }

    async expectCurrentRequestIssueOptionDisabled() {
        await expect(this.requestIssuePage.currentMedsRequestIssue).toBeDisabled();
    }

    async hoverPastMedsRequestIssue() {
        await this.requestIssuePage.pastMedsRequestIssue.hover();
    }

    async clickPastMedsRequestIssue() {
        await this.requestIssuePage.pastMedsRequestIssue.click();
    }

    async expectPastRequestIssueOptionEnabled() {
        await expect(this.requestIssuePage.pastMedsRequestIssue).toBeEnabled();
    }

    async expectPastRequestIssueOptionDisabled() {
        await expect(this.requestIssuePage.pastMedsRequestIssue).toBeDisabled();
    }

    async expectRequestIssuePanelOpened() {
        await expect(this.requestIssuePage.requestIssuePanelHeader).toBeVisible();
    }

    async expectRequestIssuePanelClosed() {
        await expect(this.requestIssuePage.requestIssuePanelHeader).not.toBeVisible();
    }

    async clickHighPriorityCheckbox() {
        await this.requestIssuePage.highPriorityCheckbox.click();
    }

    async expectHighPriorityCheckboxChecked() {
        await expect(this.requestIssuePage.highPriorityCheckbox).toBeChecked();
    }

    async expectHighPriorityCheckboxUnchecked() {
        await expect(this.requestIssuePage.highPriorityCheckbox).not.toBeChecked();
    }

    async clickRequestIssueDialogHeaderCloseButton() {
        await this.requestIssuePage.requestIssueDialogHeaderCloseButton.click();
    }

    async clickRequestIssueWarningCancelButton() {
        await this.requestIssuePage.requestIssueWarningCancelButton.click();
    }

    async clickRequestIssueWarningDiscardButton() {
        await this.requestIssuePage.requestIssueWarningDiscardButton.click();
    }

    async expectRequestIssuePanelMedicationNameIs(expectedName: string) {
        await expect(this.requestIssuePage.requestIssuePanelMedicationName).toHaveText(new RegExp(expectedName, 'i'));
    }

    async validateSendRequestToInputFieldForCurrentMedication() {
        const env = process.env.ENV?.toLowerCase();
        let searchUser: string;
        let expectedSelectedValue: string;

        if (env === 'dev' || env === 'int') {
            searchUser = 'Emma WATSON';
            expectedSelectedValue = 'WATSON, Emma (Miss)';
        } else if (env === 'stg') {
            searchUser = 'Maggie Smith';
            expectedSelectedValue = 'SMITH, Maggie (Miss)';
        } else {
            throw new Error(`Unknown environment: ${env}. Please update the user selection logic.`);
        }

        await this.requestIssuePage.usersSinglePickerInput.click();
        await this.requestIssuePage.usersSinglePickerInput.fill(searchUser);

        const userOption = this.requestIssuePage.userSinglePickerDropdownItems.first();
        await userOption.waitFor({ state: 'visible' });
        await userOption.click();

        await expect(this.requestIssuePage.usersSinglePickerInput).toHaveValue(expectedSelectedValue);
    }

    async selectSendRequestToUser() {
        const env = process.env.ENV?.toLowerCase();
        let searchUser: string;
        let expectedSelectedValue: string;

        // Default to dev/int values if environment is not set
        if (!env || env === 'dev' || env === 'int') {
            searchUser = 'Emma WATSON';
            expectedSelectedValue = 'WATSON, Emma (Miss)';
        } else if (env === 'stg') {
            searchUser = 'Maggie Smith';
            expectedSelectedValue = 'SMITH, Maggie (Miss)';
        } else {
            console.warn(`Unknown environment: ${env}, defaulting to dev/int user.`);
            searchUser = 'Emma WATSON';
            expectedSelectedValue = 'WATSON, Emma (Miss)';
        }

        await this.requestIssuePage.usersSinglePickerInput.click();
        await this.requestIssuePage.usersSinglePickerInput.fill(searchUser);

        const userOption = this.requestIssuePage.userSinglePickerDropdownItems.first();
        await userOption.waitFor({ state: 'visible' });
        await userOption.click();
    }

    async validateSendRequestToInputFieldForPastMedication() {
        const env = process.env.ENV?.toLowerCase();
        let searchUser: string;
        let expectedSelectedValue: string;

        if (env === 'dev' || env === 'int') {
            searchUser = 'Emma WATSON';
            expectedSelectedValue = 'WATSON, Emma (Miss)';
        } else if (env === 'stg') {
            searchUser = 'Maggie Smith';
            expectedSelectedValue = 'SMITH, Maggie (Miss)';
        } else {
            throw new Error(`Unknown environment: ${env}. Please update the user selection logic.`);
        }

        await this.requestIssuePage.usersSinglePickerInput.click();
        await this.requestIssuePage.usersSinglePickerInput.fill(searchUser);

        const userOption = this.requestIssuePage.userSinglePickerDropdownItems.first();
        await userOption.waitFor({ state: 'visible' });
        await userOption.click();

        await expect(this.requestIssuePage.usersSinglePickerInput).toHaveValue(expectedSelectedValue);
    }

    async selectAnAuthorisingClinicianErrorInCurrentMedication() {
        await this.requestIssuePage.requestIssueButton.click();
        await expect(this.requestIssuePage.selectAnAuthorisingClinicianError).toBeVisible();
        await expect(this.requestIssuePage.selectAnAuthorisingClinicianError).toContainText("Select an authorising clinician.");
        await expect(this.requestIssuePage.requestIssueValidationBannerContent).toBeVisible();
        await expect(this.requestIssuePage.requestIssueValidationBannerContent).toContainText("Some fields require attention.");
        await expect(this.requestIssuePage.requestIssueValidationBannerContent).toContainText("Correct the errors indicated before proceeding.");
    }

    async selectAnAuthorisingClinicianErrorInPastMedication() {
        await this.requestIssuePage.requestIssueButton.click();
        await expect(this.requestIssuePage.selectAnAuthorisingClinicianError).toBeVisible();
        await expect(this.requestIssuePage.selectAnAuthorisingClinicianError).toContainText("Select an authorising clinician.");
        await expect(this.requestIssuePage.requestIssueValidationBannerContent).toBeVisible();
        await expect(this.requestIssuePage.requestIssueValidationBannerContent).toContainText("Some fields require attention.");
        await expect(this.requestIssuePage.requestIssueValidationBannerContent).toContainText("Correct the errors indicated before proceeding.");
    }

    async selectClinicianWithoutPrescribingRightsAndRequestIssue() {
        const env = process.env.ENV?.toLowerCase();
        let searchUser: string;

        if (env === 'dev' || env === 'int') {
            searchUser = 'Mendeleev Automation';
        } else if (env === 'stg') {
            searchUser = 'Lovelace';
        } else {
            throw new Error(`Unknown environment: ${env}. Please update the user selection logic.`);
        }

        await this.requestIssuePage.usersSinglePickerInput.click();
        await this.requestIssuePage.usersSinglePickerInput.fill(searchUser);
        const userOption = this.requestIssuePage.userSinglePickerDropdownItems.first();
        await userOption.waitFor({ state: 'visible' });
        await userOption.click();
    }

    async expectClinicianNotAuthorisedErrorAndValidationBanner() {
        await this.requestIssuePage.requestIssueButton.click();
        await expect(this.requestIssuePage.clinicianNotAuthorisedError)
            .toBeVisible();
        await expect(this.requestIssuePage.clinicianNotAuthorisedError)
            .toContainText("This clinician is not authorised to prescribe the selected medication. Select a different clinician.");
        await expect(this.requestIssuePage.requestIssueValidationBannerContent)
            .toBeVisible();
        await expect(this.requestIssuePage.requestIssueValidationBannerContent)
            .toContainText("Some fields require attention.");
        await expect(this.requestIssuePage.requestIssueValidationBannerContent)
            .toContainText("Correct the errors indicated before proceeding.");
    }

    async expectCouldntRequestIssueErrorVisible() {
        await expect(this.requestIssuePage.couldntRequestIssueError).toBeVisible();
        await expect(this.requestIssuePage.couldntRequestIssueError).toContainText("Couldn't request issue");
    }

    async validateRequestIssueApiFailureError() {
        await this.commonActions.blockAPI("**/prescription-requests**")
        await this.requestIssuePage.requestIssueButton.click();
        await expect(this.requestIssuePage.requestIssueAPIError).toBeVisible();
        await expect(this.requestIssuePage.requestIssueAPIError).toContainText("Couldn't request issue");
        await expect(this.requestIssuePage.requestIssueAPIError).toContainText("Try again");
    }
}