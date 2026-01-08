import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;
  protected readonly menuCustomers: Locator;
  protected readonly tabContacts: Locator;
  protected readonly menuProjects: Locator;
  protected readonly menuTasks: Locator;
  protected readonly menuSales: Locator;
  protected readonly menuInvoices: Locator;
  protected readonly menuExpenses: Locator;
  protected readonly menuContracts: Locator;
  protected readonly menuKnowledgeBase: Locator;
  protected readonly menuLeads: Locator;
  protected readonly menuItems: Locator;
  protected readonly menuProposals: Locator;

protected normalizeText(text: string | null | undefined): string {
    if (!text) return '';
    return text
      .normalize('NFD')                    
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')              
      .replace(/\u00A0/g, ' ')           
      .trim()
      .toUpperCase();                
}


  constructor(page: Page) {
    this.page = page;
    this.menuCustomers = page.getByText('Customers', { exact: true });
    this.tabContacts = page.getByRole('link', { name: 'Contacts' });
    this.menuProjects = page.locator("//span[normalize-space()='Projects']");
    this.menuTasks = page.locator("//span[normalize-space()='Tasks']");
    this.menuSales = page.locator("//span[@class='menu-text'][normalize-space()='Sales']");
    this.menuInvoices = page.locator("//span[normalize-space()='Invoices']");
    this.menuExpenses = page.locator("//span[@class='menu-text'][normalize-space()='Expenses']");
    this.menuContracts = page.locator("//span[normalize-space()='Contracts']");
    this.menuKnowledgeBase = page.locator("//span[normalize-space()='Knowledge Base']");
    this.menuLeads = page.locator("//span[@class='menu-text'][normalize-space()='Leads']");
    this.menuItems = page.locator("//span[normalize-space()='Items']");
    this.menuProposals = page.locator("//span[normalize-space()='Proposals']");
  }

  async clickMenuCustomers(): Promise<this> {
    await this.menuCustomers.click();
    return this;
  }

  async clickTabContacts(): Promise<this> {
    await this.tabContacts.click();
    return this;
  }

  async clickMenuProjects(): Promise<this> {
    await this.menuProjects.click();
    return this;
  }

  async clickMenuTasks(): Promise<this> {
    await this.menuTasks.click();
    return this;
  }

async clickMenuSales(): Promise<this> {

    const maxRetries = 5;

    for (let i = 0; i < maxRetries; i++) {
        try {
            await expect(this.menuSales).toBeVisible();
            await this.menuSales.scrollIntoViewIfNeeded();
            await this.menuSales.hover();
            await this.menuSales.click();

            if (await this.menuItems.isVisible()) {
                console.log(`Menu Items xuất hiện sau click Sales (attempt ${i + 1})`);
                return this;
            }

            console.log(`Menu Items chưa xuất hiện, retry attempt ${i + 1}`);
        } catch (e) {
            console.log(`Click Menu Sales attempt ${i + 1} thất bại: ${e}`);
        }
    }

    throw new Error("Menu Items không xuất hiện sau khi click Sales menu nhiều lần");
}


  async clickMenuInvoices(): Promise<this> {
    await this.menuInvoices.click();
    return this;
  }

  async clickMenuExpenses(): Promise<this> {
    await this.menuExpenses.click();
    return this;
  }

  async clickMenuContracts(): Promise<this> {
    await this.menuContracts.click();
    return this;
  }

  async clickMenuKnowledgeBase(): Promise<this> {
    await this.menuKnowledgeBase.click();
    return this;
  }

  async clickMenuLeads(): Promise<this> {
    await this.menuLeads.click();
    return this;
  }

  async clickMenuItems(): Promise<this> {
    await this.menuItems.click();
    return this;
  }

  async clickMenuProposals(): Promise<this> {
    await this.menuProposals.click();
    return this;
  }

  async clickWithRetry(
  locator: Locator,
  options?: {
    name?: string;        // tên để log
    maxRetry?: number;
    timeout?: number;
    hoverBeforeClick?: boolean;
    force?: boolean;
  }
) {
  const {
    name = 'element',
    maxRetry = 3,
    timeout = 5000,
    hoverBeforeClick = false,
    force = false
  } = options || {};

  for (let attempt = 1; attempt <= maxRetry; attempt++) {
    try {
      console.log(`🖱️ [${name}] click attempt ${attempt}/${maxRetry}`);

      await locator.waitFor({ state: 'visible', timeout });
      await locator.waitFor({ state: 'attached', timeout });

      if (hoverBeforeClick) {
        await locator.hover();
      }

      await locator.click({ timeout, force });

      console.log(`✅ [${name}] click SUCCESS`);
      return;
    } catch (err: any) {
      console.log(
        `⚠️ [${name}] click FAILED (attempt ${attempt}): ${err.message}`
      );

      if (attempt === maxRetry) {
        throw new Error(`❌ Click FAILED after ${maxRetry} attempts: ${name}`);
      }

      await locator.page().waitForTimeout(300);
    }
  }
}

protected async waitForModalToCloseSafely(
  options?: {
    timeout?: number;
    closeButton?: Locator;
    modalName?: string;
  }
) {
  const {
    timeout = 7000,
    closeButton,
    modalName = 'Modal'
  } = options || {};

  const page = this.page;

  console.log(`⏳ Waiting for ${modalName} to release UI...`);

  const modal = page.locator('.modal.show, .modal.in');
  const backdrop = page.locator('.modal-backdrop');

  // 1️⃣ Đợi modal hoặc backdrop biến mất (CHỈ CẦN 1 TRONG 2)
  try {
    await Promise.race([
      modal.first().waitFor({ state: 'hidden', timeout }),
      backdrop.first().waitFor({ state: 'hidden', timeout })
    ]);
    console.log(`✅ ${modalName} released UI naturally`);
    return;
  } catch {
    console.log(`⚠️ ${modalName} did NOT release UI naturally`);
  }

  // 2️⃣ Nếu chưa được → click X
  if (closeButton) {
    console.log(`🛑 Forcing close ${modalName}`);

    try {
      await closeButton.click({ force: true });
    } catch (e) {
      console.log(`⚠️ Click close failed: ${e}`);
    }

    // 3️⃣ Đợi lại lần cuối
    await Promise.race([
      modal.first().waitFor({ state: 'hidden', timeout }),
      backdrop.first().waitFor({ state: 'hidden', timeout })
    ]);

    console.log(`✅ ${modalName} released UI after force close`);
    return;
  }

  throw new Error(`❌ ${modalName} still blocking UI`);
}





}
