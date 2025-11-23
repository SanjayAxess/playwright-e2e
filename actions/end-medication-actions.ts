import { EndCourseMedicationPage } from "../pages/end-medication-page";
import { Page, expect } from "@playwright/test";
import { CommonActions } from "./common-actions";
import { MedicationHomePage } from "../pages/medication-home-page";

export class EndCourseMedicationActions {
    protected commonActions: CommonActions;
    protected endCourseMedicationPage: EndCourseMedicationPage;
    protected medicationHomePage: MedicationHomePage;

    constructor(protected readonly _page: Page) {
        this.commonActions = new CommonActions(this._page);
        this.endCourseMedicationPage = new EndCourseMedicationPage(this._page);
        this.medicationHomePage = new MedicationHomePage(this._page);
    }

    async clickCurrentMedsEndCourseButton() {
        await this.endCourseMedicationPage.currentMedsEndCourse.click();
    }

    async clickEndCourseButton() {
        await this.endCourseMedicationPage.endCourseButton.click();
    }

    async enterReasonForEndingCourse(reason: string) {
        await this.endCourseMedicationPage.reasonForEndingCourse.click();
        await this.endCourseMedicationPage.reasonForEndingCourse.fill(reason);
    }

    async blockEndCourseAPI() {
        await this.commonActions.blockAPI("**/end-course**")
    }

    async validateEndCourseError() {
        await this.medicationHomePage.validationBannerContent.isVisible();
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Couldn't end course");
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Try again");
    }

    async unBlockEndCourseAPI() {
        await this.commonActions.unblockAPI("**/end-course**")
    }

    async validateEndCourseToastMessage() {
        await this.medicationHomePage.toastNotificationsText.isVisible();
        await expect(this.medicationHomePage.toastNotificationsText).toContainText("1 course ended.Refresh Medication page to view.");
    }

    async validateEndCourseOptionEnabled() {
        await this.endCourseMedicationPage.currentMedsEndCourse.isEnabled();
    }

    async validateEndCourseOptionDisabled() {
        await this.endCourseMedicationPage.currentMedsEndCourse.isDisabled();
    }

    async validateEndCourseOptionNotAvailable() {
        await expect(this.endCourseMedicationPage.currentMedsEndCourse).not.toBeVisible();
    }

    async validateEndCourseInfoTextNotAvailable() {
        await expect(this.endCourseMedicationPage.endCourseInfoText).not.toBeVisible();
    }

    async validateEndCourseDialog() {
        await expect(this.endCourseMedicationPage.endCourseDialog).toBeVisible();
        await expect(this.endCourseMedicationPage.reasonForEndingCourse).toBeVisible();
        await expect(this.endCourseMedicationPage.endCourseButton).toBeVisible();
        await expect(this.endCourseMedicationPage.endCourseCloseBtn).toBeVisible();
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("End course");
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("Do not end course");
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("Malathion 0.5% aqueous liquid");
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("250 characters remaining");
        await this.endCourseMedicationPage.endCourseCloseBtn.click();
        await this.endCourseMedicationPage.endCourseDialog.isHidden();
        await this.medicationHomePage.currentMoreOptionsButton.first().click();
        await this.endCourseMedicationPage.currentMedsEndCourse.click();
        await this.endCourseMedicationPage.doNotEndCourseButton.click();
        await this.endCourseMedicationPage.endCourseDialog.isHidden();
    }

    async validateDoNotEndTextSmallView() {
        await expect(this.endCourseMedicationPage.doNotEndSmallView).toContainText("Do not end")
    }

    async validateReasonForEndingCourseFieldValidation() {
        await expect(this.endCourseMedicationPage.endCourseDialog).toBeVisible();
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("250 characters remaining");
        await this.endCourseMedicationPage.reasonForEndingCourse.fill("A`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMMM");
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("Character limit exceeded by 251");
        await this.endCourseMedicationPage.endCourseButton.click();
        await this.medicationHomePage.validationBannerContent.isVisible();
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Some fields require attention.");
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Correct the errors indicated before proceeding.");
        await this.endCourseMedicationPage.reasonForEndingCourse.fill("A`1234567890-=~!@#$%^&*()_+[]'\\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 1000");
        await expect(this.medicationHomePage.validationBannerContent).not.toBeVisible();
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("149 characters remaining");
        await this.endCourseMedicationPage.reasonForEndingCourse.fill("");
        await expect(this.endCourseMedicationPage.endCourseDialog).not.toContainText("Character limit exceeded by 149");
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("250 characters remaining");
        await this.endCourseMedicationPage.reasonForEndingCourse.fill("1234567890");
        await expect(this.endCourseMedicationPage.endCourseDialog).not.toContainText("Character limit exceeded by");
        await expect(this.medicationHomePage.validationBannerContent).not.toBeVisible();
        await expect(this.endCourseMedicationPage.endCourseDialog).toContainText("240 characters remaining");
    }

    async verifyEndMedicationToastNotification(count: number) {
        await expect(this.endCourseMedicationPage.endMedicationNotificationPanel.nth(0)).toBeVisible();
        await expect(this.endCourseMedicationPage.endMedicationNotificationPanel).toContainText("Refresh Medication page to view.");
        if (count == 1) {
            await expect(this.endCourseMedicationPage.endMedicationNotificationPanel).toContainText(`${count} course ended.`);
        } else {
            await expect(this.endCourseMedicationPage.endMedicationNotificationPanel).toContainText(`${count} courses ended.`);
        }
    }

    async validateCannotEndCourseTooltipIsAvailable() {
        await expect(this.endCourseMedicationPage.cannotEndCourseTooltipContent.first()).toBeVisible();
        await expect(this.endCourseMedicationPage.cannotEndCourseTooltipContent.first()).toContainText(
            "This medication has an outstanding request that must be actioned in EMIS Web before ending the course."
        );
    }

    async validateCannotEndCourseTooltipIsNotAvailable() {
        await expect(this.endCourseMedicationPage.cannotEndCourseTooltipContent).not.toBeVisible();
        await expect(this.endCourseMedicationPage.cannotEndCourseTooltipContent).not.toBeAttached();
    }

    async hoverEndCourseOption() {
        await this.endCourseMedicationPage.currentMedsEndCourse.hover();
    }
}