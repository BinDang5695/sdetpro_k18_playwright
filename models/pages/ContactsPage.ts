import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';
import SystemHelper from '../helpers/SystemHelper';

export default class ContactsPage extends BasePage{

    private readonly buttonNewContact: Locator;
    private readonly fieldFirstName: Locator;
    private readonly fieldLastName: Locator;
    private readonly fieldEmail: Locator;
    private readonly fieldPassword: Locator;
    private readonly buttonChooseFile: Locator;
    private readonly filePath: string;
    private readonly buttonSave: Locator;
    private readonly alertCreatedContact: Locator;
    private readonly createdContact: Locator;
    private readonly buttonX: Locator;

    constructor(page: Page) {
        super(page);

        this.buttonNewContact = page.locator("//a[normalize-space()='New Contact']");
        this.fieldFirstName = page.locator("//input[@id='firstname']");
        this.fieldLastName = page.locator("//input[@id='lastname']");
        this.fieldEmail = page.locator("//input[@id='email']");
        this.fieldPassword = page.locator("//input[@name='password']");
        this.buttonChooseFile = page.locator('input[type="file"]');
        this.buttonSave = page.locator("//button[normalize-space()='Save']");
        this.alertCreatedContact = page.locator("//span[@class='alert-title']");
        this.createdContact = page.locator("//a[normalize-space()='Bin Dang']");
        this.buttonX = page.locator("(//span[normalize-space()='×'])[1]");
        this.filePath = SystemHelper.getFilePath('test_data/UK.jpg');
    }

    async clickButtonNewContact(): Promise<void> {
        await expect(this.buttonNewContact).toBeVisible();
        await this.buttonNewContact.click();
    }

    async addNewContact(firstName: string, lastName: string): Promise<void> {
        await this.buttonChooseFile.setInputFiles(this.filePath);
        await this.fieldFirstName.fill(firstName);
        await this.fieldLastName.fill(lastName);
        await this.fieldEmail.fill('vbin561995@gmail.com');
        await this.fieldPassword.fill('123456');
        await this.buttonSave.click();
    }

    async verifyCreatedContact(firstName: string, lastName: string): Promise<void> {
        await expect(this.alertCreatedContact).toBeVisible();
        await expect(this.alertCreatedContact).toHaveText('Contact added successfully.');
        await expect(this.createdContact).toBeVisible();
        await this.createdContact.click();
        await expect(this.fieldFirstName).toHaveValue(firstName);
        await expect(this.fieldLastName).toHaveValue(lastName);
        await expect(this.fieldEmail).toHaveValue('vbin561995@gmail.com');
        await expect(this.fieldPassword).toHaveValue('');
        await this.buttonX.click();
    }
}