import { test, expect } from '../BaseTest';

test.describe('CRM Test Suite', () => {

    test('Add new Leads, verify and delete Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.leadsPage().createMultipleLeads(3);
        await pages.leadsPage().searchAndCheckDataInTable(3, 'Bin Lead');
        await pages.leadsPage().deleteDataAfterSearched();
        await pages.leadsPage().verifyDeletedLeads();
        await pages.headerPage().logout();
    });
});
