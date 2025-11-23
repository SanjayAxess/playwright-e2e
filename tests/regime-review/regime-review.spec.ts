import { beforeEachMedication, generateRandomGuid } from "../../fixtures/beforeEach";
import { beforeEach, feature, epic } from "@emisgroup/xgp-playwright-boilerplate";
import { test } from "../../fixtures/test";

test.describe("Regime review date validation", () => {
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

    test('should display validation error when date is not entered and Ok is clicked', { tag: ["@US406765"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clearDatePickerInput();
        await regimeReviewActions.expectDateValidationError('Validation error Enter a valid date.');
        await regimeReview.regimeReviewPanelOkButton.click();
        await regimeReviewActions.expectValidationBannerContains('Some fields require attention.Correct the errors indicated before proceeding.');
        await regimeReviewActions.expectDateValidationError('Validation error Enter a valid date.');
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display validation error when invalid date format is entered and Ok is clicked', { tag: ["@US406765", "@regression"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox()
        await regimeReviewActions.enterInvalidDateFormatText('21/june/25');
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the format DD/MM/YYYY.');
        await regimeReview.regimeReviewPanelOkButton.click();
        await regimeReviewActions.expectValidationBannerContains('Some fields require attention.Correct the errors indicated before proceeding.');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the format DD/MM/YYYY.');
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();

    });
    test('should display validation error when past date is entered and Ok is clicked', { tag: ["@US406765", "@regression"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox();
        await regimeReviewActions.enterDateInDatePickerWithOffset(-3);
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReview.regimeReviewPanelOkButton.click();
        await regimeReviewActions.expectValidationBannerContains('Some fields require attention.Correct the errors indicated before proceeding.');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display validation error when today\'s date is entered and Ok is clicked', { tag: ["@US406765", "@regression"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox();
        await regimeReviewActions.enterDateInDatePickerWithOffset(0);
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReview.regimeReviewPanelOkButton.click();
        await regimeReviewActions.expectValidationBannerContains('Some fields require attention.Correct the errors indicated before proceeding.');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display validation error when date after 12 months is entered and Ok is clicked', { tag: ["@US406765", "@regression"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox();
        await regimeReviewActions.enterDateInDatePickerWithOffset(367);
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReview.regimeReviewPanelOkButton.click();
        await regimeReviewActions.expectValidationBannerContains('Some fields require attention.Correct the errors indicated before proceeding.');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should not display error when valid future date is entered and Ok is clicked', { tag: ["@US406765", "@regression"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox();
        await regimeReviewActions.enterDateInDatePickerWithOffset(3);;
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDatePickerErrorMessageIsNotVisible();
    });

    test('should display required error message when invalid date format is entered after past date', { tag: ["@US406765", "@regression"] }, async ({ page, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox();
        await regimeReviewActions.enterDateInDatePickerWithOffset(-3);
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the future and no more than 12 months from today.');
        await regimeReviewActions.enterInvalidDateFormatText('invalid-date');
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDateValidationError('Validation error Date must be in the format DD/MM/YYYY.');
    });

    test('should display Set review date button when patient has no review date set', { tag: ["@US372566", "@US372095"] }, async ({ page, commonActions, regimeReview, regimeReviewActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Review due dropdown and open Regime Review panel for patient with review date set', { tag: ["@US372566", "@stg", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Review overdue dropdown and open Regime Review panel for overdue review date', { tag: ["@US372566"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getExpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewOverdueDropdownIsVisible();
        await regimeReviewActions.clickReviewOverdueDropdownButton();
        await regimeReviewActions.expectDropdownMenuIsVisible();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Regime review detailed panel when patient has no review due set', { tag: ["@US372097", "@US428223", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.expectDatePickerHasConfigLimitValue(180);
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectDaysBeforeTodayAreDisabled();
        await regimeReviewActions.expectFutureDatesBeyond365DaysAreDisabled();
        await regimeReviewActions.expectTodayDateIsDisabled();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should disable future dates beyond 365 days in date picker', { tag: ["@US372097", "@US428223", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectFutureDatesBeyond365DaysAreDisabled();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should disable days before today in date picker', { tag: ["@US372097", "@US428223", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectDaysBeforeTodayAreDisabled();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should disable today\'s date in regime review datepicker', { tag: ["@US372097", "@US428223", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectTodayDateIsDisabled();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Regime review detailed panel for overdue review date', { tag: ["@US372097", "@US428223", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getExpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewOverdueDropdownIsVisible();
        await regimeReviewActions.clickReviewOverdueDropdownButton();
        await regimeReviewActions.expectDropdownMenuIsVisible();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.expectDatePickerHasConfigLimitValue(180);
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectDaysBeforeTodayAreDisabled();
        await regimeReviewActions.expectFutureDatesBeyond365DaysAreDisabled();
        await regimeReviewActions.expectTodayDateIsDisabled();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Regime review detailed panel for patient with unexpired review date set', { tag: ["@US372097", "@US428223", "@view_meds_prod"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.expectDatePickerHasConfigLimitValue(180);
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectDaysBeforeTodayAreDisabled();
        await regimeReviewActions.expectFutureDatesBeyond365DaysAreDisabled();
        await regimeReviewActions.expectTodayDateIsDisabled();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Discard regime review error banner when user clicks X for patient without regime review', { tag: ["@US404535", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCloseButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCancelButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Discard regime review error banner when user clicks cancel for patient without regime review', { tag: ["@US404535", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCloseButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCancelButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Discard regime review error banner when user clicks X for patient with regime review due', { tag: ["@US404535", "@stg"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCloseButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCancelButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Discard regime review error banner when user clicks cancel for patient with regime review due', { tag: ["@US404535", "@stg"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCloseButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCancelButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Discard regime review error banner when user clicks X for patient with regime review overdue', { tag: ["@US404535", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getExpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewOverdueDropdownIsVisible();
        await regimeReviewActions.clickReviewOverdueDropdown();
        await regimeReviewActions.expectDropdownMenuIsVisible();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCloseButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCancelButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display Discard regime review error banner when user clicks cancel for patient with regime review overdue', { tag: ["@US404535"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getExpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewOverdueDropdownIsVisible();
        await regimeReviewActions.clickReviewOverdueDropdownButton();
        await regimeReviewActions.expectDropdownMenuIsVisible();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCloseButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardCancelButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should enable future dates before 365 days in datepicker', { tag: ["@US372097", "@US428223", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectCurrentReviewDateInputIsDisabled();
        await regimeReviewActions.expectReviewCodeLabelIsVisible();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePicker();
        await regimeReviewActions.expectFutureDatesBefore365DaysAreEnabled();
    });

    test('should display Review due dropdown and open Regime Review panel for patient with review date set (stg)', { tag: ["@US372566", "@stg"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.regimeReviewCloseButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
    });

    test('should display Regime Review date field in medication page', { tag: ["@view_meds_prod", "@pr_check"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
    });

    test('should close Remove regime review date panel and not remove review date when close button is clicked', { tag: ["@US404596"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisibleForScreenWidth();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReviewActions.expectRemoveReviewDateOptionIsVisible();
        await regimeReview.removeReviewDateOption.click();
        await regimeReviewActions.expectRemoveReviewDateAlertPanelIsVisible();
        await regimeReviewActions.expectRemoveReviewDateDialogContent();
        await regimeReviewActions.expectRemoveRegimeReviewDateTextIsVisible();
        await regimeReviewActions.clickRemoveReviewDateCloseButton();
        await regimeReviewActions.expectRemoveReviewDatePanelIsClosed();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
    });

    test('should close Remove regime review date panel and not remove review date when cancel button is clicked', { tag: ["@US404596", "@regression", "@view_meds_prod"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1600, height: 1100 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReviewActions.expectRemoveReviewDateOptionIsVisible();
        await regimeReview.removeReviewDateOption.click();
        await regimeReviewActions.expectRemoveReviewDateAlertPanelIsVisible();
        await regimeReviewActions.expectRemoveReviewDateDialogContent();
        await regimeReviewActions.expectRemoveRegimeReviewDateTextIsVisible();
        await regimeReviewActions.clickRemoveReviewDateCancelButton();
        await regimeReviewActions.expectRemoveReviewDatePanelIsClosed();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
    });

    const viewports = [
        { width: 1200, height: 1100, description: "1200px screen" },
        { width: 992, height: 720, description: "992px screen" },
        { width: 768, height: 720, description: "768px screen" },
        { width: 576, height: 720, description: "576px screen" },
        { width: 320, height: 720, description: "320px screen" }
    ];

    viewports.forEach(({ width, height, description }) => {
        test(`should display error banner when removing regime review fails (API error, ${description})`, { tag: ["@US410368", "@view_meds_prod"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
            await page.setViewportSize({ width, height });
            await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
            await page.waitForLoadState('load');
            await regimeReviewActions.expectReviewDueDropdownIsVisibleForScreenWidth();
            await regimeReviewActions.blockRemoveRegimeReviewUrl();
            await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
            await regimeReviewActions.expectRemoveReviewDateOptionIsVisible();
            await regimeReview.removeReviewDateOption.click();
            await regimeReviewActions.expectRemoveReviewDateAlertPanelIsVisible();
            await regimeReviewActions.clickRemoveReviewDateRemoveButton();
            await regimeReviewActions.expectRemoveReviewDateApiErrorPanelIsVisible();
            await regimeReviewActions.clickRemoveReviewDateCancelButton();
            await regimeReviewActions.expectRemoveReviewDatePanelIsClosed();
        });
    });
});

test.describe("Regime review code validation", () => {
    test.beforeEach(beforeEach);
    test.beforeEach(beforeEachMedication);
    let randomGuid: string;
    test.beforeEach(async () => {
        randomGuid = generateRandomGuid();
    });
    test.afterEach(async ({ commonActions }) => {
        await commonActions.unMockUrl();
        await commonActions.unBlockAllUrls();
    });

    test('should display all review types from coded list in regime review detailed panel', { tag: ["@US372096"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1200, height: 720 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectMedicationReviewRadioButtonIsSelectedByDefault();
        await regimeReviewActions.expectAllReviewTypesWithRadioButtonsAreDisplayed();
    });

    test('should allow selecting each review type radio button in regime review detailed panel', { tag: ["@US372096", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectMedicationReviewRadioButtonIsSelectedByDefault();
        await regimeReviewActions.expectAllReviewTypesWithRadioButtonsAreDisplayed();
        await regimeReviewActions.expectEachReviewTypeRadioButtonIsSelectable();
    });

    test('should allow selecting each review type radio button for patient with review date set', { tag: ["@US372096"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReview.reviewOption.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectMedicationReviewRadioButtonIsSelectedByDefault();
        await regimeReviewActions.expectAllReviewTypesWithRadioButtonsAreDisplayed();
        await regimeReviewActions.expectEachReviewTypeRadioButtonIsSelectable();
    });

    test('should not allow selecting more than one review type at once', { tag: ["@US372096", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectMedicationReviewRadioButtonIsSelectedByDefault();
        await regimeReviewActions.expectAllReviewTypesWithRadioButtonsAreDisplayed();
        await regimeReviewActions.expectOnlyOneReviewTypeRadioButtonIsSelectableAtOnce();
    });

    test('should close regime review detailed panel via cancel button', { tag: ["@US372096", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReview.cancelButton.click();
        await regimeReviewActions.expectDiscardErrorBannerIsVisible();
        await regimeReview.discardButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
    });

    test('should display and allow scrolling of review code section scrollbar in regime review detailed panel', { tag: ["@US406769", "@regression"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectScrollbarIsVisibleForReviewCodeSection();
        await regimeReviewActions.expectScrollbarIsScrollable();
    });


    test('should add a new regime review with valid future date and review type', { tag: ["@ADD_REVIEW"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.expectSetReviewDateButtonIsVisible();
        await regimeReview.setReviewDateButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsVisible();
        await regimeReviewActions.expectCurrentReviewDateIsToday();
        await regimeReviewActions.expectDatePickerIsVisibleAndEnabled();
        await regimeReviewActions.clickDatePickerTextBox();
        await regimeReviewActions.enterDateInDatePickerWithOffset(7);
        await page.keyboard.press('Enter');
        await regimeReviewActions.expectDatePickerErrorMessageIsNotVisible();
        await regimeReviewActions.expectAllReviewTypesWithRadioButtonsAreDisplayed();
        await regimeReview.regimeReviewPanelOkButton.click();
        await regimeReviewActions.expectRegimeReviewPanelIsHidden();
        await regimeReviewActions.expectReviewDueDropdownIsVisible();
    });

    test('should remove regime review date and update UI accordingly', { tag: ["@US404596", "@remove_review_date"] }, async ({ page, regimeReview, regimeReviewActions, commonActions }) => {
        await page.setViewportSize({ width: 1500, height: 720 });
        await regimeReviewActions.getUnexpiredRegimeReviewResponse_Mock();
        await regimeReviewActions.expectReviewDueDropdownIsVisibleForScreenWidth();
        await regimeReviewActions.clickReviewDueDropdownForScreenWidth();
        await regimeReviewActions.expectRemoveReviewDateOptionIsVisible();
        await regimeReview.removeReviewDateOption.click();
        await regimeReviewActions.expectRemoveReviewDateAlertPanelIsVisible();
        await regimeReviewActions.expectRemoveReviewDateDialogContent();
        await regimeReviewActions.expectRemoveRegimeReviewDateTextIsVisible();
        await regimeReviewActions.clickRemoveReviewDateRemoveButton();
        await regimeReviewActions.expectRemoveReviewDatePanelIsClosed();
        await regimeReviewActions.expectSetReviewDateButtonIsNotVisible();
    });
});