import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class ContractsPage extends BasePage{

    private buttonNewContract = () => this.page.locator("//a[normalize-space()='New Contract']");
    private inputCustomer = () => this.page.locator("//button[@data-id='clientid']");
    private searchCustomer = () => this.page.locator("//input[@aria-controls='bs-select-2']");
    private selectCustomer = () => this.page.locator("//span[normalize-space()='Bin Customer']");
    private inputSubject = () => this.page.locator("//input[@id='subject']");
    private inputContractValue = () => this.page.locator("//input[@name='contract_value']");
    private inputContractType = () => this.page.locator("//button[@data-id='contract_type']");
    private inputValueForContractType = () => this.page.locator("//input[@aria-controls='bs-select-1']");
    private selectContractType = () => this.page.locator("//span[@class='text'][normalize-space()='1']");
    private inputStartDate = () => this.page.locator("//input[@id='datestart']");
    private inputEndDate = () => this.page.locator("//input[@id='dateend']");
    private inputDescription = () => this.page.getByRole('textbox', { name: 'Description' });
    private buttonSave = () => this.page.locator("//div[contains(@class,'btn')]//button[@type='submit']");
    private selectedCustomer = () => this.page.locator("//div[contains(text(),'Bin Customer')]");
    private selectedContractType = () => this.page.locator("//div[contains(text(),'1')]");
    private alertSuccess = () => this.page.locator("//span[@class='alert-title']");
    private dropdownMore = () => this.page.locator("//button[normalize-space()='More']");
    private buttonDelete = () => this.page.locator("//a[normalize-space()='Delete']");
    private searchContract = () => this.page.locator("//input[@aria-controls='contracts']");
    private noDataAfterDelete = () => this.page.locator("//td[@class='dataTables_empty']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");

    async clickButtonNewContract() {
        await this.buttonNewContract().click();
    }

    async addNewContract() {
        await this.inputCustomer().click();
        await this.searchCustomer().pressSequentially('Bin Customer', { delay: 100 });
        await this.selectCustomer().click();
        await this.inputSubject().fill('Bin Subject');
        await this.inputContractValue().fill('1000');
        await this.inputContractType().click();
        await this.inputValueForContractType().fill('1');
        await expect(this.selectContractType()).toBeVisible();
        await this.selectContractType().click();
        await this.inputStartDate().fill('18-11-2026');
        await this.inputEndDate().fill('18-11-2026');
        await this.inputDescription().fill('Bin Description');
        await this.buttonSave().click();
    }

    async verifyCreatedContract() {
        await expect(this.alertSuccess()).toHaveText('Contract added successfully.');
        await expect(this.selectedCustomer()).toHaveText('Bin Customer');
        await expect(this.inputSubject()).toHaveValue('Bin Subject');
        await expect(this.inputContractValue()).toHaveValue('1000.00');
        await expect(this.selectedContractType()).toHaveText('1');
        await expect(this.inputStartDate()).toHaveValue('18-11-2026');
        await expect(this.inputEndDate()).toHaveValue('18-11-2026');
        await expect(this.inputDescription()).toHaveValue('Bin Description');
    }

    async updateContract() {
        await this.inputSubject().fill('Bin Subject Updated');
        await this.inputContractValue().fill('2000');
        await this.inputStartDate().fill('18-11-2027');
        await this.inputEndDate().fill('18-11-2027');
        await this.inputDescription().fill('Bin Description Updated');
        await this.buttonSave().click();
    }

    async verifyUpdatedContract() {
        await expect(this.alertSuccess()).toHaveText('Contract updated successfully.');
        await expect(this.selectedCustomer()).toHaveText('Bin Customer');
        await expect(this.inputSubject()).toHaveValue('Bin Subject Updated');
        await expect(this.inputContractValue()).toHaveValue('2000.00');
        await expect(this.selectedContractType()).toHaveText('1');
        await expect(this.inputStartDate()).toHaveValue('18-11-2027');
        await expect(this.inputEndDate()).toHaveValue('18-11-2027');
        await expect(this.inputDescription()).toHaveValue('Bin Description Updated');
    }

    async deleteContract() {
        await this.page.on('dialog', dialog => dialog.accept());
        await this.dropdownMore().click();
        await this.buttonDelete().click();
        await this.buttonX().click();
    }

    async verifyDeletedContract() {
        await this.searchContract().fill('Bin Subject');
        await this.noDataAfterDelete().scrollIntoViewIfNeeded();
        await expect(this.noDataAfterDelete()).toHaveText('No matching records found');
    }

}
