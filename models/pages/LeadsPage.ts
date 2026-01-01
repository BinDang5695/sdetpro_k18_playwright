import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage{

    private buttonNewLead = () => this.page.getByRole('link', { name: 'New Lead' });
    private dropdownStatus = () => this.page.locator("//button[@data-id='status']");
    private inputStatus = () => this.page.locator("//input[@aria-controls='bs-select-5']");
    private optionActive = () => this.page.locator("//span[@class='text'][normalize-space()='Active']");
    private dropdownSource = () => this.page.locator("//button[@data-id='source']");
    private inputSource = () => this.page.locator("//input[@aria-controls='bs-select-6']");
    private optionFacebook = () => this.page.locator("//span[normalize-space()='Facebook']");
    private dropdownTags = () => this.page.locator("//div[@id='inputTagsWrapper']//input[@placeholder='Tag']");
    private optionSelenium = () => this.page.locator("//li[contains(@class,'menu')]//div[normalize-space()='Selenium']");
    private inputName = () => this.page.locator("//div[@class='col-md-6']//input[@id='name']");
    private checkboxContactedToday = () => this.page.locator("//input[@id='contacted_today']");
    private inputDateContacted = () => this.page.locator("//input[@id='custom_contact_date']");
    private buttonSave = () => this.page.locator("//button[@id='lead-form-submit']");
    private dropdownPagination = () => this.page.locator("//select[@name='leads_length']");
    private value10 = () => this.page.locator("//option[@value='10']");
    private value25 = () => this.page.locator("//option[@value='25']");
    private inputSearchLead = () => this.page.locator("//input[@aria-controls='leads']");
    private contentLeads_info1To5 = () => this.page.locator("//div[@id='leads_info' and contains(., 'Showing 1 to 5 of 5 entries')]");
    private contentLeads_info11To11 = () => this.page.locator("//div[@id='leads_info' and contains(., 'Showing 11 to 11 of 11 entries')]");
    private page1 = () => this.page.locator("//a[normalize-space()='1']");
    private page2 = () => this.page.locator("//a[normalize-space()='2']");
    private checkboxSelectAllLead = () => this.page.locator("//div[@class='checkbox mass_select_all_wrap']");
    private allBinLeadcheckbox = () => this.page.locator("//div[@class='checkbox']//input[@type='checkbox']");
    private buttonBulkActions = () => this.page.locator("//span[normalize-space()='Bulk Actions']");
    private checkboxMassDelete = () => this.page.locator("//label[normalize-space()='Mass Delete']");
    private buttonConfirm = () => this.page.locator("//a[normalize-space()='Confirm']");
    private alertSuccess = () => this.page.locator("//span[@class='alert-title']");
    private noDataAfterDelete = () => this.page.locator("//td[@class='dataTables_empty']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");

    async clickButtonNewLead() {
      await expect(this.buttonNewLead()).toBeVisible();
      await this.buttonNewLead().click();
    }

    async addNewLead(leadName: string) {
      await expect(this.dropdownStatus()).toBeVisible();

      await this.dropdownStatus().click();
      await this.inputStatus().fill('Active');
      await this.optionActive().click();

      await this.dropdownSource().click();
      await this.inputSource().fill('Facebook');
      await this.optionFacebook().click();

      await this.dropdownTags().click();
      await this.dropdownTags().fill('Selenium');
      await this.optionSelenium().click();

      await this.inputName().fill(leadName);
      await expect(this.checkboxContactedToday()).toBeVisible();
      await this.checkboxContactedToday().click();
      await this.inputDateContacted().fill('19-11-2026 11:17');

      await this.buttonSave().click();
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await expect(this.buttonNewLead()).toBeVisible();
    }

    async createMultipleLeads(totalLead: number) {
      for (let i = 1; i <= totalLead; i++) {
        const leadName = `Bin Lead ${i}`;
        //const emailAddress = `bin${i}.dangvan@nashtechglobal.com`;

        console.log(`Creating Lead: ${leadName}`);
        await this.clickMenuLeads();
        await this.clickButtonNewLead();
        await this.addNewLead(leadName);
      }
    }

    async checkDataInTableByColumnContains(
      columnIndex: number,
      value: string
    ){
    const texts = await this.page.locator(`//table//tbody/tr/td[${columnIndex}]`).allTextContents();

    console.log(`Number of lines found: ${texts.length}`);

    for (const text of texts) {
      console.log(text);
      expect(this.normalizeText(text)).toContain(this.normalizeText(value));
    }
  }

    async searchAndCheckDataInTable(columnIndex: number, data: string) {

    const dropdown = this.dropdownPagination();

    await expect(dropdown).toBeVisible();
    await this.dropdownPagination().selectOption('10');
    await expect(this.inputSearchLead()).toBeVisible();
    await this.inputSearchLead().fill('Bin Lead');
    await expect(this.contentLeads_info1To5()).toBeVisible();
    await this.checkDataInTableByColumnContains(columnIndex, data);
    ///await expect(this.page2()).toBeVisible();
    //await this.page2().click();
    //await expect(this.contentLeads_info11To11()).toBeVisible();
    //await this.checkDataInTableByColumnContains(columnIndex, data);
  }

  async selectAllAndEnsureChecked(maxRetry = 3) {
    const selectAll = this.checkboxSelectAllLead();
    const rows = this.page.locator('tbody tr');
    const checkboxes = this.allBinLeadcheckbox();

    for (let attempt = 1; attempt <= maxRetry; attempt++) {
      await selectAll.click();
      await this.page.waitForFunction(() => {
      const table = document.querySelector('table');
      return table && !table.classList.contains('dataTable-processing');
    });

    const totalRows = await rows.count();
    const selectedRows = await rows.locator('.selected').count();

    if (totalRows === 0 || selectedRows !== totalRows) {
      console.log(`🔁 Retry Select All (${attempt}/${maxRetry})`);
      await this.page.waitForTimeout(300);
      continue;
    }

    const totalCheckboxes = await checkboxes.count();

    for (let i = 0; i < totalCheckboxes; i++) {
      await expect(
        checkboxes.nth(i),
        `❌ Checkbox ${i + 1} is NOT checked`
      ).toBeChecked();
    }

    console.log(`✅ Select All success at attempt ${attempt}`);
    return;
  }
}

  async deleteDataAfterSearched() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.dropdownPagination().selectOption('25');
    await this.selectAllAndEnsureChecked();
    await this.buttonBulkActions().click();
    await this.checkboxMassDelete().click();
    await this.buttonConfirm().click();
  }

  async verifyDeletedLeads() {
    await expect(this.alertSuccess()).toBeVisible();
    await expect(this.alertSuccess()).toHaveText('Total leads deleted: 5');
    await expect(this.buttonX()).toBeVisible();    
    await this.buttonX().click();
    await this.inputSearchLead().fill('Bin Lead');
    await expect(this.noDataAfterDelete()).toBeVisible();
    await expect(this.noDataAfterDelete()).toHaveText('No matching records found');
  }
}
