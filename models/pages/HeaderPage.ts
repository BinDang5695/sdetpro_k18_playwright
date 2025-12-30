import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class HeaderPage extends BasePage {

    private readonly iconUser: Locator;
    private readonly buttonLogout: Locator;

    constructor(page: Page) {
        super(page);

        this.iconUser = page.locator("//img[contains(@class,'staff-profile-image')]");
        this.buttonLogout = page.locator("//ul[contains(@class,'dropdown')]//a[normalize-space()='Logout']");
    }

    async openUserMenu(): Promise<void> {
        await expect(this.iconUser).toBeVisible();
        await this.iconUser.click();
    }

    async logout(): Promise<void> {
        await this.openUserMenu();
        await expect(this.buttonLogout).toBeVisible();
        await this.buttonLogout.click();
    }
}
