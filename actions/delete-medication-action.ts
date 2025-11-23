import { DeleteMedicationPage } from "../pages/delete-medication-page";
import { Page, expect } from "@playwright/test";
import { CommonActions } from "./common-actions";
import { MedicationHomePage } from "../pages/medication-home-page";
import { CancelMedicationPage } from "../pages/cancel-medication-page";
import { MedicationHomeActions } from "./medication-home-actions";

export class DeleteMedicationActions {
    protected commonActions: CommonActions;
    protected deleteMedicationPage: DeleteMedicationPage;
    protected medicationHomePage: MedicationHomePage;
    protected cancelMedicationPage: CancelMedicationPage;
    protected medicationHomeActions: MedicationHomeActions;

    constructor(protected readonly _page: Page) {
        this.commonActions = new CommonActions(this._page);
        this.deleteMedicationPage = new DeleteMedicationPage(this._page);
        this.medicationHomePage = new MedicationHomePage(this._page);
        this.cancelMedicationPage = new CancelMedicationPage(this._page);
        this.medicationHomeActions = new MedicationHomeActions(this._page);
    }

    async clickPastMedsDeleteCourse() {
        await this.deleteMedicationPage.pastMedsDeleteCourse.click();
    }

    async validateDeleteMedicationToastMessage() {
        await this.medicationHomePage.toastNotificationsText.isVisible();
        await expect(this.medicationHomePage.toastNotificationsText).toContainText("Course deleted.Refresh Medication page to view.");
    }

    async expectMedicationIsNotPresentInCurrent(medicationName: string) {
        const rows = this.cancelMedicationPage.currentMedicationsTable.locator('tr');
        const rowCount = await rows.count();
        let found = false;
        for (let i = 0; i < rowCount; i++) {
            const rowText = await rows.nth(i).textContent();
            if (rowText && rowText.includes(medicationName)) {
                found = true;
                break;
            }
        }
        await expect(found).toBe(false);
    }

    async expectMedicationIsNotPresentInPast(medicationName: string) {
        const rows = this.cancelMedicationPage.pastMedicationsTable.locator('tr');
        const rowCount = await rows.count();
        let found = false;
        for (let i = 0; i < rowCount; i++) {
            const rowText = await rows.nth(i).textContent();
            if (rowText && rowText.includes(medicationName)) {
                found = true;
                break;
            }
        }
        await expect(found).toBe(false);
    }

    async enterDeleteCourseDialogReason(reason: string) {
        await this.deleteMedicationPage.deleteCourseDialogReason.fill(reason);
    }

    async clickDeleteCourseSubmitBtn() {
        await this.deleteMedicationPage.deleteCourseSubmitBtn.click();
    }

    async blockDeleteCourseAPI() {
        await this.commonActions.blockAPI("**/persons/*/medications/*");
    }

    async unBlockDeleteCourseAPI() {
        await this.commonActions.unblockAPI("**/persons/*/medications/*")
    }

    async validateDeleteCourseAPIError() {
        await this.medicationHomePage.validationBannerContent.isVisible();
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Couldn't delete course");
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Try again");
    }

    async validateDeleteCourseDialogBox() {
        await expect(this.deleteMedicationPage.deleteCourseDialog).toBeVisible();
        await expect(this.deleteMedicationPage.deleteCourseCancelBtn).toBeVisible();
        await expect(this.deleteMedicationPage.deleteCourseSubmitBtn).toBeVisible();
        await expect(this.deleteMedicationPage.deleteCourseDialogReason).toBeVisible();
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Delete course");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Deleting this course will permanently remove it from the patient’s care record.");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Reason for deleting course");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("250 characters remaining");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Cancel");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Delete course");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Aspirin 75mg tablets");
        await this.deleteMedicationPage.deleteCourseCancelBtn.click();
        await this.deleteMedicationPage.deleteCourseDialog.isHidden();
    }

    async expectDeleteCourseDialogRemainsOpenOnOutsideClick() {
        await this.deleteMedicationPage.dialogFooter.click();
        await this.deleteMedicationPage.deleteCourseDialog.isVisible();
        await this.deleteMedicationPage.deleteCourseCancelBtn.click();
        await this.deleteMedicationPage.deleteCourseDialog.isHidden();
    }

    async validateDeleteCourseOptionEnabled() {
        await this.deleteMedicationPage.pastMedsDeleteCourse.isEnabled();
    }

    async validateDeleteCourseOptionDisabled() {
        await this.deleteMedicationPage.pastMedsDeleteCourse.isDisabled();
    }

    async validateDeleteCourseOptionNotAvailable() {
        await expect(this.deleteMedicationPage.pastMedsDeleteCourse).not.toBeVisible();
    }

    async reasonForDeletingCourseFieldValidation() {
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("250 characters remaining");
        await this.deleteMedicationPage.deleteCourseDialogReason.fill("A`1234567890-=~!@#$%^&*()_+[]'\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 100 - WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, WWWWWWWWWWWWWWWWWWEWMMMMMMMMMMMM");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Character limit exceeded by 250");
        await this.deleteMedicationPage.deleteCourseSubmitBtn.click();
        await this.medicationHomePage.validationBannerContent.isVisible();
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Some fields require attention.");
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Correct the errors indicated before proceeding.");
        await this.deleteMedicationPage.deleteCourseDialogReason.fill("A`1234567890-=~!@#$%^&*()_+[]'\;/.,{}|\":?>qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ - 1000");
        await expect(this.medicationHomePage.validationBannerContent).not.toBeVisible();
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("150 characters remaining");
        await this.deleteMedicationPage.deleteCourseDialogReason.fill("");
        await expect(this.deleteMedicationPage.deleteCourseDialog).not.toContainText("Character limit exceeded by 150");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("250 characters remaining");
        await this.deleteMedicationPage.deleteCourseSubmitBtn.click();
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Enter a reason");
        await this.medicationHomePage.validationBannerContent.isVisible();
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Some fields require attention.");
        await expect(this.medicationHomePage.validationBannerContent).toContainText("Correct the errors indicated before proceeding.");
        await this.deleteMedicationPage.deleteCourseDialogReason.fill("1234567890");
        await expect(this.deleteMedicationPage.deleteCourseDialog).not.toContainText("Character limit exceeded by");
        await expect(this.medicationHomePage.validationBannerContent).not.toBeVisible();
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("240 characters remaining");
    }

    async validateCannotDeleteCoursePopup() {
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("Cannot delete course");
        await expect(this.deleteMedicationPage.deleteCourseDialog).toContainText("This course is linked to another item on the patient's record, such as an existing problem or medication request. Delete it from EMIS Web instead.");
    }
}