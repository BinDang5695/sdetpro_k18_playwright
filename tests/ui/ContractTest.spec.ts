import { test } from '../BaseTest';

test.describe('CRM Test Suite', () => {

    test('Add new Contract, verify and delete Contract Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuContracts();
        await pages.contractsPage().clickButtonNewContract();
        await pages.contractsPage().addNewContract();
        await pages.contractsPage().verifyCreatedContract();
        await pages.contractsPage().updateContract();
        await pages.contractsPage().verifyUpdatedContract();
        await pages.contractsPage().deleteContract();
        await pages.basePage().clickMenuContracts();
        await pages.contractsPage().verifyDeletedContract();
        await pages.headerPage().logout();
    });
});
