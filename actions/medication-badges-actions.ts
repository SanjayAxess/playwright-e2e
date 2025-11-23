import { expect, Locator, Page, test } from "@playwright/test";
import { CommonActions } from "./common-actions";
import { MedicationHomePage } from "../pages/medication-home-page";
import { RegimeReviewPage } from '../pages/regime-review-page';


export class MedicationBadgesActions {
    constructor(
        private page: Page,
        private commonActions?: CommonActions
    ) { }

    async verifyBadgeDisplayedForMedication(badge: string, medication: string) {
        const badgeLocator = this.page.locator(`//span[contains(text(),'${medication}')]/ancestor::button/preceding-sibling::div/span[@data-testid='meds-${badge}-badge']`);
        await expect(badgeLocator).toBeVisible();
    }

    async verifyBadgeDisplayedForDrugRHS(badge: string, drug: string) {
        const badgeLocator = this.page.locator(`//span[@data-testid='meds-${badge}-badge']/ancestor::div/preceding-sibling::button/span[contains(text(),'${drug}')]`);
        await expect(badgeLocator).toBeVisible();
    }

    async verifyMultipleBadgesDisplayedForDrug(badges: string[], drug: string) {
        let badgeXpath = '';
        badges.forEach((badge, idx) => {
            badgeXpath += `${idx === 0 ? '' : '/following-sibling::span'}[@data-testid='meds-${badge}-badge']`;
        });
        const badgeLocator = this.page.locator(`//span${badgeXpath}/ancestor::div/preceding-sibling::button/span[contains(text(),'${drug}')]`);
        await expect(badgeLocator).toBeVisible();
    }

    async verifyBadgeNotDisplayedForDrug(badge: string, drug: string) {
        const badgeLocator = this.page.locator(`//span[@data-testid='meds-${badge}-badge']/following::span[1][contains(text(),'${drug}')]`);
        await expect(badgeLocator).not.toBeVisible();
    }

    async hoverBadge(badge: string, index: number = 1) {
        const badgeXpath = `(//span[@data-testid='meds-${badge}-badge'][1])[${index}]`;
        const element = await this.page.waitForSelector(badgeXpath);
        await element.hover();
        await this.page.waitForTimeout(500);
    }

    async verifyBadgeTooltip(badge: string, expectedText: string) {
        const tooltipSelector = `//div/div[@data-testid='meds-${badge}-badge-popup'][1]`;
        await this.page.waitForSelector(tooltipSelector);
        const tooltip = this.page.locator(tooltipSelector);
        await expect(tooltip).toBeVisible();
        await expect(tooltip.textContent()).resolves.toEqual(expectedText);
    }

    async verifyTableCellValue(row: number, column: number, value: string) {
        const cellSelector = `table tr:nth-child(${row}) td:nth-child(${column})`;
        if (!value.includes('Latanoprost')) {
            await expect(this.page.locator(cellSelector).nth(0)).toContainText(value);
        } else if (value.includes('Latanoprost')) {
            const cellSelector1 = `table tr:nth-child(2) td:nth-child(2)`;
            await expect(this.page.locator(cellSelector1).nth(1)).toContainText(value);
        }
    }

    async selectPastMedicationPage() {
        const medicationHomePage = new MedicationHomePage(this.page);
        await medicationHomePage.pastMedicationTab.click();
        await this.page.waitForTimeout(5000);
    }

    async clickOnRequiredMedication(medication: string, index: number = 0) {
        await this.page.locator(`//span[contains(text(),'${medication}')]`).nth(index).click();
    }

    async verifyBadgesDisplayedForMedicationRHS(expectedBadgesAndDrugName: string) {
        const medsPage = new RegimeReviewPage(this.page);
        const tdValue = await this.page.locator("//div[@data-testid='medication-details-panel']").innerText();
        await expect(tdValue?.split('\n').map(s => s.trim())
            .join('')).toBe(expectedBadgesAndDrugName);
    }

    async hoverMousePointerOnBadge(badge: string) {
        const xpathForBadge = `//span[@data-testid='meds-${badge}-badge'][1]`;
        const element = await this.page.waitForSelector(xpathForBadge);
        await element.hover();
        await this.page.waitForTimeout(500);
    }

    async hoverBadgeInInfoPanel(badge: string) {
        const xpathForBadge = `//div[@data-testid='meds-details-panel-badges']/span[@data-testid='meds-${badge}-badge']`;
        const element = await this.page.waitForSelector(xpathForBadge);
        await element.hover();
        await this.page.waitForTimeout(1000);
    }

    async verifyTooltipTextsForBadgeOnInfoPanel(badge: string, expectedText: string) {
        const tooltipSelector = `//div/div[@data-testid='meds-${badge}-badge-popup']`;
        await this.page.waitForSelector(tooltipSelector);
        const tooltip = this.page.locator(tooltipSelector);
        await expect(tooltip).toBeVisible();
        await expect(tooltip.textContent()).resolves.toEqual(expectedText);
    }

    async verifyBadgeNotDisplayedForSchedule5CDDrugsInInfoPanel(badge: string) {
        const xpathForBadge = `//div[@data-testid='meds-details-panel-badges']/span[@data-testid='meds-${badge}-badge']`;
        const element = this.page.locator(xpathForBadge);
        await expect(element).not.toBeVisible();
        await this.page.waitForTimeout(1000);
    }
}