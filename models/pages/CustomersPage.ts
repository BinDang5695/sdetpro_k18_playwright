import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class CustomersPage extends BasePage{

    private readonly buttonAddNewCustomer: Locator;
    private readonly searchInput: Locator;
    private readonly inputCompany: Locator;
    private readonly inputVATNumber: Locator;
    private readonly inputPhoneNumber: Locator;
    private readonly inputWebsite: Locator;
    private readonly dropDownGroups: Locator;
    private readonly searchGroups: Locator;
    private readonly optionVIP: Locator;
    private readonly currencyDropdown: Locator;
    private readonly optionEuro: Locator;
    private readonly defaultLanguageDropdown: Locator;
    private readonly optionVietnamese: Locator;
    private readonly inputAddress: Locator;
    private readonly inputCity: Locator;
    private readonly inputState: Locator;
    private readonly inputZipCode: Locator;
    private readonly countryDropdown: Locator;
    private readonly searchCountry: Locator;
    private readonly optionVietnam: Locator;
    private readonly buttonSave: Locator;
    private readonly dataInTable: Locator;
    private readonly totalCustomer: Locator;
    private readonly buttonDelete: Locator;
    private readonly noData: Locator;
    private readonly buttonX: Locator;

    constructor(page: Page) {
        super(page);

        this.buttonAddNewCustomer = page.getByRole('link', { name: 'New Customer' });
        this.searchInput = page.locator("//input[@aria-controls='clients']");
        this.inputCompany = page.getByLabel('Company');
        this.inputVATNumber = page.getByLabel('VAT Number');
        this.inputPhoneNumber = page.getByLabel('Phone');
        this.inputWebsite = page.getByLabel('Website');
        this.dropDownGroups = page.locator("//button[@data-id='groups_in[]']");
        this.searchGroups = page.getByRole('combobox', { name: 'Search' });
        this.optionVIP = page.locator("//span[normalize-space()='VIP']");
        this.currencyDropdown = page.locator("//button[@data-id='default_currency']");
        this.optionEuro = page.getByText('€', { exact: true });
        this.defaultLanguageDropdown = page.locator("//button[@data-id='default_language']");
        this.optionVietnamese = page.locator("//span[normalize-space()='Vietnamese']");
        this.inputAddress = page.getByRole('textbox', { name: 'Address' });
        this.inputCity = page.locator("//input[@id='city']");
        this.inputState = page.locator("//input[@id='state']");
        this.inputZipCode = page.locator("//input[@id='zip']");
        this.countryDropdown = page.locator('button[data-id="country"]');
        this.searchCountry = page.getByRole('combobox', { name: 'Search' });
        this.optionVietnam = page.locator("//span[normalize-space()='Vietnam']");
        this.buttonSave = page.locator("//button[contains(@class,'only-save')]");
        this.dataInTable = page.getByRole('link', { name: 'Nashtech Company' });
        this.totalCustomer = page.locator("//span[normalize-space()='Total Customers']/preceding-sibling::span");
        this.buttonDelete = page.locator("//a[normalize-space()='Delete']");
        this.noData = page.getByText('No matching records found', { exact: true });
        this.buttonX = page.locator("button[data-dismiss='alert'] span", { hasText: '×' });
  }
      // ===== Actions =====

    async clickButtonAddNewCustomer() {
        await this.buttonAddNewCustomer.click();
    }

    async addNewCustomer() {
        await this.inputCompany.fill('Nashtech Company');
        await this.inputVATNumber.fill('123456789');
        await this.inputPhoneNumber.fill('0123456789');
        await this.inputWebsite.fill('https://nashtech.com.vn');
        await this.dropDownGroups.click();
        await this.searchGroups.fill('VIP');
        await this.optionVIP.click();
        await this.dropDownGroups.click();
        await this.currencyDropdown.click();
        await this.optionEuro.click();
        await this.defaultLanguageDropdown.click();
        await this.optionVietnamese.click();
        await this.inputAddress.fill('123 Street, Hanoi');
        await this.inputCity.fill('Hanoi');
        await this.inputState.fill('Hoan Kiem');
        await this.inputZipCode.fill('100000');
        await this.countryDropdown.click();
        await this.searchCountry.fill('Vietnam');
        await this.optionVietnam.click();
        await this.buttonSave.click();
    }

    async verifyCustomerAdded() {
        await expect(this.inputCompany).toHaveValue('Nashtech Company');
        await expect(this.inputVATNumber).toHaveValue('123456789');
        await expect(this.inputPhoneNumber).toHaveValue('0123456789');
        await expect(this.inputWebsite).toHaveValue('https://nashtech.com.vn');
        await expect(this.dropDownGroups).toHaveText(/VIP/);
        await expect(this.currencyDropdown).toHaveText(/EUR/);
        await expect(this.defaultLanguageDropdown).toHaveText(/Vietnamese/);
        await expect(this.inputAddress).toHaveValue('123 Street, Hanoi');
        await expect(this.inputCity).toHaveValue('Hanoi');
        await expect(this.inputState).toHaveValue('Hoan Kiem');
        await expect(this.inputZipCode).toHaveValue('100000');
        await expect(this.countryDropdown).toHaveText(/Vietnam/);
  }

    async getTotalCustomers(): Promise<number> {
        const totalText = await this.totalCustomer.textContent();
        return Number(totalText);
    }

    async searchCustomer() {
        await this.menuCustomers.click();
        await this.searchInput.fill('Nashtech Company');
        await expect(this.dataInTable).toBeVisible();
    }

    async deleteCustomer(): Promise<void> {
        await this.dataInTable.hover();
        await this.page.once('dialog', dialog => dialog.accept());
        await this.buttonDelete.click();
        await this.buttonX.click();
    }

    async verifyCustomerDeleted() {
        await this.searchInput.fill('Nashtech Company');
        await expect(this.noData).toBeVisible();
    }

}
