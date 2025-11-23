import { expect, Page, Locator } from "@playwright/test";
import { MedicationHomePage } from "../pages/medication-home-page";

export class CommonActions {
    private page: Page;
    protected medicationHomePage: MedicationHomePage;
    constructor(protected readonly _page: Page) {
        this.page = _page;
        this.medicationHomePage = new MedicationHomePage(this._page);
    }

    async setLocalStorage(key: string, value: string) {
        await this._page.evaluate(([key, value]) => {
            localStorage.setItem(key, value);
        }, [key, value]);
    }

    async pressTab() {
        await this._page.keyboard.press('Tab');
    }

    async mockUrl(url, status?: number, body?: (body?: Object) => string, delay?: number) {
        await this._page.route(url, async (route) => {
            if (delay) {
                await new Promise((f) => setTimeout(f, delay));
            }
            const response = await route.fetch();
            let responseBody = "";
            try {
                // It might not be valid JSON so try parse
                responseBody = await response.json();
            } catch {
            } finally {
                await route.fulfill({
                    response,
                    status,
                    body: body ? body(responseBody) : await response.body()
                });
            }
        });
    }

    async unMockUrl() {
        await this._page.unrouteAll(); // Unblocks all URLs
    }

    async updateScreenSize(width: number, height: number) {
        await this._page.setViewportSize({ width, height });
    }

    async getTodayDate(): Promise<string> {
        const date = await new Date();
        const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate().toString().padStart(2, '0');
        const currentMonthName = monthName[month];
        return `${day}-${currentMonthName}-${year}`;
    }

    async getFutureDate(): Promise<string> {
        const date = await new Date();
        const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const year = date.getFullYear();
        const nextmonth = date.getMonth() + 1;
        const day = date.getDate().toString().padStart(2, '0');
        const currentMonthName = monthName[nextmonth];
        return `${day}-${currentMonthName}-${year}`;
    }

    async validateTheUrlAfterClickingOnTheLink(linkLocator: Locator, expectedUrl: string) {
        const featureLink = await linkLocator;
        const [newPage] = await Promise.all([
            this._page.context().waitForEvent('page'),
            featureLink.click()
        ]);
        await newPage.waitForLoadState('load');
        const currentURL = await newPage.url();
        expect(currentURL).toBe(expectedUrl);
    }

    async verifyTootltipText(expectedText: string) {
        await expect(this._page.getByTestId("listItemControlforPopup").first()).toContainText(expectedText);
    }

    async blockAPI(url) {
        await this._page.route(url, (route) => route.abort());
    }

    async unblockAPI(url) {
        await this._page.unroute(url);
    }

    async searchAndSelectPatient(patientText: string): Promise<void> {
        await this.medicationHomePage.patientSearchField.fill(patientText);
        await this.medicationHomePage.patientSearchField.press("Enter");
        await this.medicationHomePage.getPatientResult(patientText).waitFor({ state: 'visible' });
        await this.medicationHomePage.getPatientResult(patientText).click();
        await this.clickMedicationOption();
    }

    async clickMedicationOption(): Promise<void> {
        await this.medicationHomePage.medicationOption.waitFor({ state: 'visible' });
        await this.medicationHomePage.medicationOption.click();
    }

    async unBlockAllUrls() {
        await this.page.unrouteAll();
    }
}