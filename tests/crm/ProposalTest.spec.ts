import { test, expect } from '../BaseTest';

test.describe('CRM Test Suite', () => {

    test('Manage Proposals PDF File', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuSales();
        await pages.basePage().clickMenuProposals();
        await pages.proposalsPage().clickButtonNewProposal();
        await pages.proposalsPage().addNewProposal();
        await pages.proposalsPage().verifyTooltip();
        await pages.proposalsPage().searchCreatedProposal();
        await pages.proposalsPage().captureUITableData();
        await pages.proposalsPage().verifyDownloadPDFFile();
        await pages.proposalsPage().deleteCreatedProposal();
        await pages.headerPage().logout();
    });
});
