import { expect, Locator, Page, test } from "@playwright/test";
import { RecordMedicationPage } from "../pages/record-medication-page";
import { ClinicalWarningPopupPage } from "../pages/clinical-warning-popup-page";
import { ClinicalWarningPopupActions } from "../actions/clinical-warning-popup-actions";
import { MedicationHomeActions } from './medication-home-actions';
import { CommonActions } from "./common-actions";
import { RegimeReviewPage } from "../pages/regime-review-page";
import { MedicationHomePage } from "../pages/medication-home-page";
import unexpired_regime_review_response from "../mock_data/unexpired_regime_review_response.json";
import expired_regime_review_response from "../mock_data/expired_regime_review_response.json";
import medication_badges_response from "../mock_data/get_meds_badges_response.json";

export class RegimeReviewActions {
    private page: Page;
    protected recordMedicationPanelActions: RecordMedicationPage;
    private clinicalWarningPopupActions: ClinicalWarningPopupActions;
    private medicationHomeActions: MedicationHomeActions;
    private commonActions: CommonActions;
    private regimeReviewPage: RegimeReviewPage;
    private medicationHomePage: MedicationHomePage;

    constructor(page: Page) {
        this.page = page;
        this.recordMedicationPanelActions = new RecordMedicationPage(this.page);
        this.clinicalWarningPopupActions = new ClinicalWarningPopupActions(this.page);
        this.medicationHomeActions = new MedicationHomeActions(this.page);
        this.medicationHomePage = new MedicationHomePage(this.page);
        this.commonActions = new CommonActions(this.page);
        this.regimeReviewPage = new RegimeReviewPage(this.page);
    }

    async clickSetReviewDateButton() {
        await this.page.waitForLoadState('load');
        await this.regimeReviewPage.setReviewDateButton.first().waitFor({ state: 'visible' })
        const screenWidth = await this.page.evaluate(() => window.screen.width);
        let locator;
        if (screenWidth <= 1500 && screenWidth >= 769) {
            locator = this.regimeReviewPage.setReviewDateButton.nth(0);
        } else if (screenWidth <= 768 && screenWidth >= 321) {
            locator = this.regimeReviewPage.setReviewDateButton.nth(2);
        } else if (screenWidth <= 320) {
            locator = this.regimeReviewPage.setReviewDateButton.nth(1);
        } else {
            locator = this.regimeReviewPage.setReviewDateButton.first();
        }
        await locator.click();
    }

    async isRegimeReviewPanelVisible() {
        await this.regimeReviewPage.regimeReviewPanel.first().waitFor({ state: 'visible' })
        await expect(this.regimeReviewPage.regimeReviewPanel.first()).toBeVisible();
    }

    async closeRegimeReviewPanel() {
        await this.regimeReviewPage.regimeReviewCloseButton.click();
    }

    async isRegimeReviewPanelClosed() {
        const element = this.regimeReviewPage.regimeReviewPanel;
        return !(await element.isVisible());
    }

    async isReviewDueDropdownVisible() {
        await this.page.waitForLoadState('load');
        const dropdownLocator = this.regimeReviewPage.reviewDueDropdown;
        await dropdownLocator.waitFor({ state: 'visible' })
        return dropdownLocator.isVisible();
    }

    async clickReviewDueDropdown() {
        const dropdownLocator = this.regimeReviewPage.reviewDueDropdown.nth(0);
        await dropdownLocator.waitFor({ state: 'visible' })
        await dropdownLocator.click();
    }

    async isDropdownMenuVisible() {
        const element = this.regimeReviewPage.reviewDueDropdownMenuContent;
        return element.isVisible();
    }

    async clickReviewMenu() {
        await this.regimeReviewPage.reviewMenu.click();
    }

    async clickReviewOverdueDropdown() {
        await this.page.waitForTimeout(2000);
        await this.regimeReviewPage.reviewOverDueDropdown.click();
    }

    async getCurrentReviewDateValue() {
        const element = this.regimeReviewPage.currentReviewDateTextBox;
        return element.getAttribute('value');
    }

    async isCurrentReviewDateTextBoxDisabled() {
        const element = this.regimeReviewPage.currentReviewDateTextBox;
        return element.isDisabled();
    }

    async isReviewCodeLabelVisible() {
        const element = this.regimeReviewPage.reviewCodeLabel;
        return element.isVisible();
    }

    async isDatePickerVisible() {
        const textBox = this.regimeReviewPage.datePickerTextBox;
        const picker = this.regimeReviewPage.datePicker;
        return (await textBox.isVisible()) && (await picker.isVisible());
    }

    async clickDatePicker() {
        await this.regimeReviewPage.datePicker.click();
    }

    async clickCancelButton() {
        await this.regimeReviewPage.cancelButton.click();
    }

    async clickOkButton() {
        await this.regimeReviewPage.regimeReviewPanelOkButton.click();
    }

    async fillDatePickerTextBox(value: string) {
        await this.regimeReviewPage.datePickerTextBox.fill(value);
    }

    async pressEnterOnDatePickerTextBox() {
        await this.regimeReviewPage.datePickerTextBox.press('Enter');
    }

    async isValidationBannerVisible() {
        return this.regimeReviewPage.validationBanner.isVisible();
    }

    async isValidationBannerTextVisible() {
        return this.regimeReviewPage.validationBannerText.isVisible();
    }

    async getValidationBannerText() {
        return this.regimeReviewPage.validationBannerText.textContent();
    }

    async isRemoveReviewDateOptionVisible() {
        return this.regimeReviewPage.removeReviewDateOption.isVisible();
    }

    async clickRemoveReviewDateOption() {
        await this.regimeReviewPage.removeReviewDateOption.click();
    }

    async isRemoveReviewDateAlertPanelVisible() {
        return this.regimeReviewPage.removeReviewDateAlertPanel.isVisible();
    }

    async clickRemoveReviewAlertPanelCloseButton() {
        await this.regimeReviewPage.removeReviewAlertPanelCloseButton.click();
    }

    async clickRemoveReviewAlertPanelRemoveButton() {
        await this.regimeReviewPage.removeReviewAlertPanelRemoveButton.click();
    }

    async setViewportWidth(width: number) {
        await this.page.setViewportSize({ width, height: 1200 });
        await this.page.waitForTimeout(1000);
    }

    async expectCurrentReviewDateIsToday() {
        const today = new Date();
        const expected = today.toLocaleDateString('en-GB');
        const value = await this.regimeReviewPage.currentReviewDateTextBox.inputValue();
        expect(value).toContain(today.getFullYear().toString());
    }

    async expectCurrentReviewDateInputIsDisabled() {
        await expect(this.regimeReviewPage.currentReviewDateTextBox).toBeDisabled();
    }

    async expectReviewCodeLabelIsVisible() {
        await expect(this.regimeReviewPage.reviewCodeLabel).toBeVisible();
    }

    async expectDatePickerIsVisibleAndEnabled() {
        await expect(this.regimeReviewPage.datePicker).toBeVisible();
        await expect(this.regimeReviewPage.datePicker).toBeEnabled();
    }

    async expectDatePickerInputHasConfigLimitDate() {
        const max = await this.regimeReviewPage.datePickerTextBox.getAttribute('value');
        expect(max).not.toBeNull();
    }

    async clearDatePickerInput() {
        await this.regimeReviewPage.datePickerTextBox.fill('');
        await this.regimeReviewPage.datePickerTextBox.blur();
    }

    async expectDateValidationError(message: string) {
        await expect(this.regimeReviewPage.datePickerErrorMessage).toBeVisible();
        await expect(this.regimeReviewPage.datePickerErrorMessage).toContainText(message);
    }

    async expectValidationBannerContains(text: string) {
        await expect(this.regimeReviewPage.validationBanner).toBeVisible();
        await expect(this.regimeReviewPage.validationBannerText).toContainText(text);
    }

    async expectDiscardErrorBannerIsVisible() {
        await expect(this.regimeReviewPage.discardErrorBanner).toBeVisible();
    }

    async expectRegimeReviewPanelIsHidden() {
        await expect(this.regimeReviewPage.regimeReviewPanel).toBeHidden();
    }

    async expectRegimeReviewPanelIsVisible() {
        await expect(this.regimeReviewPage.regimeReviewPanel).toBeVisible();
    }

    async clickDatePickerTextBox() {
        await this.regimeReviewPage.datePickerTextBox.click();
    }

    async expectDatePickerHasConfigLimitValue(days: number) {
        // await this.page.waitForTimeout(5000);
        await this.page.waitForLoadState('load');
        const value = await this.regimeReviewPage.datePickerTextBox.getAttribute('value');
        const expected = await this.getDateAfterDays(days);
        expect(value).toEqual(expected);
    }

    async getDateAfterDays(days: number): Promise<string> {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        return currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-');
    }
    async enterInvalidDateFormatText(value: string) {
        await this.regimeReviewPage.datePickerTextBox.fill(value);
    }

    async getFormattedDateWithOffset(offsetDays: number): Promise<string> {
        const today = new Date();
        today.setDate(today.getDate() + offsetDays);
        const day = today.getDate();
        const month = today.toLocaleString('en-US', { month: 'short' });
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    }

    async enterDateInDatePickerWithOffset(offsetDays: number) {
        const date = await this.getFormattedDateWithOffset(offsetDays);
        await this.regimeReviewPage.datePickerTextBox.fill(date);
    }

    async expectDatePickerErrorMessageIsNotVisible() {
        await expect(this.regimeReviewPage.datePickerErrorMessage).not.toBeVisible();
    }

    async expectSetReviewDateButtonIsVisible() {
        await this.page.waitForLoadState('load');
        await this.medicationHomePage.button.prescribe_large.waitFor({ state: 'visible' });
        await expect(this.regimeReviewPage.setReviewDateButton.first()).toBeVisible();
    }

    async expectReviewDueDropdownIsVisible() {
        await this.page.waitForLoadState('load');
        await this.medicationHomePage.button.prescribe_large.waitFor({ state: 'visible' });
        await expect(this.regimeReviewPage.reviewDueDropdown.nth(0)).toBeVisible();
    };

    async clickReviewOption() {
        await this.regimeReviewPage.reviewOption.click();
    }

    async getUnexpiredRegimeReviewResponse_Mock() {
        await this.commonActions.mockUrl("**/regime-review**", 200, () => JSON.stringify(unexpired_regime_review_response));
    }

    async getExpiredRegimeReviewResponse_Mock() {
        await this.commonActions.mockUrl("**/regime-review**", 200, () => JSON.stringify(expired_regime_review_response));
    }

    async expectReviewOverdueDropdownIsVisible() {
        await this.page.waitForLoadState('load');
        await this.medicationHomePage.button.prescribe_large.waitFor({ state: 'visible' });
        await expect(this.regimeReviewPage.reviewOverDueDropdown).toBeVisible();
    }
    async clickReviewOverdueDropdownButton() {
        await this.regimeReviewPage.reviewOverDueDropdown.click();
    }

    async expectDropdownMenuIsVisible() {
        await expect(this.regimeReviewPage.reviewDueDropdownMenuContent).toBeVisible();
    }

    async expectDaysBeforeTodayAreDisabled() {
        const currentDate = new Date();
        await this.selectOptionInDropdown(
            this.page,
            "//select[@name='months']",
            await this.getMonth(currentDate)
        );
        await this.selectOptionInDropdown(
            this.page,
            "//select[@name='years']",
            await this.getYear(currentDate)
        );
        const today = await this.getTodayDate(currentDate);
        const day = parseInt(today);
        for (let i = day - 1; i > 0; i--) {
            const btnElement = this.page.locator(
                await this.dateLocator(i.toString())
            );
            await expect(btnElement).toBeDisabled();
        }
    }

    async selectOptionInDropdown(page: Page | undefined, dropdownLocator: string, optionName: string) {
        const dropDownLocator = dropdownLocator;
        await page.selectOption(dropDownLocator, { label: optionName })
    }

    async getMonth(date: Date): Promise<string> {
        const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = date.getFullYear();
        const month = (date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const currentMonthName = monthName[(month.replace(/^0+/, ''))];
        return currentMonthName;
    }

    async getYear(date: Date): Promise<string> {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return year.toString().padStart(2, '0');
    }

    async getTodayDate(date: Date): Promise<string> {
        const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = date.getFullYear();
        const month = (date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const currentMonthName = monthName[(month.replace(/^0+/, ''))];
        return day;
    }

    async dateLocator(day: string): Promise<string> {
        const todayLocator = `//button[text()=${day}]`
        return todayLocator;
    }

    async expectFutureDatesBeyond365DaysAreDisabled() {
        const currentDate = new Date();
        await this.selectOptionInDropdown(
            this.page,
            "//select[@name='months']",
            await this.getMonth(currentDate)
        );
        const nextYear = (parseInt(await this.getYear(currentDate)) + 1).toString();
        await this.selectOptionInDropdown(
            this.page,
            "//select[@name='years']",
            nextYear
        );
        const numberOfDaysInCurrentMonth = await this.regimeReviewPage.dayLocator.count();
        const today = await this.getTodayDate(currentDate);
        const day = parseInt(today);
        for (let i = day + 2; i < numberOfDaysInCurrentMonth + 1; i++) {
            const btnElement = this.page.locator(
                await this.dateLocator(i.toString())
            );
            await expect(btnElement).toBeDisabled();
        }
    }

    async expectTodayDateIsDisabled() {
        const currentDate = new Date();
        await this.page.waitForLoadState('load');
        await this.selectOptionInDropdown(this.page, "//select[@name='months']", await this.getMonth(currentDate));
        await this.selectOptionInDropdown(this.page, "//select[@name='years']", await this.getYear(currentDate));
        const today = await this.getTodayDate(currentDate);
        const todayDateLocator = await this.dateLocator(today);
        const btnElement = this.page.locator(todayDateLocator);
        await expect(btnElement).toBeDisabled();
    }

    async expectFutureDatesBefore365DaysAreEnabled() {
        const currentDate = new Date();
        await this.selectOptionInDropdown(
            this.page,
            "//select[@name='months']",
            await this.getMonth(currentDate)
        );
        const nextYear = (parseInt(await this.getYear(currentDate)) + 1).toString();
        await this.selectOptionInDropdown(
            this.page,
            "//select[@name='years']",
            nextYear
        );
        const numberOfDaysInCurrentMonth = await this.regimeReviewPage.dayLocator.count();
        const today = await this.getTodayDate(currentDate);
        const day = parseInt(today);
        for (let i = day; i > 0; i--) {
            const btnElement = this.page.locator(await this.dateLocator(i.toString()));
            await expect(btnElement).toBeEnabled();
        }
    }

    async expectRemoveReviewDateOptionIsVisible() {
        await expect(this.regimeReviewPage.removeReviewDateOption).toBeVisible();
    }

    async expectRemoveReviewDateAlertPanelIsVisible() {
        await expect(this.regimeReviewPage.removeReviewDateAlertPanel).toBeVisible();
    }

    async expectRemoveReviewDateDialogContent() {
        await expect(this.regimeReviewPage.removeReviewAlertPanelTexts).toContainText("Are you sure that you want to remove the regime review date?");
    }

    async expectRemoveRegimeReviewDateTextIsVisible() {
        await expect(this.page.getByText("Remove regime review date")).toBeVisible();
    }

    async clickRemoveReviewDateCloseButton() {
        await this.regimeReviewPage.removeReviewAlertPanelCloseButton.click();
    }

    async expectRemoveReviewDatePanelIsClosed() {
        await expect(this.regimeReviewPage.removeReviewDateAlertPanel).toBeHidden();
    }

    async clickRemoveReviewDateCancelButton() {
        await this.regimeReviewPage.removeReviewAlertPanelCancelButton.click();
    }

    async clickRemoveReviewDateRemoveButton() {
        await this.regimeReviewPage.removeReviewAlertPanelRemoveButton.click();
    }


    async blockRemoveRegimeReviewUrl() {
        await this.page.waitForLoadState('load');
        await this.commonActions.blockAPI('**/regime-review');
    }

    async expectRemoveReviewDateApiErrorPanelIsVisible() {
        const errorText = "Something went wrongWe couldn't remove the regime review date. Try again.";
        await expect(this.regimeReviewPage.removeReviewDateApiErrorBanner).toBeVisible();
        await expect(this.regimeReviewPage.removeReviewDateApiErrorMessage).toBeVisible();
        const actualApiErrorMessage = await this.regimeReviewPage.removeReviewDateApiErrorMessage.textContent();
        await expect(actualApiErrorMessage).toEqual(errorText);
    }

    async expectReviewDueDropdownIsVisibleForScreenWidth() {
        await this.medicationHomePage.currentMedicationTab.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('load');
        const screenWidth = await this.page.evaluate(() => window.screen.width);
        if (screenWidth >= 1200) {
            await expect(this.regimeReviewPage.reviewDueDropdown.nth(0)).toBeVisible();
        } else if (screenWidth <= 1200 && screenWidth >= 992) {
            await expect(this.regimeReviewPage.reviewDueDropdown.nth(0)).toBeVisible();
        } else if (screenWidth <= 768 && screenWidth >= 321) {
            await expect(this.regimeReviewPage.reviewDueDropdown.nth(2)).toBeVisible();
        } else if (screenWidth <= 320) {
            await expect(this.regimeReviewPage.reviewDueDropdown.nth(1)).toBeVisible();
        }
    }


    async clickReviewDueDropdownForScreenWidth() {
        await this.medicationHomePage.currentMedicationTab.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('load');
        const screenWidth = await this.page.evaluate(() => window.screen.width);
        if (screenWidth >= 1200) {
            await this.regimeReviewPage.reviewDueDropdown.nth(0).click();
        } else if (screenWidth <= 1199 && screenWidth >= 769) {
            await this.regimeReviewPage.reviewDueDropdown.nth(0).click();
        } else if (screenWidth < 769 && screenWidth >= 576) {
            const reviewDueDropdown = "(//button[@data-testid='meds-review-due-button'])[3]";
            await this.page.waitForSelector(reviewDueDropdown, { timeout: 20000 });
            await this.regimeReviewPage.reviewDueDropdown.nth(2).click();
        } else if (screenWidth <= 320) {
            const reviewDueDropdown = "(//button[@data-testid='meds-review-due-button'])[2]";
            await this.page.waitForSelector(reviewDueDropdown, { timeout: 20000 });
            await this.regimeReviewPage.reviewDueDropdown.nth(1).click();
        }
    }


    async expectMedicationReviewRadioButtonIsSelectedByDefault() {
        const isSelected = await this.regimeReviewPage.defaultRadioButton.isChecked();
        expect(isSelected).toBeTruthy();
    }

    async expectAllReviewTypesWithRadioButtonsAreDisplayed() {
        await this.page.waitForLoadState('load');
        const allReviewCodes = await this.getAllReviewCode(await this.regimeReviewPage.eachReviewCodeType);
        expect(await this.veifyEachDataPresentIntheArray(this.regimeReviewPage.allReviewCodes, allReviewCodes)).toBeTruthy();
    }

    async getAllReviewCode(eachReviewCodeLocator: Locator): Promise<string[]> {
        const reviewCount = await eachReviewCodeLocator.count();
        let allReviewCodes: (string | null)[] = [];
        for (let i = 0; i < reviewCount; i++) {
            let reviewCodeEach = await eachReviewCodeLocator.nth(i).textContent();
            allReviewCodes.push(reviewCodeEach);
        }
        return allReviewCodes as string[];
    }

    async veifyEachDataPresentIntheArray(array1: string[], array2: string[]): Promise<boolean> {
        const arrayA = await array1;
        const arrayB = await array2;
        for (const elementB of arrayB) {
            if (!arrayA.includes(elementB)) {
                await console.log(`This one is not there: ${elementB}`);
                return false;
            }
        }
        return true;
    }

    async expectEachReviewTypeRadioButtonIsSelectable() {
        const reviewCodeButtons = this.regimeReviewPage.eachReviewCodeTypeButton;
        const count = await reviewCodeButtons.count();
        for (let i = 0; i < count; i++) {
            const button = reviewCodeButtons.nth(i);
            await button.click();
            expect(await button.isChecked()).toBeTruthy();
        }
    }

    async expectOnlyOneReviewTypeRadioButtonIsSelectableAtOnce() {
        const radioButtons = this.regimeReviewPage.eachReviewCodeTypeButton;
        const count = await radioButtons.count();
        for (let i = 0; i < count; i++) {
            await radioButtons.nth(i).click();
            for (let j = 0; j < count; j++) {
                const isChecked = await radioButtons.nth(j).isChecked();
                if (i === j) {
                    expect(isChecked).toBeTruthy();
                } else {
                    expect(isChecked).toBeFalsy();
                }
            }
        }
    }

    async expectScrollbarIsVisibleForReviewCodeSection() {
        await this.regimeReviewPage.reviewCodeSection.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);
        const hasScrollbar = await this.isScrollbarVisible("//div[@data-testid='reviewCodeElement']");
        expect(hasScrollbar).toBe(true);
    }

    async isScrollbarVisible(selector: string) {
        const element = await this.page.locator(selector);
        if (!element) {
            throw new Error(`Element with selector "${selector}" not found`);
        }
        const scrollHeight = await element.evaluate(el => el.scrollHeight);
        const clientHeight = await element.evaluate(el => el.clientHeight);
        const scrollWidth = await element.evaluate(el => el.scrollWidth);
        const clientWidth = await element.evaluate(el => el.clientWidth);

        return (scrollHeight > clientHeight) || (scrollWidth > clientWidth);
    }

    async expectScrollbarIsScrollable() {
        const reviewCodeSection = "div[data-testid='reviewCodeElement']";
        await this.page.waitForTimeout(2000);
        const isScrollable = await this.isScrollbarVisible(reviewCodeSection);
        expect(isScrollable).toBe(true);
    }

    async getRegimeReviewCodesResponse_Mock() {
        await this.commonActions.mockUrl("**/medication-configurations/organisation", 200, () => JSON.stringify(medication_badges_response));
    }

    async expectSetReviewDateButtonIsNotVisible() {
        await expect(this.regimeReviewPage.setReviewDateButton.first()).not.toBeVisible();
    }
}
