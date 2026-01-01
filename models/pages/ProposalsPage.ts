import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';
import fs from 'fs';
import { extractTextFromPDF, readExcelAsText } from '../helpers/FileHelpers';
import path from 'path';

export default class LoginPage extends BasePage{

    private buttonNewProposals = () => this.page.locator("//a[normalize-space()='New Proposal']");
    private inputSubject = () => this.page.locator("//input[@id='subject']");
    private dropdownRelated = () => this.page.locator("//button[@data-id='rel_type']");
    private optionCustomer = () => this.page.locator("//a[@role='option']//span[normalize-space()='Customer']");
    private dropdownCustomer = () => this.page.locator("//div[contains(text(),'Select and begin typing')]");
    private inputCustomer = () => this.page.locator("//input[@placeholder='Type to search...']");
    private option1stBinCustomer = () => this.page.locator("(//span[normalize-space()='Bin Customer'])[1]");
    private inputDate = () => this.page.locator("//input[@id='date']");
    private date20 = () => this.page.locator("//div[normalize-space()='20']");
    private toogleAllowComments = () => this.page.locator("//label[@for='allow_comments']");
    private inputEmail = () => this.page.locator("//input[@id='email']");
    private buttonAdd = () => this.page.locator("//div[@class='input-group-btn']");
    private inputDescription = () => this.page.locator("//input[@id='description']");
    private inputRate = () => this.page.locator("//input[@id='rate']");
    private buttonSaveAddNewItem = () => this.page.locator("//button[@type='submit']");
    private radioHours = () => this.page.locator("//label[normalize-space()='Hours']");
    private buttonSelect = () => this.page.locator("//button[@class='btn pull-right btn-primary']");
    private buttonSaveAddNewProposal = () => this.page.locator("//button[@type='button'][normalize-space()='Save']");
    private iconToggleFullView = () => this.page.locator("//li[@data-title='Toggle full view']");
    private tooltipContent = () => this.page.locator(".tooltip-inner");
    private buttonToogleTableRight = () => this.page.locator("//i[@class='fa fa-angle-double-right']");
    private inputSearchProposals = () => this.page.locator("//input[@aria-controls='proposals']");
    private contentProposals_info = () => this.page.locator("//div[@id='proposals_info' and contains(., 'Showing 1 to 1 of 1 entries')]");
    private searchProposals = () => this.page.locator("//input[@class='form-control input-sm']");
    private dropdownMore = () => this.page.locator("//button[normalize-space()='More']");
    private optionDelete = () => this.page.locator("//a[normalize-space()='Delete']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");
    private buttonExport = () => this.page.locator("//span[normalize-space()='Export']");
    private optionPDF = () => this.page.locator("//a[normalize-space()='PDF']");
    private optionExcel = () => this.page.locator("//a[normalize-space()='Excel']");
    private optionCSV = () => this.page.locator("//a[normalize-space()='CSV']");
    private optionPrint = () => this.page.locator("//a[normalize-space()='Print']");
    private tableBinSubject = () => this.page.locator("//tr[@class='has-row-options odd']//a[contains(text(),'Bin Subject')]");
    //Compare file PDF with data on UI table
    private tableProposal = () => this.page.locator("//tr[1]//td[1]//a[contains(@href,'list_proposals')]");
    private tableSubject = () => this.page.locator("//tr[1]//td[2]//a[normalize-space()='Bin Subject']");
    private tableTo = () => this.page.locator("//a[contains(text(),'Bin Customer')]");
    private tableTotal = () => this.page.locator("//td[contains(text(),'€1.000,00')]");
    private tableDate = () => this.page.locator("//td[normalize-space()='20-12-2028']");
    private tableOpenTill = () => this.page.locator("//td[normalize-space()='27-12-2028']");
    private tableCreated = () => this.page.locator("//td[@class='sorting_1']");
    private tableStatus = () => this.page.locator("//td//span[contains(@class,'proposal-status')]");
    private uiProposalNumber = '';
    private uiSubject = '';
    private uiTo = '';
    private uiTotal = '';
    private uiDate = '';
    private uiOpenTill = '';
    private uiProject = '';
    private uiTags = '';
    private uiCreated = '';
    private uiStatus = '';

async captureUITableData() {
    this.uiProposalNumber = await this.tableProposal().textContent() || '';
    this.uiSubject = await this.tableSubject().textContent() || '';
    this.uiTo = await this.tableTo().textContent() || '';
    this.uiTotal = await this.tableTotal().textContent() || '';
    this.uiDate = await this.tableDate().textContent() || '';
    this.uiOpenTill = await this.tableOpenTill().textContent() || '';
    this.uiProject = '';
    this.uiTags = '';
    this.uiCreated = await this.tableCreated().textContent() || '';
    this.uiStatus = await this.tableStatus().textContent() || '';
}

async clickButtonNewProposal() {
    await this.buttonNewProposals().waitFor({ state: 'visible' });
    await this.buttonNewProposals().click();
}

async addNewProposal() {
    await this.inputSubject().fill("Bin Subject");
    await this.dropdownRelated().click();
    await this.optionCustomer().click();
    await this.dropdownCustomer().click();
    await this.inputCustomer().pressSequentially("Bin Customer", { delay: 100 });
    await this.option1stBinCustomer().click();
    await this.inputDate().fill("20-12-2028");
    await this.date20().click();
    await this.toogleAllowComments().click();
    await this.inputEmail().fill("vbin@gmail.com");
    await this.buttonAdd().click();
    await this.inputDescription().fill("Bin description");
    await this.inputRate().fill("1000");
    await this.buttonSaveAddNewItem().click();
    await this.radioHours().click();
    await this.buttonSelect().scrollIntoViewIfNeeded();
    await this.buttonSelect().click();
    await this.buttonSaveAddNewProposal().click();
    await this.buttonX().click();
}

async verifyTooltip() {
    await this.iconToggleFullView().hover();
    await expect(this.page.locator('.tooltip-inner', { hasText: 'Toggle full view' })).toBeVisible();
}

async searchCreatedProposal() {
    await this.buttonToogleTableRight().click();
    await this.inputSearchProposals().fill("Bin Subject");
    await expect(this.contentProposals_info()).toBeVisible();
}

async verifyDownloadPDFFile() {
    // 1️⃣ Export PDF và lấy path file đã lưu
    const pdfPath = await this.exportPDFFile();

    try {
        // 2️⃣ Đọc nội dung PDF
        const pdfText = await extractTextFromPDF(pdfPath);

        // 3️⃣ Chuẩn hóa text
        const pdfNorm = this.normalizeText(pdfText);
        const uiProposalNorm = this.normalizeText(this.uiProposalNumber);
        const uiSubjectNorm = this.normalizeText(this.uiSubject);
        const uiToNorm = this.normalizeText(this.uiTo);
        const uiTotalNorm = this.normalizeText(this.uiTotal);
        const uiDateNorm = this.normalizeText(this.uiDate);
        const uiOpenTillNorm = this.normalizeText(this.uiOpenTill);
        const uiProjectNorm = this.normalizeText(this.uiProject);
        const uiTagsNorm = this.normalizeText(this.uiTags);
        const uiCreatedNorm = this.normalizeText(this.uiCreated);
        const uiStatusNorm = this.normalizeText(this.uiStatus);

        // 4️⃣ So sánh với UI
        expect(pdfNorm).toContain(uiProposalNorm);
        expect(pdfNorm).toContain(uiSubjectNorm);
        expect(pdfNorm).toContain(uiToNorm);
        expect(pdfNorm).toContain(uiTotalNorm);
        expect(pdfNorm).toContain(uiDateNorm);
        expect(pdfNorm).toContain(uiOpenTillNorm);
        expect(pdfNorm).toContain('Project');
        expect(pdfNorm).toContain('Tags');
        expect(pdfNorm).toContain(uiCreatedNorm);
        expect(pdfNorm).toContain(uiStatusNorm);

    } finally {
        // 5️⃣ Xóa file PDF sau khi verify xong
        //await this.deleteFile(pdfPath);
    }
}


        private async deleteFile(filePath: string) {
        try {
            await fs.promises.unlink(filePath);
            console.log(`🧹 Deleted file: ${filePath}`);
        } catch (err) {
            console.warn(`⚠️ Could not delete file: ${filePath}`);
        }
    }


async deleteCreatedProposal() {
await this.tableBinSubject().click();
await this.dropdownMore().click();
this.page.once('dialog', dialog => dialog.accept());
await this.optionDelete().click();
await this.buttonX().click();
}

async exportPDFFile(): Promise<string> {
    const downloadsDir = path.resolve('downloads');
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

    // 1️⃣ Bắt download trước click
    const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 20000 }),
        this.buttonExport().click({ force: true, timeout: 15000 }),
        this.optionPDF().click({ force: true, timeout: 15000 }),
    ]);

    // 2️⃣ Lưu file PDF
    const savePath = path.join(downloadsDir, 'Proposal.pdf');
    await download.saveAs(savePath);

    return savePath;
}







async exportExcelFile() {
await this.buttonExport().click();
await this.optionExcel().click();
}


async exportCSVFile() {
await this.buttonExport().click();
await this.optionCSV().click();
}


async verifyDownloadExcelFile(path: string) {
const excelText = await readExcelAsText(path); // custom function
const excelNorm = this.normalizeText(excelText);
expect(excelNorm).toContain(this.normalizeText(this.uiProposalNumber));
expect(excelNorm).toContain(this.normalizeText(this.uiSubject));
expect(excelNorm).toContain(this.normalizeText(this.uiTo));
}


async verifyDownloadCSVFile(path: string) {
const csvText = await fs.promises.readFile(path, 'utf-8');
const csvNorm = this.normalizeText(csvText);
expect(csvNorm).toContain(this.normalizeText(this.uiProposalNumber));
expect(csvNorm).toContain(this.normalizeText(this.uiSubject));
expect(csvNorm).toContain(this.normalizeText(this.uiTo));
}


}
