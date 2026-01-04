import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class HeaderPage extends BasePage {

    private readonly iconUser: Locator;
    private readonly myProfile: Locator;
    private readonly buttonLogout: Locator;
    private readonly inputSearchProjects: Locator;
    private readonly page2: Locator;

    constructor(page: Page) {
        super(page);

        this.iconUser = page.locator("(//img[contains(@class,'staff-profile-image')])[1]");
        this.myProfile = page.locator("//ul[@class='dropdown-menu animated fadeIn']//a[normalize-space()='My Profile']");
        this.buttonLogout = page.locator("//ul[contains(@class,'dropdown')]//a[normalize-space()='Logout']");
        this.inputSearchProjects = page.locator("//input[@aria-controls='DataTables_Table_0']");
        this.page2 = page.locator("//a[normalize-space()='2']");
    }

    async openUserMenu(): Promise<void> {
        await expect(this.iconUser).toBeVisible();
        await this.iconUser.click();
    }

    async openMyProfile(): Promise<void> {
        await this.openUserMenu();
        await expect(this.myProfile).toBeVisible();
        await this.myProfile.click();
    }

    async searchAndCheckPagination(): Promise<void> {

        await expect(this.inputSearchProjects).toBeVisible();
        await this.inputSearchProjects.fill('Trang');

        await this.waitForTableStable();

        const lastRow = this.page.locator('//tbody/tr[last()]/td[1]/a[1]');

        if (await lastRow.isVisible(),
            await lastRow.count()) {
            await lastRow.scrollIntoViewIfNeeded();
        }
        await this.waitForTableStable();
        await this.checkLeadNameContains('Trang');

        await expect(this.page2).toBeVisible();
        await this.page2.click();
        await this.waitForTableStable();
        await this.checkLeadNameContains('Trang');
    }


async checkLeadNameContains(value: string): Promise<void> {
    const matchedRows: string[] = [];

    for (let i = 1; i <= 25; i++) {
        const leadCell = this.page.locator(`//tbody/tr[${i}]/td[1]/a[1]`);

        if (!(await leadCell.count())) {
            console.log(`⛔ Row ${i} does not exist, stop looping`);
            break;
        }

        const text = (await leadCell.textContent())?.trim() || '';
        console.log(`🔹 Row ${i}: "${text}"`);

        if (this.normalizeText(text).includes(this.normalizeText(value))) {
            matchedRows.push(text);
        }
    }

    console.log(`✅ Rows matching "${value}": ${matchedRows.length}`);
    expect(matchedRows.length).toBeGreaterThan(0);
}

async waitForTableStable(): Promise<void> {
    const tableBody = this.page.locator('//tbody');
    await expect(tableBody).toBeVisible();
    await this.page.waitForLoadState('networkidle');
}

    async logout(): Promise<void> {
        await this.iconUser.scrollIntoViewIfNeeded();
        await this.openUserMenu();
        await expect(this.buttonLogout).toBeVisible();
        await this.buttonLogout.click();
    }
}
