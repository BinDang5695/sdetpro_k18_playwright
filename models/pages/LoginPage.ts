import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage{

    private headerLogin = () => this.page.getByRole('heading', { name: 'Login' });
    private inputEmail = () => this.page.getByLabel('Email');
    private inputPassword = () => this.page.getByLabel('Password');
    private checkboxRememberMe = () => this.page.getByRole('checkbox', { name: 'Remember me' });
    private buttonLogin = () => this.page.getByRole('button', { name: 'Login' });
    private alertErrorMessage = () => this.page.locator('.alert.alert-danger');
    private menuDashboard = () => this.page.getByRole('link', { name: 'Dashboard' });

    async loginCRM(email: string, password: string): Promise<void> {
        await this.page.goto('https://crm.anhtester.com/admin/authentication');
        await expect(this.headerLogin()).toBeVisible();
        await this.inputEmail().fill(email);
        await this.inputPassword().fill(password);
        await this.checkboxRememberMe().check();
        await this.buttonLogin().click();
    }

    async verifyLoginSuccess(): Promise<void> {
        await expect(this.menuDashboard()).toBeVisible();
        await expect(this.page).not.toHaveURL(/authentication/);
    }

    async verifyLoginFail(expectedMessage: string | string[]): Promise<void> {
        await expect(this.page).toHaveURL(/authentication/);
        await expect(this.alertErrorMessage()).toBeVisible();
        await expect(this.alertErrorMessage()).toHaveText(expectedMessage);
        console.log(`==> Login failed with error message: ${expectedMessage}`);
    }
}
