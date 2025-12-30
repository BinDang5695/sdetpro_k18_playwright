import { Page, Locator } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;
  protected readonly menuCustomers: Locator;
  protected readonly tabContacts: Locator;
  protected readonly menuProjects: Locator;
  protected readonly menuTasks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuCustomers = page.getByText('Customers', { exact: true });
    this.tabContacts = page.getByRole('link', { name: 'Contacts' });
    this.menuProjects = page.locator("//span[normalize-space()='Projects']");
    this.menuTasks = page.locator("//span[normalize-space()='Tasks']");
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


}
